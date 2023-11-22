import { WorkFiltersPayload } from "@/models";
import { Search } from "@mui/icons-material";
import { Box, InputAdornment, debounce } from "@mui/material";
import { ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { AutocompleteField, InputField } from "../form";
import { useTagList } from "@/hooks";

export interface WorkFiltersProps {
    initialValues?: WorkFiltersPayload,
    onSubmit?: (payload: WorkFiltersPayload) => void;
}

export function WorkFilters({ initialValues, onSubmit }: WorkFiltersProps) {
    const { data } = useTagList();
    const { control, handleSubmit } = useForm({
        defaultValues: {
            search: "",
            selectedTagList: [],
            ...initialValues
        }
    });

    async function handleLoginSubmit(payload: WorkFiltersPayload) {
        if (!payload) return;

        payload.tagList_like = payload.selectedTagList?.join("|") || "";
        delete payload.selectedTagList;

        await onSubmit?.(payload);
    }

    const debounceSearchChange = debounce(handleSubmit(handleLoginSubmit), 350);

    return (
        <Box component="form" onSubmit={handleSubmit(handleLoginSubmit)}>
            <InputField
                placeholder="search work by title"
                name="search"
                control={control}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <Search />
                        </InputAdornment>
                    )
                }}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                    debounceSearchChange();
                }}
            />

            <AutocompleteField
                name="selectedTagList"
                label="Filter by category"
                placeholder="Categories"
                control={control}
                options={data.data}
                getOptionLabel={(option) => option}
                isOptionEqualToValue={(option, value) => option === value}
                onChange={() => debounceSearchChange()}
            />
        </Box>
    );
}
