import { StudentDetails } from "@/components/swr";
import * as React from "react";

export default function SWRPage() {
    const [detailList, setDetailList] = React.useState<number[]>([]);

    function handleAddClick() {
        setDetailList((prevList) => [...prevList, 1]);
    }

    return (
        <div>
            <h1>SWR Playground</h1>
            <button onClick={handleAddClick}>Add detail</button>
            <ul>
                {detailList.map((x, index) => (
                    <li key={index}>
                        <StudentDetails studentId="lea319jollj7y1rs" />
                    </li>
                ))}
            </ul>
        </div>
    );
}
