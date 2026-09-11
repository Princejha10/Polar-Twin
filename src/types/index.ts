export type UserRole = 'SUPER_ADMIN' | 'STATION_OPERATOR' | 'ENGINEER';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  stationId?: string;
  stationName?: string;
  avatar?: string;
  status: 'ACTIVE' | 'DISABLED';
  lastLogin: string;
}

export type StatusLevel = 'NORMAL' | 'WARNING' | 'CRITICAL';

export interface StationCoordinates {
  lat: number;
  lng: number;
  elevation: number;
}

export interface Station {
  id: string;
  name: string;
  code: string;
  status: StatusLevel;
  location: string;
  coordinates: StationCoordinates;
  temperature: number; // °C
  windSpeed: number; // km/h
  humidity: number; // %
  pressure: number; // hPa
  fuelLevel: number; // %
  powerLevel: number; // %
  generationKw: number;
  consumptionKw: number;
  overallHealth: number; // %
  lastSync: string;
  operationalDays: number;
  description: string;
  population: number;
}

export type AssetCategory = 
  | 'Generators'
  | 'Vehicles'
  | 'Communication'
  | 'Power'
  | 'Heating'
  | 'Scientific'
  | 'Storage'
  | 'Infrastructure';

export interface Asset {
  id: string;
  name: string;
  code: string;
  category: AssetCategory;
  stationId: string;
  stationName: string;
  status: StatusLevel;
  healthScore: number; // 0 - 100
  temperature?: number; // °C if applicable
  load?: number; // % if applicable
  location: string;
  lastMaintenance: string;
  nextMaintenanceDays: number;
  serialNumber: string;
  specs: Record<string, string | number>;
  description: string;
}

export type AlertSeverity = 'CRITICAL' | 'WARNING' | 'ADVISORY' | 'INFO';
export type AlertStatus = 'ACTIVE' | 'ACKNOWLEDGED' | 'RESOLVED';

export interface Alert {
  id: string;
  severity: AlertSeverity;
  stationId: string;
  stationName: string;
  message: string;
  timestamp: string;
  status: AlertStatus;
  category: string;
  assetId?: string;
}

export interface EnergyMetrics {
  totalGenerationKw: number;
  totalConsumptionKw: number;
  batteryReservePercent: number;
  renewableFractionPercent: number;
  mainGridStatus: string;
  stationComparison: {
    stationId: string;
    stationName: string;
    generation: number;
    consumption: number;
    efficiency: number;
  }[];
  hourlyHistory: {
    time: string;
    generation: number;
    consumption: number;
    solar: number;
    diesel: number;
  }[];
}

export interface LogisticsItem {
  id: string;
  name: string;
  category: 'Fuel' | 'Food' | 'Medical' | 'Spare Parts' | 'Scientific Supplies';
  stationId: string;
  stationName: string;
  currentStock: number;
  unit: string;
  minThreshold: number;
  daysRemaining: number;
  status: StatusLevel;
}

export interface Shipment {
  id: string;
  vesselName: string;
  cargo: string;
  destinationStation: string;
  eta: string;
  status: 'IN_TRANSIT' | 'SCHEDULED' | 'DELIVERED';
  progressPercent: number;
}

export interface EnvironmentMetrics {
  avgTemp: number;
  avgWind: number;
  avgHumidity: number;
  avgPressure: number;
  snowAccumulationCm: number;
  uvIndex: number;
  visibilityKm: number;
  riskScore: number; // 0.00 to 1.00
  riskTrend: 'STABLE' | 'RISING' | 'DECREASING';
  weatherAlert: string;
  forecast: {
    day: string;
    tempHigh: number;
    tempLow: number;
    wind: number;
    condition: string;
  }[];
}

export interface SimulationScenario {
  id: string;
  name: string;
  description: string;
  defaultStationId: string;
  severity: AlertSeverity;
  parameters: {
    label: string;
    key: string;
    min: number;
    max: number;
    default: number;
    unit: string;
  }[];
}

export interface SimulationResult {
  scenarioId: string;
  stationName: string;
  powerImpactPercent: number;
  fuelImpactPercent: number;
  riskLevelScore: number;
  affectedAssetsCount: number;
  recoveryHours: number;
  statusForecast: StatusLevel;
  recommendedActions: string[];
  timelineData: {
    hour: number;
    powerAvailable: number;
    fuelLevel: number;
    riskScore: number;
  }[];
}

export interface SystemReport {
  id: string;
  title: string;
  category: 'Daily Operations' | 'Energy Audit' | 'Asset Health' | 'Environmental Risk' | 'Logistics Status';
  generatedAt: string;
  author: string;
  stationName: string;
  summary: string;
  fileSize: string;
}
