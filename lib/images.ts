import nextConfig from "../next.config.mjs"

function img_path(name: string): string {
    return `${nextConfig.basePath}/images/${name}`
}

const REMOVEL_BANNER_IMG = img_path("removel-cover.webp")

const REMOVEL_CAR_IMG = img_path("removel-retrovisor-carro.png")

const AUTOMEC_CAROUSEL_IMGS = [
    img_path("automec_carousel_1.webp"),
    img_path("automec_carousel_2.webp"),
    img_path("automec_carousel_3.webp"),
];

export {
    img_path,
    REMOVEL_BANNER_IMG,
    REMOVEL_CAR_IMG,
    AUTOMEC_CAROUSEL_IMGS,
}
