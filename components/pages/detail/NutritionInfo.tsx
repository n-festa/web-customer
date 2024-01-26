import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

const NutritionInfo = () => {
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
                        <Td>366 Kcal</Td>
                        <Td>16gr</Td>
                        <Td>4gr</Td>
                        <Td>2.7gr</Td>
                    </Tr>
                </Tbody>
            </Table>
        </TableContainer>
    );
};
export default NutritionInfo;
