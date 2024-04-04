import { routes } from "@/utils/routes";
import { Box, Card, CardProps, Center, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

interface Props {
    name: String;
    categoryId: number;
    imageUrl: string;
}

const FoodCategoryCard = ({ categoryId, name, imageUrl, ...rest }: Props & CardProps) => {
    const router = useRouter();

    return (
        <Center w="100%">
            <Card
                border="0.5rem solid var(--primary-500)"
                borderRadius={"2.4rem"}
                w={{ base: "21rem", md: "25rem", xmd: "23rem", xxmd: "25rem", lg: "27.3rem" }}
                h={{ base: "12rem", md: "13.6rem" }}
                overflow={"hidden"}
                position={"relative"}
                bgImage={`linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.55)), url("${imageUrl}")`}
                backgroundPosition={"center"}
                backgroundSize={"cover"}
                cursor={"pointer"}
                onClick={() => {
                    router.push(`${routes.SearchDetail}?categoryId=${categoryId}&name=${name}`);
                }}
                {...rest}
            >
                <Box position={"absolute"} left={"0"} bottom="10px" right="0">
                    <Text
                        color="white"
                        fontSize={"2rem"}
                        textAlign={"center"}
                        fontWeight={"600"}
                        textTransform={"uppercase"}
                        margin="0"
                    >
                        {name}
                    </Text>
                </Box>
            </Card>
        </Center>
    );
};

export default FoodCategoryCard;
