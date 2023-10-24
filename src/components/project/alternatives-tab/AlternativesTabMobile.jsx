import {
    Button,
    ButtonGroup, Center,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel, Heading,
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
    Spacer,
    Text,
    useDisclosure,
    VStack
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { FieldArray, FormikProvider, getIn, useFormik } from "formik";
import * as Yup from "yup";

const AlternativesTabMobile = ({ alternatives, setAlternatives, criteria, addAlternative, deleteAlternative }) => {

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
        onSubmit: (values, _) => {
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
            <Flex
                direction={'column'}
                spacing={4}
            >
                <Center>
                    <Heading size={'lg'} mb={2}>Alternatives</Heading>
                </Center>
                {alternatives.map((alternative, index) => {
                    return (
                        <HStack
                            borderTopWidth={'1px'}
                            borderBottomWidth={index === alternatives.length - 1 ? '1px' : '0px'}
                            p={2}
                            key={index}
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
                                                                    onClick={() => handleChangePerformanceMobile(-1, index)}
                                                                >-</Button>
                                                                <Input
                                                                    id={`input_performance_${index}`}
                                                                    name={`performance_${index}`}
                                                                    type={'number'}
                                                                    {...formik.getFieldProps(`performances[${index}].value`)}
                                                                />

                                                                <Button
                                                                    onClick={() => handleChangePerformanceMobile(1, index)}
                                                                >+</Button>
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

export default AlternativesTabMobile;