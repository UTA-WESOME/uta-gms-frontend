import { useEffect, useMemo } from "react";
import { graphviz } from "d3-graphviz";
import { Box } from "@chakra-ui/react";
import * as d3 from 'd3';

let counter = 0;

const getId = () => `graphviz${counter++}`;

// Graphviz renders a graph specified in `dot`
// currentCategoryId, setCurrentCategoryId is used only in the Results tab
const Graphviz = ({ dot, currentCategoryId, setCurrentCategoryId }) => {

    const id = useMemo(getId, []);

    const interactive = () => {
        const nodes = d3.selectAll(`#${id} .node`);
        nodes
            .on("click", function () {
                const title = d3.select(this).select('title').text();
                const match = title.match(/\d+$/);
                setCurrentCategoryId(parseInt(match[0]));
            });
    };
    const render = (dotSrc) => {

        if (currentCategoryId === undefined) {
            graphviz(`#${id}`, {})
                .transition(() => {
                    return d3.transition().duration(500);
                })
                .renderDot(dotSrc);
        } else {
            graphviz(`#${id}`, {zoom: false})
                .renderDot(dotSrc)
                .on("end", interactive);
        }
    };


    useEffect(() => {
        render(dot);
    }, [dot]);

    return (
        <Box
            p={10}
            id={id}
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            borderWidth={'1px'}
            borderRadius={'lg'}
        />
    )

}

export default Graphviz;