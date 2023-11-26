import * as React from "react";
import { useAuth } from "@/hooks";
import { useRouter } from "next/router";
import { LoginForm } from "@/components/auth";
import { LoginPayload } from "@/models";
import { Box, Paper, Typography } from "@mui/material";
import { decodeUrl, getErrorMessage } from "@/utils";
import { toast } from "react-toastify";

export default function LoginPage() {
    const router = useRouter();
    const { login, logout, profile } = useAuth({
        revalidateOnMount: false
    });

    async function handleLoginSubmit(payload: LoginPayload) {
        try {
            await login(payload);

            const backTo = router.query?.back_to ? decodeUrl(router.query?.back_to as string) : "/";
            router.push(backTo)
        } catch (error: unknown) {
            const message = getErrorMessage(error);
            toast.error(message);
        }
    }

    return (
        <Box>
            <Paper
                elevation={4}
                sx={{ mx: "auto", mt: 8, mb: 4, p: 4, maxWidth: "480px", textAlign: "center" }}
            >
                <Typography component="h1" variant="h5" mb={3}>
                    Login
                </Typography>

                <LoginForm onSubmit={handleLoginSubmit} />
            </Paper>
        </Box>
    );
}
