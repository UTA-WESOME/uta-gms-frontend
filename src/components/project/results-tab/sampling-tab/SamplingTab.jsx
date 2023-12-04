import { Box, Divider, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import AcceptabilityIndicesTab from "./acceptability-indices-tab/AcceptabilityIndicesTab.jsx";

const SamplingTab = ({ alternatives, acceptabilityIndices }) => {
    return (
        <Box borderWidth={'1px'} borderRadius={'lg'} p={3} my={3}>
            <Tabs
                variant={'soft-rounded'}
                colorScheme={'teal'}
                px={{ base: 1, sm: 2 }}
            >
                <TabList mx={{ base: 0, sm: '15px' }} mb={2}>
                    <Tab>Acceptability indices</Tab>
                    <Tab>Pairwise winning</Tab>
                </TabList>
                <Divider/>
                <TabPanels>
                    <TabPanel>
                        <AcceptabilityIndicesTab
                            alternatives={alternatives}
                            percentages={acceptabilityIndices}
                        />
                    </TabPanel>
                    <TabPanel>
                        <Text>Not implemented yet!</Text>
                    </TabPanel>
                </TabPanels>
            </Tabs>

        </Box>
    )
}

export default SamplingTab;