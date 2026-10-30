document.addEventListener('DOMContentLoaded', () => {
    renderCamps();
    const filter = document.getElementById('campCityFilter');
    if (filter) {
        filter.addEventListener('change', renderCamps);
    }
});

function renderCamps() {
    const grid = document.getElementById('campsGrid');
    if (!grid) return;
    const cityFilter = document.getElementById('campCityFilter')?.value || '';
    const camps = JSON.parse(localStorage.getItem('camps')) || [];
    const filtered = camps.filter(c => !cityFilter || c.city === cityFilter);

    grid.innerHTML = filtered.map(c => `
        <div class="card">
            <h3>${c.name}</h3>
            <p><strong>Organizer:</strong> ${c.organizer}</p>
            <p><strong>Location:</strong> ${c.venue}, ${c.city}</p>
            <p><strong>Date & Time:</strong> ${c.date} | ${c.time}</p>
            <button class="btn btn-secondary mt-2" onclick="alert('Registered successfully for ${c.name}!')">Register for Camp</button>
        </div>
    `).join('') || '<p>No camps found.</p>';
}