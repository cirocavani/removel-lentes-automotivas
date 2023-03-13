import { AppProps } from "next/app";
import Head from "next/head";
import { AppShell, MantineProvider, Navbar, Text } from "@mantine/core";
import AppHeader from "@/components/AppHeader/AppHeader";
import AppFooter from "@/components/AppFooter/AppFooter";

export default function App(props: AppProps) {
    const { Component, pageProps } = props;

    return (
        <>
            <Head>
                <title>Removel Lentes Automotivas</title>
                <meta name="description" content="Removel Lentes Automotivas" />
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
