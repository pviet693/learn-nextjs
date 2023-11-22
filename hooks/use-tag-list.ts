import { tagApi } from "@/api-client";
import { QUERY_KEYS } from "@/constants";
import { ListParams } from "@/models";
import useSWR, { SWRConfiguration } from "swr";

export interface UserTagList {
    params?: Partial<ListParams>;
    options?: SWRConfiguration;
}

export function useTagList({ params = { _page: 1, _limit: 30 }, options }: UserTagList = {}) {
    // Khi params thay đổi sẽ gọi lại API
    // khi key = null, swr sẽ không gọi API
    const swrResponse = useSWR([(QUERY_KEYS.GET_TAG_LIST, params)], () => tagApi.getAll(params), {
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
    });

    return swrResponse;
}
