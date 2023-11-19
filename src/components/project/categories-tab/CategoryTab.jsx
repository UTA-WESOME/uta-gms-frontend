import { Box, Center, Flex, Heading, useColorModeValue } from "@chakra-ui/react";
import CategoriesPanel from "./panel/CategoriesPanel.jsx";
import Graphviz from "../../utils/Graphviz.jsx";
import { generateHierarchyDotString } from "./hierarchy/graph.js";

const CategoryTab = ({ alternatives, criteria, categories, setCategories, setPreferenceIntensities }) => {

    const bgColor = useColorModeValue("#FFFFFF", "#1A202C");
    const categoryBgColor = useColorModeValue("#E2E8F0", "#F7FAFC");
    return (
        <Flex
            w={'full'}
            h={'full'}
            justify={'space-evenly'}
            m={3}
        >

            {/*PANEL*/}
            <Box
                w={'35%'}
                mx={3}
            >
                <CategoriesPanel
                    alternatives={alternatives}
                    criteria={criteria}
                    categories={categories}
                    setCategories={setCategories}
                    setPreferenceIntensities={setPreferenceIntensities}
                />
            </Box>

            {/*HIERARCHY GRAPH*/}
            <Box
                w={'65%'}
                mx={3}
            >
                <Center>
                    <Heading size={'lg'} my={4}>Hierarchy</Heading>
                </Center>
                <Graphviz
                    dot={generateHierarchyDotString(categories, criteria, bgColor, categoryBgColor)}
                    download={true}
                />
            </Box>
        </Flex>
    )
}

export default CategoryTab;