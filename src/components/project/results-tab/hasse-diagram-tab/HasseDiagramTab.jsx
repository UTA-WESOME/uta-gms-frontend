import { Box, Heading, useColorModeValue } from "@chakra-ui/react";
import Graphviz from "./Graphviz.jsx";
import { generateDotString } from "./graph.js";
import CustomTooltip from "../../../CustomTooltip.jsx";
import { WarningIcon } from "@chakra-ui/icons";


const HasseDiagramTab = ({ alternatives }) => {

    const jsonGraph = {
        "47": [
            '52',
            '57'
        ],
        "48": [
            '74'
        ],
        "49": [
            '74',
            '56'
        ],
        "50": [
            '53'
        ],
        "51": [
            '74'
        ],
        "52": [
            '56',
            '51'
        ],
        "53": [
            '57',
            '52',
            '50',
            '54',
            '48'
        ],
        "55": [
            '48'
        ],
        "57": [
            '49'
        ],
        '56': [],
        '74': [],
    };

    const bgColor = useColorModeValue("#FFFFFF", "#1A202C")
    const nodeBgColor = useColorModeValue("#E2E8F0", "#F7FAFC")

    return (
        <Box textAlign={'center'} mx={{ base: '1%', sm: '10%', lg: '18%', '2xl': '25%' }} mt={'10px'}>
            <Heading size={{base: 'md', md: 'xl'}} mb={3}>
                Hasse diagram
                {alternatives.some(alt => alt.ranking === 0) &&
                    <CustomTooltip
                        label={'Click "Save & run" button to update ranking!'}
                        openDelay={200}>
                        <WarningIcon ml={{ base: 1, md: 2, xl: 3 }} mb={{ base: 1, md: 3 }}
                                     color={'orange.200'}/>
                    </CustomTooltip>
                }
            </Heading>
            <Graphviz
                dot={generateDotString(jsonGraph, bgColor, nodeBgColor)}
            />

        </Box>
    )
}

export default HasseDiagramTab;