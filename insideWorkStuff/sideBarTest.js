
function showContent(category, keyword) {
    const contentDiv = document.getElementById('mainContent');
    contentDiv.innerHTML = `
            <h3 class="text-center">${category}</h3>
            <p class="text-center">You clicked on Keyword ${keyword} from the ${category} category.</p>
        `;
}
