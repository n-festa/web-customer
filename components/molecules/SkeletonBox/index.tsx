import { Box, BoxProps, SkeletonCircle, SkeletonProps, SkeletonText, SkeletonTextProps } from "@chakra-ui/react";

const SkeletonBox = ({
    isLoaded,
    skeletonCirle,
    skeletonText,
    ...props
}: {
    isLoaded: boolean;
    skeletonCirle?: SkeletonProps;
    skeletonText?: SkeletonTextProps;
} & BoxProps) => {
    return (
        <Box w="100%" h="100%" {...props}>
            <SkeletonCircle size="10" isLoaded={isLoaded} {...skeletonCirle} />
            <SkeletonText mt="4" noOfLines={4} spacing="4" skeletonHeight="5" isLoaded={isLoaded} {...skeletonText} />
        </Box>
    );
};

export default SkeletonBox;
