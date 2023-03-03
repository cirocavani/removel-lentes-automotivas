import ProductMenu from "@/components/ProductMenu/ProductMenu";
import { SimpleGrid, Text } from "@mantine/core";

export default function Products() {
    return (
        <>
            <SimpleGrid cols={2}>
                <ProductMenu />
                <Text>Selecione uma categoria de produto e uma marca para listar os produtos disponíveis.</Text>
            </SimpleGrid>
        </>
    )
}
