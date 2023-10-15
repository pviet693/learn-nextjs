import { Seo } from "@/components/common";
import { Post } from "@/models";
import { getPostList } from "@/utils";
import { Container } from "@mui/material";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import Script from "next/script";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeDocument from "rehype-document";
import rehypeFormat from "rehype-format";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkParse from "remark-parse";
import remarkPrism from "remark-prism";
import remarkRehype from "remark-rehype";
import remarkToc from "remark-toc";
import { unified } from "unified";

interface BlogPageProps {
    post: Post;
}

function PostDetailPage({ post }: BlogPageProps) {
    if (!post) return null;

    return (
        <>
            <Seo
                data={{
                    title: `${post.title} | Blog Page Details`,
                    description: post.description,
                    url: `${process.env.HOST_URL}/blog/${post.slug}`,
                    thumbnailUrl: post.thumbnailUrl || ""
                }}
            />
            <Container>
                <h1>Post Details Page</h1>
                <p>{post.title}</p>
                <p>{post.author?.name}</p>
                <p>{post.description}</p>
                <div dangerouslySetInnerHTML={{ __html: post.htmlContent || "" }}></div>
                <Script src="/prism.js" strategy="afterInteractive" />{" "}
                {/* đảm bảo load cái quan trọng trước, load script sau */}
            </Container>
        </>
    );
}

export default PostDetailPage;

export const getStaticPaths: GetStaticPaths = async () => {
    const postList = await getPostList();

    return {
        paths: postList.map((post: Post) => ({ params: { slug: post.slug } })),
        fallback: false // true or 'blocking'
        // fallback: "blocking"    // không page không được generate thì sẽ chờ generate
        // trong thời gian đó trên browser sẽ bị block
        // fallback: true // không page không được generate thì sẽ chờ generate
        // trong thời gian đó trên browser sẽ hiện loading
    };
};

export const getStaticProps: GetStaticProps<BlogPageProps> = async function (
    context: GetStaticPropsContext
) {
    // hàm này ở phía server-side
    // run lúc build-time
    // lúc dev thì sẽ chạy khi refresh
    // lúc build lên production thì sẽ chỉ chạy lúc build

    const slug = context.params?.slug;
    const postList = await getPostList();
    const post = postList.find((x) => x.slug === slug);

    if (!slug || !post) return { notFound: true };

    const file = await unified()
        .use(remarkParse)
        .use(remarkToc, { heading: "contents" })
        .use(remarkPrism)
        .use(remarkRehype)
        .use(rehypeSlug)
        .use(rehypeAutolinkHeadings, { behavior: "wrap" })
        .use(rehypeDocument, { title: "Blog Details Page" })
        .use(rehypeFormat)
        .use(rehypeStringify)
        .process(post?.mdContent || "");

    post.htmlContent = file.toString();

    return {
        props: {
            post
        }
        // revalidate: 5 // ISR, khi lâu hơn 5s nếu có request lên server thì sẽ trả về page đã cache hiện tại
        // sau đó generate 1 page mới và cache
        // ISR cache ở tất cả các region còn SSR chỉ cache ở 1 region
    };
};
