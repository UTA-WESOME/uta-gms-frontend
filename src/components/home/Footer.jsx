import {Box, Text, useColorModeValue,} from '@chakra-ui/react';

export default function Footer() {
    return (
        <Box
            bg={useColorModeValue('gray.50', 'gray.900')}
            color={useColorModeValue('gray.700', 'gray.200')}
            py={4}
            align={'center'}
        >
            <Text>© 2023 UTA-WESOME. All rights reserved</Text>
        </Box>
    );
}