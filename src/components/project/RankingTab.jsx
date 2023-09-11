import { Box, HStack, Show, Spacer, Text } from "@chakra-ui/react";

const RankingTab = ({ alternatives, setAlternatives }) => {
    return (
        <>

            {/*DESKTOP*/}
            <Show above={'lg'}>
                <HStack
                    justify={'center'}
                    mx={'10%'}
                >
                    <Box
                        w={'full'}
                        h={'full'}
                        borderWidth={'1px'}
                        borderRadius={'lg'}
                        p={5}
                    >
                        {alternatives.map(alternative => (
                            <Box
                                borderWidth={'1px'}
                                borderRadius={'lg'}
                                p={3}
                                m={3}
                            >
                                <Text>{alternative.name}</Text>
                            </Box>
                        ))}
                    </Box>
                    <Spacer/>

                    <Box
                        w={'full'}
                        h={'full'}
                        borderWidth={'1px'}
                        borderRadius={'lg'}
                        p={5}
                    >
                        {alternatives.map(alternative => (
                            <Box
                                borderWidth={'1px'}
                                borderRadius={'lg'}
                                p={3}
                                m={3}
                            >
                                <Text>{alternative.name}</Text>
                            </Box>
                        ))}
                    </Box>
                </HStack>


            </Show>

            {/*MOBILE*/}
            {/*TODO: change 991px to const, can't be 'md' because mobile and desktop are both seen then*/}
            <Show below={'991px'}>

            </Show>

        </>
    )
}

export default RankingTab;