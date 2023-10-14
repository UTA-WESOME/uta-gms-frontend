import {
    Box,
    ButtonGroup,
    Grid,
    GridItem,
    Icon,
    IconButton,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import { useState, } from "react";
import { useNavigate } from "react-router-dom";
import { BiRightArrow, BiLeftArrow, } from "react-icons/bi";

import ProjectCard from "./ProjectCard";
import AddProjectCard from "./AddProjectCard";
import CustomTooltip from "../CustomTooltip";


const ProjectsContainer = ({ projects }) => {

    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(0);
    const projectsPerPage = 12;
    const totalPages = Math.ceil((projects.length + 1) / projectsPerPage);

    const startIndex = currentPage * projectsPerPage;
    const endIndex = Math.min(startIndex + projectsPerPage, projects.length);

    const handleNextPage = () => {
        setCurrentPage((previousPage) => Math.min(previousPage + 1, totalPages - 1));
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
    };

    return (
        <>
            <ButtonGroup size='base' isAttached variant='outline'>
                <CustomTooltip label="Previous page">
                    <IconButton
                        aria-label='Previous'
                        padding={'2'}
                        onClick={handlePrevPage}
                        icon={<Icon as={BiLeftArrow} minH={'6'} minW={'6'}
                            color={useColorModeValue('gray.700', 'gray.100')} />}
                    />
                </CustomTooltip>
                <Box
                    borderWidth='1px'>
                    <Text
                        aria-label='2'
                        padding={'2'}
                        px={'4'}>

                        {currentPage + 1}
                    </Text>
                </Box>
                <CustomTooltip label='Next page'>
                    <IconButton
                        aria-label='Next'
                        padding={'2'}
                        onClick={handleNextPage}
                        icon={<Icon as={BiRightArrow} minH={'6'} minW={'6'}
                            color={useColorModeValue('gray.700', 'gray.100')} />}
                    />
                </CustomTooltip>
            </ButtonGroup>
            <Grid
                h='full'
                w='full'
                templateRows={{ base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(2, 1fr)' }}
                templateColumns={{
                    base: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)',
                    lg: 'repeat(3, 1fr)', xl: 'repeat(3, 1fr)', '2xl': 'repeat(4, 1fr)'
                }}
                gap={4}>
                <>
                    {projects && projects.slice(startIndex, endIndex).map((project) => (
                        <GridItem
                            key={project.id}
                            w={'100%'}
                            h={'100%'}
                            align={'center'}
                            maxW={{ base: '100%', sm: '4xl', md: '6xl' }}>
                            <ProjectCard
                                id={project.id}
                                name={project.name}
                                createdAt={project.created_at}
                                description={project.description}
                            />
                        </GridItem>
                    ))}
                </>
                <>
                    {projects && (currentPage === totalPages - 1) &&
                        <GridItem
                            w={'100%'}
                            h={'100%'}
                            align={'center'}
                            maxW={{ base: '100%', sm: '4xl', md: '6xl' }}
                            onClick={() => navigate("/projects/new")}
                        >
                            <AddProjectCard />
                        </GridItem>
                    }
                </>
            </Grid>
        </>
    )

};
export default ProjectsContainer;
