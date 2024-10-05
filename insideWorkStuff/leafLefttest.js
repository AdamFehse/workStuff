var map = L.map('map').setView([32.216868, -110.974298], 7);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// Load the TopoJSON data
$.getJSON('countries-50m.json', function (topoData) { 
    // Convert TopoJSON to GeoJSON and add it to the map
    L.geoJson(topojson.feature(topoData, topoData.objects.countries), {
        style: function (feature) { 
            return {
                'weight': 1,
                'color': 'blue',       // Border color
                'fillColor': getFillColor(feature),  // Dynamic fill color
                'fillOpacity': .5      // Fill opacity
            };
        }
    }).addTo(map); 
});

// Function to get fill color based on feature properties
function getFillColor(feature) {
    // Example: Change color based on properties (you can customize this logic)
    if (feature.properties && feature.properties.type === 'mountain') {
        return 'sandybrown'; // Color for mountains
    } else if (feature.properties && feature.properties.type === 'forest') {
        return 'forestgreen'; // Color for forests
    } else {
        return 'blue'; // Default color for land
    }
}

// Style for water (You can use a custom tile layer for this if needed)
var waterStyle = {
    weight: 1,
    color: 'blue',
    fillColor: 'black',
    fillOpacity: 1
};

// Add water layer (if available in your GeoJSON or separately defined)
L.geoJson(waterGeoJsonData, { // Replace with your actual water GeoJSON data
    style: waterStyle
}).addTo(map);

var marker = L.marker([32.216868, -110.974298]).addTo(map);

var circle = L.circle([32.216868, -110.974298], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(map);

var polygon = L.polygon([
    [32.216868, -110.974298],
    [32.216868, -110.974298],
    [32.216868, -110.974298]
]).addTo(map);

marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
circle.bindPopup("I am a circle.");
polygon.bindPopup("I am a polygon.");

var popup = L.popup()
    .setLatLng([32.216868, -110.974298])
    .setContent("I am a standalone popup.")
    .openOn(map);

function onMapClick(e) {
    alert("You clicked the map at " + e.latlng);
    }

    map.on('click', onMapClick);


// Function to toggle the sidebar visibility
function toggleSidebar() {
    var sidebar = document.getElementById('sidebar');
    if (sidebar.classList.contains('collapsed')) {
        sidebar.classList.remove('collapsed');
    } else {
        sidebar.classList.add('collapsed');
    }
}

// Function to show the specific page content and update active link styling
function showPage(pageId, event) {
    event.preventDefault(); // Prevent the default anchor link behavior

    // Hide all pages
    var pages = document.querySelectorAll('.page');
    pages.forEach(function(page) {
        page.classList.remove('active');
    });

    // Show the selected page
    var selectedPage = document.getElementById(pageId);
    selectedPage.classList.add('active');

    // Remove 'active' class from all links
    var links = document.querySelectorAll('.top-links a');
    links.forEach(function(link) {
        link.classList.remove('active');
    });

    // Add 'active' class to the clicked link
    event.target.classList.add('active');
}

// Go to specific location on the map when a sidebar item is clicked
function goToLocation(lat, lng) {
    map.setView([lat, lng], 7);
}

