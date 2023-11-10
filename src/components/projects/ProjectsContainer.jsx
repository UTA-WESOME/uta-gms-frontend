import {
    Box,
    Button,
    ButtonGroup,
    Center,
    Collapse,
    FormControl,
    FormLabel,
    Grid,
    GridItem,
    Icon,
    IconButton,
    Input,
    Popover,
    PopoverArrow,
    PopoverCloseButton,
    PopoverContent,
    PopoverTrigger,
    Radio,
    RadioGroup,
    Stack,
    Switch,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useRef, useState, } from "react";
import { useNavigate } from "react-router-dom";
import { BiLeftArrow, BiRightArrow, BiSearchAlt, BiSortDown, } from "react-icons/bi";

import ProjectCard from "./ProjectCard";
import AddProjectCard from "./AddProjectCard";
import CustomTooltip from "../utils/CustomTooltip.jsx";


const ProjectsContainer = ({ projects, setProjects }) => {

    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(0);

    // searching button
    const { isOpen: isSearch, onToggle: onSearchToggle } = useDisclosure();

    // sorting button
    const { onOpen: onOpenSort, onClose: onCloseSort, isOpen: isOpenSort } = useDisclosure();
    const sortByRef = useRef('name');
    const [sortDescending, setSortDescending] = useState(false);

    const originalProjects = useRef([]);
    const projectsPerPage = 12;
    const totalPages = Math.ceil((projects.length + 1) / projectsPerPage);

    const startIndex = currentPage * projectsPerPage;
    const endIndex = Math.min(startIndex + projectsPerPage, projects.length);

    useEffect(() => {
        originalProjects.current = projects;
    }, [])

    const handleNextPage = () => {
        setCurrentPage((previousPage) => Math.min(previousPage + 1, totalPages - 1));
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
    };

    const handleFilter = (searchString) => {
        setProjects(originalProjects.current.filter(project => project.name.toLowerCase().includes(searchString.toLowerCase())));
    }

    const sortProjects = (event) => {
        event.preventDefault();

        const sortBy = sortByRef.current;
        if (sortDescending) {
            setProjects(originalProjects.current
                .sort((x, y) => x[sortBy] < y[sortBy] ? 1 : x[sortBy] > y[sortBy] ? -1 : 0)
            )
        } else {
            setProjects(originalProjects.current
                .sort((x, y) => x[sortBy] > y[sortBy] ? 1 : x[sortBy] < y[sortBy] ? -1 : 0)
            )
        }

        onCloseSort();
    }

    return (
        <>
            <Center>
                <ButtonGroup size='base' isAttached variant='outline' mb={3}>
                    <Popover
                        isOpen={isOpenSort}
                        onOpen={onOpenSort}
                        onClose={onCloseSort}
                    >
                        <PopoverTrigger>
                            <IconButton
                                aria-label={'Sort'}
                                p={2}
                                icon={<Icon as={BiSortDown} minH={'6'} minW={'6'}/>}
                            />
                        </PopoverTrigger>
                        <PopoverContent p={5}>
                            <PopoverArrow/>
                            <PopoverCloseButton/>
                            <Stack spacing={4} as={'form'} onSubmit={sortProjects}>
                                <FormControl>
                                    <FormLabel fontSize={'lg'}>Sort by</FormLabel>
                                    <RadioGroup defaultValue={sortByRef.current} onChange={(value) => {
                                        sortByRef.current = value
                                    }}>
                                        <Stack>
                                            <Radio value='name'>Project name</Radio>
                                            <Radio value='created_at'>Created date</Radio>
                                        </Stack>
                                    </RadioGroup>
                                </FormControl>
                                <FormControl display={'flex'} alignItems={'center'}>
                                    <FormLabel mb={'0'} fontSize={'lg'}>Descending</FormLabel>
                                    <Switch
                                        isChecked={sortDescending}
                                        onChange={() => setSortDescending(!sortDescending)}
                                    />
                                </FormControl>
                                <ButtonGroup display={'flex'} justifyContent={'flex-end'}>
                                    <Button variant='outline' onClick={onCloseSort}>
                                        Cancel
                                    </Button>
                                    <Button colorScheme='teal' type={'submit'}>
                                        Sort
                                    </Button>
                                </ButtonGroup>
                            </Stack>
                        </PopoverContent>
                    </Popover>

                    <CustomTooltip label="Previous page">
                        <IconButton
                            aria-label='Previous'
                            padding={'2'}
                            onClick={handlePrevPage}
                            icon={<Icon as={BiLeftArrow} minH={'6'} minW={'6'}/>}
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
                            aria-label={'Next'}
                            p={'2'}
                            onClick={handleNextPage}
                            icon={<Icon as={BiRightArrow} minH={'6'} minW={'6'}/>}
                        />
                    </CustomTooltip>
                    <CustomTooltip label={'Search'}>
                        <IconButton
                            aria-label={'Search'}
                            p={'2'}
                            onClick={onSearchToggle}
                            icon={<Icon as={BiSearchAlt} minH={'6'} minW={'6'}/>}
                        />
                    </CustomTooltip>
                </ButtonGroup>
            </Center>

            <Collapse in={isSearch} animateOpacity>
                <Center>
                    <Input placeholder='Search 🔍' maxWidth={'400px'} mt={3} mb={5}
                           onChange={(event) => handleFilter(event.target.value)}/>
                </Center>
            </Collapse>


            <Grid
                h='full'
                w='full'
                templateRows={{ base: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(2, 1fr)' }}
                templateColumns={{
                    base: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)',
                    lg: 'repeat(3, 1fr)', xl: 'repeat(3, 1fr)', '2xl': 'repeat(4, 1fr)'
                }}
                gap={4}
            >
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
                            <AddProjectCard/>
                        </GridItem>
                    }
                </>
            </Grid>
        </>
    )

};
export default ProjectsContainer;
