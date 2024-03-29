import { useState } from "react";
import {
    Button,
    ButtonGroup,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    HStack,
    IconButton,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
    Spacer,
    Text,
    useDisclosure,
    VStack
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import * as c from "../../../../../config.js";

const PairwiseComparisonsMobile = ({
                                       alternatives,
                                       categories,
                                       currentCategoryId,
                                       setCategories,
                                       addPairwiseComparison,
                                       deletePairwiseComparison
                                   }) => {
    const [currentPairwiseComparison, setCurrentPairwiseComparison] = useState({
        id: 0,
        type: c.Preferences.Comparisons.PairwiseComparisons.types.preference,
        alternative_1: 0,
        alternative_2: 0
    });
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleChangeAlternative = (alternativeNumber, alternativeId) => {
        setCurrentPairwiseComparison({
            ...currentPairwiseComparison,
            [`alternative_${alternativeNumber}`]: alternativeId,
        })
    }

    const handleChangeType = (newType) => {
        setCurrentPairwiseComparison({
            ...currentPairwiseComparison,
            type: newType
        })
    }

    const submitData = (event) => {
        event.preventDefault();

        setCategories(categories.map(category => {
            if (category.id === currentCategoryId)
                return {
                    ...category,
                    pairwise_comparisons: category.pairwise_comparisons.map(pc => {
                        if (pc.id === currentPairwiseComparison.id)
                            return currentPairwiseComparison;
                        return pc;
                    })
                }
            return category
        }))
        onClose();
    }

    return (
        <>
            <Flex
                direction={'column'}
                spacing={4}
                pt={3}
            >
                {categories
                    .find(c => c.id === currentCategoryId)
                    ?.pairwise_comparisons
                    .map((pc, index) => (
                        <HStack
                            borderTopWidth={'1px'}
                            borderBottomWidth={
                                index === categories.find(c => c.id === currentCategoryId)?.pairwise_comparisons.length - 1
                                    ?
                                    '1px'
                                    :
                                    '0px'
                            }
                            p={2}
                            key={index}
                        >
                            <Text isTruncated>Comparison {index + 1}</Text>
                            <Spacer/>
                            <IconButton
                                aria-label={'edit-pairwise-comparison'}
                                icon={<EditIcon/>}
                                onClick={() => {
                                    setCurrentPairwiseComparison(pc);
                                    onOpen();
                                }}
                            />
                            <IconButton
                                color={'red.300'}
                                aria-label={'delete-pairwise-comparison'}
                                icon={<DeleteIcon/>}
                                onClick={() => deletePairwiseComparison(pc.id)}
                            />
                        </HStack>
                    ))}
            </Flex>

            <Button my={4} colorScheme={'teal'} onClick={addPairwiseComparison} variant='outline'>
                New comparison
            </Button>

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay/>
                <ModalContent mx={'15px'} as={"form"} onSubmit={submitData}>
                    <ModalHeader>Edit intensity</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody textAlign={'center'}>
                        <VStack spacing={'15px'}>
                            <Heading colorScheme={'teal'}
                                     size={'xl'}>Comparison {currentPairwiseComparison.id}</Heading>
                            <FormControl>
                                <FormLabel fontSize={'sm'}>Alternative 1</FormLabel>
                                <Select
                                    value={currentPairwiseComparison.alternative_1}
                                    onChange={(event) => handleChangeAlternative(1, parseInt(event.target.value))}
                                >
                                    {alternatives.map(alternative => (
                                        <option value={alternative.id} key={alternative.id}>
                                            {alternative.name}
                                        </option>
                                    ))}
                                </Select>
                            </FormControl>
                            <FormControl>
                                <FormLabel fontSize={'sm'}>Type</FormLabel>
                                <Select
                                    value={currentPairwiseComparison.type}
                                    onChange={(event) => handleChangeType(event.target.value)}
                                >
                                    <>
                                        {Object.entries(c.Preferences.Comparisons.PairwiseComparisons.types).map(([type, preference]) => (
                                            <option
                                                value={preference}
                                                key={type}
                                            >
                                                {preference}
                                            </option>
                                        ))}
                                    </>
                                </Select>
                            </FormControl>
                            <FormControl>
                                <FormLabel fontSize={'sm'}>Alternative 2</FormLabel>
                                <Select
                                    value={currentPairwiseComparison.alternative_2}
                                    onChange={(event) => handleChangeAlternative(2, parseInt(event.target.value))}
                                >
                                    {alternatives.map(alternative => (
                                        <option value={alternative.id} key={alternative.id}>
                                            {alternative.name}
                                        </option>
                                    ))}
                                </Select>
                            </FormControl>
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <ButtonGroup pt={"1rem"}>
                            <Button colorScheme={"teal"} type={"submit"}>Confirm</Button>
                            <Button onClick={onClose}>Back</Button>
                        </ButtonGroup>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default PairwiseComparisonsMobile;