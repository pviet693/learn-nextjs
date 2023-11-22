import { Work } from "@/models";
import { Box, Divider, Typography } from "@mui/material";
import * as React from "react";
import { WorkCard, WorkSkeleton } from ".";
import Image from "next/image";

export interface WorkListProps {
    workList: Work[];
    loading?: boolean;
}

export function WorkList({ workList, loading }: WorkListProps) {
    if (loading) {
        return (
            <Box>
                {Array.from({ length: 3 }).map((_, index) => (
                    <React.Fragment key={index}>
                        <WorkSkeleton />
                        <Divider sx={{ my: 3 }} />
                    </React.Fragment>
                ))}
            </Box>
        )
    }

    if (workList.length === 0) {
        return (
            <Box textAlign="center" mt={8}>
                <Image
                    width={150}
                    height={150}
                    alt="no-data"
                    src="https://res.cloudinary.com/dyr7b5uuf/image/upload/v1699282494/learn-nextjs/bw1vjcbzfyomlmgkp8b8.svg"
                    priority
                />
                <Typography>No data</Typography>
            </Box>
        );
    }

    return (
        <Box>
            {workList.map((work) => (
                <React.Fragment key={work.id}>
                    <WorkCard work={work} />
                    <Divider sx={{ my: 3 }} />
                </React.Fragment>
            ))}
        </Box>
    );
}
