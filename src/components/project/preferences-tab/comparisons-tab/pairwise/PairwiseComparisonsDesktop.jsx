import { Button, IconButton, Select, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

const PairwiseComparisonsDesktop = ({
                                        alternatives,
                                        pairwiseComparisons,
                                        setPairwiseComparisons,
                                        addPairwiseComparison,
                                        deletePairwiseComparison
                                    }) => {

    const handleChangeAlternative = (comparisonId, alternativeNumber, alternativeId) => {
        setPairwiseComparisons(pPairwiseComparisons => {
            return pPairwiseComparisons.map(pc => {
                if (pc.id === comparisonId) {
                    return { ...pc, [`alternative_${alternativeNumber}`]: alternativeId };
                }
                return pc;
            })
        })
    }

    const handleChangeType = (comparisonId, newType) => {
        setPairwiseComparisons(pPairwiseComparisons => {
            return pPairwiseComparisons.map(pc => {
                if (pc.id === comparisonId) {
                    return { ...pc, type: newType };
                }
                return pc;
            })
        })
    }

    return (
        <TableContainer px={{ base: '0%', md: '4%', xl: '10%', '2xl': '20%' }} pt={4}>
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
                                    value={pairwiseComparison.alternative_1}
                                    onChange={(event) =>
                                        handleChangeAlternative(pairwiseComparison.id, 1, parseInt(event.target.value))}
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
                                    value={pairwiseComparison.type}
                                    onChange={(event) => handleChangeType(pairwiseComparison.id, event.target.value)}
                                >
                                    <option value={'preference'} key={'preference'}>&gt;</option>
                                    <option value={'indifference'} key={'indifference'}>=</option>
                                </Select>
                            </Td>
                            <Td>
                                <Select
                                    value={pairwiseComparison.alternative_2}
                                    onChange={(event) =>
                                        handleChangeAlternative(pairwiseComparison.id, 2, parseInt(event.target.value))}
                                >
                                    {alternatives.map(alternative => (
                                        <option value={alternative.id} key={alternative.id}>
                                            {alternative.name}
                                        </option>
                                    ))}
                                </Select>
                            </Td>
                            <Td textAlign={'center'} maxWidth={'45px'} minWidth={'45px'}>
                                <IconButton
                                    color={'red.300'}
                                    aria-label={'delete-preference-intensity'}
                                    icon={<DeleteIcon/>}
                                    onClick={() => deletePairwiseComparison(pairwiseComparison.id)}
                                />
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>

            <Button mx={4} my={4} colorScheme={'teal'} onClick={addPairwiseComparison} variant='outline'>
                New comparison
            </Button>
        </TableContainer>
    )
}

export default PairwiseComparisonsDesktop;