# POLAR TWIN – Antarctic Operations Digital Twin

**POLAR TWIN** is a mission-control web application and digital twin platform built for monitoring Indian Antarctic Research Stations (**Maitri** and **Bharati**).

Developed for Smart India Hackathon (SIH), this platform combines aerospace mission control UI design with real-time 3D WebGL visualization, role-based security, telemetry monitoring, and predictive failure simulation.

---

## Key Features

1. **Mission Control Interface**:
   - Cyber-dark navy substrate (`#040812`) with glowing cyan/blue highlights, glassmorphism panels, and status badges (`NORMAL`, `WARNING`, `CRITICAL`).
   - Ticking real-time IST operational clock and satellite link status telemetry ("ONLINE").

2. **Interactive 3D Digital Twin Engine**:
   - **Antarctic Globe View**: Three.js/React Three Fiber 3D globe rendering polar ice terrain, geolocated station pins (Maitri & Bharati), status ring overlays, camera rotation/zoom/pan, and interactive popups.
   - **3D Station Infrastructure Twin**: WebGL procedural 3D station models featuring main habitat container modules, auxiliary generator sheds, fuel depots, communication radomes, solar arrays, and click-to-diagnose assets.

3. **Three User Roles**:
   - **SUPER ADMIN** (`admin@polartwin.demo`): Complete system access across all stations, user provisioning, global settings, logistics, assets, and reports.
   - **STATION OPERATOR** (`operator@polartwin.demo`): Station-specific operational view (Maitri/Bharati health, thermal loops, power, fuel, weather, local logistics).
   - **ENGINEER** (`engineer@polartwin.demo`): Engineering maintenance telemetry (Generator #02 thermal diagnostic, predictive maintenance, sensors, equipment failure simulations).

4. **Digital Twin Simulation Sandbox**:
   - Interactive scenario runner for **Generator #02 Complete Failure**, **Supply Ship Delay / Fuel Depletion**, and **Katabatic Blizzard**.
   - Real-time impact calculation for power reduction %, fuel depletion rate %, risk level score, affected assets count, recovery timeline, and recommended emergency procedures.

5. **Operational Reports & Exporters**:
   - Export mission logs and energy audits to structured JSON/CSV data format for NCPOR archives.

---

## Demo Credentials

| Role | Email | Passcode |
| :--- | :--- | :--- |
| **Super Admin** | `admin@polartwin.demo` | `demo1234` |
| **Station Operator** | `operator@polartwin.demo` | `demo1234` |
| **Engineer** | `engineer@polartwin.demo` | `demo1234` |

---

## Tech Stack

- **Core**: React 18 + TypeScript + Vite 8
- **3D Rendering**: Three.js, `@react-three/fiber`, `@react-three/drei`
- **Styling**: Tailwind CSS v3, Custom Cyber Grid & Glassmorphism Utilities
- **Iconography**: Lucide React
- **Analytics Charts**: Recharts
- **Routing & Auth**: React Router DOM v6 + React Context Authorization

---

## Getting Started & Run Commands

### Prerequisites
- Node.js 18+ (or v20 LTS recommended)
- npm 9+

### Installation & Execution

```bash
# Clone or navigate to the project folder
cd /home/prince/MVP

# Install dependencies
npm install --legacy-peer-deps

# Start local dev server
npm run dev

# Build for production
npm run build
```

Open your browser to `http://localhost:5173`.

---

## Project Structure

```
/home/prince/MVP/
├── src/
│   ├── types/
│   │   └── index.ts          # Core domain models (Station, Asset, Alert, User, Simulation)
│   ├── data/
│   │   └── mockData.ts       # Realistic telemetry datasets (Maitri & Bharati)
│   ├── services/
│   │   ├── authService.ts    # Authentication & role permissions
│   │   └── dataServices.ts   # Service layer for stations, assets, energy, logistics, simulations
│   ├── context/
│   │   └── AuthContext.tsx   # React Context state management
│   ├── components/
│   │   ├── layout/           # Sidebar, Header, ProtectedRoute, MainLayout
│   │   ├── ui font/          # StatusBadge, MetricCard
│   │   └── 3d/               # GlobeViewer, Station3DTwin
│   ├── pages/
│   │   ├── Login.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Stations.tsx
│   │   ├── StationDetail.tsx
│   │   ├── TwinViewerPage.tsx
│   │   ├── Energy.tsx
│   │   ├── Environment.tsx
│   │   ├── Logistics.tsx
│   │   ├── Assets.tsx
│   │   ├── Alerts.tsx
│   │   ├── Simulation.tsx
│   │   ├── Reports.tsx
│   │   ├── Users.tsx
│   │   └── Settings.tsx
│   ├── App.tsx               # Client-side router configuration
│   ├── main.tsx              # React entry point
│   └── index.css             # Tailwind & Glassmorphism CSS styles
```

---

## Replacing Mock Data with Real APIs

The application is engineered with a decoupled service abstraction layer (`src/services/dataServices.ts` and `src/services/authService.ts`).

To connect real backend APIs (e.g. NCPOR telemetry endpoint, satellite MQTT broker, station IoT sensors):

1. Update `src/services/dataServices.ts` methods (`getStations`, `getAssets`, `runSimulation`) to perform HTTP `fetch` or WebSocket connections.
2. Update the API Endpoint in `Settings.tsx` (`https://telemetry.ncpor.res.in/v1/polar-twin`).
3. Replace `MOCK DATA MODE` badge in `Header.tsx` with live WebSocket status indicator.

---

## How the 3D System Works

- **Spherical Mapping**: Geographic latitude and longitude coordinates ($\phi, \lambda$) are converted to 3D Cartesian vectors $(x, y, z)$ on a Three.js sphere:
  $$x = -R \cdot \sin(90^\circ - \phi) \cdot \cos(\lambda + 180^\circ)$$
  $$y = R \cdot \cos(90^\circ - \phi)$$
  $$z = R \cdot \sin(90^\circ - \phi) \cdot \sin(\lambda + 180^\circ)$$
- **3D Station Infrastructure Twin**: Procedural WebGL geometry simulates station habitats, solar panels, and generator sheds with interactive status-colored glowing wires and raycasting click listeners.
