import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Box,
    Button,
    ButtonGroup,
    Flex,
    Heading,
    Icon,
    IconButton,
    Spacer,
    Text,
    Tooltip,
    useColorModeValue,
    useDisclosure,
    useToast,
} from '@chakra-ui/react';
import {BiEditAlt, BiInfoCircle, BiShareAlt, BiTrash,} from "react-icons/bi";
import {useRef} from "react";
import {useNavigate} from "react-router-dom";


const ProjectCard = ({id, name, description, jwtToken}) => {

    const navigate = useNavigate();
    const {isOpen, onOpen, onClose} = useDisclosure();
    const cancelRef = useRef();
    const toast = useToast();

    const deleteProject = () => {
        fetch(`http://localhost:8080/api/projects/${id}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json', "Authorization": "Bearer " + jwtToken},
            credentials: 'include',
        }).then(response => {
            if (!response.ok) {
                toast({
                    title: 'Error!',
                    description: "Error occurred while deleting the project.",
                    status: 'error',
                    duration: 7000,
                    isClosable: true,
                });
                throw new Error("error");
            } else {
                toast({
                    title: 'Successfully deleted!',
                    status: 'success',
                    duration: 7000,
                    isClosable: true,
                });
                onClose();
                navigate("/projects");
            }
        }).catch(err => {
            console.log(err);
        })
    }


    return (
        <>
            <Box
                as={'div'}
                maxW={{base: 'full', md: '275px',}}
                minH={{base: 'full', md: '200px'}}
                maxH={{base: 'full', md: '275px',}}
                w={'full'}
                h={'full'}
                borderWidth='1px'
                borderRadius='lg'
                overflow='hidden'
                p={5}>
                <Flex direction={'column'} spacing={'4px'} height='100%' align={{base: 'center', md: 'start'}}>
                    <Heading
                        fontWeight={'400'}
                        fontSize={{base: '1xl', sm: '2xl', md: '2xl'}}
                        lineHeight={'100%'}
                        textAlign={'start'}
                        paddingBottom={2}>
                        <Text as={'span'} color={useColorModeValue('teal.500', 'teal.200')}>
                            {name}
                        </Text>
                    </Heading>
                    <Text fontSize={'md'}
                          lineHeight={'110%'}
                          color={useColorModeValue('gray.700', 'gray.100')}
                          paddingTop={'2'}
                          paddingBottom={'10'}>
                        6.08.2023
                    </Text>
                    <Spacer/>
                    <Flex direction={'row'} spacing={'4px'} width='100%' justify={'center'}>
                        <ButtonGroup size='base' isAttached variant='outline'>
                            <Tooltip label={description}
                                     bg={useColorModeValue('gray.100', 'gray.700')}
                                     color={useColorModeValue('black.800', 'white.500')}
                                     borderRadius='lg'
                                     padding={'3'}
                                     openDelay={500}>
                                <IconButton
                                    aria-label='Info'
                                    padding={'2'}
                                    icon={<Icon as={BiInfoCircle} minH={'7'} minW={'7'}
                                                color={useColorModeValue('blue.500', 'blue.200')}/>}/>
                            </Tooltip>
                            <Tooltip label='Share'
                                     bg={useColorModeValue('gray.100', 'gray.700')}
                                     color={useColorModeValue('black.800', 'white.500')}
                                     borderRadius='lg'
                                     padding={'3'}
                                     openDelay={500}>
                                <IconButton
                                    aria-label='Share'
                                    padding={'2'}
                                    icon={<Icon as={BiShareAlt} minH={'7'} minW={'7'}
                                                color={useColorModeValue('green.500', 'green.200')}/>}/>
                            </Tooltip>
                            <Tooltip label='Edit'
                                     bg={useColorModeValue('gray.100', 'gray.700')}
                                     color={useColorModeValue('black.800', 'white.500')}
                                     borderRadius='lg'
                                     padding={'3'}
                                     openDelay={500}>
                                <IconButton
                                    aria-label='Edit'
                                    padding={'2'}
                                    icon={<Icon as={BiEditAlt} minH={'7'} minW={'7'}
                                                color={useColorModeValue('yellow.500', 'yellow.200')}/>}/>
                            </Tooltip>
                            <Tooltip label='Delete'
                                     bg={useColorModeValue('gray.100', 'gray.700')}
                                     color={useColorModeValue('black.800', 'white.500')}
                                     borderRadius='lg'
                                     padding={'3'}
                                     openDelay={500}>
                                <IconButton
                                    aria-label='Delete'
                                    padding={'2'}
                                    icon={<Icon as={BiTrash} minH={'7'} minW={'7'}
                                                color={useColorModeValue('red.500', 'red.200')}/>}
                                    onClick={onOpen}
                                />
                            </Tooltip>
                        </ButtonGroup>
                    </Flex>
                </Flex>
            </Box>
            <AlertDialog
                leastDestructiveRef={cancelRef}
                isOpen={isOpen}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Delete {name} ?
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure? You can't undo this action afterwards.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme='red' onClick={deleteProject} ml={3}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>

            </AlertDialog>

        </>
    )
};
export default ProjectCard;
