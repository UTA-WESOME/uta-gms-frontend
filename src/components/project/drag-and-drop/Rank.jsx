import { Box, Divider, Text } from "@chakra-ui/react";
import { useDroppable } from "@dnd-kit/core";

const Rank = (props) => {

    const {isOver, setNodeRef} = useDroppable({
        id: props.id.toString(),
    });

    return (
        <Box
            ref={setNodeRef}
            borderWidth={'1px'}
            borderRadius={'lg'}
            m={5}
            bg={isOver ? 'teal.700' : 'gray.700'}
        >
            <Text textAlign={'center'} verticalAlign={'center'} my={2}>Rank {props.id}</Text>
            <Divider />
            {props.children.length !== 0 ?
                props.children
                :
                <Text textAlign={'center'} my={3}>Drop alternative here!</Text>}
        </Box>
    )
}

export default Rank;