import { Tab, TabIndicator, TabList, TabPanel, TabPanels, Tabs, Text, VStack, Wrap, WrapItem } from "@chakra-ui/react";

const IngredientInfo = () => {
    const ingredients = [
        {
            name: "Ức gà",
            weight: "150",
            unit: "gr",
        },
        {
            name: "Gạo lứt",
            weight: "150",
            unit: "gr",
        },
        {
            name: "Bông cải trắng",
            weight: "30",
            unit: "gr",
        },
        {
            name: "Ớt chuông",
            weight: "20",
            unit: "gr",
        },
        {
            name: "Bánh Tart",
            weight: "150",
            unit: "gr",
        },
        {
            name: "Hành lá",
            weight: "1",
            unit: "muỗng cà phê",
        },
        {
            name: "Tiêu",
            weight: "1/3",
            unit: "muỗng cà phê",
        },
    ];
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
                        {ingredients.map((el, index) => (
                            <WrapItem key={String(index)}>
                                <VStack p="1.6rem 2.4rem" fontSize={"1.4rem"} spacing={"0"} alignItems={"flex-start"}>
                                    <Text color="var(--gray-900)">{el.name}</Text>
                                    <Text color="var(--gray-600)">{`${el.weight} ${el.unit}`}</Text>
                                </VStack>
                            </WrapItem>
                        ))}
                    </Wrap>
                </TabPanel>
                <TabPanel>
                    <Text fontSize={"1.4rem"} color="var(--gray-900)">
                        Updating...
                    </Text>
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
};
export default IngredientInfo;
