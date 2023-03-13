import { Category, listCategories, listProducts, ProductItem } from "@/lib/products";
import { Anchor, Breadcrumbs, Card, Center, Container, SimpleGrid, Text } from "@mantine/core";
import Link from "next/link";
import Image from "next/image";
import { GetStaticProps } from "next";

interface ProductsProps {
    categories: Category[]
    products: ProductItem[]
}

export default function Products({ categories, products }: ProductsProps) {
    const cards = categories.map((category) => (
        <Card
            key={category.key}
            ta="center"
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            component={Link}
            href={`/produtos/${category.key}`}
        >
            <Card.Section>
                <Image
                    src={category.image}
                    height={160}
                    alt={category.label}
                />
            </Card.Section>
            <Text>{category.label}</Text>
        </Card>
    ));

    return (
        <Container>
            <Breadcrumbs p="sm">
                <Anchor component={Link} href="/produtos" key="produtos">Produtos</Anchor>
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

export const getStaticProps: GetStaticProps<ProductsProps> = async (
    context
) => {
    const categories: Category[] = listCategories()
    const products: ProductItem[] = listProducts()

    return {
        props: {
            categories,
            products,
        } as ProductsProps
    }
}
