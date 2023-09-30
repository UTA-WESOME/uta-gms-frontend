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
    Popover,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverTrigger,
    Spacer,
    Switch,
    Text,
    useDisclosure,
    VStack
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon, InfoIcon } from "@chakra-ui/icons";
import { BiSolidFileImport, } from "react-icons/bi";
import { useFormik } from "formik";
import * as Yup from "yup";

const CriteriaTabMobile = ({ criteria, setCriteria, addCriterion, deleteCriterion }) => {

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
        onSubmit: (values, _) => {
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

    const handleChangeLinearSegmentsMobile = (change) => {
        let newValue = (formik.values.linear_segments === "" ? 0 : formik.values.linear_segments) + change;
        formik.setFieldValue("linear_segments", newValue);
    }

    return (
        <>
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
                            key={index}
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

            <Button mr={6} mt={4} colorScheme={'teal'} onClick={addCriterion} variant='outline'>
                New criterion
            </Button>

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
                                        isDisabled={formik.values.linear_segments <= 0}
                                        onClick={() => handleChangeLinearSegmentsMobile(-1)}
                                    >-</Button>
                                    <Input
                                        id={'input_linear_segments'}
                                        name={'linear_segments'}
                                        type={'number'}
                                        {...formik.getFieldProps("linear_segments")}
                                    />

                                    <Button
                                        isDisabled={formik.values.linear_segments >= 30}
                                        onClick={() => handleChangeLinearSegmentsMobile(1)}
                                    >+</Button>
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

export default CriteriaTabMobile;