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
    let checkedAlternatives = props.categories
        .find(c => c.id === props.currentCategoryId)
        ?.rankings
        .filter(ranking => ranking.reference_ranking === props.id)
        .map(ranking => ranking.alternative);

    const handleCheck = (event, alternativeId) => {
        if (!event.target.checked) {
            checkedAlternatives = checkedAlternatives.filter(item => item !== alternativeId);
        } else {
            checkedAlternatives = [...checkedAlternatives, alternativeId];
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        props.setCategories(pCategories => pCategories.map(category => {
            if (category.id === props.currentCategoryId) {
                return {
                    ...category,
                    rankings: category.rankings.map(ranking => {
                        if (checkedAlternatives.some(item => item === ranking.alternative)) {
                            return {
                                ...ranking, reference_ranking: props.id,
                            };
                        }
                        if (!checkedAlternatives.some(item => item === ranking.alternative) && props.id === ranking.reference_ranking) {
                            return {
                                ...ranking, reference_ranking: 0,
                            }
                        }
                        return ranking;
                    })
                }
            }
            return category;
        }));

        onClose();
    }

    return (
        <>
            <Box
                mx={1}
                my={3}
                borderWidth={useColorModeValue('3px', '1px')}
                borderRadius={'lg'}
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
                            onClick={props.deleteRank}
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
                        mx={'auto'}
                        my={2}
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
                            {props.categories
                                .find(c => c.id === props.currentCategoryId)
                                ?.rankings
                                .map((ranking, index) => (
                                    <Checkbox
                                        my={1}
                                        colorScheme={'teal'}
                                        isDisabled={ranking.reference_ranking !== 0 && ranking.reference_ranking !== props.id}
                                        onChange={(event) => handleCheck(event, ranking.alternative)}
                                        defaultChecked={ranking.reference_ranking === props.id}
                                        key={index}
                                    >{props.alternatives.find(alt => alt.id === ranking.alternative).name}</Checkbox>))}
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