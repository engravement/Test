import { SaveData } from '../types/city';
const KEY='neon-city-save-v1';
export const saveCity=(data:SaveData)=>localStorage.setItem(KEY,JSON.stringify(data));
export const loadCity=():SaveData|null=>{try{const r=localStorage.getItem(KEY); if(!r) return null; const p=JSON.parse(r); if(!p?.grid||!p?.stats) return null; return p;}catch{return null;}};
export const resetCity=()=>localStorage.removeItem(KEY);
