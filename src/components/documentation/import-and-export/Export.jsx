import { Box, Center, Image, Link as ChakraLink, Text, useColorModeValue, } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Export = () => {
    const navigate = useNavigate();

    return (
        <Box>
            <Text my={5} textAlign={'justify'}>
                Similarly to importing, data can be exported in two file formats. <b>XMCDA</b>
                files are downloaded in a compressed folder. <b>CSV</b> file is downloaded
                separately. Exported files can be used in different applications or shared with
                another <b>UTA - GMS</b> user. For more information on the number of exported
                <b> XMCDA</b> files and their structure, see {" "}
                <ChakraLink
                    as="span"
                    color={useColorModeValue('teal.500', 'teal.200')}
                    onClick={() => navigate("../xmcda")}
                    cursor="pointer"
                >
                    <b>XMCDA section.</b>
                </ChakraLink>{" "}
            </Text>

            <Center>
                <Box p={4} borderWidth={'1px'} borderRadius={5}>
                    <Image src='/documentation/export.png' alt='Export' />
                </Box>
            </Center>
        </Box>
    )
}

export default Export;