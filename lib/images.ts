import nextConfig from "../next.config.mjs"

const IMAGE_PATH = `${nextConfig.basePath}/images`

const REMOVEL_BANNER_IMG = img_path("removel-cover.webp")

const REMOVEL_CAR_IMG = img_path("removel-retrovisor-carro.png")

const MAIN_CAROUSEL_DATA = [
    img_path("main_carousel_1.webp"),
    img_path("main_carousel_2.webp"),
    img_path("main_carousel_3.webp"),
];

function img_path(name: string): string {
    return `${IMAGE_PATH}/${name}`
}

export {
    img_path,
    REMOVEL_BANNER_IMG,
    REMOVEL_CAR_IMG,
    MAIN_CAROUSEL_DATA,
}
