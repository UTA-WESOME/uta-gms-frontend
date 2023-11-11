import { Box, Center, Flex, Heading, useColorModeValue } from "@chakra-ui/react";
import CategoriesPanel from "./panel/CategoriesPanel.jsx";
import Graphviz from "../../utils/Graphviz.jsx";
import { generateHierarchyDotString } from "./hierarchy/graph.js";

const CategoryTab = ({ criteria, categories, setCategories }) => {

    const bgColor = useColorModeValue("#FFFFFF", "#1A202C");
    const categoryBgColor = useColorModeValue("#E2E8F0", "#F7FAFC");
    const criterionBgColor = useColorModeValue("#38B2AC", "#81E6D9")
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
                    criteria={criteria}
                    categories={categories}
                    setCategories={setCategories}
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
                    dot={generateHierarchyDotString(categories, criteria, bgColor, categoryBgColor, criterionBgColor)}
                />
            </Box>
        </Flex>
    )
}

export default CategoryTab;