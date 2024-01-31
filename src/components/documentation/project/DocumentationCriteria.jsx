import { Box, Center, Image, Text } from "@chakra-ui/react";

const DocumentationCriteria = () => {
    return (
        <Box>
            <Text my={5}>
                The first of the tabs is the <b>Criteria</b> tab. It allows the user to add criteria to the problem.
                After clicking on the <b>New criterion</b> button, a new row with default values appears. The name, type, and
                number of linear segments can be modified to suit the desired values. In order to use the general
                function when calculating the results, the number of linear segments should be set to 0.
            </Text>
            <Center>
                <Box p={4} borderWidth={'1px'} borderRadius={5}>
                    <Image src='/documentation/criteria.png' alt='Criteria'/>
                </Box>
            </Center>
        </Box>
    )
}

export default DocumentationCriteria;