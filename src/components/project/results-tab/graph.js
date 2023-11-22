export function generateHierarchyDotString(categories, bgColor, categoryBgColor) {
    let dotString = `digraph {
    compound=true;
    graph [bgcolor="${bgColor}"]
    node [style=filled]\n`;

    // create category nodes
    for (const category of categories) {
        dotString += `    category${category.id} [label="${category.name}" color="${categoryBgColor}" fontname="Segoe UI" fontsize="15 pt" ]\n`;
    }

    // create edges
    for (const category of categories) {
        if (category.parent !== null)
            dotString += `    category${category.parent} -> category${category.id} [arrowhead=vee color="#4FD1C5"];\n`;
    }

    dotString += `}`;

    return dotString;

}