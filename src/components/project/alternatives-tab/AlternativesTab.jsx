import { Show } from "@chakra-ui/react";
import AlternativesTabMobile from "./AlternativesTabMobile.jsx";
import AlternativesTabDesktop from "./AlternativesTabDesktop.jsx";

const AlternativesTab = ({ alternatives, setAlternatives, criteria, setPreferenceIntensities }) => {

    const addAlternative = () => {
        // get max alternative id
        let maxId = Math.max(...alternatives.map(item => item.id));
        maxId = maxId === -Infinity ? 0 : maxId;

        setAlternatives(pAlternatives => [...pAlternatives,
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
            }])
    }

    const deleteAlternative = (id) => {
        setAlternatives(pAlternatives => pAlternatives.filter(alt => alt.id !== id));

        setPreferenceIntensities(pPreferenceIntensities =>
            pPreferenceIntensities.filter(item =>
                (
                    item.alternative_1 !== id &&
                    item.alternative_2 !== id &&
                    item.alternative_3 !== id &&
                    item.alternative_4 !== id
                )
            )
        )
    }

    return (
        <>

            {/*DESKTOP*/}
            <Show above={'lg'}>
                <AlternativesTabDesktop alternatives={alternatives}
                                        setAlternatives={setAlternatives}
                                        criteria={criteria}
                                        addAlternative={addAlternative}
                                        deleteAlternative={deleteAlternative}/>
            </Show>

            {/*MOBILE*/}
            <Show below={'991px'}>
                <AlternativesTabMobile alternatives={alternatives}
                                       setAlternatives={setAlternatives}
                                       criteria={criteria}
                                       addAlternative={addAlternative}
                                       deleteAlternative={deleteAlternative}/>
            </Show>

        </>

    )
}

export default AlternativesTab;