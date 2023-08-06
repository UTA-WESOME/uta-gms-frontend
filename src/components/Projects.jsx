import { useNavigate, useOutletContext } from "react-router-dom";
import { Box, Button, Container, Flex, Heading, Icon, Stack, Text, useColorModeValue } from "@chakra-ui/react";
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
        <Container maxW={'5xl'}>
            <Container maxW={'5xl'}>
                <Stack
                    textAlign={'center'}
                    align={'center'}
                    spacing={{ base: 8, md: 10 }}
                    py={{ base: 10, md: 10 }}
                >
                    <Heading
                        fontWeight={600}
                        fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}
                        lineHeight={'110%'}>
                        Your projects
                    </Heading>
                </Stack>
            </Container>

            <ProjectsContainer data={jsonProjects} />
            
        </Container>
    );
}

export default Projects;
