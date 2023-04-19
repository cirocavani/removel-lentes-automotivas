import { AUTOMEC_CAROUSEL_IMGS } from "@/lib/images";
import { Image } from '@mantine/core';
import { Carousel } from '@mantine/carousel';


export function AutomecCarousel() {
    const slides = AUTOMEC_CAROUSEL_IMGS.map((image) => (
        <Carousel.Slide key={image}>
            <Image
                src={image}
                alt={image}
            />
        </Carousel.Slide>
    ));

    return (
        <Carousel
            withIndicators
            loop
        >
            {slides}
        </Carousel>
    );
}
