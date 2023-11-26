import { authApi } from "@/api";
import { STORAGE_KEYS } from "@/constants";
import { LoginPayload, UserProfile } from "@/models";
import useSWR from "swr";
import { SWRConfiguration } from "swr/_internal";

function getUserInfo(): UserProfile | null {
    try {
        return JSON.parse(localStorage.getItem(STORAGE_KEYS.USER_INFO) || "");
    } catch (error) {
        console.log("Failed to parse user_info from local storage", error);
        return null;
    }
}

export function useAuth(options?: Partial<SWRConfiguration>) {
    // profile
    const {
        data: profile,
        error,
        mutate
    } = useSWR<UserProfile | null>("/profile", {
        dedupingInterval: 60 * 60 * 1000, // 1hr
        revalidateOnFocus: false,
        ...options,
        fallbackData: getUserInfo(),
        onSuccess(data) {
            // save user_info to local storage
            localStorage.setItem(STORAGE_KEYS.USER_INFO, JSON.stringify(data));
        },
        onError(err) {
            // failed to get profile => logout
            console.log(err);
            logout();
        }
    });

    const firstLoading = profile === undefined && error === undefined;

    async function login(payload: LoginPayload) {
        // const payload: LoginPayload = {
        //     username: "easy",
        //     password: "123qwe"
        // };

        await authApi.login(payload);

        await mutate();
    }

    async function logout() {
        await authApi.logout();
        mutate(null, false);
        localStorage.removeItem(STORAGE_KEYS.USER_INFO);
    }

    return {
        profile,
        error,
        login,
        logout,
        firstLoading,
        isLoggedIn: Boolean(profile)
    };
}
