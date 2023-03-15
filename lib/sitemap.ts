import * as products from "./products.js";
import * as fs from "fs";


export function generateSiteMap(output_file_path: string) {
    const base_url = "https://removellentesautomotivas.com.br"

    let urls = [
        base_url,
        `${base_url}/empresa`,
        `${base_url}/produtos`,
        `${base_url}/contato`,
    ]

    const category_urls = products.listCategories().map((category) => {
        return `${base_url}/produtos/${category.key}`
    })
    const catalog_urls = products.listCatalogKeys().map((catalog_key) => {
        return `${base_url}/produtos/${catalog_key.category_key}/${catalog_key.automaker_key}`
    })
    const product_urls = products.listProducts().map((product) => {
        return `${base_url}/${product.key}`
    })

    urls = urls.concat(category_urls, catalog_urls, product_urls)
    const urls_xml = urls.map((url) => {
        return `
    <url>
        <loc>${url}</loc>
    </url>`;
    }).join('')

    const xml_data = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls_xml}
</urlset>
`

    fs.writeFile(output_file_path, xml_data, function (err) {
        if (err) {
            console.log(err);
        }
    });
}
