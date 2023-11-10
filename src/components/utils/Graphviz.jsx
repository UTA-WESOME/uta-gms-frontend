import { useEffect, useMemo } from "react";
import { graphviz } from "d3-graphviz";
import { Box } from "@chakra-ui/react";

let counter = 0;
const getId = () => `graphviz${counter++}`;
const Graphviz = ({ dot, className }) => {
    const id = useMemo(getId, []);
    useEffect(() => {
        graphviz(`#${id}`, {}).renderDot(dot);
    }, [dot]);

    return (
        <Box
            className={className}
            id={id}
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            borderWidth={'1px'}
            borderRadius={5}
        />
    )

}

export default Graphviz;