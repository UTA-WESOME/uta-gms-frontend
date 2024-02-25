import { Skeleton, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const JobsList = ({ currentProjectId }) => {

    const [hasLoaded, setHasLoaded] = useState(false);
    const [jobs, setJobs] = useState([]);
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
                setJobs(data);
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
        <>
            {jobs === undefined ?

                <Skeleton height={'20px'}/>
                :
                JSON.stringify(jobs)

            }
        </>
    )


}

export default JobsList;