import { Box } from "@chakra-ui/react";
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
            py={props.children.length !== 0 ? 3 : 8}
            m={5}
            bg={isOver ? 'teal.700' : 'teal.300'}
        >
            {props.children}
        </Box>
    )
}

export default Rank;