import { Box, Flex } from "@chakra-ui/react";
import CategoriesPanel from "./categories/CategoriesPanel.jsx";

const CategoriesTab = ({ categories }) => {


    return (
        <Flex
            w={'full'}
            h={'full'}
            justify={'space-evenly'}
        >
            <Box
                w={'30%'}
                m={3}
                mt={4}
            >
                <CategoriesPanel
                    categories={categories}
                />
            </Box>
            <Box
                w={'70%'}
                m={3}
                mt={4}
                borderWidth={'1px'}
                borderRadius={5}
            >
                Graph here
            </Box>
        </Flex>
    )
}

export default CategoriesTab;