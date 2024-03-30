import { TimeRange } from "@/types/response/base";

export interface GetOrderHistoryRequest {
    customer_id: number; //REQUIRED
    search_keyword?: string; //OPTIONAL
    sort_type: string; // REQUIRED - DATE_ASC | DATE_DESC | TOTAL_ASC | TOTAL_DESC
    filtered_order_status?: string[]; // OPTIONAL - COMPLETED | FAILED | CANCELLED
    time_range?: TimeRange; // OPTIONAL
    offset: number; //REQUIRED
    page_size: number; //REQUIRED
}
