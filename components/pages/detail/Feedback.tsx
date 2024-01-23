"use client";
import Pagination from "@/components/molecules/Pagination";
import WraperInfo from "@/components/molecules/WraperInfo";
import { ReviewCard } from "@/components/pages/landing-page/testimonial";
import { Flex, Wrap, WrapItem } from "@chakra-ui/react";

const Feedback = () => {
    const feedback = [
        {
            name: "Alexander R.",
            loyalCustomers: true,
            comment: "“Đồ ăn tươi, rất hợp khẩu vị mình.”",
            star: 5,
            isShowAuthor: true,
        },
        {
            loyalCustomers: false,
            comment: "“Đóng gói đẹp, thức ăn ngon”",
            star: 5,
        },
        {
            loyalCustomers: false,
            comment: "“Nhà hàng nấu rất có tâm.”",
            star: 5,
        },
    ];
    return (
        <Flex flexDirection={"column"} w="100%">
            <WraperInfo
                title="Nhận xét món ăn"
                titleProps={{ fontSize: "2.4rem" }}
                isViewAll={false}
                contentProps={{ mt: "1.6rem" }}
                mt="5.6rem"
            >
                <Wrap align="center" justify={"center"} spacing="1.6rem" w="100%">
                    {feedback.map((el, index) => (
                        <WrapItem key={String(index)}>
                            <ReviewCard
                                name={el.name}
                                star={el.star}
                                isShowAuthor={el.isShowAuthor}
                                comment={el.comment}
                            />
                        </WrapItem>
                    ))}
                </Wrap>
            </WraperInfo>
            <Pagination
                currentPage={1}
                onChangePage={(_index: number) => {
                    //
                }}
                totalPage={3}
                alignSelf={"flex-end"}
                my="1rem"
            />
        </Flex>
    );
};

export default Feedback;
