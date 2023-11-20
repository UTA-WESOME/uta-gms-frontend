import {
    Box,
    Button,
    ButtonGroup,
    Divider,
    Icon,
    Progress,
    IconButton,
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
import { BiSave, BiRocket } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

import CriteriaTab from "./criteria-tab/CriteriaTab.jsx";
import AlternativesTab from "./alternatives-tab/AlternativesTab.jsx";
import CategoryTab from "./categories-tab/CategoryTab.jsx";
import PreferencesTabs from "./preferences-tab/PreferencesTabs.jsx";
import ResultsTabs from "./results-tab/ResultsTabs.jsx";
import ImportModal from "../import/ImportModal.jsx";
import ExportModal from "../export/ExportModal.jsx";

const ProjectTabs = (props) => {
    // criteria holds active data about criteria, criterion function, criterion categories
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
    const categoriesRef = useRef([]);

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

    const [preferenceIntensities, setPreferenceIntensities] = useState([]);

    const [pairwiseMode, setPairwiseMode] = useState(false);

    const [tabIndex, setTabIndex] = useState(0);
    const [hasLoaded, setHasLoaded] = useState(false);
    const [isScreenMobile] = useMediaQuery('(max-width: 628px)');
    const [saveClicked, setSaveClicked] = useState(false);
    const navigate = useNavigate();
    const toast = useToast();


    const getData = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/projects/${props.id}/batch/`, {
                method: 'GET',
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error("Error getting project in batch");
            }

            const data = await response.json();

            setCriteria(data.criteria);
            criteriaRef.current = data.criteria;
            setCategories(data.categories);
            categoriesRef.current = data.categories;
            setAlternatives(data.alternatives);
            alternativesRef.current = data.alternatives;
            setPreferenceIntensities(data.preference_intensities);
            setPairwiseMode(data.pairwise_mode);
            setHasLoaded(true);
        } catch (error) {
            console.error(error);
        }
    };


    useEffect(() => {
        // get data
        getData();
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
            setTabIndex(0);
            return false;
        }

        // check if all criteria have a name
        const criteriaCheckName = criteria.some(criterion => criterion.name === "");
        if (criteriaCheckName) {
            toastError("There is at least one criterion without a name!", 6000);
            setTabIndex(0);
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
            setTabIndex(1);
            return false;
        }

        // check if all alternatives have a name
        const alternativesCheckName = alternatives.some(alternative => alternative.name === "");
        if (alternativesCheckName) {
            toastError("There is at least one alternative without a name!", 6000);
            setTabIndex(1);
            return false;
        }

        // check if all performances are filled
        const alternativesCheckPerformances = alternatives.some(alternative =>
            alternative.performances.some(performance => isNaN(performance.value))
        )
        if (alternativesCheckPerformances) {
            toastError("There is at least one alternative with an empty performance!");
            setTabIndex(1);
            return false;
        }

        // check if there is at least one criterion that does not have a category
        const criteriaCheckCategories = criteria.some(criterion =>
            !categories.some(category =>
                category.criterion_categories.some(i => i.criterion === criterion.id)
            )
        )
        if (criteriaCheckCategories) {
            toastError("There is at least one criterion not assigned to a category!");
            setTabIndex(2);
            return false;
        }

        // check if all pairwise comparisons have different alternatives
        const pairwiseComparisonsCheck = categories.some(c => c.pairwise_comparisons.some(pc => pc.alternative_1 === pc.alternative_2))
        if (pairwiseComparisonsCheck && pairwiseMode) {
            toastError("There is at least one pairwise comparison with identical alternatives.");
            setTabIndex(3);
            return false;
        }

        // check if all best-worst positions are correct - best is higher than worst
        const maxMinPositionsCheck = categories.some(category =>
            category.rankings.some(ranking => (
                ranking.best_position > ranking.worst_position &&
                ranking.best_position !== null &&
                ranking.worst_position !== null
            ))
        );
        if (maxMinPositionsCheck) {
            toastError("There is at least one incorrect Best-Worst preference");
            setTabIndex(3);
            return false;
        }

        return true;
    }

    const submitData = () => {
        if (!validateData()) {
            return;
        }
        setSaveClicked(true);
        fetch(`http://localhost:8080/api/projects/${props.id}/batch/`, {
            method: 'PATCH',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                pairwise_mode: pairwiseMode,
                criteria: criteria,
                categories: categories,
                alternatives: alternatives,
                preference_intensities: preferenceIntensities
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
        fetch(`http://localhost:8080/api/projects/${props.id}/batch/`, {
            method: 'PATCH',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                pairwise_mode: pairwiseMode,
                criteria: criteria,
                categories: categories,
                alternatives: alternatives,
                preference_intensities: preferenceIntensities
            })
        }).then(response => {
            if (!response.ok) {
                toastError('Sorry, some unexpected error occurred');
                throw new Error('Error updating data');
            }
            return response.json();
        }).then(data => {

            let categoriesUpdated = data.categories;
            let waitingArrayResults = categoriesUpdated.map(() => false);
            categoriesUpdated.forEach((categoryUpdated, index) => {
                fetch(`http://localhost:8080/api/categories/${categoryUpdated.id}/results/`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' }
                }).then(response => {

                    if (!response.ok) {
                        waitingArrayResults[index] = true;
                        toastError(`Error getting results for ${categoryUpdated.name} - ${response.status}`);
                        throw new Error('Error getting results');
                    }

                    waitingArrayResults[index] = true;
                    if (waitingArrayResults.every(i => i === true)) {
                        toastSuccess("Results ready!");
                        setSaveClicked(false);
                        // get current project data
                        getData().then(() => {
                            setTabIndex(4);
                        });
                    }

                }).catch(err => {
                    console.log(err);
                })
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
            <Tabs
                variant='soft-rounded'
                colorScheme='teal'
                isFitted={isScreenMobile}
                index={tabIndex}
                onChange={(index) => {
                    setTabIndex(index);
                }}
            >
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
                            <Tab>Results</Tab>
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
                                setCategories={setCategories}
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
                                setCategories={setCategories}
                                setPreferenceIntensities={setPreferenceIntensities}
                            />
                        }
                    </TabPanel>
                    <TabPanel p={1} py={2}>
                        {hasLoaded &&
                            <CategoryTab
                                alternatives={alternatives}
                                criteria={criteria}
                                categories={categories}
                                setCategories={setCategories}
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
                                categories={categories}
                                setCategories={setCategories}
                                preferenceIntensities={preferenceIntensities}
                                setPreferenceIntensities={setPreferenceIntensities}
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
                                categories={categoriesRef.current}
                            />
                        }
                    </TabPanel>
                </TabPanels>
            </Tabs>
            <Box
                textAlign={'right'}
                mt={tabIndex === 2 ? 3 : 0}
            >
                {saveClicked ?
                    <Progress size={'xs'} isIndeterminate colorScheme={'teal'}/>
                    :
                    <ButtonGroup>
                        <ImportModal projectId={props.id} desktop={!isScreenMobile} />
                        <ExportModal
                            projectId={props.id}
                            desktop={!isScreenMobile}
                            pairwiseMode={pairwiseMode}
                            criteria={criteria}
                            categories={categories}
                            alternatives={alternatives}
                            preferenceIntensities={preferenceIntensities}
                        />
                        {isScreenMobile
                            ? <IconButton
                                aria-label={'Save'}
                                colorScheme={'orange'}
                                icon={<BiSave />}
                                onClick={submitData} >
                            </IconButton>
                            : <Button
                                leftIcon={<BiSave />}
                                colorScheme={'orange'}
                                onClick={submitData} >
                                Save
                            </Button>
                        }
                        {isScreenMobile
                            ? <IconButton
                                aria-label={'Save & run'}
                                colorScheme={'orange'}
                                icon={<BiRocket />}
                                onClick={submitDataAndRun} >
                            </IconButton>
                            : <Button
                                leftIcon={<BiRocket />}
                                colorScheme={'orange'}
                                onClick={submitDataAndRun} >
                                Save & run
                            </Button>
                        }
                    </ButtonGroup>
                }
            </Box>
        </Box>
    )
}

export default ProjectTabs;