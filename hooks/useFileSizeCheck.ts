import { useToast } from "@chakra-ui/react";

interface CheckFileSizeParams {
    file: File;
    title: string;
    description: string;
    maxSize: number;
}

const useFileSizeCheck = () => {
    const toast = useToast();

    const checkHasFileSize = ({ file, title, description, maxSize }: CheckFileSizeParams) => {
        if (!file) return true;
        const fileSizeInKB = file?.size / 1024;
        if (fileSizeInKB >= maxSize) {
            toast({
                title: title,
                description: description,
                status: "error",
                duration: 3000,
                isClosable: true,
                position: "top-right",
            });
            return true;
        }
        return false;
    };

    return { checkHasFileSize };
};

export default useFileSizeCheck;
