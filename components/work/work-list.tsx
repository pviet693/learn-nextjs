import { Work } from "@/models";
import { Box, Divider } from "@mui/material";
import * as React from "react";
import { WorkCard } from ".";

export interface WorkListProps {
    workList: Work[];
}

export function WorkList({ workList }: WorkListProps) {
    if (workList.length === 0) return null;

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
