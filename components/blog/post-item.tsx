import { Post } from '@/models';
import { Box, Divider, Typography } from '@mui/material';
import { format } from 'date-fns';

export interface PostItemProps {
    post: Post
}

export function PostItem({ post }: PostItemProps) {
    return (
        <Box>
            <Typography variant="h5" fontWeight="bold">
                {post.title}
            </Typography>

            <Box my={2} sx={{ display: "flex" }}>
                {format(new Date(post.publishedDate), "dd MMM yyyy")}

                <Divider orientation="vertical" sx={{ mx: 2 }} flexItem />

                {post.tagList.join(", ")}
            </Box>

            <Typography variant="body2">{post.description}</Typography>
        </Box>
    );
}
