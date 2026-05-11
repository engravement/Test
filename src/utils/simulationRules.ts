import { TILE_DEFS } from '../data/tileDefinitions';
import { CityGrid, CityStats } from '../types/city';

export const GRID_SIZE = 40;
export const makeGrid = (): CityGrid => Array.from({ length: GRID_SIZE }, () => Array.from({ length: GRID_SIZE }, () => ({ type: 'empty' as const })));
const inB=(x:number,y:number)=>x>=0&&y>=0&&x<GRID_SIZE&&y<GRID_SIZE;
const nearRoad=(g:CityGrid,x:number,y:number)=>[[1,0],[-1,0],[0,1],[0,-1]].some(([dx,dy])=>inB(x+dx,y+dy)&&g[y+dy][x+dx].type==='road');

export function computeStats(grid: CityGrid, prev: CityStats): CityStats {
  let housing=0,jobs=0,pDemand=0,pProd=0,maint=0,pollution=0,parks=0,subway=0,hosp=0,school=0,police=0,road=0,active=0;
  grid.forEach((row,y)=>row.forEach((t,x)=>{ const d=TILE_DEFS[t.type]; maint+=d.maintenance; pDemand+=d.powerDemand??0; pProd+=d.powerSupply??0; housing+=d.housing??0; jobs+=d.jobs??0; pollution+=d.pollution??0; if(t.type==='park')parks++; if(t.type==='subway')subway++; if(t.type==='hospital')hosp++; if(t.type==='school')school++; if(t.type==='police')police++; if(t.type==='road')road++; if(t.type!=='empty'&&t.type!=='water'&&t.type!=='mountain'&&nearRoad(grid,x,y))active++; }));
  pollution=Math.max(0,Math.min(100,pollution+active*0.04-parks*0.5));
  const traffic=Math.max(0,Math.min(100, (housing+jobs)/200 - road*0.7 - subway*1.8 + prev.population/3000));
  const powerRatio = pDemand===0?1:Math.min(1,pProd/pDemand);
  const service = Math.min(1,(hosp*220+school*180+police*200)/Math.max(1,prev.population));
  const crime=Math.max(0,Math.min(100, 45 - police*1.6 + pollution*0.18 - service*12));
  const education=Math.max(0,Math.min(100, prev.education + school*0.04 - 0.02));
  const health=Math.max(0,Math.min(100, prev.health + hosp*0.05 - pollution*0.01));
  const jobsRatio=jobs/Math.max(1,prev.population*0.65); const houseRatio=housing/Math.max(1,prev.population);
  const happiness=Math.max(0,Math.min(100, prev.happiness + parks*0.05 - pollution*0.03 - crime*0.02 - Math.max(0,1-jobsRatio)*1.2 - Math.max(0,1-houseRatio)*1 + (powerRatio<1?-1.5:0) + service*0.7));
  const growthBase=(happiness-45)*0.0025; const growth=Math.max(-0.01,Math.min(0.03,growthBase))*prev.population;
  const newPop=Math.max(100,Math.min(housing,Math.round(prev.population+growth)));
  const taxBase = newPop*11 + jobs*7;
  const taxIncome=Math.round(taxBase*(0.65+happiness/200)*(0.7+education/140)*(powerRatio<1?0.8:1));
  const net=taxIncome-maint;
  return {...prev,population:newPop,happiness,pollution,traffic,powerProduction:pProd,powerDemand:pDemand,housingCapacity:housing,jobs,taxIncome,maintenance:maint,netIncome:net,crime,education,health,money:prev.money+net};
}
