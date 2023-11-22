import { LayoutProps } from "@/models/common";
import { Box, Stack } from "@mui/material";
import { Footer } from "../common";
import dynamic from "next/dynamic";

const Header = dynamic(() => import("../common/header").then((mod) => mod.Header), { ssr: false });

export function MainLayout(props: LayoutProps) {
    return (
        <Stack minHeight="100vh">
            <Header />

            <Box component="main" flexGrow={1}>
                {props.children}
            </Box>

            <Footer />
        </Stack>
    );
}
