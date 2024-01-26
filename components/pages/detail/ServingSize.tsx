"use client";
import GroupRadioButton from "@/components/atoms/radio/GroupRadioButton";
import WraperInfo from "@/components/molecules/WraperInfo";
import { HStack, Switch, Text, Textarea, VStack } from "@chakra-ui/react";

const ServingSize = () => {
    return (
        <VStack
            alignItems={"flex-start"}
            w="100%"
            flexDirection="column"
            spacing={"3.2rem"}
            bg="var(--gray-100)"
            p="2.1rem 2.4rem"
            borderRadius={"0.8rem"}
            position={"relative"}
        >
            <WraperInfo
                title="Chọn khẩu phần"
                titleProps={{ fontSize: "2.4rem" }}
                isViewAll={false}
                contentProps={{ mt: "1.6rem" }}
            >
                <VStack alignItems={"flex-start"} w="100%" spacing={"1.6rem"}>
                    <HStack>
                        <Text fontSize={"1.6rem"} fontWeight={"500"} lineHeight={"2.4rem"} minW="12rem">
                            Ức gà
                        </Text>
                        <GroupRadioButton
                            isRounded
                            options={[
                                { name: "100g", value: "100" },
                                { name: "150g", value: "150" },
                                { name: "200g", value: "200" },
                            ]}
                            defaultValue={"100"}
                            onChange={function (_value: string): void {
                                //
                            }}
                        ></GroupRadioButton>
                    </HStack>
                    <HStack>
                        <Text fontSize={"1.6rem"} fontWeight={"500"} lineHeight={"2.4rem"} minW="12rem">
                            Gạo lứt
                        </Text>
                        <GroupRadioButton
                            isRounded
                            options={[
                                { name: "100g", value: "100" },
                                { name: "150g", value: "150" },
                                { name: "200g", value: "200" },
                            ]}
                            defaultValue={"100"}
                            onChange={function (_value: string): void {
                                //
                            }}
                        ></GroupRadioButton>
                    </HStack>
                    <HStack>
                        <Text fontSize={"1.6rem"} fontWeight={"500"} lineHeight={"2.4rem"} minW="12rem">
                            Bánh tart
                        </Text>
                        <GroupRadioButton
                            isRounded
                            options={[
                                { name: "Không", value: "0" },
                                { name: "1 cái", value: "1" },
                                { name: "2 cái", value: "2" },
                            ]}
                            defaultValue={"0"}
                            onChange={function (_value: string): void {
                                //
                            }}
                        ></GroupRadioButton>
                    </HStack>
                </VStack>
            </WraperInfo>

            <WraperInfo
                title="Điều chỉnh vị (Trước 9h sáng)"
                titleProps={{ fontSize: "2.4rem" }}
                isViewAll={false}
                contentProps={{ mt: "1.6rem" }}
            >
                <VStack alignItems={"flex-start"} w="100%" spacing={"1.6rem"}>
                    <HStack>
                        <Text
                            fontSize={"1.6rem"}
                            fontWeight={"500"}
                            lineHeight={"2.4rem"}
                            minW={{ lg: "12rem", base: "7rem" }}
                        >
                            Mặn
                        </Text>
                        <GroupRadioButton
                            isRounded
                            options={[
                                { name: "Không mặn", value: "0" },
                                { name: "Ít mặn", value: "1" },
                                { name: "Nguyên bản", value: "3" },
                                { name: "Mặn mà", value: "4" },
                            ]}
                            defaultValue={"100"}
                            onChange={function (_value: string): void {
                                //
                            }}
                        ></GroupRadioButton>
                    </HStack>
                    <HStack>
                        <Text
                            fontSize={"1.6rem"}
                            fontWeight={"500"}
                            lineHeight={"2.4rem"}
                            minW={{ lg: "12rem", base: "7rem" }}
                        >
                            Ngọt
                        </Text>
                        <GroupRadioButton
                            isRounded
                            options={[
                                { name: "Không ngọt", value: "0" },
                                { name: "Ít ngọt", value: "1" },
                                { name: "Nguyên bản", value: "3" },
                                { name: "Ngọt nhiều", value: "4" },
                            ]}
                            defaultValue={"100"}
                            onChange={function (_value: string): void {
                                //
                            }}
                        ></GroupRadioButton>
                    </HStack>
                    <HStack>
                        <Text
                            fontSize={"1.6rem"}
                            fontWeight={"500"}
                            lineHeight={"2.4rem"}
                            minW={{ lg: "12rem", base: "7rem" }}
                        >
                            Cay
                        </Text>
                        <GroupRadioButton
                            isRounded
                            options={[
                                { name: "Không cay", value: "0" },
                                { name: "Ít cay", value: "1" },
                                { name: "Nguyên bản", value: "3" },
                                { name: "Cay nhiều", value: "4" },
                            ]}
                            defaultValue={"0"}
                            onChange={function (_value: string): void {
                                //
                            }}
                        ></GroupRadioButton>
                    </HStack>
                </VStack>
            </WraperInfo>

            <WraperInfo
                title="Điều chỉnh khác"
                titleProps={{ fontSize: "2.4rem" }}
                isViewAll={false}
                contentProps={{ mt: "1.6rem" }}
            >
                <VStack alignItems={"flex-start"} spacing={"1.6rem"}>
                    <HStack spacing={"7.2rem"}>
                        <HStack minW="17rem" justifyContent={"space-between"}>
                            <Text variant={"toggle"}>Không hành</Text>
                            <Switch id="isCheckedw" variant={"green"} size="lg" />
                        </HStack>
                        <HStack minW="17rem" justifyContent={"space-between"}>
                            <Text variant={"toggle"}>Không tiêu</Text>
                            <Switch id="isCheckede" variant={"green"} size="lg" />
                        </HStack>
                    </HStack>
                    <HStack minW="17rem" justifyContent={"space-between"}>
                        <Text variant={"toggle"}>Không ớt thêm</Text>
                        <Switch id="isCheckedr" variant={"green"} size="lg"></Switch>
                    </HStack>
                </VStack>
            </WraperInfo>

            <WraperInfo
                title="Ghi chú"
                titleProps={{ fontSize: "2.4rem" }}
                isViewAll={false}
                contentProps={{ mt: "1.6rem" }}
            >
                <Textarea placeholder="Ví dụ: Dị ứng với đậu phộng " rows={5} p="1.2rem 1.4rem" bg="white" />
            </WraperInfo>
        </VStack>
    );
};
export default ServingSize;
