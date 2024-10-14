// Function to extract all text content from project cards in the HTML
function extractTextFromProjects() {
    const projectCards = document.querySelectorAll('.card');
    let allText = '';

    projectCards.forEach(card => {
        const title = card.querySelector('.card-title').innerText.trim();
        const description = card.querySelector('.card-text').innerText.trim();
        
        // Combine title and description for keyword analysis
        allText += ' ' + title + ' ' + description;
    });

    return allText;
}

// Function to clean text, remove common stopwords, and generate a keyword list
function generateKeywordList(text) {
    // Convert text to lowercase and remove punctuation
    const cleanedText = text.toLowerCase().replace(/[^\w\s]/g, '');

    // Split text into words
    const words = cleanedText.split(/\s+/);

    // Common English stopwords to ignore
    const stopwords = ['the', 'and', 'in', 'of', 'to', 'a', 'with', 'for', 'on', 'is', 'by', 'an', 'it', 'as'];

    // Create an object to store word frequencies
    const wordFrequency = {};

    words.forEach(word => {
        if (!stopwords.includes(word) && word.length > 2) {
            if (wordFrequency[word]) {
                wordFrequency[word]++;
            } else {
                wordFrequency[word] = 1;
            }
        }
    });

    // Convert frequency object to an array of [word, count] pairs, sorted by count
    const sortedKeywords = Object.entries(wordFrequency).sort((a, b) => b[1] - a[1]);

    return sortedKeywords;
}

// Function to print the keyword list to the page
function printKeywordList(keywordList) {
    const keywordDiv = document.getElementById('keyword-list');
    
    // Clear any existing content
    keywordDiv.innerHTML = '';

    // Create a list element
    const ul = document.createElement('ul');

    // Loop through the keyword list and add each keyword to the list
    keywordList.forEach(([word, count]) => {
        const li = document.createElement('li');
        li.textContent = `${word}: ${count}`;
        ul.appendChild(li);
    });

    // Append the list to the keyword div
    keywordDiv.appendChild(ul);
}

// After DOM is loaded, extract text, generate keyword list, and print it
document.addEventListener('DOMContentLoaded', () => {
    const allProjectText = extractTextFromProjects();
    const keywordList = generateKeywordList(allProjectText);
    printKeywordList(keywordList);
});
