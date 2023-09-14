import { Box, Button, Flex, IconButton, Text, useColorModeValue } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";


const RankMobile = (props) => {
    return (
        <Box
            borderWidth={useColorModeValue('3px', '1px')}
            borderRadius={'lg'}
            mx={5} my={3}
            bg={useColorModeValue('gray.50', 'gray.700')}
        >
            <Flex justify={'center'}>
                <Box w={'100%'}/>
                <Flex w={'100%'} justify={'center'} m={1}>
                    <Text my={2}>Rank {props.id}</Text>
                </Flex>
                <Flex w={'100%'}>
                    <IconButton
                        color={'red.300'} bg={useColorModeValue('gray.50', 'gray.700')}
                        aria-label={'delete-rank'}
                        icon={<DeleteIcon/>}
                        ml={'auto'} my={1} mr={1}
                    />
                </Flex>
            </Flex>
            <hr/>
            {props.children}
            <Flex w={'100%'}>
                <Button
                    size={'sm'}
                    variant={'outline'}
                    colorScheme={'teal'}
                    mx={'auto'} my={2}
                >
                    New alternative
                </Button>
            </Flex>
        </Box>
    )
}

export default RankMobile;