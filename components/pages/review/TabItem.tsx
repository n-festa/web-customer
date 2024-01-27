import { Text } from "@chakra-ui/react";
interface TabItemProps {
    active?: Boolean;
    content?: string;
    onClick?: () => void;
}
const TabItem = ({ active, content, onClick }: TabItemProps) => {
    return (
        <Text
            color={active ? "var(--gray-700)" : "var(--gray-300)"}
            mb="-1px"
            borderBottom={`2px solid ${active ? "#00322A" : "transparent"} `}
            fontSize="1.6rem"
            fontWeight="600"
            p="0 0.4rem 1rem"
            cursor="pointer"
            onClick={onClick}
        >
            {content}
        </Text>
    );
};
export default TabItem;
