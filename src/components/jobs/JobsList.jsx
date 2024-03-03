import { Box, Button, Heading, useToast } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import JobsGroup from "./JobsGroup.jsx";

const JobsList = ({ currentProjectId }) => {

    const [jobs, setJobs] = useState([]);
    const [groups, setGroups] = useState([]);
    const tickInterval = useRef();

    const toast = useToast();
    const toastId = "toast-jobs-list";

    const getJobs = () => {
        fetch(`${import.meta.env.VITE_BACKEND}/api/projects/${currentProjectId}/jobs/`, {
            method: 'GET',
            credentials: 'include'
        }).then(response => {
            if (!response.ok) {
                if (!toast.isActive(toastId)) {
                    toast({
                        title: "Error!",
                        description: "Retrieving jobs for this project is not possible.",
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                    })
                }
                throw Error("Retrieving jobs for this project is not possible.")
            }
            return response.json();
        }).then(data => {
            setJobs(data.jobs);
            setGroups([...new Set(data.jobs.map(i => i.group))]);
        }).catch(err => {
            console.log(err);
            setJobs(undefined);
        })
    }

    const toggleRefresh = (status) => {
        if (status) {
            clearInterval(tickInterval.current);
            let i = setInterval(() => {
                getJobs();
            }, 3000);
            tickInterval.current = i;
        } else {
            clearInterval(tickInterval.current);
        }
    }

    useEffect(() => {
        if (!isNaN(currentProjectId)) {
            getJobs();
            toggleRefresh(true);
        } else {
            toggleRefresh(false);
            setJobs(undefined);
        }

        return () => {
            clearInterval(tickInterval.current);
        }

    }, [currentProjectId])


    return (
        <Box mt={'10px'}>
            {jobs === undefined ?
                <Heading size={{ base: 'md', md: 'xl' }} my={5} textAlign={'center'}>
                    Choose a project from the dropdown menu
                </Heading>
                :
                <>
                    <>
                        {groups.sort((x, y) => y - x).slice(0, 4).map((group, index) => (
                            <JobsGroup
                                key={index}
                                groupNumber={group}
                                jobs={jobs.filter(i => i.group === group)}
                            />
                        ))}
                    </>
                </>
            }
        </Box>
    )


}

export default JobsList;