import Banner from "@/components/page-intro/banner";
import Today from "@/components/page-intro/today";
import { Flex } from "@chakra-ui/react";
import "../assets/css/bootstrap.min.css";
import "../assets/css/global.css";
import "../assets/css/style.css";

export default function Home() {
    return (
        <Flex h="200vh" w="100%" flexDir="column">
            <Banner />
            <Today />
        </Flex>
    );
}
