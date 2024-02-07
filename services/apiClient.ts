/* eslint-disable @typescript-eslint/no-explicit-any */
import { getToken } from "@/utils/auth";
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, HeadersDefaults, ResponseType } from "axios";

export type RequestParams = Omit<FullRequestParams, "body" | "method" | "query" | "path">;

export type QueryParamsType = Record<string | number, any>;

export enum ContentType {
    Json = "application/json",
    FormData = "multipart/form-data",
    UrlEncoded = "application/x-www-form-urlencoded",
    Text = "text/plain",
}

export interface FullRequestParams extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
    /** set parameter to `true` for call `securityWorker` for this request */
    secure?: boolean;
    /** request path */
    path?: string;
    /** content type of request body */
    type?: ContentType;
    /** query params */
    query?: QueryParamsType;
    /** format of response (i.e. response.json() -> format: "json") */
    format?: ResponseType;
    /** request body */
    body?: unknown;
    /** additional params */
    ignoreAll?: boolean;
    isUncheckAuthor?: boolean;
    hasLoading?: boolean;
    errDest?: string;
    ignoreErrorCode?: number[];
}

export interface ApiConfig<SecurityDataType = unknown> extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
    securityWorker?: (
        securityData: SecurityDataType | null,
    ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
    secure?: boolean;
    format?: ResponseType;
}

const baseAxiosConfig: ApiConfig = {
    timeout: 30000,
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
    },
    withCredentials: false,
};

export abstract class HttpClient<SecurityDataType = unknown> {
    public instance: AxiosInstance;
    private securityData: SecurityDataType | null = null;
    private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
    private secure?: boolean;
    private format?: ResponseType;

    constructor({ securityWorker, secure, format, ...axiosConfig }: ApiConfig<SecurityDataType> = {}) {
        this.instance = axios.create({
            ...baseAxiosConfig,
            ...axiosConfig,
            baseURL: axiosConfig.baseURL || "/",
        });
        this.instance.defaults.headers = {
            ...this.instance.defaults.headers,
        };
        this.secure = secure;
        this.format = format;
        this.securityWorker = securityWorker;
        this.instance.interceptors.request.use((req) => {
            this.preRequest(req as FullRequestParams);
            return {
                ...req,
            };
        });

        this.instance.interceptors.response.use(
            (res) => {
                this.preResponse(res?.config);
                return Promise.resolve(res.data);
            },
            (err) => {
                return this.handleError(err);
            },
        );
    }
    abstract preRequest(req: FullRequestParams): void;
    abstract preResponse(req: FullRequestParams): void;

    abstract handleError<T>(err: AxiosError): Promise<string | undefined | T>;

    public setSecurityData = (data: SecurityDataType | null) => {
        this.securityData = data;
    };

    protected mergeRequestParams(params1: AxiosRequestConfig, params2?: AxiosRequestConfig): AxiosRequestConfig {
        const method = params1.method || (params2 && params2.method);

        return {
            ...this.instance.defaults,
            ...params1,
            ...(params2 || {}),
            headers: {
                ...((method && this.instance.defaults.headers[method.toLowerCase() as keyof HeadersDefaults]) || {}),
                ...(params1.headers || {}),
                ...((params2 && params2.headers) || {}),
            },
        };
    }

    protected stringifyFormItem(formItem: unknown) {
        if (typeof formItem === "object" && formItem !== null) {
            return JSON.stringify(formItem);
        } else {
            return `${formItem}`;
        }
    }

    protected createFormData(input: Record<string, unknown>): FormData {
        return Object.keys(input || {}).reduce((formData, key) => {
            const property = input[key];
            const propertyContent: any[] = property instanceof Array ? property : [property];

            for (const formItem of propertyContent) {
                const isFileType = formItem instanceof Blob || formItem instanceof File;
                formData.append(key, isFileType ? formItem : this.stringifyFormItem(formItem));
            }

            return formData;
        }, new FormData());
    }

    public request = async <T = any, _E = any>({
        secure,
        path,
        type,
        query,
        format,
        body,
        isUncheckAuthor,
        ...params
    }: FullRequestParams): Promise<T> => {
        const secureParams =
            ((typeof secure === "boolean" ? secure : this.secure) &&
                this.securityWorker &&
                (await this.securityWorker(this.securityData))) ||
            {};
        const requestParams = this.mergeRequestParams(params, secureParams);
        const responseFormat = format || this.format || undefined;

        if (type === ContentType.FormData && body && body !== null && typeof body === "object") {
            body = this.createFormData(body as Record<string, unknown>);
        }

        if (type === ContentType.Text && body && body !== null && typeof body !== "string") {
            body = JSON.stringify(body);
        }

        return this.instance.request({
            ...requestParams,
            headers: {
                //SET VERSION API
                ...(!isUncheckAuthor
                    ? {
                          Authorization: getToken() ? "Bearer " + getToken() : undefined,
                      }
                    : {}),
                ...(requestParams.headers || {}),
                ...(type && type !== ContentType.FormData ? { "Content-Type": type } : {}),
            },
            params: query,
            responseType: responseFormat,
            data: body,
            url: path,
            cancelToken: requestParams.cancelToken,
        });
    };
    public simpleRequest = async <T = any, _E = any>(config: AxiosRequestConfig, newToken?: string): Promise<T> => {
        return this.instance.request({
            ...config,
            headers: {
                ...(config.headers?.Authorization
                    ? {
                          Authorization: newToken ? "Bearer " + newToken : undefined,
                      }
                    : {}),
            },
        });
    };
}
