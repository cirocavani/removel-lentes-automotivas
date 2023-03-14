import { AppProps } from "next/app";
import Head from "next/head";
import { AppShell, MantineProvider } from "@mantine/core";
import AppHeader from "@/components/AppHeader/AppHeader";
import AppFooter from "@/components/AppFooter/AppFooter";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Removel Lentes Automotivas</title>
                <meta name="description" content="Removel Lentes Automotivas há 40 anos no mercado de peças e acessórios automotivos." />
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

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
