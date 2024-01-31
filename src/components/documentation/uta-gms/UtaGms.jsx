import { Box, Divider, Heading, Text } from "@chakra-ui/react";
import DocumentationHeading from "../DocumentationHeading.jsx";

const UtaGms = () => {
    return (
        <Box>
            <Heading>UTA-GMS</Heading>
            <Divider my={2}/>
            <Text my={5}>
                This section of the documentation is dedicated to the UTA-GMS method.
            </Text>

            <DocumentationHeading id={'basic-concepts'} as={'h3'} size={'lg'}>Basic concepts</DocumentationHeading>
            <Divider my={2}/>
            <Text my={5}>
                In the context of a set of <b>alternatives</b> characterized by a set of <b>criteria</b>, the primary objective of the
                ranking problem is to establish either a complete or partial preorder among these variants.
            </Text>
        </Box>
    )
}

export default UtaGms;