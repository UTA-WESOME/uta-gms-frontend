import { Box, Center, HStack, Text, useColorModeValue } from "@chakra-ui/react";

const InconsistenciesGroup = ({ groupNumber, inconsistencies }) => {

    return (
        <Box
            borderWidth={useColorModeValue('3px', '1px')}
            borderRadius={'lg'}
            mx={{ base: 0, sm: 2, md: 4, lg: 10, xl: 20, '2xl': '10%' }}
            my={5}
            bg={useColorModeValue('gray.50', 'gray.700')}
        >
            <Center>
                <Text my={2}>Group {groupNumber}</Text>
            </Center>
            <hr/>
            {inconsistencies.map((inconsistency, index) => (
                <HStack
                    borderTopWidth={'1px'}
                    borderBottomWidth={index === inconsistencies.length - 1 ? '1px' : '0px'}
                    p={2}
                    key={index}
                >
                    <Text mx={4}>{index + 1}. {inconsistency.data}</Text>
                </HStack>
            ))}
        </Box>
    )
}

export default InconsistenciesGroup;