// https://csv.js.org/parse/options/
// https://blog.tericcabrel.com/read-csv-node-typescript/

import * as fs from "fs";
import { parse } from "csv-parse/sync";

type Side = "ESQUERDO" | "DIREITO"

type ProductItem = {
    key: string
    sku: string
    category: string
    automaker: string
    model: string
    side: Side
    title: string
    catalogTitle: string
}

function slugify(s: string): string {
    return s.trim()
        .replace(/[àÀáÁâÂãäÄÅåª]+/g, 'a')       // Special Characters #1
        .replace(/[èÈéÉêÊëË]+/g, 'e')           // Special Characters #2
        .replace(/[ìÌíÍîÎïÏ]+/g, 'i')           // Special Characters #3
        .replace(/[òÒóÓôÔõÕöÖº]+/g, 'o')        // Special Characters #4
        .replace(/[ùÙúÚûÛüÜ]+/g, 'u')           // Special Characters #5
        .replace(/[ýÝÿŸ]+/g, 'y')               // Special Characters #6
        .replace(/[ñÑ]+/g, 'n')                 // Special Characters #7
        .replace(/[çÇ]+/g, 'c')                 // Special Characters #8
        .replace(/[ß]+/g, 'ss')                 // Special Characters #9
        .replace(/[Ææ]+/g, 'ae')                // Special Characters #10
        .replace(/[Øøœ]+/g, 'oe')               // Special Characters #11
        .replace(/[%]+/g, 'pct')                // Special Characters #12
        .replace(/\s+/g, '-')                   // Replace spaces with -
        .replace(/[^\w\-]+/g, '')               // Remove all non-word chars
        .replace(/\-\-+/g, '-')                 // Replace multiple - with single -
        .replace(/^-+/, '')                     // Trim - from start of text
        .replace(/-+$/, '')                     // Trim - from end of text
        .toLowerCase();
};

function makeProductItem(item: ProductItem) {
    const code = item.sku.slice(0, 2)
    if (code === "LC") {
        item.category = "Retrovisor Lente Cristal"
    } else if (code === "LA") {
        item.category = "Retrovisor Lente Azul"
    } else {
        item.category = ""
    }
    item.catalogTitle = `${item.model} lado ${item.side}`
    item.title = `${item.category} ${item.automaker} ${item.model} lado ${item.side}`
    item.key = `${slugify(item.title)}-${item.sku}`

    return item
}

export function generateProductsJson(csv_file_path: string, output_file_path: string) {
    const csv_content = fs.readFileSync(csv_file_path, { encoding: "utf-8" });
    const headers = ["sku", "automaker", "model", "side"];

    let result: ProductItem[] = parse(csv_content, {
        delimiter: ",",
        columns: headers,
        on_record: makeProductItem,
    });

    result = result.flatMap((item: ProductItem) => {
        let item2: ProductItem = JSON.parse(JSON.stringify(item))
        item2.sku = item2.sku.replace("LC", "LA")
        item2 = makeProductItem(item2)
        return [item, item2]
    })

    const output_json = JSON.stringify(result, null, 4)
    fs.writeFile(output_file_path, output_json, function (err) {
        if (err) {
            console.log(err);
        }
    });
}
