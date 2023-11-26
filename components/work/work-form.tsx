import { useTagList } from "@/hooks";
import { WorkPayload } from "@/models";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { AutocompleteField, EditorField, InputField, PhotoField } from "../form";

export interface WorkFormProps {
    initialValues?: Partial<WorkPayload>;
    onSubmit?: (payload: FormData) => void;
}

export function WorkForm({ initialValues, onSubmit }: WorkFormProps) {
    const schema = yup.object<Partial<WorkPayload>>().shape({
        title: yup.string().required("Please enter work title"),
        shortDescription: yup.string().required("Please enter work description"),
        tagList: yup
            .array()
            .of(yup.string().required(""))
            .min(1, "Please select at least one category"),
        thumbnail: yup
            .object()
            .nullable()
            .test("test-required", "Please select an message.", (value, ctx) => {
                // required when add
                // optional when edit
                const file = (value as { file: File; previewUrl: string })?.file;
                if (initialValues?.id || file) return true;

                // return ctx.createError({ message: "Please select an message." });
                return false;
            })
            .test(
                "test-size",
                "Maximum size exceeded - 3MB. Please select another file.",
                (value) => {
                    // limit size to 3MB
                    if (value && Object.keys(value).length > 0) {
                        const fileSize =
                            (value as { file: File; previewUrl: string })?.file?.size || 0;
                        const MB_TO_BYTES = 1024 * 1024;
                        const MAX_SIZE = 3 * MB_TO_BYTES; // 3MB

                        return fileSize <= MAX_SIZE;
                    }

                    return true;
                }
            ),
        fullDescription: yup.string()
    });
    const { data } = useTagList();
    const tagList = data?.data || [];
    const { control, handleSubmit } = useForm({
        defaultValues: {
            title: "",
            shortDescription: "",
            tagList: [],
            thumbnail: initialValues?.id
                ? {
                    file: null,
                    previewUrl: initialValues?.thumbnailUrl
                }
                : null,
            fullDescription: "",
            ...initialValues
        },
        resolver: yupResolver(schema)
    });

    async function handleLoginSubmit(formValues: any) {
        if (!formValues) return;

        const payload = new FormData();
        // id
        if (formValues.id) {
            payload.set("id", formValues.id);
        }
        // thumbnail
        if (formValues.thumbnail?.file) {
            payload.set("thumbnail", formValues.thumbnail.file);
        }
        // tagList
        formValues.tagList.forEach((tag: string) => {
            payload.append("tagList", tag);
        });
        // title, short description, fill description
        const keyList: Array<keyof Partial<WorkPayload>> = [
            "title",
            "shortDescription",
            "fullDescription"
        ];
        keyList.forEach((key: string) => {
            // @ts-ignore
            if (initialValues?.[key] !== formValues[key]) {
                payload.set(key, formValues[key] as string);
            }
        });

        // console.log("form submit", formValues);

        // payload.forEach((value, key) => {
        //     console.log(key, value);
        // });

        await onSubmit?.(payload);
    }

    return (
        <Box component="form" onSubmit={handleSubmit(handleLoginSubmit)}>
            <InputField
                placeholder="Your work title"
                name="title"
                label="Title"
                control={control}
            />

            <InputField
                placeholder="Your work description"
                name="shortDescription"
                label="Short description"
                control={control}
                InputProps={{
                    multiline: true,
                    rows: 3
                }}
            />

            <AutocompleteField
                name="tagList"
                label="Categories"
                placeholder="Categories"
                control={control}
                options={tagList}
                getOptionLabel={(option) => option}
                isOptionEqualToValue={(option, value) => option === value}
            />

            <PhotoField name="thumbnail" control={control} label="Thumbnail" />
            <EditorField name="fullDescription" control={control} label="Full Description" />

            <Button variant="contained" type="submit" size="medium">
                {initialValues?.id ? "Save" : "Submit"}
            </Button>
        </Box>
    );
}
