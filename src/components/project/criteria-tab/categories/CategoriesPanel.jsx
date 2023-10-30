import {
    Button,
    ButtonGroup,
    FormControl,
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
    Tr
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

const CategoriesPanel = ({ isOpen, onClose, categories, setCategories }) => {

    const [activeCategories, setActiveCategories] = useState(categories);

    const handleChangeName = (categoryId, newName) => {
        setActiveCategories(activeCategories.map(cat => {
            if (cat.id === categoryId)
                return {
                    ...cat,
                    name: newName,
                };
            return cat;
        }))
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
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay/>
            <ModalContent mx={'15px'}>
                <ModalHeader>Categories</ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    <TableContainer>
                        <Table size={'sm'}>
                            <Thead>
                                <Tr>
                                    <Th>Name</Th>
                                    <Th>Color</Th>
                                    <Th>Active</Th>
                                    <Th>Actions</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {activeCategories.map((category, index) => (
                                    <Tr key={index}>
                                        <Td>
                                            <FormControl isInvalid={category.name.length === 0}>
                                                <Input
                                                    key={category.id}
                                                    defaultValue={category.name}
                                                    onBlur={(event) => handleChangeName(category.id, event.target.value)}
                                                />
                                            </FormControl>
                                        </Td>
                                        <Td textAlign={'center'}>
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
                                        <Td textAlign={'center'}>
                                            <Switch
                                                key={category.id}
                                                colorScheme={'teal'}
                                                defaultChecked={category.active}
                                                onChange={() => handleChangeType(category.id)}
                                            />
                                        </Td>
                                        <Td textAlign={'center'}>
                                            <IconButton
                                                color={'red.300'}
                                                aria-label={'delete-category'}
                                                icon={<DeleteIcon/>}
                                                // onClick={() => deleteCategory(category.id)}
                                            />
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </ModalBody>
                <ModalFooter>
                    <ButtonGroup pt={"1rem"}>
                        <Button onClick={onClose}>Back</Button>
                        <Button colorScheme={"teal"} type={"submit"}>Confirm</Button>
                    </ButtonGroup>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default CategoriesPanel;