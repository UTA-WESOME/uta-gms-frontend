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
import CustomTooltip from "../../../CustomTooltip.jsx";
import { HiOutlineSwitchVertical } from "react-icons/hi";

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
                <CustomTooltip
                    label={`Click to change to ${pairwiseMode ? 'Reference ranking' : 'Pairwise comparisons'}`}
                    openDelay={10}
                >
                    <Button
                        colorScheme={'teal'}
                        onClick={onOpen}
                        rightIcon={<HiOutlineSwitchVertical/>}
                    >
                        {pairwiseMode ? 'Pairwise comparisons' : 'Reference ranking'}
                    </Button>
                </CustomTooltip>
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