import { Center, Text, VStack } from "@chakra-ui/react";
import { ConstructionIcon } from "lucide-react";

const NotFound = () => {
    return (
        <Center w="100%">
            <VStack>
                <ConstructionIcon width="5rem" height="5rem" />
                <Text fontSize="2rem" fontWeight={"bold"}>
                    Trang không tồn tại
                </Text>
            </VStack>
        </Center>
    );
};

export default NotFound;
