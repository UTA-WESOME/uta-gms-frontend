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
    Switch,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr
} from "@chakra-ui/react";
import CustomTooltip from "../../CustomTooltip.jsx";
import { DeleteIcon, InfoIcon } from "@chakra-ui/icons";
import { BiSolidFileImport, } from "react-icons/bi";
import debounce from 'lodash/debounce';

const CriteriaTabDesktop = ({ criteria, setCriteria, addCriterion, deleteCriterion }) => {

    const handleChangeType = (event, id) => {
        setCriteria(previousCriteria => {
            return previousCriteria.map(criterion => {
                if (criterion.id === id) {
                    return { ...criterion, gain: !criterion.gain };
                }
                return criterion;
            });
        });
    }

    const handleChangeName = debounce((event, id) => {
        let newName = event.target.value;
        if (newName.length <= 64) {
            setCriteria(previousCriteria => previousCriteria.map(criterion => {
                if (criterion.id === id) {
                    return { ...criterion, name: newName };
                }
                return criterion;
            }));
        } else {
            // length of the criterion name is too long, might need a refactor in the future
            // maybe some kind of message to the user about this problem
            let criterion = criteria.filter(criterion => criterion.id === id)[0];
            event.target.value = criterion.name;
        }
    }, 50);

    const handleChangeLinearSegments = (valueNumber, id) => {
        setCriteria(previousCriteria => {
            return previousCriteria.map(criterion => {
                if (criterion.id === id) {
                    return { ...criterion, linear_segments: valueNumber };
                }
                return criterion;
            });
        });
    }

    const handleChangeWeight = (valueNumber, id) => {
        setCriteria(previousCriteria => {
            return previousCriteria.map(criterion => {
                if (criterion.id === id) {
                    return { ...criterion, weight: valueNumber };
                }
                return criterion;
            })
        })
    }


    return (
        <>
            <TableContainer>
                <Table size={'sm'}>
                    <Thead>
                        <Tr>
                            <Th>
                                <HStack>
                                    <Text>Name</Text>
                                    <CustomTooltip label={"Criterion name"} openDelay={200}>
                                        <InfoIcon />
                                    </CustomTooltip>
                                </HStack>
                            </Th>
                            <Th>
                                <HStack>
                                    <Text>Type</Text>
                                    <CustomTooltip
                                        label={"Gain means that high values of a given alternative on this criterion will result in a higher position of the alternative in the final ranking. Loss means that low values of an alternative on this criterion will result in a higher position of the alternative in the final ranking."}
                                        openDelay={200}>
                                        <InfoIcon />
                                    </CustomTooltip>
                                </HStack>
                            </Th>
                            <Th>
                                <HStack>
                                    <Text>Linear segments</Text>
                                    <CustomTooltip
                                        label={"Choose how many linear segments the criterion should have. To select the general function, choose 0."}
                                        openDelay={200}>
                                        <InfoIcon />
                                    </CustomTooltip>
                                </HStack>
                            </Th>
                            <Th>
                                <HStack>
                                    <Text>Weight</Text>
                                    <CustomTooltip
                                        label={"Choose the weight of the criterion."}
                                        openDelay={200}>
                                        <InfoIcon/>
                                    </CustomTooltip>
                                </HStack>
                            </Th>
                            <Th/>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {criteria.map((criterion, index) => {
                            return (
                                <Tr key={index}>
                                    <Td>
                                        <FormControl isInvalid={criterion.name.length === 0}>
                                            <Input
                                                key={criterion.id}
                                                defaultValue={criterion.name}
                                                onChange={(event) => handleChangeName(event, criterion.id)}
                                            />
                                        </FormControl>
                                    </Td>
                                    <Td>
                                        <HStack>
                                            <Text color={criterion.gain ? 'gray' : 'red.300'}>
                                                Cost
                                            </Text>
                                            <Switch
                                                colorschemechecked={'teal'}
                                                colorschemeunchecked={'red'}
                                                defaultChecked={criterion.gain}
                                                onChange={(event) => handleChangeType(event, criterion.id)}
                                            />
                                            <Text color={criterion.gain ? 'teal.300' : 'gray'}>
                                                Gain
                                            </Text>
                                        </HStack>
                                    </Td>
                                    <Td>
                                        <NumberInput
                                            isInvalid={isNaN(criterion.linear_segments)}
                                            value={criterion.linear_segments}
                                            min={0}
                                            max={30}
                                            precision={0}
                                            onChange={(_, valueNumber) => handleChangeLinearSegments(valueNumber, criterion.id)}
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
                                            isInvalid={isNaN(criterion.weight)}
                                            value={criterion.weight}
                                            min={0}
                                            step={criterion.weight >= 1.0 ? 1 : 0.05}
                                            onChange={(_, valueNumber) => handleChangeWeight(valueNumber, criterion.id)}
                                        >
                                            <NumberInputField />
                                            <NumberInputStepper>
                                                <NumberIncrementStepper />
                                                <NumberDecrementStepper />
                                            </NumberInputStepper>
                                        </NumberInput>
                                    </Td>
                                    <Td textAlign={'right'}>
                                        <IconButton
                                            color={'red.300'}
                                            aria-label={'delete-criterion'}
                                            icon={<DeleteIcon />}
                                            onClick={() => deleteCriterion(criterion.id)}
                                        />
                                    </Td>
                                </Tr>
                            )
                        })}
                    </Tbody>
                </Table>
            </TableContainer>

            <Button mx={6} my={4} colorScheme={'teal'} onClick={addCriterion} variant='outline'>
                New criterion
            </Button>
        </>
    )
}

export default CriteriaTabDesktop;