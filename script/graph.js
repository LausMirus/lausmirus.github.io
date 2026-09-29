const obsidian = cytoscape({
    container:
        document.getElementById("graph"),
    elements: [
        {
            data: {
                id: "linux",
                label: "linux",
                file: "/notes/linux.md"
            }
        },
        {
            data: {
                id: "bash",
                label: "bash",
                file: "/notes/bash.md"
            }
        },
        {
            data: {
                id: "rice",
                label: "rice",
                file: "/notes/rice.md"
            }
        },
        {
            data: {
                id: "editing",
                label: "editing",
                file: "/notes/editing.md"
            }
        },
        {
            data: {
                source: "linux",
                target: "bash"
            }

        },
        {
            data: {
                source: "linux",
                target: "rice"
            }
        },
        {
            data: {
                source: "linux",
                target: "editing"
            }
        }],
    style: [
        {
            selector: "node",

            style: {
                "background-color": "#ffffff",
                "label": "data(label)",
                "color": "#ff0000",
                "font-size": "10px",
                "text-valign": "bottom",
                "text-margin-y": 8,
                "width": 8,
                "height": 8
            },
        },
        {
            selector: "edge",
            style: {
                "line-color": "#52606d",
                "width": 1
            }
        },],
    layout: {
        name: "cose"
    }
});
obsidian.on("tap", "node", function (event) {
    const node = event.target;
    const file = node.data("file");
    console.log("clicked", node.data("label"));


    fetch(file).then(response => response.text())
        .then(content => {
            console.log(content);
            const links = content.match(/\[\[([^\]]+)\]\]/g)?.map(link => link.slice(2, -2));
            console.log(links);
        });
});

obsidian.on("grab", "node", function (event) {
    const node = event.target;
    originalPosition = {
        x: node.position("x"),
        y: node.position("y"),
    };
});

obsidian.on("free", "node", function (event) {
    const node = event.target;
    node.animate({
        position: originalPosition
    },
        {
            duration: 300
        });

});