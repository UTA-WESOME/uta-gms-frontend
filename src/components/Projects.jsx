import {useLocation, useNavigate} from "react-router-dom";
import {Center, Heading, useToast, VStack,} from "@chakra-ui/react";
import {useEffect, useState} from "react";

import ProjectsContainer from "./projects/ProjectsContainer";
import {useLocalStorage} from "./utils/useLocalStorage.jsx";

const Projects = () => {

    const navigate = useNavigate();
    const [getAuth, setAuth, deleteAuth] = useLocalStorage('auth');
    const [projects, setProjects] = useState([]);
    const toast = useToast();
    const location = useLocation();


    useEffect(() => {
        if (getAuth() !== true) {
            navigate("/");
        } else {
            fetch(`http://localhost:8080/api/projects/`, {
                method: "GET",
                headers: {"Content-Type": "application/json"},
                credentials: "include",
            }).then(response => {
                if (!response.ok) {
                    setAuth(false);
                    throw new Error("response not ok")
                }
                return response.json();
            }).then(data => {
                setProjects(data);
            }).catch(err => {
                console.log(err);
                navigate(0);
            })
        }
    }, []);

    return (
        <Center>
            <VStack
                w={{base: '80%', sm: '90%', md: '75%', lg: '85%', xl: '75%'}}
                marginBottom={'10'}
                justify={'center'}
                spacing={'1rem'}>
                <Heading
                    fontWeight={600}
                    fontSize={{base: '3xl', sm: '4xl', md: '6xl'}}
                    lineHeight={'110%'}
                    textAlign={'center'}
                    py={{base: 10, md: 10}}>
                    Your projects
                </Heading>

                <ProjectsContainer projects={projects}/>
            </VStack>

        </Center>
    );
}

export default Projects;
