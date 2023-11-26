import axiosClient from "./axios-client";
import { ListParams, ListResponse, LoginPayload, Work } from "@/models";

export const workApi = {
    getAll(params: Partial<ListParams>): Promise<ListResponse<Work>> {
        return axiosClient.get("/works", { params });
    },

    get(id: string): Promise<Work> {
        return axiosClient.get(`/works/${id}`);
    },

    add(payload: FormData): Promise<Work> {
        return axiosClient.post("/works", payload, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    },

    update(payload: FormData): Promise<Work> {
        return axiosClient.patch(`/works/${payload.get("id")}`, payload, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
    }
};
