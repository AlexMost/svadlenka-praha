async function main() {
    const indexPage = await import('../pages/index.js');
    console.log(indexPage());
}

main();