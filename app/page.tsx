import Banner from "@/components/page-intro/banner";
import { Flex } from "@chakra-ui/react";

export default function Home() {
    return (
        <Flex flexDir="column">
            <Banner />
        </Flex>
    );
}
