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
                        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.m.wikipedia.org%2Fwiki%2FFile%3ANextjs-logo.svg&psig=AOvVaw3q0LUNshhJ_sb7y8cTk0oS&ust=1697034847816000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCMC3v83Z64EDFQAAAAAdAAAAABAE"
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
