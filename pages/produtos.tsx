import { Box, NavLink } from "@mantine/core";
import Link from "next/link";

const PRODUCTS = [
    { "name": "Lente Cristal", "path_name": "lente-cristal" },
    { "name": "Lente Azul", "path_name": "lente-azul" }
]

const AUTOMAKERS = [
    "ASIA",
    "AUDI",
    "BMW",
    "CHERRY",
    "CHEVROLET",
    "CITROËN",
    "DODGE",
    "FIAT",
    "FORD",
    "HONDA",
    "HYUNDAI",
    "IVECO",
    "JAC",
    "JEEP",
    "KIA",
    "LAND ROVER",
    "MERCEDES-BENZ",
    "MITSUBISHI",
    "NISSAN",
    "PEUGEOT",
    "RENAULT",
    "SUZUKI",
    "TOYOTA",
    "VOLKSWAGEN",
    "VOLVO"
]

export default function Products() {
    const items = PRODUCTS.map((product) => {
        const nested_items = AUTOMAKERS.map((automaker_name, index) => (
            <NavLink
                key={index}
                label={automaker_name}
                component={Link}
                href={`/produtos/${product.path_name}/${automaker_name}`}
                p={0}
            />
        ));

        return (
            <NavLink
                key={product.name}
                label={product.name}
                childrenOffset={28}
            >
                {nested_items}
            </NavLink>
        );
    });

    return (
        <Box sx={{ width: 240 }} p="md">
            {items}
        </Box>
    )
}
