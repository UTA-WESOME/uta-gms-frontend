import { Box, Center, Image, Link as ChakraLink, Text, } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Import = () => {
    const navigate = useNavigate();

    return (
        <Box>
            <Text my={5} textAlign={'justify'}>
                As an alternative to entering the values manually, the user can import the files containing them. 
                This can be done using the <b>Import from File</b> button. The button opens a window where files 
                can be dragged and dropped. The switch at the top of the window allows the user to select the type 
                of file to be used. The <b>CSV</b> option requires one file, whereas the <b>XMCDA</b> option allows 
                up to 6 files to be uploaded. For more information on the structure of the files and different 
                configurations of <b>XMCDA</b> files, see Section {" "}
                <ChakraLink
                    as="span"
                    color="teal.500"
                    onClick={() => navigate("../xmcda")}
                    cursor="pointer"
                >
                    <b>XMCDA section.</b>
                </ChakraLink>{" "}
            </Text>

            <Center>
                <Box p={4} borderWidth={'1px'} borderRadius={5}>
                    <Image src='/documentation/import.png' alt='Import'/>
                </Box>
            </Center>
        </Box>
    )
}

export default Import;