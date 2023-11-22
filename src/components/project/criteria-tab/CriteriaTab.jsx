import { Button, ButtonGroup, Show } from "@chakra-ui/react";
import CriteriaTabMobile from "./CriteriaTabMobile.jsx";
import CriteriaTabDesktop from "./CriteriaTabDesktop.jsx";


const CriteriaTab = ({
                         criteria,
                         setCriteria,
                         setAlternatives,
                         setCategories,
                         setPreferenceIntensities
                     }) => {

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

        // set alternatives - performances
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

        // set criterion_categories - by default add the criterion to the Root category
        setCategories(pCategories => pCategories.map((category, index) => {
            if (index === 0)
                return {
                    ...category,
                    criterion_categories: [...category.criterion_categories, { criterion: maxId + 1 }]
                }
            return category;
        }))

    }

    const deleteCriterion = (id) => {
        // set criteria
        setCriteria(previousCriteria => previousCriteria.filter(item => item.id !== id));

        // set alternatives - delete performances
        setAlternatives(pAlternatives => pAlternatives.map(alternative => ({
            ...alternative,
            performances: alternative.performances.filter(performance => performance.criterion !== id)
        })))

        // set categories - delete criterion_categories
        setCategories(pCategories => pCategories.map(category => ({
            ...category,
            criterion_categories: category.criterion_categories.filter(cc => cc.criterion !== id)
        })))

        // set preference intensities
        setPreferenceIntensities(pPreferenceIntensities => pPreferenceIntensities.filter(pi => pi.criterion !== id))
    }

    return (
        <>
            {/*DESKTOP*/}
            <Show above={'lg'}>
                <CriteriaTabDesktop
                    criteria={criteria}
                    setCriteria={setCriteria}
                    deleteCriterion={deleteCriterion}
                />
            </Show>

            {/*MOBILE*/}
            {/*TODO: change 991px to const, can't be 'md' because mobile and desktop are both seen then*/}
            <Show below={'991px'}>
                <CriteriaTabMobile
                    criteria={criteria}
                    setCriteria={setCriteria}
                    deleteCriterion={deleteCriterion}
                />
            </Show>

            {/*BUTTONS*/}
            <ButtonGroup mx={4} my={4}>
                <Button colorScheme={'teal'} onClick={addCriterion} variant='outline'>
                    New criterion
                </Button>
            </ButtonGroup>
        </>
    )
}

export default CriteriaTab;
