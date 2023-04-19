import { REMOVEL_BANNER_IMG } from "@/lib/images";
import { AutomecCarousel } from "@/components/AutomecCarousel/AutomecCarousel";
import { CatalogHero } from "@/components/CatalogHero/CatalogHero";
import { Container, Image } from "@mantine/core";

export default function Home() {
    return (
        <Container>
            <Image src={REMOVEL_BANNER_IMG} alt="Removel Lentes Automotivas" />
            <CatalogHero />
            <AutomecCarousel />
        </Container>
    )
}
