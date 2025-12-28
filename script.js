// ==================== 1. SCROLL ANIMATION OBSERVER ====================
const observerOptions = {
    threshold: 0.15 // Trigger when 15% of element is visible
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.scroll-trigger').forEach((el) => {
    observer.observe(el);
});

// ==================== 2. MOBILE MENU LOGIC ====================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const closeBtn = document.getElementById('close-btn');
const navLinks = document.querySelectorAll('.nav-links li a');

hamburger.addEventListener('click', () => {
    navMenu.classList.add('active');
});

closeBtn.addEventListener('click', () => {
    navMenu.classList.remove('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ==================== 3. TABS LOGIC ====================
function openTab(tabName) {
    const contents = document.querySelectorAll('.tab-content');
    contents.forEach(c => {
        c.classList.remove('active');
        c.style.display = 'none';
    });

    const buttons = document.querySelectorAll('.tab-btn');
    buttons.forEach(b => b.classList.remove('active'));

    const target = document.getElementById(tabName);
    target.style.display = 'block';
    setTimeout(() => target.classList.add('active'), 10);
    
    event.currentTarget.classList.add('active');
}

// ==================== 4. LEAFLET MAP LOGIC ====================
if (document.getElementById('map')) {
    const map = L.map('map').setView([20, 0], 2);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; OpenStreetMap'
    }).addTo(map);

    const locations = [
        { name: "United Kingdom", coords: [51.5074, -0.1278], desc: "Birthplace" },
        { name: "USA / Canada", coords: [38.9072, -77.0369], desc: "1st Diaspora" },
        { name: "Australia", coords: [-35.2809, 149.1300], desc: "2nd Diaspora" },
        { name: "South Asia", coords: [23.6850, 90.3563], desc: "3rd Diaspora" }
    ];

    const planeIcon = L.divIcon({
        className: 'custom-icon',
        html: '<div style="font-size: 24px;">✈️</div>',
        iconSize: [30, 30]
    });

    let marker = L.marker(locations[0].coords, {icon: planeIcon}).addTo(map)
        .bindPopup(`<b>${locations[0].name}</b><br>${locations[0].desc}`);

    const latlngs = locations.map(loc => loc.coords);
    L.polyline(latlngs, {color: '#d97706', weight: 3, dashArray: '10, 10'}).addTo(map);

    let step = 0;
    const btn = document.getElementById('start-btn');
    const status = document.getElementById('map-status');

    btn.addEventListener('click', () => {
        if (step < locations.length - 1) {
            step++;
            let loc = locations[step];
            status.innerText = `Flying to ${loc.name}...`;
            map.flyTo(loc.coords, 4, { duration: 2 });
            setTimeout(() => {
                marker.setLatLng(loc.coords).bindPopup(loc.name).openPopup();
                status.innerText = `Arrived: ${loc.name}`;
            }, 2000);
        } else {
            step = 0;
            map.flyTo(locations[0].coords, 2);
            marker.setLatLng(locations[0].coords);
            status.innerText = "Resetting...";
        }
    });
}