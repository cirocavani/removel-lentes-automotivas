import { MAIN_CAROUSEL_DATA } from "@/lib/main_carousel";
import { createStyles, Image, getStylesRef, rem } from '@mantine/core';
import { Carousel } from '@mantine/carousel';

const useStyles = createStyles((theme) => ({
  price: {
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
  },

  carousel: {
    '&:hover': {
      [`& .${getStylesRef('carouselControls')}`]: {
        opacity: 1,
      },
    },
  },

  carouselControls: {
    ref: getStylesRef('carouselControls'),
    transition: 'opacity 150ms ease',
    opacity: 0,
  },

  carouselIndicator: {
    width: rem(4),
    height: rem(4),
    transition: 'width 250ms ease',

    '&[data-active]': {
      width: rem(16),
    },
  },
}));

export function MainCarousel() {
  const { classes } = useStyles();

  const slides = MAIN_CAROUSEL_DATA.map((image) => (
    <Carousel.Slide key={image}>
      <Image src={image} />
    </Carousel.Slide>
  ));

  return (
    <Carousel
      withIndicators
      loop
      classNames={{
        root: classes.carousel,
        controls: classes.carouselControls,
        indicator: classes.carouselIndicator,
      }}
    >
      {slides}
    </Carousel>
  );
}
