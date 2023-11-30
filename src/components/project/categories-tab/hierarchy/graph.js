export function generateHierarchyDotString(categories, criteria, bgColor, categoryBgColor) {
    let dotString = `digraph {
    compound=true;
    graph [bgcolor="${bgColor}"]
    node [style=filled]\n`;

    // create category nodes
    const colorNotActive = "#A0AEC0"
    for (const category of categories) {
        const color = category.active ? categoryBgColor : colorNotActive
        dotString += `    category${category.id} [label="${category.name}" color="${color}" fontname="Segoe UI" fontsize="15 pt" ]\n`;
    }

    // create criteria nodes
    for (const criterion of criteria) {
        let color = colorNotActive;
        // if we find at least one active parent category, then the criterion is active also
        for (const category of categories.filter(cat => cat.active)) {
            if (category.criterion_categories.some(cc => cc.criterion === criterion.id)) {
                color = criterion.gain ? "#81E6D9" : "#F56565";
                break;
            }
        }
        dotString += `    criterion${criterion.id} [label="${criterion.name}" color="${color}" fontname="Segoe UI" fontsize="15 pt" ]\n`;
    }

    // create edges
    for (const category of categories) {
        if (category.parent !== null)
            dotString += `    category${category.parent} -> category${category.id} [arrowhead=vee color="${category.active ? '#4FD1C5' : colorNotActive}"];\n`;
        for (const cc of category.criterion_categories) {
            dotString += `    category${category.id} -> criterion${cc.criterion} [arrowhead=vee color="${category.active ? '#4FD1C5' : colorNotActive}"];\n`;
        }
    }

    dotString += `}`;

    return dotString;

}