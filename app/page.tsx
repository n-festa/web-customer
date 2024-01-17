import Banner from "@/components/page-intro/banner";
import OrderStep from "@/components/page-intro/order-step";
import Today from "@/components/page-intro/today";
import WhyChoose from "@/components/page-intro/why-choose";
import { Flex } from "@chakra-ui/react";

export default function Home() {
    return (
        <Flex w="100%" flexDir="column">
            <Banner />
            <Today />
            <OrderStep />
            <WhyChoose />
        </Flex>
    );
}
