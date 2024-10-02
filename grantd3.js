let div1 = d3.select("#div1");
let div2 = d3.select("#div2");
let div3 = d3.select("#div3");

// Declare the chart dimensions and margins.
const width = 600;
const height = 300;
const marginTop = 10;
const marginRight = 17;
const marginBottom = 10;
const marginLeft = 13;


// Append the SVG container to div1.
const svg1 = div1.append("svg")
    .attr("id", "chart1")
    .attr("width", width)
    .attr("height", height);


    