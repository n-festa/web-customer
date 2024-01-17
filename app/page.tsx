import Banner from "@/components/page-intro/banner";
import Today from "@/components/page-intro/today";
import { Flex } from "@chakra-ui/react";

export default function Home() {
    return (
        <Flex h="200vh" w="100%" flexDir="column">
            <Banner />
            <Today />
        </Flex>
    );
}
