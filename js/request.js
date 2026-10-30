document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('bloodRequestForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const requests = JSON.parse(localStorage.getItem('requests')) || [];
            const newReq = {
                requestId: 'REQ-' + Math.floor(10000 + Math.random() * 90000),
                patientName: document.getElementById('patientName').value,
                contact: document.getElementById('contactNumber').value,
                email: document.getElementById('email').value,
                bloodGroup: document.getElementById('bloodGroup').value,
                units: document.getElementById('unitsRequired').value,
                city: document.getElementById('city').value,
                hospital: document.getElementById('hospitalName').value,
                date: document.getElementById('requiredDate').value,
                level: document.getElementById('emergencyLevel').value,
                info: document.getElementById('additionalInfo').value,
                status: 'Pending'
            };
            requests.unshift(newReq);
            localStorage.setItem('requests', JSON.stringify(requests));
            alert(`Blood request submitted successfully! Your Request ID is: ${newReq.requestId}`);
            form.reset();
            loadActiveRequests();
        });
    }

    const trackBtn = document.getElementById('trackBtn');
    if (trackBtn) {
        trackBtn.addEventListener('click', () => {
            const id = document.getElementById('trackRequestIdInput').value.trim();
            const requests = JSON.parse(localStorage.getItem('requests')) || [];
            const found = requests.find(r => r.requestId === id);
            const container = document.getElementById('trackResultContainer');
            if (found) {
                container.innerHTML = `<div class="mt-2 p-2 bg-light border"><strong>Status:</strong> ${found.status} | <strong>Blood:</strong> ${found.bloodGroup} | <strong>City:</strong> ${found.city}</div>`;
            } else {
                container.innerHTML = `<p class="text-danger mt-2">Request ID not found.</p>`;
            }
        });
    }

    loadActiveRequests();
});

function loadActiveRequests() {
    const feed = document.getElementById('activeRequestsFeed');
    if (!feed) return;
    const requests = JSON.parse(localStorage.getItem('requests')) || [];
    feed.innerHTML = requests.map(r => `
        <div class="card">
            <h4>${r.bloodGroup} - ${r.city}</h4>
            <p><strong>Patient:</strong> ${r.patientName}</p>
            <p><strong>Hospital:</strong> ${r.hospital || 'N/A'}</p>
            <p><strong>Units:</strong> ${r.units} | <strong>Status:</strong> <span class="text-primary">${r.status}</span></p>
            <p><small>ID: ${r.requestId}</small></p>
        </div>
    `).join('') || '<p>No active requests.</p>';
}