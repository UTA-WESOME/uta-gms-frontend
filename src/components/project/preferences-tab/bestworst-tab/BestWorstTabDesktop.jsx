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

const BestWorstTabDesktop = ({ alternatives, currentCategoryId, categories, setCategories }) => {

    const handleChangeUpperBound = (valueNumber, alternativeId) => {
        setCategories(categories.map(category => {
            if(category.id === currentCategoryId) {
                return {
                    ...category,
                    rankings: category.rankings.map(ranking => {
                        if (ranking.alternative === alternativeId)
                            return {
                                ...ranking,
                                best_position: valueNumber
                            };
                        return ranking;
                    })
                }
            }
            return category;
        }))
    }

    const handleChangeLowerBound = (valueNumber, alternativeId) => {
        setCategories(categories.map(category => {
            if(category.id === currentCategoryId) {
                return {
                    ...category,
                    rankings: category.rankings.map(ranking => {
                        if (ranking.alternative === alternativeId)
                            return {
                                ...ranking,
                                worst_position: valueNumber
                            };
                        return ranking;
                    })
                }
            }
            return category;
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
                        {categories
                            .find(c => c.id === currentCategoryId)
                            ?.rankings
                            .sort((x, y) => x.alternative > y.alternative ? 1 : x.alternative < y.alternative ? -1 : 0)
                            .map((ranking, index) => (
                            <Tr key={index}>
                                <Td borderRightWidth={'1px'}>
                                    <Text fontSize={'xl'}>{alternatives.find(a => a.id === ranking.alternative).name}</Text>
                                </Td>
                                <Td>
                                    <NumberInput
                                        key={`${currentCategoryId}-${ranking.alternative}-b`}
                                        isInvalid={
                                            ranking.best_position > ranking.worst_position
                                            && ranking.best_position !== null
                                            && ranking.worst_position !== null
                                        }
                                        defaultValue={ranking.best_position !== null ? ranking.best_position : ""}
                                        min={1}
                                        max={alternatives.length}
                                        onBlur={(event) => handleChangeUpperBound(parseInt(event.target.value), ranking.alternative)}
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
                                        key={`${currentCategoryId}-${ranking.alternative}-w`}
                                        isInvalid={
                                            ranking.best_position > ranking.worst_position
                                            && ranking.best_position !== null
                                            && ranking.worst_position !== null
                                        }
                                        defaultValue={ranking.worst_position !== null ? ranking.worst_position : ""}
                                        min={1}
                                        max={alternatives.length}
                                        onBlur={(event) => handleChangeLowerBound(parseInt(event.target.value), ranking.alternative)}
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