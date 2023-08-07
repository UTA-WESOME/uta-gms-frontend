import { 
    Icon, 
    IconButton, 
    Tooltip, 
    useColorModeValue, 
} from '@chakra-ui/react';
import { BiSolidPlusCircle } from "react-icons/bi";


const AddProjectCard = () => {
    return (
        <Tooltip label="New project"
            bg={useColorModeValue('gray.100', 'gray.700')}
            color={useColorModeValue('black.800', 'white.500')}
            borderRadius='lg'
            padding={'3'}
            openDelay={500} >
            <IconButton
                maxW={{ base: 'full', md: '275px', }}
                w={'full'}
                h={'full'}
                borderWidth='1px'
                borderRadius='lg'
                overflow='hidden'
                p={5}
                isRound={true}
                variant='solid'
                colorScheme='black'
                aria-label='Add'
                icon={<Icon
                    as={BiSolidPlusCircle}
                    w={'50%'}
                    h={'50%'}
                    color={useColorModeValue('teal.500', 'teal.200')}
                    _hover={{ color: useColorModeValue('teal.200', 'teal.500') }} />}
            />
        </Tooltip>
    );
};
export default AddProjectCard;
