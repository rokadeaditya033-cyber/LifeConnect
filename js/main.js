// Main global initialization & localStorage seeding
document.addEventListener('DOMContentLoaded', () => {
    // Seed initial data if not present
    if (!localStorage.getItem('donors')) {
        localStorage.setItem('donors', JSON.stringify([
            { id: 'D-101', fullName: 'Rahul Sharma', age: 28, bloodGroup: 'O+', city: 'Pune', area: 'Kothrud', mobile: '9876543210', status: 'Available' },
            { id: 'D-102', fullName: 'Priya Deshmukh', age: 24, bloodGroup: 'A+', city: 'Nashik', area: 'College Road', mobile: '9123456789', status: 'Available' }
        ]));
    }
    if (!localStorage.getItem('requests')) {
        localStorage.setItem('requests', JSON.stringify([
            { requestId: 'REQ-1001', patientName: 'Amit Patil', bloodGroup: 'B+', city: 'Pune', units: 2, hospital: 'Ruby Hall Clinic', date: '2026-11-05', level: 'Critical', status: 'Pending' }
        ]));
    }
    if (!localStorage.getItem('camps')) {
        localStorage.setItem('camps', JSON.stringify([
            { id: 'C-1', name: 'Mega Blood Drive', organizer: 'Red Cross Nashik', date: '2026-11-15', time: '10:00 AM', venue: 'Town Hall', city: 'Nashik', desc: 'Free health checkup and donation drive.' }
        ]));
    }

    updateStats();
    renderHomeEmergency();
    renderHomeCamps();

    // Hamburger menu toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => navLinks.classList.toggle('active'));
    }
});

function updateStats() {
    const donors = JSON.parse(localStorage.getItem('donors')) || [];
    const requests = JSON.parse(localStorage.getItem('requests')) || [];
    const camps = JSON.parse(localStorage.getItem('camps')) || [];
    const fulfilled = requests.filter(r => r.status === 'Fulfilled').length;

    if (document.getElementById('statDonors')) document.getElementById('statDonors').innerText = donors.length;
    if (document.getElementById('statRequests')) document.getElementById('statRequests').innerText = requests.length;
    if (document.getElementById('statFulfilled')) document.getElementById('statFulfilled').innerText = fulfilled;
    if (document.getElementById('statCamps')) document.getElementById('statCamps').innerText = camps.length;
}

function renderHomeEmergency() {
    const container = document.getElementById('homeEmergencyGrid');
    if (!container) return;
    const requests = JSON.parse(localStorage.getItem('requests')) || [];
    container.innerHTML = requests.slice(0, 3).map(r => `
        <div class="card">
            <span class="badge ${r.level.toLowerCase()}">${r.level}</span>
            <h3>${r.bloodGroup} Needed</h3>
            <p><i class="fa-solid fa-hospital"></i> ${r.hospital || 'Hospital in ' + r.city}</p>
            <p><i class="fa-solid fa-location-dot"></i> ${r.city}</p>
            <p><i class="fa-solid fa-calendar"></i> Required by: ${r.date}</p>
        </div>
    `).join('') || '<p>No active emergencies.</p>';
}

function renderHomeCamps() {
    const container = document.getElementById('homeCampsGrid');
    if (!container) return;
    const camps = JSON.parse(localStorage.getItem('camps')) || [];
    container.innerHTML = camps.slice(0, 3).map(c => `
        <div class="card">
            <h3>${c.name}</h3>
            <p><i class="fa-solid fa-user-tie"></i> ${c.organizer}</p>
            <p><i class="fa-solid fa-location-dot"></i> ${c.venue}, ${c.city}</p>
            <p><i class="fa-solid fa-calendar"></i> ${c.date} (${c.time})</p>
        </div>
    `).join('') || '<p>No upcoming camps.</p>';
}