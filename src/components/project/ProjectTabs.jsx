import {
    Box,
    Button,
    ButtonGroup,
    Divider,
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
import { useEffect, useRef, useState } from "react";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaBalanceScaleLeft, FaList, FaRegCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import CriteriaTab from "./criteria-tab/CriteriaTab.jsx";
import AlternativesTab from "./alternatives-tab/AlternativesTab.jsx";
import ResultsTabs from "./results-tab/ResultsTabs.jsx";
import PreferencesTabs from "./preferences-tab/PreferencesTabs.jsx";
import ImportModal from "../import/ImportModal.jsx";

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
    const criteriaRef = useRef([]);

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
    const alternativesRef = useRef([]);

    // preferenceIntensities holds active data about preference intensities
    // [
    //     {
    //         id: integer,
    //         alternative_1: integer,
    //         alternative_2: integer,
    //         alternative_3: integer,
    //         alternative_4: integer,
    //         criterion: integer,
    //     },
    //     ...
    // ]
    const [preferenceIntensities, setPreferenceIntensities] = useState([]);

    // pairwiseComparisons holds active data about pairwise comparisons between alternatives
    // [
    //     {
    //         id: integer,
    //         type: ("preference", "indifference"),
    //         alternative_1: integer,
    //         alternative_2: integer,
    //     },
    //     ...
    // ]
    const [pairwiseComparisons, setPairwiseComparisons] = useState([]);

    const [hasseGraph, setHasseGraph] = useState({});
    const [pairwiseMode, setPairwiseMode] = useState(false);

    const [tabIndex, setTabIndex] = useState(0);
    const [hasLoaded, setHasLoaded] = useState(false);
    const [isScreenMobile] = useMediaQuery('(max-width: 628px)');
    const [saveClicked, setSaveClicked] = useState(false);
    const navigate = useNavigate();
    const toast = useToast();

    useEffect(() => {
        // get data
        fetch(`http://localhost:8080/api/projects/${props.id}/batch`, {
            method: 'GET',
            credentials: 'include'
        }).then(response => {
            if (!response.ok) {
                throw new Error("error getting project in batch");
            }
            return response.json();
        }).then(data => {
            setCriteria(data.criteria);
            criteriaRef.current = data.criteria;
            setAlternatives(data.alternatives);
            alternativesRef.current = data.alternatives;
            setPreferenceIntensities(data.preference_intensities);
            setPairwiseComparisons(data.pairwise_comparisons);
            setHasseGraph(data.hasse_graph);
            setPairwiseMode(data.pairwise_mode);
            setHasLoaded(true);
        }).catch(err => {
            console.log(err);
        })
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

        // check if all pairwise comparisons have different alternatives
        const pairwiseComparisonsCheck = pairwiseComparisons.some(pc => pc.alternative_1 === pc.alternative_2)
        if (pairwiseComparisonsCheck && pairwiseMode) {
            toastError("There is at least one pairwise comparison with identical alternatives.");
            return false;
        }

        // check if all best-worst positions are correct - best is higher than worst
        const maxMinPositionsCheck = alternatives.some(alternative => (
            alternative.best_position > alternative.worst_position &&
            alternative.best_position !== null &&
            alternative.worst_position !== null
        ));
        if (maxMinPositionsCheck) {
            toastError("There is at least one incorrect Best-Worst preference");
            return false;
        }

        return true;
    }

    const submitData = () => {
        if (!validateData()) {
            return;
        }
        setSaveClicked(true);
        fetch(`http://localhost:8080/api/projects/${props.id}/batch`, {
            method: 'PATCH',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                pairwise_mode: pairwiseMode,
                criteria: criteria,
                alternatives: alternatives,
                preference_intensities: preferenceIntensities,
                pairwise_comparisons: pairwiseComparisons,
            })
        }).then(response => {
            if (!response.ok) {
                toastError('Sorry, some unexpected error occurred');
                throw new Error('Error updating data');
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

        setSaveClicked(true);

        // update data
        fetch(`http://localhost:8080/api/projects/${props.id}/batch`, {
            method: 'PATCH',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                pairwise_mode: pairwiseMode,
                criteria: criteria,
                alternatives: alternatives,
                preference_intensities: preferenceIntensities,
                pairwise_comparisons: pairwiseComparisons,
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
                return response.json();
            }).then(data => {
                setCriteria(data.criteria);
                criteriaRef.current = data.criteria;
                setAlternatives(data.alternatives);
                alternativesRef.current = data.alternatives;
                setPreferenceIntensities(data.preference_intensities);
                setPairwiseComparisons(data.pairwise_comparisons);
                setHasseGraph(data.hasse_graph);
                setPairwiseMode(data.pairwise_mode);
                setSaveClicked(false);
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
                <TabList mx={{ base: 0, sm: '15px' }} mb={2}>
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
                            <Tab fontSize={'20px'} isDisabled={alternatives.some(alt => alt.ranking === 0)}>
                                <Icon as={FaRegCheckCircle}></Icon>
                            </Tab>
                        </>
                        :
                        <>
                            <Tab>Criteria</Tab>
                            <Tab>Alternatives</Tab>
                            <Tab>Preferences</Tab>
                            <Tab isDisabled={alternatives.every(alt => alt.ranking === 0)}>Results</Tab>
                        </>
                    }
                </TabList>

                <Divider/>
                <TabPanels>
                    <TabPanel>
                        {hasLoaded &&
                            <CriteriaTab
                                criteria={criteria}
                                setCriteria={setCriteria}
                                setAlternatives={setAlternatives}
                                setPreferenceIntensities={setPreferenceIntensities}
                            />
                        }
                    </TabPanel>
                    <TabPanel>
                        {hasLoaded &&
                            <AlternativesTab
                                alternatives={alternatives}
                                setAlternatives={setAlternatives}
                                criteria={criteria}
                                setPreferenceIntensities={setPreferenceIntensities}
                            />
                        }
                    </TabPanel>
                    <TabPanel p={1} py={2}>
                        {hasLoaded &&
                            <PreferencesTabs
                                alternatives={alternatives}
                                setAlternatives={setAlternatives}
                                criteria={criteria}
                                preferenceIntensities={preferenceIntensities}
                                setPreferenceIntensities={setPreferenceIntensities}
                                pairwiseComparisons={pairwiseComparisons}
                                setPairwiseComparisons={setPairwiseComparisons}
                                pairwiseMode={pairwiseMode}
                                setPairwiseMode={setPairwiseMode}
                            />
                        }
                    </TabPanel>
                    <TabPanel p={1} py={2}>
                        {hasLoaded &&
                            <ResultsTabs
                                alternatives={alternativesRef.current}
                                criteria={criteriaRef.current}
                                hasseGraph={hasseGraph}
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
                        <ImportModal projectId={props.id} desktop={!isScreenMobile}/>
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