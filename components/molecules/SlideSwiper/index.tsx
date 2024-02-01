"use client";
import Pagination from "@/components/molecules/Pagination";
import { Flex } from "@chakra-ui/react";
import { useState } from "react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

interface Props {
    items: React.ReactNode[];
    perPage?: number;
    spaceBetween?: number | string;
}

const SlideSwiper = ({ items, perPage = 3, spaceBetween = "16" }: Props) => {
    const [page, setPage] = useState(1);

    return (
        <Swiper
            slidesPerView={perPage}
            spaceBetween={spaceBetween}
            pagination={{
                clickable: true,
            }}
            modules={[Navigation]}
            autoplay={false}
            loop={false}
        >
            {items.map((el, index) => (
                <SwiperSlide key={index}>{el}</SwiperSlide>
            ))}

            <Flex w="100%" justifyContent={"flex-end"} mt="1.6rem">
                <Pagination
                    currentPage={page}
                    onChangePage={(_index: number) => {
                        setPage(_index);
                    }}
                    totalPage={Math.ceil(items.length / perPage)}
                    alignSelf={"flex-end"}
                    my="1rem"
                />
            </Flex>
        </Swiper>
    );
};

export default SlideSwiper;
