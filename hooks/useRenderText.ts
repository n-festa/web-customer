import { localeOption } from "@/utils/constants";
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

export default useRenderText;
