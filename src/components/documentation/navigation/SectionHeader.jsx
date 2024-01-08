import { Box, Text } from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";

const SectionHeader = ({ name, url, children, color, bgColor }) => {

    const navigate = useNavigate();
    const location = useLocation();
    const isActive = location.pathname.startsWith(url);

    return (
        <Box my={1} mx={3}>
            <Box
                px={3}
                py={1}
                borderRadius={5}
                _hover={{ cursor: 'pointer' }}
                bgColor={isActive ? bgColor : ''}
                onClick={() => navigate(url)}
            >
                <Text as={'b'} color={isActive ? color : ''}>{name}</Text>
            </Box>
            {children}
        </Box>
    )

}

export default SectionHeader;