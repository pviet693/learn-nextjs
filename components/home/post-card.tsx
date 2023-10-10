import { Post } from "@/models";
import { Box, Card, CardContent, Divider, Typography } from "@mui/material";
import { format } from "date-fns";
import * as React from "react";

export interface PostCardProps {
    post: Post;
}

export function PostCard({ post }: PostCardProps) {
    if (!post) return null;

    return (
        <Card>
            <CardContent>
                <Typography variant="h5" fontWeight="bold">
                    {post.title}
                </Typography>

                <Box my={2} sx={{ display: "flex" }}>
                    {format(Number(post.publishedDate), "dd MMM yyyy")}

                    <Divider orientation="vertical" sx={{ mx: 2 }} flexItem />

                    {post.tagList.join(", ")}
                </Box>

                <Typography variant="body2">{post.description}</Typography>
            </CardContent>
        </Card>
    );
}
