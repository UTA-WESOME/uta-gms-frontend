import { Box, Button, Center, FormControl, FormLabel, HStack, Select, Show, Text, useToast } from "@chakra-ui/react";
import IntensitiesTabDesktop from "./IntensitiesTabDesktop.jsx";
import { useEffect, useState } from "react";
import CustomTooltip from "../../../utils/CustomTooltip.jsx";
import { InfoIcon } from "@chakra-ui/icons";

const IntensitiesTab = ({
                            alternatives,
                            criteria,
                            categories,
                            preferenceIntensities,
                            setPreferenceIntensities,
                        }) => {

    const toast = useToast();
    const toastId = "toast-project-preference-tab-add";
    // if currentCategoryId == 0 then it means that we choose a particular criterion
    const [currentCategoryId, setCurrentCategoryId] = useState(categories[0].id);

    useEffect(() => {
        setCurrentCategoryId(categories[0].id);
    }, [categories])

    const addPreferenceIntensity = () => {

        if (alternatives.length === 0) {
            if (!toast.isActive(toastId)) {
                toast({
                    id: toastId,
                    title: 'Warning!',
                    description: "You need to add alternatives first!",
                    status: 'warning',
                    duration: 6000,
                    isClosable: true,
                })
            }
            return;
        }

        if (criteria.length === 0 && currentCategoryId === 0) {
            if (!toast.isActive(toastId)) {
                toast({
                    id: toastId,
                    title: 'Warning!',
                    description: "You need to add criteria first!",
                    status: 'warning',
                    duration: 6000,
                    isClosable: true,
                })
            }
            return;
        }

        // get max preference intensity id
        let maxId = Math.max(...preferenceIntensities.map(item => item.id));
        maxId = maxId === -Infinity ? 0 : maxId;

        // get first alternative
        // we can be sure that there is at least one alternative because of the if statement
        // at the beginning of the function
        let firstAltId = alternatives[0].id

        if (currentCategoryId !== 0) {
            setPreferenceIntensities(pPreferenceIntensities => [...pPreferenceIntensities, {
                id: maxId + 1,
                alternative_1: firstAltId,
                alternative_2: firstAltId,
                alternative_3: firstAltId,
                alternative_4: firstAltId,
                criterion: null,
                category: currentCategoryId
            }])
        } else {
            setPreferenceIntensities(pPreferenceIntensities => [...pPreferenceIntensities, {
                id: maxId + 1,
                alternative_1: firstAltId,
                alternative_2: firstAltId,
                alternative_3: firstAltId,
                alternative_4: firstAltId,
                criterion: criteria[0].id,
                category: null
            }])
        }
    }

    const deletePreferenceIntensity = (id) => {
        setPreferenceIntensities(pPreferenceIntensities => pPreferenceIntensities.filter(item => item.id !== id));
    }

    return (
        <>
            <Center>
                <Box mb={4}>
                    <FormControl>
                        <FormLabel>
                            <HStack>
                                <Text>Choose a category or criteria</Text>
                                <CustomTooltip
                                    label={"You can either choose a whole category or assign the intensity directly to a criterion."}
                                    openDelay={200}>
                                    <InfoIcon fontSize={'sm'}/>
                                </CustomTooltip>
                            </HStack>
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
                            <option value={0}>Criteria</option>
                        </Select>
                    </FormControl>
                </Box>
            </Center>


            {/*DESKTOP*/}
            <Show above={'lg'}>
                <IntensitiesTabDesktop
                    alternatives={alternatives}
                    criteria={criteria}
                    currentCategoryId={currentCategoryId}
                    categories={categories}
                    preferenceIntensities={preferenceIntensities}
                    setPreferenceIntensities={setPreferenceIntensities}
                    deletePreferenceIntensity={deletePreferenceIntensity}
                />
            </Show>

            {/*MOBILE*/}
            <Show below={'991px'}>
            {/*    <IntensitiesTabMobile*/}
            {/*        alternatives={alternatives}*/}
            {/*        criteria={criteria}*/}
            {/*        addPreferenceIntensity={addPreferenceIntensity}*/}
            {/*        deletePreferenceIntensity={deletePreferenceIntensity}*/}
            {/*    />*/}
            </Show>


            <Button mx={4} my={4} colorScheme={'teal'} onClick={addPreferenceIntensity} variant='outline'>
                New intensity
            </Button>
        </>
    )

}

export default IntensitiesTab;