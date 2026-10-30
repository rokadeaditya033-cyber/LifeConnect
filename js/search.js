document.addEventListener('DOMContentLoaded', () => {
    // 1. Seed fallback test donors if localStorage is empty
    if (!localStorage.getItem('donors') || JSON.parse(localStorage.getItem('donors')).length === 0) {
        localStorage.setItem('donors', JSON.stringify([
            { id: 'D-101', fullName: 'Rahul Sharma', age: 25, bloodGroup: 'O+', city: 'Nashik', area: 'College Road', mobile: '9876543210', status: 'Available' },
            { id: 'D-102', fullName: 'Priya Deshmukh', age: 28, bloodGroup: 'A+', city: 'Pune', area: 'Kothrud', mobile: '9123456789', status: 'Available' },
            { id: 'D-103', fullName: 'Amit Patil', age: 30, bloodGroup: 'B-', city: 'Mumbai', area: 'Andheri', mobile: '9988776655', status: 'Available' }
        ]));
    }

    // 2. Wire up Search Button
    const searchBtn = document.getElementById('searchDonorsBtn');
    if (searchBtn) {
        searchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            filterDonors();
        });
    }

    // 3. Wire up Reset Button
    const resetBtn = document.getElementById('resetSearchBtn');
    if (resetBtn) {
        resetBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const bgEl = document.getElementById('filterBloodGroup');
            const cityEl = document.getElementById('filterCity');
            const statusEl = document.getElementById('filterStatus');

            if (bgEl) bgEl.value = '';
            if (cityEl) cityEl.value = '';
            if (statusEl) statusEl.value = '';
            
            filterDonors();
        });
    }

    // 4. Run search immediately on page load to display all available donors
    filterDonors();
});

function filterDonors() {
    const grid = document.getElementById('donorResultsGrid');
    if (!grid) return;

    const bg = document.getElementById('filterBloodGroup')?.value || '';
    const city = document.getElementById('filterCity')?.value || '';
    const status = document.getElementById('filterStatus')?.value || '';

    const donors = JSON.parse(localStorage.getItem('donors')) || [];

    const filtered = donors.filter(d => {
        const matchBg = !bg || d.bloodGroup === bg;
        const matchCity = !city || d.city === city;
        const matchStatus = !status || d.status === status;
        return matchBg && matchCity && matchStatus;
    });

    if (filtered.length === 0) {
        grid.innerHTML = `<div class="card text-center" style="grid-column: 1 / -1;"><p>No matching donors found for the selected criteria.</p></div>`;
        return;
    }

    grid.innerHTML = filtered.map(d => `
        <div class="card">
            <h3>${d.fullName} <span style="color: var(--primary-red);">(${d.bloodGroup})</span></h3>
            <p><i class="fa-solid fa-location-dot"></i> ${d.area ? d.area + ', ' : ''}${d.city}</p>
            <p><i class="fa-solid fa-phone"></i> ${d.mobile || 'Contact via Consent'}</p>
            <p><i class="fa-solid fa-circle-check" style="color: var(--success-green);"></i> Status: <strong>${d.status || 'Available'}</strong></p>
            <button class="btn btn-primary mt-2" onclick="alert('Connection request sent securely to ${d.fullName}!')">Request Connection</button>
        </div>
    `).join('');
}