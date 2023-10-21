import {
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr
} from "@chakra-ui/react";

const MaxMinTab = ({ alternatives, setAlternatives }) => {

    const handleChangeUpperBound = (valueNumber, alternativeId) => {
        setAlternatives(pAlternatives => pAlternatives.map(alternative => {
            if (alternative.id === alternativeId)
                return {
                    ...alternative,
                    highest_position: valueNumber,
                }
            return alternative;
        }))
    }

    const handleChangeLowerBound = (valueNumber, alternativeId) => {
        setAlternatives(pAlternatives => pAlternatives.map(alternative => {
            if (alternative.id === alternativeId)
                return {
                    ...alternative,
                    lowest_position: valueNumber,
                }
            return alternative;
        }))
    }


    return (
        <>
            <TableContainer px={{ base: '0%', md: '4%', xl: '12%' }} pt={2}>
                <Table size={'sm'}>
                    <Thead>
                        <Tr>
                            <Th borderRightWidth={'1px'}>Alternative</Th>
                            <Th>Highest position</Th>
                            <Th>Lowest position</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {alternatives.map((alternative, index) => (
                            <Tr key={index}>
                                <Td borderRightWidth={'1px'}>
                                    <Text fontSize={'xl'}>{alternative.name}</Text>
                                </Td>
                                <Td>
                                    <NumberInput
                                        isInvalid={
                                            alternative.highest_position > alternative.lowest_position
                                            && alternative.highest_position !== null
                                            && alternative.lowest_position !== null
                                        }
                                        defaultValue={alternative.highest_position !== null ? alternative.highest_position : ""}
                                        min={1}
                                        max={alternatives.length}
                                        onBlur={(event) => handleChangeUpperBound(parseInt(event.target.value), alternative.id)}
                                    >
                                        <NumberInputField/>
                                        <NumberInputStepper>
                                            <NumberIncrementStepper/>
                                            <NumberDecrementStepper/>
                                        </NumberInputStepper>
                                    </NumberInput>
                                </Td>
                                <Td>
                                    <NumberInput
                                        isInvalid={
                                            alternative.highest_position > alternative.lowest_position
                                            && alternative.highest_position !== null
                                            && alternative.lowest_position !== null
                                        }
                                        defaultValue={alternative.lowest_position !== null ? alternative.lowest_position : ""}
                                        min={1}
                                        max={alternatives.length}
                                        onBlur={(event) => handleChangeLowerBound(parseInt(event.target.value), alternative.id)}
                                    >
                                        <NumberInputField/>
                                        <NumberInputStepper>
                                            <NumberIncrementStepper/>
                                            <NumberDecrementStepper/>
                                        </NumberInputStepper>
                                    </NumberInput>
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    )
}

export default MaxMinTab;