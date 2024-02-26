import { YYYYMMDD } from "@/utils/constants";
import { isNullOrEmpty } from "@/utils/functions";
import { format as formatFns, parse, parseISO, subDays as subDaysFunc } from "date-fns";

export const formatDate = (
    value?: string | number | Date | null,
    format?: string,
    option?: {
        referenceFormat?: string;
    },
): string => {
    const { referenceFormat } = option ?? {};
    if (isNullOrEmpty(value)) return "";
    try {
        if (typeof value === "string") {
            return formatFns(
                referenceFormat ? parse(value, referenceFormat, new Date()) : parseISO(value),
                format ?? YYYYMMDD,
            );
        }

        return formatFns(value, format ?? YYYYMMDD);
    } catch (error) {
        console.log(error);
        return "";
    }
};

export const subDays = (startDate: Date, dateNumber: number) => {
    return subDaysFunc(startDate, dateNumber);
};
