import { Box, Button, Icon, Tab, TabList, TabPanel, TabPanels, Tabs, useMediaQuery, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaBalanceScaleLeft, FaList } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import CriteriaTab from "./criteria-tab/CriteriaTab.jsx";
import AlternativesTab from "./alternatives-tab/AlternativesTab.jsx";
import RankingTab from "./RankingTab.jsx";


const ProjectTabs = (props) => {

    // criteria and previousCriteria will be compared in submitData
    // criteria holds active data that the user changes
    const [criteria, setCriteria] = useState([]);

    // alternatives holds active data that the user changes
    const [alternatives, setAlternatives] = useState([]);

    const [tabIndex, setTabIndex] = useState(0);
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

        fetch(`http://localhost:8080/api/projects/${props.id}/batch`, {
            method: 'PATCH',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                criteria: criteria,
                alternatives: alternatives,
            })
        }).then(response => {
            if (!response.ok) {
                toastError('Sorry, some unexpected error occurred')
                throw new Error('Error updating data')
            } else {
                toastSuccess();
                navigate('/projects');
            }
        }).catch(err => {
            console.log(err);
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
            <Tabs variant='soft-rounded' colorScheme='teal' isFitted={isScreenMobile}
                  onChange={(index) => {
                      setTabIndex(index);
                  }}>
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
                        <TabPanel p={1} py={2}>
                            <RankingTab
                                alternatives={alternatives}
                                setAlternatives={setAlternatives}
                            />
                        </TabPanel>
                    }
                </TabPanels>
            </Tabs>
            <Box
                textAlign={'right'}
                mt={tabIndex === 2 ? 3 : 0}
            >
                <Button
                    colorScheme={'teal'}
                    mr={tabIndex === 2 ? 1 : 6}
                    onClick={submitData}
                >Save</Button>
            </Box>
        </Box>
    )
}

export default ProjectTabs;