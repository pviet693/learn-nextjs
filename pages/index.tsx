import { Seo } from "@/components/common";
import { FeaturedWorks, HeroSection, RecentPosts } from "@/components/home";
import { MainLayout } from "@/components/layout";
import { Box } from "@mui/material";
import { ReactElement } from "react";

export default function Home() {
    return (
        <Box>
            <Seo
                data={{
                    title: "NextJS Tutorial",
                    description:
                        "With Meta Tags you can edit and experiment with your content then preview how your webpage will look on Google, Facebook, Twitter and more!",
                    url: "https://learn-nextjs-seven-rho.vercel.app/",
                    thumbnailUrl:
                        "https://blog.appsignal.com/_next/image?url=%2Fimages%2Fblog%2F2022-11%2Fnextjs-13.png&w=3840&q=50"
                }}
            />

            <HeroSection />
            <RecentPosts />
            <FeaturedWorks />
        </Box>
    );
}

Home.getLayout = function getLayout(page: ReactElement) {
    return (
        <MainLayout>
            {page}
        </MainLayout>
    );
};
