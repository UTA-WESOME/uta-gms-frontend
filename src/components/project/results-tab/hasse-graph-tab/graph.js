function jsonToObjectWithConnections(graph) {
    const vertices = Object.keys(graph);
    const objectWithConnections = {};

    for (const vertex of vertices) {
        const neighbors = graph[vertex];
        const connections = {};

        for (const v of vertices) {
            connections[v] = neighbors.includes(v);
        }

        objectWithConnections[vertex] = connections;
    }

    return objectWithConnections;
}

function createGraphStructureFromRelations(inputList) {
    let result = {};
    inputList.forEach(structure => {
        let alternative_1 = structure.alternative_1.toString();
        let alternative_2 = structure.alternative_2.toString();

        result[alternative_1] = result[alternative_1] || [];
        result[alternative_2] = result[alternative_2] || [];

        result[alternative_1].push(alternative_2);
    });
    return result;
}

function transitiveReduction(graph) {
    const vertices = Object.keys(graph);

    for (const source of vertices) {
        const stack = [];
        for (const vertex of vertices) {
            if (graph[source][vertex]) {
                stack.push(vertex);
            }
        }

        const visited = Object.fromEntries(vertices.map(vertex => [vertex, false]));
        visited[source] = true;

        while (stack.length > 0) {
            const element = stack.shift();

            const children = Object.keys(graph[element]);
            children.forEach(child => {
                if (graph[element][child]) {
                    graph[source][child] = false;

                    if (!visited[child]) {
                        stack.push(child);
                        visited[child] = true;
                    }
                }
            });
        }
    }

    return graph;
}

function calculateNodeLevels(graph, indifferences) {
    const vertices = Object.keys(graph);
    const ranks = Object.fromEntries(vertices.map(vertex => [vertex, 1]));

    const queue = [];
    for (const vertex of vertices) {
        if (!Object.values(graph).some(connections => connections[vertex])) {
            queue.push(vertex);
            ranks[vertex] = 1;
        }
    }

    while (queue.length > 0) {
        const element = queue.shift();
        const rank = ranks[element];
        const children = [];

        for (const vertex of vertices) {
            if (graph[element][vertex]) {
                children.push(vertex);
            }
        }

        for (const child of children) {
            if (!queue.includes(child)) {
                ranks[child] = rank + 1;
                queue.push(child);
            } else {
                ranks[child] = Math.max(ranks[child], rank + 1);
            }
        }
    }

    // adjust ranks to indifferences
    for (const vertex of Object.keys(ranks)) {
        let indifferenceWithVertex = indifferences.find(arr => arr.includes(vertex));
        if (indifferenceWithVertex) {
            let indifferenceRanks = indifferenceWithVertex.map(v => ranks[v]);
            const maxRank = Math.max(...indifferenceRanks);
            indifferenceWithVertex.forEach(v => {
                ranks[v] = maxRank;
            });
        }
    }

    return ranks;
}

function findAndRemoveCycles(graphObject) {
    const cycles = [];
    const graphCopy = { ...graphObject };
    const vertices = Object.keys(graphObject);

    for (const vertex of vertices) {
        const neighbors = Object.keys(graphObject[vertex]);
        for (const neighbor of neighbors) {
            // Check if there's a reciprocal edge (cycle of length 2).
            if (graphObject[neighbor][vertex] && graphObject[vertex][neighbor]) {
                // Add information about the cycle to the cycles array.
                cycles.push([vertex, neighbor]);

                // Remove reciprocal edges from the graph.
                graphCopy[vertex][neighbor] = false;
                graphCopy[neighbor][vertex] = false;
            }
        }
    }

    const concatenatedCycles = [];
    for (let i = 0; i < cycles.length; i++) {
        let concatenated = false;
        for (let j = 0; j < concatenatedCycles.length; j++) {
            if (cycles[i].some(node => concatenatedCycles[j].includes(node))) {
                // Combine cycles[i] and concatenatedCycles[j] with unique values.
                concatenatedCycles[j] = [...new Set([...cycles[i], ...concatenatedCycles[j]])];
                concatenated = true;
                break;
            }
        }
        if (!concatenated) {
            concatenatedCycles.push([...cycles[i]]);
        }
    }

    return [concatenatedCycles, graphCopy];
}

function createDotString(graph, ranks, indifferences, alternatives, bgcolor, nodeBgColor) {
    const vertexToId = {};
    const clusterMap = {};
    let dotString = `digraph {
    compound=true;
    graph [bgcolor="${bgcolor}"]
    node [style=filled]\n`;
    let nodeId = 1;

    // create nodes for each vertex
    for (const vertex of Object.keys(graph)) {
        const nodeIdStr = `node${nodeId}`;
        vertexToId[vertex] = nodeIdStr;
        dotString += `    ${nodeIdStr} [label="${alternatives.find(alt => alt.id.toString() === vertex).name}" color="${nodeBgColor}" fontname="Segoe UI" fontsize="15 pt" ]\n`;
        nodeId++;
    }

    // group vertices with the same rank into clusters
    for (const vertex of Object.keys(ranks)) {
        const rank = ranks[vertex];
        if (!clusterMap[rank]) {
            clusterMap[rank] = [];
        }
        clusterMap[rank].push(vertex);
    }
    const localIndifferences = [...indifferences];
    for (const rank of Object.keys(clusterMap)) {
        const vertices = clusterMap[rank];
        dotString += `    subgraph cluster_${rank} {
      rank="same";\n`;
        // inserting indifferences
        for (let i = 0; i < vertices.length; i++) {
            let indifferenceWithVertex = localIndifferences.find(arr => arr.includes(vertices[i]));
            let indifferenceIndex = localIndifferences.findIndex(arr => arr === indifferenceWithVertex);
            if (indifferenceIndex !== -1) {

                // vertex is in some indifference, we have to insert the indifference with its nodes
                dotString += `      subgraph cluster_indifference_${indifferences.findIndex(arr => arr === indifferenceWithVertex)} {
        color="${nodeBgColor}";
        borderRadius="10px";
        style="rounded";
        ${indifferenceWithVertex.map((vertex) => vertexToId[vertex]).join(";")};
        }\n`;
                // we have to remove the indifference from localIndifferences, so it won't be inserted again
                localIndifferences.splice(indifferenceIndex, 1);
            }
        }
        // inserting vertices
        dotString += `      ${vertices.map((vertex) => vertexToId[vertex]).join(";")};
      peripheries=0;
      }\n`
    }

    // create edges between vertices using vertexToId mapping
    for (const source of Object.keys(graph)) {
        // check if the source is in an indifference
        let indifferenceWithSource = indifferences.find(arr => arr.includes(source));
        let indifferenceIndexSource = indifferences.findIndex(arr => arr === indifferenceWithSource);
        const sourceId = vertexToId[source];
        const targets = graph[source];
        for (const target of Object.keys(targets)) {
            if (targets[target]) {
                const targetId = vertexToId[target];
                // check if the target is in an indifference
                let indifferenceWithTarget = indifferences.find(arr => arr.includes(target));
                let indifferenceIndexTarget = indifferences.findIndex(arr => arr === indifferenceWithTarget);
                dotString += `    ${sourceId} -> ${targetId} [arrowhead=vee color="#4FD1C5"`;
                if (indifferenceIndexSource !== -1) {
                    dotString += ` ltail=cluster_indifference_${indifferenceIndexSource}`;
                    indifferenceWithSource.forEach(v => {
                        graph[v][target] = false;
                    });
                }
                if (indifferenceIndexTarget !== -1) {
                    dotString += ` lhead=cluster_indifference_${indifferenceIndexTarget}`;
                    indifferenceWithTarget.forEach(v => {
                        graph[source][v] = false;
                    })
                }
                if (indifferenceIndexSource !== -1 && indifferenceIndexTarget !== -1) {
                    indifferenceWithSource.forEach(s => {
                        indifferenceWithTarget.forEach(t => {
                            graph[s][t] = false;
                        })
                    })
                }
                dotString += `]\n`;
            }
        }
    }

    dotString += `}`;
    return dotString;
}

export function generateDotString(relations, alternatives, bgColor, nodeBgColor) {

    // stringify children nodes
    let graph = createGraphStructureFromRelations(relations);

    // transform JSON graph to graphObject
    let graphObject = jsonToObjectWithConnections(graph);

    // remove indifferences
    let [indifferences, graphObjectWithoutCycles] = findAndRemoveCycles(graphObject);

    // perform transitive reduction on the graphObject
    graphObject = transitiveReduction(graphObjectWithoutCycles);

    // calculate node levels to get ranks
    const ranks = calculateNodeLevels(graphObjectWithoutCycles, indifferences);
    return createDotString(graphObject, ranks, indifferences, alternatives, bgColor, nodeBgColor);
}
