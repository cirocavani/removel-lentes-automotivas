import { createStyles, Header, Container, Group, Burger, Paper, Text, Transition } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { useRouter } from "next/router";

const useStyles = createStyles((theme) => ({
    root: {
        position: "relative",
        zIndex: 1,
    },

    dropdown: {
        position: "absolute",
        top: 40,
        left: 0,
        right: 0,
        zIndex: 0,
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
        borderTopWidth: 0,
        overflow: "hidden",

        [theme.fn.largerThan("sm")]: {
            display: "none",
        },
    },

    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        height: "100%",
    },

    links: {
        [theme.fn.smallerThan("sm")]: {
            display: "none",
        },
    },

    burger: {
        [theme.fn.largerThan("sm")]: {
            display: "none",
        },
    },

    link: {
        display: "block",
        lineHeight: 1,
        padding: "8px 12px",
        borderRadius: theme.radius.sm,
        textDecoration: "none",
        color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.colors.gray[7],
        fontSize: theme.fontSizes.sm,
        fontWeight: 500,

        "&:hover": {
            backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
        },

        [theme.fn.smallerThan("sm")]: {
            borderRadius: 0,
            padding: theme.spacing.md,
        },
    },

    linkActive: {
        "&, &:hover": {
            backgroundColor: theme.fn.variant({ variant: "light", color: theme.primaryColor }).background,
            color: theme.fn.variant({ variant: "light", color: theme.primaryColor }).color,
        },
    },
}));

interface AppHeaderProps {
    menu: { link: string; label: string }[];
}

const HEADER_DATA: AppHeaderProps = {
    "menu": [
        { "link": "/", "label": "Home" },
        { "link": "/empresa", "label": "Empresa" },
        { "link": "/produtos", "label": "Produtos" },
        { "link": "/contato", "label": "Contato" }
    ]
}

export default function AppHeader() {
    const [opened, { toggle, close }] = useDisclosure(false);
    const router = useRouter()
    const { classes, cx } = useStyles();

    const items = HEADER_DATA.menu.map((menu_item) => (
        <Link
            key={menu_item.label}
            href={menu_item.link}
            className={
                cx(
                    classes.link,
                    {
                        [classes.linkActive]: router.asPath === menu_item.link ||
                            router.asPath.startsWith(menu_item.link) && menu_item.link !== "/" ||
                            (router.asPath.match(/-/g) || []).length > 4 && menu_item.link == "/produtos"
                    }
                )
            }
            onClick={() => { close(); }}
        >
            {menu_item.label}
        </Link >
    ));

    return (
        <Header height={0} p="lg" className={classes.root}>
            <Container className={classes.header}>
                <Text size={20} color="red">Removel Lentes Automotivas</Text>
                <Group spacing={5} className={classes.links}>
                    {items}
                </Group>

                <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />

                <Transition transition="pop-top-right" duration={200} mounted={opened}>
                    {(styles) => (
                        <Paper className={classes.dropdown} withBorder style={styles}>
                            {items}
                        </Paper>
                    )}
                </Transition>
            </Container>
        </Header>
    );
}
