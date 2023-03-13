import { createStyles, ThemeIcon, Text, Box, Stack } from "@mantine/core";
import { IconSun, IconPhone, IconMapPin, IconAt } from "@tabler/icons-react";

type ContactUsInfoVariant = "white" | "gradient";

interface ContactUsInfoStyles {
  variant: ContactUsInfoVariant;
}

const useStyles = createStyles((theme, { variant }: ContactUsInfoStyles) => ({
  wrapper: {
    display: "flex",
    alignItems: "center",
    color: theme.white,
  },

  icon: {
    marginRight: theme.spacing.md,
    backgroundImage:
      variant === "gradient"
        ? `linear-gradient(135deg, ${theme.colors[theme.primaryColor][4]} 0%, ${theme.colors[theme.primaryColor][6]
        } 100%)`
        : "none",
    backgroundColor: "transparent",
  },

  title: {
    color: variant === "gradient" ? theme.colors.gray[6] : theme.colors[theme.primaryColor][0],
  },

  description: {
    color: variant === "gradient" ? theme.black : theme.white,
  },
}));

interface ContactUsInfoProps extends Omit<React.ComponentPropsWithoutRef<"div">, "title"> {
  icon: React.FC<any>;
  title: React.ReactNode;
  description: React.ReactNode;
  variant?: ContactUsInfoVariant;
}

function ContactIcon({
  icon: Icon,
  title,
  description,
  variant = "gradient",
  className,
  ...others
}: ContactUsInfoProps) {
  const { classes, cx } = useStyles({ variant });
  return (
    <div className={cx(classes.wrapper, className)} {...others}>
      {variant === "gradient" ? (
        <ThemeIcon size={40} radius="md" className={classes.icon}>
          <Icon size={24} />
        </ThemeIcon>
      ) : (
        <Box mr="md">
          <Icon size={24} />
        </Box>
      )}

      <div>
        <Text size="xs" className={classes.title}>
          {title}
        </Text>
        <Text className={classes.description}>{description}</Text>
      </div>
    </div>
  );
}

interface ContactUsInfoListProps {
  data?: ContactUsInfoProps[];
  variant?: ContactUsInfoVariant;
}

const CONTACT_INFO: ContactUsInfoProps[] = [
  { title: "Email", description: "vendas@removellentesautomotivas.com.br", icon: IconAt },
  { title: "Telefone", description: "(11) 4992-0375", icon: IconPhone },
  { title: "Endereço", description: "Rua Rio Negro, 44 - CEP 09060-380 - Santo André / SP", icon: IconMapPin },
  { title: "Horário de Trabalho", description: "Seg à Sex 8 às 18 Sab 8 às 12", icon: IconSun },
];

export function ContactUsInfoList({ data = CONTACT_INFO, variant }: ContactUsInfoListProps) {
  const items = data.map((item, index) => <ContactIcon key={index} variant={variant} {...item} />);
  return <Stack>{items}</Stack>;
}

export function ContactUsInfo() {
  return (
    <ContactUsInfoList variant="white" />
  );
}
