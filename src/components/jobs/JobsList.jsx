import { Box, Heading, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import JobsGroup from "./JobsGroup.jsx";

const JobsList = ({ currentProjectId }) => {

    const [hasLoaded, setHasLoaded] = useState(false);
    const [jobs, setJobs] = useState([]);
    const [groups, setGroups] = useState([]);

    const toast = useToast();
    const toastId = "toast-jobs-list";

    useEffect(() => {
        if (!isNaN(currentProjectId)) {
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
                setGroups([...new Set(data.jobs.map(i => i.group))])
                setHasLoaded(true);
            }).catch(err => {
                console.log(err);
                setJobs(undefined);
            })
        } else {
            setJobs(undefined);
        }
    }, [currentProjectId])


    return (
        <Box mt={'10px'}>
            {jobs === undefined ?
                <Heading size={{ base: 'md', md: 'xl' }} my={5}>
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