import { Button, IconButton, Select, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import * as c from "./../../../../../config.js";

const PairwiseComparisonsDesktop = ({
                                        alternatives,
                                        categories,
                                        currentCategoryId,
                                        setCategories,
                                        addPairwiseComparison,
                                        deletePairwiseComparison
                                    }) => {

    const handleChangeAlternative = (comparisonId, alternativeNumber, alternativeId) => {
        setCategories(categories.map(category => {
            if (category.id === currentCategoryId)
                return {
                    ...category,
                    pairwise_comparisons: category.pairwise_comparisons.map(pc => {
                        if (pc.id === comparisonId)
                            return { ...pc, [`alternative_${alternativeNumber}`]: alternativeId };
                        return pc;
                    })
                }
            return category
        }))
    }

    const handleChangeType = (comparisonId, newType) => {
        setCategories(categories.map(category => {
            if (category.id === currentCategoryId)
                return {
                    ...category,
                    pairwise_comparisons: category.pairwise_comparisons.map(pc => {
                        if (pc.id === comparisonId)
                            return { ...pc, type: newType };
                        return pc;
                    })
                }
            return category
        }))
    }

    return (
        <TableContainer px={{ base: '0%', md: '4%', xl: '10%', '2xl': '20%' }} pt={4}>
            <Table size={'sm'}>
                <Thead>
                    <Tr>
                        <Th>Alternative A</Th>
                        <Th>Type</Th>
                        <Th>Alternative B</Th>
                        <Th/>
                    </Tr>
                </Thead>
                <Tbody>
                    <>
                        {categories
                            .find(c => c.id === currentCategoryId)
                            ?.pairwise_comparisons
                            .map((pairwiseComparison, index) => (
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
                                            <>
                                                {Object.entries(c.Preferences.Comparisons.PairwiseComparisons.types).map(([type, preference]) => (
                                                    <option
                                                        value={preference}
                                                        key={type}
                                                    >
                                                        {preference}
                                                    </option>
                                                ))
                                                }
                                            </>
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
                            ))
                        }
                    </>
                </Tbody>
            </Table>

            <Button mx={4} my={4} colorScheme={'teal'} onClick={addPairwiseComparison} variant='outline'>
                New comparison
            </Button>
        </TableContainer>
    )
}


export default PairwiseComparisonsDesktop;