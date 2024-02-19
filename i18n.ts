import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

// Can be imported from a shared config
const locales = ["en", "vi"];

export default getRequestConfig(async ({ locale }) => {
    const baseLocale = new Intl.Locale(locale).baseName;
    // Validate that the incoming `locale` parameter is valid
    if (!locales.includes(baseLocale)) notFound();

    return {
        messages: (await import(`./messages/${baseLocale}.json`)).default,
    };
});
