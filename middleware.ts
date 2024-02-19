import { routes } from "@/utils/routes";
import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";

// Limit the middleware to paths starting with `/api/`
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        "/((?!api|_next/static|_next/image|favicon.ico).*)",
        "/",
        "/(en|vi)/:path*",
    ],
};

export async function middleware(request: NextRequest) {
    if (request.nextUrl.pathname.startsWith(routes.ProductDetail)) {
        const restaurantId = request.nextUrl.searchParams.get("restaurantId");

        if (!restaurantId) return NextResponse.next();

        return NextResponse.redirect(
            new URL(`${routes.RestaurantDetail}/${restaurantId}?des=${request.nextUrl.pathname}`, request.url),
        );
    }

    return NextResponse.next();
}

export default createMiddleware({
    // A list of all locales that are supported
    locales: ["en", "vi"],

    // Used when no locale matches
    defaultLocale: "vi",
});
