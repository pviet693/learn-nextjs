import { MainLayout } from "@/components/layout";
import { WorkFilters, WorkList } from "@/components/work";
import { useWorkListInfinity } from "@/hooks/use-work-list-infinity";
import { ListParams, ListResponse, Work, WorkFiltersPayload } from "@/models";
import { Button, CircularProgress, Container, Skeleton, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { useInView } from "react-intersection-observer";

export interface WorksPageProps {}

export default function WorksPage(props: WorksPageProps) {
    const router = useRouter();
    const filters: Partial<ListParams> = {
        ...router.query
    };
    const initFiltersPayload: WorkFiltersPayload = {
        search: filters.title_like || "",
        selectedTagList: filters.tagList_like ? filters.tagList_like.split("|") : []
    };

    const { data, isLoading, isValidating, size, setSize } = useWorkListInfinity({ params: filters, enabled: router.isReady });

    const workList: Work[] = data?.reduce((result: Work[], currentPage: ListResponse<Work>) => {
        result.push(...currentPage.data);
        return result;
    }, []) || [];

    const totalRows = data?.[0]?.pagination?._totalRows || 0;
    const showLoadMore = totalRows > workList.length;
    const loadingMore = isValidating && workList.length > 0;

    const { ref } = useInView({
        onChange(inView) {
            if (inView) setSize((x) => x + 1);
        },
    });

    const handleFiltersChange = (newFilters: WorkFiltersPayload) => {
        router.push(
            {
                pathname: router.pathname,
                query: {
                    ...filters,
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
            <Typography component="h1" variant="h3" fontWeight="bold" mb={4} mt={8}>
                Work
            </Typography>

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

            <WorkList workList={workList} loading={isLoading || !router.isReady} />

            {showLoadMore ? (
                <Button ref={ref} variant="contained" onClick={() => setSize((x) => x + 1)} disabled={loadingMore}>
                    Load more {loadingMore ? <CircularProgress size={24} /> : null}
                </Button>
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
