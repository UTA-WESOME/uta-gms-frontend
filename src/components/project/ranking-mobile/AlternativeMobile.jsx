import { Box, Text, useColorModeValue } from "@chakra-ui/react";

const AlternativeMobile = ({ name }) => {
    return (
        <Box
            borderWidth={'1px'}
            borderRadius={'lg'}
            bg={useColorModeValue('teal.200', 'teal')}
            py={2}
            my={3}
            mx={12}
            textAlign={'center'}
        >
            <Text>{name}</Text>
        </Box>
    )
}

export default AlternativeMobile;