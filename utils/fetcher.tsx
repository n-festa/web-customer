export const fetcher = (path: string, method: string = "GET", data: any = null) => {
    const urlApi = process.env.NEXT_PUBLIC_URL_SERVICE;
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

    return fetch(urlApi + path, options).then((res) => res.json());
};
