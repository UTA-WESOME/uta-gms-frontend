import { Box, Text, Image, Center } from "@chakra-ui/react";

const Dashboard = () => {
    return (
        <Box>
            <Text my={5} textAlign={'justify'}>
                When the project is opened, the user is presented with a dashboard. By using the navigation bar at the
                top of the dashboard, users can switch between the
                tabs. <b>Criteria</b>, <b>Alternatives</b>, <b>Hierarchy</b>, and <b>Preferences</b> tabs are used to
                pass the input data along with the preference information. The last tab is unlocked after the project
                has been run. It contains all the results of the UTA-GMS method. Four buttons in the bottom right of the
                page are used to import data from the file, export data to the file, save the project and run it.
            </Text>
            <Center>
                <Box p={4} borderWidth={'1px'} borderRadius={5}>
                    <Image src='/documentation/project-dashboard.png' alt='Project dashboard' />
                </Box>
            </Center>
        </Box>
    )
}

export default Dashboard;