// import { NextRequest } from "next/server";

// // Limit the middleware to paths starting with /api/
// export const config = {
//     matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
// };

// const locales = ["vi", "en"];

// export function middleware(request: NextRequest) {
//     // Check if there is any supported locale in the pathname
//     const { pathname } = request.nextUrl;
//     const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`);

//     if (pathnameHasLocale) return;

//     //   if (request.nextUrl.pathname.startsWith(routes.ProductDetail)) {
//     //     const restaurantId = request.nextUrl.searchParams.get("restaurantId");

//     //     if (!restaurantId) return NextResponse.next();

//     //     return NextResponse.redirect(
//     //         new URL(`${routes.RestaurantDetail}/${restaurantId}?des=${request.nextUrl.pathname}`, request.url),
//     //     );
//     // }

//     // Redirect if there is no locale
//     request.nextUrl.pathname = `/en${pathname}`;
//     // e.g. incoming request is /products
//     // The new URL is now /en-US/products
//     return Response.redirect(request.nextUrl);
// }

import createMiddleware from "next-intl/middleware";

// Limit the middleware to paths starting with /api/
export const config = {
    matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};

export default createMiddleware({
    // A list of all locales that are supported
    locales: ["vi", "en"],

    // Used when no locale matches
    defaultLocale: "vi",
});
