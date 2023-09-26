import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import { useRouter } from "next/router";
import React from "react";

interface PostPageProps {
    post: any;
}

function PostDetailPage({ post }: PostPageProps) {
    const router = useRouter();

    if (!post) return null;

    if (router.isFallback) { // dùng với fallback = true của getStaticPaths
        return <div>Loading...</div>
    }

    return (
        <div>
            <h1>Post Details Page</h1>

            <p>{post.title}</p>
            <p>{post.author}</p>
            <p>{post.description}</p>
        </div>
    );
}

export default PostDetailPage;

export const getStaticPaths: GetStaticPaths = async () => {
    const response = await fetch("https://js-post-api.herokuapp.com/api/posts?_page=1");
    const data = await response.json();

    return {
        paths: data.data.map((post: any) => ({ params: { postId: post.id } })),
        // fallback: false // true or 'blocking'
        // fallback: "blocking"    // không page không được generate thì sẽ chờ generate
                                    // trong thời gian đó trên browser sẽ bị block
        fallback: true // không page không được generate thì sẽ chờ generate
                        // trong thời gian đó trên browser sẽ hiện loading
    };
};

export const getStaticProps: GetStaticProps<PostPageProps> = async function (
    context: GetStaticPropsContext
) {
    // hàm này ở phía server-side
    // run lúc build-time
    // lúc dev thì sẽ chạy khi refresh
    // lúc build lên production thì sẽ chỉ chạy lúc build

    const postId = context.params?.postId;
    if (!postId) return { notFound: true };

    const response = await fetch(`https://js-post-api.herokuapp.com/api/posts/${postId}`);
    const data = await response.json();

    return {
        props: {
            post: data
        },
        revalidate: 5   // ISR, khi lâu hơn 5s nếu có request lên server thì sẽ trả về page đã cache hiện tại
                        // sau đó generate 1 page mới và cache
                        // ISR cache ở tất cả các region còn SSR chỉ cache ở 1 region
    };
};
