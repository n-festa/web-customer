import { AxiosError } from "axios";
import { HttpClient } from "./apiClient";

class ApiServices<SecurityDataType> extends HttpClient<SecurityDataType> {
    handleError(_err: AxiosError): void {
        // TODO:
    }
    constructor() {
        // Add BaseConfig Into Super Constructor
        super({ baseURL: process.env.NEXT_PUBLIC_URL_SERVICE || "https://api.2all.com.vn/web-customer/" });
    }
    api = {
        requestOTP: (data: { phoneNumber: string }) => {
            return this.request<{
                data: any;
                otpCode: string;
            }>({
                path: "auth/request-otp",
                method: "POST",
                body: data,
            });
        },
        authtOTP: (data: { phoneNumber: string; inputOTP: string }) => {
            return this.request<{
                data: any;
                statusCode: number;
                userType: string;
                userId: number;
                userName: string;
                permissions: string;
                access_token: string;
                refresh_token: string;
            }>({
                path: "auth/authenticate-otp",
                method: "POST",
                body: data,
            });
        },
    };
}

const apiServices = new ApiServices().api;

export default apiServices;
