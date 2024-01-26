import { HighlightedText } from "@/components/atoms/Label/HighlightedLabel";
import { SearchLocationErrorType } from "@/hooks/useSearchPlace";
import { SearchError, SearchPlaceResponse } from "@/types/response/SearchPlaceResponse";
import { Collapse, CollapseProps, Flex, Spinner, StackProps, VStack } from "@chakra-ui/react";

const LocationSuggestion = ({
    input,
    suggestionPlaces,
    onClickRow,
    isLoading,
    error,
    styleProps,
    ...props
}: {
    input: string;
    onClickRow?: (value: SearchPlaceResponse) => void;
    isLoading?: boolean;
    error?: SearchError;
    suggestionPlaces: SearchPlaceResponse[];
    styleProps?: StackProps & { hoverBg?: string };
} & CollapseProps) => {
    const { hoverBg, ...styles } = styleProps || {};
    return (
        <Collapse {...props}>
            <VStack
                position="absolute"
                zIndex={999}
                w="100%"
                mt="1rem"
                borderRadius="0.8rem"
                bg="var(--main-bg-color-alpha)"
                alignItems="flex-start"
                boxShadow="0px 4px 6px -2px #10182808 , 0px 12px 16px -4px #10182814"
                p="0.6rem"
                {...styles}
            >
                {error && (
                    <Flex
                        justifyContent="center"
                        textAlign="center"
                        w="100%"
                        px="1rem"
                        borderRadius="0.6rem"
                        fontSize="1.6rem"
                        bg={error.type === SearchLocationErrorType.Error ? "#FDA29B20" : "#F7900920"}
                        color={error.type === SearchLocationErrorType.Error ? "#F04438" : "#F79009"}
                    >
                        {error.text}
                    </Flex>
                )}
                {suggestionPlaces.map((suggestion, index) => (
                    <Flex
                        cursor="pointer"
                        borderRadius="0.6rem"
                        px="1rem"
                        _hover={{
                            bg: hoverBg ?? "var(--main-bg-color-light-alpha)",
                        }}
                        onClick={() => onClickRow?.(suggestion)}
                        w="100%"
                        h="4.8rem"
                        key={"suggestion" + index}
                        color="var(--gray-600)"
                        fontSize="1.6rem"
                        alignItems="center"
                        overflow="hidden"
                        textOverflow="ellipsis"
                    >
                        <HighlightedText
                            text={suggestion?.formatted_address ?? ""}
                            highlightStyle={{
                                fontWeight: "medium",
                            }}
                            highlight={input}
                        />
                    </Flex>
                ))}
                {isLoading && (
                    <Flex py="0.5rem" w="100%" justifyContent="center">
                        <Spinner color="var(--primary-color)" />
                    </Flex>
                )}
            </VStack>
        </Collapse>
    );
};

export default LocationSuggestion;
