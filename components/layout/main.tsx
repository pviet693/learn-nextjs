import * as React from "react";
import { LayoutProps } from "@/models/common";
import Link from "next/link";

export function MainLayout(props: LayoutProps) {
    console.log("Main Layout re-render");

    React.useEffect(() => {
        console.log("MainLayout mounting");

        return () => {
            console.log("MainLayout unmounting");
        };
    }, []);

    return (
        <div>
            <h1>Main Layout</h1>

            <Link href="/">Home</Link>

            <Link href="/about">About</Link>

            <div>{props.children}</div>
        </div>
    );
}
