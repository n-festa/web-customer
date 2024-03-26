import useRenderText from "@/hooks/useRenderText";
import { PackageInfo } from "@/types/response/FoodResponse";
import { formatMoney } from "@/utils/functions";
import { Flex, HStack, Image, Text, VStack, Wrap, WrapItem } from "@chakra-ui/react";

const PackageItem = ({
    item,
    isSelected = false,
    onClick,
}: {
    item: PackageInfo;
    isSelected: boolean;
    onClick: () => void;
}) => {
    const { renderTxt } = useRenderText();
    return (
        <Flex
            p="2.4rem"
            borderRadius="1.6rem"
            w="40.2rem"
            h="15.2rem"
            cursor="pointer"
            border={isSelected ? "1px solid transparent" : "var(--divider)"}
            bg={isSelected ? "var(--primary-color)" : "white"}
            onClick={onClick}
        >
            <HStack spacing="2.4rem">
                <Image w="10rem" h="10rem" borderRadius="0.8rem" src={item.image_url} alt="package-item" />
                <VStack alignItems="flex-start">
                    <Text
                        fontSize="1.6rem"
                        fontWeight={600}
                        color={isSelected ? "var(--primary-button-text-color)" : "var(--gray-900)"}
                    >
                        {renderTxt(item.name)}
                    </Text>
                    <Text fontSize="1.6rem" fontWeight={500} color={isSelected ? "white" : "var(--gray-700)"}>
                        {renderTxt(item.description)}
                    </Text>
                    <Text
                        alignSelf="flex-end"
                        fontSize="1.6rem"
                        fontWeight={600}
                        color={isSelected ? "var(--primary-button-text-color)" : "var(--gray-700)"}
                    >
                        {formatMoney(item.price)}
                    </Text>
                </VStack>
            </HStack>
        </Flex>
    );
};

const PackageSelect = ({
    items,
    selectedItem,
    onChange,
}: {
    items: PackageInfo[];
    selectedItem?: string;
    onChange?: (value?: string | number) => void;
}) => {
    return (
        <Wrap align="center" spacing="4rem" w="100%">
            {items.map((item, index) => (
                <WrapItem key={`package_${index}`}>
                    <PackageItem
                        item={item}
                        isSelected={String(item.packaging_id) === String(selectedItem)}
                        onClick={() => {
                            onChange?.(item.packaging_id);
                        }}
                    />
                </WrapItem>
            ))}
        </Wrap>
    );
};
export default PackageSelect;
