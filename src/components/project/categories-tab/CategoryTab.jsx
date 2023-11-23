import { Box, Center, Flex, Heading, Show, useColorModeValue } from "@chakra-ui/react";
import CategoriesPanel from "./panel/CategoriesPanel.jsx";
import Graphviz from "../../utils/Graphviz.jsx";
import { generateHierarchyDotString } from "./hierarchy/graph.js";
import * as c from "./../../../config.js";

const CategoryTab = ({ alternatives, criteria, categories, setCategories, setPreferenceIntensities }) => {

    const bgColor = useColorModeValue("#FFFFFF", "#1A202C");
    const categoryBgColor = useColorModeValue("#E2E8F0", "#F7FAFC");
    return (

        <>
            {/*DESKTOP*/}
            <Show above={c.Categories.minWidthDesktop}>
                <Flex
                    w={'full'}
                    h={'full'}
                    justify={'space-evenly'}
                    m={3}
                >
                    {/*PANEL*/}
                    <Box w={'45%'} mx={3}>
                        <CategoriesPanel
                            alternatives={alternatives}
                            criteria={criteria}
                            categories={categories}
                            setCategories={setCategories}
                            setPreferenceIntensities={setPreferenceIntensities}
                        />
                    </Box>

                    {/*HIERARCHY GRAPH*/}
                    <Box w={'55%'} mx={3}>
                        <Center>
                            <Heading size={'lg'} my={4}>Hierarchy</Heading>
                        </Center>
                        <Graphviz
                            dot={generateHierarchyDotString(categories, criteria, bgColor, categoryBgColor)}
                            download={true}
                        />
                    </Box>
                </Flex>
            </Show>

            {/*MOBILE*/}
            <Show below={c.Categories.maxWidthMobile}>
                {/*PANEL*/}
                <Box m={3}>
                    <CategoriesPanel
                        alternatives={alternatives}
                        criteria={criteria}
                        categories={categories}
                        setCategories={setCategories}
                        setPreferenceIntensities={setPreferenceIntensities}
                    />
                </Box>

                {/*HIERARCHY GRAPH*/}
                <Box m={3}>
                    <Center>
                        <Heading size={'lg'} my={4}>Hierarchy</Heading>
                    </Center>
                    <Graphviz
                        dot={generateHierarchyDotString(categories, criteria, bgColor, categoryBgColor)}
                        download={true}
                    />
                </Box>
            </Show>

        </>
    )
}

export default CategoryTab;