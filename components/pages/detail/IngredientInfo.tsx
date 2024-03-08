import useRenderText from "@/hooks/useRenderText";
import { FoodDetailDto } from "@/types/response/FoodResponse";
import { SKUsDto } from "@/types/response/GetListSKUsByIdResponse";
import { Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs, Text, VStack, Wrap, WrapItem } from "@chakra-ui/react";
import { useTranslations } from "next-intl";

const IngredientInfo = ({ info, activeSKU: _activeSKU }: { info?: FoodDetailDto; activeSKU?: SKUsDto }) => {
    const t = useTranslations("PRODUCT_DETAIL");
    const { renderTxt } = useRenderText();

    return (
        <Tabs position="relative" variant="ingredient" mt="0.8rem" isFitted mb="3.2rem">
            <TabList>
                <Tab>{t("COMPONENTS")}</Tab>
                <Tab>{t("DESCRIPTION")}</Tab>
            </TabList>
            <TabIndicator height="0.2rem" bg="#00322A" borderRadius="1px" />
            <TabPanels border="var(--divider)" borderTopWidth="2px">
                <TabPanel>
                    <Wrap spacing="0" border="unset">
                        {info?.ingredients.map((el, index) => (
                            <WrapItem key={String(index)}>
                                <VStack
                                    p="1.6rem 2.4rem 0.6rem 2.4rem"
                                    fontSize={"1.4rem"}
                                    spacing={"0"}
                                    alignItems={"flex-start"}
                                >
                                    <Text color="var(--gray-900)">{el.item_name_vie ?? "-"}</Text>
                                    <Text color="var(--gray-600)">{`${el.quantity?.toLocaleString() ?? "-"}${el.unit ?? ""}`}</Text>
                                </VStack>
                            </WrapItem>
                        ))}
                    </Wrap>
                </TabPanel>
                <TabPanel minH="7.4rem">
                    <Text p="1.6rem 2.4rem" fontSize={"1.4rem"} color="var(--gray-900)">
                        {renderTxt(info?.description) ?? "-"}
                    </Text>
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
};
export default IngredientInfo;
