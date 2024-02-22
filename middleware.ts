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
