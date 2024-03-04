export const orderDetailMock = {
    order_id: 2,
    customer_id: 3,
    restaurant: {
        restaurant_id: 1,
        restaurant_name: [
            {
                ISO_language_code: "vie",
                text: "The Chef Town",
            },
        ],
        restaurant_logo_img: "https://cdn-icons-png.flaticon.com/512/4682/4682343.png",
    },
    address: {
        address_line: "24 Nguyễn Đình Thi",
        ward: "Phước Long B",
        district: "Thành phố Thủ Đức",
        city: "Thành phố Hồ Chí Minh",
        country: "Vietnam",
        latitude: 10.816277,
        longitude: 106.776559,
    },
    driver_note: "Gặp tại sảnh A toà nhà",
    driver: {
        driver_id: 1,
        name: "Nguyễn Văn Ý",
        phone_number: "84233334430",
        vehicle: "Airblade đen",
        license_plates: "54X1 3451",
        tracking_url: "https://cloudstg.ahamove.com/share-order/23ERRXVR/84905005248",
        profile_image: "https://res.cloudinary.com/dtopkwb9k/image/upload/v1709538122/Avatar/default_rider_image.png",
    },
    order_total: 157500,
    delivery_fee: 20000,
    packaging_fee: 5500,
    cutlery_fee: 0,
    app_fee: 2000,
    coupon_value: 20000,
    coupon_id: 1,
    invoice_id: 2,
    payment_method: {
        id: 1,
        name: "momo",
    },
    payment_status_history: [
        {
            status_id: "STARTED",
            name: [
                {
                    ISO_language_code: "vie",
                    text: "Bắt Đầu",
                },
                {
                    ISO_language_code: "eng",
                    text: "Started",
                },
            ],
            note: "",
            created_at: 1709470926735,
        },
        {
            status_id: "PENDING",
            name: [
                {
                    ISO_language_code: "vie",
                    text: "Đang Thực Hiện",
                },
                {
                    ISO_language_code: "eng",
                    text: "Pending",
                },
            ],
            note: "",
            created_at: 1709470927735,
        },
        {
            status_id: "COMPLETED",
            name: [
                {
                    ISO_language_code: "vie",
                    text: "Hoàn Thành",
                },
                {
                    ISO_language_code: "eng",
                    text: "Completed",
                },
            ],
            note: "",
            created_at: 1709470928735,
        },
    ],
    is_preorder: true,
    expected_arrival_time: 1709460316564,
    order_items: [
        {
            item_name: [
                {
                    ISO_language_code: "vie",
                    text: "Cơm Ức Gà Gạo Lứt",
                },
            ],
            item_img:
                "https://res.cloudinary.com/dtopkwb9k/image/upload/v1701613497/Food/default_food_image_w6r6eo.png",
            order_id: 2,
            sku_id: 1,
            qty_ordered: 1,
            price: 65000,
            advanced_taste_customization_obj: [
                {
                    option_id: "3",
                    value_id: "8",
                },
            ],
            basic_taste_customization_obj: [
                {
                    no_adding_id: "no_onion",
                },
            ],
            advanced_taste_customization: "nhiều cay",
            basic_taste_customization: "Không hành",
            portion_customization: "Ức gà 200g",
            notes: "",
            packaging_info: {
                packaging_id: 1,
                name: [
                    {
                        ISO_language_code: "vie",
                        text: "Hộp bã mía",
                    },
                ],
                description: [
                    {
                        ISO_language_code: "vie",
                        text: "Thân thiện với môi trường. Kích thước 15cm x 15 cm",
                    },
                ],
                price: 3000,
            },
        },
        {
            item_name: [
                {
                    ISO_language_code: "vie",
                    text: "Cơm Ức Gà Gạo Lứt",
                },
            ],
            item_img:
                "https://res.cloudinary.com/dtopkwb9k/image/upload/v1701613497/Food/default_food_image_w6r6eo.png",
            order_id: 2,
            sku_id: 2,
            qty_ordered: 1,
            price: 85000,
            advanced_taste_customization_obj: [
                {
                    option_id: "3",
                    value_id: "8",
                },
            ],
            basic_taste_customization_obj: [
                {
                    no_adding_id: "no_onion",
                },
            ],
            advanced_taste_customization: "nhiều cay",
            basic_taste_customization: "Không hành",
            portion_customization: "Ức gà 150g",
            notes: "",
            packaging_info: {
                packaging_id: 2,
                name: [
                    {
                        ISO_language_code: "vie",
                        text: "Hộp tinh bột Ngô",
                    },
                ],
                description: [
                    {
                        ISO_language_code: "vie",
                        text: "Thân thiện với môi trường. Kích thước 15cm x 15 cm",
                    },
                ],
                price: 2500,
            },
        },
    ],
    order_status_log: [
        {
            status: "NEW",
            description: [
                {
                    ISO_language_code: "vie",
                    text: "MỚI",
                },
            ],
            logged_at: 1709472198000,
            milestone: "created",
        },
        {
            status: "IDLE",
            description: [
                {
                    ISO_language_code: "vie",
                    text: "ĐANG CHỜ",
                },
            ],
            logged_at: 1709472240000,
            milestone: "confirmed",
        },
        {
            status: "PROCESSING",
            description: [
                {
                    ISO_language_code: "vie",
                    text: "ĐANG THỰC HIỆN",
                },
            ],
            logged_at: 1709472267000,
            milestone: "started_to_process",
        },
        {
            status: "READY",
            description: [
                {
                    ISO_language_code: "vie",
                    text: "ĐÃ SẴN SÀNG",
                },
            ],
            logged_at: 1709472277000,
        },
        {
            status: "DELIVERING",
            description: [
                {
                    ISO_language_code: "vie",
                    text: "ĐANG GIAO",
                },
            ],
            logged_at: 1709472283000,
            milestone: "picked_up",
        },
        {
            status: "COMPLETED",
            description: [
                {
                    ISO_language_code: "vie",
                    text: "HOÀN THÀNH",
                },
            ],
            logged_at: 1709472358000,
            milestone: "completed",
        },
    ],
};
