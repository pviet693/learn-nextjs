import { Box, Container, Typography } from "@mui/material";
import * as React from "react";
import { Work } from "@/models";
import { WorkList } from "../work";

export function FeaturedWorks() {
    const workList: Work[] = [
        {
            id: "1",
            title: "Designing Dashboards",
            createdAt: "1696775982913",
            updatedAt: "1696775982913",
            tagList: ["Dashboard"],
            shortDescription:
                "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
            fullDescription: "",
            thumbnailUrl:
                "https://res.cloudinary.com/dyr7b5uuf/image/upload/v1696779740/learn-nextjs/item1_hvrwf8.jpg"
        },
        {
            id: "2",
            title: "Vibrant Portraits of 2020",
            createdAt: "1696775982913",
            updatedAt: "1696775982913",
            tagList: ["Illustration"],
            shortDescription:
                "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
            fullDescription: "",
            thumbnailUrl:
                "https://res.cloudinary.com/dyr7b5uuf/image/upload/v1696779740/learn-nextjs/item2_tdl7yw.jpg"
        },
        {
            id: "3",
            title: "36 Days of Malayalam type",
            createdAt: "1696775982913",
            updatedAt: "1696775982913",
            tagList: ["Typography"],
            shortDescription:
                "Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.",
            fullDescription: "",
            thumbnailUrl:
                "https://res.cloudinary.com/dyr7b5uuf/image/upload/v1696779740/learn-nextjs/item3_kgswcc.jpg"
        }
    ];

    return (
        <Box component="section" pt={2} pb={4}>
            <Container>
                <Typography variant="h5" mb={3}>Featured Works</Typography>

                <WorkList workList={workList} />
            </Container>
        </Box>
    );
}
