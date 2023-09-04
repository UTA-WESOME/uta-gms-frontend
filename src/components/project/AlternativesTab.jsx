import {
    Button,
    ButtonGroup,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    HStack,
    IconButton,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Show,
    Spacer,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useColorModeValue,
    useDisclosure,
    VStack
} from "@chakra-ui/react";
import CustomTooltip from "../CustomTooltip.jsx";
import { DeleteIcon, EditIcon, InfoIcon } from "@chakra-ui/icons";
import * as Yup from 'yup';
import { FieldArray, FormikProvider, getIn, useFormik } from "formik";

const AlternativesTab = ({ alternatives, setAlternatives, criteria }) => {

    const colorMode = useColorModeValue('white', 'gray.800');

    // -------------------------------------------------------------------------------------------------------------- //
    // DESKTOP
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
                ranking: 0,
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

    // -------------------------------------------------------------------------------------------------------------- //
    // MOBILE
    const { isOpen, onOpen, onClose } = useDisclosure();

    const formik = useFormik({
        initialValues: {
            id: 0,
            name: "Alternative 0",
            performances: [{ value: 0, criterion: 0 }]
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Alternative name is required!")
                .max(64, "Alternative name too long!"),
            performances: Yup.array().of(
                Yup.object().shape({
                    value: Yup.number().required("Value required!"),
                    criterion: Yup.number().required("Criterion required!")
                })
            )
        }),
        onSubmit: (values, actions) => {
            setAlternatives(pAlternatives => {
                return pAlternatives.map(alternative => {
                    if (alternative.id === values.id) {
                        return {
                            ...alternative,
                            name: values.name,
                            performances: values.performances
                        }
                    }
                    return alternative
                })
            })
            // close modal
            onClose();
        }
    });

    const handleChangePerformanceMobile = (change, index) => {
        let newValue = (formik.values.performances[index].value === "" ? 0 : formik.values.performances[index].value) + change;
        formik.setFieldValue(`performances[${index}].value`, newValue);
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
                                                    <Text color={criterion.gain ? 'teal.400' : 'red.300'}>
                                                        {criterion.name}
                                                    </Text>
                                                    <CustomTooltip
                                                        label={criterion.gain ? "Gain" : "Cost"}
                                                        openDelay={200}
                                                    >
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
                <Flex
                    direction={'column'}
                    spacing={4}
                >
                    {alternatives.map((alternative, index) => {
                        return (
                            <HStack
                                borderTopWidth={'1px'}
                                borderBottomWidth={index === alternatives.length - 1 ? '1px' : '0px'}
                                p={2}
                            >
                                <Text isTruncated>{alternative.name}</Text>
                                <Spacer/>
                                <IconButton
                                    aria-label={'edit-alternative'}
                                    icon={<EditIcon/>}
                                    onClick={() => {
                                        formik.values.id = alternative.id;
                                        formik.values.name = alternative.name;
                                        formik.values.performances = alternative.performances;
                                        onOpen();
                                    }}
                                />
                                <IconButton
                                    color={'red.300'}
                                    aria-label={'delete-alternative'}
                                    icon={<DeleteIcon/>}
                                    onClick={() => deleteAlternative(alternative.id)}
                                />
                            </HStack>
                        )
                    })}
                </Flex>

                <Button
                    my={4}
                    colorScheme={'teal'}
                    onClick={addAlternative}
                    variant='outline'
                >
                    New alternative
                </Button>
            </Show>

            <Modal isOpen={isOpen} onClose={onClose} isCentered scrollBehavior={'inside'}>
                <ModalOverlay/>
                <FormikProvider value={formik}>
                    <ModalContent
                        mx={'15px'}
                        as={'form'}
                        onSubmit={formik.handleSubmit}
                    >
                        <ModalHeader>Edit alternative</ModalHeader>
                        <ModalCloseButton/>
                        <FormControl
                            isInvalid={formik.errors.name && formik.touched.name}
                            px={6}
                            py={2}
                        >
                            <FormLabel fontSize={'sm'}>Name</FormLabel>
                            <Input
                                name={"name"}
                                autoComplete={"off"}
                                {...formik.getFieldProps("name")}
                            />
                            <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
                        </FormControl>

                        <ModalBody
                            textAlign={'center'}
                            borderBottomWidth={'1px'}
                            borderTopWidth={'1px'}
                        >
                            <VStack spacing={"15px"}>
                                <FieldArray
                                    name={'performances'}
                                    render={() => (
                                        <>
                                            {(formik.values.performances.map((performance, index) => {
                                                const criterion = criteria.filter(c => c.id === formik.values.performances[index].criterion)[0];
                                                return (
                                                    <>
                                                        <FormControl
                                                            isInvalid={getIn(formik.errors, `performances[${index}].value`)
                                                                && getIn(formik.touched, `performances[${index}].value`)}>
                                                            <FormLabel fontSize={'sm'}>
                                                                <Text
                                                                    color={criterion.gain ? 'teal.400' : 'red.300'}>
                                                                    {criterion.name}
                                                                </Text>
                                                            </FormLabel>
                                                            <HStack>
                                                                <Button
                                                                    onClick={() => handleChangePerformanceMobile(1, index)}
                                                                >+</Button>
                                                                <Input
                                                                    id={`input_performance_${index}`}
                                                                    name={`performance_${index}`}
                                                                    type={'number'}
                                                                    {...formik.getFieldProps(`performances[${index}].value`)}
                                                                />
                                                                <Button
                                                                    onClick={() => handleChangePerformanceMobile(-1, index)}
                                                                >-</Button>
                                                            </HStack>
                                                            <FormErrorMessage>
                                                                {getIn(formik.errors, `performances[${index}].value`)}
                                                            </FormErrorMessage>
                                                        </FormControl>
                                                    </>
                                                )
                                            }))}
                                        </>
                                    )}
                                />
                            </VStack>
                        </ModalBody>

                        <ModalFooter>
                            <ButtonGroup pt={"1rem"}>
                                <Button colorScheme={"teal"} type={"submit"}>Confirm</Button>
                                <Button onClick={onClose}>Back</Button>
                            </ButtonGroup>
                        </ModalFooter>
                    </ModalContent>

                </FormikProvider>

            </Modal>
        </>

    )
}

export default AlternativesTab;