import { FoodDetailDto } from "@/types/response/FoodResponse";
import { SKUsDto } from "@/types/response/GetListSKUsByIdResponse";
import { Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs, Text, VStack, Wrap, WrapItem } from "@chakra-ui/react";

const IngredientInfo = ({ info, activeSKU: _activeSKU }: { info?: FoodDetailDto; activeSKU?: SKUsDto }) => {
    return (
        <Tabs position="relative" variant="ingredient" mt="0.8rem" isFitted>
            <TabList>
                <Tab>Thành phần</Tab>
                <Tab>Mô tả</Tab>
            </TabList>
            <TabIndicator height="0.2rem" bg="#00322A" borderRadius="1px" />
            <TabPanels>
                <TabPanel>
                    <Wrap>
                        {info?.ingredients.map((el, index) => (
                            <WrapItem key={String(index)}>
                                <VStack p="1.6rem 2.4rem" fontSize={"1.4rem"} spacing={"0"} alignItems={"flex-start"}>
                                    <Text color="var(--gray-900)">{el.item_name_vie ?? "-"}</Text>
                                    <Text color="var(--gray-600)">{`${el.quantity?.toLocaleString() ?? "-"}${el.unit ?? ""}`}</Text>
                                </VStack>
                            </WrapItem>
                        ))}
                    </Wrap>
                </TabPanel>
                <TabPanel minH={"10rem"}>
                    <Text fontSize={"1.4rem"} color="var(--gray-900)">
                        {info?.description?.[0].text ?? "-"}
                    </Text>
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
};
export default IngredientInfo;
