import * as React from 'react';
import useSWR from 'swr';

export interface StudentDetailsProps {
    studentId: string;
}

export function StudentDetails({ studentId }: StudentDetailsProps) {
    const { data, error, mutate, isValidating } = useSWR(`students/${studentId}`, {
        revalidateOnFocus: false, // automatically revalidate when window gets focused, chuyển tab qua lại
        revalidateOnMount: true, // enable or disable automatic revalidation when component is mounted, khi mới vào page
        dedupingInterval: 2000, // dedupe requests with the same key in this time span in milliseconds, khi có swr gọi cùng key này thì sau 2s mới gọi

    }); // không viết fetcher sẽ dùng key làm url của fetcher ở global config

    function handleMutateClick() {
        mutate({ name: "Viet vip pro" }, true); // data tạm thời hiện ở UI, sau đó revalidate
    }

    return (
        <div>
            Name: {data?.name || "--"} <button onClick={handleMutateClick}>mutate</button>
        </div>
    );
}
