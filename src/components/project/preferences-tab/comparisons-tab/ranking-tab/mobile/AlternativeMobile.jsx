import { Box, Text, useColorModeValue } from "@chakra-ui/react";

const AlternativeMobile = ({ name }) => {
    return (
        <Box
            borderWidth={'1px'}
            borderRadius={'lg'}
            bg={useColorModeValue('teal.200', 'teal')}
            py={2}
            my={3}
            w={{base: '125px', sm: '250px', md: '300px', lg: '450px'}}
            mx={'auto'}
            textAlign={'center'}
        >
            <Text>{name}</Text>
        </Box>
    )
}

export default AlternativeMobile;