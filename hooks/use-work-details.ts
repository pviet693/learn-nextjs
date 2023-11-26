import { workApi } from "@/api-client";
import { QUERY_KEYS } from "@/constants";
import { ListParams } from "@/models";
import useSWR, { SWRConfiguration } from "swr";

export interface UserWorkDetails {
    workId: string;
    options?: SWRConfiguration;
    enabled?: boolean;
}

export function useWorkDetails({ workId, options, enabled = true }: UserWorkDetails) {
    // Khi params thay đổi sẽ gọi lại API
    // khi key = null, swr sẽ không gọi API
    const swrResponse = useSWR(
        enabled ? [QUERY_KEYS.GET_WORK_DETAILS, workId] : null,
        () => workApi.get(workId),
        {
            fallbackData: null,
            dedupingInterval: 30 * 1000,
            keepPreviousData: true,
            ...options
        }
    );

    async function updateWork(payload: FormData) {
        const newWork = await workApi.update(payload);
        swrResponse.mutate(newWork);
    }

    return { ...swrResponse, updateWork };
}
