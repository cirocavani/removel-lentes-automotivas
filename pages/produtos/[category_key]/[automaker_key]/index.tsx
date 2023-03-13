import { listCatalogKeys, listCatalogProducts, CatalogKey, CatalogItem, Category, Automaker, getCategory, getAutomaker } from "@/lib/products"
import { Anchor, Breadcrumbs, Card, Container, SimpleGrid, Text } from "@mantine/core"
import { GetStaticPaths, GetStaticProps } from "next"
import Link from "next/link";
import Image from "next/image";

interface ProductCatalogProps {
    products: CatalogItem[]
    category: Category
    automaker: Automaker
}

export default function ProductCatalog({ products, category, automaker }: ProductCatalogProps) {
    const cards = products.map((product) => (
        <Card
            key={product.sku}
            ta="center"
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
            component={Link}
            href={`/produtos/${product.category.key}/${product.automaker.key}/${product.sku}`}
        >
            <Card.Section>
                <Image
                    src={product.image}
                    height={160}
                    alt={product.title}
                />
            </Card.Section>
            <Text>{product.title}</Text>
        </Card>
    ));

    return (
        <Container>
            <Breadcrumbs p="sm">
                <Anchor component={Link} href="/produtos" key="produtos">Produtos</Anchor>
                <Anchor component={Link} href={`/produtos/${category.key}`} key="category">{category.label}</Anchor>
                <Anchor component={Link} href={`/produtos/${category.key}/${automaker.key}`} key="automaker">{automaker.label}</Anchor>
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
    const paths = listCatalogKeys().map((catalog_key) => {
        return {
            "params": catalog_key
        }
    });

    return {
        paths,
        fallback: false,
    };
}

export const getStaticProps: GetStaticProps<ProductCatalogProps> = async (
    context
) => {
    const catalog_key = context.params as CatalogKey

    const products: CatalogItem[] = listCatalogProducts(catalog_key)
    const category = getCategory(catalog_key.category_key)
    const automaker = getAutomaker(catalog_key.automaker_key)

    return {
        props: {
            products,
            category,
            automaker,
        } as ProductCatalogProps
    }
}
