import {
    Button,
    ButtonGroup,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Heading,
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
    useToast,
    VStack
} from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { useFormik } from "formik";
import * as Yup from "yup";

const BestWorstTabMobile = ({ alternatives, currentCategoryId, categories, setCategories }) => {

    const toastId = "toast-max-min-mobile";
    const toast = useToast();
    const formik = useFormik({
        initialValues: { alternative: 0, best_position: "", worst_position: "" },
        validationSchema: Yup.object({
            best_position: Yup.number().min(1).max(alternatives.length).integer("Best position must be a whole number!").nullable(),
            worst_position: Yup.number().min(1).max(alternatives.length).integer("Worst position must be a whole number!").nullable()
        }),
        onSubmit: (values, _) => {
            if (values.best_position > values.worst_position && values.best_position !== "" && values.worst_position !== "") {
                if (!toast.isActive(toastId)) {
                    toast({
                        id: toastId,
                        title: 'Warning!',
                        description: "Best position is greater than the worst position",
                        status: 'warning',
                        duration: 5000,
                        isClosable: true,
                    });
                }
                return;
            }
            setCategories(pCategories => pCategories.map(category => {
                if (category.id === currentCategoryId) {
                    return {
                        ...category,
                        rankings: category.rankings.map(ranking => {
                            if (ranking.alternative === values.alternative)
                                return {
                                    ...ranking,
                                    best_position: values.best_position !== "" ? values.best_position : null,
                                    worst_position: values.worst_position !== "" ? values.worst_position : null,
                                };
                            return ranking;
                        })
                    }
                }
                return category;
            }))
            onClose();
        }
    })
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleChangeUpperBound = (change) => {
        let newValue = (formik.values.best_position === "" ? 0 : formik.values.best_position) + change;
        formik.setFieldValue("best_position", newValue);
    }

    const handleChangeLowerBound = (change) => {
        let newValue = (formik.values.worst_position === "" ? 0 : formik.values.worst_position) + change;
        formik.setFieldValue("worst_position", newValue);
    }


    return (
        <>
            <VStack>
                <Heading size={'lg'}>Best-Worst</Heading>
            </VStack>
            <Flex
                direction={'column'}
                spacing={4}
                pt={3}
            >
                {categories
                    .find(c => c.id === currentCategoryId)
                    ?.rankings
                    .map((ranking, index) => (
                        <HStack
                            borderTopWidth={'1px'}
                            borderBottomWidth={
                                index === categories
                                    .find(c => c.id === currentCategoryId)
                                    ?.rankings.length - 1 ? '1px' : '0px'
                            }
                            p={2}
                            key={index}
                        >
                            <Text isTruncated>{alternatives.find(a => a.id === ranking.alternative).name}</Text>
                            <Spacer/>
                            <IconButton
                                aria-label={'edit-pairwise-comparison'}
                                icon={<EditIcon/>}
                                onClick={() => {
                                    formik.setValues({
                                        alternative: ranking.alternative,
                                        best_position: ranking.best_position !== null ? ranking.best_position : "",
                                        worst_position: ranking.worst_position !== null ? ranking.worst_position : ""
                                    });
                                    formik.setErrors({});
                                    onOpen();
                                }}
                            />
                        </HStack>
                    ))}
            </Flex>

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay/>
                <ModalContent mx={'15px'} as={"form"} onSubmit={formik.handleSubmit}>
                    <ModalHeader>Edit best-worst</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody textAlign={'center'}>
                        <VStack spacing={'15px'}>
                            <Heading
                                colorScheme={'teal'}
                                size={'xl'}
                            >
                                {formik.values.name}
                            </Heading>
                            <FormControl isInvalid={formik.errors.best_position && formik.touched.best_position}>
                                <FormLabel fontSize={'sm'}>Best position</FormLabel>
                                <HStack>
                                    <Button
                                        isDisabled={formik.values.best_position <= 1 && formik.values.best_position !== null}
                                        onClick={() => handleChangeUpperBound(-1)}
                                    >-</Button>
                                    <Input
                                        id={'input_best_position'}
                                        name={'best_position'}
                                        type={'number'}
                                        {...formik.getFieldProps("best_position")}
                                    />
                                    <Button
                                        isDisabled={formik.values.best_position >= alternatives.length && formik.values.best_position !== null}
                                        onClick={() => handleChangeUpperBound(1)}
                                    >+</Button>
                                </HStack>
                                <FormErrorMessage>{formik.errors.best_position}</FormErrorMessage>
                            </FormControl>
                            <FormControl isInvalid={formik.errors.worst_position && formik.touched.worst_position}>
                                <FormLabel fontSize={'sm'}>Worst position</FormLabel>
                                <HStack>
                                    <Button
                                        isDisabled={formik.values.worst_position <= 1 && formik.values.worst_position !== null}
                                        onClick={() => handleChangeLowerBound(-1)}
                                    >-</Button>
                                    <Input
                                        id={'input_worst_position'}
                                        name={'worst_position'}
                                        type={'number'}
                                        {...formik.getFieldProps("worst_position")}
                                    />
                                    <Button
                                        isDisabled={formik.values.worst_position >= alternatives.length && formik.values.worst_position !== null}
                                        onClick={() => handleChangeLowerBound(1)}
                                    >+</Button>
                                </HStack>
                                <FormErrorMessage>{formik.errors.worst_position}</FormErrorMessage>
                            </FormControl>
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <ButtonGroup pt={"1rem"}>
                            <Button colorScheme={"teal"} type={"submit"}>Confirm</Button>
                            <Button onClick={onClose}>Back</Button>
                        </ButtonGroup>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default BestWorstTabMobile;