// https://github.com/isaurssaurav/react-pagination
import { Button, HStack, Img, StackProps, Text } from "@chakra-ui/react";
import { css } from "@emotion/react";

import React, { useEffect, useState } from "react";
import { useSwiper } from "swiper/react";

interface Props extends StackProps {
    totalPage: number;
    currentPage: number;
    showAll?: boolean;
    isDisabledDot?: boolean;
    onChangePage: (currentPage: number) => void;
}

const Pagination = ({ currentPage, onChangePage, totalPage, showAll, isDisabledDot = true, ...rest }: Props) => {
    const [firstThreeArray, setFirstThreeArray] = useState([1]);
    const [showLastEllipis, setShowLastEllipis] = useState(true);
    const [isNext, setNext] = useState(true);
    const [initPage, setInitPage] = useState(currentPage);
    const swiper = useSwiper();

    useEffect(() => {
        if (totalPage <= 5) {
            const fArray: number[] = [];

            for (let i = 1; i <= totalPage; i++) {
                fArray.push(i);
            }
            setFirstThreeArray(fArray);
        } else {
            if (currentPage < 3) {
                setFirstThreeArray([1, 2, 3]);
                setShowLastEllipis(true);
            } else {
                const fArray: number[] = [];
                let index = 1;
                const offset = isNext ? 1 : 2;
                const nextIndex = currentPage >= totalPage - offset ? currentPage : currentPage + 1;
                for (let j = nextIndex; j >= 0; j--) {
                    fArray.push(j);
                    if (
                        (index === 3 &&
                            (currentPage !== totalPage - 2 || (currentPage === totalPage - 2 && !isNext))) ||
                        (currentPage === totalPage - 2 && index === 2 && isNext)
                    ) {
                        break;
                    }
                    index++;
                }
                if (currentPage === totalPage - 1) {
                    fArray.pop();
                }
                fArray.reverse();
                if (currentPage === totalPage) {
                    fArray.pop();
                }
                setFirstThreeArray(fArray);

                if (currentPage >= totalPage - 1 || (currentPage == totalPage - 2 && isNext)) {
                    setShowLastEllipis(false);
                } else {
                    setShowLastEllipis(true);
                }
            }
        }
    }, [currentPage, totalPage, isNext]);

    const prev = () => {
        if (currentPage > 1) {
            setNext(false);
            swiper.slidePrev();
            onChangePage(currentPage - 1);
        }
    };
    const next = () => {
        if (currentPage < totalPage) {
            setNext(true);
            swiper.slideNext();
            onChangePage(currentPage + 1);
        }
    };

    useEffect(() => {
        // reset current page if totalPage changed
        if (initPage > totalPage) onChangePage(1);
    }, [totalPage]);

    useEffect(() => {
        setInitPage(currentPage);
    }, [currentPage]);

    const showEllipsis = (showEllipis: boolean) => {
        return showEllipis && <Text fontWeight="bold" fontSize="1.4rem" display="inline-block"></Text>;
    };
    const isActive = (index: number) => {
        if (index == currentPage) {
            return true;
        }

        return false;
    };

    const createPagiButton = (pageNo: number) => {
        return (
            <Button
                key={pageNo}
                _disabled={{}}
                disabled={pageNo === currentPage}
                onClick={() => {
                    if (isDisabledDot) return;

                    if (pageNo !== currentPage) {
                        setNext(pageNo > currentPage);
                        onChangePage(pageNo);
                    }
                }}
                bg={isActive(pageNo) ? "var(--color-palegoldenrod)" : "var(--gray-200)"}
                variant={"btnDotPagination"}
            ></Button>
        );
    };
    const showFirstPagi = () => {
        return !showLastEllipis && createPagiButton(1);
    };
    const showLastPagi = () => {
        return createPagiButton(totalPage);
    };
    const showPrev = () => {
        return (
            <Button
                variant={"btnPagination"}
                justifyContent={"center"}
                alignItems={"center"}
                disabled={currentPage === 1}
                onClick={prev}
            >
                <Img src="/images/chevronleft.svg" w="20px" h="20px" />
            </Button>
        );
    };
    const showNext = () => {
        return (
            <Button
                variant={"btnPagination"}
                justifyContent={"center"}
                alignItems={"center"}
                disabled={currentPage === totalPage}
                onClick={next}
            >
                <Img src="/images/chevronright.svg" w="20px" h="20px" />
            </Button>
        );
    };

    return (
        <>
            <HStack spacing="2rem" alignItems="center" justifyContent="center" {...rest}>
                {showPrev()}
                <HStack
                    css={css`
                        .is-active {
                            color: var(--main-color);
                            box-shadow: var(--box-shadow-input);
                        }
                    `}
                    alignItems="center"
                    justifyContent="center"
                    spacing="12px"
                >
                    <React.Fragment>
                        {totalPage > 5 && (
                            <>
                                {showFirstPagi()}
                                {showEllipsis(!showLastEllipis)}
                            </>
                        )}
                        {firstThreeArray.map(createPagiButton)}
                        {totalPage > 5 && (
                            <>
                                {showEllipsis(showLastEllipis)}
                                {showLastPagi()}
                            </>
                        )}
                    </React.Fragment>
                </HStack>
                {showNext()}
                {showAll && <Button variant={"btnViewAll"}>Xem tất cả</Button>}
            </HStack>
        </>
    );
};

export default Pagination;
