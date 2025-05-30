import nextConfig from "../next.config.mjs";

const FILE_PATH = `${nextConfig.basePath}/files`;

const CATALOG_2023_PDF = file_path(
    "removel-lentes-automotivas-catalogo-2023.pdf",
);
const CATALOG_2024_PDF = file_path(
    "removel-lentes-automotivas-catalogo-2024.pdf",
);
const CATALOG_2024_2_PDF = file_path(
    "removel-lentes-automotivas-catalogo-2024_2.pdf",
);
const CATALOG_2025_PDF = file_path(
    "removel-lentes-automotivas-catalogo-2025.pdf",
);

function file_path(name: string): string {
    return `${FILE_PATH}/${name}`;
}

export { file_path, CATALOG_2023_PDF, CATALOG_2024_PDF, CATALOG_2024_2_PDF, CATALOG_2025_PDF };
