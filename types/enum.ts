export enum FilterType {
    Food = "food",
    Restaurant = "restaurant",
}

export enum SortOrder {
    ASC = "asc",
    DESC = "desc",
}

export enum FetchMode {
    Full = "full",
    Some = "some",
}

export enum FoodOtherFilterOptionsKeys {
    GT4Star = "greater-than-4-star",
    Vegetarian = "vegetarian",
    LT500Kcal = "less-than-500-kcal",
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

export enum PaymentMethod {
    Momo = 1,
    COD = 2,
}
