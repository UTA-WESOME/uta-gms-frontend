import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
    Flex,
    Heading,
    Icon,
    IconButton,
    Link,
    LinkBox,
    LinkOverlay,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Spacer,
    Text,
    useBoolean,
    useColorModeValue,
    useDisclosure,
    useToast,
} from '@chakra-ui/react';
import { useRef } from "react";
import { BiEditAlt, BiInfoCircle, BiSolidHourglass, BiTrash, } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import CustomTooltip from "../utils/CustomTooltip.jsx";


const ProjectCard = ({ id, name, createdAt, description }) => {

    const navigate = useNavigate();
    const { isOpen: isOpenInfo, onOpen: onOpenInfo, onClose: onCloseInfo } = useDisclosure();
    const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure();
    const [hoveredOnCard, setHoveredOnCard] = useBoolean();
    const [hoveredOnButtons, setHoveredOnButtons] = useBoolean();
    const cancelRef = useRef();
    const toast = useToast();

    const deleteProject = () => {
        fetch(`${import.meta.env.VITE_BACKEND}/api/projects/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        }).then(response => {
            if (!response.ok) {
                toast({
                    title: 'Error!',
                    description: "Error occurred while deleting the project.",
                    status: 'error',
                    duration: 5000,
                    isClosable: true,
                });
                throw new Error("error");
            } else {
                navigate(0);
            }
        }).catch(err => {
            console.log(err);
        })
    }

    const shareProject = () => {
        toast({
            title: 'Wow!',
            description: "You tried to share the project! The feature is yet to be implemented. ",
            status: 'info',
            duration: 5000,
            isClosable: true,
        });
    }

    return (
        <>
            <LinkBox
                as={'div'}
                maxW={{ base: 'full', sm: '70%', md: '275px' }}
                minH={{ base: 'full', md: '200px' }}
                maxH={{ base: 'full', md: '275px' }}
                w={'full'}
                h={'full'}
                borderWidth='1px'
                borderRadius='lg'
                overflow='hidden'
                borderColor={useColorModeValue('gray.300', 'gray.600')}
                _hover={{ bg: useColorModeValue('gray.100', 'gray.700') }}
                onMouseEnter={setHoveredOnCard.on}
                onMouseLeave={setHoveredOnCard.off}
                p={5}>
                <Flex direction={'column'} spacing={'4px'} height='100%' align={{ base: 'center', md: 'start' }}>
                    <Heading
                        fontWeight={'400'}
                        fontSize={{ base: '1xl', sm: '2xl', md: '2xl' }}
                        lineHeight={'100%'}
                        textAlign={'start'}
                        paddingBottom={2}
                    >
                        <LinkOverlay
                            as={Link}
                            href={`/projects/${id}`}
                            style={{ textDecoration: 'none' }}
                        >
                            <Text as={'span'} color={useColorModeValue('teal.500', 'teal.200')}>
                                {name}
                            </Text>
                        </LinkOverlay>
                    </Heading>
                    <Text fontSize={'md'}
                          lineHeight={'110%'}
                          color={useColorModeValue('gray.700', 'gray.100')}
                          paddingTop={'2'}
                          paddingBottom={'10'}>
                        {new Date(createdAt).toISOString().split('T')[0].split('-').reverse().join('.')}
                    </Text>
                    <Spacer/>

                    <Text
                        as={'div'}
                        justify={'center'}
                        fontSize={'md'}
                        lineHeight={'110%'}
                        color={useColorModeValue('gray.400', 'gray.400')}
                        paddingBottom={'2'}
                        mx={'auto'}>
                        {(hoveredOnCard && !hoveredOnButtons) ? "Click to open project" : <span>&nbsp;&nbsp;</span>}
                    </Text>

                    <Flex
                        direction={'row'}
                        spacing={'4px'}
                        justify={'center'}
                        mx={'auto'}
                        p={1}
                        borderWidth={'1px'}
                        borderRadius={'lg'}
                        borderColor={useColorModeValue('gray.300', 'gray.600')}
                        onMouseEnter={setHoveredOnButtons.on}
                        onMouseLeave={setHoveredOnButtons.off}
                    >
                        <CustomTooltip label='Info'>
                            <IconButton
                                aria-label='Info'
                                padding={'2'}
                                background={'transparent'}
                                borderRadius={'full'}
                                _hover={{ bg: useColorModeValue('gray.300', 'gray.600') }}
                                icon={<Icon as={BiInfoCircle} minH={'7'} minW={'7'}
                                            color={useColorModeValue('blue.500', 'blue.200')}/>}
                                onClick={onOpenInfo}
                            />
                        </CustomTooltip>
                        <CustomTooltip label='Jobs'>
                            <IconButton
                                aria-label='Share'
                                padding={'2'}
                                background={'transparent'}
                                borderRadius={'full'}
                                _hover={{ bg: useColorModeValue('gray.300', 'gray.600') }}
                                icon={<Icon as={BiSolidHourglass} minH={'7'} minW={'7'}
                                            color={useColorModeValue('green.500', 'green.200')}/>}
                                onClick={() => navigate(`/jobs?default_project=${id}`)}
                            />
                        </CustomTooltip>
                        <CustomTooltip label='Edit'>
                            <IconButton
                                aria-label='Edit'
                                padding={'2'}
                                background={'transparent'}
                                borderRadius={'full'}
                                _hover={{ bg: useColorModeValue('gray.300', 'gray.600') }}
                                icon={<Icon as={BiEditAlt} minH={'7'} minW={'7'}
                                            color={useColorModeValue('yellow.500', 'yellow.200')}/>}
                                onClick={() => navigate(`/projects/${id}/edit`)}
                            />
                        </CustomTooltip>
                        <CustomTooltip label='Delete'>
                            <IconButton
                                aria-label='Delete'
                                padding={'2'}
                                background={'transparent'}
                                borderRadius={'full'}
                                _hover={{ bg: useColorModeValue('gray.300', 'gray.600') }}
                                icon={<Icon as={BiTrash} minH={'7'} minW={'7'}
                                            color={useColorModeValue('red.500', 'red.200')}/>}
                                onClick={onOpenDelete}
                            />
                        </CustomTooltip>
                    </Flex>


                </Flex>
            </LinkBox>

            <AlertDialog
                leastDestructiveRef={cancelRef}
                isOpen={isOpenDelete}
                onClose={onCloseDelete}
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
                            <Button ref={cancelRef} onClick={onCloseDelete}>
                                Cancel
                            </Button>
                            <Button colorScheme='red' onClick={deleteProject} ml={3}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>

            <Modal isOpen={isOpenInfo} onClose={onCloseInfo}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Project description</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        {description}
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme={useColorModeValue('white.500', 'black.800')}
                            bg={useColorModeValue('teal.500', 'teal.200')}
                            _hover={{ bg: useColorModeValue('teal.200', 'teal.500') }}
                            mr={3}
                            onClick={onCloseInfo}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </>
    )
};
export default ProjectCard;
