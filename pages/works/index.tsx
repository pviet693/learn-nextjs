import { MainLayout } from "@/components/layout";
import { WorkFilters, WorkList } from "@/components/work";
import { useAuth, useWorkList } from "@/hooks";
import { ListParams, WorkFiltersPayload } from "@/models";
import { Button, Container, Pagination, Skeleton, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";

export interface WorksPageProps {}

export default function WorksPage(props: WorksPageProps) {
    const router = useRouter();
    const { isLoggedIn } = useAuth();
    const filters: Partial<ListParams> = {
        _page: 1,
        _limit: 3,
        ...router.query
    };
    const initFiltersPayload: WorkFiltersPayload = {
        search: filters.title_like || "",
        selectedTagList: filters.tagList_like?.split("|") || []
    };
    const { data, isLoading } = useWorkList({ params: filters, enabled: router.isReady });
    const totalPages = data?.pagination ? Math.ceil(data?.pagination?._totalRows / data?.pagination?._limit) : 0;

    const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
        router.push(
            {
                pathname: router.pathname,
                query: {
                    ...filters,
                    _page: value
                }
            },
            undefined,
            { shallow: true }
        );
    };

    const handleFiltersChange = (newFilters: WorkFiltersPayload) => {
        router.push(
            {
                pathname: router.pathname,
                query: {
                    ...filters,
                    _page: 1,
                    title_like: newFilters.search,
                    tagList_like: newFilters.tagList_like
                }
            },
            undefined,
            { shallow: true } // chỉ trigger re-render ở phía client-side, không chạy lại hàm getStaticProps
        );
    };

    return (
        <Container>
            <Stack mb={4} mt={8} direction="row" alignItems="center" justifyContent="space-between">
                <Typography component="h1" variant="h3" fontWeight="bold">
                    Work
                </Typography>

                {isLoggedIn && (
                    <Button variant="contained" onClick={() => router.push("/works/add")}>
                        Add new Work
                    </Button>
                )}
            </Stack>

            {router.isReady ? (
                <WorkFilters initialValues={initFiltersPayload} onSubmit={handleFiltersChange} />
            ) : (
                <Skeleton
                    variant="rectangular"
                    height={40}
                    sx={{
                        display: "inline-block",
                        width: "100%",
                        mt: 2,
                        mb: 1,
                        verticalAlign: "middle"
                    }}
                />
            )}

            <WorkList workList={data?.data || []} loading={isLoading || !router.isReady} />

            {totalPages > 0 ? (
                <Stack alignItems="center">
                    <Pagination
                        count={totalPages}
                        page={Number(filters._page)}
                        onChange={handlePageChange}
                    />
                </Stack>
            ) : null}
        </Container>
    );
}

WorksPage.getLayout = function getLayout(page: React.ReactElement) {
    return <MainLayout>{page}</MainLayout>;
};

export async function getStaticProps() {
    return {
        props: {}
    };
}
