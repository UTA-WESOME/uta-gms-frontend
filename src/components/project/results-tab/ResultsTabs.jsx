import { Icon, Tab, TabList, TabPanel, TabPanels, Tabs, useMediaQuery } from "@chakra-ui/react";
import RankingTab from "./ranking-tab/RankingTab.jsx";
import HasseDiagramTab from "./hasse-diagram-tab/HasseDiagramTab.jsx";
import FunctionsTab from "./functions-tab/FunctionsTab.jsx";
import { FaRankingStar } from "react-icons/fa6";
import { BsDiagram2Fill } from "react-icons/bs";
import { TbMathFunction } from "react-icons/tb";

const ResultsTabs = ({ alternatives, criteria, hasseGraph }) => {

    const [isLargerThan480] = useMediaQuery('(min-width: 480px)');

    return (
        <>
            <Tabs variant={'soft-rounded'}
                  colorScheme={'teal'}
                  px={{ base: 2, sm: 5 }}
                  isFitted={!isLargerThan480}
            >
                {isLargerThan480 ?
                    <TabList>
                        <Tab>Hasse diagram</Tab>
                        <Tab>Ranking</Tab>
                        <Tab>Functions</Tab>
                    </TabList>
                    :
                    <TabList>
                        <Tab fontSize={'20px'}>
                            <Icon as={BsDiagram2Fill}></Icon>
                        </Tab>
                        <Tab fontSize={'20px'}>
                            <Icon as={FaRankingStar}></Icon>
                        </Tab>
                        <Tab fontSize={'20px'}>
                            <Icon as={TbMathFunction}></Icon>
                        </Tab>
                    </TabList>
                }

                <TabPanels>
                    <TabPanel p={1} py={2}>
                        <HasseDiagramTab
                            alternatives={alternatives}
                            hasseGraph={hasseGraph}
                        />
                    </TabPanel>
                    <TabPanel p={1} py={2}>
                        <RankingTab
                            alternatives={alternatives}
                        />
                    </TabPanel>
                    <TabPanel>
                        <FunctionsTab
                            criteria={criteria}
                        />
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </>
    )
}

export default ResultsTabs;