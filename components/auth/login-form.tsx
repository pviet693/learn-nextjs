import { LoginPayload } from "@/models";
import { yupResolver } from "@hookform/resolvers/yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, CircularProgress, IconButton, InputAdornment } from "@mui/material";
import * as React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { InputField } from "../form";

export interface LoginFormProps {
    onSubmit?: (payload: LoginPayload) => void;
}

export function LoginForm({ onSubmit }: LoginFormProps) {
    const schema = yup.object({
        username: yup
            .string()
            .required("Please enter username")
            .min(4, "Username is required to have at least 4 character"),
        password: yup
            .string()
            .required("Please enter password")
            .min(6, "Username is required to have at least 6 character")
    });

    const [showPassword, setShowPassword] = React.useState<boolean>(false);
    const { control, handleSubmit, formState: { isSubmitting } } = useForm({
        defaultValues: {
            username: "",
            password: ""
        },
        resolver: yupResolver(schema)
    });

    async function handleLoginSubmit(payload: LoginPayload) {
        await onSubmit?.(payload);
    }

    return (
        <Box component="form" onSubmit={handleSubmit(handleLoginSubmit)}>
            <InputField label="Username" name="username" control={control} />
            <InputField
                label="Password"
                name="password"
                control={control}
                type={showPassword ? "text" : "password"}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => setShowPassword((prev: boolean) => !prev)}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    )
                }}
            />

            <Button
                disabled={isSubmitting}
                startIcon={isSubmitting ? <CircularProgress color="inherit" size="1em" /> : null}
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 3 }}
            >
                Login
            </Button>
        </Box>
    );
}
