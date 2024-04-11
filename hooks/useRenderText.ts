import { localeOption } from "@/utils/constants";
import { getLocale } from "@/utils/functions";
import { useLocale } from "next-intl";

interface TypeTextData {
    ISO_language_code: string;
    text: string;
}

const useRenderText = () => {
    const locale = useLocale();
    const localVal = localeOption.find((local) => local.val === locale)?.content.toLowerCase();

    const renderTxt = (txtData: TypeTextData[] | any) => {
        const txtExpect = txtData?.find((txt: any) => txt.ISO_language_code === localVal);
        return txtExpect ? txtExpect.text : txtData?.[0]?.text || "";
    };

    return { renderTxt };
};

const getRenderText = (txtData: TypeTextData[] | any) => {
    const locale = getLocale();
    const localVal = localeOption.find((local) => local.val === locale)?.content.toLowerCase();

    const txtExpect = txtData?.find((txt: any) => txt.ISO_language_code === localVal);
    return txtExpect ? txtExpect.text : txtData?.[0]?.text || "";
};
export { getRenderText };

export default useRenderText;
