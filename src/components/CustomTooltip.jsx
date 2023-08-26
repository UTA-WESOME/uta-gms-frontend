import {
    Tooltip,
    useColorModeValue,
} from '@chakra-ui/react';


const CustomTooltip = (props) => {
    return (
        <Tooltip label={props.label}
            bg={useColorModeValue('gray.100', 'gray.700')}
            color={useColorModeValue('black.800', 'white.500')}
            borderRadius='lg'
            padding={'3'}
            openDelay={props.openDelay ? props.openDelay : 700} >
            {props.children}
        </Tooltip>
    );
};
export default CustomTooltip;