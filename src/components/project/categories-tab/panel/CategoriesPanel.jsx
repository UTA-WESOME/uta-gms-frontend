import {
    Button,
    Center,
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
    Select,
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
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useFormik } from "formik";
import * as Yup from "yup";
import ColorPicker from "./ColorPicker.jsx";

const CategoriesPanel = ({ categories, setCategories }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    let generalId = Math.min(...categories.map(i => i.id));
    const formik = useFormik({
        initialValues: { id: 0, name: "", color: "teal.500", active: true, parent: generalId },
        validationSchema: Yup.object({
            name: Yup.string().required("Category name is required!").max(15, "Category name too long!"),
            color: Yup.string(),
            active: Yup.boolean()
        }),
        onSubmit: (values, _) => {
            setCategories(categories.map(category => {
                if (category.id === values.id)
                    return {
                        ...category,
                        name: values.name,
                        color: values.color,
                        active: values.active,
                        parent: values.parent
                    }
                return category;
            }))
            onClose();
        }
    })

    const addCategory = () => {
        let maxId = Math.max(...categories.map(i => i.id));
        maxId = maxId === -Infinity ? 0 : maxId;

        setCategories([...categories, {
            id: maxId + 1,
            name: `Category`,
            color: 'teal.400',
            active: true,
            diagram: {},
            parent: generalId,
            criterion_categories: [],
            function_points: [],
            preference_intensities: [],
            pairwise_comparisons: [],
            rankings: [],
            percentages: [],
            acceptability_indices: []
        }])
    }

    const deleteCategory = (categoryId) => {
        // delete the category from categories
        setCategories(categories);

        let generalId = Math.min(...categories.map(i => i.id));
        // update its children
        setCategories(categories.filter(item => item.id !== categoryId).map(category => {
            if (category.parent === categoryId)
                return {
                    ...category,
                    parent: generalId
                }
            return category;
        }))
    }

    const handleChangeParent = (categoryId, newParentId) => {
        setCategories(categories.map(category => {
            if (category.id === categoryId)
                return {
                    ...category,
                    parent: newParentId,
                }
            return category
        }))
    }


    return (
        <>
            <Center>
                <Heading size={'lg'} my={4}>Categories</Heading>
            </Center>
            <TableContainer>
                <Table size={'sm'}>
                    <Thead>
                        <Tr>
                            <Th>Name</Th>
                            <Th>Parent</Th>
                            <Th>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {categories.map((category, index) => (
                            <Tr key={index}>
                                <Td>
                                    <Text fontSize={'md'}>{category.name}</Text>
                                </Td>
                                <Td>
                                    {index !== 0 &&
                                        <Select
                                            value={category.parent}
                                            onChange={(event) => handleChangeParent(category.id, parseInt(event.target.value))}
                                        >
                                            {categories.filter(cat => cat.id !== category.id).filter(cat => cat.parent !== category.id).map(cat => (
                                                <option value={cat.id} key={cat.id}>{cat.name}</option>
                                            ))}
                                        </Select>
                                    }
                                </Td>
                                <Td w={'min-content'}>
                                    <IconButton
                                        mr={1}
                                        color={'orange.300'}
                                        aria-label={'edit-category'}
                                        icon={<EditIcon/>}
                                        onClick={() => {
                                            formik.setValues({
                                                id: category.id,
                                                name: category.name,
                                                color: category.color,
                                                active: category.active,
                                                parent: category.parent
                                            });
                                            formik.setErrors({});
                                            onOpen();
                                        }}
                                    />
                                    {index !== 0 &&
                                        <IconButton
                                            ml={1}
                                            color={'red.300'}
                                            aria-label={'delete-category'}
                                            icon={<DeleteIcon/>}
                                            onClick={() => deleteCategory(category.id)}
                                        />
                                    }
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
                <Button mt={4} colorScheme={'teal'} onClick={addCategory} variant='outline'>
                    New category
                </Button>
            </TableContainer>

            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay/>
                <ModalContent
                    mx={'15px'}
                    as={'form'}
                    onSubmit={formik.handleSubmit}
                >
                    <ModalHeader>Edit category</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody textAlign={'center'}>
                        <VStack spacing={'15px'}>
                            <FormControl isInvalid={formik.errors.name && formik.touched.name}>
                                <FormLabel fontSize={'sm'}>Name</FormLabel>
                                <Input
                                    name={"name"}
                                    autoComplete={"off"}
                                    {...formik.getFieldProps("name")}
                                />
                                <FormErrorMessage>{formik.errors.name}</FormErrorMessage>
                            </FormControl>

                            {/*PARENT*/}
                            {formik.values.id !== generalId &&
                                <FormControl>
                                    <FormLabel fontSize={'sm'}>Parent</FormLabel>
                                    <Select
                                        value={formik.values.parent}
                                        {...formik.getFieldProps("parent")}
                                    >
                                        {categories
                                            .filter(cat => cat.id !== formik.values.id)
                                            .filter(cat => cat.parent !== formik.values.id)
                                            .map(cat => (
                                                <option value={cat.id} key={cat.id}>{cat.name}</option>
                                            ))}
                                    </Select>
                                </FormControl>
                            }

                            {/*ACTIVE*/}
                            <FormControl>
                                <FormLabel fontSize={'sm'}>
                                    <Text>Active</Text>
                                </FormLabel>
                                <HStack>
                                    <Switch
                                        name={'active'}
                                        isChecked={formik.values.active}
                                        colorScheme={'teal'}
                                        {...formik.getFieldProps("active")}
                                    />
                                </HStack>
                            </FormControl>

                            {/*COLOR PICKER*/}
                            <FormControl>
                                <FormLabel fontSize={'sm'}>
                                    <Text>Color</Text>
                                </FormLabel>
                                <HStack>
                                    <ColorPicker
                                        pickedColor={formik.values.color}
                                        pickFunction={(color) => {
                                            formik.setFieldValue("color", color);
                                        }}
                                    />
                                </HStack>
                            </FormControl>

                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='teal' mr={3} type={"submit"}>Confirm</Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>

    )
}

export default CategoriesPanel;