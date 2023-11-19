import { useEffect, useMemo } from "react";
import { graphviz } from "d3-graphviz";
import { Box, Button } from "@chakra-ui/react";
import * as d3 from 'd3';
import { DownloadIcon } from "@chakra-ui/icons";

let counter = 0;

const getId = () => `graphviz${counter++}`;

// Graphviz renders a graph specified in `dot`
// currentCategoryId, setCurrentCategoryId is used only in the Results tab
const Graphviz = ({
                      dot,
                      currentCategoryId,
                      setCurrentCategoryId,
                      categoryBgColor,
                      categoryBgColorHover,
                      download = false
                  }) => {

    const id = useMemo(getId, []);

    const interactive = () => {
        const nodes = d3.selectAll(`#${id} .node`);
        nodes.on("click", function () {
            const title = d3.select(this).select('title').text();
            const match = title.match(/\d+$/);
            setCurrentCategoryId(parseInt(match[0]));
        });
        nodes.on("mouseover", function () {
            d3.select(this).select('ellipse').attr('fill', categoryBgColorHover); // Change color to red on hover
        });

        nodes.on("mouseout", function () {
            d3.select(this).select('ellipse').attr('fill', categoryBgColor); // Change color back to blue on mouseout
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
            graphviz(`#${id}`, { zoom: false })
                .renderDot(dotSrc)
                .on("end", interactive);
        }
    };


    useEffect(() => {
        render(dot);
    }, [dot]);

    const downloadSvg = () => {
        const svgElement = document.getElementById(id).querySelector('svg');
        const svgData = new XMLSerializer().serializeToString(svgElement);

        const blob = new Blob([svgData], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'hasse_graph.svg';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <Box
            p={10}
            borderWidth={'1px'}
            borderRadius={'lg'}
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}
        >
            <Box
                id={id}
                mb={5}
            />
            {download &&
                <Button colorScheme={'teal'} variant={'outline'} onClick={downloadSvg} leftIcon={<DownloadIcon/>}
                >Download as SVG</Button>
            }
        </Box>
    )

}

export default Graphviz;