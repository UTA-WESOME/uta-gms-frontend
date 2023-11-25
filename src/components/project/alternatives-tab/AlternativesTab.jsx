import { Button, ButtonGroup, Show } from "@chakra-ui/react";
import AlternativesTabMobile from "./AlternativesTabMobile.jsx";
import AlternativesTabDesktop from "./AlternativesTabDesktop.jsx";
import * as c from "./../../../config.js";

const AlternativesTab = ({ alternatives, setAlternatives, criteria, setCategories, setPreferenceIntensities }) => {

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
        setCategories(pCategories => pCategories.map(category => ({
            ...category,
            rankings: category.rankings.filter(r => r.alternative !== id)
        })))

        // update pairwise_comparisons in categories
        setCategories(pCategories => pCategories.map(category => ({
            ...category,
            pairwise_comparisons: category.pairwise_comparisons.filter(pc => pc.alternative_1 !== id && pc.alternative_2 !== id)
        })))

        // update preference_intensities
        setPreferenceIntensities(pPreferenceIntensities => pPreferenceIntensities.filter(pi =>
            (
                pi.alternative_1 !== id &&
                pi.alternative_2 !== id &&
                pi.alternative_3 !== id &&
                pi.alternative_4 !== id
            )
        ))
    }

    return (
        <>

            {/*DESKTOP*/}
            <Show above={c.Alternatives.minWidthDesktop}>
                <AlternativesTabDesktop
                    alternatives={alternatives}
                    setAlternatives={setAlternatives}
                    criteria={criteria}
                    deleteAlternative={deleteAlternative}
                />
            </Show>

            {/*MOBILE*/}
            <Show below={c.Alternatives.maxWidthMobile}>
                <AlternativesTabMobile
                    alternatives={alternatives}
                    setAlternatives={setAlternatives}
                    criteria={criteria}
                    deleteAlternative={deleteAlternative}
                />
            </Show>

            {/*BUTTONS*/}
            <ButtonGroup mx={{base: 'auto', md: 4}} my={4}>
                <Button colorScheme={'teal'} onClick={addAlternative} variant='outline'>
                    New alternative
                </Button>
            </ButtonGroup>

        </>

    )
}

export default AlternativesTab;