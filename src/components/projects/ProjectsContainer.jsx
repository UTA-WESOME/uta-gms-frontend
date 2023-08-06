import { useNavigate, useOutletContext } from "react-router-dom";
import { Box, Button, Container, Flex, Heading, Icon, Stack, Text, useColorModeValue } from "@chakra-ui/react";
import { useEffect } from "react";

import ProjectCard from "./ProjectCard";
import AddProjectCard from "./AddProjectCard";


const ProjectsContainer = ({ data }) => {

    return (
        <Container maxW={'5x1'} my={6} >
            <Flex flexWrap="wrap" gridGap={6}>
                <>
                    {data.map((project) => (
                        <ProjectCard
                            name={project.name}
                            description={project.description}
                        />
                    ))}
                </>
                <AddProjectCard />
            </Flex>
        </Container>

    )

};
export default ProjectsContainer;
