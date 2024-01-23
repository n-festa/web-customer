import { routes } from "@/utils/routes";
import { Box, Card, CardProps, Text } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

interface Props {
    name: String;
    categoryId: number;
    imageUrl: string;
}

const FoodCategoryCard = ({ categoryId, name, imageUrl, ...rest }: Props & CardProps) => {
    const router = useRouter();

    return (
        <Card
            border="0.5rem solid var(--primary-500)"
            borderRadius={"2.4rem"}
            w="27.3rem"
            h={"13.6rem"}
            overflow={"hidden"}
            position={"relative"}
            bgImage={imageUrl}
            backgroundPosition={"center"}
            backgroundSize={"cover"}
            cursor={"pointer"}
            onClick={() => {
                router.push(`${routes.SearchDetail}?categoryId=${categoryId}`);
            }}
            {...rest}
        >
            <Box position={"absolute"} left={"0"} bottom="10px" right="0">
                <Text
                    color="white"
                    fontSize={"2rem"}
                    textAlign={"center"}
                    fontWeight={"bold"}
                    textTransform={"uppercase"}
                    margin="0"
                >
                    {name}
                </Text>
            </Box>
        </Card>
    );
};

export default FoodCategoryCard;
