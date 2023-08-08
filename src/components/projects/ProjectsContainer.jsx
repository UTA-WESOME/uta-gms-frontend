import {
    Box,
    ButtonGroup,
    Grid,
    GridItem,
    Icon,
    IconButton,
    Text,
    Tooltip,
    useColorModeValue,
} from "@chakra-ui/react";
import {useState,} from "react";
import {BiRightArrow, BiLeftArrow,} from "react-icons/bi";

import ProjectCard from "./ProjectCard";
import AddProjectCard from "./AddProjectCard";
import {useNavigate} from "react-router-dom";


const ProjectsContainer = ({projects, jwtToken}) => {

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
                <Tooltip label="Previous page"
                         bg={useColorModeValue('gray.100', 'gray.700')}
                         color={useColorModeValue('black.800', 'white.500')}
                         borderRadius='lg'
                         padding={'3'}
                         openDelay={1000}>
                    <IconButton
                        aria-label='Previous'
                        padding={'2'}
                        onClick={handlePrevPage}
                        icon={<Icon as={BiLeftArrow} minH={'6'} minW={'6'}
                                    color={useColorModeValue('gray.700', 'gray.100')}/>}
                    />
                </Tooltip>
                <Box
                    borderWidth='1px'>
                    <Text
                        aria-label='2'
                        padding={'2'}
                        px={'4'}>

                        {currentPage + 1}
                    </Text>
                </Box>
                <Tooltip label="Next page"
                         bg={useColorModeValue('gray.100', 'gray.700')}
                         color={useColorModeValue('black.800', 'white.500')}
                         borderRadius='lg'
                         padding={'3'}
                         openDelay={1000}>
                    <IconButton
                        aria-label='Next'
                        padding={'2'}
                        onClick={handleNextPage}
                        icon={<Icon as={BiRightArrow} minH={'6'} minW={'6'}
                                    color={useColorModeValue('gray.700', 'gray.100')}/>}
                    />
                </Tooltip>
            </ButtonGroup>
            <Grid
                h='full'
                w='full'
                templateRows={{base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(2, 1fr)'}}
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
                            maxW={{base: '100%', sm: '4xl', md: '6xl'}}>
                            <ProjectCard
                                id={project.id}
                                name={project.name}
                                description={project.description}
                                jwtToken={jwtToken}
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
                            maxW={{base: '100%', sm: '4xl', md: '6xl'}}
                            onClick={() => navigate("/newproject")}
                        >
                            <AddProjectCard/>
                        </GridItem>
                    }
                </>
            </Grid>
        </>
    )

};
export default ProjectsContainer;
