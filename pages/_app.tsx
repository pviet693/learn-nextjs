import axiosClient from "@/api/axios-client";
import { AppPropsWithLayout } from "@/models";
import "@/styles/globals.css";
import "@/styles/prism.css";
import { createEmotionCache, theme } from "@/utils";
import { CacheProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { SWRConfig } from 'swr';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function App({
    Component,
    pageProps
}: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => page);

    return (
        <CacheProvider value={clientSideEmotionCache}>
            <ThemeProvider theme={theme}>
                <CssBaseline /> {/* reset css */}
                <SWRConfig
                    value={{ fetcher: (url) => axiosClient.get(url), shouldRetryOnError: false }}
                >
                    {getLayout(<Component {...pageProps} />)}
                </SWRConfig>
            </ThemeProvider>
        </CacheProvider>
    );
}
