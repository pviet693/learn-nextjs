import axiosClient from "@/api-client/axios-client";
import { ListParams, ListResponse, Work } from "@/models";
import qs from "qs";
import useSWRInfinite, { SWRInfiniteConfiguration } from "swr/infinite";

export interface UserWorkList {
    params: Partial<ListParams>;
    options?: SWRInfiniteConfiguration;
    enabled?: boolean;
}

export function useWorkListInfinity({ params, options, enabled = true }: UserWorkList) {
    // Khi params thay đổi sẽ gọi lại API
    // khi key = null, swr sẽ không gọi API
    const swrResponse = useSWRInfinite<ListResponse<Work>>(
        (index: number, previousPageData: ListResponse<Work>) => {
            if (!enabled) return null;

            // index starts from 0
            const page = index + 1;
            const query: Partial<ListParams> = {
                ...params,
                _page: page,
                _limit: 5
            };

            if (previousPageData) {
                const { _limit, _totalRows } = previousPageData.pagination || { _limit: 5, _totalRows: 0 };
                const totalPages = Math.ceil(_totalRows / _limit);
                if (page > totalPages) return null;
            }

            return `/works?${qs.stringify(query)}`;
        },
        (url: string) => axiosClient.get(url),
        {
            ...options
        }
    );

    return swrResponse;
}
