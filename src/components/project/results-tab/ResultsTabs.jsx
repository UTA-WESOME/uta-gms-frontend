import {
    Box,
    Button,
    Divider,
    Flex,
    Heading,
    HStack,
    Icon,
    IconButton,
    Spacer,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
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
import { FaArrowDown, FaArrowUp, FaPercentage } from "react-icons/fa";
import HasseDiagramTab from "./hasse-diagram-tab/HasseDiagramTab.jsx";
import RankingTab from "./ranking-tab/RankingTab.jsx";
import FunctionsTab from "./functions-tab/FunctionsTab.jsx";
import PercentagesTab from "./percentages-tab/PercentagesTab.jsx";
import * as c from "./../../../config.js";

const ResultsTabs = ({ alternatives, criteria, categories }) => {

    const bgColor = useColorModeValue("#FFFFFF", "#1A202C");
    const categoryBgColor = useColorModeValue("#E2E8F0", "#F7FAFC");
    const categoryBgColorHover = useColorModeValue("#4FD1C5", "#38B2AC")
    const [currentCategoryId, setCurrentCategoryId] = useState(0);
    const [isMobile] = useMediaQuery(`(max-width: ${c.Results.maxWidthMobile})`);

    return (
        <>
            <VStack>
                {currentCategoryId === 0 ?
                    <>
                        {!isMobile ?
                            <Heading size={'lg'} my={4}>Click on a category to see results</Heading>
                            :
                            <Heading size={'lg'} my={4}>Choose category</Heading>
                        }
                    </>
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
                <>
                    {!isMobile ?
                        <Box _hover={{ cursor: 'pointer' }} mb={5}>
                            <Graphviz
                                dot={generateHierarchyDotString(categories, bgColor, categoryBgColor)}
                                currentCategoryId={currentCategoryId}
                                setCurrentCategoryId={setCurrentCategoryId}
                                categoryBgColor={categoryBgColor}
                                categoryBgColorHover={categoryBgColorHover}
                            />
                        </Box>
                        :
                        <Flex direction={'column'} spacing={4}>
                            {categories.map((category, index) => {
                                return (
                                    <HStack
                                        borderTopWidth={'1px'}
                                        borderBottomWidth={index === criteria.length - 1 ? '1px' : '0px'}
                                        p={2}
                                        key={index}
                                    >
                                        <Text isTruncated>{category.name}</Text>
                                        <Spacer/>
                                        <IconButton
                                            colorScheme={'teal'}
                                            variant={'outline'}
                                            aria-label={'choose-category'}
                                            icon={<FaArrowDown/>}
                                            onClick={() => setCurrentCategoryId(category.id)}>
                                        </IconButton>
                                    </HStack>
                                )
                            })
                            }
                        </Flex>
                    }
                </>
                :
                <Box borderWidth={'1px'} borderRadius={'lg'} p={3} mt={3}>
                    <Tabs variant={'soft-rounded'}
                          colorScheme={'teal'}
                          px={{ base: 2, sm: 5 }}
                          isFitted={isMobile}
                    >
                        <TabList mx={{ base: 0, sm: '15px' }} mb={2}>
                            {isMobile ?
                                <>
                                    <Tab fontSize={'15px'}>
                                        <Icon as={BsDiagram2Fill}></Icon>
                                    </Tab>
                                    <Tab fontSize={'15px'}>
                                        <Icon as={FaRankingStar}></Icon>
                                    </Tab>
                                    <Tab fontSize={'15px'}>
                                        <Icon as={TbMathFunction}></Icon>
                                    </Tab>
                                    <Tab fontSize={'15px'}>
                                        <Icon as={FaPercentage}/>
                                    </Tab>
                                </>
                                :
                                <>
                                    <Tab>Hasse diagram</Tab>
                                    <Tab>Ranking</Tab>
                                    <Tab>Functions</Tab>
                                    <Tab>Percentages</Tab>
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