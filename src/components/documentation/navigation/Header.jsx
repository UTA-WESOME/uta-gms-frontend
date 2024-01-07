import { Box, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Header = ({ bgColor, color, name, url }) => {

    const navigate = useNavigate();

    return (
        <Box my={1} mx={3} px={3} py={1} borderRadius={5} _hover={{ cursor: 'pointer' }} bgColor={bgColor}
             onClick={() => navigate(url)}>
            <Text as={'b'} color={color}>{name}</Text>
        </Box>
    )

}

export default Header;