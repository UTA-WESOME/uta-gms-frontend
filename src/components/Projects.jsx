import { useNavigate, useOutletContext } from "react-router-dom";
import { 
    Center,
    Heading, 
    VStack, 
 } from "@chakra-ui/react";
import { useEffect } from "react";

import ProjectsContainer from "./projects/ProjectsContainer";
import jsonProjects from "../static/some-projects-data.json";

const Projects = () => {

    const navigate = useNavigate();
    const { jwtToken } = useOutletContext();

    useEffect(() => {
        if (jwtToken === "") {
            navigate("/");
        }
    }, [jwtToken]);


    return (
        <Center>
            <VStack
                w={{ base: '80%' }}
                mx={'20'}
                marginBottom={'10'}
                justify={'center'}
                spacing={'1rem'} >
                <Heading
                    fontWeight={600}
                    fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
                    lineHeight={'110%'}
                    textAlign={'center'}
                    py={{ base: 10, md: 10 }} >
                    Your projects
                </Heading>

                <ProjectsContainer data={jsonProjects} />
            </VStack>

        </Center>
    );
}

export default Projects;
