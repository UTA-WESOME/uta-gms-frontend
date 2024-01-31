import { DeleteIcon, EditIcon, InfoIcon } from "@chakra-ui/icons";
import {
    Button,
    Center,
    Checkbox,
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
    Popover,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverTrigger,
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
    useMediaQuery,
    VStack
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useState } from "react";
import { FaArrowTrendUp } from "react-icons/fa6";
import * as Yup from "yup";
import CustomTooltip from "../../../utils/CustomTooltip.jsx";
import * as c from "./../../../../config.js";


const findChildren = (categories, categoryId) => {
    let childrenIds = [];

    const findChildrenRecursive = (parentId) => {
        categories.forEach(category => {
            if (category.parent === parentId) {
                childrenIds.push(category.id);
                findChildrenRecursive(category.id);
            }
        })
    }

    findChildrenRecursive(categoryId);
    return childrenIds;
}


const CategoriesPanel = ({ alternatives, criteria, categories, setCategories, setPreferenceIntensities }) => {

    let generalId = Math.min(...categories.map(i => i.id));
    const [showParent] = useMediaQuery(`(min-width: ${c.Categories.minWidthShowParent})`);
    const [isScreenMobile] = useMediaQuery(`(max-width: ${c.Categories.maxWidthMobile})`);

    // EDIT BUTTON
    const { isOpen: isOpenEdit, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure();
    const formik = useFormik({
        initialValues: {
            id: 0,
            name: "",
            color: "teal.500",
            active: true,
            samples: c.Categories.CategoriesPanel.defaultValueSamples,
            parent: generalId
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Category name is required!").max(15, "Category name too long!"),
            color: Yup.string(),
            active: Yup.boolean(),
            samples: Yup.number()
                .required("This field is required!")
                .max(10000, "The number of samples is limited to a maximum of 10000!")
                .min(0, "The number of samples can not be a negative number!")
                .integer("The number of samples must be a whole number!")
        }),
        onSubmit: (values, _) => {

            // find children of the node
            const childrenIds = findChildren(categories, values.id)

            setCategories(categories.map(category => {
                if (category.id === values.id)
                    return {
                        ...category,
                        name: values.name,
                        color: values.color,
                        active: values.active,
                        samples: values.samples,
                        parent: values.parent
                    }
                // if we change to inactive, set children as inactive too
                if (childrenIds.includes(category.id) && !values.active) {
                    return {
                        ...category,
                        active: false
                    }
                }
                return category;
            }))
            onCloseEdit();
        }
    })

    const handleChangeNumberOfSamples = (change) => {
        let newValue = (formik.values.samples === "" ? 0 : formik.values.samples) + change;
        formik.setFieldValue("samples", newValue);
    }

    // CRITERIA BUTTON
    const { isOpen: isOpenCriteria, onOpen: onOpenCriteria, onClose: onCloseCriteria } = useDisclosure();
    const [currentCategory, setCurrentCategory] = useState(null);

    const addCategory = () => {
        let maxId = Math.max(...categories.map(i => i.id));
        maxId = maxId === -Infinity ? 0 : maxId;

        setCategories([...categories, {
            id: maxId + 1,
            name: `Category`,
            color: 'teal.400',
            active: true,
            samples: c.Categories.CategoriesPanel.defaultValueSamples,
            diagram: {},
            parent: generalId,
            criterion_categories: [],
            function_points: [],
            preference_intensities: [],
            pairwise_comparisons: [],
            rankings: alternatives.map(alternative => ({
                reference_ranking: 0,
                ranking: 0,
                alternative: alternative.id
            })),
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

        // update preference intensities
        setPreferenceIntensities(pPreferenceIntensities => pPreferenceIntensities.filter(pi => pi.category !== categoryId))
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

    const handleCheck = (event, criterionId) => {
        if (event.target.checked) {
            setCategories(categories.map(category => {
                if (category.id === currentCategory.id)
                    return {
                        ...category,
                        criterion_categories: [...category.criterion_categories, { criterion: criterionId }]
                    };
                return category;
            }))
        } else {
            setCategories(categories.map(category => {
                if (category.id === currentCategory.id) {
                    return {
                        ...category,
                        criterion_categories: category.criterion_categories.filter(item => item.criterion !== criterionId)
                    };
                } else {
                    return category;
                }
            }));
        }
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
                            {showParent && <Th>Parent</Th>}
                            <Th>Actions</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {categories.map((category, index) => (
                            <Tr key={index}>
                                <Td>
                                    <Text fontSize={{ base: 'sm', sm: 'md' }}>{category.name}</Text>
                                </Td>
                                {showParent &&
                                    <Td>
                                        {index !== 0 &&
                                            <Select
                                                value={category.parent}
                                                onChange={(event) => handleChangeParent(category.id, parseInt(event.target.value))}
                                            >
                                                {categories
                                                    .filter(cat => cat.id !== category.id && !findChildren(categories, category.id).includes(cat.id)) // prevent cycles inside the tree
                                                    .map(cat => (
                                                        <option value={cat.id} key={cat.id}>{cat.name}</option>
                                                    ))
                                                }
                                            </Select>
                                        }
                                    </Td>
                                }
                                <Td>
                                    <CustomTooltip label={'Edit'}>
                                        <IconButton
                                            size={{ base: 'sm', sm: 'md' }}
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
                                                    samples: category.samples,
                                                    parent: category.parent
                                                });
                                                formik.setErrors({});
                                                onOpenEdit();
                                            }}
                                        />
                                    </CustomTooltip>
                                    <CustomTooltip label={'Criteria'}>
                                        <IconButton
                                            size={{ base: 'sm', sm: 'md' }}
                                            mr={1}
                                            color={'teal.300'}
                                            aria-label={'edit-criterion-categories'}
                                            icon={<FaArrowTrendUp/>}
                                            onClick={() => {
                                                setCurrentCategory(category);
                                                onOpenCriteria();
                                            }}
                                        />
                                    </CustomTooltip>
                                    {index !== 0 &&
                                        <CustomTooltip label={'Delete'}>
                                            <IconButton
                                                size={{ base: 'sm', sm: 'md' }}
                                                color={'red.300'}
                                                aria-label={'delete-category'}
                                                icon={<DeleteIcon/>}
                                                onClick={() => deleteCategory(category.id)}
                                            />
                                        </CustomTooltip>
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

            {/*EDIT MODAL*/}
            <Modal
                isOpen={isOpenEdit}
                onClose={onCloseEdit}
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
                                        isDisabled={formik.values.id !== generalId && !categories.find(cat => cat.id === formik.values.parent).active}
                                        colorScheme={'teal'}
                                        {...formik.getFieldProps("active")}
                                    />
                                    {formik.values.id !== generalId && !categories.find(cat => cat.id === formik.values.parent).active &&
                                        <Text>Parent is inactive</Text>
                                    }
                                </HStack>
                            </FormControl>

                            {/*SAMPLES*/}
                            <FormControl isInvalid={formik.errors.samples && formik.touched.samples}>
                                <FormLabel fontSize={'sm'}>
                                    <HStack>
                                        <Text>
                                            Number of samples
                                        </Text>
                                        {isScreenMobile ?
                                            <Popover>
                                                <PopoverTrigger>
                                                    <InfoIcon/>
                                                </PopoverTrigger>
                                                <PopoverContent>
                                                    <PopoverCloseButton/>
                                                    <PopoverBody>{c.Categories.CategoriesPanel.descriptionSamples}</PopoverBody>
                                                </PopoverContent>
                                            </Popover>
                                            :
                                            <CustomTooltip
                                                label={c.Categories.CategoriesPanel.descriptionSamples}
                                                openDelay={200}>
                                                <InfoIcon/>
                                            </CustomTooltip>

                                        }

                                    </HStack>
                                </FormLabel>
                                <HStack>
                                    <Button
                                        isDisabled={formik.values.samples <= 0}
                                        onClick={() => handleChangeNumberOfSamples(-1)}
                                    >-</Button>
                                    <Input
                                        id={'input_samples'}
                                        name={'samples'}
                                        type={'number'}
                                        {...formik.getFieldProps("samples")}
                                    />

                                    <Button
                                        isDisabled={formik.values.samples >= 10000}
                                        onClick={() => handleChangeNumberOfSamples(1)}
                                    >+</Button>
                                </HStack>
                                <FormErrorMessage>{formik.errors.samples}</FormErrorMessage>
                            </FormControl>


                            {/*COLOR PICKER*/}
                            {/*For now commented, because there is no need to use the color since we are drawing a tree,*/}
                            {/*I'll leave the option hidden - we may use it in the future*/}
                            {/*<FormControl>*/}
                            {/*    <FormLabel fontSize={'sm'}>*/}
                            {/*        <Text>Color</Text>*/}
                            {/*    </FormLabel>*/}
                            {/*    <HStack>*/}
                            {/*        <ColorPicker*/}
                            {/*            pickedColor={formik.values.color}*/}
                            {/*            pickFunction={(color) => {*/}
                            {/*                formik.setFieldValue("color", color);*/}
                            {/*            }}*/}
                            {/*        />*/}
                            {/*    </HStack>*/}
                            {/*</FormControl>*/}
                        </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='teal' mr={3} type={"submit"}>Confirm</Button>
                        <Button onClick={onCloseEdit}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {/*CRITERIA MODAL*/}
            <Modal isOpen={isOpenCriteria} onClose={onCloseCriteria}>
                <ModalOverlay/>
                <ModalContent mx={'15px'} pb={5}>
                    <ModalHeader>Assign criteria</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        {currentCategory !== null &&
                            <Flex spacing={"15px"} direction={'column'}>
                                {criteria.map((criterion, index) => (
                                    <Checkbox
                                        key={index}
                                        my={1}
                                        color={criterion.color}
                                        colorScheme={'teal'}
                                        onChange={(event) => handleCheck(event, criterion.id)}
                                        defaultChecked={currentCategory.criterion_categories.some(cc => cc.criterion === criterion.id)}
                                    >
                                        <Text fontWeight={'bold'}>{criterion.name}</Text>
                                    </Checkbox>
                                ))}
                            </Flex>
                        }
                    </ModalBody>
                </ModalContent>
            </Modal>

        </>
    )
}

export default CategoriesPanel;