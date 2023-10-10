import { LayoutProps } from "@/models/common";
import { Box, Container, Stack } from "@mui/material";
import Link from "next/link";
import { Footer, Header } from "../common";

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
