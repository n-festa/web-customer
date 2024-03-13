import { optiopnDiet } from "@/utils/constants";
import { Box, Flex, Input, Img, Collapse, useDisclosure, Text } from "@chakra-ui/react";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { useOutsideClick } from "@chakra-ui/react";
type TagSelectorProps = {
    data: string;
    setData: (data: string) => void;
};

const TagSelector = ({ data, setData }: TagSelectorProps) => {
    const ref = useRef(null);
    const { isOpen, onToggle, onClose } = useDisclosure();
    useOutsideClick({
        ref: ref,
        handler: () => {
            onClose();
            setData(tagData.join(","));
        },
    });
    const [tagData, setTagData] = useState(data.split(","));
    const [inputValue, setInputValue] = useState("");
    const tForm = useTranslations("FORM.DATA_PROFILE");
    const t = useTranslations("");

    const handleSelect = (val: string) => {
        setTagData((prev) => [...prev, val]);
    };
    const handleRemoveTag = (index: number) => {
        setTagData((prev) => prev.filter((_, i) => i !== index));
    };
    const handleInput = (e: any) => {
        if (e.keyCode === 188 || e.keyCode === 13) {
            e.preventDefault();
            if (inputValue != "") {
                setTagData((prev) => [...prev, inputValue]);
            }
            setInputValue("");
        }
    };
    useEffect(() => {
        setTagData(data.split(","));
    }, [data]);
    return (
        <Box position="relative" ref={ref} w="100%">
            <Flex flexWrap="wrap" padding="1rem 1.2rem" border="1px solid #336C63" bg="#fff" borderRadius="0.8rem">
                <Flex gap="0.8rem" maxW="100%" flexWrap="wrap">
                    {tagData.map(
                        (tag, index) =>
                            tag && (
                                <Box
                                    key={index}
                                    cursor="pointer"
                                    p={"0.4rem 0.4rem 0.4rem 1rem"}
                                    boxSizing="border-box"
                                    fontWeight={"700"}
                                    fontSize="1.4rem"
                                    maxH="2.8rem"
                                    border="1px solid #8DC63F"
                                    borderRadius={"0.8rem"}
                                    display={"flex"}
                                    justifyContent={"space-between"}
                                    alignItems={"center"}
                                    whiteSpace={"nowrap"}
                                    bg="#E8F4D9"
                                    color="var(--green-light-500)"
                                    w="max-content"
                                >
                                    {tag}
                                    <Img
                                        ml="4px"
                                        w={"1.4rem"}
                                        src="/images/icons/x-close.svg"
                                        onClick={() => handleRemoveTag(index)}
                                    />
                                </Box>
                            ),
                    )}
                    <Input
                        maxW="40%"
                        type="text"
                        border="none"
                        fontSize="1.4rem"
                        color="var(--green-light-500)"
                        fontWeight={"700"}
                        value={inputValue}
                        onFocus={onToggle}
                        onKeyDown={handleInput}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                </Flex>
                {/* <Flex maxW="40%"></Flex> */}
            </Flex>
            <Collapse in={isOpen}>
                <Box
                    p="2.4rem 1.6rem"
                    borderRadius="0 0 0.8rem 0.8rem"
                    bg="#fff"
                    boxShadow="md"
                    position="absolute"
                    zIndex={999}
                    w="100%"
                    mt="1rem"
                    alignItems="flex-start"
                    left="0"
                    right="0"
                    bottom="0"
                    transform="translateY(100%)"
                >
                    <Text fontWeight="400" color="var(--gray-600)" fontSize="1.4rem" mb="1.6rem">
                        {t("COMMON.SUGGEST")}
                    </Text>
                    <Flex gap="1.6rem" flexWrap="wrap">
                        {optiopnDiet(tForm).map((diet, index) => (
                            <Box
                                key={index}
                                h="3.6rem"
                                border="1px solid var(--gray-300)"
                                borderRadius="2.4rem"
                                fontSize="1.4rem"
                                fontWeight="600"
                                color="#336C63"
                                textAlign="center"
                                cursor="pointer"
                                p="0.8rem 1.4rem"
                                _hover={{
                                    bg: "#E8F4D9",
                                    color: "var(--green-light-500)",
                                    borderColor: "#8DC63F",
                                }}
                                onClick={() => handleSelect(diet)}
                            >
                                {diet}
                            </Box>
                        ))}
                    </Flex>
                </Box>
            </Collapse>
        </Box>
    );
};
export default TagSelector;
