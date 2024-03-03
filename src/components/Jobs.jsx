import { Box, Center, FormControl, Select, Stack, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import JobsList from "./jobs/JobsList.jsx";
import PageTemplate from "./utils/PageTemplate.jsx";
import { useLocalStorage } from "./utils/useLocalStorage.jsx";

const Jobs = () => {

    const navigate = useNavigate();
    const [getAuth, setAuth, deleteAuth] = useLocalStorage('auth');
    const toast = useToast();
    const toastId = "toast-jobs";

    const [hasLoaded, setHasLoaded] = useState(false);
    const [projects, setProjects] = useState([]);
    const [currentProjectId, setCurrentProjectId] = useState(NaN);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        if (!getAuth()) {
            navigate("/signin");
        } else {
            fetch(`${import.meta.env.VITE_BACKEND}/api/projects/`, {
                method: "GET",
                credentials: "include"
            }).then(response => {
                if (!response.ok) {
                    switch (response.status) {
                        case 403:
                            if (!toast.isActive(toastId)) {
                                toast({
                                    id: toastId,
                                    title: "Warning!",
                                    description: "You do not have permission to do this!",
                                    status: "warning",
                                    duration: 5000,
                                    isClosable: true,
                                })
                            }
                            navigate("/");
                            break;
                    }
                    throw new Error("response not ok");
                }
                return response.json();
            }).then(data => {
                setHasLoaded(true);
                setProjects(data);
            }).catch(err => {
                console.log(err);
            })

            let projectId = searchParams.get("default_project");
            if (projectId !== null) {
                if (/^\d+$/.test(projectId)) {
                    setCurrentProjectId(parseInt(projectId));
                } else {
                    if (!toast.isActive(toastId)) {
                        toast({
                            id: toastId,
                            title: "Warning!",
                            description: "Invalid project! Choose a project from the dropdown menu.",
                            status: "warning",
                            duration: 9000,
                            isClosable: true,
                        })
                    }
                    setCurrentProjectId(NaN);
                }
            }
        }
    }, [])

    return (
        <>
            {hasLoaded &&
                <PageTemplate title={'Jobs'}>
                    <Box
                        w={'full'}
                        h={'full'}
                        borderWidth={'1px'}
                        borderRadius={'lg'}
                        p={{ base: 2, sm: 5 }}
                    >
                        <Center>
                            <Stack direction={'row'} alignItems={'end'}>
                                <FormControl>
                                    <Select
                                        size={'lg'}
                                        minW={'200px'}
                                        placeholder={'Choose project'}
                                        defaultValue={isNaN(currentProjectId) ? 0 : currentProjectId}
                                        onChange={(event) =>
                                            setCurrentProjectId(parseInt(event.target.value))
                                        }
                                    >
                                        {projects.map(project => (
                                            <option value={project.id} key={project.id}>{project.name}</option>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Stack>
                        </Center>
                        <JobsList currentProjectId={currentProjectId}/>
                    </Box>
                </PageTemplate>
            }
        </>
    )
}

export default Jobs;