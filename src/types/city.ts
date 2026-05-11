export type TileType =
  | 'empty' | 'road' | 'residential' | 'commercial' | 'industrial' | 'park' | 'water' | 'mountain'
  | 'subway' | 'hospital' | 'school' | 'police' | 'power' | 'solar';

export type OverlayMode = 'normal' | 'traffic' | 'pollution' | 'happiness' | 'power' | 'services';
export type SimulationSpeed = 0 | 1 | 3 | 10;

export interface TileDefinition {
  type: TileType; name: string; icon: string; color: string; buildCost: number; maintenance: number;
  powerDemand?: number; powerSupply?: number; housing?: number; jobs?: number; pollution?: number;
}

export interface Tile { type: TileType; }
export type CityGrid = Tile[][];

export interface CityStats {
  date: string; day: number; population: number; money: number; happiness: number; pollution: number;
  traffic: number; powerProduction: number; powerDemand: number; housingCapacity: number; jobs: number;
  taxIncome: number; maintenance: number; netIncome: number; crime: number; education: number; health: number;
}
export interface HistoricalStats extends Omit<CityStats, 'day'> {}
export interface EventChoice { label: string; effects: Partial<Record<'money'|'happiness'|'pollution'|'population'|'crime'|'education'|'health'|'traffic', number>>; multiplier?: Partial<Record<'taxIncome', number>>; }
export interface CityEvent { id: string; name: string; description: string; choices: EventChoice[]; }

export interface SaveData { grid: CityGrid; stats: CityStats; history: HistoricalStats[]; eventLog: string[]; daySinceEvent: number; }
