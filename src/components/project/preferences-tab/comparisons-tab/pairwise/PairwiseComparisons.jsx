import { useState } from "react";
import {
    Button,
    IconButton,
    Select,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useToast
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

const PairwiseComparisons = ({ alternatives, setAlternatives }) => {

    const toast = useToast();
    const toastId = "toast-project-pairwise-comparisons-add"

    const [pairwiseComparisons, setPairwiseComparisons] = useState([
        {
            id: 1,
            alternative_1: 165,
            alternative_2: 168,
            type: 'preference'
        }
    ]);

    const addPairwiseComparison = () => {
        if (alternatives.length === 0) {
            if (!toast.isActive(toastId)) {
                toast({
                    id: toastId,
                    title: 'Warning!',
                    description: "You need to add alternatives first.",
                    status: 'warning',
                    duration: 6000,
                    isClosable: true,
                })
            }
            return;
        }

        // get max pairwise comparison id
        let maxId = Math.max(...pairwiseComparisons.map(item => item.id));
        maxId = maxId === -Infinity ? 0 : maxId;
        // get first alternative
        // we can be sure that there is at least one alternative because of the if statement at the beginning of the function
        let firstAltId = alternatives[0].id

        setPairwiseComparisons(pPairwiseComparisons => [...pPairwiseComparisons, {
            id: maxId,
            alternatives_1: firstAltId,
            alternative_2: firstAltId,
            type: 'preference'
        }])
    }


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

                <Button mx={4} my={4} colorScheme={'teal'} onClick={addPairwiseComparison} variant='outline'>
                    New comparison
                </Button>
            </TableContainer>

        </>
    )


}

export default PairwiseComparisons;