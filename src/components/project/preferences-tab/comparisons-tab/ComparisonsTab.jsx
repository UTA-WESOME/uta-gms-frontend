import { useRef, useState } from "react";
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button,
    Text,
    useDisclosure,
    VStack
} from "@chakra-ui/react";
import RankingTab from "./ranking-tab/RankingTab.jsx";

const ComparisonsTab = ({ alternatives, setAlternatives }) => {

    const [isPairwise, setIsPairwise] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef();

    const handleChangePairwise = () => {
        setIsPairwise(!isPairwise);
        onClose();
    }

    return (
        <>
            <VStack>
                <Button
                    colorScheme={'teal'} variant='outline'
                    onClick={onOpen}
                >
                    Change to {isPairwise ? 'reference ranking' : 'pairwise comparisons'}
                </Button>
            </VStack>

            {!isPairwise ?
                <RankingTab
                    alternatives={alternatives}
                    setAlternatives={setAlternatives}
                />
                :
                <Text>Pairwise comparisons!</Text>

            }

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Change to {isPairwise ? 'reference ranking' : 'pairwise comparisons'}?
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure? Changing to {isPairwise ? 'reference ranking' : 'pairwise comparisons'} means
                            your project will not use the {isPairwise ? 'pairwise comparisons' : 'reference ranking'}.
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