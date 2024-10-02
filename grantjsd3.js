// An array containing the filenames of your CSV files
const csvFiles = ["ChallengePrograms.csv", "DigitalHumanities.csv", "Education.csv", "FedStatePartnership.csv",""];

// Load all CSV files and build the hierarchy
Promise.all(csvFiles.map(file => d3.csv(file)))
  .then(function(allData) {
    // Build a hierarchy for each CSV file (division)
    const hierarchy = {
      name: "Grants Divisions",
      children: allData.map((csvData, i) => ({
        name: getDivisionName(csvFiles[i]),  // Get the division name from the filename
        children: csvData.map(grant => ({
          name: grant.title,
          href: grant.href,
          deadline: grant.deadline,
          output: grant.output
        }))
      }))
    };

    // Visualize the hierarchy as a tree
    drawTree(hierarchy);
  });

// Helper function to extract the division name from the CSV file name
function getDivisionName(filename) {
  return filename.replace(".csv", "").replace(/-/g, ' ').replace(/_/g, ' ');
}

// Function to draw the tree
function drawTree(hierarchyData) {
    const svg = d3.select("svg"),
          width = +svg.attr("width"),
          height = +svg.attr("height");

    // Create a tree layout with size based on the SVG's dimensions
    const treeLayout = d3.tree().size([height, width - 160]);

    // Convert the hierarchy data into a D3 hierarchy
    const root = d3.hierarchy(hierarchyData);

    // Assign positions to nodes
    treeLayout(root);

    // Create links (lines) between nodes
    svg.selectAll(".link")
      .data(root.links())
      .enter().append("path")
        .attr("class", "link")
        .attr("d", d3.linkHorizontal()
            .x(d => d.y)
            .y(d => d.x));

    // Create nodes (circles) and labels
    const node = svg.selectAll(".node")
      .data(root.descendants())
      .enter().append("g")
        .attr("class", "node")
        .attr("transform", d => `translate(${d.y},${d.x})`);

    // Add circles for nodes
    node.append("circle")
        .attr("r", 5);

    // Add text labels for nodes
    node.append("text")
        .attr("dy", 3)
        .attr("x", d => d.children ? -10 : 10)
        .style("text-anchor", d => d.children ? "end" : "start")
        .text(d => d.data.name);
}
