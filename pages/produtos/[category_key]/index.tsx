import { Automaker, Category, getCategory, listAutomakers, listCategories, listProducts, ProductItem } from "@/lib/products";
import { Anchor, Breadcrumbs, Card, Container, SimpleGrid, Text } from "@mantine/core";
import Link from "next/link";
import Image from "next/image";
import { GetStaticPaths, GetStaticProps } from "next";

interface ProductsCategoryProps {
    category: Category
    automakers: Automaker[]
    products: ProductItem[]
}

export default function ProductsCategory({ category, automakers, products }: ProductsCategoryProps) {
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
                    height={160}
                    alt={automaker.label}
                />
            </Card.Section>
            <Text>{automaker.label}</Text>
        </Card>
    ));

    return (
        <Container>
            <Breadcrumbs p="sm">
                <Anchor component={Link} href="/produtos" key="produtos">Produtos</Anchor>
                <Anchor component={Link} href={`/produtos/${category.key}`} key="category">{category.label}</Anchor>
            </Breadcrumbs>
            <Text p="sm">{`Produtos encontrados ${products.length}`}</Text>
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
    // Return a list of possible value for category_id and automaker
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

    return {
        props: {
            category,
            automakers,
            products,
        } as ProductsCategoryProps
    }
}
