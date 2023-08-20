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
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";


const CriteriaTab = ({ criteria, setCriteria }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    const formik = useFormik({
        initialValues: { id: 0, name: "", gain: false },
        validationSchema: Yup.object({
            name: Yup.string().required("Criterion name is required!")
                .max(64, "Criterion name too long!")
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
                        };
                    }
                    return criterion;
                });
            });
            // close modal
            onClose();
        }
    })


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

    const addCriterion = () => {
        // get max criteria id
        const maxId = Math.max(...criteria.map(item => item.id));

        // set criteria
        setCriteria(previousCriteria => [...previousCriteria, {
            id: maxId + 1,
            name: "Criterion name",
            gain: true
        }])
    }

    const deleteCriterion = (id) => {
        setCriteria(previousCriteria => previousCriteria.filter(item => item.id !== id));
    }

    return (
        <>

            {/*DESKTOP*/}
            <Show above={'md'}>
                <TableContainer>
                    <Table>
                        <Thead>
                            <Tr>
                                <Th>Name</Th>
                                <Th>Type</Th>
                                <Th/>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {criteria.map((criterion, index) => {
                                return (
                                    <Tr>
                                        <Td>
                                            <Input
                                                defaultValue={criterion.name}
                                                onChange={(event) => handleChangeName(event, criterion.id)}
                                            />
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

                <Button mx={6} my={4} colorScheme={'teal'} onClick={addCriterion}>
                    New criterion
                </Button>
            </Show>

            {/*MOBILE*/}
            {/*TODO: change 767px to const, can't be 'md' because mobile and desktop are both seen then*/}
            <Show below={'767px'}>
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

                <Button my={4} colorScheme={'teal'} onClick={addCriterion}>
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
                                <FormLabel fontSize={'sm'}>Type</FormLabel>
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
