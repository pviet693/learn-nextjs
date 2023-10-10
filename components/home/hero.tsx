import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Image from "next/image";

export function HeroSection() {
    return (
        <Box component="section" pt={{ xs: 4, md: 18 }} pb={{ xs: 7, md: 9 }}>
            <Container>
                <Stack
                    spacing={4}
                    direction={{ xs: "column-reverse", md: "row" }}
                    alignItems={{ xs: "center", md: "flex-start" }}
                    textAlign={{ xs: "center", md: "left" }}
                    useFlexGap
                >
                    <Box>
                        <Typography
                            component="h1"
                            variant="h3"
                            fontWeight="bold"
                            mb={{ xs: 3.5, md: 5 }}
                        >
                            Hi, I am John,
                            <br />
                            Creative Technologist
                        </Typography>
                        <Typography mb={{ xs: 3.5, md: 5 }}>
                            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
                            sint. Velit officia consequat duis enim velit mollit. Exercitation
                            veniam consequat sunt nostrud amet.
                        </Typography>
                        <Button variant="contained">Download Resume</Button>
                    </Box>

                    <Box
                        sx={{
                            minWidth: "243px",
                            height: "243px",
                            boxShadow: "-5px 13px",
                            color: "secondary.light",
                            borderRadius: "50%"
                        }}
                    >
                        <Image
                            width={243}
                            height={243}
                            alt="avatar"
                            src="/images/avatar.png"
                            priority
                        />
                    </Box>
                </Stack>
            </Container>
        </Box>
    );
}