import { Box } from "@chakra-ui/react";
import { useDroppable } from "@dnd-kit/core";

const Rank = (props) => {

    const {isOver, setNodeRef} = useDroppable({
        id: props.id.toString(),
    });
    const style = {
        backgroundColor: isOver ? 'green' : 'magenta',
    };

    return (
        <Box
            ref={setNodeRef}
            style={style}
            borderWidth={'1px'}
            borderRadius={'lg'}
            p={5}
            m={5}
        >
            {props.children}
        </Box>
    )
}

export default Rank;