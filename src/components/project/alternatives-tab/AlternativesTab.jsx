import { Button, ButtonGroup, Show } from "@chakra-ui/react";
import AlternativesTabMobile from "./AlternativesTabMobile.jsx";
import AlternativesTabDesktop from "./AlternativesTabDesktop.jsx";

const AlternativesTab = ({ alternatives, setAlternatives, criteria, setCategories }) => {

    const addAlternative = () => {
        // get max alternative id
        let maxId = Math.max(...alternatives.map(item => item.id));
        maxId = maxId === -Infinity ? 0 : maxId;

        // update alternatives
        setAlternatives([...alternatives,
            {
                id: maxId + 1,
                name: "Alternative name",
                reference_ranking: 0,
                ranking: 0,
                performances: criteria.map(item => {
                    return {
                        value: 0,
                        criterion: item.id
                    }
                })
            }
        ])

        // update rankings in categories
        setCategories(pCategories => pCategories.map(category => {
            return {
                ...category,
                rankings: [...category.rankings, {
                    reference_ranking: 0,
                    ranking: 0,
                    alternative: maxId + 1
                }]
            }
        }))

    }

    const deleteAlternative = (id) => {
        // update alternatives
        setAlternatives(pAlternatives => pAlternatives.filter(alt => alt.id !== id));

        // update rankings in categories
        setCategories(pCategories => pCategories.map(category => {
            return {
                ...category,
                rankings: category.rankings.filter(r => r.alternative !== id)
            }
        }))
    }

    return (
        <>

            {/*DESKTOP*/}
            <Show above={'lg'}>
                <AlternativesTabDesktop alternatives={alternatives}
                                        setAlternatives={setAlternatives}
                                        criteria={criteria}
                                        deleteAlternative={deleteAlternative}/>
            </Show>

            {/*MOBILE*/}
            <Show below={'991px'}>
                <AlternativesTabMobile alternatives={alternatives}
                                       setAlternatives={setAlternatives}
                                       criteria={criteria}
                                       deleteAlternative={deleteAlternative}/>
            </Show>

            {/*BUTTONS*/}
            <ButtonGroup mx={4} my={4}>
                <Button colorScheme={'teal'} onClick={addAlternative} variant='outline'>
                    New alternative
                </Button>
            </ButtonGroup>

        </>

    )
}

export default AlternativesTab;