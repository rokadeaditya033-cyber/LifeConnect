document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('donorRegistrationForm');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const donors = JSON.parse(localStorage.getItem('donors')) || [];
            const newDonor = {
                id: 'D-' + Math.floor(100 + Math.random() * 900),
                fullName: document.getElementById('fullName').value,
                age: document.getElementById('age').value,
                gender: document.getElementById('gender').value,
                bloodGroup: document.getElementById('donorBloodGroup').value,
                mobile: document.getElementById('donorMobile').value,
                email: document.getElementById('donorEmail').value,
                city: document.getElementById('donorCity').value,
                area: document.getElementById('donorArea').value,
                pinCode: document.getElementById('pinCode').value,
                status: document.getElementById('availabilityStatus').value
            };
            donors.push(newDonor);
            localStorage.setItem('donors', JSON.stringify(donors));
            alert('Donor registered successfully!');
            form.reset();
        });
    }
});