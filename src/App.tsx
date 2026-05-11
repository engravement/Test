import { useState } from 'react';
import { TileToolbar } from './components/TileToolbar';
import { CityGrid } from './components/CityGrid';
import { useSimulation } from './hooks/useSimulation';
import { TILE_DEFS } from './data/tileDefinitions';
import { loadCity, resetCity, saveCity } from './hooks/useCityStorage';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { TileType } from './types/city';

export default function App(){
 const sim=useSimulation(); const [selected,setSelected]=useState<TileType|'erase'>('road'); const [showGrid,setShowGrid]=useState(true); const [zoom,setZoom]=useState(1);
 const paint=(x:number,y:number)=>{ const cur=sim.grid[y][x].type; if(sim.stats.money<0) return; if((cur==='water'||cur==='mountain')&&selected!=='erase') return; const next=selected==='erase'?'empty':selected; const cost=TILE_DEFS[next as TileType]?.buildCost ?? 80; if(selected!=='erase' && sim.stats.money<cost) return; sim.setGrid(g=>g.map((r,yy)=>r.map((c,xx)=>yy===y&&xx===x?{type:next}:c))); if(selected!=='erase') sim.setStats(s=>({...s,money:s.money-cost})); };
 const applyChoice=(i:number)=>{ if(!sim.event)return; const c=sim.event.choices[i]; sim.setStats(s=>({...s,money:s.money+(c.effects.money??0),happiness:Math.max(0,Math.min(100,s.happiness+(c.effects.happiness??0))),pollution:Math.max(0,s.pollution+(c.effects.pollution??0)),population:Math.max(100,s.population+(c.effects.population??0)),crime:Math.max(0,s.crime+(c.effects.crime??0)),education:Math.max(0,s.education+(c.effects.education??0)),health:Math.max(0,s.health+(c.effects.health??0)),traffic:Math.max(0,s.traffic+(c.effects.traffic??0))})); sim.setEventLog(l=>[`${sim.stats.date} ${sim.event?.name}: ${c.label}`,...l].slice(0,30)); sim.setEvent(null);};
 return <div className='min-h-screen bg-slate-950 text-slate-100 p-3'>
 <div className='glass flex justify-between p-3 mb-3'><h1 className='text-2xl font-bold text-cyan-300'>네온 시티 시뮬레이터</h1><div>{sim.stats.date} | 예산 ₩{Math.round(sim.stats.money).toLocaleString()} | 인구 {sim.stats.population.toLocaleString()} | 행복도 {sim.stats.happiness.toFixed(1)}</div><div className='space-x-1'>{([0,1,3,10] as const).map(v=><button key={v} onClick={()=>sim.setSpeed(v)} className='btn'>{v===0?'일시정지':`${v}x`}</button>)}</div></div>
 <div className='grid grid-cols-[260px_1fr_360px] gap-3'>
 <div className='glass p-2'><TileToolbar selected={selected} onSelect={setSelected}/><button onClick={()=>setShowGrid(!showGrid)} className='btn w-full mt-2'>격자 {showGrid?'끄기':'켜기'}</button></div>
 <div className='glass p-2'><CityGrid grid={sim.grid} onPaint={paint} selected={selected} overlay={sim.overlay} zoom={zoom} setZoom={setZoom} showGrid={showGrid}/></div>
 <div className='glass p-2 text-sm space-y-2'><div>도시 등급: <b>{sim.grade}</b></div><div>오염 {sim.stats.pollution.toFixed(1)} / 교통 {sim.stats.traffic.toFixed(1)} / 범죄 {sim.stats.crime.toFixed(1)}</div><div>전력 {sim.stats.powerProduction} / {sim.stats.powerDemand}</div><div>세금 {sim.stats.taxIncome.toLocaleString()} 유지비 {sim.stats.maintenance.toLocaleString()} 순수익 {sim.stats.netIncome.toLocaleString()}</div>
 <div className='h-40'><ResponsiveContainer><LineChart data={sim.history}><XAxis dataKey='date' hide/><YAxis/><Tooltip/><Line dataKey='population' stroke='#22d3ee' dot={false}/><Line dataKey='money' stroke='#a78bfa' dot={false}/></LineChart></ResponsiveContainer></div>
 <div className='h-40'><ResponsiveContainer><LineChart data={sim.history}><XAxis dataKey='date' hide/><YAxis/><Tooltip/><Line dataKey='happiness' stroke='#34d399' dot={false}/><Line dataKey='pollution' stroke='#fb7185' dot={false}/><Line dataKey='traffic' stroke='#f59e0b' dot={false}/></LineChart></ResponsiveContainer></div>
 <div className='grid grid-cols-3 gap-1'>{(['normal','traffic','pollution','happiness','power','services'] as const).map(o=><button key={o} className='btn' onClick={()=>sim.setOverlay(o)}>{o}</button>)}</div>
 <div className='grid grid-cols-2 gap-1'><button className='btn' onClick={()=>saveCity({grid:sim.grid,stats:sim.stats,history:sim.history,eventLog:sim.eventLog,daySinceEvent:sim.daysSinceEvent})}>저장</button><button className='btn' onClick={()=>{const d=loadCity(); if(d){sim.setGrid(d.grid);sim.setStats(d.stats);sim.setEventLog(d.eventLog);}}}>불러오기</button><button className='btn' onClick={()=>{const data=JSON.stringify({grid:sim.grid,stats:sim.stats}); navigator.clipboard.writeText(data);}}>JSON 내보내기</button><button className='btn' onClick={()=>{const raw=prompt('JSON 붙여넣기'); if(!raw) return; try{const d=JSON.parse(raw); if(d.grid&&d.stats){sim.setGrid(d.grid); sim.setStats(d.stats);} }catch{alert('잘못된 JSON');}}}>JSON 가져오기</button><button className='btn col-span-2' onClick={()=>{resetCity(); location.reload();}}>도시 초기화</button></div>
 </div></div>
 <div className='glass mt-3 p-2 h-28 overflow-auto text-xs'>{sim.eventLog.map((l,i)=><div key={i}>{l}</div>)}</div>
 {sim.event&&<div className='fixed inset-0 bg-black/60 flex items-center justify-center'><div className='glass p-4 w-[460px]'><h2 className='text-xl text-fuchsia-300'>{sim.event.name}</h2><p className='my-2'>{sim.event.description}</p><div className='space-y-2'>{sim.event.choices.map((c,i)=><button key={i} className='btn w-full text-left' onClick={()=>applyChoice(i)}>{c.label}</button>)}</div></div></div>}
 </div>;
}
