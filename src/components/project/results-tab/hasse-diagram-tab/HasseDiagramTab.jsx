import { Box, Heading, useColorModeValue } from "@chakra-ui/react";
import Graphviz from "./Graphviz.jsx";
import { generateDotString } from "./graph.js";
import CustomTooltip from "../../../CustomTooltip.jsx";
import { WarningIcon } from "@chakra-ui/icons";


const HasseDiagramTab = ({ alternatives }) => {

    const jsonGraph = {
        'A': ['B', 'I'],
        'B': ['A', 'D', 'F', 'H', 'K'],
        'C': ['F'],
        'D': ['H'],
        'F': ['H'],
        'H': [],
        'I': ['J'],
        'J': ['I'],
        'K': []
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
//                 dot={`digraph {
//                 compound=true;
//     graph [bgcolor="#1A202C"]
//     node [style=filled]
//     node1 [label="A" color="#F7FAFC" fontname="Segoe UI" fontsize="15 pt" ]
//     node2 [label="B" color="#F7FAFC" fontname="Segoe UI" fontsize="15 pt" ]
//     node3 [label="C" color="#F7FAFC" fontname="Segoe UI" fontsize="15 pt" ]
//     node4 [label="D" color="#F7FAFC" fontname="Segoe UI" fontsize="15 pt" ]
//     node5 [label="F" color="#F7FAFC" fontname="Segoe UI" fontsize="15 pt" ]
//     node6 [label="H" color="#F7FAFC" fontname="Segoe UI" fontsize="15 pt" ]
//     node7 [label="I" color="#F7FAFC" fontname="Segoe UI" fontsize="15 pt" ]
//     node8 [label="J" color="#F7FAFC" fontname="Segoe UI" fontsize="15 pt" ]
//     node9 [label="K" color="#F7FAFC" fontname="Segoe UI" fontsize="15 pt" ]
//     subgraph cluster_1 {
//       rank="same";
//       subgraph cluster_indifference_0 {
//         color="#F7FAFC"
//         borderRadius="10px"
//         style="rounded"
//         node1;node2;
//         }
//       subgraph cluster_indifference_1 {
//         color="#F7FAFC"
//         borderRadius="10px"
//         style="rounded"
//         node7;node8;
//         }
//       node1;node2;node3;node8;
//       peripheries=0;
//       }
//     subgraph cluster_2 {
//       rank="same";
//       subgraph cluster_indifference_1 {
//         color="#F7FAFC"
//         borderRadius="10px"
//         style="rounded"
//         node7;node8;
//         }
//       node4;node5;node7;node9;
//       peripheries=0;
//       }
//     subgraph cluster_3 {
//       rank="same";
//       node6;
//       peripheries=0;
//       }
//     node1 -> node7 [arrowhead=vee color="#4FD1C5" ltail=cluster_indifference_0 lhead=cluster_indifference_1]
//     node2 -> node4 [arrowhead=vee color="#4FD1C5" ltail=cluster_indifference_0]
//     node2 -> node5 [arrowhead=vee color="#4FD1C5" ltail=cluster_indifference_0]
//     node2 -> node9 [arrowhead=vee color="#4FD1C5" ltail=cluster_indifference_0]
//     node3 -> node5 [arrowhead=vee color="#4FD1C5"]
//     node4 -> node6 [arrowhead=vee color="#4FD1C5"]
//     node5 -> node6 [arrowhead=vee color="#4FD1C5"]
// }`}
            />

        </Box>
    )
}

export default HasseDiagramTab;