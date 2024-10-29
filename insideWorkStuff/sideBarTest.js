let projectData = [];

// Load CSV data on page load
document.addEventListener('DOMContentLoaded', () => {
    fetch('/storymapdata.csv')
        .then(response => response.text())
        .then(data => {
            Papa.parse(data, {
                header: true,
                skipEmptyLines: true,
                complete: (results) => {
                    projectData = results.data; // Store parsed data
                    addMarkersToMap(projectData); // Add markers after parsing
                }
            });
        });
});


function showContent(category, keyword = '') {
    const contentDiv = document.getElementById('mainContent');

    const filteredProjects = projectData.filter(project =>
        project['Project Category'] === category &&
        (keyword === '' || project['Project Type'] === keyword)
    );

    let tableHTML = `
        <h3 class="text-center">${category}${keyword ? ' - ' + keyword : ''}</h3>
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

    filteredProjects.forEach(project => {
        tableHTML += `
            <tr>
                <td class="image-cell">
                    <div class="image-placeholder">
                    <img src="${project['ImageUrl'] || 'https://via.placeholder.com/100'}" alt="Project Image">
                    </div>
                </td>
                <td>${project['Project Name']}</td>
            </tr>
        `;
    });

    tableHTML += `
                </tbody>
            </table>
        </div>
    `;

    contentDiv.innerHTML = filteredProjects.length ? tableHTML : `<p class="text-center">No projects found for ${category}${keyword ? ' - ' + keyword : ''}.</p>`;
}

function addMarkersToMap(data) {
    data.forEach(row => {
        const lat = parseFloat(row.Latitude);
        const lng = parseFloat(row.Longitude);

        if (!isNaN(lat) && !isNaN(lng)) {
            const marker = L.marker([lat, lng]).addTo(map);
            marker.bindPopup(`
                <strong>Project Name:</strong> ${row['Project Name'] || 'N/A'}<br>
                <strong>Category:</strong> ${row['Project Category'] || 'N/A'}<br>
                <strong>Description:</strong> ${row['Description'] || 'No description available.'}<br>
                <img src="${row['ImageUrl'] || 'https://via.placeholder.com/100'}" alt="Project Image" style="width:100px;">
            `);
        }
    });
}
