import { Box, Button, Icon, Tab, TabList, TabPanel, TabPanels, Tabs, useMediaQuery, useToast } from "@chakra-ui/react";
import CriteriaTab from "./CriteriaTab.jsx";
import { useEffect, useState } from "react";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaBalanceScaleLeft, FaList } from "react-icons/fa";


const ProjectTabs = (props) => {

    // criteria and previousCriteria will be compared in submitData
    // criteria holds active data that the user changes
    const [criteria, setCriteria] = useState([]);
    // previousCriteria holds data downloaded from the backend
    const [previousCriteria, setPreviousCriteria] = useState([]);

    const [hasLoaded, setHasLoaded] = useState(false);
    const [isScreenMobile] = useMediaQuery('(max-width: 460px)');
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
            setHasLoaded(true);
        }).catch(err => {
            console.log(err);
        })
    }, [])


    const submitData = () => {
        // updating and creating criteria
        criteria.forEach(criterion => {
            const matchCriterion = previousCriteria.find(pCriterion => pCriterion.id === criterion.id);
            if (matchCriterion) {
                // PUT
                fetch(`http://localhost:8080/api/criteria/${criterion.id}`, {
                    method: 'PUT',
                    credentials: 'include',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(criterion)
                }).then(response => {
                    if(!response.ok) {
                        toast({
                            title: "Error!",
                            description: `Criterion ${criterion.name} could not be updated.`,
                            duration: 5000,
                            isClosable: true,
                        });
                        throw new Error(`Criterion ${criterion.name} could not be updated.`);
                    }
                }).catch(err => {
                    console.log(err);
                })
            } else {
                // POST
                fetch(`http://localhost:8080/api/projects/${props.id}/criteria/`, {
                    method: 'POST',
                    credentials: 'include',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(criterion)
                }).then(response => {
                    if(!response.ok) {
                        toast({
                            title: "Error!",
                            description: `Criterion ${criterion.name} could not be uploaded.`,
                            duration: 5000,
                            isClosable: true,
                        });
                        throw new Error(`Criterion ${criterion.name} could not be uploaded.`);
                    }
                }).catch(err => {
                    console.log(err);
                })
            }
        });
        // deleting criteria
        const criteriaToDelete = previousCriteria.filter(pCriterion =>
            !criteria.some(criterion => criterion.id === pCriterion.id)
        );
        criteriaToDelete.forEach(criterionToDelete => {
            // DELETE
            fetch(`http://localhost:8080/api/criteria/${criterionToDelete.id}`, {
                method: 'DELETE',
                credentials: 'include'
            }).then(response => {
                if(!response.ok) {
                    toast({
                        title: "Error!",
                        description: `Criterion ${criterionToDelete.name} could not be deleted.`,
                        duration: 5000,
                        isClosable: true,
                    });
                    throw new Error(`Criterion ${criterionToDelete.name} could not be deleted.`);
                }
            }).catch(err => {
                console.log(err);
            })
        })
    }


    return (
        <Box
            w={'full'}
            h={'full'}
            borderWidth={'1px'}
            borderRadius={'lg'}
            overflow={'hidden'}
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
                            <Tab>Reference</Tab>
                        </>
                    }

                </TabList>
                <TabPanels>
                    {hasLoaded &&
                        <TabPanel>
                            <CriteriaTab criteria={criteria} setCriteria={setCriteria}/>
                        </TabPanel>
                    }
                    <TabPanel>
                        <p>Alternatives</p>
                    </TabPanel>
                    <TabPanel>
                        <p>Reference ranking</p>
                    </TabPanel>

                </TabPanels>
            </Tabs>
            <Box textAlign={'right'}>
                <Button colorScheme={'teal'} mr={6} onClick={submitData}>Save</Button>
            </Box>
        </Box>
    )
}

export default ProjectTabs;