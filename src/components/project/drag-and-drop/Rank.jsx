import { Box, Divider, Flex, IconButton, Text, useColorModeValue } from "@chakra-ui/react";
import { useDroppable } from "@dnd-kit/core";
import { DeleteIcon } from "@chakra-ui/icons";

const Rank = (props) => {

    const { isOver, setNodeRef } = useDroppable({
        id: props.id.toString(),
    });

    const handleDeleteRank = () => {
        // delete rank
        props.setRanks(pRanks => pRanks.filter(rank => rank !== props.id));

        // update alternatives that have this rank
        props.setAlternatives(pAlternatives => pAlternatives.map(pAlternative => {
            if (pAlternative.reference_ranking === props.id) {
                return {
                    ...pAlternative,
                    reference_ranking: 0,
                }
            }
            return pAlternative
        }))
    }

    return (
        <Box
            ref={setNodeRef}
            borderWidth={useColorModeValue('3px', '1px')}
            borderRadius={'lg'}
            mx={5} my={3}
            bg={isOver ? useColorModeValue('teal.100', 'teal.700') : useColorModeValue('gray.50', 'gray.700')}
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
                        onClick={handleDeleteRank}
                    />
                </Flex>
            </Flex>
            <hr/>
            {props.children.length !== 0 ?
                props.children
                :
                <Text textAlign={'center'} my={3}>Drop alternative here!</Text>}
        </Box>
    )
}

export default Rank;