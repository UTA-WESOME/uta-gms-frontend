import {
    Icon,
    IconButton,
    useColorModeValue,
} from '@chakra-ui/react';
import { BiSolidPlusCircle } from "react-icons/bi";
import CustomTooltip from '../CustomTooltip';


const AddProjectCard = () => {
    return (
        <CustomTooltip label="New Project" >
            <IconButton
                maxW={{ base: 'full', sm: '70%', md: '275px' }}
                minH={{ base: 'full', md: '200px' }}
                maxH={{ base: 'full', md: '275px' }}
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
                _hover={{ bg: useColorModeValue('gray.200', 'gray.700') }}
                icon={<Icon
                    as={BiSolidPlusCircle}
                    w={'50%'}
                    h={'50%'}
                    color={useColorModeValue('teal.500', 'teal.200')}
                    _hover={{ color: useColorModeValue('teal.200', 'teal.500') }} />}
            />
        </CustomTooltip>
    );
};
export default AddProjectCard;
