import { createStyles, Text, Container, ActionIcon, Group, rem } from "@mantine/core";
import { IconBrandFacebook, IconBrandYoutube, IconBrandInstagram } from "@tabler/icons-react";
import Link from "next/link";
import { ContactUsInfo } from "../ContactUsInfo/ContactUsInfo";

const useStyles = createStyles((theme) => ({
  footer: {
    marginTop: rem(120),
    paddingTop: `calc(${theme.spacing.xl} * 2)`,
    paddingBottom: `calc(${theme.spacing.xl} * 2)`,
    backgroundColor: theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[0],
    borderTop: `${rem(1)} solid ${theme.colorScheme === "dark" ? theme.colors.dark[5] : theme.colors.gray[2]
      }`,
  },

  logo: {
    maxWidth: rem(200),

    [theme.fn.smallerThan("sm")]: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  },

  description: {
    marginTop: rem(5),

    [theme.fn.smallerThan("sm")]: {
      marginTop: theme.spacing.xs,
      textAlign: "center",
    },
  },

  inner: {
    display: "flex",
    justifyContent: "space-between",

    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
      alignItems: "center",
    },
  },

  groups: {
    display: "flex",
    flexWrap: "wrap",

    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  wrapper: {
    width: rem(160),
  },

  link: {
    display: "block",
    color: theme.colorScheme === "dark" ? theme.colors.dark[1] : theme.colors.gray[6],
    fontSize: theme.fontSizes.sm,
    paddingTop: rem(3),
    paddingBottom: rem(3),

    "&:hover": {
      textDecoration: "underline",
    },
  },

  title: {
    fontSize: theme.fontSizes.lg,
    fontWeight: 700,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    marginBottom: `calc(${theme.spacing.xs} / 2)`,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
  },

  afterFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: theme.spacing.xl,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
    borderTop: `${rem(1)} solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[2]
      }`,

    [theme.fn.smallerThan("sm")]: {
      flexDirection: "column",
    },
  },

  social: {
    [theme.fn.smallerThan("sm")]: {
      marginTop: theme.spacing.xs,
    },
  },
}));

interface AppFooterProps {
  data: {
    title: string;
    links: { label: string; link: string }[];
  }[];
}

const FOOTER_MENU: AppFooterProps = {
  "data": [
    {
      "title": "INSTITUCIONAL",
      "links": [
        { "label": "Home", "link": "/" },
        { "label": "Empresa", "link": "/empresa" },
        { "label": "Contato", "link": "/contato" }
      ]
    }
  ]
}

export default function AppFooter() {
  const { classes } = useStyles();

  const groups = FOOTER_MENU.data.map((group) => {
    const links = group.links.map((link, index) => (
      <Text
        key={index}
        className={classes.link}
        component={Link}
        href={link.link}
      >
        {link.label}
      </Text>
    ));

    return (
      <div className={classes.wrapper} key={group.title}>
        <Text className={classes.title}>{group.title}</Text>
        {links}
      </div>
    );
  });

  return (
    <footer className={classes.footer}>
      <Container className={classes.inner}>
        <div className={classes.logo}>
          <Text size={20} color="red">Removel Lentes Automotivas</Text>
          <Text size="xs" color="dimmed" className={classes.description}>
            Há 40 anos no mercado de peças e acessórios automotivos
          </Text>
        </div>
        <div className={classes.groups}>{groups}</div>
        <ContactUsInfo />
      </Container>
      <Container className={classes.afterFooter}>
        <Text color="dimmed" size="sm">
          © 2023 Removel Lentes Automotivas. Todos os direitos reservados.
        </Text>

        <Group spacing={0} className={classes.social} position="right" noWrap>
          <ActionIcon component={Link} href="https://www.facebook.com/removellentesautomotivas" target="_blank" size="lg">
            <IconBrandFacebook size="1.05rem" stroke={1.5} />
          </ActionIcon>
          <ActionIcon component={Link} href="https://www.instagram.com/removellentesautomotivas" target="_blank" size="lg">
            <IconBrandInstagram size="1.05rem" stroke={1.5} />
          </ActionIcon>
          {/* <ActionIcon component={Link} href="https://www.youtube.com/@removelautopecas3168" target="_blank" size="lg">
            <IconBrandYoutube size="1.05rem" stroke={1.5} />
          </ActionIcon> */}
        </Group>
      </Container>
    </footer>
  );
}
