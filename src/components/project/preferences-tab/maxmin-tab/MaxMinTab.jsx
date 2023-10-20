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
import debounce from "lodash/debounce";

const MaxMinTab = ({ alternatives, setAlternatives }) => {

    const handleChangeUpperBound = debounce((valueNumber, alternativeId) => {
        setAlternatives(pAlternatives => pAlternatives.map(alternative => {
            if (alternative.id === alternativeId)
                return {
                    ...alternative,
                    highest_position: valueNumber,
                }
            return alternative;
        }))
    }, 50)

    const handleChangeLowerBound = debounce((valueNumber, alternativeId) => {
        setAlternatives(pAlternatives => pAlternatives.map(alternative => {
            if (alternative.id === alternativeId)
                return {
                    ...alternative,
                    lowest_position: valueNumber,
                }
            return alternative;
        }))
    }, 50)


    return (
        <>
            {JSON.stringify(alternatives.map(a => ({ name: a.name, h: a.highest_position, l: a.lowest_position })))}
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
                                        onChange={(_, valueNumber) => handleChangeUpperBound(valueNumber, alternative.id)}
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
                                        onChange={(_, valueNumber) => handleChangeLowerBound(valueNumber, alternative.id)}
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