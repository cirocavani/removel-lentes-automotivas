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

const PRODUCT_DATA = _PRODUCT_DATA as ProductItem[]

const CATEGORIES: Category[] = [
    { "label": "Retrovisor Lente Cristal", "key": "retrovisor-lente-cristal", "image": "/images/retrovisor-lente-cristal.png" },
    { "label": "Retrovisor Lente Azul", "key": "retrovisor-lente-azul", "image": "/images/retrovisor-lente-azul.png" }
]

// https://www.carlogos.org/
// https://commons.wikimedia.org/wiki/File:Asia_Motors_Logo.svg
const AUTOMAKERS: Automaker[] = [
    { "label": "ASIA", "key": "ASIA", "image": "/images/asia-logo.png" },
    { "label": "AUDI", "key": "AUDI", "image": "/images/audi-logo.png" },
    { "label": "BMW", "key": "BMW", "image": "/images/bmw-logo.png" },
    { "label": "CHERY", "key": "CHERY", "image": "/images/chery-logo.png" },
    { "label": "CHEVROLET", "key": "CHEVROLET", "image": "/images/chevrolet-logo.png" },
    { "label": "CITROËN", "key": "CITROEN", "image": "/images/citroen-logo.png" },
    { "label": "DODGE", "key": "DODGE", "image": "/images/dodge-logo.png" },
    { "label": "FIAT", "key": "FIAT", "image": "/images/fiat-logo.png" },
    { "label": "FORD", "key": "FORD", "image": "/images/ford-logo.png" },
    { "label": "HONDA", "key": "HONDA", "image": "/images/honda-logo.png" },
    { "label": "HYUNDAI", "key": "HYUNDAI", "image": "/images/hyundai-logo.png" },
    { "label": "IVECO", "key": "IVECO", "image": "/images/iveco-logo.png" },
    { "label": "JAC", "key": "JAC", "image": "/images/jac-logo.png" },
    { "label": "JEEP", "key": "JEEP", "image": "/images/jeep-logo.png" },
    { "label": "KIA", "key": "KIA", "image": "/images/kia-logo.png" },
    { "label": "LAND ROVER", "key": "LAND-ROVER", "image": "/images/land-rover-logo.png" },
    { "label": "MERCEDES-BENZ", "key": "MERCEDES-BENZ", "image": "/images/mercedes-benz-logo.png" },
    { "label": "MITSUBISHI", "key": "MITSUBISHI", "image": "/images/mitsubishi-logo.png" },
    { "label": "NISSAN", "key": "NISSAN", "image": "/images/nissan-logo.png" },
    { "label": "PEUGEOT", "key": "PEUGEOT", "image": "/images/peugeot-logo.png" },
    { "label": "RENAULT", "key": "RENAULT", "image": "/images/renault-logo.png" },
    { "label": "SUZUKI", "key": "SUZUKI", "image": "/images/suzuki-logo.png" },
    { "label": "TOYOTA", "key": "TOYOTA", "image": "/images/toyota-logo.png" },
    { "label": "VOLKSWAGEN", "key": "VOLKSWAGEN", "image": "/images/volkswagen-logo.png" },
    { "label": "VOLVO", "key": "VOLVO", "image": "/images/volvo-logo.png" }
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
                "image": "/images/removel.webp",
                "category": category,
                "automaker": automaker,
                "sku": product.sku
            } as CatalogItem
        }
    )
}
