import { useAuth } from "@/hooks/use-auth";
import { encodeUrl } from "@/utils";
import { useRouter } from "next/router";
import * as React from "react";

export function Auth({ children, requiredLogin = false }: { children: React.ReactNode; requiredLogin?: boolean }) {
    const router = useRouter();
    const { profile, firstLoading } = useAuth();

    React.useEffect(() => {
        // do nothing if not required login
        if (!requiredLogin) return;

        if (!firstLoading && !profile?.username) {

            router.replace(`/login?back_to=${encodeUrl(router.asPath)}`);
        }
    }, [router, profile, firstLoading, requiredLogin]);

    if (requiredLogin && !profile?.username) return <p>Loading...</p>;

    return <div>{children}</div>;
}
