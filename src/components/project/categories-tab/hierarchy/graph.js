export function generateHierarchyDotString(categories, bgColor, nodeBgColor) {
    let dotString = `digraph {
    compound=true;
    graph [bgcolor="${bgColor}"]
    node [style=filled]\n`;

    // create nodes
    for (const category of categories) {
        dotString += `    node${category.id} [label="${category.name}" color="${nodeBgColor}" fontname="Segoe UI" fontsize="15 pt" ]\n`;
    }

    // create edges
    for (const category of categories) {
        if (category.parent !== null)
            dotString += `    node${category.parent} -> node${category.id} [arrowhead=vee color="#4FD1C5"]`;
    }

    dotString += `}`;

    return dotString;

}