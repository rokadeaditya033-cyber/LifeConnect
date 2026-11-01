# BloodConnect - Community Blood Donation & Emergency Request Platform

BloodConnect is a Community Engagement Project (CEP) multi-page web application connecting voluntary donors with patients and hospitals across Maharashtra (Pune, Nashik, Ahilyanagar/Ahmednagar, Shrirampur, Sangamner, and Mumbai).

Built strictly as a pure multi-page static web application using semantic HTML5, CSS3, and vanilla JavaScript.

## Features

- **Home (`index.html`)**: Live statistics counter, active emergency alerts preview, upcoming donation drives, 3-step workflow, awareness facts, and community testimonials.
- **Emergency Blood Request Portal (`request-blood.html`)**: Form to submit patient blood requirements with hospital details, urgency levels, unique Request ID generator, live ID tracker, and feed of active Maharashtra requests.
- **Donor Registration Portal (`donate-blood.html`)**: Registration for voluntary donors across Maharashtra with age and health eligibility guidelines, locality, and availability status.
- **Find Donors (`find-donors.html`)**: Real-time searchable and filterable donor registry with blood group, city filter, availability toggles, and direct connection request actions.
- **Blood Donation Camps (`blood-camps.html`)**: Directory of upcoming donation camps across Maharashtra cities with camp registration confirmation and impact metrics.
- **Awareness & Education Hub (`awareness.html`)**: Red blood cell compatibility chart, myth vs fact debunker, and interactive knowledge quiz with instant scoring.
- **About Us (`about.html`) & Contact (`contact.html`)**: CEP background, community mission, feedback and support submission form with emergency helpline details (+91 87882 79813 / sunilsonawne@gmail.com).
- **Authentication & Dashboards**:
  - User login (`login.html`) & registration (`register.html`).
  - Donor Dashboard (`donor-dashboard.html`): view profile status, toggle availability, and check matched requests.
  - Admin Portal (`admin-login.html`, `admin-dashboard.html` with `admin` / `admin123`): Overview metrics, blood requests table with fulfill actions, verified donor management, and camp creation.

## Tech Stack

- **Architecture**: Multi-Page Static Site (MPA)
- **Frontend**: Pure HTML5, Vanilla JavaScript (ES6+), CSS3
- **Icons**: FontAwesome 6 CDN
- **Server**: Node.js static HTTP server (`server.js`) on port 3000
- **State & Storage**: Client-side `localStorage` data persistence with automatic initial seeding

## Running the Application

```bash
npm run dev
```

Server runs on `http://0.0.0.0:3000/`.
