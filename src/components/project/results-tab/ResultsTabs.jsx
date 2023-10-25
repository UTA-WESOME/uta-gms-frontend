import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import RankingTab from "./ranking-tab/RankingTab.jsx";
import HasseDiagramTab from "./hasse-diagram-tab/HasseDiagramTab.jsx";
import FunctionsTab from "./functions-tab/FunctionsTab.jsx";

const ResultsTabs = ({ alternatives, hasseGraph }) => {
    return (
        <>
            <Tabs variant={'soft-rounded'}
                  colorScheme={'teal'}
                  px={{ base: 2, sm: 5 }}
            >
                <TabList>
                    <Tab>Hasse diagram</Tab>
                    <Tab>Ranking</Tab>
                    <Tab>Functions</Tab>
                </TabList>
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
                        <FunctionsTab/>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </>
    )
}

export default ResultsTabs;