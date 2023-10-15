import { Post } from "@/models";
import { Box, Card, CardContent, Divider, Typography } from "@mui/material";
import { format } from "date-fns";
import * as React from "react";
import { PostItem } from "../blog";

export interface PostCardProps {
    post: Post;
}

export function PostCard({ post }: PostCardProps) {
    if (!post) return null;

    return (
        <Card>
            <CardContent>
                <PostItem post={post} />
            </CardContent>
        </Card>
    );
}
