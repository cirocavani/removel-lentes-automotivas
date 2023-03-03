import ProductMenu from '@/components/ProductMenu/ProductMenu'
import { SimpleGrid, Text } from '@mantine/core'
import { useRouter } from 'next/router'

export default function ProductList() {
    const router = useRouter()
    const { path_key } = router.query

    return (
        <>
            <SimpleGrid cols={2}>
                <ProductMenu />
                <Text>{`Selecione uma marca para ${path_key}`}</Text>
            </SimpleGrid>
        </>
    )
}
