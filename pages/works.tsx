import { MainLayout } from "@/components/layout";
import * as React from "react";

export interface WorksPageProps {}

export default function WorksPage(props: WorksPageProps) {
    return <div>Works Page</div>;
}

WorksPage.getLayout = function getLayout(page: React.ReactElement) {
    return <MainLayout>{page}</MainLayout>;
};