import { Automaker, Category, getCategory, listAutomakers, listCategories, listProducts, ProductItem } from "@/lib/products";
import { Anchor, Breadcrumbs, Card, Container, Image, SimpleGrid, Text } from "@mantine/core";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";

interface ProductsCategoryProps {
    category: Category
    automakers: Automaker[]
    n_products: number
}

export default function ProductsCategory({ category, automakers, n_products }: ProductsCategoryProps) {
    const cards = automakers.map((automaker) => (
        <Card
            key={automaker.key}
            ta="center"
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            component={Link}
            href={`/produtos/${category.key}/${automaker.key}`}
        >
            <Card.Section>
                <Image
                    src={automaker.image}
                    alt={automaker.label}
                    fit="contain"
                    bg="#fff"
                />
            </Card.Section>
            <Text>{automaker.label}</Text>
        </Card>
    ));

    return (
        <Container>
            <Breadcrumbs styles={{ root: { flexWrap: "wrap" } }} p="sm">
                <Anchor component={Link} href="/produtos" key="produtos">Produtos</Anchor>
                <Anchor component={Link} href={`/produtos/${category.key}`} key="category">{category.label}</Anchor>
            </Breadcrumbs>
            <Text p="sm">{`Produtos encontrados ${n_products}`}</Text>
            <SimpleGrid
                cols={4}
                spacing="lg"
                breakpoints={[
                    { maxWidth: 'md', cols: 3, spacing: 'md' },
                    { maxWidth: 'sm', cols: 2, spacing: 'sm' },
                    { maxWidth: 'xs', cols: 1, spacing: 'sm' },
                ]}
            >
                {cards}
            </SimpleGrid>
        </Container>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const paths = listCategories().map((category) => {
        return {
            "params": { "category_key": category.key }
        }
    });

    return {
        paths,
        fallback: false,
    };
}

export const getStaticProps: GetStaticProps<ProductsCategoryProps> = async (
    context
) => {
    const category_key = context.params?.category_key as string

    const category = getCategory(category_key)
    const automakers = listAutomakers()
    const products: ProductItem[] = listProducts(category_key)
    const n_products = products.length

    return {
        props: {
            category,
            automakers,
            n_products,
        } as ProductsCategoryProps
    }
}
