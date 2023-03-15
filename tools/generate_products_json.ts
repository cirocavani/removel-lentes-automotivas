import * as path from "path";
import { generateProductsJson } from "../lib/products_json.js";

const csv_file_path = path.resolve(".", "data", "ProductList.csv");
const output_file_path = path.resolve(".", "lib", "products.json");

generateProductsJson(csv_file_path, output_file_path)
