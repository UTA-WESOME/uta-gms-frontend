import { useRef } from "react";
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
    useDisclosure,
    VStack
} from "@chakra-ui/react";
import ReferenceRanking from "./ranking-tab/ReferenceRanking.jsx";
import PairwiseComparisons from "./pairwise/PairwiseComparisons.jsx";

const ComparisonsTab = ({
                            alternatives,
                            setAlternatives,
                            pairwiseComparisons,
                            setPairwiseComparisons,
                            pairwiseMode,
                            setPairwiseMode
                        }) => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef();

    const handleChangePairwise = () => {
        setPairwiseMode(!pairwiseMode);
        onClose();
    }

    return (
        <>
            <VStack>
                <Button
                    colorScheme={'teal'} variant='outline'
                    onClick={onOpen}
                >
                    Change to {pairwiseMode ? 'reference ranking' : 'pairwise comparisons'}
                </Button>
            </VStack>

            {!pairwiseMode ?
                <ReferenceRanking
                    alternatives={alternatives}
                    setAlternatives={setAlternatives}
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
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Change to {pairwiseMode ? 'reference ranking' : 'pairwise comparisons'}?
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure? Changing
                            to {pairwiseMode ? 'reference ranking' : 'pairwise comparisons'} means
                            your project will not use the {pairwiseMode ? 'pairwise comparisons' : 'reference ranking'}.
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme={'teal'} onClick={handleChangePairwise} ml={3}>
                                Change
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>

        </>

    )

}

export default ComparisonsTab;