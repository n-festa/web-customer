import { Box, Card, CardProps, Text } from "@chakra-ui/react";

interface Props {
    name: String;
}

const FoodCategoryCard = ({ name, ...rest }: Props & CardProps) => {
    return (
        <Card
            border="0.5rem solid var(--primary-500)"
            borderRadius={"2.4rem"}
            w="27.3rem"
            h={"13.6rem"}
            overflow={"hidden"}
            position={"relative"}
            bgImage={"/images/food-category.png"}
            backgroundPosition={"center"}
            backgroundSize={"cover"}
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
