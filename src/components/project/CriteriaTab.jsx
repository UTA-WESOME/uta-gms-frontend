import {
    Button,
    ButtonGroup,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Show,
    Switch,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useDisclosure,
    VStack
} from "@chakra-ui/react";
import { useFormik } from "formik";
import * as Yup from "yup";

const CriteriaTab = ({ criteria, setCriteria }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();

    const formik = useFormik({
        initialValues: { name: "", gain: false },
        validationSchema: Yup.object({
            name: Yup.string().required("Criterion name is required!")
                .max(64, "Criterion name too long!")
        }),
        onSubmit: (values, actions) => {

        }
    })

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
                            </Tr>
                        </Thead>
                        <Tbody>
                            {criteria.map((criterion, index) => {
                                return (
                                    <Tr>
                                        <Td>{criterion.name}</Td>
                                        <Td>
                                            <Switch colorScheme={'teal'}>
                                            </Switch>
                                        </Td>
                                    </Tr>
                                )
                            })}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Show>

            {/*MOBILE*/}
            {/*TODO: change 767px to const, can't be 'md' because mobile and desktop are both seen then*/}
            <Show below={'767px'}>
                <TableContainer>
                    <Table colorScheme={'teal'}>
                        <Tbody>
                            {criteria.map((criterion, index) => {
                                return (
                                    <Tr borderTopWidth={'1px'} borderTopColor={'teal.700'}>
                                        <Td
                                            textAlign={'center'}
                                            onClick={() => {
                                                formik.values.name = criterion.name;
                                                formik.values.gain = criterion.gain;
                                                onOpen();
                                            }}
                                        >
                                            {criterion.name}
                                        </Td>
                                    </Tr>
                                )
                            })
                            }
                        </Tbody>
                    </Table>
                </TableContainer>
            </Show>

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay/>
                <ModalContent mx={'15px'}>
                    <ModalHeader>Edit criterion</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody textAlign={'center'}>
                        <VStack
                            as={"form"}
                            spacing={"15px"}
                            onSubmit={formik.handleSubmit}
                        >
                            <FormControl isInvalid={formik.errors.name && formik.touched.name}>
                                <FormLabel fontSize={'sm'}>Name</FormLabel>
                                <Input
                                    name={"name"}
                                    autoComplete={"off"}
                                    {...formik.getFieldProps("name")}
                                />
                                <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
                            </FormControl>

                            <FormControl display={'flex'} alignItems={'center'}>
                                <FormLabel fontSize={'sm'} mb={'0'}>Gain</FormLabel>
                                <Switch
                                    name={'gain'}
                                    colorScheme={'teal'}
                                    isChecked={formik.values.gain}
                                    {...formik.getFieldProps("gain")}
                                />
                            </FormControl>

                            <ButtonGroup pt={"1rem"}>
                                <Button colorScheme={"teal"} type={"submit"}>Confirm</Button>
                                <Button onClick={onClose}>Back</Button>
                            </ButtonGroup>

                        </VStack>


                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}

export default CriteriaTab;
