import { useState } from "react";
import { IconButton, Select, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

const PairwiseComparisons = ({ alternatives, setAlternatives }) => {

    const [pairwiseComparisons, setPairwiseComparisons] = useState([
        {
            id: 1,
            alternative_1: 165,
            alternative_2: 168,
            type: 'preference'
        }
    ]);

    return (
        <>
            <TableContainer px={{ base: '0%', sm: '1%', md: '20%' }} pt={2}>
                <Table size={'sm'}>
                    <Thead>
                        <Tr>
                            <>
                                <Th>
                                    <Text>Alternative A</Text>
                                </Th>
                                <Th>
                                    <Text>Type</Text>
                                </Th>
                                <Th>
                                    <Text>Alternative B</Text>
                                </Th>
                                <Th/>
                            </>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {pairwiseComparisons.map((pairwiseComparison, index) => (
                            <Tr key={index}>
                                <Td>
                                    <Select
                                        value={pairwiseComparisons[`alternative_1`]}
                                    >
                                        {alternatives.map(alternative => (
                                            <option value={alternative.id} key={alternative.id}>
                                                {alternative.name}
                                            </option>
                                        ))}
                                    </Select>
                                </Td>
                                <Td>
                                    <Select
                                        value={pairwiseComparisons[`type`]}

                                    >
                                        <option key={'preference'}>&gt;</option>
                                        <option key={'indifference'}>=</option>
                                    </Select>
                                </Td>
                                <Td>
                                    <Select
                                        value={pairwiseComparisons[`alternative_1`]}
                                    >
                                        {alternatives.map(alternative => (
                                            <option value={alternative.id} key={alternative.id}>
                                                {alternative.name}
                                            </option>
                                        ))}
                                    </Select>
                                </Td>
                                <Td textAlign={'right'}>
                                    <IconButton
                                        color={'red.300'}
                                        aria-label={'delete-preference-intensity'}
                                        icon={<DeleteIcon/>}
                                        // onClick={() => deletePreferenceIntensity(preferenceIntensity.id)}
                                    />
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    )


}

export default PairwiseComparisons;