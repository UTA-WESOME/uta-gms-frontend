import { Box, Divider, Flex } from "@chakra-ui/react";
import { routes } from "../main.jsx";
import SectionHeader from "./documentation/navigation/SectionHeader.jsx";
import PageTemplate from "./PageTemplate.jsx";

const Documentation = () => {

    const sectionData = routes[0].children.find(r => r.path === "/documentation").children;

    return (
        <PageTemplate title={"Documentation"}>
            <Divider/>
            <Flex direction={'row'} mt={5}>
                <Flex direction={'column'} minW={'20%'}>
                    <>
                        {sectionData.map((section) => (
                            <SectionHeader
                                key={section.displayName}
                                name={section.displayName}
                                url={section.fullUrl}
                                color={'teal.200'}
                                bgColor={'teal.700'}
                            >
                                {section.children && (
                                    <div>
                                        {section.children.map((subpage) => (
                                            <SectionHeader
                                                key={subpage.displayName}
                                                name={subpage.displayName}
                                                url={subpage.fullUrl}
                                                color={'teal.200'}
                                                bgColor={'teal.700'}
                                            />
                                        ))}
                                    </div>
                                )}

                            </SectionHeader>
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