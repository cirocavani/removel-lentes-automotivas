import { AUTOMAKER, PRODUCTS } from "@/lib/products";
import { Box, NavLink } from "@mantine/core";
import Link from "next/link";

export default function ProductMenu() {
    const items = PRODUCTS.map((product) => {
        const subitems = AUTOMAKER.map((automaker_name, index) => (
            <NavLink
                key={index}
                label={automaker_name}
                component={Link}
                href={`/produtos/${product.path_key}/${automaker_name}`}
                p={0}
            />
        ));

        return (
            <NavLink
                key={product.name}
                label={product.name}
                childrenOffset={28}
            >
                {subitems}
            </NavLink>
        );
    });

    return (
        <Box sx={{ width: 240 }} p="md">
            {items}
        </Box>
    )
}
