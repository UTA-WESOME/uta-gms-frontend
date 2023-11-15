import BestWorstTabDesktop from "./BestWorstTabDesktop.jsx";
import { Box, Center, FormControl, FormLabel, Select, Show, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const BestWorstTab = ({ alternatives, categories, setCategories }) => {

    const [currentCategoryId, setCurrentCategoryId] = useState(categories[0].id);

    useEffect(() => {
        if (categories.find(c => c.id === currentCategoryId) === undefined)
            setCurrentCategoryId(categories[0].id);
    }, [categories])

    return (
        <>
            <Center>
                <Box mb={4}>
                    <FormControl>
                        <FormLabel>
                            <Text>Choose category</Text>
                        </FormLabel>
                        <Select
                            w={'300px'}
                            onChange={(event) =>
                                setCurrentCategoryId(parseInt(event.target.value))
                            }
                        >
                            {categories.map(category => (
                                <option value={category.id} key={category.id}>{category.name}</option>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
            </Center>
            <Show above={'lg'}>
                <BestWorstTabDesktop
                    alternatives={alternatives}
                    currentCategoryId={currentCategoryId}
                    categories={categories}
                    setCategories={setCategories}
                />
            </Show>

            <Show below={'991px'}>
                {/*<BestWorstTabMobile*/}
                {/*    alternatives={alternatives}*/}
                {/*    setAlternatives={setAlternatives}*/}
                {/*/>*/}
            </Show>

        </>
    )
}

export default BestWorstTab;