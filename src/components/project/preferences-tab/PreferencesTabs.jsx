import { Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import IntensitiesTab from "./intensities-tab/IntensitiesTab.jsx";
import ComparisonsTab from "./comparisons-tab/ComparisonsTab.jsx";

const PreferencesTabs = ({
                             alternatives,
                             setAlternatives,
                             criteria,
                             preferenceIntensities,
                             setPreferenceIntensities
                         }) => {
    return (
        <Tabs variant={'soft-rounded'}
              colorScheme={'teal'}
              px={{ base: 1, sm: 5 }}
        >
            <TabList>
                <Tab>Comparisons</Tab>
                <Tab>Intensities</Tab>
                <Tab>Max-Min</Tab>
            </TabList>
            <TabPanels>
                <TabPanel p={1}>
                    <ComparisonsTab
                        alternatives={alternatives}
                        setAlternatives={setAlternatives}
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