import { Box, Heading, useColorModeValue } from "@chakra-ui/react";
import Graphviz from "./Graphviz.jsx";
import { generateDotString } from "./graph.js";
import CustomTooltip from "../../../CustomTooltip.jsx";
import { WarningIcon } from "@chakra-ui/icons";


const HasseDiagramTab = ({ alternatives, hasseGraph }) => {

    const bgColor = useColorModeValue("#FFFFFF", "#1A202C");
    const nodeBgColor = useColorModeValue("#E2E8F0", "#F7FAFC");

    return (
        <Box textAlign={'center'} mx={{ base: '0%', lg: '18%', '2xl': '25%' }} mt={'10px'}>
            <Heading size={{ base: 'md', md: 'xl' }} mb={3}>
                Hasse diagram
                {alternatives.current.some(alt => alt.ranking === 0) &&
                    <CustomTooltip
                        label={'Click "Save & run" button to update ranking!'}
                        openDelay={200}>
                        <WarningIcon ml={{ base: 1, md: 2, xl: 3 }} mb={{ base: 1, md: 3 }}
                                     color={'orange.200'}/>
                    </CustomTooltip>
                }
            </Heading>
            <Graphviz
                dot={generateDotString(hasseGraph, alternatives, bgColor, nodeBgColor)}
            />

        </Box>
    )
}

export default HasseDiagramTab;