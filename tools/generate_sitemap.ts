import * as path from "path";
import { generateSiteMap } from "../lib/sitemap.js";

const output_file_path = path.resolve(".", "public", "sitemap.xml");

generateSiteMap(output_file_path)
