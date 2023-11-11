import { Icon, Tab, TabList, TabPanel, TabPanels, Tabs, useMediaQuery } from "@chakra-ui/react";
import ComparisonsTab from "./comparisons-tab/ComparisonsTab.jsx";
import { FaGreaterThan } from "react-icons/fa";

const PreferencesTabs = ({
                             alternatives,
                             setAlternatives,
                             criteria,
                             categories,
                             setCategories,
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
                        {/*<Tab fontSize={'15px'}>*/}
                        {/*    <Icon as={IoFlash}></Icon>*/}
                        {/*</Tab>*/}
                        {/*<Tab fontSize={'15px'}>*/}
                        {/*    <Icon as={MdOutlineExpand}></Icon>*/}
                        {/*</Tab>*/}
                    </> :
                    <>
                        <Tab>Comparisons</Tab>
                        {/*<Tab>Intensities</Tab>*/}
                        {/*<Tab>Best-Worst</Tab>*/}
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
                {/*<TabPanel p={1} py={5}>*/}
                {/*    <IntensitiesTab*/}
                {/*        preferenceIntensities={preferenceIntensities}*/}
                {/*        setPreferenceIntensities={setPreferenceIntensities}*/}
                {/*        alternatives={alternatives}*/}
                {/*        criteria={criteria}*/}
                {/*    />*/}
                {/*</TabPanel>*/}
                {/*<TabPanel p={1} py={5}>*/}
                {/*    <BestWorstTab*/}
                {/*        alternatives={alternatives}*/}
                {/*        setAlternatives={setAlternatives}*/}
                {/*    />*/}
                {/*</TabPanel>*/}
            </TabPanels>
        </Tabs>
    )

}
export default PreferencesTabs;