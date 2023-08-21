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
                minH={{ base: '99%', md: '200px' }}
                maxH={{ base: '99%', md: '225px' }}
                maxW={{ base: 'full', md: '275px' }}
                w={'full'}
                h={'99%'}
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
        </CustomTooltip>
    );
};
export default AddProjectCard;
