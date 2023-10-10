import { MainLayout } from "@/components/layout";
import * as React from "react";

export interface BlogPageProps {}

export default function BlogPage(props: BlogPageProps) {
    return <div>Blog Page</div>;
}

BlogPage.getLayout = function getLayout(page: React.ReactElement) {
    return <MainLayout>{page}</MainLayout>;
};