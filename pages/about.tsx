import { Header } from "@/components/common";
import { AdminLayout } from "@/components/layout";
import { Box, Typography } from "@mui/material";
// import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { ReactElement } from "react";

// const Header = dynamic(() => import("@/components/common/header"), { ssr: false });

export interface IAboutProps {}

export default function About(props: IAboutProps) {
    const router = useRouter();
    const [postList, setPostList] = React.useState([]);
    const page = Number(router.query?.page || 0);

    React.useEffect(() => {
        if (!page) return;

        (async () => {
            const response = await fetch(
                `https://js-post-api.herokuapp.com/api/posts?_page=${page}`
            );
            const data = await response.json();

            setPostList(data.data);
        })();
    }, [page]);

    const handleNextClick = () => {
        router.push(
            {
                pathname: "/about",
                query: {
                    page: page + 1
                }
            },
            undefined,
            { shallow: true } // thêm shallow: true để không gọi hàm getStaticProps
        );
    };

    return (
        <Box>
            <Typography component="h1" variant="h3" color="primary.main">About Page</Typography>

            <Header />

            <ul>
                {postList.map((post: any) => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ul>

            <button onClick={handleNextClick}>Next Page</button>
        </Box>
    );
}

About.getLayout = function getLayout(page: ReactElement) {
    return <AdminLayout>{page}</AdminLayout>;
};

export async function getStaticProps() {
    return {
        props: {}
    };
}

// export async function getServerSideProps() {
//     return {
//         props: {}
//     };
// }
