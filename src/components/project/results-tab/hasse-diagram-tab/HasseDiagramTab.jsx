import { Box, Heading, Highlight, Text, useColorModeValue } from "@chakra-ui/react";
import Graphviz from "../../../utils/Graphviz.jsx";
import { generateDotString } from "./graph.js";


const HasseDiagramTab = ({ alternatives, hasseGraph }) => {

    const bgColor = useColorModeValue("#FFFFFF", "#1A202C");
    const nodeBgColor = useColorModeValue("#E2E8F0", "#F7FAFC");

    return (
        <Box textAlign={'center'} mx={{ base: '0%', lg: '18%' }} mt={'10px'}>
            <Heading size={{ base: 'md', md: 'xl' }} mb={3}>
                Hasse diagram
            </Heading>
            {hasseGraph !== null && Object.keys(hasseGraph).length === 0 ?
                <Text p={5} fontSize={'lg'}>
                    <Highlight
                        fontSize={'lg'}
                        query={'Save & run'}
                        styles={{ px: '3', py: '2', rounded: 'md', bg: 'orange.200' }}
                    >Click Save & run button</Highlight>
                </Text>
                :
                <Graphviz
                    dot={generateDotString(hasseGraph, alternatives, bgColor, nodeBgColor)}
                    download={true}
                />
            }

        </Box>
    )
}

export default HasseDiagramTab;