import useSWR from "swr";
import { PublicConfiguration } from "swr/_internal";
import { LoginPayload } from "@/models/index";
import { authApi } from "@/api/index";

export function useAuth(options?: Partial<PublicConfiguration>) {
    // profile
    const { data: profile, error, mutate } = useSWR("/profile", {
        dedupingInterval: 60 * 60 * 1000, // 1hr
        revalidateOnFocus: false,
        ...options
    });

    const firstLoading = profile === undefined && error === undefined;

    async function login() {
        const payload: LoginPayload = {
            username: "easy",
            password: "123qwe"
        };

        await authApi.login(payload);

        await mutate();
    }

    async function logout() {
        await authApi.logout();

        mutate({}, false);
    }

    return {
        profile,
        error,
        login,
        logout,
        firstLoading
    };
}