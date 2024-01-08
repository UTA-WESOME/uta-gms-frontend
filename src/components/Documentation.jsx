import { Box, Divider, Flex, useColorModeValue } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { routes } from "../main.jsx";
import SectionHeader from "./documentation/navigation/SectionHeader.jsx";
import PageTemplate from "./PageTemplate.jsx";

const Documentation = () => {

    const sectionData = routes[0].children.find(r => r.path === "/documentation").children;
    const color = useColorModeValue('teal.700', 'teal.200');
    const bgColor = useColorModeValue('teal.200', 'teal.700')

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
                                color={color}
                                bgColor={bgColor}
                            >
                                {section.children && (
                                    <div>
                                        {section.children.map((subpage) => (
                                            <SectionHeader
                                                key={subpage.displayName}
                                                name={subpage.displayName}
                                                url={subpage.fullUrl}
                                                color={color}
                                                bgColor={bgColor}
                                            />
                                        ))}
                                    </div>
                                )}

                            </SectionHeader>
                        ))}
                    </>
                </Flex>
                <Box maxW={'1px'} borderWidth={'1px'}/>
                <Box mx={10} w={'full'}>
                    <Outlet/>
                </Box>
            </Flex>
        </PageTemplate>
    );
}

export default Documentation;