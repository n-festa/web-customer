import textStyles from "@/theme/textStyle";
import { Center, Text } from "@chakra-ui/react";

const Empty = ({ message = "Không tìm thấy kết quả ..." }: { message?: string }) => {
    return (
        <Center minH="30rem">
            <Text {...textStyles.medium3}>{message}</Text>
        </Center>
    );
};

export default Empty;
