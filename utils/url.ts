export function encodeUrl(url: string): string {
    const base64 = window.btoa(url);
    const safeStringOnURL = encodeURIComponent(base64);
    return safeStringOnURL;
}

export function decodeUrl(safeStringOnURL: string): string {
    const base64 = decodeURIComponent(safeStringOnURL);
    const url = window.atob(base64);
    return url;
}