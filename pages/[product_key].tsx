import { Automaker, Category, getAutomakerByLabel, getCategoryByLabel, getProduct, listProducts, ProductItem } from "@/lib/products"
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
            <Breadcrumbs styles={{ root: { flexWrap: "wrap" } }} p="sm">
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
    const paths = listProducts().map((product) => {
        return {
            "params": {
                "product_key": product.key,
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
    const product_key = context.params?.product_key as string

    const product = getProduct(product_key)
    const category = getCategoryByLabel(product?.category)
    const automaker = getAutomakerByLabel(product?.automaker)

    return {
        props: {
            product,
            category,
            automaker,
        } as ProductProps
    }
}
