import {
    Box,
    Button, Divider,
    Heading,
    Icon,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    useColorModeValue,
    useMediaQuery,
    VStack
} from "@chakra-ui/react";
import { FaRankingStar } from "react-icons/fa6";
import { BsDiagram2Fill } from "react-icons/bs";
import { TbMathFunction } from "react-icons/tb";
import Graphviz from "../../utils/Graphviz.jsx";
import { generateHierarchyDotString } from "./graph.js";
import { useState } from "react";
import { FaArrowUp } from "react-icons/fa";
import HasseDiagramTab from "./hasse-diagram-tab/HasseDiagramTab.jsx";
import RankingTab from "./ranking-tab/RankingTab.jsx";
import FunctionsTab from "./functions-tab/FunctionsTab.jsx";
import PercentagesTab from "./percentages-tab/PercentagesTab.jsx";

const ResultsTabs = ({ alternatives, criteria, categories }) => {

    const bgColor = useColorModeValue("#FFFFFF", "#1A202C");
    const categoryBgColor = useColorModeValue("#E2E8F0", "#F7FAFC");
    const categoryBgColorHover = useColorModeValue("#4FD1C5", "#38B2AC")
    const [currentCategoryId, setCurrentCategoryId] = useState(0);
    const [isLargerThan480] = useMediaQuery('(min-width: 480px)');

    return (
        <>
            <VStack>
                {currentCategoryId === 0 ?
                    <Heading size={'lg'} my={4}>Click on a category to see results</Heading>
                    :
                    <>
                        <Heading
                            size={'lg'}
                            my={4}
                        >Results for {categories.find(c => c.id === currentCategoryId).name}</Heading>
                        <Button
                            colorScheme={'teal'}
                            onClick={() => setCurrentCategoryId(0)}
                            leftIcon={<FaArrowUp/>}
                        >Hierarchy</Button>
                    </>
                }
            </VStack>
            {currentCategoryId === 0 ?
                <Box _hover={{ cursor: 'pointer' }}>
                    <Graphviz
                        dot={generateHierarchyDotString(categories, bgColor, categoryBgColor)}
                        currentCategoryId={currentCategoryId}
                        setCurrentCategoryId={setCurrentCategoryId}
                        categoryBgColor={categoryBgColor}
                        categoryBgColorHover={categoryBgColorHover}
                    />
                </Box>
                :
                <Box borderWidth={'1px'} borderRadius={'lg'} p={3} mt={3}>
                    <Tabs variant={'soft-rounded'}
                          colorScheme={'teal'}
                          px={{ base: 2, sm: 5 }}
                          isFitted={!isLargerThan480}
                    >
                        <TabList mx={{ base: 0, sm: '15px' }} mb={2}>
                            {isLargerThan480 ?
                                <>
                                    <Tab>Hasse diagram</Tab>
                                    <Tab>Ranking</Tab>
                                    <Tab>Functions</Tab>
                                    <Tab>Percentages</Tab>
                                </>
                                :
                                <>
                                    <Tab fontSize={'20px'}>
                                        <Icon as={BsDiagram2Fill}></Icon>
                                    </Tab>
                                    <Tab fontSize={'20px'}>
                                        <Icon as={FaRankingStar}></Icon>
                                    </Tab>
                                    <Tab fontSize={'20px'}>
                                        <Icon as={TbMathFunction}></Icon>
                                    </Tab>
                                </>

                            }
                        </TabList>

                        <Divider/>
                        <TabPanels>
                            <TabPanel>
                                <HasseDiagramTab
                                    alternatives={alternatives}
                                    hasseGraph={categories.find(c => c.id === currentCategoryId).hasse_graph}
                                />
                            </TabPanel>
                            <TabPanel>
                                <RankingTab
                                    alternatives={alternatives}
                                    rankings={categories.find(c => c.id === currentCategoryId).rankings}
                                />
                            </TabPanel>
                            <TabPanel>
                                <FunctionsTab
                                    criteria={criteria}
                                    functions={categories.find(c => c.id === currentCategoryId).function_points}
                                />
                            </TabPanel>
                            <TabPanel>
                                <PercentagesTab
                                    alternatives={alternatives}
                                    percentages={categories.find(c => c.id === currentCategoryId).percentages}
                                />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>
            }


        </>
    )
}

export default ResultsTabs;