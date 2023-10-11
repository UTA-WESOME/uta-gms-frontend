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

function calculateNodeLevels(graph) {
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

    return ranks;
}

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

function createDotString(graph, ranks, bgcolor, nodeBgColor) {
    const vertexToId = {};
    const clusterMap = {};
    let dotString = `
    digraph {
        graph [bgcolor="${bgcolor}"]
        node [style=filled]
    `;
    let nodeId = 1;

    // create nodes for each vertex
    for (const vertex of Object.keys(graph)) {
        const nodeIdStr = `node${nodeId}`;
        vertexToId[vertex] = nodeIdStr;
        dotString += `    ${nodeIdStr} [label="${vertex}" color="${nodeBgColor}" fontname="Segoe UI" fontsize="15 pt"]\n`;
        nodeId++;
    }

    // create edges between vertices using vertexToId mapping
    for (const source of Object.keys(graph)) {
        const sourceId = vertexToId[source];
        const targets = graph[source];
        for (const target of Object.keys(targets)) {
            if (targets[target]) {
                const targetId = vertexToId[target];
                dotString += `    ${sourceId} -> ${targetId} [arrowhead=vee color="#4FD1C5"]\n`;
            }
        }
    }

    // group vertices with the same rank into clusters
    for (const vertex of Object.keys(ranks)) {
        const rank = ranks[vertex];
        if (!clusterMap[rank]) {
            clusterMap[rank] = [];
        }
        clusterMap[rank].push(vertex);
    }
    for (const rank of Object.keys(clusterMap)) {
        const vertices = clusterMap[rank];
        dotString += `    subgraph cluster_${rank} {
      rank="same";
      ${vertices.map((vertex) => vertexToId[vertex]).join(";")};
      peripheries=0
    }\n`;
    }

    dotString += `}`;
    return dotString;
}

export function generateDotString(graph, bgColor, nodeBgColor) {
    // transform JSON graph to graphObject
    let graphObject = jsonToObjectWithConnections(graph);
    // perform transitive reduction on the graphObject
    graphObject = transitiveReduction(graphObject);
    // calculate node levels to get ranks
    const ranks = calculateNodeLevels(graphObject);
    return createDotString(graphObject, ranks, bgColor, nodeBgColor);
}
