import { CityEvent } from '../types/city';
export const EVENTS: CityEvent[] = [
{id:'heat',name:'폭염 발생',description:'냉방 수요 급증으로 전력 부담이 커졌습니다.',choices:[{label:'긴급 전력 지원',effects:{money:-12000,happiness:4}},{label:'절전 캠페인',effects:{happiness:-3,pollution:-5,traffic:-2}}]},
{id:'recession',name:'경기 침체',description:'소비가 줄어 세수 감소가 우려됩니다.',choices:[{label:'기업 지원금',effects:{money:-15000,happiness:3},multiplier:{taxIncome:0.9}},{label:'복지 확대',effects:{money:-10000,happiness:6}}]},
{id:'factory-fire',name:'공장 화재',description:'산업 지구 화재로 시민 불안이 커졌습니다.',choices:[{label:'안전 점검 강화',effects:{money:-8000,pollution:-8,happiness:5}},{label:'민간에 맡긴다',effects:{happiness:-7,crime:4}}]},
{id:'subsidy',name:'대중교통 보조금',description:'지하철 확충 제안이 올라왔습니다.',choices:[{label:'보조금 승인',effects:{money:-9000,traffic:-10,happiness:5}},{label:'보류',effects:{happiness:-4,traffic:4}}]},
{id:'boom',name:'인구 유입 붐',description:'첨단 기업 유치로 이주민이 급증합니다.',choices:[{label:'주택 공급 확대',effects:{money:-7000,population:350,happiness:3}},{label:'속도 조절',effects:{population:120,happiness:-2}}]},
{id:'protest',name:'오염 시위',description:'시민들이 산업 지대의 오염 문제에 항의하고 있습니다.',choices:[{label:'공장 규제 강화',effects:{pollution:-15,happiness:8}},{label:'보상금 지급',effects:{money:-10000,happiness:5}},{label:'무시한다',effects:{happiness:-12,crime:5}}]},
{id:'powerwarn',name:'전력 부족 경고',description:'전력 수요가 생산량을 초과하고 있습니다.',choices:[{label:'발전소 증설 예산',effects:{money:-14000,happiness:2}},{label:'요금 인상',effects:{money:8000,happiness:-8}}]},
{id:'crime',name:'범죄 조직 확산',description:'치안 공백 지역에서 범죄가 늘고 있습니다.',choices:[{label:'특별 단속',effects:{money:-9000,crime:-12,happiness:4}},{label:'감시 체계 고도화',effects:{money:-6000,crime:-6,education:2}}]},
{id:'tech',name:'신기술 투자 제안',description:'스마트시티 AI 인프라 투자 제안이 도착했습니다.',choices:[{label:'투자 진행',effects:{money:-20000,education:8,traffic:-5,happiness:5}},{label:'거절',effects:{happiness:-2}}]},
{id:'typhoon',name:'태풍 피해',description:'강풍으로 일부 시설이 손상되었습니다.',choices:[{label:'긴급 복구',effects:{money:-13000,happiness:6,health:3}},{label:'부분 복구',effects:{money:-5000,happiness:-5,health:-4,pollution:5}}]},
];
