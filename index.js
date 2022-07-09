const inputJason = [
    {
        "name": "Men",
        "id": 20,
        "parent_id": null
    },
    {
        "name": "Accessories",
        "id": 1,
        "parent_id": 20
    },
    {
        "name": "Watches",
        "id": 57,
        "parent_id": 1
    },
];

function sortCategoriesForInsert(inputJson) {
    const sortingArray = [];
    inputJson.forEach(
        node => {
            sortingArray[node.id] = {
                ...sortingArray[node.id],
                active: true,
                value: node,
            }
            if (node.parent_id) {
                if (sortingArray[node.parent_id]) {
                    if (sortingArray[node.parent_id].children)
                        sortingArray[node.parent_id].children.push(node.id);
                    else
                        sortingArray[node.parent_id].children = [node.id];
                }
                else {
                    sortingArray[node.parent_id] = { active: false, value: {}, children: [node.id] }
                }
            }
        });

    const properJsonOutput = [];

    sortingArray.forEach(node => console.log("dsc", node));

    sortingArray.forEach(node => {
        if (!node.active)
            return;

        var currentNode = node;
        const stack = [];
        while (currentNode && currentNode.active) {
            stack.push(currentNode);
            if (currentNode.value.parent_id)
                currentNode = sortingArray[currentNode.value.parent_id];
            else
                currentNode = null;
        }
        while (stack.length !== 0) {
            node = stack.pop();
            if (node.active) {
                properJsonOutput.push(node.value);
                sortingArray[node.value.id].active = false;
            }
        }
    });

    return properJsonOutput;
}

console.log(sortCategoriesForInsert(inputJason));