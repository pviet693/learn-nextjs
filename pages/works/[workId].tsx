import { MainLayout } from "@/components/layout";
import { WorkForm } from "@/components/work";
import { useAddWork, useWorkDetails } from "@/hooks";
import { Box, Container, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import Script from "next/script";
import { toast } from "react-toastify";

export interface AddEditWorkPageProps {}

export default function AddEditWorkPage(props: AddEditWorkPageProps) {
    const router = useRouter();
    const { workId } = router.query;
    const isAddMode = workId === "add";

    const { data: workDetails, isLoading, updateWork } = useWorkDetails({
        workId: workId as string || "",
        enabled: router.isReady && !isAddMode
    });

    const addNewWork = useAddWork();

    async function handleSubmit(payload: FormData) {
        try {
            payload.forEach((value, key) => {
                console.log(key, value);
            });

            let newWork = null;
            if (isAddMode) {
                newWork = await addNewWork(payload);
                toast.success(`Add work successfully ${newWork?.id}`);
            } else {
                newWork = await updateWork(payload);
                toast.success("Update work successfully");
            }

            router.push("/works?_page=1&_limit=3");
        } catch (error) {
            console.log("error", error);
        }
    }

    if (!router.isReady) return null;

    return (
        <Box>
            <Container>
                <Typography component="h1" variant="h3" fontWeight="bold" mb={4} mt={8}>
                    {isAddMode ? "Add new work" : `Edit work #${workId}`}
                </Typography>

                <Box>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores fuga minus
                    ullam minima. Quo temporibus, mollitia veniam corrupti, cupiditate omnis
                    accusamus quaerat nemo eveniet tenetur id minus officiis doloribus suscipit.
                </Box>

                <Box>
                    {(isAddMode || workDetails) && (
                        <WorkForm initialValues={workDetails} onSubmit={handleSubmit} />
                    )}
                </Box>
            </Container>

            <Script
                src="https://widget.cloudinary.com/v2.0/global/all.js"
                strategy="afterInteractive"
            />
        </Box>
    );
}

AddEditWorkPage.getLayout = function getLayout(page: React.ReactElement) {
    return <MainLayout>{page}</MainLayout>;
};
AddEditWorkPage.requiredLogin = true;

