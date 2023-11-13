import { useRef, useState } from "react";
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
    ButtonGroup,
    Center,
    FormControl,
    FormLabel,
    HStack,
    Select,
    useDisclosure
} from "@chakra-ui/react";
import ReferenceRanking from "./ranking-tab/ReferenceRanking.jsx";
import PairwiseComparisons from "./pairwise/PairwiseComparisons.jsx";
import { HiOutlineSwitchVertical } from "react-icons/hi";

const ComparisonsTab = ({
                            alternatives,
                            setAlternatives,
                            categories,
                            setCategories,
                            pairwiseMode,
                            setPairwiseMode
                        }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef();
    const [currentCategoryId, setCurrentCategoryId] = useState(categories[0].id);

    const handleChangePairwise = () => {
        setPairwiseMode(!pairwiseMode);
        onClose();
    }

    return (
        <>
            <Center>
                <HStack spacing={4}>
                    <FormControl>
                        <FormLabel>Comparisons type</FormLabel>
                        <Button
                            minW={'min-content'}
                            colorScheme={'teal'}
                            onClick={onOpen}
                            rightIcon={<HiOutlineSwitchVertical/>}
                        >
                            {pairwiseMode ? 'Pairwise comparisons' : 'Reference ranking'}
                        </Button>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Category</FormLabel>
                        <Select
                            minW={'200px'}
                            value={categories.find(c => c.id === currentCategoryId).id}
                            onChange={(event) =>
                                setCurrentCategoryId(categories.find(cat => cat.id === parseInt(event.target.value)).id)
                            }
                        >
                            {categories.map(category => (
                                <option value={category.id} key={category.id}>{category.name}</option>
                            ))}
                        </Select>
                    </FormControl>
                </HStack>
            </Center>

            {!pairwiseMode ?
                <ReferenceRanking
                    alternatives={alternatives}
                    setAlternatives={setAlternatives}
                    currentCategoryId={currentCategoryId}
                    categories={categories}
                    setCategories={setCategories}
                />
                :
                <PairwiseComparisons
                    alternatives={alternatives}
                    pairwiseComparisons={pairwiseComparisons}
                    setPairwiseComparisons={setPairwiseComparisons}
                />
            }

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent mx={'15px'}>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Change to {pairwiseMode ? 'Reference ranking' : 'Pairwise comparisons'}?
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure? Changing
                            to {pairwiseMode ? 'Reference ranking' : 'Pairwise comparisons'} means
                            your project will not use the {pairwiseMode ? 'Pairwise comparisons' : 'Reference ranking'}.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <ButtonGroup>
                                <Button colorScheme={'teal'} onClick={handleChangePairwise}>
                                    Change
                                </Button>
                                <Button ref={cancelRef} onClick={onClose}>
                                    Cancel
                                </Button>
                            </ButtonGroup>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>

        </>

    )

}

export default ComparisonsTab;