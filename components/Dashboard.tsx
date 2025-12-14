import React from 'react';
import { UserSettings, ViewState } from '../types';
import { TrendingUp, Wallet, Activity, ArrowRight, Lock, ChevronRight, Heart, Wind, CheckCircle2 } from 'lucide-react';
import { differenceInHours, differenceInDays } from 'date-fns';

interface DashboardProps {
  settings: UserSettings;
  onNavigate: (view: ViewState) => void;
}

// Data for calculation 
const BADGE_MILESTONES = [
  { title: 'Primeiro Passo', hours: 24 },
  { title: 'Resistência', hours: 72 }, // 3 days
  { title: 'Controle', hours: 168 }, // 7 days
  { title: 'Virada', hours: 336 }, // 14 days
  { title: 'Nova Fase', hours: 720 }, // 30 days
  { title: 'Liberdade', hours: 2160 }, // 90 days
];

const HEALTH_TIMELINE = [
  { hours: 1, text: "Pressão arterial normalizada", state: 'done' },
  { hours: 8, text: "Nível de oxigênio recuperado", state: 'done' },
  { hours: 24, text: "Risco de ataque cardíaco reduzido", state: 'current' },
  { hours: 48, text: "Olfato e paladar melhorando", state: 'next' },
  { hours: 72, text: "Nicotina eliminada do corpo", state: 'next' },
];

const Dashboard: React.FC<DashboardProps> = ({ settings, onNavigate }) => {
  const now = new Date();
  const hoursSinceQuit = differenceInHours(now, settings.quitDate);
  const daysSinceQuit = differenceInDays(now, settings.quitDate);
  
  // Calculations
  const cigarettesNotSmoked = Math.floor((hoursSinceQuit / 24) * settings.cigarettesPerDay);
  const moneySaved = (cigarettesNotSmoked / 20) * settings.pricePerPack;
  
  // Find Next Badge
  const nextBadge = BADGE_MILESTONES.find(b => b.hours > hoursSinceQuit) || BADGE_MILESTONES[BADGE_MILESTONES.length - 1];
  const prevBadgeHours = BADGE_MILESTONES.find(b => b.hours <= hoursSinceQuit)?.hours || 0;
  
  // Calculate specific progress to next badge
  const totalHoursNeeded = nextBadge.hours - prevBadgeHours;
  const hoursDoneInLevel = hoursSinceQuit - prevBadgeHours;
  const progressPercent = Math.min((hoursDoneInLevel / totalHoursNeeded) * 100, 100);
  
  // Remaining time text
  const hoursRemaining = nextBadge.hours - hoursSinceQuit;
  const daysRemaining = Math.ceil(hoursRemaining / 24);
  const timeRemainingText = hoursRemaining < 24 ? `${hoursRemaining}h` : `${daysRemaining} dias`;

  // Determine health stage for display
  const currentHealthStage = HEALTH_TIMELINE.find(h => hoursSinceQuit < h.hours) || HEALTH_TIMELINE[HEALTH_TIMELINE.length-1];

  return (
    <div className="p-6 pb-28 space-y-8 animate-fade-in max-w-lg mx-auto font-sans">
      
      {/* HEADER: Dynamic Identity */}
      <header className="pt-2">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight leading-tight">Hoje você escolheu continuar.</h1>
        <div className="flex items-center gap-2 mt-2">
            <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Dia {daysSinceQuit + 1}</span>
            <span className="text-slate-400 text-sm font-medium">Cada hora conta.</span>
        </div>
      </header>

      {/* HERO CARD: The "Protagonist" */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-emerald-600 to-emerald-700 text-white p-8 shadow-2xl shadow-emerald-200/60 transition-transform active:scale-[0.99] duration-300">
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl -mr-16 -mt-16 animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-emerald-400 opacity-10 rounded-full blur-2xl -ml-10 -mb-10"></div>
        
        <div className="relative z-10 flex flex-col h-full justify-between min-h-[200px]">
          <div>
            <div className="flex items-center gap-2 mb-2 opacity-90">
              <div className="w-2 h-2 bg-emerald-300 rounded-full animate-pulse"></div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-100">Livre de fumaça</span>
            </div>
            <div className="flex items-baseline gap-3">
              <span className="text-7xl font-bold tracking-tighter">{daysSinceQuit}</span>
              <div className="flex flex-col">
                  <span className="text-2xl font-medium text-emerald-100 opacity-90 leading-none">dias</span>
                  <span className="text-sm font-medium text-emerald-200 opacity-70 leading-none mt-1">{hoursSinceQuit % 24}h</span>
              </div>
            </div>
          </div>

          {/* Integrated Next Badge Progress (Embedded) */}
          <div 
            onClick={() => onNavigate(ViewState.ACHIEVEMENTS)}
            className="mt-8 pt-6 border-t border-white/10 cursor-pointer group"
          >
            <div className="flex justify-between items-end mb-3">
              <div>
                <span className="text-xs text-emerald-200 font-medium mb-1 block">Próxima conquista</span>
                <div className="flex items-center gap-2 text-white font-bold text-lg leading-none group-hover:text-emerald-100 transition-colors">
                    {nextBadge.title} <ChevronRight size={16} className="opacity-50"/>
                </div>
              </div>
              <span className="text-xs font-bold text-emerald-100 bg-emerald-800/40 px-3 py-1.5 rounded-full backdrop-blur-md">
                Faltam {timeRemainingText}
              </span>
            </div>
            <div className="h-2.5 bg-black/20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-emerald-300 rounded-full shadow-[0_0_15px_rgba(110,231,183,0.6)] transition-all duration-1000 ease-out" 
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* COMMUNITY PULSE: "Alive" */}
      <div 
        onClick={() => onNavigate(ViewState.COMMUNITY)}
        className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between cursor-pointer hover:shadow-md transition-all group hover:bg-slate-50/50"
      >
        <div className="flex items-center gap-4">
          <div className="flex -space-x-3">
             <div className="w-11 h-11 rounded-full border-2 border-white bg-indigo-100 flex items-center justify-center text-xs font-bold text-indigo-600">M</div>
             <div className="w-11 h-11 rounded-full border-2 border-white bg-teal-100 flex items-center justify-center text-xs font-bold text-teal-600">L</div>
             <div className="w-11 h-11 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-xs text-slate-500 font-bold">+3</div>
          </div>
          <div>
             <p className="text-sm font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">Tribo Online</p>
             <p className="text-xs text-slate-500 font-medium">2 pessoas em crise agora • 3 venceram</p>
          </div>
        </div>
        <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
            <ArrowRight size={18} />
        </div>
      </div>

      {/* DAILY CHALLENGE */}
      <div className="bg-orange-50 p-6 rounded-[2rem] border border-orange-100/50 relative overflow-hidden cursor-pointer hover:bg-orange-100/60 transition-colors group">
         <div className="absolute -right-6 -top-6 text-orange-200 opacity-20 rotate-12 group-hover:scale-110 transition-transform duration-500">
            <Activity size={120} />
         </div>
         <div className="relative z-10 flex justify-between items-center">
            <div>
               <span className="text-orange-600 text-[10px] font-bold uppercase tracking-widest mb-1 block">Meta do Dia</span>
               <h3 className="text-lg font-bold text-slate-800 leading-tight">Caminhada de 15 min</h3>
               <p className="text-sm text-slate-500 mt-1 max-w-[80%]">Ajuda a liberar endorfina e reduz a ansiedade.</p>
            </div>
            <button className="px-5 py-2.5 bg-orange-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-orange-500/20 group-hover:bg-orange-600 transition-colors">
               Aceitar
            </button>
         </div>
      </div>

      {/* HEALTH RECOVERY TIMELINE */}
      <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-sky-50 flex items-center justify-center text-sky-500">
                <Heart size={20} />
            </div>
            <div>
                <h3 className="font-bold text-slate-800">Recuperação Física</h3>
                <p className="text-xs text-slate-400">Seu corpo se curando</p>
            </div>
        </div>
        
        <div className="space-y-6 pl-2">
            {HEALTH_TIMELINE.slice(0, 3).map((item, index) => {
                 const isDone = hoursSinceQuit >= item.hours;
                 const isNext = !isDone && (index === 0 || hoursSinceQuit >= HEALTH_TIMELINE[index-1].hours);
                 
                 return (
                    <div key={index} className="flex gap-4 relative">
                        {/* Timeline Line */}
                        {index !== 2 && (
                            <div className={`absolute left-[9px] top-6 w-0.5 h-10 ${isDone ? 'bg-emerald-200' : 'bg-slate-100'}`}></div>
                        )}
                        
                        <div className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center z-10 
                            ${isDone ? 'bg-emerald-500 text-white' : isNext ? 'bg-sky-500 ring-4 ring-sky-100' : 'bg-slate-200'}`}>
                            {isDone && <CheckCircle2 size={12} />}
                            {isNext && <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>}
                        </div>
                        
                        <div className={`${isDone ? 'opacity-50' : isNext ? 'opacity-100' : 'opacity-40'}`}>
                            <p className="text-sm font-bold text-slate-800 leading-none">{item.text}</p>
                            <p className="text-xs text-slate-500 mt-1">{item.hours < 24 ? `${item.hours} horas` : `${item.hours/24} dias`}</p>
                        </div>
                    </div>
                 );
            })}
        </div>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col justify-between min-h-[140px]">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2">
                <Wallet size={24} />
            </div>
            <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Economia</p>
                <p className="text-2xl font-bold text-slate-800 tracking-tight">R$ {moneySaved.toFixed(0)}</p>
            </div>
        </div>

        <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col justify-between min-h-[140px]">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center mb-2">
                <Wind size={24} />
            </div>
            <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Não fumados</p>
                <p className="text-2xl font-bold text-slate-800 tracking-tight">{cigarettesNotSmoked}</p>
            </div>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;