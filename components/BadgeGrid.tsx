import React from 'react';
import { Badge } from '../types';
import { Medal, Shield, Zap, Crown, Star, Trophy, Lock, Share2 } from 'lucide-react';

interface BadgeGridProps {
  hoursSinceQuit: number;
  onShareBadge: (badge: Badge) => void;
}

const BADGES_DATA: Badge[] = [
  { id: '1', title: 'Primeiro Passo', description: '24h sem fumar. O monóxido de carbono saiu.', hoursRequired: 24, iconName: 'medal', color: 'text-amber-500' },
  { id: '2', title: 'Resistência', description: '3 dias. Nicotina eliminada do corpo.', hoursRequired: 72, iconName: 'shield', color: 'text-emerald-500' },
  { id: '3', title: 'Controle', description: '7 dias. Olfato e paladar voltando.', hoursRequired: 168, iconName: 'zap', color: 'text-sky-500' },
  { id: '4', title: 'Virada', description: '14 dias. Circulação sanguínea melhorou.', hoursRequired: 336, iconName: 'star', color: 'text-indigo-500' },
  { id: '5', title: 'Nova Fase', description: '30 dias. Capacidade pulmonar aumentou.', hoursRequired: 720, iconName: 'trophy', color: 'text-purple-500' },
  { id: '6', title: 'Liberdade', description: '90 dias. Risco cardíaco reduziu drasticamente.', hoursRequired: 2160, iconName: 'crown', color: 'text-rose-500' },
];

const IconMap = {
  medal: Medal,
  shield: Shield,
  zap: Zap,
  crown: Crown,
  star: Star,
  trophy: Trophy
};

const BadgeGrid: React.FC<BadgeGridProps> = ({ hoursSinceQuit, onShareBadge }) => {
  return (
    <div className="pb-24 p-5 max-w-lg mx-auto">
      <div className="mb-8 pt-4">
        <h2 className="text-3xl font-bold text-slate-900">Conquistas</h2>
        <p className="text-slate-500 text-lg">Seu corpo agradece a cada marco.</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {BADGES_DATA.map((badge) => {
          const isUnlocked = hoursSinceQuit >= badge.hoursRequired;
          const IconComponent = IconMap[badge.iconName];
          const progress = Math.min(100, (hoursSinceQuit / badge.hoursRequired) * 100);
          
          return (
            <div 
              key={badge.id}
              className={`relative p-5 rounded-[2rem] flex flex-col items-center text-center transition-all duration-500 ${
                isUnlocked 
                  ? 'bg-white border-2 border-slate-50 shadow-lg shadow-slate-100 scale-100' 
                  : 'bg-slate-50 border border-slate-100 opacity-70 scale-95 grayscale-[0.8]'
              }`}
            >
              {/* Lock Icon */}
              {!isUnlocked && (
                <div className="absolute top-4 right-4 text-slate-300">
                  <Lock size={16} />
                </div>
              )}
              
              {/* Hexagon/Circle Background for Icon */}
              <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-4 shadow-sm transition-transform duration-500 ${
                  isUnlocked ? 'bg-gradient-to-br from-slate-50 to-slate-100 rotate-0' : 'bg-slate-200 rotate-12'
              }`}>
                <IconComponent 
                  size={32} 
                  className={`transition-all duration-500 ${isUnlocked ? badge.color : 'text-slate-400'}`}
                  fill={isUnlocked && ['star', 'medal', 'crown'].includes(badge.iconName) ? 'currentColor' : 'none'}
                />
              </div>

              <h3 className={`font-bold text-sm mb-2 ${isUnlocked ? 'text-slate-800' : 'text-slate-500'}`}>
                  {badge.title}
              </h3>
              
              <p className="text-xs text-slate-500 leading-relaxed mb-4 min-h-[3em]">
                  {badge.description}
              </p>
              
              {!isUnlocked ? (
                 <div className="mt-auto w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div 
                        className="bg-slate-400 h-full rounded-full" 
                        style={{ width: `${progress}%`}}
                    ></div>
                 </div>
              ) : (
                <button 
                  onClick={() => onShareBadge(badge)}
                  className="mt-auto flex items-center gap-2 px-4 py-2 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-xl text-xs font-bold transition-colors w-full justify-center group"
                >
                  <Share2 size={14} className="group-hover:scale-110 transition-transform"/> 
                  Compartilhar
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BadgeGrid;