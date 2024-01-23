"use client";
import useSearchPlace from "@/hooks/useSearchPlace";
import {
    Box,
    Button,
    Img,
    Input,
    InputGroup,
    InputGroupProps,
    InputLeftElement,
    InputRightElement,
} from "@chakra-ui/react";
import { LocateFixed } from "lucide-react";

import { createQueryString } from "@/utils/functions";
import { routes } from "@/utils/routes";
import { useRouter } from "next/navigation";
import { FormEvent, useCallback, useRef, useState } from "react";
import useOnClickOutside from "use-onclickoutside";
import LocationSuggestion from "./LocationSuggestion";
const SearchLocation = (props: InputGroupProps) => {
    const router = useRouter();
    const { input, setInput, suggestionPlaces, onClickDetect, isLoading, error } = useSearchPlace();
    const [isShowSuggestion, setShowSuggestion] = useState(false);
    const ref = useRef(null);

    useOnClickOutside(ref, () => {
        setShowSuggestion(false);
    });

    const onSubmit = useCallback(
        (e: FormEvent<HTMLDivElement>) => {
            e.preventDefault();
            const url = createQueryString("path", input);
            router.push(`${routes.Search}?${url}`);
        },
        [input, router],
    );
    return (
        <Box position="relative" ref={ref}>
            <InputGroup
                p="1rem 1.6rem"
                alignItems="center"
                display="flex"
                borderRadius="99px"
                border="1px solid var(--gray-300)"
                bg="var(--color-floralwhite)"
                h="5.6rem"
                as="form"
                onSubmit={onSubmit}
                {...props}
            >
                <InputLeftElement ml="1.6rem" h="100%" pointerEvents="none">
                    <Img className="small-icon" alt="" src="/images/markerpin03.svg" />
                </InputLeftElement>
                <Input
                    placeholder="Nhập địa chỉ để tìm món ngon gần bạn"
                    ml="1.6rem"
                    fontSize="1.8rem"
                    onFocus={() => {
                        setShowSuggestion(true);
                    }}
                    textOverflow="ellipsis"
                    mr="10.7rem"
                    variant="search"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                />
                <InputRightElement mr="1.6rem" h="100%" w="fit-content" display="flex" gap="0.5rem">
                    <LocateFixed
                        onClick={() => {
                            setShowSuggestion(true);
                            onClickDetect();
                        }}
                        cursor="pointer"
                        color="var(--primary-text-color)"
                    />
                    <Button h="3.6rem" w="9.1rem" borderRadius="9rem" variant="solid" type="submit">
                        Tìm món
                    </Button>
                </InputRightElement>
            </InputGroup>
            <LocationSuggestion
                error={error}
                input={input}
                suggestionPlaces={suggestionPlaces}
                in={isShowSuggestion && (input != "" || suggestionPlaces.length > 0)}
                onClickRow={(value) => {
                    setShowSuggestion(false);
                    setInput(value);
                }}
                isLoading={isLoading}
            />
        </Box>
    );
};

export default SearchLocation;
