import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProjectTabs from "./project/ProjectTabs.jsx";
import PageTemplate from "./utils/PageTemplate.jsx";
import { useLocalStorage } from "./utils/useLocalStorage.jsx";

const Project = () => {

    const navigate = useNavigate();
    const [project, setProject] = useState();
    const [hasLoaded, setHasLoaded] = useState(false);
    const [getAuth, setAuth, deleteAuth] = useLocalStorage('auth');
    const toast = useToast();
    const toastId = "toast-project";
    let { id } = useParams();


    const displayToast = (title, message, status) => {
        if (!toast.isActive(toastId)) {
            toast({
                id: toastId,
                title: title,
                description: message,
                status: status,
                duration: 9000,
                isClosable: true,
            })
        }
    }


    useEffect(() => {
        if (!getAuth()) {
            navigate("/signin");
        } else {
            fetch(`${import.meta.env.VITE_BACKEND}/api/projects/${id}`, {
                method: "GET",
                credentials: "include"
            }).then(response => {
                if (!response.ok) {
                    switch (response.status) {
                        case 403:
                            displayToast("Warning!", "You do not have permission to do this.", "warning");
                            navigate("/");
                            break;
                        case 404:
                            displayToast("Error!", "This project does not exist.", "error");
                            navigate("/projects");
                            break;
                    }
                    throw new Error("response not ok");
                }
                return response.json();
            }).then(data => {
                setProject(data);
                setHasLoaded(true);
            }).catch(err => {
                console.log(err);
            })
        }
    }, [])

    return (
        <>
            {hasLoaded &&
                <PageTemplate title={project.name}>
                    <ProjectTabs id={id}/>
                </PageTemplate>
            }
        </>
    )

}

export default Project;