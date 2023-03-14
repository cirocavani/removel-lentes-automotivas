import nextConfig from '../next.config'
import _PRODUCT_DATA from "./products.json"


export {
    getProduct,
    getCategory,
    getCategoryByLabel,
    getAutomaker,
    getAutomakerByLabel,
    listProducts,
    listCategories,
    listAutomakers,
    listCatalogMenu,
    listCatalogKeys,
    listCatalogProducts
}

export type {
    ProductItem,
    Side,
    Category,
    Automaker,
    CatalogKey,
    CatalogItem
}

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

type Category = {
    label: string
    key: string
    image: string
}

type Automaker = {
    label: string
    key: string
    image: string
}

type CatalogMenu = {
    category: Category
    automakers: Automaker[]
}

type CatalogKey = {
    category_key: string | undefined
    automaker_key: string | undefined
}

type CatalogItem = {
    title: string
    image: string
    category: Category
    automaker: Automaker
    sku: string
}

const IMAGE_PATH = `${nextConfig.basePath}/images`

const PRODUCT_DATA = _PRODUCT_DATA as ProductItem[]

const CATEGORIES: Category[] = [
    { "label": "Retrovisor Lente Cristal", "key": "retrovisor-lente-cristal", "image": `${IMAGE_PATH}/retrovisor-lente-cristal.png` },
    { "label": "Retrovisor Lente Azul", "key": "retrovisor-lente-azul", "image": `${IMAGE_PATH}/retrovisor-lente-azul.png` }
]

// https://www.carlogos.org/
// https://commons.wikimedia.org/wiki/File:Asia_Motors_Logo.svg
const AUTOMAKERS: Automaker[] = [
    { "label": "ASIA", "key": "ASIA", "image": `${IMAGE_PATH}/asia-logo.png` },
    { "label": "AUDI", "key": "AUDI", "image": `${IMAGE_PATH}/audi-logo.png` },
    { "label": "BMW", "key": "BMW", "image": `${IMAGE_PATH}/bmw-logo.png` },
    { "label": "CHERY", "key": "CHERY", "image": `${IMAGE_PATH}/chery-logo.png` },
    { "label": "CHEVROLET", "key": "CHEVROLET", "image": `${IMAGE_PATH}/chevrolet-logo.png` },
    { "label": "CITROËN", "key": "CITROEN", "image": `${IMAGE_PATH}/citroen-logo.png` },
    { "label": "DODGE", "key": "DODGE", "image": `${IMAGE_PATH}/dodge-logo.png` },
    { "label": "FIAT", "key": "FIAT", "image": `${IMAGE_PATH}/fiat-logo.png` },
    { "label": "FORD", "key": "FORD", "image": `${IMAGE_PATH}/ford-logo.png` },
    { "label": "HONDA", "key": "HONDA", "image": `${IMAGE_PATH}/honda-logo.png` },
    { "label": "HYUNDAI", "key": "HYUNDAI", "image": `${IMAGE_PATH}/hyundai-logo.png` },
    { "label": "IVECO", "key": "IVECO", "image": `${IMAGE_PATH}/iveco-logo.png` },
    { "label": "JAC", "key": "JAC", "image": `${IMAGE_PATH}/jac-logo.png` },
    { "label": "JEEP", "key": "JEEP", "image": `${IMAGE_PATH}/jeep-logo.png` },
    { "label": "KIA", "key": "KIA", "image": `${IMAGE_PATH}/kia-logo.png` },
    { "label": "LAND ROVER", "key": "LAND-ROVER", "image": `${IMAGE_PATH}/land-rover-logo.png` },
    { "label": "MERCEDES-BENZ", "key": "MERCEDES-BENZ", "image": `${IMAGE_PATH}/mercedes-benz-logo.png` },
    { "label": "MITSUBISHI", "key": "MITSUBISHI", "image": `${IMAGE_PATH}/mitsubishi-logo.png` },
    { "label": "NISSAN", "key": "NISSAN", "image": `${IMAGE_PATH}/nissan-logo.png` },
    { "label": "PEUGEOT", "key": "PEUGEOT", "image": `${IMAGE_PATH}/peugeot-logo.png` },
    { "label": "RENAULT", "key": "RENAULT", "image": `${IMAGE_PATH}/renault-logo.png` },
    { "label": "SUZUKI", "key": "SUZUKI", "image": `${IMAGE_PATH}/suzuki-logo.png` },
    { "label": "TOYOTA", "key": "TOYOTA", "image": `${IMAGE_PATH}/toyota-logo.png` },
    { "label": "VOLKSWAGEN", "key": "VOLKSWAGEN", "image": `${IMAGE_PATH}/volkswagen-logo.png` },
    { "label": "VOLVO", "key": "VOLVO", "image": `${IMAGE_PATH}/volvo-logo.png` }
]


function getProduct(sku: string): ProductItem | undefined {
    return PRODUCT_DATA.find((product) => { return product.sku === sku });
}

function getCategory(category_key?: string): Category | undefined {
    return category_key ?
        CATEGORIES.find((category) => { return category.key === category_key }) :
        undefined;
}

function getCategoryByLabel(category_label?: string): Category | undefined {
    return category_label ?
        CATEGORIES.find((category) => { return category.label === category_label }) :
        undefined;
}

function getAutomaker(automaker_key?: string): Automaker | undefined {
    return automaker_key ?
        AUTOMAKERS.find((automaker) => { return automaker.key === automaker_key }) :
        undefined;
}

function getAutomakerByLabel(automaker_label?: string): Automaker | undefined {
    return automaker_label ?
        AUTOMAKERS.find((automaker) => { return automaker.label === automaker_label }) :
        undefined;
}

function listProducts(category_key?: string, automaker_key?: string): ProductItem[] {
    const category = getCategory(category_key)
    const automaker = getAutomaker(automaker_key)
    if (!category && !automaker)
        return PRODUCT_DATA
    return PRODUCT_DATA.filter((product) => {
        return (
            (!category || product.category === category.label) &&
            (!automaker || product.automaker === automaker.label)
        )
    });
}

function listCategories(): Category[] {
    return CATEGORIES
}

function listAutomakers(): Automaker[] {
    return AUTOMAKERS
}

function listCatalogMenu(): CatalogMenu[] {
    return CATEGORIES.map((category) => {
        return { "category": category, "automakers": AUTOMAKERS }
    })
}

function listCatalogKeys(): CatalogKey[] {
    return CATEGORIES.flatMap(
        (category) => {
            return AUTOMAKERS.map((automaker) => (
                {
                    "category_key": category.key,
                    "automaker_key": automaker.key
                }
            ))
        }
    )
}

function listCatalogProducts(catalog_key: CatalogKey): CatalogItem[] {
    const category = getCategory(catalog_key.category_key)
    const automaker = getAutomaker(catalog_key.automaker_key)
    return listProducts(catalog_key.category_key, catalog_key.automaker_key).map(
        (product) => {
            return {
                "title": product.catalogTitle,
                "image": `${IMAGE_PATH}/removel.webp`,
                "category": category,
                "automaker": automaker,
                "sku": product.sku
            } as CatalogItem
        }
    )
}
