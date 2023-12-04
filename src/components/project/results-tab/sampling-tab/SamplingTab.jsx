import { Box, Divider, Icon, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useMediaQuery } from "@chakra-ui/react";
import { FaRankingStar } from "react-icons/fa6";
import { GiPodiumWinner } from "react-icons/gi";
import * as c from "./../../../../config.js";
import AcceptabilityIndicesTab from "./acceptability-indices-tab/AcceptabilityIndicesTab.jsx";

const SamplingTab = ({ alternatives, acceptabilityIndices }) => {

    const [isMobile] = useMediaQuery(`(max-width: ${c.Results.Sampling.maxWidthMobile})`);

    return (
        <Box borderWidth={'1px'} borderRadius={'lg'} py={3} my={3}>
            <Tabs
                variant={'soft-rounded'}
                colorScheme={'teal'}
                px={{ base: 1, sm: 2 }}
                isFitted={isMobile}
            >
                <TabList mx={{ base: 0, sm: '15px' }} mb={2}>
                    {isMobile ?
                        <>
                            <Tab fontSize={'15px'}>
                                <Icon as={FaRankingStar}/>
                            </Tab>
                            <Tab fontSize={'15px'}>
                                <Icon as={GiPodiumWinner}/>
                            </Tab>
                        </>
                        :
                        <>
                            <Tab>Acceptability indices</Tab>
                            <Tab>Pairwise winning</Tab>
                        </>
                    }
                </TabList>
                <Divider/>
                <TabPanels>
                    <TabPanel p={1} py={2}>
                        <AcceptabilityIndicesTab
                            alternatives={alternatives}
                            percentages={acceptabilityIndices}
                        />
                    </TabPanel>
                    <TabPanel p={1} py={2}>
                        <Text>Not implemented yet!</Text>
                    </TabPanel>
                </TabPanels>
            </Tabs>

        </Box>
    )
}

export default SamplingTab;