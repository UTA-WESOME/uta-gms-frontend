import { Box, Text } from "@chakra-ui/react";

const FunctionTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <Box bgColor={'whiteAlpha.100'} borderWidth={'1px'} p={2} borderRadius={'5px'}>
                <Text>{`x : ${label}, y : ${payload[0].value.toFixed(3)}`}</Text>
            </Box>
        );
    }

    return null;
}

export default FunctionTooltip;