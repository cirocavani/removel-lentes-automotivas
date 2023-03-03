import ProductMenu from '@/components/ProductMenu/ProductMenu'
import { AUTOMAKER, PRODUCTS } from '@/lib/products'
import { SimpleGrid, Text } from '@mantine/core'
import { useRouter } from 'next/router'

export default function ProductList() {
    const router = useRouter()
    const { path_key, automaker_name } = router.query

    return (
        <>
            <SimpleGrid cols={2}>
                <ProductMenu />
                <Text>{`Produtos de ${path_key} para ${automaker_name}`}</Text>
            </SimpleGrid>
        </>
    )
}

interface ProductListProps {
    product: { path_key: string; automaker_name: string; };
}

export async function getStaticPaths() {
    // Return a list of possible value for path_key and automaker_name
    const paths = PRODUCTS.flatMap((product) => {
        return AUTOMAKER.map((automaker_name) => (
            {
                "params": {
                    "path_key": product.path_key,
                    "automaker_name": automaker_name
                }
            }
        ))
    });
    return {
        paths,
        fallback: false,
    };
}

export async function getStaticProps({ product }: ProductListProps) {
    return {
        props: {},
    }
}
