import { CATALOG_2024_PDF } from '@/lib/files';
import { REMOVEL_CAR_IMG } from '@/lib/images';
import { IconLayoutGridAdd, IconPdf } from '@tabler/icons-react';
import Link from 'next/link';

import { Title, Text, Container, Button, Overlay, createStyles, rem } from '@mantine/core';

const useStyles = createStyles((theme) => ({
    wrapper: {
        position: 'relative',
        paddingTop: rem(180),
        paddingBottom: rem(130),
        backgroundImage: `url(${REMOVEL_CAR_IMG})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',

        [theme.fn.smallerThan('xs')]: {
            paddingTop: rem(80),
            paddingBottom: rem(50),
        },
    },

    inner: {
        position: 'relative',
        zIndex: 1,
    },

    title: {
        fontWeight: 800,
        fontSize: rem(40),
        letterSpacing: rem(-1),
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,
        color: theme.white,
        marginBottom: theme.spacing.xs,
        textAlign: 'center',
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,

        [theme.fn.smallerThan('xs')]: {
            fontSize: rem(28),
            textAlign: 'left',
        },
    },

    highlight: {
        color: theme.colors[theme.primaryColor][4],
    },

    description: {
        color: theme.colors.gray[0],
        textAlign: 'center',

        [theme.fn.smallerThan('xs')]: {
            fontSize: theme.fontSizes.md,
            textAlign: 'left',
        },
    },

    controls: {
        marginTop: `calc(${theme.spacing.xl} * 1.5)`,
        display: 'flex',
        justifyContent: 'center',
        paddingLeft: theme.spacing.md,
        paddingRight: theme.spacing.md,

        [theme.fn.smallerThan('xs')]: {
            flexDirection: 'column',
        },
    },

    control: {
        height: rem(42),
        fontSize: theme.fontSizes.md,

        '&:not(:first-of-type)': {
            marginLeft: theme.spacing.md,
        },

        [theme.fn.smallerThan('xs')]: {
            '&:not(:first-of-type)': {
                marginTop: theme.spacing.md,
                marginLeft: 0,
            },
        },
    },

    secondaryControl: {
        color: theme.white,
        backgroundColor: 'rgba(255, 255, 255, .4)',

        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, .45) !important',
        },
    },
}));

export function CatalogHero() {
    const { classes, cx } = useStyles();

    return (
        <div className={classes.wrapper}>
            <Overlay color="#000" opacity={0.65} zIndex={1} />

            <div className={classes.inner}>
                <Title className={classes.title}>
                    Catálogo de Produtos 2024
                </Title>

                <Container size={640}>
                    <Text size="lg" className={classes.description}>
                        Conheça todos os nossos produtos de lentes automotivas. Baixe nosso catálogo.
                    </Text>
                </Container>

                <div className={classes.controls}>
                    <Button
                        className={classes.control}
                        variant="white"
                        size="lg"
                        component={Link}
                        href={CATALOG_2024_PDF}
                        leftIcon={<IconPdf size="0.9rem" />}
                    >
                        Baixar Catálogo
                    </Button>
                    <Button
                        className={cx(classes.control, classes.secondaryControl)}
                        size="lg"
                        component={Link}
                        href="/produtos"
                        leftIcon={<IconLayoutGridAdd size="0.9rem" />}
                    >
                        Catálogo Online
                    </Button>
                </div>
            </div>
        </div>
    );
}
