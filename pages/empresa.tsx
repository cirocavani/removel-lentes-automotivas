import { Container, List, Space, Text, Title } from "@mantine/core";
import Link from "next/link";

export default function About() {
    return (
        <Container>
            <Title mb="md">QUEM SOMOS</Title>

            <Text>
                Há mais de 40 anos o patriarca da família inicia sua história sendo motorista de uma distribuidora de peças e acessórios para automóveis. Com o continuo desenvolvimento abriu sua primeira empresa voltada a atender o ramo de acessórios de peças automobilísticas introduzindo todos da família. Após 20 anos de união e contínua evolução dentro do mercado ele fez com que uma uma empresa familiar se tornasse uma industria. A REMOVEL investe continuamente na sua modernização e em novos processos produtivos e se torna uma empresa norteadora na linha de vidros automotivos para retrovisores. Em contínua expansão, a REMOVEL vem conquistando clientes mais exigentes com grande variedade e qualidade em suas linhas de vidros para retrovisores automotivos em espelho cristal e espelho azul antiofuscante. Nas linhas leves, vans e/ou pesados, na rua ou na estrada, conte com a qualidade e compromisso REMOVEL.
            </Text>

            <Title mt="lg" mb="md">VISÃO</Title>

            <Text>
                Hoje, a REMOVEL é uma das principais fornecedoras de vidro espelho para retrovisores do Brasil. Temos como objetivo a plena e total satisfação do cliente. Com investimentos constantes em soluções para o seu dia-a-dia.
            </Text>

            <Title mt="lg" mb="md">MISSÃO</Title>

            <Text>
                A REMOVEL fabrica vidros para retrovisores atendendo as especificações automotivas, tendo em vista que o espelho agrega segurança, valor e melhora a funcionalidade. Como fabricante de espelhos retrovisores para o mercado de reposição nas linhas leve, vans e pesados, a REMOVEL atende todos os requisitos funcionais, óticos e financeiros.
            </Text>

            <Title mt="lg" mb="md">VALORES</Title>

            <List>
                <List.Item>Valorizar o ser humano.</List.Item>
                <List.Item>Capacitação contínua.</List.Item>
                <List.Item>Constante evolução e inovação.</List.Item>
                <List.Item>Comprometimento com o cliente.</List.Item>
                <List.Item>Ética e respeito.</List.Item>
                <List.Item>Profissionalismo.</List.Item>
                <List.Item>Sustentabilidade.</List.Item>
            </List>

            <Title mt="lg" mb="md">VALIDADE X GARANTIA</Title>

            <Text mb="xs">
                Todos os nossos espelhos retrovisores possui validade indeterminada.
            </Text>
            <Text mb="xs">
                Isso significa que não há um período para consumo.
            </Text>

            <Text mb="xs">
                Para informações sobre garantia, entre em contato com <Link href="mailto:garantia@removellentesautomotivas.com.br">garantia@removellentesautomotivas.com.br</Link> ou em caso de dúvidas, entre em contato com o seu representante e/ou vendedor direto.
            </Text>

            <Text mb="xs">
                Dúvidas, informações, reclamações ou sugestões, por gentileza nos envie um e-mail <Link href="mailto:adm@removellentesautomotivas.com.br">adm@removellentesautomotivas.com.br</Link>.
            </Text>
        </Container>
    )
}
