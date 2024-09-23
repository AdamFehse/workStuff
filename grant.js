// Thi function parses the html from the NEH grants website.
const articles = document.querySelectorAll('.grant-teaser');
const grants = [];

articles.forEach(article => {
    const deadline = article.querySelector('.grant-teaser__date').textContent.trim().split(' ').pop();
    const title = article.querySelector('.grant-teaser__title p').textContent.trim();
    const href = article.querySelector('.grant-teaser__title a').href;
    const output = [...article.querySelectorAll('.grant-teaser__field')]
                   .map(field => field.textContent.trim())
                   .filter(text => text.startsWith('Output')).join(', ');

    grants.push({
        title: title,
        href: href,
        deadline: deadline,
        output: output
    });
});

/*
// Create a container to display the grants
const grantContainer = document.createElement('div');
grantContainer.id = 'grant-list';
document.body.appendChild(grantContainer);

// Display each grant on the browser
grants.forEach(grant => {
    const grantElement = document.createElement('div');
    grantElement.innerHTML = `
        <h3><a href="${grant.href}">${grant.title}</a></h3>
        <p><strong>Deadline:</strong> ${grant.deadline}</p>
        <p><strong>Output:</strong> ${grant.output}</p>
        <hr>
    `;
    grantContainer.appendChild(grantElement);
});*/

function arrayToCSV(arr) {
    const header = Object.keys(arr[0]).join(',');  // Extract headers from the first object
    const rows = arr.map(obj => Object.values(obj).join(','));  // Extract values for each row
    return [header, ...rows].join('\n');
}

// Prompt the user for confirmation
if (confirm('Do you want to download the CSV file?')) {
    const csvData = arrayToCSV(grants);
    const csvBlob = new Blob([csvData], { type: 'text/csv' });

    // Create a link element for download
    const csvLink = document.createElement('a');
    csvLink.href = URL.createObjectURL(csvBlob);
    csvLink.download = 'FedStatePartnership.csv';  // Filename

    // Trigger the download
    csvLink.click();
} else {
    console.log('Download canceled.');
}
