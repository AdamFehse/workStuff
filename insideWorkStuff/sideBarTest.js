let projectData = [];

// Load CSV data on page load
document.addEventListener("DOMContentLoaded", () => {
  fetch("/storymapdata.csv")
    .then((response) => response.text())
    .then((data) => {
      Papa.parse(data, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          projectData = results.data; // Store parsed data
        },
      });
    });
});
 
function showContent(category, keyword = "") {
  const contentDiv = document.getElementById("mainContent");

  const filteredProjects = projectData.filter(
    (project) =>
      project["Project Category"] === category &&
      (keyword === "" || project["Project Type"] === keyword)
  );

  let tableHTML = `
    <div class="row">
        <!-- Heading row -->
        <div class="col-12">
            <h5 class="text-center">${category}${
    keyword ? " - " + keyword : ""
  }</h5>
        </div>
    </div>

    <!-- Scrollable table container row -->
    <div class="row">
        <div class="col-12">
            <div id="scrollableTableContainer">
                <table class="table table-bordered table-striped mt-3">
                    <thead>
                        <tr>
                            <th>Project Image</th>
                            <th>Project Name</th>
                        </tr>
                    </thead>
                    <tbody>
    `;

  filteredProjects.forEach((project) => {
    tableHTML += `
        <tr>
            <td class="image-cell">
                <div class="image-placeholder">
                    <img src="https://via.placeholder.com/100" alt="Project Image">
                </div>
            </td>
            <td>${project["Project Name"]}</td>
        </tr>
    `;
  });

  tableHTML += `
                    </tbody>
                </table>
            </div>
        </div>
    </div>
`;

  contentDiv.innerHTML = filteredProjects.length
    ? tableHTML
    : `<p class="text-center">No projects found for ${category}${
        keyword ? " - " + keyword : ""
      }.</p>`;
}
