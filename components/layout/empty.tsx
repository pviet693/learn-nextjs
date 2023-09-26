import * as React from "react";
import { LayoutProps } from "@/models/common";

export function EmptyLayout(props: LayoutProps) {
    return <div>{props.children}</div>;
}
