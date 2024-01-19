export const fetcher = (url: string, method: string = "GET", data: any = null) => {
    const headers: HeadersInit = {
        "Content-Type": "application/json",
    };

    const options: RequestInit = {
        method,
        headers,
    };

    if (method === "POST" || method === "PUT" || method === "PATCH") {
        options.body = JSON.stringify(data);
    }

    return fetch(url, options).then((res) => res.json());
};
