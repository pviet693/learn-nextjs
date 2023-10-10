import { Heebo } from "next/font/google";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import { red } from "@mui/material/colors";

export const heebo = Heebo({
    weight: ["300", "400", "500", "700"],
    subsets: ["latin"],
    display: "swap"
});

// Create a theme instance.
export let theme = createTheme({
    palette: {
        primary: {
            main: "#FF6464"
        },
        secondary: {
            light: "#EDF7FA",
            main: "#19857b"
        },
        error: {
            main: red.A400
        },
        text: {
            primary: "#21243D"
        }
    },
    typography: {
        fontFamily: `${heebo.style.fontFamily}, san-serif`
    },
    components: {
        MuiContainer: {
            styleOverrides: {
                maxWidthSm: {
                    maxWidth: "680px",
                    "@media (max-width: 600px)": {
                        maxWidth: "680px"
                    }
                },
                maxWidthMd: {
                    maxWidth: "860px",
                    "@media (max-width: 900px)": {
                        maxWidth: "860px"
                    }
                }
            },
            defaultProps: {
                maxWidth: "md"
            },
            variants: []
        },
        MuiLink: {
            styleOverrides: {
                root: {
                    color: "#000",

                    "&:hover, &.active": {
                        color: "#FF6464"
                    }
                }
            },
            defaultProps: {
                underline: "none"
            }
        },
        MuiButton: {
            variants: [
                {
                    props: { variant: "contained", color: "primary" }, // trong TH button có prop này
                    style: {
                        // thì apply cái style này
                        color: "white"
                    }
                }
            ]
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    paddingInline: 2
                }
            },
            variants: [
                {
                    props: { color: "secondary" }, // trong Chip có prop này
                    style: {
                        background: "#142850",
                        color: "#fff",
                        fontWeight: "bold",
                        fontSize: "16px"
                    }
                }
            ]
        }
    }
});

theme = responsiveFontSizes(theme);
