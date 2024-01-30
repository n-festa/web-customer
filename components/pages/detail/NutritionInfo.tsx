import { SKUsDto } from "@/types/response/GetListSKUsByIdResponse";
import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

interface Props {
    activeSKU?: SKUsDto;
}

const NutritionInfo = ({ activeSKU }: Props) => {
    return (
        <TableContainer w="100%">
            <Table variant="nutrition">
                <Thead>
                    <Tr>
                        <Th>Calories</Th>
                        <Th>Carb</Th>
                        <Th>Protein</Th>
                        <Th>Fat</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td>{activeSKU?.calorie_kcal}Kcal</Td>
                        <Td>{activeSKU?.carb_g}gr</Td>
                        <Td>{activeSKU?.protein_g}gr</Td>
                        <Td>{activeSKU?.fat_g}gr</Td>
                    </Tr>
                </Tbody>
            </Table>
        </TableContainer>
    );
};
export default NutritionInfo;
