import axiosClient from "@/api/axios-client";
import { AppPropsWithLayout } from "@/models";
import "@/styles/globals.css";
import "@/styles/prism.css";
import { createEmotionCache, theme } from "@/utils";
import { CacheProvider } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SWRConfig } from 'swr';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function App({
    Component,
    pageProps,
    emotionCache = clientSideEmotionCache
}: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => page);

    return (
        <CacheProvider value={emotionCache}>
            <ThemeProvider theme={theme}>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
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
