import {
    Box,
    Button,
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

const ResultsTabs = ({ alternatives, criteria, categories }) => {

    const bgColor = useColorModeValue("#FFFFFF", "#1A202C");
    const categoryBgColor = useColorModeValue("#E2E8F0", "#F7FAFC");
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
                    />
                </Box>
                :
                <Box borderWidth={'1px'} borderRadius={'lg'} p={3} mt={3}>
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
                            <TabPanel>
                                <div>hasse diagram tab</div>
                                {/*<HasseDiagramTab*/}
                                {/*    alternatives={alternatives}*/}
                                {/*    hasseGraph={hasseGraph}*/}
                                {/*/>*/}
                            </TabPanel>
                            <TabPanel>
                                <div>ranking tab</div>
                                {/*<RankingTab*/}
                                {/*    alternatives={alternatives}*/}
                                {/*/>*/}
                            </TabPanel>
                            <TabPanel>
                                <div>functions tab</div>
                                {/*<FunctionsTab*/}
                                {/*    criteria={criteria}*/}
                                {/*/>*/}
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>
            }


        </>
    )
}

export default ResultsTabs;