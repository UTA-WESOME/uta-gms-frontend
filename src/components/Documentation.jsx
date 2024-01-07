import { Box, Divider, Flex } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import Header from "./documentation/navigation/Header.jsx";
import PageTemplate from "./PageTemplate.jsx";

const Documentation = () => {
    const { part } = useParams();
    const getBgColor = (section) => (part.toLowerCase() === section.toLowerCase() ? 'teal.700' : '');
    const getColor = (section) => (part.toLowerCase() === section.toLowerCase() ? 'teal.100' : '');

    const sectionData = [
        { name: 'Start', url: '/documentation/start' },
        { name: 'Tutorial', url: '/documentation/tutorial' },
        { name: 'Contact', url: '/documentation/contact' },
    ];

    return (
        <PageTemplate title={"Documentation"}>
            <Divider/>
            <Flex direction={'row'} mt={5}>
                <Flex direction={'column'} minW={'20%'}>
                    <>
                        {sectionData.map((section,) => (
                            <Header
                                key={section.name}
                                name={section.name}
                                color={getColor(section.name)}
                                bgColor={getBgColor(section.name)}
                                url={section.url}
                            />
                        ))}
                    </>
                </Flex>
                <Box maxW={'1px'} borderWidth={'1px'}/>
                <Box mx={5}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.

                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.

                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.

                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
                    et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
                    cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                </Box>


            </Flex>
        </PageTemplate>
    );
}

export default Documentation;