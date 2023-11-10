import {
    Button,
    Center,
    Heading,
    IconButton,
    Select,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

const colors = [
    "teal.500",
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

const CategoriesPanel = ({ categories }) => {

    // const addCategory = () => {
    //     let maxId = Math.max(...activeCategories.map(i => i.id));
    //     maxId = maxId === -Infinity ? 0 : maxId;
    //
    //     setActiveCategories([...activeCategories, {
    //         id: maxId + 1,
    //         name: `Category ${activeCategories.length + 1}`,
    //         color: 'teal.400',
    //         active: true
    //     }])
    // }
    //
    // const deleteCategory = (categoryId) => {
    //     setActiveCategories(activeCategories.filter(item => item.id !== categoryId));
    // }

    // const handleChangeName = (event, categoryId) => {
    //     let newName = event.target.value;
    //     if (newName.length <= 15) {
    //         setActiveCategories(activeCategories.map(cat => {
    //             if (cat.id === categoryId)
    //                 return {
    //                     ...cat,
    //                     name: newName,
    //                 };
    //             return cat;
    //         }))
    //     } else {
    //         let category = categories.find(cat => cat.id === categoryId)
    //         event.target.value = category.name;
    //     }
    // }
    //
    // const handleChangeColor = (categoryId, color) => {
    //     setActiveCategories(activeCategories.map(cat => {
    //         if (cat.id === categoryId)
    //             return {
    //                 ...cat,
    //                 color: color
    //             };
    //         return cat;
    //     }))
    // }
    //
    // const handleChangeType = (categoryId) => {
    //     setActiveCategories(activeCategories.map(cat => {
    //         if (cat.id === categoryId)
    //             return {
    //                 ...cat,
    //                 active: !cat.active,
    //             };
    //         return cat;
    //     }))
    // }

    const handleChangeParent = (categoryId, newParentId) => {

    }


    return (
        <>
            <Center>
                <Heading size={'lg'} my={3}>Categories</Heading>
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
                                            {categories.filter(cat => cat.id !== category.id).map(cat => (
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
                                    />
                                    {index !== 0 &&
                                        <IconButton
                                            ml={1}
                                            color={'red.300'}
                                            aria-label={'delete-category'}
                                            icon={<DeleteIcon/>}
                                            // onClick={() => deleteCategory(category.id)}
                                        />
                                    }
                                </Td>
                            </Tr>
                        ))}


                        {/*{categories.map((category, index) => (*/}
                        {/*    <Tr key={index}>*/}
                        {/*        <Td maxW={'150px'}>*/}
                        {/*            <FormControl isInvalid={category.name.length === 0}>*/}
                        {/*                <Input*/}
                        {/*                    key={category.id}*/}
                        {/*                    defaultValue={category.name}*/}
                        {/*                    // onBlur={(event) => handleChangeName(event, category.id)}*/}
                        {/*                />*/}
                        {/*            </FormControl>*/}
                        {/*        </Td>*/}
                        {/*        <Td>*/}
                        {/*            <Popover>*/}
                        {/*                <PopoverTrigger>*/}
                        {/*                    <IconButton*/}
                        {/*                        aria-label={'color-button'}*/}
                        {/*                        color={'white'}*/}
                        {/*                        bgColor={category.color}*/}
                        {/*                        _hover={{ bgColor: category.color }}*/}
                        {/*                        icon={<MdColorLens/>}*/}
                        {/*                    />*/}
                        {/*                </PopoverTrigger>*/}
                        {/*                <PopoverContent width={'170px'}>*/}
                        {/*                    <PopoverArrow bg={category.color}/>*/}
                        {/*                    <PopoverCloseButton color={'white'}/>*/}
                        {/*                    <PopoverHeader*/}
                        {/*                        height="35px"*/}
                        {/*                        backgroundColor={category.color}*/}
                        {/*                        borderTopLeftRadius={5}*/}
                        {/*                        borderTopRightRadius={5}*/}
                        {/*                        color="white"*/}
                        {/*                    />*/}
                        {/*                    <PopoverBody my={1}>*/}
                        {/*                        <SimpleGrid columns={5} spacing={2}>*/}
                        {/*                            <>*/}
                        {/*                                {colors.map((c) => (*/}
                        {/*                                    <Button*/}
                        {/*                                        key={c}*/}
                        {/*                                        aria-label={c}*/}
                        {/*                                        background={c}*/}
                        {/*                                        height="22px"*/}
                        {/*                                        width="22px"*/}
                        {/*                                        padding={0}*/}
                        {/*                                        minWidth="unset"*/}
                        {/*                                        borderRadius={3}*/}
                        {/*                                        _hover={{ background: c }}*/}
                        {/*                                        onClick={() => {*/}
                        {/*                                            // handleChangeColor(category.id, c);*/}
                        {/*                                        }}*/}
                        {/*                                    />*/}
                        {/*                                ))}*/}
                        {/*                            </>*/}
                        {/*                        </SimpleGrid>*/}
                        {/*                    </PopoverBody>*/}
                        {/*                </PopoverContent>*/}
                        {/*            </Popover>*/}
                        {/*        </Td>*/}
                        {/*        <Td>*/}
                        {/*            <Switch*/}
                        {/*                key={category.id}*/}
                        {/*                colorScheme={'teal'}*/}
                        {/*                defaultChecked={category.active}*/}
                        {/*                // onChange={() => handleChangeType(category.id)}*/}
                        {/*            />*/}
                        {/*        </Td>*/}
                        {/*        <Td>*/}
                        {/*            <IconButton*/}
                        {/*                color={'red.300'}*/}
                        {/*                aria-label={'delete-category'}*/}
                        {/*                icon={<DeleteIcon/>}*/}
                        {/*                // onClick={() => deleteCategory(category.id)}*/}
                        {/*            />*/}
                        {/*        </Td>*/}
                        {/*    </Tr>*/}
                        {/*))}*/}
                    </Tbody>
                </Table>
                <Button mt={4} colorScheme={'teal'} variant='outline'>
                    New category
                </Button>
            </TableContainer>

        </>

    )
}

export default CategoriesPanel;