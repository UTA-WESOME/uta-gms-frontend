import { useEffect, useMemo } from "react";
import { graphviz } from "d3-graphviz";
import { Box } from "@chakra-ui/react";

let counter = 0;
const getId = () => `graphviz${counter++}`;
const Graphviz = ({ dot, className }) => {
    const id = useMemo(getId, []);
    useEffect(() => {
        graphviz(`#${id}`, {
            zoom: false,
        })
            .renderDot(dot);
    }, [dot]);

    return (
        <Box
            className={className}
            id={id}
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        />
    )

}

export default Graphviz;