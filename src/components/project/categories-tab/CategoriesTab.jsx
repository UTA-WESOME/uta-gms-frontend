import { Box, Flex } from "@chakra-ui/react";
import CategoriesPanel from "./categories/CategoriesPanel.jsx";

const CategoriesTab = ({ categories, setCategories }) => {


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
                borderWidth={'1px'}
                borderRadius={5}
            >
                Graph here
            </Box>
        </Flex>
    )
}

export default CategoriesTab;