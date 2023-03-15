import { AppProps } from "next/app";
import Head from "next/head";
import { AppShell, MantineProvider } from "@mantine/core";
import AppHeader from "@/components/AppHeader/AppHeader";
import AppFooter from "@/components/AppFooter/AppFooter";
import Script from "next/script";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Removel Lentes Automotivas</title>
                <meta name="description" content="Removel Lentes Automotivas há 40 anos no mercado de peças e acessórios automotivos." />
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
                <link rel="icon" href="/favicon.ico" />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);}; gtag('js', new Date()); gtag('config', 'G-85T2079TE0', { page_path: window.location.pathname });`,
                    }}
                />
            </Head>
            {/* <!-- Google tag (gtag.js) --> */}
            <Script
                strategy="afterInteractive"
                src={"https://www.googletagmanager.com/gtag/js?id=G-85T2079TE0"}
            />

            <MantineProvider
                withGlobalStyles
                withNormalizeCSS
                theme={{
                    /** Put your mantine theme override here */
                    colorScheme: "dark",
                }}
            >
                <AppShell
                    styles={{ main: { minHeight: '0vh' } }}
                    padding="xl"
                    header={<AppHeader />}
                    footer={<AppFooter />}
                >
                    <Component {...pageProps} />
                </AppShell>
            </MantineProvider>
        </>
    );
}
