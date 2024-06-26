"use client";
import useSearchPlace, { SearchLocationErrorType } from "@/hooks/useSearchPlace";
import {
    Box,
    Button,
    Img,
    Input,
    InputGroup,
    InputGroupProps,
    InputLeftElement,
    InputProps,
    InputRightElement,
    StackProps,
} from "@chakra-ui/react";
import { LocateFixed } from "lucide-react";

import { routes } from "@/utils/routes";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { FormEvent, RefObject, useCallback, useRef, useState } from "react";
import useOnClickOutside from "use-onclickoutside";
import LocationSuggestion from "./LocationSuggestion";

interface Props {
    rightElement?: React.ReactNode;
    leftElement?: React.ReactNode;
    inputProps?: InputProps;
    initValue?: string;
    inputRefProps?: RefObject<HTMLInputElement>;
    locationSuggestionProps?: StackProps & { hoverBg?: string };
}

const SearchLocation = ({
    rightElement,
    leftElement,
    inputProps,
    initValue,
    inputRefProps,
    locationSuggestionProps,
    ...props
}: Props & InputGroupProps) => {
    const t = useTranslations("HOME.BANNER");
    const {
        input,
        setInput,
        suggestionPlaces,
        onClickDetect,
        isLoading,
        error,
        setLocation,
        selectedPlace,
        setSelectedPlace,
        setError,
    } = useSearchPlace({
        initValue: initValue,
    });
    const [isShowSuggestion, setShowSuggestion] = useState(false);
    const ref = useRef(null);
    const _refInput = useRef<HTMLInputElement>(null);
    const inputRef = inputRefProps ?? _refInput;

    const router = useRouter();

    useOnClickOutside(ref, () => {
        setShowSuggestion(false);
    });

    const onSubmit = useCallback((e: FormEvent<HTMLDivElement>) => {
        e.preventDefault();
    }, []);
    const handleOnClickSearch = useCallback(() => {
        if (selectedPlace) {
            router.push(routes.Search);
        } else {
            setError({
                type: SearchLocationErrorType.Error,
                text: t("SELECT_YOUR_ADDRESS"),
            });
        }
    }, [router, selectedPlace, setError]);
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
                {leftElement ? (
                    leftElement
                ) : (
                    <InputLeftElement ml="1.6rem" h="100%" pointerEvents="none">
                        <Img className="small-icon" alt="" src="/images/markerpin03.svg" />
                    </InputLeftElement>
                )}
                <Input
                    ref={inputRef}
                    placeholder={t("SEARCH")}
                    ml="1.6rem"
                    fontSize="1.8rem"
                    onFocus={() => {
                        setShowSuggestion(true);
                        setTimeout(() => {
                            inputRef.current?.focus();
                        }, 0);
                    }}
                    textOverflow="ellipsis"
                    mr="10.7rem"
                    variant="search"
                    {...inputProps}
                    value={input}
                    onChange={(e) => {
                        if (!isShowSuggestion) {
                            setShowSuggestion(true);
                        }
                        setSelectedPlace(undefined);
                        setInput(e.target.value);
                    }}
                />
                {rightElement ? (
                    rightElement
                ) : (
                    <InputRightElement mr="1.6rem" h="100%" w="fit-content" display="flex" gap="0.5rem">
                        <LocateFixed
                            onClick={() => {
                                inputRef.current?.focus();
                                setShowSuggestion(true);
                                onClickDetect();
                            }}
                            cursor="pointer"
                            color="var(--primary-text-color)"
                        />
                        <Button h="3.6rem" w="9.1rem" borderRadius="9rem" variant="solid" onClick={handleOnClickSearch}>
                            {t("DISCOVER_FOOD")}
                        </Button>
                    </InputRightElement>
                )}
            </InputGroup>
            <LocationSuggestion
                error={error}
                input={input}
                suggestionPlaces={suggestionPlaces}
                in={isShowSuggestion && (input != "" || suggestionPlaces.length > 0)}
                onClickRow={(value) => {
                    setShowSuggestion(false);
                    setInput(value.formatted_address ?? "");
                    setLocation(value);
                    setSelectedPlace(value);
                    setError(undefined);
                }}
                styleProps={locationSuggestionProps}
                isLoading={isLoading}
            />
        </Box>
    );
};

export default SearchLocation;
