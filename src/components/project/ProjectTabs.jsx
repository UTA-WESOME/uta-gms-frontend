import { Box, Button, Icon, Tab, TabList, TabPanel, TabPanels, Tabs, useMediaQuery, useToast } from "@chakra-ui/react";
import CriteriaTab from "./CriteriaTab.jsx";
import { useEffect, useState } from "react";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaBalanceScaleLeft, FaList } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import AlternativesTab from "./AlternativesTab.jsx";
import RankingTab from "./RankingTab.jsx";
import { DndContext } from "@dnd-kit/core";


const ProjectTabs = (props) => {

    // criteria and previousCriteria will be compared in submitData
    // criteria holds active data that the user changes
    const [criteria, setCriteria] = useState([]);
    // previousCriteria holds data downloaded from the backend
    const [previousCriteria, setPreviousCriteria] = useState([]);

    // alternatives holds active data that the user changes
    const [alternatives, setAlternatives] = useState([]);
    // previousAlternatives holds data downloaded from the backend
    const [previousAlternatives, setPreviousAlternatives] = useState([]);
    // toSendAlternatives holds data that will be sent to the backend,
    // it has updated data about criterion's id in new performances that were created because a new criterion was added
    let toSendAlternatives = [];


    const [hasLoadedCriteria, setHasLoadedCriteria] = useState(false);
    const [hasLoadedAlternatives, setHasLoadedAlternatives] = useState(false);
    const [isScreenMobile] = useMediaQuery('(max-width: 460px)');
    const navigate = useNavigate();
    const toast = useToast();


    useEffect(() => {

        // get criteria
        fetch(`http://localhost:8080/api/projects/${props.id}/criteria/`, {
            method: "GET",
            credentials: "include"
        }).then(response => {
            if (!response.ok) {
                throw new Error("error getting criteria");
            }
            return response.json();
        }).then(data => {
            setCriteria(data);
            setPreviousCriteria(data);
            setHasLoadedCriteria(true);
        }).catch(err => {
            console.log(err);
        })


        // get alternatives
        fetch(`http://localhost:8080/api/projects/${props.id}/alternatives/`, {
            method: 'GET',
            credentials: 'include',
        }).then(response => {
            if (!response.ok) {
                throw new Error("error getting alternatives");
            }
            return response.json();
        }).then(data => {

            if (data.length === 0) {
                setHasLoadedAlternatives(true);
            } else {
                let waitingArray = data.map(() => true);
                data.forEach((alternative, index) => {

                    fetch(`http://localhost:8080/api/alternatives/${alternative.id}/performances/`, {
                        method: 'GET',
                        credentials: 'include',
                    }).then(response => {
                        if (!response.ok) {
                            throw new Error("error getting performances");
                        }
                        return response.json();
                    }).then(data => {

                        // insert alternative with its performances
                        setAlternatives(pAlternatives => {
                            const foundAlternative = pAlternatives.find(alt => alt.id === alternative.id);
                            if (!foundAlternative) {
                                return [...pAlternatives, {
                                    ...alternative,
                                    performances: data
                                }]
                            } else {
                                return pAlternatives;
                            }
                        });

                        // save state from backend in previousAlternatives variable
                        setPreviousAlternatives(pAlternatives => {
                            const foundAlternative = pAlternatives.find(alt => alt.id === alternative.id);
                            if (!foundAlternative) {
                                return [...pAlternatives, {
                                    ...alternative,
                                    performances: data
                                }]
                            } else {
                                return pAlternatives;
                            }
                        })

                        waitingArray[index] = false;

                        if (waitingArray.every(item => item === false)) {
                            setAlternatives(alternatives =>
                                alternatives.sort((x, y) => (x.name > y.name) ? 1 : ((x.name < y.name) ? -1 : 0))
                            )
                            setHasLoadedAlternatives(true);
                        }

                    })

                })
            }
        }).catch(err => {
            console.log(err);
        })

    }, [])

    const toastSuccess = () => {
        toast({
            title: "Saved!",
            description: `Settings saved!`,
            status: 'success',
            duration: 5000,
            isClosable: true,
        })
    }

    const toastError = (description, duration = 5000) => {
        toast({
            title: "Error!",
            description: description,
            status: 'error',
            duration: duration,
            isClosable: true
        })
    }

    // submitAlternatives sends data about alternatives and performances to the backend using toSendAlternatives global variable
    const submitAlternatives = () => {

        const alternativesToDelete = previousAlternatives.filter(pAlternative =>
            !toSendAlternatives.some(alternative => alternative.id === pAlternative.id)
        );
        let waitingArrayUpdateCreate = toSendAlternatives.map(() => true);
        let waitingArrayDelete = alternativesToDelete.map(() => true);

        // ---------------------------------------------------------------------------------------------------------- //
        // update and create alternatives
        toSendAlternatives.forEach((alternative, indexA) => {
            const matchAlternative = previousAlternatives.find(pAlternative => pAlternative.id === alternative.id);
            if (matchAlternative) {
                // PUT alternative
                fetch(`http://localhost:8080/api/alternatives/${alternative.id}`, {
                    method: 'PUT',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(alternative)
                }).then(response => {
                    if (!response.ok) {
                        toastError(`Alternative ${alternative.name} could not be updated.`);
                        throw new Error(`Alternative ${alternative.name} could not be updated.`);
                    } else {
                        // POST or PUT performances
                        // if the alternative was PUT then it means that its performances should either be:
                        // 1. PUT - their criterion is not new - they have an id from the database
                        // 2. POST - their criterion is new - they don't have an id
                        let waitingPerformances = alternative.performances.map(() => true);
                        alternative.performances.forEach((performance, indexP) => {
                            if (performance?.id !== undefined) {
                                // PUT
                                fetch(`http://localhost:8080/api/performances/${performance.id}`, {
                                    method: 'PUT',
                                    credentials: 'include',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify(performance)
                                }).then(response => {
                                    if (!response.ok) {
                                        toastError(`Performance ${performance.id} could not be updated.`);
                                        throw new Error(`Performance ${performance.id} could not be updated.`);
                                    } else {
                                        waitingPerformances[indexP] = false;
                                        if (waitingPerformances.every(item => item === false)) {
                                            waitingArrayUpdateCreate[indexA] = false;
                                            if (waitingArrayDelete.every(item => item === false)
                                                && waitingArrayUpdateCreate.every(item => item === false)) {
                                                toastSuccess();
                                                navigate('/projects');
                                            }
                                        }
                                    }
                                }).catch(err => {
                                    console.log(err);
                                })
                            } else {
                                // POST
                                fetch(`http://localhost:8080/api/alternatives/${alternative.id}/performances/`, {
                                    method: 'POST',
                                    credentials: 'include',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify(performance)
                                }).then(response => {
                                    if (!response.ok) {
                                        toastError(`Performance ${performance.id} could not be uploaded.`);
                                        throw new Error(`Performance ${performance.id} could not be uploaded.`);
                                    } else {
                                        waitingPerformances[indexP] = false;
                                        if (waitingPerformances.every(item => item === false)) {
                                            waitingArrayUpdateCreate[indexA] = false;
                                            if (waitingArrayDelete.every(item => item === false)
                                                && waitingArrayUpdateCreate.every(item => item === false)) {
                                                toastSuccess();
                                                navigate('/projects');
                                            }
                                        }
                                    }
                                }).catch(err => {
                                    console.log(err);
                                })
                            }
                        })
                    }
                }).catch(err => {
                    console.log(err);
                })
            } else {
                // POST alternative
                fetch(`http://localhost:8080/api/projects/${props.id}/alternatives/`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(alternative)
                }).then(response => {
                    if (!response.ok) {
                        toastError(`Alternative ${alternative.name} could not be uploaded.`);
                        throw new Error(`Alternative ${alternative.name} could not be uploaded.`);
                    }
                    return response.json();
                }).then(data => {

                    // POST performances
                    // if alternative was POSTed then it means that all its performances are new and there is no need to check if they existed before,
                    // they can just be POSTed with the performance's ID got from the backend
                    let waitingPerformances = alternative.performances.map(() => true);
                    alternative.performances.forEach((performance, indexP) => {
                        fetch(`http://localhost:8080/api/alternatives/${data.id}/performances/`, {
                            method: 'POST',
                            credentials: 'include',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(performance)
                        }).then(response => {
                            if (!response.ok) {
                                toastError(`Alternative ${alternative.name} could not be uploaded.`);
                                throw new Error(`Alternative ${alternative.name} could not be uploaded.`);
                            } else {
                                waitingPerformances[indexP] = false;
                                if (waitingPerformances.every(item => item === false)) {
                                    waitingArrayUpdateCreate[indexA] = false;
                                    if (waitingArrayDelete.every(item => item === false)
                                        && waitingArrayUpdateCreate.every(item => item === false)) {
                                        toastSuccess();
                                        navigate('/projects');
                                    }
                                }
                            }
                        })
                    })
                }).catch(err => {
                    console.log(err);
                })
            }
        })

        // ---------------------------------------------------------------------------------------------------------- //
        // delete alternatives
        alternativesToDelete.forEach((alternativeToDelete, index) => {
            // DELETE
            fetch(`http://localhost:8080/api/alternatives/${alternativeToDelete.id}`, {
                method: 'DELETE',
                credentials: 'include'
            }).then(response => {
                if (!response.ok) {
                    toastError(`Alternative ${alternativeToDelete.name} could not be deleted!`);
                    throw new Error(`Alternative ${alternativeToDelete.name} could not be deleted!`)
                } else {
                    waitingArrayDelete[index] = false;
                    if (waitingArrayDelete.every(item => item === false)
                        && waitingArrayUpdateCreate.every(item => item === false)) {
                        toastSuccess();
                        navigate('/projects');
                    }

                }
            })
        })
    }

    const submitCriteria = () => {

        const criteriaToDelete = previousCriteria.filter(pCriterion =>
            !criteria.some(criterion => criterion.id === pCriterion.id)
        );
        let waitingArrayUpdateCreate = criteria.map(() => true);
        let waitingArrayDelete = criteriaToDelete.map(() => true);

        // --------------------------------------------------------------------- //
        // update and create criteria
        criteria.forEach((criterion, index) => {
            const matchCriterion = previousCriteria.find(pCriterion => pCriterion.id === criterion.id);
            if (matchCriterion) {
                // PUT
                fetch(`http://localhost:8080/api/criteria/${criterion.id}`, {
                    method: 'PUT',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(criterion)
                }).then(response => {
                    if (!response.ok) {
                        toastError(`Criterion ${criterion.name} could not be updated.`);
                        throw new Error(`Criterion ${criterion.name} could not be updated.`);
                    } else {
                        waitingArrayUpdateCreate[index] = false;
                        if (waitingArrayUpdateCreate.every(item => item === false)
                            && waitingArrayDelete.every(item => item === false)) {
                            submitAlternatives();
                        }
                    }
                }).catch(err => {
                    console.log(err);
                })
            } else {
                // POST
                fetch(`http://localhost:8080/api/projects/${props.id}/criteria/`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(criterion)
                }).then(response => {
                    if (!response.ok) {
                        toastError(`Criterion ${criterion.name} could not be uploaded.`);
                        throw new Error(`Criterion ${criterion.name} could not be uploaded.`);
                    }
                    return response.json();
                }).then(data => {
                    waitingArrayUpdateCreate[index] = false;

                    // update alternatives' performances with a valid criterion id got from the backend
                    toSendAlternatives = toSendAlternatives.map(alt => {
                        let newPerformances = alt.performances.map(performance => {
                            if (performance.criterion === criterion.id) {
                                return {
                                    ...performance,
                                    criterion: data.id,
                                }
                            }
                            return performance;
                        })
                        return {
                            ...alt,
                            performances: newPerformances,
                        }
                    })

                    if (waitingArrayUpdateCreate.every(item => item === false)
                        && waitingArrayDelete.every(item => item === false)) {
                        submitAlternatives();
                    }
                }).catch(err => {
                    console.log(err);
                })
            }
        });

        // --------------------------------------------------------------------- //
        // delete criteria
        criteriaToDelete.forEach((criterionToDelete, index) => {
            // DELETE
            fetch(`http://localhost:8080/api/criteria/${criterionToDelete.id}`, {
                method: 'DELETE',
                credentials: 'include'
            }).then(response => {
                if (!response.ok) {
                    toastError(`Criterion ${criterionToDelete.name} could not be deleted.`);
                    throw new Error(`Criterion ${criterionToDelete.name} could not be deleted.`);
                } else {
                    waitingArrayDelete[index] = false;
                    if (waitingArrayUpdateCreate.every(item => item === false)
                        && waitingArrayDelete.every(item => item === false)) {
                        submitAlternatives();
                    }
                }
            }).catch(err => {
                console.log(err);
            })
        })
    }

    const submitData = () => {

        // check if there are any criteria
        if (criteria.length === 0) {
            toastError("No criteria!");
            return;
        }

        // check if all criteria have a name
        const criteriaCheckName = criteria.some(criterion => criterion.name === "");
        if (criteriaCheckName) {
            toastError("There is at least one criterion without a name!", 6000);
            return;
        }

        // check if all linear_segments are filled
        const criteriaCheckLinearSegments = criteria.some(criterion => isNaN(criterion.linear_segments))
        if (criteriaCheckLinearSegments) {
            toastError("There is at least one criterion with an empty linear segments value!", 6000);
            return;
        }

        // check if there are any alternatives
        if (alternatives.length === 0) {
            toastError("No alternatives!");
            return;
        }

        // check if all alternatives have a name
        const alternativesCheckName = alternatives.some(alternative => alternative.name === "");
        if (alternativesCheckName) {
            toastError("There is at least one alternative without a name!", 6000);
            return;
        }

        // check if all performances are filled
        const alternativesCheckPerformances = alternatives.some(alternative =>
            alternative.performances.some(performance => isNaN(performance.value))
        )
        if (alternativesCheckPerformances) {
            toastError("There is at least one alternative with an empty performance!");
            return;
        }

        // set toSendAlternatives to alternatives
        toSendAlternatives = alternatives;

        submitCriteria();
    }

    const handleDragEnd = (event) => {
        const { active, over } = event;
        setAlternatives(pAlternatives => {
            return pAlternatives.map(pAlternative => {
                if (pAlternative.id.toString() === active.id) {
                    return {
                        ...pAlternative,
                        reference_ranking: over ? parseInt(over.id) : 0
                    };
                }
                return pAlternative;
            })
        })
    }

        return (
            <Box
                w={'full'}
                h={'full'}
                borderWidth={'1px'}
                borderRadius={'lg'}
                p={5}
            >
                <Tabs variant='soft-rounded' colorScheme='teal' isFitted={isScreenMobile}>
                    <TabList mx={'15px'}>
                        {isScreenMobile ?
                            <>
                                <Tab fontSize={'20px'}>
                                    <Icon as={FaArrowTrendUp}></Icon>
                                </Tab>
                                <Tab fontSize={'20px'}>
                                    <Icon as={FaList}></Icon>
                                </Tab>
                                <Tab fontSize={'20px'}>
                                    <Icon as={FaBalanceScaleLeft}></Icon>
                                </Tab>
                            </>
                            :
                            <>
                                <Tab>Criteria</Tab>
                                <Tab>Alternatives</Tab>
                                <Tab>Ranking</Tab>
                            </>
                        }

                    </TabList>
                    <TabPanels>
                        {hasLoadedCriteria &&
                            <TabPanel>
                                <CriteriaTab
                                    criteria={criteria}
                                    setCriteria={setCriteria}
                                    setAlternatives={setAlternatives}
                                />
                            </TabPanel>
                        }
                        {hasLoadedAlternatives &&
                            <TabPanel>
                                <AlternativesTab
                                    alternatives={alternatives}
                                    setAlternatives={setAlternatives}
                                    criteria={criteria}
                                />
                            </TabPanel>
                        }
                        {hasLoadedAlternatives &&
                            <TabPanel>
                                <DndContext onDragEnd={handleDragEnd}>
                                    <RankingTab
                                        alternatives={alternatives}
                                        setAlternatives={setAlternatives}
                                    />
                                </DndContext>
                            </TabPanel>
                        }
                    </TabPanels>
                </Tabs>
                <Box textAlign={'right'}>
                    <Button colorScheme={'teal'} mr={6} onClick={submitData}>Save</Button>
                </Box>
            </Box>
        )
    }

    export default ProjectTabs;