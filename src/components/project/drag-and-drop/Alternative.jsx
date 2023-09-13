import { Box, Text } from "@chakra-ui/react";
import { useDraggable } from "@dnd-kit/core";

const Alternative = ({ id, name }) => {

    const {attributes, listeners, setNodeRef, transform} = useDraggable({
        id: id.toString(),
    });
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;

    return (
        <Box
            ref={setNodeRef}
            style={style}
            {...listeners}
            {...attributes}
            borderWidth={'1px'}
            borderRadius={'lg'}
            bg={'teal'}
            p={3}
            m={3}
            cursor={'move'}
        >
            <Text>{name}</Text>
        </Box>
    )
}

export default Alternative;