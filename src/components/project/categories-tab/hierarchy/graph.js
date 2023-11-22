export function generateHierarchyDotString(categories, criteria, bgColor, categoryBgColor) {
    let dotString = `digraph {
    compound=true;
    graph [bgcolor="${bgColor}"]
    node [style=filled]\n`;

    // create category nodes
    for (const category of categories) {
        dotString += `    category${category.id} [label="${category.name}" color="${categoryBgColor}" fontname="Segoe UI" fontsize="15 pt" ]\n`;
    }

    // create criteria nodes
    for (const criterion of criteria) {
        dotString += `    criterion${criterion.id} [label="${criterion.name}" color="${criterion.gain ? "#81E6D9" : "#F56565"}" fontname="Segoe UI" fontsize="15 pt" ]\n`;
    }

    // create edges
    for (const category of categories) {
        if (category.parent !== null)
            dotString += `    category${category.parent} -> category${category.id} [arrowhead=vee color="#4FD1C5"];\n`;
        for (const cc of category.criterion_categories) {
            dotString += `    category${category.id} -> criterion${cc.criterion} [arrowhead=vee color="#4FD1C5"];\n`;
        }
    }

    dotString += `}`;

    return dotString;

}