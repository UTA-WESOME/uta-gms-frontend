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

const BestWorstTabDesktop = ({ alternatives, setAlternatives }) => {

    const handleChangeUpperBound = (valueNumber, alternativeId) => {
        setAlternatives(pAlternatives => pAlternatives.map(alternative => {
            if (alternative.id === alternativeId)
                return {
                    ...alternative,
                    best_position: valueNumber,
                }
            return alternative;
        }))
    }

    const handleChangeLowerBound = (valueNumber, alternativeId) => {
        setAlternatives(pAlternatives => pAlternatives.map(alternative => {
            if (alternative.id === alternativeId)
                return {
                    ...alternative,
                    worst_position: valueNumber,
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
                            <Th>Best position</Th>
                            <Th>Worst position</Th>
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
                                            alternative.best_position > alternative.worst_position
                                            && alternative.best_position !== null
                                            && alternative.worst_position !== null
                                        }
                                        defaultValue={alternative.best_position !== null ? alternative.best_position : ""}
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
                                            alternative.best_position > alternative.worst_position
                                            && alternative.best_position !== null
                                            && alternative.worst_position !== null
                                        }
                                        defaultValue={alternative.worst_position !== null ? alternative.worst_position : ""}
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

export default BestWorstTabDesktop;