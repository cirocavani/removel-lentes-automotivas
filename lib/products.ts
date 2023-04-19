import { img_path } from "@/lib/images";
import _PRODUCT_DATA from "./products.json" assert { type: "json" };


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
    key: string
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
    key: string
    title: string
    image: string
    category: Category
    automaker: Automaker
    sku: string
}

const PRODUCT_DATA = _PRODUCT_DATA as ProductItem[]

const CATEGORIES: Category[] = [
    { "label": "Retrovisor Lente Cristal", "key": "retrovisor-lente-cristal", "image": img_path("retrovisor-lente-cristal.png") },
    { "label": "Retrovisor Lente Azul", "key": "retrovisor-lente-azul", "image": img_path("retrovisor-lente-azul.png") }
]

// https://www.carlogos.org/
// https://commons.wikimedia.org/wiki/File:Asia_Motors_Logo.svg
const AUTOMAKERS: Automaker[] = [
    { "label": "ASIA", "key": "ASIA", "image": img_path("asia-logo.png") },
    { "label": "AUDI", "key": "AUDI", "image": img_path("audi-logo.png") },
    { "label": "BMW", "key": "BMW", "image": img_path("bmw-logo.png") },
    { "label": "CHERY", "key": "CHERY", "image": img_path("chery-logo.png") },
    { "label": "CHEVROLET", "key": "CHEVROLET", "image": img_path("chevrolet-logo.png") },
    { "label": "CITROËN", "key": "CITROEN", "image": img_path("citroen-logo.png") },
    { "label": "DODGE", "key": "DODGE", "image": img_path("dodge-logo.png") },
    { "label": "FIAT", "key": "FIAT", "image": img_path("fiat-logo.png") },
    { "label": "FORD", "key": "FORD", "image": img_path("ford-logo.png") },
    { "label": "HONDA", "key": "HONDA", "image": img_path("honda-logo.png") },
    { "label": "HYUNDAI", "key": "HYUNDAI", "image": img_path("hyundai-logo.png") },
    { "label": "IVECO", "key": "IVECO", "image": img_path("iveco-logo.png") },
    { "label": "JAC", "key": "JAC", "image": img_path("jac-logo.png") },
    { "label": "JEEP", "key": "JEEP", "image": img_path("jeep-logo.png") },
    { "label": "KIA", "key": "KIA", "image": img_path("kia-logo.png") },
    { "label": "LAND ROVER", "key": "LAND-ROVER", "image": img_path("land-rover-logo.png") },
    { "label": "MERCEDES-BENZ", "key": "MERCEDES-BENZ", "image": img_path("mercedes-benz-logo.png") },
    { "label": "MITSUBISHI", "key": "MITSUBISHI", "image": img_path("mitsubishi-logo.png") },
    { "label": "NISSAN", "key": "NISSAN", "image": img_path("nissan-logo.png") },
    { "label": "PEUGEOT", "key": "PEUGEOT", "image": img_path("peugeot-logo.png") },
    { "label": "RENAULT", "key": "RENAULT", "image": img_path("renault-logo.png") },
    { "label": "SUZUKI", "key": "SUZUKI", "image": img_path("suzuki-logo.png") },
    { "label": "TOYOTA", "key": "TOYOTA", "image": img_path("toyota-logo.png") },
    { "label": "VOLKSWAGEN", "key": "VOLKSWAGEN", "image": img_path("volkswagen-logo.png") },
    { "label": "VOLVO", "key": "VOLVO", "image": img_path("volvo-logo.png") }
]


function getProduct(product_key: string): ProductItem | undefined {
    return PRODUCT_DATA.find((product) => { return product.key === product_key });
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
                "key": product.key,
                "title": product.catalogTitle,
                "image": img_path("removel.webp"),
                "category": category,
                "automaker": automaker,
                "sku": product.sku
            } as CatalogItem
        }
    )
}
