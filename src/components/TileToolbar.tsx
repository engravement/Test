import { TILE_DEFS } from '../data/tileDefinitions';
import { TileType } from '../types/city';
export function TileToolbar({selected,onSelect}:{selected:TileType|'erase';onSelect:(t:TileType|'erase')=>void;}){return <div className='space-y-2'>{Object.values(TILE_DEFS).map(t=><button key={t.type} className={`w-full text-left p-2 rounded ${selected===t.type?'bg-cyan-500/30':''}`} onClick={()=>onSelect(t.type)}>{t.icon} {t.name} ₩{t.buildCost}</button>)}<button className={`w-full p-2 ${selected==='erase'?'bg-pink-500/30':''}`} onClick={()=>onSelect('erase')}>🧹 철거</button></div>}
