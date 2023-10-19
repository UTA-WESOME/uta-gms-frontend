import { Icon, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useMediaQuery } from "@chakra-ui/react";
import IntensitiesTab from "./intensities-tab/IntensitiesTab.jsx";
import ComparisonsTab from "./comparisons-tab/ComparisonsTab.jsx";
import { IoFlash } from "react-icons/io5";
import { FaBalanceScaleLeft } from "react-icons/fa";
import { MdOutlineExpand } from "react-icons/md";

const PreferencesTabs = ({
                             alternatives,
                             setAlternatives,
                             criteria,
                             preferenceIntensities,
                             setPreferenceIntensities,
                             pairwiseComparisons,
                             setPairwiseComparisons,
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
                            <Icon as={FaBalanceScaleLeft}></Icon>
                        </Tab>
                        <Tab fontSize={'15px'}>
                            <Icon as={IoFlash}></Icon>
                        </Tab>
                        <Tab fontSize={'15px'}>
                            <Icon as={MdOutlineExpand}></Icon>
                        </Tab>
                    </> :
                    <>
                        <Tab>Comparisons</Tab>
                        <Tab>Intensities</Tab>
                        <Tab>Max-Min</Tab>
                    </>
                }
            </TabList>
            <TabPanels>
                <TabPanel p={1} py={3}>
                    <ComparisonsTab
                        alternatives={alternatives}
                        setAlternatives={setAlternatives}
                        pairwiseComparisons={pairwiseComparisons}
                        setPairwiseComparisons={setPairwiseComparisons}
                        pairwiseMode={pairwiseMode}
                        setPairwiseMode={setPairwiseMode}
                    />
                </TabPanel>
                <TabPanel p={1} py={5}>
                    <IntensitiesTab
                        preferenceIntensities={preferenceIntensities}
                        setPreferenceIntensities={setPreferenceIntensities}
                        alternatives={alternatives}
                        criteria={criteria}
                    />
                </TabPanel>
                <TabPanel p={1} py={5}>
                    <Text>Not implemented yet!</Text>
                </TabPanel>
            </TabPanels>
        </Tabs>
    )

}
export default PreferencesTabs;