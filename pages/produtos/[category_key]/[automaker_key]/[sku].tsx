import { Automaker, Category, getAutomaker, getAutomakerByLabel, getCategory, getCategoryByLabel, getProduct, listProducts, ProductItem } from "@/lib/products"
import { Anchor, Breadcrumbs, Container, Title } from "@mantine/core";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";

interface ProductProps {
    product: ProductItem
    category: Category
    automaker: Automaker
}

export default function ProductCatalog({ product, category, automaker }: ProductProps) {
    return (
        <Container>
            <Breadcrumbs p="sm">
                <Anchor component={Link} href="/produtos" key="produtos">Produtos</Anchor>
                <Anchor component={Link} href={`/produtos/${category.key}`} key="category">{category.label}</Anchor>
                <Anchor component={Link} href={`/produtos/${category.key}/${automaker.key}`} key="automaker">{automaker.label}</Anchor>
                <Anchor component={Link} href={`/produtos/${category.key}/${automaker.key}/${product.sku}`} key="sku">{product.catalogTitle}</Anchor>
            </Breadcrumbs>
            <Title p="sm">{product.title}</Title>
        </Container>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    // Return a list of possible value for category_id and automaker
    const paths = listProducts().map((product) => {
        return {
            "params": {
                "category_key": getCategoryByLabel(product.category)?.key,
                "automaker_key": getAutomakerByLabel(product.automaker)?.key,
                "sku": product.sku,
            }
        }
    });

    return {
        paths,
        fallback: false,
    };
}

export const getStaticProps: GetStaticProps<ProductProps> = async (
    context
) => {
    const category_key = context.params?.category_key as string
    const automaker_key = context.params?.automaker_key as string
    const sku = context.params?.sku as string

    const product = getProduct(sku)
    const category = getCategory(category_key)
    const automaker = getAutomaker(automaker_key)

    return {
        props: {
            product,
            category,
            automaker,
        } as ProductProps
    }
}
