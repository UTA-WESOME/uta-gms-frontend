import {
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
import CustomTooltip from "../../utils/CustomTooltip.jsx";
import { DeleteIcon, InfoIcon } from "@chakra-ui/icons";
import * as c from "./../../../config.js";

const CriteriaTabDesktop = ({
                                criteria,
                                setCriteria,
                                deleteCriterion
                            }) => {

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

    const handleChangeName = (event, id) => {
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
    }

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
                                        <InfoIcon/>
                                    </CustomTooltip>
                                </HStack>
                            </Th>
                            <Th>
                                <HStack>
                                    <Text>Type</Text>
                                    <CustomTooltip
                                        label={c.descriptionCriterionType}
                                        openDelay={200}>
                                        <InfoIcon/>
                                    </CustomTooltip>
                                </HStack>
                            </Th>
                            <Th>
                                <HStack>
                                    <Text>Linear segments</Text>
                                    <CustomTooltip
                                        label={c.descriptionCriterionLinearSegments}
                                        openDelay={200}>
                                        <InfoIcon/>
                                    </CustomTooltip>
                                </HStack>
                            </Th>
                            <Th>
                                Actions
                            </Th>
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
                                                onBlur={(event) => handleChangeName(event, criterion.id)}
                                            />
                                        </FormControl>
                                    </Td>
                                    <Td>
                                        <HStack>
                                            <Text color={criterion.gain ? 'gray' : 'red.300'}>
                                                Cost
                                            </Text>
                                            <Switch
                                                key={criterion.id}
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
                                            key={criterion.id}
                                            isInvalid={isNaN(criterion.linear_segments)}
                                            defaultValue={criterion.linear_segments}
                                            min={0}
                                            max={30}
                                            precision={0}
                                            onBlur={(event) => handleChangeLinearSegments(parseInt(event.target.value), criterion.id)}
                                        >
                                            <NumberInputField/>
                                            <NumberInputStepper>
                                                <NumberIncrementStepper/>
                                                <NumberDecrementStepper/>
                                            </NumberInputStepper>
                                        </NumberInput>
                                    </Td>
                                    <Td>
                                        <IconButton
                                            color={'red.300'}
                                            aria-label={'delete-criterion'}
                                            icon={<DeleteIcon/>}
                                            onClick={() => deleteCriterion(criterion.id)}
                                        />
                                    </Td>
                                </Tr>
                            )
                        })}
                    </Tbody>
                </Table>
            </TableContainer>
        </>
    )
}

export default CriteriaTabDesktop;