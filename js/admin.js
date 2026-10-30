document.addEventListener('DOMContentLoaded', () => {
    const adminLoginForm = document.getElementById('adminLoginForm');
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const user = document.getElementById('adminUser').value;
            const pass = document.getElementById('adminPass').value;
            if (user === 'admin' && pass === 'admin123') {
                localStorage.setItem('isAdminLoggedIn', 'true');
                window.location.href = 'admin-dashboard.html';
            } else {
                alert('Invalid admin credentials. Use admin / admin123');
            }
        });
    }

    if (window.location.pathname.includes('admin-dashboard.html')) {
        if (localStorage.getItem('isAdminLoggedIn') !== 'true') {
            window.location.href = 'admin-login.html';
            return;
        }
        loadAdminDashboard();
    }

    const logout = document.getElementById('adminLogout');
    if (logout) {
        logout.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('isAdminLoggedIn');
            window.location.href = 'admin-login.html';
        });
    }
});

function loadAdminDashboard() {
    const donors = JSON.parse(localStorage.getItem('donors')) || [];
    const requests = JSON.parse(localStorage.getItem('requests')) || [];
    const camps = JSON.parse(localStorage.getItem('camps')) || [];
    const pending = requests.filter(r => r.status === 'Pending').length;

    if (document.getElementById('admStatDonors')) document.getElementById('admStatDonors').innerText = donors.length;
    if (document.getElementById('admStatRequests')) document.getElementById('admStatRequests').innerText = requests.length;
    if (document.getElementById('admStatPending')) document.getElementById('admStatPending').innerText = pending;
    if (document.getElementById('admStatCamps')) document.getElementById('admStatCamps').innerText = camps.length;

    const tbody = document.querySelector('#adminRequestsTable tbody');
    if (tbody) {
        tbody.innerHTML = requests.map(r => `
            <tr>
                <td>${r.requestId}</td>
                <td>${r.patientName}</td>
                <td>${r.bloodGroup}</td>
                <td>${r.city}</td>
                <td><span class="badge">${r.status}</span></td>
                <td>
                    <button class="btn btn-primary btn-sm" onclick="updateReqStatus('${r.requestId}', 'Fulfilled')">Fulfill</button>
                </td>
            </tr>
        `).join('') || '<tr><td colspan="6">No requests found.</td></tr>';
    }
}

function updateReqStatus(id, newStatus) {
    let requests = JSON.parse(localStorage.getItem('requests')) || [];
    requests = requests.map(r => r.requestId === id ? { ...r, status: newStatus } : r);
    localStorage.setItem('requests', JSON.stringify(requests));
    loadAdminDashboard();
}