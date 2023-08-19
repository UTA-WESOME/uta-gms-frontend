import { Box, Icon, Tab, TabList, TabPanel, TabPanels, Tabs, useMediaQuery } from "@chakra-ui/react";
import CriteriaTab from "./CriteriaTab.jsx";
import { useState } from "react";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaBalanceScaleLeft, FaList } from "react-icons/fa";


const ProjectTabs = () => {

    const [criteria, setCriteria] = useState();
    const [isScreenMobile] = useMediaQuery('(max-width: 460px)')


    useState(() => {
        setCriteria([
            {
                "id": 1,
                "name": "Gain 1",
                "gain": true,
                "created_at": "2023-08-16T20:35:01.781216Z",
                "updated_at": "2023-08-16T20:35:01.785383Z"
            },
            {
                "id": 2,
                "name": "Gain 2",
                "gain": true,
                "created_at": "2023-08-16T20:35:01.781216Z",
                "updated_at": "2023-08-16T20:35:01.785383Z"
            },
            {
                "id": 3,
                "name": "Lose 3",
                "gain": false,
                "created_at": "2023-08-16T20:35:01.781216Z",
                "updated_at": "2023-08-16T20:35:01.785383Z"
            }
        ])
    }, [])


    return (
        <Box
            w={'full'}
            h={'full'}
            borderWidth={'1px'}
            borderRadius={'lg'}
            overflow={'hidden'}
            p={5}
        >
            <Tabs variant='soft-rounded' colorScheme='teal' isFitted={isScreenMobile}>
                <TabList mx={'15px'}>
                    {isScreenMobile ?
                        <>
                            <Tab fontSize={'20px'}>
                                <Icon as={FaArrowTrendUp}></Icon>
                            </Tab>
                            <Tab fontSize={'20px'}>
                                <Icon as={FaList}></Icon>
                            </Tab>
                            <Tab fontSize={'20px'}>
                                <Icon as={FaBalanceScaleLeft}></Icon>
                            </Tab>
                        </>
                        :
                        <>
                            <Tab>Criteria</Tab>
                            <Tab>Alternatives</Tab>
                            <Tab>Reference</Tab>
                        </>
                    }

                </TabList>
                <TabPanels>
                    <TabPanel>
                        <CriteriaTab criteria={criteria} setCriteria={setCriteria}/>
                    </TabPanel>
                    <TabPanel>
                        <p>Alternatives</p>
                    </TabPanel>
                    <TabPanel>
                        <p>Reference ranking</p>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Box>
    )
}

export default ProjectTabs;