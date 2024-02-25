import { useToast, } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProjectsContainer from "./projects/ProjectsContainer";

import PageTemplate from "./utils/PageTemplate.jsx";
import { useLocalStorage } from "./utils/useLocalStorage.jsx";

const Projects = () => {

    const navigate = useNavigate();
    const [getAuth, setAuth, deleteAuth] = useLocalStorage('auth');
    const [projects, setProjects] = useState([]);
    const toast = useToast();
    const toastId = "toast-projects";
    const [hasLoaded, setHasLoaded] = useState(false);


    useEffect(() => {
        if (getAuth() !== true) {
            navigate("/");
            if (!toast.isActive(toastId)) {
                toast({
                    id: toastId,
                    title: 'Sign up or log in first!',
                    description: "Sign up or log in to browse your projects.",
                    status: 'warning',
                    duration: 9000,
                    isClosable: true,
                });
            }
        } else {
            fetch(`${import.meta.env.VITE_BACKEND}/api/projects/`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
            }).then(response => {
                if (!response.ok) {
                    setAuth(false);
                    throw new Error("response not ok")
                }
                return response.json();
            }).then(data => {
                setProjects(data);
                setHasLoaded(true);
            }).catch(err => {
                console.log(err);
                navigate(0);
            })
        }
    }, []);

    return (
        <>
            {hasLoaded &&
                <PageTemplate title='Your Projects'>
                    <ProjectsContainer projects={projects} setProjects={setProjects}/>
                </PageTemplate>
            }
        </>
    );
}

export default Projects;
