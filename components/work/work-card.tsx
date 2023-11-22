import { Work } from "@/models";
import { Box, Chip, Stack, Typography } from "@mui/material";
import Image from "next/image";
import * as React from "react";

export interface WorkCardProps {
    work: Work;
}

export function WorkCard({ work }: WorkCardProps) {
    return (
        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <Box sx={{ xs: "100%", md: "246px", position: "relative" }} flexShrink={0}>
                {" "}
                {/** không co lại */}
                <Image
                    src={work.thumbnailUrl}
                    alt="work thumbnail"
                    width={246}
                    height={180}
                    priority
                />
            </Box>
            <Box>
                <Typography variant="h4" fontWeight="bold">
                    {work.title}
                </Typography>
                <Stack direction="row" my={2}>
                    <Chip
                        color="secondary"
                        label={new Date(Number(work.createdAt)).getFullYear()}
                        size="small"
                    />
                    <Typography ml={3} color="GrayText">
                        {work.tagList.join(", ")}
                    </Typography>
                </Stack>
                <Typography>{work.shortDescription}</Typography>
            </Box>
        </Stack>
    );
}
