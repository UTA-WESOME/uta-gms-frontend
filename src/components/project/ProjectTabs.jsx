import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";


const ProjectTabs = () => {


    return (
        <Box
            w={'full'}
            h={'full'}
            borderWidth={'1px'}
            borderRadius={'lg'}
            overflow={'hidden'}
            p={5}
        >
            <Tabs variant='soft-rounded' colorScheme='teal'>
                <TabList>
                    <Tab>Criteria</Tab>
                    <Tab>Alternatives</Tab>
                    <Tab>Reference ranking</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel>
                        <p>Criteria</p>
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