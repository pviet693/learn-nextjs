import * as React from "react";
import { LayoutProps } from "@/models/common";
import Link from "next/link";
import { Auth } from "../common";
import { useAuth } from "@/hooks/use-auth";
import { useRouter } from "next/router";

export function AdminLayout(props: LayoutProps) {
    const router = useRouter();
    const { logout, profile } = useAuth();

    async function handleLogout() {
        try {
            await logout();
            router.push("/login");
        } catch (error) {
            console.log("failed to logout", error);
        }
    }

    return (
        <Auth>
            <h1>Admin Layout</h1>
            <div>Sidebar</div>

            <p>Profile: {JSON.stringify(profile || {}, null, 4)}</p>

            <button onClick={handleLogout}>Logout</button>

            <Link href="/">Home</Link>

            <Link href="/about">About</Link>

            <div>{props.children}</div>
        </Auth>
    );
}
