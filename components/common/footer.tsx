import { Facebook, Instagram, Twitter, LinkedIn } from "@mui/icons-material";
import { Box, Stack, Typography, Icon } from "@mui/material";
import * as React from "react";

export function Footer() {
    const socialLinks = [
        { icon: Facebook, url: "https://google.com" },
        { icon: Instagram, url: "https://google.com" },
        { icon: Twitter, url: "https://google.com" },
        { icon: LinkedIn, url: "https://google.com" }
    ];

    return (
        <Box component="footer" py={2} textAlign="center">
            <Stack direction="row" justifyContent="center">
                {socialLinks.map((item, index) => (
                    <Box
                        key={index}
                        component="a"
                        p={2}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Icon component={item.icon} sx={{ fontSize: 48 }} />
                    </Box>
                ))}
            </Stack>

            <Typography>Copyright ©{new Date().getFullYear()} All rights reserved </Typography>
        </Box>
    );
}
