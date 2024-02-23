import { FoodDto } from "@/types/response/base";

export const products: FoodDto[] = [
    {
        id: 2,
        image: "https://res.cloudinary.com/dtopkwb9k/image/upload/v1701613497/Food/default_food_image_w6r6eo.png",
        top_label: "CHAY",
        name: [
            {
                ISO_language_code: "vie",
                text: "Cơm Gà Quýt",
            },
        ],
        restaurant_name: [
            {
                ISO_language_code: "vie",
                text: "Chef Town",
            },
        ],
        restaurant_id: 1,
        calorie_kcal: "400",
        rating: 5,
        distance_km: 3,
        delivery_time_s: 20,
        main_cooking_method: [
            {
                ISO_language_code: "vie",
                text: "Chiên",
            },
        ],
        price: 100000,
        price_after_discount: 100000,
        promotion: "Ưu đãi đến 50k",
        cutoff_time: "08:00:00",
        preparing_time_s: 600,
        cooking_time_s: 1200,
        quantity_available: 2,
        is_vegetarian: true,
        cooking_schedule:
            '[{"day_id":1,"day_name":"Sun","from":"06:00:00","to":"13:59:59","is_available":true},{"day_id":1,"day_name":"Sun","from":"14:00:00","to":"21:59:59","is_available":false},{"day_id":1,"day_name":"Sun","from":"22:00:00","to":"05:59:59","is_available":false},{"day_id":2,"day_name":"Mon","from":"06:00:00","to":"13:59:59","is_available":true},{"day_id":2,"day_name":"Mon","from":"14:00:00","to":"21:59:59","is_available":false},{"day_id":2,"day_name":"Mon","from":"22:00:00","to":"05:59:59","is_available":false},{"day_id":3,"day_name":"Tue","from":"06:00:00","to":"13:59:59","is_available":true},{"day_id":3,"day_name":"Tue","from":"14:00:00","to":"21:59:59","is_available":false},{"day_id":3,"day_name":"Tue","from":"22:00:00","to":"05:59:59","is_available":false},{"day_id":4,"day_name":"Wed","from":"06:00:00","to":"13:59:59","is_available":true},{"day_id":4,"day_name":"Wed","from":"14:00:00","to":"21:59:59","is_available":true},{"day_id":4,"day_name":"Wed","from":"22:00:00","to":"05:59:59","is_available":false},{"day_id":5,"day_name":"Thu","from":"06:00:00","to":"13:59:59","is_available":true},{"day_id":5,"day_name":"Thu","from":"14:00:00","to":"21:59:59","is_available":false},{"day_id":5,"day_name":"Thu","from":"22:00:00","to":"05:59:59","is_available":false},{"day_id":6,"day_name":"Fri","from":"06:00:00","to":"13:59:59","is_available":true},{"day_id":6,"day_name":"Fri","from":"14:00:00","to":"21:59:59","is_available":false},{"day_id":6,"day_name":"Fri","from":"22:00:00","to":"05:59:59","is_available":false},{"day_id":7,"day_name":"Sat","from":"06:00:00","to":"13:59:59","is_available":false},{"day_id":7,"day_name":"Sat","from":"14:00:00","to":"21:59:59","is_available":false},{"day_id":7,"day_name":"Sat","from":"22:00:00","to":"05:59:59","is_available":false}]',
        units_sold: 3,
    },
    {
        id: 3,
        image: "https://res.cloudinary.com/dtopkwb9k/image/upload/v1701613497/Food/default_food_image_w6r6eo.png",
        name: [
            {
                ISO_language_code: "vie",
                text: "Mỳ Cá Cờ Sốt Yakitori",
            },
        ],
        restaurant_name: [
            {
                ISO_language_code: "vie",
                text: "Chef Town",
            },
        ],
        restaurant_id: 1,
        calorie_kcal: "500",
        rating: 5,
        distance_km: 3,
        delivery_time_s: 20,
        main_cooking_method: [
            {
                ISO_language_code: "vie",
                text: "Luộc",
            },
        ],
        ingredient_brief_vie: " Hành tây, tiêu xanh, cà chua, bắp, ngò rí, bơ chín và nước cốt chanh.",
        price: 80000,
        price_after_discount: 70000,
        promotion: "Ưu đãi đến 50k",
        cutoff_time: "09:00:00",
        preparing_time_s: 600,
        cooking_time_s: 1200,
        quantity_available: 5,
        is_vegetarian: true,
        cooking_schedule:
            '[{"day_id":1,"day_name":"Sun","from":"06:00:00","to":"13:59:59","is_available":true},{"day_id":1,"day_name":"Sun","from":"14:00:00","to":"21:59:59","is_available":false},{"day_id":1,"day_name":"Sun","from":"22:00:00","to":"05:59:59","is_available":false},{"day_id":2,"day_name":"Mon","from":"06:00:00","to":"13:59:59","is_available":true},{"day_id":2,"day_name":"Mon","from":"14:00:00","to":"21:59:59","is_available":false},{"day_id":2,"day_name":"Mon","from":"22:00:00","to":"05:59:59","is_available":false},{"day_id":3,"day_name":"Tue","from":"06:00:00","to":"13:59:59","is_available":true},{"day_id":3,"day_name":"Tue","from":"14:00:00","to":"21:59:59","is_available":false},{"day_id":3,"day_name":"Tue","from":"22:00:00","to":"05:59:59","is_available":false},{"day_id":4,"day_name":"Wed","from":"06:00:00","to":"13:59:59","is_available":true},{"day_id":4,"day_name":"Wed","from":"14:00:00","to":"21:59:59","is_available":true},{"day_id":4,"day_name":"Wed","from":"22:00:00","to":"05:59:59","is_available":false},{"day_id":5,"day_name":"Thu","from":"06:00:00","to":"13:59:59","is_available":true},{"day_id":5,"day_name":"Thu","from":"14:00:00","to":"21:59:59","is_available":false},{"day_id":5,"day_name":"Thu","from":"22:00:00","to":"05:59:59","is_available":false},{"day_id":6,"day_name":"Fri","from":"06:00:00","to":"13:59:59","is_available":true},{"day_id":6,"day_name":"Fri","from":"14:00:00","to":"21:59:59","is_available":false},{"day_id":6,"day_name":"Fri","from":"22:00:00","to":"05:59:59","is_available":false},{"day_id":7,"day_name":"Sat","from":"06:00:00","to":"13:59:59","is_available":false},{"day_id":7,"day_name":"Sat","from":"14:00:00","to":"21:59:59","is_available":false},{"day_id":7,"day_name":"Sat","from":"22:00:00","to":"05:59:59","is_available":false}]',
        units_sold: 61,
    },
];

export default products;
