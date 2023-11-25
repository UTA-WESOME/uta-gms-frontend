import BestWorstTabDesktop from "./BestWorstTabDesktop.jsx";
import { Box, Center, FormControl, FormLabel, Select, Show, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import * as c from "./../../../../config.js";
import BestWorstTabMobile from "./BestWorstTabMobile.jsx";

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
                        <Center>
                            <Select
                                w={{base: '200px', md: '300px'}}
                                onChange={(event) =>
                                    setCurrentCategoryId(parseInt(event.target.value))
                                }
                            >
                                {categories.map(category => (
                                    <option value={category.id} key={category.id}>{category.name}</option>
                                ))}
                            </Select>
                        </Center>

                    </FormControl>
                </Box>
            </Center>
            <Show above={c.Preferences.BestWorst.minWidthDesktop}>
                <BestWorstTabDesktop
                    alternatives={alternatives}
                    currentCategoryId={currentCategoryId}
                    categories={categories}
                    setCategories={setCategories}
                />
            </Show>

            <Show below={c.Preferences.BestWorst.maxWidthMobile}>
                <BestWorstTabMobile
                    alternatives={alternatives}
                    currentCategoryId={currentCategoryId}
                    categories={categories}
                    setCategories={setCategories}
                />
            </Show>

        </>
    )
}

export default BestWorstTab;