import path from "path";
import fs from "fs";
import matter from "gray-matter";
import { Post } from "@/models";

const BLOG_FOLDER = path.resolve(process.cwd(), "blog");

// hàm này chạy ở phía server do nằm trong hàm getStaticProps
export async function getPostList(): Promise<Post[]> {
    const fileNameList = fs.readdirSync(BLOG_FOLDER);

    const postList: Post[] = [];

    fileNameList.forEach((fileName) => {
        const filePath = path.resolve(BLOG_FOLDER, fileName);
        const fileContents = fs.readFileSync(filePath, "utf8");
        
        const { data, excerpt, content } = matter(fileContents, { excerpt_separator: "<!-- truncate-->" });
        
        postList.push({
            id: fileName,
            slug: data.slug,
            title: data.title,
            thumbnailUrl: data.image || null,
            author: {
                name: data.author,
                title: data.author_title,
                profileUrl: data.author_url,
                avatarUrl: data.author_image_url
            },
            tagList: data.tags,
            publishedDate: data.date,
            description: excerpt || "",
            mdContent: content
        });
    });

    return postList;
}