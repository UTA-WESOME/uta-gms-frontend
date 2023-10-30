import {
    Button,
    ButtonGroup,
    FormControl,
    IconButton,
    Input,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverHeader,
    PopoverTrigger,
    SimpleGrid,
    Switch,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    useToast
} from "@chakra-ui/react";
import { useState } from "react";
import { MdColorLens } from "react-icons/md";
import { DeleteIcon } from "@chakra-ui/icons";

const colors = [
    "teal.700",
    "red.500",
    "green.500",
    "blue.500",
    "tomato",
    "yellow.500",
    "orange.700",
    "purple.500",
    "pink.500",
    "teal.400"
];

const CategoriesPanel = ({ isOpen, onClose, categories, setCategories, setCriteria }) => {

    const [activeCategories, setActiveCategories] = useState(categories);
    const toast = useToast();

    const save = () => {
        // validate data
        const categoriesCheckName = activeCategories.some(cat => cat.name === "");
        if (categoriesCheckName) {
            toast({
                title: "Error!",
                description: "There is at least one criterion without a name!",
                status: 'error',
                duration: 5000,
                isClosable: true
            });
            return;
        }

        // set categories to activeCategories
        setCategories(activeCategories);

        // update criteria - leave only those ccs that have a corresponding category
        setCriteria(pCriteria => pCriteria.map(criterion => {
            return {
                ...criterion,
                criterion_categories: criterion.criterion_categories.filter(cc => {
                    return activeCategories.some(activeCategory => activeCategory.id === cc.category);
                })
            }
        }))

        onClose();
    }

    const exit = () => {
        setActiveCategories(categories);
        onClose();
    }

    const addCategory = () => {
        let maxId = Math.max(...activeCategories.map(i => i.id));
        maxId = maxId === -Infinity ? 0 : maxId;

        setActiveCategories([...activeCategories, {
            id: maxId + 1,
            name: `Category ${activeCategories.length + 1}`,
            color: 'teal.400',
            active: true
        }])
    }

    const deleteCategory = (categoryId) => {
        setActiveCategories(activeCategories.filter(item => item.id !== categoryId));
    }

    const handleChangeName = (event, categoryId) => {
        let newName = event.target.value;
        if (newName.length <= 15) {
            setActiveCategories(activeCategories.map(cat => {
                if (cat.id === categoryId)
                    return {
                        ...cat,
                        name: newName,
                    };
                return cat;
            }))
        } else {
            let category = categories.find(cat => cat.id === categoryId)
            event.target.value = category.name;
        }
    }

    const handleChangeColor = (categoryId, color) => {
        setActiveCategories(activeCategories.map(cat => {
            if (cat.id === categoryId)
                return {
                    ...cat,
                    color: color
                };
            return cat;
        }))
    }

    const handleChangeType = (categoryId) => {
        setActiveCategories(activeCategories.map(cat => {
            if (cat.id === categoryId)
                return {
                    ...cat,
                    active: !cat.active,
                };
            return cat;
        }))
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} isCentered scrollBehavior={'inside'} closeOnOverlayClick={false}>
            <ModalOverlay/>
            <ModalContent mx={'15px'} maxH={'600px'}>
                <ModalHeader>Categories</ModalHeader>
                <ModalBody>
                    <TableContainer>
                        <Table size={'sm'}>
                            <Thead>
                                <Tr>
                                    <Th borderColor={'white.700'}>Name</Th>
                                    <Th borderColor={'white.700'}>Color</Th>
                                    <Th borderColor={'white.700'}>Active</Th>
                                    <Th borderColor={'white.700'}>Actions</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {activeCategories.map((category, index) => (
                                    <Tr key={index}>
                                        <Td borderColor={'gray'}>
                                            <FormControl isInvalid={category.name.length === 0}>
                                                <Input
                                                    key={category.id}
                                                    defaultValue={category.name}
                                                    onBlur={(event) => handleChangeName(event, category.id)}
                                                />
                                            </FormControl>
                                        </Td>
                                        <Td textAlign={'center'} borderColor={'gray'}>
                                            <Popover>
                                                <PopoverTrigger>
                                                    <IconButton
                                                        aria-label={'color-button'}
                                                        color={'white'}
                                                        bgColor={category.color}
                                                        _hover={{ bgColor: category.color }}
                                                        icon={<MdColorLens/>}
                                                    />
                                                </PopoverTrigger>
                                                <PopoverContent width={'170px'}>
                                                    <PopoverArrow bg={category.color}/>
                                                    <PopoverCloseButton color={'white'}/>
                                                    <PopoverHeader
                                                        height="35px"
                                                        backgroundColor={category.color}
                                                        borderTopLeftRadius={5}
                                                        borderTopRightRadius={5}
                                                        color="white"
                                                    />
                                                    <PopoverBody my={1}>
                                                        <SimpleGrid columns={5} spacing={2}>
                                                            <>
                                                                {colors.map((c) => (
                                                                    <Button
                                                                        key={c}
                                                                        aria-label={c}
                                                                        background={c}
                                                                        height="22px"
                                                                        width="22px"
                                                                        padding={0}
                                                                        minWidth="unset"
                                                                        borderRadius={3}
                                                                        _hover={{ background: c }}
                                                                        onClick={() => {
                                                                            handleChangeColor(category.id, c);
                                                                        }}
                                                                    />
                                                                ))}
                                                            </>
                                                        </SimpleGrid>
                                                    </PopoverBody>
                                                </PopoverContent>
                                            </Popover>
                                        </Td>
                                        <Td textAlign={'center'} borderColor={'gray'}>
                                            <Switch
                                                key={category.id}
                                                colorScheme={'teal'}
                                                defaultChecked={category.active}
                                                onChange={() => handleChangeType(category.id)}
                                            />
                                        </Td>
                                        <Td textAlign={'center'} borderColor={'gray'}>
                                            <IconButton
                                                color={'red.300'}
                                                aria-label={'delete-category'}
                                                icon={<DeleteIcon/>}
                                                onClick={() => deleteCategory(category.id)}
                                            />
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                    <Button mx={4} mt={4} colorScheme={'teal'} onClick={addCategory} variant='outline'>
                        New category
                    </Button>
                </ModalBody>
                <ModalFooter>
                    <ButtonGroup pt={"1rem"}>
                        <Button onClick={exit}>Back</Button>
                        <Button colorScheme={"teal"} onClick={save}>Confirm</Button>
                    </ButtonGroup>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default CategoriesPanel;