import { TextInput, Textarea, Group, Title, Button, Box } from '@mantine/core';
import { useForm } from '@mantine/form';

export function ContactUsForm() {
  const form = useForm({
    initialValues: {
      name: '',
      phone: '',
      email: '',
      subject: '',
      message: '',
    },
    validate: {
      email: (value) => !/^\S+@\S+$/.test(value),
      subject: (value) => value.trim().length === 0,
    },
  });

  return (
    <form onSubmit={form.onSubmit(() => { })}>
      <Box p="xl">
        <Title
          order={2}
          size="h1"
          sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}` })}
          weight={900}
          align="center"
        >
          Contato
        </Title>

        <TextInput
          label="Nome"
          placeholder="Seu nome"
          name="name"
          variant="filled"
          {...form.getInputProps('name')}
        />
        <TextInput
          label="Telefone"
          placeholder="Seu número de telefone"
          name="phone"
          variant="filled"
          {...form.getInputProps('phone')}
        />
        <TextInput
          label="Email"
          placeholder="Seu email"
          name="email"
          variant="filled"
          required
          {...form.getInputProps('email')}
        />
        <TextInput
          label="Assunto"
          placeholder="Seu interesse"
          mt="md"
          name="subject"
          variant="filled"
          required
          {...form.getInputProps('subject')}
        />
        <Textarea
          mt="md"
          label="Mensagem"
          placeholder="Sua message"
          maxRows={10}
          minRows={5}
          autosize
          name="message"
          variant="filled"
          {...form.getInputProps('message')}
        />

        <Group position="center" mt="xl">
          <Button type="submit" size="md">
            Enviar
          </Button>
        </Group>
      </Box>
    </form>
  );
}
