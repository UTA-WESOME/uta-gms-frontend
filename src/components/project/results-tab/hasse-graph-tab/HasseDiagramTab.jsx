import { Box, Heading, useColorModeValue } from "@chakra-ui/react";
import Graphviz from "../../../utils/Graphviz.jsx";
import { generateDotString } from "./graph.js";


const HasseDiagramTab = ({ alternatives, necessaryRelations }) => {

    const bgColor = useColorModeValue("#FFFFFF", "#1A202C");
    const nodeBgColor = useColorModeValue("#E2E8F0", "#F7FAFC");

    return (
        <Box textAlign={'center'} mx={{ base: '0%', lg: '18%' }} mt={'10px'}>
            <Heading size={{ base: 'md', md: 'xl' }} mb={3}>
                Hasse graph
            </Heading>
            <Graphviz
                dot={generateDotString(necessaryRelations, alternatives, bgColor, nodeBgColor)}
                download={true}
            />
        </Box>
    )
}

export default HasseDiagramTab;