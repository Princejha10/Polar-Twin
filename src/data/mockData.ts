import { Station, Asset, Alert, User, EnergyMetrics, LogisticsItem, Shipment, EnvironmentMetrics, SimulationScenario, SystemReport } from '../types';

export const INITIAL_STATIONS: Station[] = [
  {
    id: 'maitri',
    name: 'MAITRI STATION',
    code: 'IND-MAITRI-01',
    status: 'NORMAL',
    location: 'Schirmacher Oasis, Dronning Maud Land',
    coordinates: {
      lat: -70.7667,
      lng: 11.7333,
      elevation: 117
    },
    temperature: -27.4,
    windSpeed: 28,
    humidity: 64,
    pressure: 985,
    fuelLevel: 72,
    powerLevel: 84,
    generationKw: 450,
    consumptionKw: 320,
    overallHealth: 88,
    lastSync: '10:24:12 IST',
    operationalDays: 13540,
    description: 'Indias second permanent Antarctic research station, commissioned in 1989. Features main shelter, fuel farm, lake water supply, and meteorology center.',
    population: 25
  },
  {
    id: 'bharati',
    name: 'BHARATI STATION',
    code: 'IND-BHARATI-02',
    status: 'WARNING',
    location: 'Larsemann Hills, East Antarctica',
    coordinates: {
      lat: -69.4072,
      lng: 76.1908,
      elevation: 35
    },
    temperature: -22.6,
    windSpeed: 34,
    humidity: 58,
    pressure: 981,
    fuelLevel: 61,
    powerLevel: 78,
    generationKw: 362,
    consumptionKw: 290,
    overallHealth: 74,
    lastSync: '10:24:08 IST',
    operationalDays: 5290,
    description: 'Indias modern third Antarctic station commissioned in 2012. Built with prefabricated shipping containers with automated thermal management and eco-friendly waste management.',
    population: 30
  }
];

export const INITIAL_ASSETS: Asset[] = [
  {
    id: 'gen-01',
    name: 'Generator #01 (Primary Diesel)',
    code: 'EQ-GEN-101',
    category: 'Generators',
    stationId: 'maitri',
    stationName: 'MAITRI STATION',
    status: 'NORMAL',
    healthScore: 92,
    temperature: 58,
    load: 54,
    location: 'Power House Bldg A',
    lastMaintenance: '2026-08-10',
    nextMaintenanceDays: 60,
    serialNumber: 'CAT-C15-9982-MTR',
    specs: {
      Capacity: '500 kW',
      FuelType: 'Aviation Turbine Fuel (JET-A1)',
      RPM: 1500,
      Efficiency: '94.2%'
    },
    description: 'Main heavy-duty power unit providing baseline electricity to primary habitat and scientific labs.'
  },
  {
    id: 'gen-02',
    name: 'Generator #02 (Secondary Heavy Power)',
    code: 'EQ-GEN-102',
    category: 'Generators',
    stationId: 'maitri',
    stationName: 'MAITRI STATION',
    status: 'WARNING',
    healthScore: 64,
    temperature: 76,
    load: 82,
    location: 'Power House Bldg B',
    lastMaintenance: '2026-06-15',
    nextMaintenanceDays: 14,
    serialNumber: 'CAT-C15-8841-MTR',
    specs: {
      Capacity: '400 kW',
      CoolantTemp: '76°C (Target <68°C)',
      VibrationLevel: '4.2 mm/s (Elevated)',
      FuelConsumption: '68 L/h'
    },
    description: 'Secondary generator exhibiting thermal elevated stress under peak heating loads.'
  },
  {
    id: 'solar-alpha',
    name: 'Solar Microgrid Array Alpha',
    code: 'EQ-SLR-201',
    category: 'Power',
    stationId: 'bharati',
    stationName: 'BHARATI STATION',
    status: 'NORMAL',
    healthScore: 88,
    load: 45,
    location: 'North Ridge Array',
    lastMaintenance: '2026-07-20',
    nextMaintenanceDays: 90,
    serialNumber: 'PV-ICE-800-BHT',
    specs: {
      PeakOutput: '150 kW',
      PanelCount: 320,
      StorageCap: '400 kWh LiFePO4'
    },
    description: 'Bifacial solar array optimized for low-angle polar sunlight and high albedo snow reflection.'
  },
  {
    id: 'fuel-depot-a',
    name: 'Bulk Fuel Farm Alpha',
    code: 'ST-FUL-001',
    category: 'Storage',
    stationId: 'bharati',
    stationName: 'BHARATI STATION',
    status: 'WARNING',
    healthScore: 68,
    location: 'Helipad Fuel Depot',
    lastMaintenance: '2026-05-12',
    nextMaintenanceDays: 30,
    serialNumber: 'FL-TK-12000-BHT',
    specs: {
      TotalCapacity: '40,000 Liters',
      CurrentVolume: '24,400 Liters',
      FreezePoint: '-58°C'
    },
    description: 'Double-walled insulated polar fuel storage tank supplying station generators and aircraft.'
  },
  {
    id: 'comm-sat-01',
    name: 'Ku-Band Satellite Earth Station',
    code: 'EQ-COM-301',
    category: 'Communication',
    stationId: 'maitri',
    stationName: 'MAITRI STATION',
    status: 'NORMAL',
    healthScore: 98,
    location: 'Radome Array Top',
    lastMaintenance: '2026-08-01',
    nextMaintenanceDays: 120,
    serialNumber: 'SAT-ISRO-ANT-04',
    specs: {
      UplinkFreq: '14.25 GHz',
      Bandwidth: '100 Mbps Dedicated',
      RadomeHeater: 'Active (2.4 kW)'
    },
    description: 'ISRO-linked high-bandwidth satellite dish establishing telemetry link to Hyderabad ground centre.'
  },
  {
    id: 'veh-pb-01',
    name: 'PistenBully 300 Polar Crawler',
    code: 'VH-CAT-401',
    category: 'Vehicles',
    stationId: 'bharati',
    stationName: 'BHARATI STATION',
    status: 'NORMAL',
    healthScore: 85,
    location: 'Vehicle Hangar 1',
    lastMaintenance: '2026-08-14',
    nextMaintenanceDays: 45,
    serialNumber: 'PB-300-ICE-09',
    specs: {
      EnginePower: '330 HP',
      TrackWidth: '1.4 m Extra Wide',
      WinchCapacity: '4.5 Tons'
    },
    description: 'Heavy tracked snow vehicle used for cargo transfer between supply ships and station.'
  },
  {
    id: 'hvac-life-01',
    name: 'Life Support & Thermal Exchange Unit',
    code: 'EQ-HT-501',
    category: 'Heating',
    stationId: 'maitri',
    stationName: 'MAITRI STATION',
    status: 'NORMAL',
    healthScore: 94,
    location: 'Central Habitation Module',
    lastMaintenance: '2026-07-30',
    nextMaintenanceDays: 75,
    serialNumber: 'HVAC-POLAR-770',
    specs: {
      HeatRecoveryEfficiency: '89%',
      IndoorAirTemp: '+21.5°C',
      AirExchangeRate: '450 m³/h'
    },
    description: 'Dual-redundant waste heat recovery and ventilation unit maintaining interior living temperatures.'
  },
  {
    id: 'sci-lidar-01',
    name: 'Atmospheric Aerosol Lidar System',
    code: 'EQ-SCI-601',
    category: 'Scientific',
    stationId: 'bharati',
    stationName: 'BHARATI STATION',
    status: 'NORMAL',
    healthScore: 96,
    location: 'Physics Lab Observatory Dome',
    lastMaintenance: '2026-08-22',
    nextMaintenanceDays: 100,
    serialNumber: 'LIDAR-POLAR-02',
    specs: {
      LaserWavelength: '532 nm / 1064 nm',
      PulseEnergy: '120 mJ',
      Range: '45 km Altitude'
    },
    description: 'Precision laser sounding system measuring polar stratospheric clouds and aerosol profiles.'
  }
];

export const INITIAL_ALERTS: Alert[] = [
  {
    id: 'alt-01',
    severity: 'CRITICAL',
    stationId: 'bharati',
    stationName: 'BHARATI STATION',
    message: 'Bharati: Fuel shortage predicted in 11 days based on current consumption trend.',
    timestamp: '10:14:02 IST',
    status: 'ACTIVE',
    category: 'LOGISTICS_FUEL',
    assetId: 'fuel-depot-a'
  },
  {
    id: 'alt-02',
    severity: 'WARNING',
    stationId: 'maitri',
    stationName: 'MAITRI STATION',
    message: 'Maitri: Generator #02 coolant temp reached 76°C (Requires maintenance within 14 days).',
    timestamp: '09:48:30 IST',
    status: 'ACTIVE',
    category: 'ENGINEERING_POWER',
    assetId: 'gen-02'
  },
  {
    id: 'alt-03',
    severity: 'ADVISORY',
    stationId: 'bharati',
    stationName: 'BHARATI STATION',
    message: 'Bharati: High wind warning (34 km/h gusting to 65 km/h) over Larsemann Hills.',
    timestamp: '08:30:00 IST',
    status: 'ACTIVE',
    category: 'ENVIRONMENT_WEATHER'
  },
  {
    id: 'alt-04',
    severity: 'INFO',
    stationId: 'maitri',
    stationName: 'MAITRI STATION',
    message: 'Maitri: High-speed satellite telemetry link sync verified (100 Mbps OK).',
    timestamp: '07:15:10 IST',
    status: 'RESOLVED',
    category: 'COMMUNICATION'
  }
];

export const MOCK_USERS: User[] = [
  {
    id: 'usr-admin',
    name: 'Commander Rajesh Sharma',
    email: 'admin@polartwin.demo',
    role: 'SUPER_ADMIN',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120',
    status: 'ACTIVE',
    lastLogin: '2026-09-11 10:24 IST'
  },
  {
    id: 'usr-operator',
    name: 'Dr. Priya Venkatesh',
    email: 'operator@polartwin.demo',
    role: 'STATION_OPERATOR',
    stationId: 'maitri',
    stationName: 'MAITRI STATION',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120',
    status: 'ACTIVE',
    lastLogin: '2026-09-11 09:50 IST'
  },
  {
    id: 'usr-engineer',
    name: 'Vikramaditya Roy',
    email: 'engineer@polartwin.demo',
    role: 'ENGINEER',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=120',
    status: 'ACTIVE',
    lastLogin: '2026-09-11 10:05 IST'
  }
];

export const INITIAL_ENERGY_METRICS: EnergyMetrics = {
  totalGenerationKw: 812,
  totalConsumptionKw: 610,
  batteryReservePercent: 84,
  renewableFractionPercent: 28,
  mainGridStatus: 'STABLE & SYNCHRONIZED',
  stationComparison: [
    { stationId: 'maitri', stationName: 'Maitri Station', generation: 450, consumption: 320, efficiency: 91 },
    { stationId: 'bharati', stationName: 'Bharati Station', generation: 362, consumption: 290, efficiency: 86 }
  ],
  hourlyHistory: [
    { time: '00:00', generation: 750, consumption: 580, solar: 0, diesel: 750 },
    { time: '04:00', generation: 760, consumption: 590, solar: 20, diesel: 740 },
    { time: '08:00', generation: 820, consumption: 640, solar: 120, diesel: 700 },
    { time: '12:00', generation: 880, consumption: 680, solar: 210, diesel: 670 },
    { time: '16:00', generation: 840, consumption: 630, solar: 140, diesel: 700 },
    { time: '20:00', generation: 780, consumption: 600, solar: 30, diesel: 750 }
  ]
};

export const INITIAL_LOGISTICS_ITEMS: LogisticsItem[] = [
  { id: 'log-1', name: 'JET-A1 Aviation Fuel', category: 'Fuel', stationId: 'maitri', stationName: 'Maitri', currentStock: 14850, unit: 'Liters', minThreshold: 5000, daysRemaining: 42, status: 'NORMAL' },
  { id: 'log-2', name: 'Polar Diesel (AFT-02)', category: 'Fuel', stationId: 'bharati', stationName: 'Bharati', currentStock: 10000, unit: 'Liters', minThreshold: 8000, daysRemaining: 11, status: 'WARNING' },
  { id: 'log-3', name: 'Freeze-Dried Rations', category: 'Food', stationId: 'maitri', stationName: 'Maitri', currentStock: 1400, unit: 'Kg', minThreshold: 300, daysRemaining: 120, status: 'NORMAL' },
  { id: 'log-4', name: 'Fresh Water Reserve (Priestley Lake)', category: 'Food', stationId: 'maitri', stationName: 'Maitri', currentStock: 85000, unit: 'Liters', minThreshold: 20000, daysRemaining: 180, status: 'NORMAL' },
  { id: 'log-5', name: 'Emergency Surgical Supplies', category: 'Medical', stationId: 'bharati', stationName: 'Bharati', currentStock: 45, unit: 'Kits', minThreshold: 10, daysRemaining: 90, status: 'NORMAL' },
  { id: 'log-6', name: 'Cat C15 Air Filters & Belts', category: 'Spare Parts', stationId: 'maitri', stationName: 'Maitri', currentStock: 4, unit: 'Sets', minThreshold: 6, daysRemaining: 14, status: 'WARNING' }
];

export const INITIAL_SHIPMENTS: Shipment[] = [
  {
    id: 'ship-1',
    vesselName: 'MV Vasily Golovnin (NCPOR Charter)',
    cargo: '200,000 L Fuel, 2 Generator Replacement Motors, Fresh Rations',
    destinationStation: 'Bharati & Maitri',
    eta: '2026-11-20 (Expedition 45)',
    status: 'IN_TRANSIT',
    progressPercent: 42
  }
];

export const INITIAL_ENVIRONMENT: EnvironmentMetrics = {
  avgTemp: -24.3,
  avgWind: 31,
  avgHumidity: 64,
  avgPressure: 985,
  snowAccumulationCm: 14.2,
  uvIndex: 2,
  visibilityKm: 8.5,
  riskScore: 0.54,
  riskTrend: 'STABLE',
  weatherAlert: 'Katabatic wind advisory active across Schirmacher plateau',
  forecast: [
    { day: 'Today', tempHigh: -21, tempLow: -28, wind: 31, condition: 'Blizzard Advisory' },
    { day: 'Sat', tempHigh: -23, tempLow: -30, wind: 24, condition: 'Partly Cloudy' },
    { day: 'Sun', tempHigh: -25, tempLow: -32, wind: 18, condition: 'Clear Polar Sky' },
    { day: 'Mon', tempHigh: -22, tempLow: -29, wind: 38, condition: 'High Winds' },
    { day: 'Tue', tempHigh: -20, tempLow: -27, wind: 45, condition: 'Severe Storm' }
  ]
};

export const SIMULATION_SCENARIOS: SimulationScenario[] = [
  {
    id: 'sim-gen-fail',
    name: 'Generator #02 Complete Failure',
    description: 'Simulate immediate shutdown of Maitri secondary generator under -27°C ambient temperature.',
    defaultStationId: 'maitri',
    severity: 'CRITICAL',
    parameters: [
      { label: 'Ambient Temperature (°C)', key: 'temp', min: -50, max: -10, default: -27, unit: '°C' },
      { label: 'Duration of Outage', key: 'duration', min: 1, max: 72, default: 24, unit: 'hours' },
      { label: 'Habitation Heating Load', key: 'load', min: 40, max: 100, default: 85, unit: '%' }
    ]
  },
  {
    id: 'sim-fuel-depletion',
    name: 'Supply Ship Delay / Fuel Depletion',
    description: 'Simulate a 30-day expedition supply delay during peak winter polar night.',
    defaultStationId: 'bharati',
    severity: 'WARNING',
    parameters: [
      { label: 'Delay Duration', key: 'delay', min: 7, max: 60, default: 30, unit: 'days' },
      { label: 'Power Reduction Conservation Target', key: 'conservation', min: 0, max: 40, default: 15, unit: '%' }
    ]
  },
  {
    id: 'sim-extreme-blizzard',
    name: 'Category 5 Katabatic Blizzard',
    description: 'Simulate sustained 120 km/h wind gusts, zero visibility, and solar panel snow burial.',
    defaultStationId: 'bharati',
    severity: 'CRITICAL',
    parameters: [
      { label: 'Peak Gust Speed', key: 'wind', min: 80, max: 160, default: 120, unit: 'km/h' },
      { label: 'Blizzard Duration', key: 'duration', min: 6, max: 48, default: 36, unit: 'hours' }
    ]
  }
];

export const INITIAL_REPORTS: SystemReport[] = [
  {
    id: 'rep-1',
    title: 'Maitri Station Winterization Operational Report',
    category: 'Daily Operations',
    generatedAt: '2026-09-10 18:00 IST',
    author: 'Commander Rajesh Sharma',
    stationName: 'Maitri Station',
    summary: 'All primary thermal loops maintained +21.5°C interior. Generator #02 elevated vibration logged for engineering review.',
    fileSize: '2.4 MB'
  },
  {
    id: 'rep-2',
    title: 'Bharati Fuel Reserves & Microgrid Efficiency Audit',
    category: 'Energy Audit',
    generatedAt: '2026-09-08 12:30 IST',
    author: 'Vikramaditya Roy (Lead Engineer)',
    stationName: 'Bharati Station',
    summary: 'Solar microgrid generated 28% total load. Fuel reserves at 61% require winter rationing if vessel arrival shifts past Nov 20.',
    fileSize: '4.1 MB'
  }
];
