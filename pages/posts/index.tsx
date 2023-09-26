import { GetStaticPropsContext, GetStaticProps } from "next";
import React from "react";
import Link from "next/link";

interface PostListPageProps {
    posts: any[];
}

function PostList(props: PostListPageProps) {
    return (
        <div>
            <h1>Post List Page</h1>

            <ul>
                {props.posts.map((post) => (
                    <li key={post.id}>
                        <Link href={`/posts/${post.id}`}>
                            <a href="">{post.title}</a>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PostList;

export const getStaticProps: GetStaticProps<PostListPageProps> = async function (
    context: GetStaticPropsContext
) {
    // hàm này ở phía server-side
    // run lúc build-time
    // lúc dev thì sẽ chạy khi refresh
    // lúc build lên production thì sẽ chỉ chạy lúc build

    const response = await fetch("https://js-post-api.herokuapp.com/api/posts?_page=1");
    const data = await response.json();

    return {
        props: {
            posts: data.data.map((item: any) => ({ id: item.id, title: item.title }))
        }
    };
};
