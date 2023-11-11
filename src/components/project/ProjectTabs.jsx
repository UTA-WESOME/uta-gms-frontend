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
    Text,
    useMediaQuery,
    useToast
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaBalanceScaleLeft, FaList, FaRegCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import CriteriaTab from "./criteria-tab/CriteriaTab.jsx";
import ImportModal from "../import/ImportModal.jsx";
import AlternativesTab from "./alternatives-tab/AlternativesTab.jsx";
import CategoryTab from "./categories-tab/CategoryTab.jsx";

const ProjectTabs = (props) => {
    // criteria holds active data about criteria
    //  [
    //      {
    //          "id": integer,
    //          "name": string,
    //          "gain": boolean,
    //          "linear_segments": integer
    //      },
    //      ...
    // ]
    const [criteria, setCriteria] = useState([]);
    const criteriaRef = useRef([]);

    // categories holds active data about categories in the project
    // [
    //     {
    //         "id": integer,
    //         "name": string,
    //         "color": string,
    //         "active": boolean,
    //         "diagram": JSON,
    //         "parent": integer,
    //         "project": integer,
    //         "criterion_categories": [
    //             {
    //                 "id": integer,
    //                 "criterion": integer,
    //             },
    //             ...
    //         ],
    //         "function_points": [
    //
    //         ],
    //         "preference_intensities": [
    //
    //         ],
    //         "pairwise_comparisons": [
    //
    //         ],
    //         "rankings": [
    //
    //         ],
    //         "percentages": [
    //
    //         ],
    //         "acceptability_indices": [
    //
    //         ]
    //     },
    //     ...
    // ]
    const [categories, setCategories] = useState([]);

    // alternatives holds active data about alternatives and their performances
    //  [
    //      {
    //          "id": integer,
    //          "name": string,
    //          "reference_ranking": integer,
    //          "ranking": integer,
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
            setCategories(data.categories);
            setAlternatives(data.alternatives);
            alternativesRef.current = data.alternatives;
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
        const pairwiseComparisonsCheck = categories.some(c => c.pairwiseComparisons.some(pc => pc.alternative_1 === pc.alternative_2))
        if (pairwiseComparisonsCheck && pairwiseMode) {
            toastError("There is at least one pairwise comparison with identical alternatives.");
            return false;
        }

        // check if all best-worst positions are correct - best is higher than worst
        // TODO
        // const maxMinPositionsCheck = alternatives.some(alternative => (
        //     alternative.best_position > alternative.worst_position &&
        //     alternative.best_position !== null &&
        //     alternative.worst_position !== null
        // ));
        // if (maxMinPositionsCheck) {
        //     toastError("There is at least one incorrect Best-Worst preference");
        //     return false;
        // }

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
                categories: categories,
                alternatives: alternatives
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
                categories: categories,
                alternatives: alternatives
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
                        if (response.status === 400) {
                            return response.json().then(data => {
                                    toastError(data.details);
                                    throw new Error('Error getting results');
                                }
                            )
                        } else {
                            toastError('Sorry, some unexpected error occurred');
                            throw new Error('Error getting results');

                        }
                    }
                    return response.json();
                }
            ).then(data => {
                setCriteria(data.criteria);
                criteriaRef.current = data.criteria;
                setCategories(data.categories);
                setAlternatives(data.alternatives);
                alternativesRef.current = data.alternatives;
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
                            <Tab>Hierarchy</Tab>
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
                            />
                        }
                    </TabPanel>
                    <TabPanel>
                        {hasLoaded &&
                            <AlternativesTab
                                alternatives={alternatives}
                                setAlternatives={setAlternatives}
                                criteria={criteria}
                            />
                        }
                    </TabPanel>
                    <TabPanel p={1} py={2}>
                        {hasLoaded &&
                            <CategoryTab
                                criteria={criteria}
                                categories={categories}
                                setCategories={setCategories}
                            />
                        }
                    </TabPanel>
                    <TabPanel p={1} py={2}>
                        {hasLoaded &&
                            <Text>Preferences Tab</Text>
                            // <PreferencesTabs
                            //     alternatives={alternatives}
                            //     setAlternatives={setAlternatives}
                            //     criteria={criteria}
                            //     preferenceIntensities={preferenceIntensities}
                            //     setPreferenceIntensities={setPreferenceIntensities}
                            //     pairwiseComparisons={pairwiseComparisons}
                            //     setPairwiseComparisons={setPairwiseComparisons}
                            //     pairwiseMode={pairwiseMode}
                            //     setPairwiseMode={setPairwiseMode}
                            // />
                        }
                    </TabPanel>
                    <TabPanel p={1} py={2}>
                        {hasLoaded &&
                            <Text>Results Tab</Text>
                            // <ResultsTabs
                            //     alternatives={alternativesRef.current}
                            //     criteria={criteriaRef.current}
                            //     hasseGraph={hasseGraph}
                            // />
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