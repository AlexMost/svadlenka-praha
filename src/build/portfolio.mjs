import fetch from "node-fetch";
import fs from "fs/promises";
import path from "path";
import sharp from "sharp";

const username = process.env.INSTAGRAM_USERNAME || "svadlenka_praha";
const outputPath =
  process.env.PORTFOLIO_OUTPUT || path.join("static", "portfolio.json");
const sessionId = process.env.INSTAGRAM_SESSIONID;
const appId = process.env.INSTAGRAM_APP_ID || "936619743392459";

const headers = {
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  Accept: "application/json",
  "X-IG-App-ID": appId,
};

if (sessionId) {
  headers.Cookie = `sessionid=${sessionId};`;
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function loadExistingPortfolio() {
  try {
    const content = await fs.readFile(outputPath, "utf8");
    const data = JSON.parse(content);
    return data && Array.isArray(data.posts) ? data : null;
  } catch {
    return null;
  }
}

function pickUser(data) {
  return data?.data?.user || data?.graphql?.user || data?.user || null;
}

function normalizePosts(edges) {
  return edges.map(({ node }) => {
    const images = [];
    if (node.edge_sidecar_to_children?.edges?.length) {
      node.edge_sidecar_to_children.edges.forEach(({ node: child }) => {
        if (child.display_url) {
          images.push({
            id: child.id,
            url: child.display_url,
          });
        }
      });
    } else if (node.display_url) {
      images.push({
        id: node.id,
        url: node.display_url,
      });
    }

    const timestamp = node.taken_at_timestamp || null;
    const takenAt = timestamp ? new Date(timestamp * 1000).toISOString() : null;
    return {
      id: node.id,
      shortcode: node.shortcode,
      url: node.shortcode
        ? `https://www.instagram.com/p/${node.shortcode}/`
        : null,
      caption: node.edge_media_to_caption?.edges?.[0]?.node?.text || "",
      takenAt,
      timestamp,
      displayUrl: node.display_url || node.thumbnail_src || null,
      isVideo: Boolean(node.is_video),
      likeCount:
        node.edge_liked_by?.count || node.edge_media_preview_like?.count || null,
      commentCount: node.edge_media_to_comment?.count || null,
      images,
    };
  });
}

async function fetchProfileInfo() {
  const apiUrl = `https://www.instagram.com/api/v1/users/web_profile_info/?username=${encodeURIComponent(
    username
  )}`;
  const apiResponse = await fetch(apiUrl, { headers });
  if (apiResponse.ok) {
    return apiResponse.json();
  }

  const fallbackUrl = `https://www.instagram.com/${username}/?__a=1&__d=dis`;
  const fallbackResponse = await fetch(fallbackUrl, { headers });
  if (fallbackResponse.ok) {
    return fallbackResponse.json();
  }

  throw new Error(
    `Instagram request failed (${apiResponse.status}). Provide INSTAGRAM_SESSIONID if needed.`
  );
}

async function buildPortfolio() {
  const data = await fetchProfileInfo();
  const user = pickUser(data);

  if (!user) {
    throw new Error("Unable to resolve Instagram user data from response.");
  }

  const edges = user.edge_owner_to_timeline_media?.edges || [];
  const posts = normalizePosts(edges);
  const existing = await loadExistingPortfolio();
  const existingById = new Map(
    (existing?.posts || []).map((post) => [post.id, post])
  );
  const assetsRoot = path.join("static", "img", "portfolio");

  for (const post of posts) {
    if (!post.images.length) {
      continue;
    }

    const postDir = path.join(assetsRoot, post.id);
    await fs.mkdir(postDir, { recursive: true });

    const imageMap = {};
    const previewMap = {};
    let index = 1;

    for (const image of post.images) {
      const filename = `image-${index}.webp`;
      const previewFilename = `preview-${index}.webp`;
      const outputPath = path.join(postDir, filename);
      const previewPath = path.join(postDir, previewFilename);
      const outputExists = await fileExists(outputPath);
      const previewExists = await fileExists(previewPath);

      if (!outputExists || !previewExists) {
        const response = await fetch(image.url, { headers });
        if (!response.ok) {
          throw new Error(
            `Failed to download image ${image.url} (${response.status}).`
          );
        }

        const buffer = Buffer.from(await response.arrayBuffer());
        await sharp(buffer).webp({ quality: 85 }).toFile(outputPath);
        await sharp(buffer)
          .resize(200, 200, { fit: "cover" })
          .webp({ quality: 80 })
          .toFile(previewPath);
      }

      imageMap[image.id] = `/img/portfolio/${post.id}/${filename}`;
      previewMap[image.id] = `/img/portfolio/${post.id}/${previewFilename}`;
      index += 1;
    }

    post.images = imageMap;
    post.previews = previewMap;
  }

  const mergedPosts = posts.map((post) => {
    const existingPost = existingById.get(post.id);
    if (!existingPost) {
      return post;
    }

    if (Object.keys(post.images).length === 0 && existingPost.images) {
      return {
        ...post,
        images: existingPost.images,
        previews: existingPost.previews || {},
      };
    }

    return post;
  });

  for (const [id, existingPost] of existingById.entries()) {
    if (!mergedPosts.some((post) => post.id === id)) {
      mergedPosts.push(existingPost);
    }
  }

  const payload = {
    fetchedAt: new Date().toISOString(),
    username,
    posts: mergedPosts,
  };

  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, JSON.stringify(payload, null, 2), "utf8");
  console.log(`Portfolio saved to ${outputPath} (${posts.length} posts).`);
}

await buildPortfolio();
