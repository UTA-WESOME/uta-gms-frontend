import { Show, useToast } from "@chakra-ui/react";
import PairwiseComparisonsDesktop from "./PairwiseComparisonsDesktop.jsx";
import PairwiseComparisonsMobile from "./PairwiseComparisonsMobile.jsx";

const PairwiseComparisons = ({ alternatives, currentCategoryId, categories, setCategories }) => {

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
        let maxId = Math.max(...categories.flatMap(c => c.pairwise_comparisons).map(item => item.id));
        maxId = maxId === -Infinity ? 0 : maxId;
        // get first alternative
        // we can be sure that there is at least one alternative because of the if statement at the beginning of the function
        let firstAltId = alternatives[0].id;

        setCategories(pCategories => pCategories.map((category, index) => {
            if (index === 0)
                return {
                    ...category,
                    pairwise_comparisons: [...category.pairwise_comparisons, {
                        id: maxId + 1,
                        alternative_1: firstAltId,
                        alternative_2: firstAltId,
                        type: 'preference'
                    }]
                }
            return category;
        }))
    }

    const deletePairwiseComparison = (id) => {
        setCategories(pCategories => pCategories.map(category => ({
            ...category,
            pairwise_comparisons: category.pairwise_comparisons.filter(pc => pc.id !== id)
        })));
    }

    return (
        <>
            {/*DESKTOP*/}
            <Show above={'lg'}>
                <PairwiseComparisonsDesktop
                    alternatives={alternatives}
                    currentCategoryId={currentCategoryId}
                    categories={categories}
                    setCategories={setCategories}
                    addPairwiseComparison={addPairwiseComparison}
                    deletePairwiseComparison={deletePairwiseComparison}
                />
            </Show>

            {/*MOBILE*/}
            <Show below={'991px'}>
                <PairwiseComparisonsMobile
                    alternatives={alternatives}
                    addPairwiseComparison={addPairwiseComparison}
                    deletePairwiseComparison={deletePairwiseComparison}
                />
            </Show>
        </>
    )


}

export default PairwiseComparisons;