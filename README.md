# ⚡ PulseBoard – Real-Time Analytics Dashboard

**PulseBoard** is a sleek, high-performance real-time analytics dashboard built with modern web technologies.  
It leverages **WebSockets** to deliver lightning-fast data updates and visualizes them using **Chart.js**, all wrapped in a beautiful UI powered by **React + TypeScript + Vite**.

> Stay in sync with your data’s pulse. No refresh required.

---

## 🚀 Features

- 📡 **Real-Time Data Streaming**
  - Seamless updates via WebSocket connection
- 📈 **Dynamic Charting**
  - Line, bar, pie, and custom charts with live updates using Chart.js
- 🎛️ **Interactive Dashboard**
  - Toggle views, filter data, switch chart types on the fly
- 🧠 **Type-Safe Codebase**
  - Built in TypeScript for rock-solid reliability
- ⚡ **Blazing Fast Build**
  - Powered by Vite for near-instant dev server start and HMR
- 🌙 **Dark Mode Ready**
  - Responsive and theme-aware design
- 🧩 **Modular & Extensible**
  - Easily integrate new widgets, data types, or external APIs

---

## 🧰 Tech Stack

| Layer         | Tech                         |
|---------------|------------------------------|
| **Frontend**  | React + TypeScript + Vite    |
| **Charts**    | Chart.js + `react-chartjs-2` |
| **Live Data** | WebSockets (Native / `ws`)   |
| **Server**    | Node.js (Express or custom ws server) |
| **Styling**   | Tailwind CSS / CSS Modules   |

---

## 📁 Folder Structure
```
pulseboard/
├── client/ # Frontend (React + Vite)
│ ├── src/
│ │ ├── components/ # Charts, widgets, controls
│ │ ├── services/ # WebSocket client, API utils
│ │ ├── context/ # Global state management
│ │ └── App.tsx # Root component
│ └── vite.config.ts
├── server/ # Backend (Node.js + WebSockets)
│ ├── index.js # WebSocket server
│ └── mockData.js # Simulated data stream
└── README.md
```

## ⚙️ Getting Started

### Prerequisites

- Node.js (18+ recommended)
- npm or yarn

### 1. Clone the Repo

```
git clone https://github.com/yourusername/pulseboard.git
cd pulseboard
```
### 2. Install Dependencies
# Install client dependencies
```
cd client
npm install
```
# Install server dependencies
```
cd ../server
npm install
```
### 3. Start the Server
```
cd server
node index.js
```
Default server runs on ws://localhost:4000

### 4. Start the Frontend
```
cd ../client
npm run dev
```
Frontend runs on http://localhost:5173

## 🧪 Simulated Data Streams
The backend server uses a mock generator to emit sample data every few seconds. You can modify mockData.js to simulate different types of real-time data such as:

- Active users

- Revenue flow

- App crashes

- API response time

- Sensor input (IoT, etc.)

## 📊 Screenshots
(Add screenshots of live charts and dashboard layout here if you’ve got them!)

## 📡 WebSocket Payload Example
```
{
  "metric": "active_users",
  "value": 842,
  "timestamp": "2025-07-23T15:34:22Z"
}
```
## 📦 Built With
- react-chartjs-2

- chart.js

- vite

- ws

- tailwindcss

##  Future Plans
- ⏱ Historical analytics with time-range filtering

- 📁 CSV/JSON export

- 🔔 Threshold-based alerts

- 📲 Mobile-responsive dashboard

- 🔐 Auth & role-based access (admin/viewer)

- 📈 Custom chart builder wizard

## 👨‍💻 Author
Brendan Mebuge Kamsiyochukwu
📬 brendanmebson@gmail.com

## 💬 Feedback
Got suggestions or found a bug?
Open an issue or shoot me an email — I’d love to hear from you!

PulseBoard – because waiting for data is so last decade. 🚀
