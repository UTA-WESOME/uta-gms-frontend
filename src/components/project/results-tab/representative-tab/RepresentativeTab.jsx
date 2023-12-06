import { Icon, Tab, TabList, TabPanel, TabPanels, Tabs, useMediaQuery } from "@chakra-ui/react";
import { IoIosPodium } from "react-icons/io";
import { TbMathFunction } from "react-icons/tb";
import * as c from "../../../../config.js";
import FunctionsTab from "./functions-tab/FunctionsTab.jsx";
import RankingTab from "./ranking-tab/RankingTab.jsx";

const RepresentativeTab = ({ alternatives, criteria, rankings, functions }) => {

    const [isMobile] = useMediaQuery(`(max-width: ${c.Results.Representative.maxWidthMobile})`);

    return (
        <Tabs
            variant={'soft-rounded'}
            colorScheme={'teal'}
            px={{ sm: 5 }}
            isFitted={isMobile}
        >
            <TabList mb={2}>
                {isMobile ?
                    <>
                        <Tab fontSize={'15px'}>
                            <Icon as={IoIosPodium}/>
                        </Tab>
                        <Tab fontSize={'15px'}>
                            <Icon as={TbMathFunction}/>
                        </Tab>
                    </>
                    :
                    <>
                        <Tab>Ranking</Tab>
                        <Tab>Functions</Tab>
                    </>
                }
            </TabList>
            <TabPanels>
                <TabPanel p={1} py={2}>
                    <RankingTab
                        alternatives={alternatives}
                        rankings={rankings}
                    />
                </TabPanel>
                <TabPanel p={1} py={2}>
                    <FunctionsTab
                        criteria={criteria}
                        functions={functions}
                    />
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
}

export default RepresentativeTab;