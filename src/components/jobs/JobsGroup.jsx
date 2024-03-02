import { Box, HStack, Text, useColorModeValue } from "@chakra-ui/react";

const JobsGroup = ({ groupNumber, jobs }) => {
    return (
        <Box
            borderWidth={useColorModeValue('3px', '1px')}
            borderRadius={'lg'}
            mx={{ base: 0, sm: 2, md: 4, lg: 10, xl: 20, '2xl': '10%' }}
            my={5}
            bg={useColorModeValue('gray.50', 'gray.700')}
        >
            <Text my={2}>Calculations number {groupNumber}</Text>
            <hr/>
            {jobs.map((job, index) => (
                <HStack
                    borderTopWidth={'1px'}
                    borderBottomWidth={index === jobs.length - 1 ? '1px' : '0px'}
                    p={2}
                    key={index}
                >
                    <Text mx={4}>{index + 1}. {job.name} {JSON.stringify(job.ready)}</Text>
                </HStack>
            ))}
        </Box>
    )
}

export default JobsGroup;