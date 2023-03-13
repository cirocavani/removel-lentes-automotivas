import _PRODUCT_DATA from "./products.json"
import catalog_image from "../public/images/lente-cover.webp"
import lente_cristal_image from "../public/images/lente-cristal.webp"
import lente_azul_image from "../public/images/lente-azul.webp"
import brand_image from "../public/images/removel.webp"
import { StaticImageData } from "next/image"

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
    image: StaticImageData
}

type Automaker = {
    label: string
    key: string
    image: StaticImageData
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
    image: StaticImageData
    category: Category
    automaker: Automaker
    sku: string
}

const PRODUCT_DATA = _PRODUCT_DATA as ProductItem[]

const CATEGORIES: Category[] = [
    { "label": "Lente Cristal", "key": "lente-cristal", "image": lente_cristal_image },
    { "label": "Lente Azul", "key": "lente-azul", "image": lente_azul_image }
]

const AUTOMAKERS: Automaker[] = [
    { "label": "ASIA", "key": "ASIA", "image": brand_image },
    { "label": "AUDI", "key": "AUDI", "image": brand_image },
    { "label": "BMW", "key": "BMW", "image": brand_image },
    { "label": "CHERY", "key": "CHERY", "image": brand_image },
    { "label": "CHEVROLET", "key": "CHEVROLET", "image": brand_image },
    { "label": "CITROËN", "key": "CITROEN", "image": brand_image },
    { "label": "DODGE", "key": "DODGE", "image": brand_image },
    { "label": "FIAT", "key": "FIAT", "image": brand_image },
    { "label": "FORD", "key": "FORD", "image": brand_image },
    { "label": "HONDA", "key": "HONDA", "image": brand_image },
    { "label": "HYUNDAI", "key": "HYUNDAI", "image": brand_image },
    { "label": "IVECO", "key": "IVECO", "image": brand_image },
    { "label": "JAC", "key": "JAC", "image": brand_image },
    { "label": "JEEP", "key": "JEEP", "image": brand_image },
    { "label": "KIA", "key": "KIA", "image": brand_image },
    { "label": "LAND ROVER", "key": "LAND-ROVER", "image": brand_image },
    { "label": "MERCEDES-BENZ", "key": "MERCEDES-BENZ", "image": brand_image },
    { "label": "MITSUBISHI", "key": "MITSUBISHI", "image": brand_image },
    { "label": "NISSAN", "key": "NISSAN", "image": brand_image },
    { "label": "PEUGEOT", "key": "PEUGEOT", "image": brand_image },
    { "label": "RENAULT", "key": "RENAULT", "image": brand_image },
    { "label": "SUZUKI", "key": "SUZUKI", "image": brand_image },
    { "label": "TOYOTA", "key": "TOYOTA", "image": brand_image },
    { "label": "VOLKSWAGEN", "key": "VOLKSWAGEN", "image": brand_image },
    { "label": "VOLVO", "key": "VOLVO", "image": brand_image }
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
                "image": catalog_image,
                "category": category,
                "automaker": automaker,
                "sku": product.sku
            } as CatalogItem
        }
    )
}
