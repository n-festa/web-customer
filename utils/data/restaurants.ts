import { RestaurantDto } from "@/types/response/base";

export const restaurantResult: RestaurantDto[] = [
    {
        id: 1,
        intro_video:
            "https://v16-webapp-prime.tiktok.com/video/tos/alisg/tos-alisg-pve-0037/oQBxAd4f7fDFtCjQIkhzOCN6EvoQgkN7BU883V/?a=1988&ch=0&cr=3&dr=0&lr=unwatermarked&cd=0%7C0%7C0%7C3&cv=1&br=3338&bt=1669&bti=ODszNWYuMDE6&cs=0&ds=6&ft=3.u4FZzI0PD12.fZnR3wUfDe5SHEg9N1Ohlc&mime_type=video_mp4&qs=0&rc=ZGQ1NTw6aWY0ODw4Nzs7aUBpM3JxeGg6Zng6bTMzODgzNEAwXl40MDNjXzIxYDZeMGNeYSNxY21qcjQwMXJgLS1kLzFzcw%3D%3D&btag=e00088000&expire=1701272839&l=20231129094650031038E224C31C146B0F&ply_type=2&policy=2&signature=3932a1c7b7228a37f61b2226e8b674bb&tk=tt_chain_token",
        logo_img: "https://cdn-icons-png.flaticon.com/512/4682/4682343.png",
        name: [
            {
                ISO_language_code: "vie",
                text: "The Chef Town",
            },
        ],
        rating: "4.50",
        distance_km: 0.86,
        delivery_time_s: 247,
        specialty: [
            {
                ISO_language_code: "vie",
                text: "Eat Clean",
            },
        ],
        top_food: "Cơm nhật Tonkatsu",
        promotion: "Ưu đãi đến 50k",
        cutoff_time: ["09:30:59", "08:00:00"],
        having_vegeterian_food: true,
        max_price: 100000,
        min_price: 95000,
        unit: "vnd",
    },
];
