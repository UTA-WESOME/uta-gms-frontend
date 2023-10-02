import {
    Box,
    Button,
    ButtonGroup,
    Icon,
    Spinner,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    useMediaQuery,
    useToast
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaBalanceScaleLeft, FaGreaterThan, FaList, FaRegCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import CriteriaTab from "./criteria-tab/CriteriaTab.jsx";
import AlternativesTab from "./alternatives-tab/AlternativesTab.jsx";
import RankingTab from "./ranking-tab/RankingTab.jsx";
import ResultsTab from "./results-tab/ResultsTab.jsx";
import PreferenceTab from "./preference-tab/PreferenceTab.jsx";


const ProjectTabs = (props) => {

    // criteria holds active data that the user changes
    //    [
    //         {
    //             "id": integer,
    //             "name": string,
    //             "gain": boolean,
    //             "linear_segments": integer,
    //             "created_at": datetime,  # optional
    //             "updated_at": datetime,  # optional
    //         },
    //         ...
    //     ]
    const [criteria, setCriteria] = useState([]);

    // alternatives holds active data about alternatives and their performances
    //  [
    //      {
    //          "id": integer,
    //          "name": string,
    //          "reference_ranking": integer,
    //          "ranking": integer,
    //          "created_at": datetime,  # optional
    //          "updated_at": datetime,  # optional
    //          "performances": [
    //              {
    //                  "id": integer,  # optional
    //                  "value": decimal,
    //                  "created_at": datetime,  # optional
    //                  "updated_at": datetime,  # optional
    //                  "criterion": integer,  # corresponding criterion id
    //              },
    //              ...
    //          ]
    //      },
    //      ...
    //  ]
    const [alternatives, setAlternatives] = useState([]);

    // preferenceIntensities holds active data about preference intensities
    // [
    //     {
    //         id: integer,
    //         project_id: integer,
    //         alternative_1_id: integer,
    //         alternative_2_id: integer,
    //         alternative_3_id: integer,
    //         alternative_4_id: integer,
    //         criterion_id: integer,
    //     },
    //     ...
    // ]
    const [preferenceIntensities, setPreferenceIntensities] = useState([]);

    const [tabIndex, setTabIndex] = useState(0);
    const [hasLoadedCriteria, setHasLoadedCriteria] = useState(false);
    const [hasLoadedAlternatives, setHasLoadedAlternatives] = useState(false);
    const [hasLoadedPreferenceIntensities, setHasLoadedPreferenceIntensities] = useState(false);
    const [isScreenMobile] = useMediaQuery('(max-width: 628px)');
    const [saveClicked, setSaveClicked] = useState(false);
    const navigate = useNavigate();
    const toast = useToast();

    const getProjectData = () => {
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
                            }
                            return pAlternatives;
                        });

                        waitingArray[index] = false;

                        if (waitingArray.every(item => item === false)) {
                            setAlternatives(alternatives =>
                                alternatives.sort((x, y) => (x.name > y.name) ? 1 : ((x.name < y.name) ? -1 : 0))
                            )
                            setHasLoadedAlternatives(true);
                            setSaveClicked(false);
                        }

                    })

                })
            }
        }).catch(err => {
            console.log(err);
        })

        // get preferenceIntensities
        fetch(`http://localhost:8080/api/projects/${props.id}/preference_intensities`, {
            method: 'GET',
            credentials: 'include'
        }).then(response => {
            if (!response.ok) {
                throw new Error("error getting preference intensities");
            }
            return response.json();
        }).then(data => {
            setPreferenceIntensities(data);
            setHasLoadedPreferenceIntensities(true);
        }).catch(err => {
            console.log(err);
        })
    }


    useEffect(() => {

        getProjectData();

    }, [])

    const toastSuccess = (description) => {
        toast({
            title: "Success!",
            description: description,
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
        });
        setSaveClicked(false);
    }

    const validateData = () => {
        setSaveClicked(true);

        // check if there are any criteria
        if (criteria.length === 0) {
            toastError("No criteria!");
            return false;
        }

        // check if all criteria have a name
        const criteriaCheckName = criteria.some(criterion => criterion.name === "");
        if (criteriaCheckName) {
            toastError("There is at least one criterion without a name!", 6000);
            return false;
        }

        // check if all linear_segments are filled
        const criteriaCheckLinearSegments = criteria.some(criterion => isNaN(criterion.linear_segments))
        if (criteriaCheckLinearSegments) {
            toastError("There is at least one criterion with an empty linear segments value!", 6000);
            return false;
        }

        // check if there are any alternatives
        if (alternatives.length === 0) {
            toastError("No alternatives!");
            return false;
        }

        // check if all alternatives have a name
        const alternativesCheckName = alternatives.some(alternative => alternative.name === "");
        if (alternativesCheckName) {
            toastError("There is at least one alternative without a name!", 6000);
            return false;
        }

        // check if all performances are filled
        const alternativesCheckPerformances = alternatives.some(alternative =>
            alternative.performances.some(performance => isNaN(performance.value))
        )
        if (alternativesCheckPerformances) {
            toastError("There is at least one alternative with an empty performance!");
            return false;
        }

        return true;
    }

    const submitData = () => {
        if (!validateData()) {
            return;
        }
        fetch(`http://localhost:8080/api/projects/${props.id}/batch`, {
            method: 'PATCH',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                criteria: criteria,
                alternatives: alternatives,
                preference_intensities: preferenceIntensities,
            })
        }).then(response => {
            if (!response.ok) {
                toastError('Sorry, some unexpected error occurred')
                throw new Error('Error updating data')
            } else {
                toastSuccess("Project settings saved.");
                navigate('/projects');
            }
        }).catch(err => {
            console.log(err);
        })
    }

    const submitDataAndRun = () => {
        if (!validateData()) {
            return;
        }

        // update data
        fetch(`http://localhost:8080/api/projects/${props.id}/batch`, {
            method: 'PATCH',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                criteria: criteria,
                alternatives: alternatives,
                preference_intensities: preferenceIntensities,
            })
        }).then(response => {
            if (!response.ok) {
                toastError('Sorry, some unexpected error occurred');
                throw new Error('Error updating data');
            }

            // get results
            fetch(`http://localhost:8080/api/projects/${props.id}/results`, {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
            }).then(response => {
                if (!response.ok) {
                    toastError('Sorry, some unexpected error occurred');
                    throw new Error('Error getting results');
                }
                setHasLoadedCriteria(false);
                setHasLoadedAlternatives(false);
                setCriteria([]);
                setAlternatives([]);
                getProjectData();
                toastSuccess();
                setTabIndex(3);
            })
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
            p={{ base: 2, sm: 5 }}
        >
            <Tabs variant='soft-rounded'
                  colorScheme='teal'
                  isFitted={isScreenMobile}
                  index={tabIndex}
                  onChange={(index) => {
                      setTabIndex(index);
                  }}>
                <TabList mx={{ base: 0, sm: '15px' }}>
                    {isScreenMobile ?
                        <>
                            <Tab fontSize={'15px'}>
                                <Icon as={FaArrowTrendUp}></Icon>
                            </Tab>
                            <Tab fontSize={'15px'}>
                                <Icon as={FaList}></Icon>
                            </Tab>
                            <Tab fontSize={'15px'}>
                                <Icon as={FaBalanceScaleLeft}></Icon>
                            </Tab>
                            <Tab fontSize={'15px'}>
                                <Icon as={FaGreaterThan}></Icon>
                            </Tab>
                            <Tab fontSize={'20px'} isDisabled={alternatives.some(alt => alt.ranking === 0)}>
                                <Icon as={FaRegCheckCircle}></Icon>
                            </Tab>
                        </>
                        :
                        <>
                            <Tab>Criteria</Tab>
                            <Tab>Alternatives</Tab>
                            <Tab>Ranking</Tab>
                            <Tab>Preferences</Tab>
                            <Tab isDisabled={alternatives.every(alt => alt.ranking === 0)}>Results</Tab>
                        </>
                    }

                </TabList>
                <TabPanels>
                    <TabPanel>
                        {hasLoadedCriteria &&
                            <CriteriaTab
                                criteria={criteria}
                                setCriteria={setCriteria}
                                setAlternatives={setAlternatives}
                            />
                        }
                    </TabPanel>
                    <TabPanel>
                        {hasLoadedAlternatives &&
                            <AlternativesTab
                                alternatives={alternatives}
                                setAlternatives={setAlternatives}
                                criteria={criteria}
                            />
                        }
                    </TabPanel>
                    <TabPanel p={1} py={2}>
                        {hasLoadedAlternatives &&
                            <RankingTab
                                alternatives={alternatives}
                                setAlternatives={setAlternatives}
                            />
                        }
                    </TabPanel>
                    <TabPanel>
                        {hasLoadedPreferenceIntensities &&
                            <PreferenceTab
                                alternatives={alternatives}
                                criteria={criteria}
                                preferenceIntensities={preferenceIntensities}
                                setPreferenceIntensities={setPreferenceIntensities}
                            />
                        }
                    </TabPanel>
                    <TabPanel p={1} py={2}>
                        {hasLoadedAlternatives &&
                            <ResultsTab
                                alternatives={alternatives}
                            />
                        }
                    </TabPanel>
                </TabPanels>
            </Tabs>
            <Box
                textAlign={'right'}
                mt={tabIndex === 2 ? 3 : 0}
            >
                {!saveClicked ?
                    <ButtonGroup>
                        <Button
                            colorScheme={'teal'}
                            onClick={submitData}
                        >Save</Button>
                        <Button
                            colorScheme={'orange'}
                            onClick={submitDataAndRun}
                        >Save & run</Button>
                    </ButtonGroup>
                    :
                    <Spinner
                        color={'teal'}
                        mr={tabIndex === 2 ? 1 : 6}
                    />

                }
            </Box>
        </Box>
    )
}

export default ProjectTabs;