import {
    Box,
    ButtonGroup,
    Flex,
    Heading,
    Icon,
    IconButton,
    Spacer,
    Text,
    Tooltip,
    useColorModeValue,
} from '@chakra-ui/react';
import {
    BiEditAlt,
    BiInfoCircle,
    BiShareAlt,
    BiTrash,
} from "react-icons/bi";


const ProjectCard = ({ name, description }) => {
    return (
        <Box
            as={'button'}
            maxW={{ base: 'full', md: '275px', }}
            minH={{ base: 'full', md: '200px' }}
            maxH={{ base: 'full', md: '275px', }}
            w={'full'}
            h={'full'}
            borderWidth='1px'
            borderRadius='lg'
            overflow='hidden'
            p={5} >
            <Flex direction={'column'} spacing={'4px'} height='100%' align={{base: 'center', md: 'start'}}>
                <Heading
                    fontWeight={'400'}
                    fontSize={{ base: '1xl', sm: '2xl', md: '2xl' }}
                    lineHeight={'100%'}
                    textAlign={'start'}
                    paddingBottom={2}>
                    <Text as={'span'} color={useColorModeValue('teal.500', 'teal.200')}>
                        {name}
                    </Text>
                </Heading>
                <Text fontSize={'md'}
                    lineHeight={'110%'}
                    color={useColorModeValue('gray.700', 'gray.100')}
                    paddingTop={'2'}
                    paddingBottom={'10'}>
                    6.08.2023
                </Text>
                <Spacer />
                <Flex direction={'row'} spacing={'4px'} width='100%' justify={'center'}>
                    <ButtonGroup size='base' isAttached variant='outline'>
                        <Tooltip label={description}
                            bg={useColorModeValue('gray.100', 'gray.700')}
                            color={useColorModeValue('black.800', 'white.500')}
                            borderRadius='lg'
                            padding={'3'}
                            openDelay={500} >
                            <IconButton
                                aria-label='Info'
                                padding={'2'}
                                icon={<Icon as={BiInfoCircle} minH={'7'} minW={'7'} color={useColorModeValue('blue.500', 'blue.200')} />} />
                        </Tooltip>
                        <Tooltip label='Share'
                            bg={useColorModeValue('gray.100', 'gray.700')}
                            color={useColorModeValue('black.800', 'white.500')}
                            borderRadius='lg'
                            padding={'3'}
                            openDelay={500} >
                            <IconButton
                                aria-label='Share'
                                padding={'2'}
                                icon={<Icon as={BiShareAlt} minH={'7'} minW={'7'} color={useColorModeValue('green.500', 'green.200')} />} />
                        </Tooltip>
                        <Tooltip label='Edit'
                            bg={useColorModeValue('gray.100', 'gray.700')}
                            color={useColorModeValue('black.800', 'white.500')}
                            borderRadius='lg'
                            padding={'3'}
                            openDelay={500} >
                            <IconButton
                                aria-label='Edit'
                                padding={'2'}
                                icon={<Icon as={BiEditAlt} minH={'7'} minW={'7'} color={useColorModeValue('yellow.500', 'yellow.200')} />} />
                        </Tooltip>
                        <Tooltip label='Delete'
                            bg={useColorModeValue('gray.100', 'gray.700')}
                            color={useColorModeValue('black.800', 'white.500')}
                            borderRadius='lg'
                            padding={'3'}
                            openDelay={500} >
                            <IconButton
                                aria-label='Delete'
                                padding={'2'}
                                icon={<Icon as={BiTrash} minH={'7'} minW={'7'} color={useColorModeValue('red.500', 'red.200')} />} />
                        </Tooltip>
                    </ButtonGroup>
                </Flex>
            </Flex>
        </Box>
    );
};
export default ProjectCard;
