import {
    Box,
    Button,
    ButtonGroup,
    Checkbox,
    Flex,
    IconButton,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useColorModeValue,
    useDisclosure
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";


const RankMobile = (props) => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    // checkAlternatives holds ids of alternatives which are checked in modal form
    let checkedAlternatives = props.alternatives
        .filter(alt => alt.reference_ranking === props.id)
        .map(alt => alt.id);

    const handleDeleteRank = () => {
        // delete rank
        props.setRanks(pRanks => pRanks.filter(rank => rank !== props.id));

        // update alternatives that have this rank
        props.setAlternatives(pAlternatives => pAlternatives.map(pAlternative => {
            if (pAlternative.reference_ranking === props.id) {
                return {
                    ...pAlternative, reference_ranking: 0,
                }
            }
            return pAlternative
        }))
    }

    const handleCheck = (event, alternativeId) => {
        console.log(checkedAlternatives);
        if (!event.target.checked) {
            checkedAlternatives = checkedAlternatives.filter(item => item !== alternativeId);
        } else {
            checkedAlternatives = [...checkedAlternatives, alternativeId];
        }
        console.log(checkedAlternatives);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        props.setAlternatives(pAlternatives => pAlternatives.map(alternative => {
            if (checkedAlternatives.some(item => item === alternative.id)) {
                return {
                    ...alternative, reference_ranking: props.id,
                };
            }
            if (!checkedAlternatives.some(item => item === alternative.id) && props.id === alternative.reference_ranking) {
                return {
                    ...alternative, reference_ranking: 0,
                }
            }
            return alternative;
        }));

        onClose();
    }

    return (<>
            <Box
                borderWidth={useColorModeValue('3px', '1px')}
                borderRadius={'lg'}
                mx={1} my={3}
                bg={useColorModeValue('gray.50', 'gray.700')}
            >
                <Flex justify={'center'}>
                    <Box w={'100%'}/>
                    <Flex w={'100%'} justify={'center'} m={1}>
                        <Text my={2}>Rank {props.id}</Text>
                    </Flex>
                    <Flex w={'100%'}>
                        <IconButton
                            color={'red.300'} bg={useColorModeValue('gray.50', 'gray.700')}
                            aria-label={'delete-rank'}
                            icon={<DeleteIcon/>}
                            ml={'auto'} my={1} mr={1}
                            onClick={handleDeleteRank}
                        />
                    </Flex>
                </Flex>
                <hr/>
                {props.children}
                <Flex w={'100%'}>
                    <Button
                        size={'sm'}
                        variant={'outline'}
                        colorScheme={'teal'}
                        mx={'auto'} my={2}
                        onClick={onOpen}
                    >
                        Edit alternatives
                    </Button>
                </Flex>
            </Box>


            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay/>
                <ModalContent
                    mx={'15px'}
                    as={"form"}
                    onSubmit={handleSubmit}
                >
                    <ModalHeader>Rank {props.id}</ModalHeader>
                    <ModalCloseButton/>

                    <ModalBody>
                        <Flex spacing={"15px"} direction={'column'}>
                            {props.alternatives.map(alternative => (<Checkbox
                                    my={1}
                                    colorScheme={'teal'}
                                    isDisabled={alternative.reference_ranking !== 0 && alternative.reference_ranking !== props.id}
                                    onChange={(event) => handleCheck(event, alternative.id)}
                                    defaultChecked={alternative.reference_ranking === props.id}
                                >{alternative.name}</Checkbox>))}
                        </Flex>

                        <ModalFooter px={0}>
                            <ButtonGroup pt={"1rem"}>
                                <Button colorScheme={"teal"} type={"submit"}>Confirm</Button>
                                <Button onClick={onClose}>Back</Button>
                            </ButtonGroup>
                        </ModalFooter>

                    </ModalBody>
                </ModalContent>
            </Modal>


        </>)
}

export default RankMobile;