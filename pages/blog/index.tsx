import { PostItem } from "@/components/blog";
import { MainLayout } from "@/components/layout";
import { Post } from "@/models";
import { getPostList } from "@/utils";
import { Box, Container, Divider } from "@mui/material";
import { GetStaticProps, GetStaticPropsContext } from "next";
import Link from "next/link";
import React from "react";

interface BlogListPageProps {
    posts: Post[];
}

function BlogListPage({ posts }: BlogListPageProps) {

    return (
        <Box>
            <Container>
                <h1>Blog</h1>

                <Box component="ul" sx={{ listStyleType: "none", p: 0 }}>
                    {posts.map((post) => (
                        <li key={post.id}>
                            <Link href={`/blog/${post.slug}`}>
                                <PostItem post={post} />
                            </Link>

                            <Divider sx={{ my: 3 }} />
                        </li>
                    ))}
                </Box>
            </Container>
        </Box>
    );
}

BlogListPage.getLayout = function getLayout(page: React.ReactElement) {
    return <MainLayout>{page}</MainLayout>;
};

export default BlogListPage;

export const getStaticProps: GetStaticProps<BlogListPageProps> = async function (
    context: GetStaticPropsContext
) {
    // hàm này ở phía server-side
    // run lúc build-time
    // lúc dev thì sẽ chạy khi refresh
    // lúc build lên production thì sẽ chỉ chạy lúc build

    const postList = await getPostList();

    return {
        props: {
            posts: postList
        }
    };
};
