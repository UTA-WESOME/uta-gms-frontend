import { Show } from "@chakra-ui/react";
import CriteriaTabMobile from "./CriteriaTabMobile.jsx";
import CriteriaTabDesktop from "./CriteriaTabDesktop.jsx";


const CriteriaTab = ({ criteria, setCriteria, setAlternatives }) => {

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
    }

    return (
        <>

            {/*DESKTOP*/}
            <Show above={'lg'}>
                <CriteriaTabDesktop criteria={criteria}
                                    setCriteria={setCriteria}
                                    addCriterion={addCriterion}
                                    deleteCriterion={deleteCriterion}/>
            </Show>

            {/*MOBILE*/}
            {/*TODO: change 991px to const, can't be 'md' because mobile and desktop are both seen then*/}
            <Show below={'991px'}>
                <CriteriaTabMobile criteria={criteria}
                                   setCriteria={setCriteria}
                                   addCriterion={addCriterion}
                                   deleteCriterion={deleteCriterion}/>
            </Show>

        </>
    )
}

export default CriteriaTab;
