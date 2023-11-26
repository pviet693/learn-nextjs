import { useAuth } from "@/hooks";
import { Box, Container, Link as MuiLink, Stack } from "@mui/material";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { ROUTE_LIST } from "./routes";

export interface HeaderDesktopProps {}

export function HeaderDesktop(props: HeaderDesktopProps) {
    const router = useRouter();
    const { profile, logout, isLoggedIn } = useAuth();
    const routeList = ROUTE_LIST.filter(
        (route) => !route.requireLogin || (route.requireLogin && isLoggedIn)
    );

    return (
        <Box display={{ xs: "none", md: "block" }} py={2}>
            <Container>
                <Stack direction="row" justifyContent="flex-end">
                    {routeList.map((route) => (
                        <Link key={route.path} href={route.path} legacyBehavior passHref>
                            <MuiLink
                                sx={{ ml: 2, fontWeight: "medium" }}
                                className={clsx({ active: router.pathname === route.path })}
                            >
                                {route.label}
                            </MuiLink>
                        </Link>
                    ))}

                    {!isLoggedIn ? (
                        <Link href="/login" legacyBehavior passHref>
                            <MuiLink sx={{ ml: 2, fontWeight: "medium" }}>Login</MuiLink>
                        </Link>
                    ) : (
                        <MuiLink
                            sx={{ ml: 2, fontWeight: "medium", cursor: "pointer" }}
                            onClick={logout}
                        >
                            Logout
                        </MuiLink>
                    )}
                </Stack>
            </Container>
        </Box>
    );
}
