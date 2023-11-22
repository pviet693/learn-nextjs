import { Typography, Box, Skeleton, Stack } from "@mui/material";
import * as React from "react";

export function WorkSkeleton() {
    return (
        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <Box sx={{ xs: "100%", md: "246px", position: "relative" }} flexShrink={0}>
                <Skeleton variant="rectangular" width={246} height={180} />
            </Box>
            <Box flexGrow={1}>
                <Typography variant="h4" fontWeight="bold">
                    <Skeleton />
                </Typography>
                <Stack alignItems="center" direction="row" my={2}>
                    <Skeleton variant="rectangular" width={50} height={24} />
                    <Typography ml={3} color="GrayText" flexGrow={1}>
                        <Skeleton />
                    </Typography>
                </Stack>
                <Typography>
                    <Skeleton />
                    <Skeleton />
                    <Skeleton width="40%" />
                </Typography>
            </Box>
        </Stack>
    );
}
