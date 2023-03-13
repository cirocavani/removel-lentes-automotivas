import { listCatalogMenu } from "@/lib/products";
import { Box, NavLink } from "@mantine/core";
import Link from "next/link";

export default function ProductMenu() {
    const items = listCatalogMenu().map((catalog_menu) => {
        const category = catalog_menu.category
        const subitems = catalog_menu.automakers.map((automaker) => (
            <NavLink
                key={automaker.key}
                label={automaker.label}
                component={Link}
                href={`/produtos/${category.key}/${automaker.key}`}
                p={0}
            />
        ));

        return (
            <NavLink
                key={category.key}
                label={category.label}
                childrenOffset={28}
            >
                {subitems}
            </NavLink>
        );
    });

    return (
        <Box sx={{ width: 150 }} p="md">
            {items}
        </Box>
    )
}
