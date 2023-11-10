import { useEffect, useMemo } from "react";
import { graphviz } from "d3-graphviz";
import { Box } from "@chakra-ui/react";
import * as d3 from 'd3';

let counter = 0;
const getId = () => `graphviz${counter++}`;
const Graphviz = ({ dot, className }) => {
    const id = useMemo(getId, []);
    useEffect(() => {
        graphviz(`#${id}`, {})
            .transition(() => {
                return d3.transition().duration(500);
            })
            .renderDot(dot);
    }, [dot]);

    return (
        <Box
            p={5}
            className={className}
            id={id}
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            borderWidth={'1px'}
            borderRadius={5}
        />
    )

}

export default Graphviz;