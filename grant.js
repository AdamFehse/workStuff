// Function to convert array of objects to CSV format
function arrayToCSV(arr) {
    const header = Object.keys(arr[0]).join(',');  // Extract headers from the first object
    const rows = arr.map(obj => 
        Object.values(obj)
            .map(value => `"${value.replace(/"/g, '""')}"`)  // Escape quotes and enclose each value in double quotes
            .join(',')
    );  // Extract values for each row
    return [header, ...rows].join('\n');
}

// Function to extract data from the NEH grants website
// Specifically targeting articles with class "grant-teaser" to avoid irrelevant articles
const articles = document.querySelectorAll('article.grant-teaser');
const grants = [];

articles.forEach(article => {
    const deadline = article.querySelector('.grant-teaser__date').textContent.trim().split(' ').pop();
    const title = article.querySelector('.grant-teaser__title p').textContent.trim();
    const href = article.querySelector('.grant-teaser__title a').href;

    // Extract entire "output" value, ensuring it is joined into a single string
    const output = [...article.querySelectorAll('.grant-teaser__field')]
        .filter(field => field.textContent.includes('Output')) // Filter for fields that contain 'Output'
        .map(field => field.textContent.replace('Output: ', '').trim()) // Clean up and extract text
        .join(', '); // Ensure the entire output is concatenated

    grants.push({
        title: title,
        href: href,
        deadline: deadline,
        output: output
    });
});

// Prompt the user for confirmation and trigger the CSV download
if (confirm('Do you want to download the CSV file?')) {
    const csvData = arrayToCSV(grants);
    const csvBlob = new Blob([csvData], { type: 'text/csv' });

    // Create a link element for download
    const csvLink = document.createElement('a');
    csvLink.href = URL.createObjectURL(csvBlob);
    csvLink.download = 'Fed/State Partnership.csv';  // Filename

    // Trigger the download
    csvLink.click();
} else {
    console.log('Download canceled.');
}
