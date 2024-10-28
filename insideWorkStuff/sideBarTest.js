
function showContent(category, keyword) {
    const contentDiv = document.getElementById('mainContent');
    contentDiv.innerHTML = `
            <h6 class="text-center">${category}</h6>
            <p class="text-center">You clicked on Keyword ${keyword} from the ${category} category.</p>
        `;
}
