import { workApi } from "@/api-client";
import { QUERY_KEYS } from "@/constants";
import { getErrorMessage } from "@/utils";
import { toast } from "react-toastify";
import { Arguments, useSWRConfig } from "swr";

export function useAddWork() {
    const { mutate } = useSWRConfig();

    async function addNewWork(payload: FormData) {
        try {
            const newWork = await workApi.add(payload);

            // mutate work list if add successfully
            mutate(
                (key: Arguments) => Array.isArray(key) && key.includes(QUERY_KEYS.GET_WORK_LIST),
                undefined,
                { revalidate: true }
            );

            return newWork;
        } catch (error) {
            const message = getErrorMessage(error);
            toast.error(message);
        }
    }

    return addNewWork;
}
