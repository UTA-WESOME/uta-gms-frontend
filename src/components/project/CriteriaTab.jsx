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
    Popover,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverTrigger,
    Show,
    Spacer,
    Switch,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    useDisclosure,
    VStack
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { DeleteIcon, EditIcon, InfoIcon } from "@chakra-ui/icons";
import CustomTooltip from "../CustomTooltip.jsx";


const CriteriaTab = ({ criteria, setCriteria, setAlternatives }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    const formik = useFormik({
        initialValues: { id: 0, name: "", gain: false, linear_segments: 0 },
        validationSchema: Yup.object({
            name: Yup.string().required("Criterion name is required!")
                .max(64, "Criterion name too long!"),
            linear_segments: Yup.number()
                .max(30, "The criterion is limited to a maximum of 30 linear segments!")
                .min(0, "The criterion must have a minimum of 0 linear segments!")
                .integer("The count of linear segments must be a whole number!")
        }),
        onSubmit: (values, actions) => {
            // update criterion
            setCriteria(previousCriteria => {
                return previousCriteria.map(criterion => {
                    if (criterion.id === values.id) {
                        return {
                            ...criterion,
                            id: values.id,
                            name: values.name,
                            gain: values.gain,
                            linear_segments: values.linear_segments,
                        };
                    }
                    return criterion;
                });
            });
            // close modal
            onClose();
        }
    });


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
            setCriteria(previousCriteria => {
                return previousCriteria.map(criterion => {
                    if (criterion.id === id) {
                        return { ...criterion, name: newName };
                    }
                    return criterion;
                });
            });
        } else {
            // length of the criterion name is too long, might need a refactor in the future
            // maybe some kind of message to the user about this problem
            let criterion = criteria.filter(criterion => criterion.id === id)[0];
            event.target.value = criterion.name;
        }
    }

    const handleChangeLinearSegments = (valueString, id) => {
        setCriteria(previousCriteria => {
            return previousCriteria.map(criterion => {
                if (criterion.id === id) {
                    return { ...criterion, linear_segments: parseInt(valueString) };
                }
                return criterion;
            });
        });
    }

    const handleChangeLinearSegmentsMobile = (change) => {
        let newValue = formik.values.linear_segments + change;
        formik.setFieldValue("linear_segments", newValue);
    }

    const addCriterion = () => {
        // get max criteria id
        let maxId = Math.max(...criteria.map(item => item.id));
        maxId = maxId === -Infinity ? 0 : maxId;

        // set criteria
        setCriteria(previousCriteria => [...previousCriteria, {
            id: maxId + 1,
            name: "Criterion name",
            gain: true,
            linear_segments: 0,
        }])

        // set alternatives
        setAlternatives(pAlternatives => {
            return pAlternatives.map(alternative => {
                return {
                    ...alternative,
                    performances: [
                        ...alternative.performances,
                        {
                            value: 0,
                            criterion: maxId + 1,
                        }
                    ]
                }
            })
        })
    }

    const deleteCriterion = (id) => {
        // set criteria
        setCriteria(previousCriteria => previousCriteria.filter(item => item.id !== id));

        // set alternatives
        setAlternatives(pAlternatives => {
            return pAlternatives.map(alternative => {
                return {
                    ...alternative,
                    performances: alternative.performances.filter(performance => performance.criterion !== id)
                }
            })
        })
    }

    return (
        <>

            {/*DESKTOP*/}
            <Show above={'lg'}>
                <TableContainer>
                    <Table>
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
                                            label={"Gain means that high values of a given alternative on this criterion will result in a higher position of the alternative in the final ranking. Loss means that low values of an alternative on this criterion will result in a higher position of the alternative in the final ranking."}
                                            openDelay={200}>
                                            <InfoIcon/>
                                        </CustomTooltip>
                                    </HStack>
                                </Th>
                                <Th>
                                    <HStack>
                                        <Text>Linear segments</Text>
                                        <CustomTooltip
                                            label={"Choose how many linear segments the criterion should have. To select the general function, choose 0."}
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
                                    <Tr>
                                        <Td>
                                            <FormControl isInvalid={criterion.name.length === 0}>
                                                <Input
                                                    value={criterion.name}
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
                                                value={criterion.linear_segments}
                                                min={0}
                                                max={30}
                                                clampValueOnBlur={false}
                                                onChange={(valueString) => handleChangeLinearSegments(valueString, criterion.id)}
                                            >
                                                <NumberInputField/>
                                                <NumberInputStepper>
                                                    <NumberIncrementStepper/>
                                                    <NumberDecrementStepper/>
                                                </NumberInputStepper>
                                            </NumberInput>
                                        </Td>
                                        <Td textAlign={'right'}>
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

                <Button mx={6} my={4} colorScheme={'teal'} onClick={addCriterion} variant='outline'>
                    New criterion
                </Button>
            </Show>

            {/*MOBILE*/}
            {/*TODO: change 991px to const, can't be 'md' because mobile and desktop are both seen then*/}
            <Show below={'991px'}>
                <Flex
                    direction={'column'}
                    spacing={4}
                >
                    {criteria.map((criterion, index) => {
                        return (
                            <HStack
                                borderTopWidth={'1px'}
                                borderBottomWidth={index === criteria.length - 1 ? '1px' : '0px'}
                                p={2}
                            >
                                <Text isTruncated>{criterion.name}</Text>
                                <Spacer/>
                                <IconButton
                                    aria-label={'Edit criterion'}
                                    icon={<EditIcon/>}
                                    onClick={() => {
                                        formik.values.id = criterion.id;
                                        formik.values.name = criterion.name;
                                        formik.values.gain = criterion.gain;
                                        formik.values.linear_segments = criterion.linear_segments;
                                        onOpen();
                                    }}>
                                </IconButton>
                                <IconButton
                                    color={'red.300'}
                                    aria-label={'delete-criterion'}
                                    icon={<DeleteIcon/>}
                                    onClick={() => deleteCriterion(criterion.id)}
                                />
                            </HStack>
                        )
                    })
                    }
                </Flex>

                <Button my={4} colorScheme={'teal'} onClick={addCriterion} variant='outline'>
                    New criterion
                </Button>
            </Show>

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay/>
                <ModalContent
                    mx={'15px'}
                    as={"form"}
                    onSubmit={formik.handleSubmit}
                >
                    <ModalHeader>Edit criterion</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody textAlign={'center'}>
                        <VStack spacing={"15px"}>
                            <FormControl isInvalid={formik.errors.name && formik.touched.name}>
                                <FormLabel fontSize={'sm'}>Name</FormLabel>
                                <Input
                                    name={"name"}
                                    autoComplete={"off"}
                                    {...formik.getFieldProps("name")}
                                />
                                <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
                            </FormControl>

                            <FormControl>
                                <FormLabel fontSize={'sm'}>
                                    <HStack>
                                        <Text>Type</Text>
                                        <Popover>
                                            <PopoverTrigger>
                                                <InfoIcon/>
                                            </PopoverTrigger>
                                            <PopoverContent>
                                                <PopoverCloseButton/>
                                                <PopoverBody>Gain means that high values of a given alternative on this
                                                    criterion will result in a higher position of the alternative in the
                                                    final ranking. Loss means that low values of an alternative on this
                                                    criterion will result in a higher position of the alternative in the
                                                    final ranking.</PopoverBody>
                                            </PopoverContent>
                                        </Popover>
                                    </HStack>
                                </FormLabel>
                                <HStack>
                                    <Text color={formik.values.gain ? 'gray' : 'red.300'}>
                                        Cost
                                    </Text>
                                    <Switch
                                        name={'gain'}
                                        colorschemechecked={'teal'}
                                        colorschemeunchecked={'red'}
                                        isChecked={formik.values.gain}
                                        {...formik.getFieldProps("gain")}
                                    />
                                    <Text color={formik.values.gain ? 'teal.300' : 'gray'}>
                                        Gain
                                    </Text>
                                </HStack>
                            </FormControl>

                            <FormControl isInvalid={formik.errors.linear_segments && formik.touched.linear_segments}>
                                <FormLabel fontSize={'sm'}>
                                    <HStack>
                                        <Text>
                                            Linear segments
                                        </Text>
                                        <Popover>
                                            <PopoverTrigger>
                                                <InfoIcon/>
                                            </PopoverTrigger>
                                            <PopoverContent>
                                                <PopoverCloseButton/>
                                                <PopoverBody>Choose how many linear segments the criterion should have.
                                                    To select the general function, choose 0.</PopoverBody>
                                            </PopoverContent>
                                        </Popover>
                                    </HStack>
                                </FormLabel>
                                <HStack>
                                    <Button
                                        isDisabled={formik.values.linear_segments >= 30}
                                        onClick={() => handleChangeLinearSegmentsMobile(1)}
                                    >+</Button>
                                    <Input
                                        id={'input_linear_segments'}
                                        name={'linear_segments'}
                                        type={'number'}
                                        {...formik.getFieldProps("linear_segments")}
                                    />
                                    <Button
                                        isDisabled={formik.values.linear_segments <= 0}
                                        onClick={() => handleChangeLinearSegmentsMobile(-1)}
                                    >-</Button>
                                </HStack>
                                <FormErrorMessage>{formik.errors.linear_segments}</FormErrorMessage>
                            </FormControl>
                        </VStack>

                        <ModalFooter px={0}>
                            <ButtonGroup pt={"1rem"}>
                                <Button colorScheme={"teal"} type={"submit"}>Confirm</Button>
                                <Button onClick={onClose}>Back</Button>
                            </ButtonGroup>
                        </ModalFooter>

                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default CriteriaTab;
