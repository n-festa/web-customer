export enum FilterType {
    Food = "food",
    Restaurant = "restaurant",
}

export enum SortOrder {
    ASC = "asc",
    DESC = "desc",
}

export enum SortOrderFood {
    RELEVANCE = "RELEVANCE",
    PRICE_ASC = "PRICE_ASC",
    PRICE_DESC = "PRICE_DESC",
}

export enum SortOrderHistory {
    DATE_ASC = "DATE_ASC",
    DATE_DESC = "DATE_DESC",
    TOTAL_ASC = "TOTAL_ASC",
    TOTAL_DESC = "TOTAL_DESC",
}

export enum FetchMode {
    Full = "full",
    Some = "some",
}

export enum FoodOtherFilterOptionsKeys {
    GT4Star = "FROM_4STAR",
    Vegetarian = "VEG",
    LT500Kcal = "UPTO_500KCAL",
}

export enum KeyPress {
    up = "ArrowUp",
    down = "ArrowDown",
    left = "ArrowLeft",
    right = "ArrowRight",
    enter = "Enter",
}

export enum MediaType {
    Video = "video",
    Image = "image",
}

export enum OrderStatus {
    NEW = "NEW",
    IDLE = "IDLE",
    PROCESSING = "PROCESSING",
    READY = "READY",
    DELIVERING = "DELIVERING",
    COMPLETED = "COMPLETED",
    FAILED = "FAILED",
    CANCELLED = "CANCELLED",
    STUCK = "STUCK",
}

export enum SearchFoodType {
    SideDish = "SideDish",
    SimilarDish = "SimilarDish",
    SameRestaurant = "SameRestaurant",
    AllRestaurant = "AllRestaurant",
    AllFood = "AllFood",
}
export enum OrderStatusLogType {
    CREATED = "created",
    CONFIRMED = "confirmed",
    STARTED_TO_PROCESS = "started_to_process",
    PICKED_UP = "picked_up",
    COMPLETED = "completed",
    FAILED = "failed",
    CANCELLED = "cancelled",
}

export enum FilterOrderStatuType {
    ALL = "ALL",
    COMPLETED = "COMPLETED",
    FAILED = "FAILED",
    CANCELLED = "CANCELLED",
}

export enum OrderStatusType {
    NEW = "NEW",
    IDLE = "IDLE",
    PROCESSING = "PROCESSING",
    READY = "READY",
    DELIVERING = "DELIVERING",
    COMPLETED = "COMPLETED",
    FAILED = "FAILED",
    CANCELLED = "CANCELLED",
    STUCK = "STUCK",
}

export enum PaymentMethod {
    Momo = 1,
    COD = 2,
}
