import {
    Button,
    FormControl,
    HStack,
    IconButton,
    Input,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Show,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useColorModeValue
} from "@chakra-ui/react";
import CustomTooltip from "../CustomTooltip.jsx";
import { DeleteIcon, InfoIcon } from "@chakra-ui/icons";

const AlternativesTab = ({ alternatives, setAlternatives, criteria }) => {

    const colorMode = useColorModeValue('white', 'gray.800');

    const handleChangeName = (event, id) => {
        let newName = event.target.value;
        if (newName.length <= 64) {
            setAlternatives(pAlternatives => {
                return pAlternatives.map(alternative => {
                    if (alternative.id === id) {
                        return { ...alternative, name: newName };
                    }
                    return alternative;
                });
            });
        } else {
            // length of the alternative name is too long
            let alternative = alternatives.filter(alternative => alternative.id === id)[0];
            event.target.value = alternative.name;
        }
    }

    const handleChangePerformance = (valueNumber, alternativeId, criterionId) => {
        setAlternatives(pAlternatives => {
            return pAlternatives.map(alternative => {
                if (alternative.id === alternativeId) {
                    let newPerformances = alternative.performances.map(performance => {
                        if (performance.criterion === criterionId) {
                            return {
                                ...performance,
                                value: valueNumber,
                            }
                        }
                        return performance;
                    })
                    return {
                        ...alternative,
                        performances: newPerformances
                    }
                }
                return alternative;
            });
        });
    }

    const addAlternative = () => {
        // get max alternative id
        let maxId = Math.max(...alternatives.map(item => item.id));
        maxId = maxId === -Infinity ? 0 : maxId;

        setAlternatives(pAlternatives => [...pAlternatives,
            {
                id: maxId + 1,
                name: "Alternative name",
                reference_ranking: 0,
                performances: criteria.map(item => {
                    return {
                        value: 0,
                        criterion: item.id
                    }
                })
            }])
    }

    const deleteAlternative = (id) => {
        setAlternatives(pAlternatives => pAlternatives.filter(alt => alt.id !== id))
    }


    return (
        <>

            {/*DESKTOP*/}
            <Show above={'lg'}>
                <TableContainer pb={2}>
                    <Table style={{ borderCollapse: 'separate', borderSpacing: "0" }}>
                        <Thead>
                            <Tr>
                                <Th
                                    position={'sticky'}
                                    backgroundColor={useColorModeValue('white', 'gray.800')}
                                    left={0}
                                    borderRightWidth={'2px'}
                                >
                                    <HStack>
                                        <Text>Name</Text>
                                        <CustomTooltip label={"Alternative name"} openDelay={200}>
                                            <InfoIcon/>
                                        </CustomTooltip>
                                    </HStack>
                                </Th>
                                {criteria.map(criterion => {
                                    return (
                                        <>
                                            <Th>
                                                <HStack>
                                                    <Text color={criterion.gain ? 'teal.400' : 'red.300'}>{criterion.name}</Text>
                                                    <CustomTooltip label={criterion.gain ? "Gain" : "Cost"} openDelay={200}>
                                                        <InfoIcon/>
                                                    </CustomTooltip>
                                                </HStack>
                                            </Th>
                                        </>
                                    )
                                })}
                            </Tr>
                        </Thead>
                        <Tbody>
                            {alternatives
                                .sort((x, y) => (x.name > y.name) ? 1 : ((x.name < y.name) ? -1 : 0))
                                .map((alternative, index) => {
                                    return (
                                        <Tr>
                                            <Td
                                                position={'sticky'}
                                                backgroundColor={colorMode}
                                                left={0}
                                                borderRightWidth={'2px'}
                                                minW={'280px'}
                                                maxW={'280px'}
                                                zIndex={2}
                                            >
                                                <HStack>
                                                    <FormControl isInvalid={alternative.name.length === 0}>
                                                        <Input
                                                            value={alternative.name}
                                                            onChange={(event) => handleChangeName(event, alternative.id)}
                                                        />
                                                    </FormControl>

                                                    <IconButton
                                                        color={'red.300'}
                                                        aria-label={'delete-alternative'}
                                                        icon={<DeleteIcon/>}
                                                        onClick={() => deleteAlternative(alternative.id)}
                                                    />
                                                </HStack>
                                            </Td>
                                            {criteria.map(criterion => {
                                                const performance = alternative.performances.filter(p => p.criterion === criterion.id)[0]
                                                return (
                                                    <Td zIndex={1} minW={'175px'}>
                                                        <NumberInput
                                                            value={performance.value}
                                                            clampValueOnBlur={false}
                                                            onChange={(_, valueNumber) => handleChangePerformance(valueNumber, alternative.id, criterion.id)}
                                                        >
                                                            <NumberInputField/>
                                                            <NumberInputStepper>
                                                                <NumberIncrementStepper/>
                                                                <NumberDecrementStepper/>
                                                            </NumberInputStepper>
                                                        </NumberInput>
                                                    </Td>
                                                )
                                            })}
                                        </Tr>
                                    )
                                })}
                        </Tbody>
                    </Table>

                    <Button
                        my={4}
                        colorScheme={'teal'}
                        onClick={addAlternative}
                        variant='outline'
                        position={'sticky'}
                        left={6}
                    >
                        New alternative
                    </Button>
                </TableContainer>

            </Show>

            {/*MOBILE*/}
            <Show below={'991px'}>

            </Show>


        </>

    )
}

export default AlternativesTab;