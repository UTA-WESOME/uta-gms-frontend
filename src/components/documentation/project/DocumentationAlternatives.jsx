import { Box, Center, Image, Text } from "@chakra-ui/react";

const DocumentationAlternatives = () => {
    return (
        <Box>
            <Text my={5} textAlign={'justify'}>
                The <b>Alternatives</b> tab is used not only to add alternatives to the problem but also to enter all
                the values from the performance table. Each row represents one alternative. The previously defined
                criteria are the columns of the table. The color  of each column corresponds to the type of criterion.
                The green name of the column means that the criterion is of the type <i>gain</i>. A red name means that the criterion is of type <i>cost</i>.
            </Text>
            <Center>
                <Box p={4} borderWidth={'1px'} borderRadius={5}>
                    <Image src='/documentation/alternatives.png' alt='Alternatives'/>
                </Box>
            </Center>
        </Box>
    )
}

export default DocumentationAlternatives;