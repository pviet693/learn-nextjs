import * as React from "react";
import { useAuth } from "@/hooks";
import { useRouter } from "next/router";

export default function LoginPage() {
    const router = useRouter();
    const { login, logout, profile } = useAuth({
        revalidateOnMount: false
    });

    async function handleLoginClick() {
        try {
            await login();
            router.push("/about");
        } catch (error) {
            console.log("failed to login", error);
        }
    }

    async function handleLogout() {
        try {
            await logout();
        } catch (error) {
            console.log("failed to logout", error);
        }
    }

    return (
        <div>
            <h1>Login Page</h1>

            <p>Profile: {JSON.stringify(profile || {}, null, 4)}</p>

            <button onClick={handleLoginClick}>Login</button>
            <button onClick={handleLogout}>Logout</button>
            <button onClick={() => router.push("/about")}>Go to About</button>
        </div>
    );
}
