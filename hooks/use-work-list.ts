import { workApi } from "@/api-client";
import { QUERY_KEYS } from "@/constants";
import { ListParams } from "@/models";
import useSWR, { SWRConfiguration } from "swr";

export interface UserWorkList {
    params: Partial<ListParams>;
    options?: SWRConfiguration;
    enabled?: boolean;
}

export function useWorkList({ params, options, enabled = true }: UserWorkList) {
    // Khi params thay đổi sẽ gọi lại API
    // khi key = null, swr sẽ không gọi API
    const swrResponse = useSWR(
        enabled ? [(QUERY_KEYS.GET_WORK_LIST, params)] : null,
        () => workApi.getAll(params),
        {
            ...options,
            fallbackData: {
                data: [],
                pagination: {
                    _page: 1,
                    _limit: 10,
                    _totalRows: 0
                }
            },
            dedupingInterval: 30 * 1000,
            keepPreviousData: true
        }
    );

    return swrResponse;
}
