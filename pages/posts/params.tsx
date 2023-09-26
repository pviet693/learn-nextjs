import { useRouter } from "next/router";
import * as React from "react";

export interface IParamsProps {}

export default function Params(props: IParamsProps) {
    const router = useRouter();
    return (
        <div>
            <h1>Params Page</h1>

            <p>Query: {JSON.stringify(router.query)}</p>
        </div>
    );
}

export async function getServerSideProps() {
    await new Promise<void>((resolve) =>
        setTimeout(() => {
            resolve();
        }, 3000)
    );
    return {
        props: {}
    };
}
