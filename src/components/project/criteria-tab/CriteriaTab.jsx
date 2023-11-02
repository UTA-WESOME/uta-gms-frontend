import { Button, ButtonGroup, Show, useDisclosure } from "@chakra-ui/react";
import CriteriaTabMobile from "./CriteriaTabMobile.jsx";
import CriteriaTabDesktop from "./CriteriaTabDesktop.jsx";
import CategoriesPanel from "./categories/CategoriesPanel.jsx";
import { useState } from "react";
import EditCriterionCategoriesModal from "./categories/EditCriterionCategoriesModal.jsx";


const CriteriaTab = ({
                         criteria,
                         setCriteria,
                         categories,
                         setCategories,
                         setAlternatives,
                         setPreferenceIntensities
                     }) => {


    const { isOpen: isOpenCategories, onOpen: onOpenCategories, onClose: onCloseCategories } = useDisclosure();
    const { isOpen: isOpenEditCriterion, onOpen: onOpenEditCriterion, onClose: onCloseEditCriterion } = useDisclosure();
    const [currentEditCriterionId, setCurrentEditCriterionId] = useState(0);

    const addCriterion = () => {
        // get max criteria id
        let maxId = Math.max(...criteria.map(item => item.id));
        maxId = maxId === -Infinity ? 0 : maxId;

        // set criteria
        setCriteria(previousCriteria => [...previousCriteria, {
            id: maxId + 1,
            name: "Criterion name",
            gain: true,
            linear_segments: 0,
            criterion_categories: [],
            weight: 1,
        }])

        // set alternatives
        setAlternatives(pAlternatives => {
            return pAlternatives.map(alternative => {
                return {
                    ...alternative,
                    performances: [
                        ...alternative.performances,
                        {
                            value: 0,
                            criterion: maxId + 1,
                        }
                    ]
                }
            })
        })
    }

    const deleteCriterion = (id) => {
        // set criteria
        setCriteria(previousCriteria => previousCriteria.filter(item => item.id !== id));

        // set alternatives
        setAlternatives(pAlternatives => {
            return pAlternatives.map(alternative => {
                return {
                    ...alternative,
                    performances: alternative.performances.filter(performance => performance.criterion !== id)
                }
            })
        })

        // set preferences
        setPreferenceIntensities(pPreferenceIntensities => pPreferenceIntensities.filter(item => item.criterion !== id));
    }

    return (
        <>
            {/*DESKTOP*/}
            <Show above={'lg'}>
                <CriteriaTabDesktop
                    criteria={criteria}
                    setCriteria={setCriteria}
                    categories={categories}
                    setCategories={setCategories}
                    deleteCriterion={deleteCriterion}
                    setCurrentEditCriterionId={setCurrentEditCriterionId}
                    onOpenEditCriterion={onOpenEditCriterion}
                />
            </Show>

            {/*MOBILE*/}
            {/*TODO: change 991px to const, can't be 'md' because mobile and desktop are both seen then*/}
            <Show below={'991px'}>
                <CriteriaTabMobile
                    criteria={criteria}
                    setCriteria={setCriteria}
                    deleteCriterion={deleteCriterion}/>
            </Show>

            {/*CATEGORIES PANEL*/}
            <CategoriesPanel
                isOpen={isOpenCategories}
                onClose={onCloseCategories}
                categories={categories}
                setCategories={setCategories}
                setCriteria={setCriteria}
            />

            {/*EDIT CRITERION CATEGORIES MODAL*/}
            <EditCriterionCategoriesModal
                isOpen={isOpenEditCriterion}
                onClose={onCloseEditCriterion}
                categories={categories}
                criterion={criteria.find(c => c.id === currentEditCriterionId)}
                setCriteria={setCriteria}
            />

            {/*BUTTONS*/}
            <ButtonGroup mx={4} my={4}>
                <Button colorScheme={'teal'} onClick={addCriterion} variant='outline'>
                    New criterion
                </Button>
                <Button colorScheme={'orange'} onClick={onOpenCategories} variant={'outline'}>
                    Categories
                </Button>
            </ButtonGroup>
        </>
    )
}

export default CriteriaTab;
