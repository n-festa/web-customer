import Banner from "@/components/pages/landing-page/banner";
import Contact from "@/components/pages/landing-page/contact";
import Download from "@/components/pages/landing-page/download";
import OrderStep from "@/components/pages/landing-page/order-step";
import Testimonial from "@/components/pages/landing-page/testimonial";
import Today from "@/components/pages/landing-page/today";
import WhyChoose from "@/components/pages/landing-page/why-choose";
import { Flex } from "@chakra-ui/react";

export default function Home() {
    return (
        <Flex scrollMarginTop="8rem" w="100%" flexDir="column">
            <Banner />
            <Today />
            <OrderStep />
            <WhyChoose />
            <Testimonial />
            <Contact />
            <Download />
        </Flex>
    );
}
