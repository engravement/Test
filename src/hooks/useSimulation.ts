import { useEffect, useMemo, useState } from 'react';
import { EVENTS } from '../data/eventDefinitions';
import { HistoricalStats, OverlayMode, SimulationSpeed } from '../types/city';
import { computeStats, makeGrid } from '../utils/simulationRules';

export function useSimulation() {
 const [grid,setGrid]=useState(makeGrid); const [speed,setSpeed]=useState<SimulationSpeed>(1); const [overlay,setOverlay]=useState<OverlayMode>('normal');
 const [stats,setStats]=useState({date:'2120-01-01',day:0,population:1200,money:150000,happiness:62,pollution:18,traffic:20,powerProduction:0,powerDemand:0,housingCapacity:1400,jobs:900,taxIncome:0,maintenance:0,netIncome:0,crime:20,education:45,health:50});
 const [history,setHistory]=useState<HistoricalStats[]>([]); const [event,setEvent]=useState<typeof EVENTS[number]|null>(null); const [eventLog,setEventLog]=useState<string[]>([]); const [daysSinceEvent,setD]=useState(0);
 useEffect(()=>{ if(speed===0) return; const id=setInterval(()=>{ setStats(prev=>{ const n=computeStats(grid,{...prev,day:prev.day+1,date:new Date(new Date('2120-01-01').getTime()+(prev.day+1)*86400000).toISOString().slice(0,10)}); setHistory(h=>[...h.slice(-149),{...n}]); setD(d=>d+1); return n;}); },1000/Math.max(1,speed)); return ()=>clearInterval(id);},[speed,grid]);
 useEffect(()=>{ if(daysSinceEvent>90 && !event){ const e=EVENTS[Math.floor(Math.random()*EVENTS.length)]; setEvent(e); setD(0);} },[daysSinceEvent,event]);
 const grade=useMemo(()=>{ const s=(stats.happiness+stats.health+stats.education)-(stats.pollution+stats.traffic+stats.crime); return s>120?'S':s>90?'A':s>60?'B':s>30?'C':s>0?'D':'F';},[stats]);
 return {grid,setGrid,speed,setSpeed,overlay,setOverlay,stats,setStats,history,event,setEvent,eventLog,setEventLog,grade,daysSinceEvent,setD};
}
