import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/router";
import * as React from "react";

export function Auth({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { profile, firstLoading } = useAuth();

    React.useEffect(() => {
        if (!firstLoading && !profile?.username) {
            router.push("/login");
        }
    }, [router, profile, firstLoading]);

    if (!profile?.username) return <p>Loading...</p>

    return <div>{children}</div>;
}
