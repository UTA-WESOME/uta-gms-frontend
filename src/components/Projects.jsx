import {useNavigate, useOutletContext} from "react-router-dom";
import {
    Center,
    Heading,
    VStack,
} from "@chakra-ui/react";
import {useEffect, useState} from "react";

import ProjectsContainer from "./projects/ProjectsContainer";

const Projects = () => {

    const navigate = useNavigate();
    const {jwtToken} = useOutletContext();
    const [projects, setProjects] = useState([]);


    useEffect(() => {
        if (jwtToken === "") {
            navigate("/");
        } else {

            let headers = new Headers();
            headers.append("Content-Type", "application/json");
            headers.append("Authorization", "Bearer " + jwtToken);

            fetch(`http://localhost:8080/api/projects/`, {
                method: "GET",
                headers: headers
            }).then(response => {
                if (!response.ok) {
                    console.log(response.status);
                }
                return response.json();
            }).then(data => {
                setProjects(data);
            }).catch(err => {
                console.log(err);
            })
        }
    }, [projects]);


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

                <ProjectsContainer projects={projects} jwtToken={jwtToken}/>
            </VStack>

        </Center>
    );
}

export default Projects;
