import { Icon, Tab, TabList, TabPanel, TabPanels, Tabs, useMediaQuery } from "@chakra-ui/react";
import ComparisonsTab from "./comparisons-tab/ComparisonsTab.jsx";
import { FaGreaterThan } from "react-icons/fa";
import IntensitiesTab from "./intensities-tab/IntensitiesTab.jsx";
import { IoFlash } from "react-icons/io5";
import BestWorstTab from "./maxmin-tab/BestWorstTab.jsx";
import { MdOutlineExpand } from "react-icons/md";

const PreferencesTabs = ({
                             alternatives,
                             setAlternatives,
                             criteria,
                             categories,
                             setCategories,
                             preferenceIntensities,
                             setPreferenceIntensities,
                             pairwiseMode,
                             setPairwiseMode
                         }) => {
    const [isScreenMobile] = useMediaQuery('(max-width: 628px)');
    return (
        <Tabs variant={'soft-rounded'}
              colorScheme={'teal'}
              px={{ base: 1, sm: 5 }}
              isFitted={isScreenMobile}
        >
            <TabList mb={2}>
                {isScreenMobile ?
                    <>
                        <Tab fontSize={'15px'}>
                            <Icon as={FaGreaterThan}></Icon>
                        </Tab>
                        <Tab fontSize={'15px'}>
                            <Icon as={IoFlash}></Icon>
                        </Tab>
                        <Tab fontSize={'15px'}>
                            <Icon as={MdOutlineExpand}></Icon>
                        </Tab>
                    </>
                    :
                    <>
                        <Tab>Comparisons</Tab>
                        <Tab>Intensities</Tab>
                        <Tab>Best-Worst</Tab>
                    </>
                }
            </TabList>
            <TabPanels>
                <TabPanel p={1} py={3}>
                    <ComparisonsTab
                        alternatives={alternatives}
                        setAlternatives={setAlternatives}
                        categories={categories}
                        setCategories={setCategories}
                        pairwiseMode={pairwiseMode}
                        setPairwiseMode={setPairwiseMode}
                    />
                </TabPanel>
                <TabPanel p={1} py={5}>
                    <IntensitiesTab
                        alternatives={alternatives}
                        criteria={criteria}
                        categories={categories}
                        preferenceIntensities={preferenceIntensities}
                        setPreferenceIntensities={setPreferenceIntensities}
                    />
                </TabPanel>
                <TabPanel p={1} py={5}>
                    <BestWorstTab
                        alternatives={alternatives}
                        categories={categories}
                        setCategories={setCategories}
                    />
                </TabPanel>
            </TabPanels>
        </Tabs>
    )

}
export default PreferencesTabs;