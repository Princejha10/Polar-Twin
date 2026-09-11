import { Station, Asset, Alert, EnergyMetrics, LogisticsItem, Shipment, EnvironmentMetrics, SimulationScenario, SimulationResult, SystemReport } from '../types';
import { INITIAL_STATIONS, INITIAL_ASSETS, INITIAL_ALERTS, INITIAL_ENERGY_METRICS, INITIAL_LOGISTICS_ITEMS, INITIAL_SHIPMENTS, INITIAL_ENVIRONMENT, SIMULATION_SCENARIOS, INITIAL_REPORTS } from '../data/mockData';

// Persistent reactive state store in memory
let stations: Station[] = [...INITIAL_STATIONS];
let assets: Asset[] = [...INITIAL_ASSETS];
let alerts: Alert[] = [...INITIAL_ALERTS];
let energy: EnergyMetrics = { ...INITIAL_ENERGY_METRICS };
let logistics: LogisticsItem[] = [...INITIAL_LOGISTICS_ITEMS];
let shipments: Shipment[] = [...INITIAL_SHIPMENTS];
let environment: EnvironmentMetrics = { ...INITIAL_ENVIRONMENT };
let reports: SystemReport[] = [...INITIAL_REPORTS];

export const stationService = {
  getStations: (): Station[] => [...stations],
  getStationById: (id: string): Station | undefined => stations.find((s) => s.id === id),
  updateStation: (id: string, updates: Partial<Station>): Station => {
    stations = stations.map((s) => (s.id === id ? { ...s, ...updates } : s));
    return stations.find((s) => s.id === id)!;
  },
  addStation: (newStation: Omit<Station, 'id'>): Station => {
    const created: Station = {
      ...newStation,
      id: `station-${Date.now()}`
    };
    stations.push(created);
    return created;
  }
};

export const assetService = {
  getAssets: (): Asset[] => [...assets],
  getAssetById: (id: string): Asset | undefined => assets.find((a) => a.id === id),
  getAssetsByStation: (stationId: string): Asset[] => assets.filter((a) => a.stationId === stationId),
  updateAsset: (id: string, updates: Partial<Asset>): Asset => {
    assets = assets.map((a) => (a.id === id ? { ...a, ...updates } : a));
    return assets.find((a) => a.id === id)!;
  }
};

export const alertService = {
  getAlerts: (): Alert[] => [...alerts],
  getAlertsByStation: (stationId: string): Alert[] => alerts.filter((a) => a.stationId === stationId),
  resolveAlert: (id: string): Alert => {
    alerts = alerts.map((a) => (a.id === id ? { ...a, status: 'RESOLVED' as const } : a));
    return alerts.find((a) => a.id === id)!;
  },
  acknowledgeAlert: (id: string): Alert => {
    alerts = alerts.map((a) => (a.id === id ? { ...a, status: 'ACKNOWLEDGED' as const } : a));
    return alerts.find((a) => a.id === id)!;
  }
};

export const energyService = {
  getEnergyMetrics: (): EnergyMetrics => ({ ...energy })
};

export const logisticsService = {
  getLogisticsItems: (): LogisticsItem[] => [...logistics],
  getShipments: (): Shipment[] => [...shipments]
};

export const environmentService = {
  getEnvironmentMetrics: (): EnvironmentMetrics => ({ ...environment })
};

export const simulationService = {
  getScenarios: (): SimulationScenario[] => [...SIMULATION_SCENARIOS],
  runSimulation: (scenarioId: string, stationId: string, params: Record<string, number>): SimulationResult => {
    const station = stationService.getStationById(stationId) || stations[0];
    const scenario = SIMULATION_SCENARIOS.find((s) => s.id === scenarioId) || SIMULATION_SCENARIOS[0];

    // Calculate deterministic realistic impact metrics based on inputs
    let powerImpact = 15;
    let fuelImpact = 25;
    let riskLevelScore = 0.65;
    let affectedAssetsCount = 2;
    let recoveryHours = 18;
    let statusForecast: 'NORMAL' | 'WARNING' | 'CRITICAL' = 'WARNING';
    let recommendedActions: string[] = [];

    if (scenarioId === 'sim-gen-fail') {
      const temp = params.temp ?? -27;
      const duration = params.duration ?? 24;
      powerImpact = Math.min(65, Math.round(35 + (duration / 72) * 30));
      fuelImpact = Math.round(15 + (duration / 72) * 20);
      riskLevelScore = temp < -35 ? 0.88 : 0.72;
      affectedAssetsCount = 4;
      recoveryHours = duration + 6;
      statusForecast = riskLevelScore > 0.8 ? 'CRITICAL' : 'WARNING';
      recommendedActions = [
        'Engage Auxiliary Solar Microgrid and LiFePO4 battery bank immediately.',
        'Load shed non-critical polar physics experiments to preserve 60 kW for habitation thermal loop.',
        'Dispatch engineering team equipped with thermal suits to Power Shed B.',
        'Alert NCPOR Control Hub in Goa regarding active emergency protocol.'
      ];
    } else if (scenarioId === 'sim-fuel-depletion') {
      const delay = params.delay ?? 30;
      const conservation = params.conservation ?? 15;
      fuelImpact = Math.min(95, Math.round((delay / 60) * 85));
      powerImpact = conservation;
      riskLevelScore = delay > 35 ? 0.85 : 0.60;
      affectedAssetsCount = 5;
      recoveryHours = delay * 24;
      statusForecast = delay > 35 ? 'CRITICAL' : 'WARNING';
      recommendedActions = [
        'Enforce 15% station-wide power rationing protocol.',
        'Reroute residual heat from primary diesel generator into fuel pre-heaters.',
        'Notify South African air support charter for emergency drop of 5,000 L JET-A1 drum containers.'
      ];
    } else {
      // Extreme blizzard
      const wind = params.wind ?? 120;
      powerImpact = wind > 110 ? 40 : 20;
      fuelImpact = 30;
      riskLevelScore = 0.92;
      affectedAssetsCount = 6;
      recoveryHours = 36;
      statusForecast = 'CRITICAL';
      recommendedActions = [
        'Lockdown station outdoor access hatches and institute buddy rope line policy.',
        'Pre-heat emergency radio transceivers and satellite dome heating mats.',
        'Switch life support to closed-circuit recycled air cycle.'
      ];
    }

    // Generate timeline forecast graph data
    const timelineData = Array.from({ length: 8 }, (_, i) => {
      const hour = i * 3;
      return {
        hour,
        powerAvailable: Math.max(20, Math.round(100 - (powerImpact * (i + 1)) / 8)),
        fuelLevel: Math.max(10, Math.round(station.fuelLevel - (fuelImpact * (i + 1)) / 8)),
        riskScore: Number(Math.min(0.98, riskLevelScore * (0.6 + (i * 0.4) / 7)).toFixed(2))
      };
    });

    return {
      scenarioId,
      stationName: station.name,
      powerImpactPercent: powerImpact,
      fuelImpactPercent: fuelImpact,
      riskLevelScore,
      affectedAssetsCount,
      recoveryHours,
      statusForecast,
      recommendedActions,
      timelineData
    };
  }
};

export const reportService = {
  getReports: (): SystemReport[] => [...reports],
  createReport: (title: string, category: SystemReport['category'], stationName: string, summary: string, author: string): SystemReport => {
    const created: SystemReport = {
      id: `rep-${Date.now()}`,
      title,
      category,
      generatedAt: new Date().toLocaleString(),
      author,
      stationName,
      summary,
      fileSize: `${(Math.random() * 3 + 1).toFixed(1)} MB`
    };
    reports.unshift(created);
    return created;
  }
};
