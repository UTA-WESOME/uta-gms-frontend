import { Box, Center, Flex, Heading, useColorModeValue } from "@chakra-ui/react";
import CategoriesPanel from "./panel/CategoriesPanel.jsx";
import Graphviz from "../../utils/Graphviz.jsx";
import { generateHierarchyDotString } from "./hierarchy/graph.js";

const CategoriesTab = ({ categories, setCategories }) => {


    const bgColor = useColorModeValue("#FFFFFF", "#1A202C");
    const nodeBgColor = useColorModeValue("#E2E8F0", "#F7FAFC");
    return (
        <Flex
            w={'full'}
            h={'full'}
            justify={'space-evenly'}
        >
            <Box
                w={'35%'}
                m={3}
                mt={4}
            >
                <CategoriesPanel
                    categories={categories}
                    setCategories={setCategories}
                />
            </Box>
            <Box
                w={'65%'}
                m={3}
                mt={4}
            >
                <Center>
                    <Heading size={'lg'} my={4}>Hierarchy</Heading>
                </Center>
                <Graphviz
                    dot={generateHierarchyDotString(categories, bgColor, nodeBgColor)}
                />
            </Box>
        </Flex>
    )
}

export default CategoriesTab;