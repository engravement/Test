import { OverlayMode, TileType } from '../types/city';
import { TILE_DEFS } from '../data/tileDefinitions';
export function CityGrid({grid,onPaint,selected,overlay,zoom,setZoom,showGrid}:{grid:any[][];onPaint:(x:number,y:number)=>void;selected:TileType|'erase';overlay:OverlayMode;zoom:number;setZoom:(v:number)=>void;showGrid:boolean;}){
 return <div className='flex-1 overflow-auto'><div className='mb-2 text-xs text-cyan-300'>오버레이: {overlay} | 선택: {selected}</div><div style={{transform:`scale(${zoom})`,transformOrigin:'top left'}} className='inline-block'>
 {grid.map((row,y)=><div key={y} className='flex'>{row.map((t,x)=>{const d=TILE_DEFS[t.type as TileType]; return <button title={`${d.name} (${x},${y})`} key={x} onMouseDown={()=>onPaint(x,y)} className={`w-5 h-5 text-[10px] ${showGrid?'border border-slate-800':''}`} style={{background:d.color,color:'#fff'}}>{d.icon}</button>;})}</div>)}
 </div><div className='mt-2 flex gap-2'><button onClick={()=>setZoom(Math.max(.5,zoom-.1))}>축소</button><button onClick={()=>setZoom(Math.min(2,zoom+.1))}>확대</button></div></div>
}
