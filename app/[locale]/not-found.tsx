"use client";
import { Center, Text, VStack } from "@chakra-ui/react";
import { ConstructionIcon } from "lucide-react";

const NotFound = () => {
    return (
        <Center h="100%" w="100%">
            <VStack mt="3rem">
                <ConstructionIcon width="5rem" height="5rem" />
                <Text fontSize="2rem" fontWeight={"bold"}>
                    404 Not Found
                </Text>
            </VStack>
        </Center>
    );
};

export default NotFound;
