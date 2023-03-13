// https://csv.js.org/parse/options/
// https://blog.tericcabrel.com/read-csv-node-typescript/

import * as fs from "fs";
import * as path from "path";
import { parse } from "csv-parse/sync";

type Side = "ESQUERDO" | "DIREITO"

type ProductItem = {
    sku: string
    category: string
    automaker: string
    model: string
    side: Side
    title: string
    catalogTitle: string
}

function update_item(item: ProductItem) {
    const code = item.sku.slice(0, 2)
    if (code === "LC") {
        item.category = "Lente Cristal"
    } else if (code === "LA") {
        item.category = "Lente Azul"
    } else {
        item.category = ""
    }
    item.catalogTitle = `${item.model} lado ${item.side}`
    item.title = `${item.category} ${item.automaker} ${item.model} lado ${item.side}`

    return item
}

(() => {
    const csv_file_path = path.resolve(__dirname, "..", "data", "ProductList.csv");
    const output_file_path = path.resolve(__dirname, "..", "data", "products.json");

    const csv_content = fs.readFileSync(csv_file_path, { encoding: "utf-8" });
    const headers = ["sku", "automaker", "model", "side"];

    let result: ProductItem[] = parse(csv_content, {
        delimiter: ",",
        columns: headers,
        on_record: update_item,
    });

    result = result.flatMap((item: ProductItem) => {
        let item2: ProductItem = JSON.parse(JSON.stringify(item))
        item2.sku = item2.sku.replace("LC", "LA")
        item2 = update_item(item2)
        return [item, item2]
    })

    const output_json = JSON.stringify(result, null, 4)
    fs.writeFile(output_file_path, output_json, function (err) {
        if (err) {
            console.log(err);
        }
    });
})();
