import { Show, useToast } from "@chakra-ui/react";
import PairwiseComparisonsDesktop from "./PairwiseComparisonsDesktop.jsx";
import PairwiseComparisonsMobile from "./PairwiseComparisonsMobile.jsx";

const PairwiseComparisons = ({ alternatives, pairwiseComparisons, setPairwiseComparisons }) => {

    const toast = useToast();
    const toastId = "toast-project-pairwise-comparisons-add"

    const addPairwiseComparison = () => {
        if (alternatives.length === 0) {
            if (!toast.isActive(toastId)) {
                toast({
                    id: toastId,
                    title: 'Warning!',
                    description: "You need to add alternatives first.",
                    status: 'warning',
                    duration: 6000,
                    isClosable: true,
                })
            }
            return;
        }

        // get max pairwise comparison id
        let maxId = Math.max(...pairwiseComparisons.map(item => item.id));
        maxId = maxId === -Infinity ? 0 : maxId;
        // get first alternative
        // we can be sure that there is at least one alternative because of the if statement at the beginning of the function
        let firstAltId = alternatives[0].id

        setPairwiseComparisons(pPairwiseComparisons => [...pPairwiseComparisons, {
            id: maxId + 1,
            alternative_1: firstAltId,
            alternative_2: firstAltId,
            type: 'preference'
        }])
    }

    const deletePairwiseComparison = (id) => {
        setPairwiseComparisons(p => p.filter(item => item.id !== id));
    }

    return (
        <>
            {/*DESKTOP*/}
            <Show above={'lg'}>
                <PairwiseComparisonsDesktop
                    alternatives={alternatives}
                    pairwiseComparisons={pairwiseComparisons}
                    setPairwiseComparisons={setPairwiseComparisons}
                    addPairwiseComparison={addPairwiseComparison}
                    deletePairwiseComparison={deletePairwiseComparison}
                />
            </Show>

            {/*MOBILE*/}
            <Show below={'991px'}>
                <PairwiseComparisonsMobile
                    alternatives={alternatives}
                    pairwiseComparisons={pairwiseComparisons}
                    setPairwiseComparisons={setPairwiseComparisons}
                    addPairwiseComparison={addPairwiseComparison}
                    deletePairwiseComparison={deletePairwiseComparison}
                />
            </Show>
        </>
    )


}

export default PairwiseComparisons;