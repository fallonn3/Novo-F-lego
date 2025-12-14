import React, { useState } from 'react';
import { X, Wind, Gamepad2, Users, CheckCircle2 } from 'lucide-react';
import BreathingExercise from './BreathingExercise';

interface PanicModalProps {
  isOpen: boolean;
  onClose: () => void;
  daysFree: number;
  onPostHelp: () => void;
}

const PanicModal: React.FC<PanicModalProps> = ({ isOpen, onClose, daysFree, onPostHelp }) => {
  const [step, setStep] = useState<'menu' | 'breathe' | 'distract' | 'community' | 'success'>('menu');

  if (!isOpen) return null;

  const handleClose = () => {
    setStep('menu');
    onClose();
  };

  const handleCommunityHelp = () => {
    onPostHelp();
    handleClose();
  };

  const DistractionCard = () => (
    <div className="space-y-6 text-center">
      <div className="p-6 bg-indigo-50 rounded-2xl border border-indigo-100">
        <h3 className="text-xl font-bold text-indigo-900 mb-2">Desafio dos 5 Objetos</h3>
        <p className="text-indigo-700 mb-4">Olhe ao seu redor agora. Encontre e toque em 5 objetos azuis.</p>
        <div className="text-sm text-slate-500">Isso ajuda a tirar o foco da vontade imediata.</div>
      </div>
      <button 
        onClick={() => setStep('success')}
        className="w-full py-4 bg-indigo-600 text-white rounded-xl font-semibold shadow-lg hover:bg-indigo-700 transition-colors"
      >
        Completei o desafio
      </button>
    </div>
  );

  const SuccessCard = () => (
    <div className="flex flex-col items-center justify-center space-y-6 text-center py-10">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
        <CheckCircle2 size={48} className="text-green-600" />
      </div>
      <div>
        <h3 className="text-2xl font-bold text-slate-800">Você conseguiu!</h3>
        <p className="text-slate-600 mt-2">A vontade passou e você continua firme.</p>
        <p className="text-teal-600 font-bold mt-4 text-lg">{daysFree} dias de liberdade protegidos.</p>
      </div>
      
      {/* Smart Community Suggestion */}
      <div className="w-full">
         <button 
            onClick={handleCommunityHelp}
            className="w-full mb-3 py-3 bg-slate-100 text-slate-600 rounded-xl font-medium text-sm flex items-center justify-center gap-2 hover:bg-slate-200"
         >
            <Users size={16} />
            Contar vitória anonimamente
         </button>
         <button 
            onClick={handleClose}
            className="w-full py-3 bg-slate-900 text-white rounded-xl font-medium"
         >
            Voltar ao meu dia
         </button>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-800">
            {step === 'menu' && 'Estou com muita vontade'}
            {step === 'breathe' && 'Respire comigo'}
            {step === 'distract' && 'Mude o foco'}
            {step === 'success' && 'Vitória'}
          </h2>
          <button onClick={handleClose} className="p-2 hover:bg-slate-100 rounded-full text-slate-500">
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto">
          {step === 'menu' && (
            <div className="space-y-4">
              <p className="text-slate-600 mb-6 font-medium">
                Isso vai passar. Fique comigo por 2 minutos. O que vamos fazer agora?
              </p>
              
              <button 
                onClick={() => setStep('breathe')}
                className="w-full flex items-center p-4 bg-teal-50 hover:bg-teal-100 text-teal-900 rounded-2xl transition-all border border-teal-100"
              >
                <div className="p-3 bg-white rounded-full mr-4 shadow-sm text-teal-600">
                  <Wind size={24} />
                </div>
                <div className="text-left">
                  <span className="block font-bold">Respirar (2 min)</span>
                  <span className="text-sm opacity-80">Acalme seu sistema nervoso</span>
                </div>
              </button>

              <button 
                onClick={() => setStep('distract')}
                className="w-full flex items-center p-4 bg-indigo-50 hover:bg-indigo-100 text-indigo-900 rounded-2xl transition-all border border-indigo-100"
              >
                <div className="p-3 bg-white rounded-full mr-4 shadow-sm text-indigo-600">
                  <Gamepad2 size={24} />
                </div>
                <div className="text-left">
                  <span className="block font-bold">Desafio Rápido</span>
                  <span className="text-sm opacity-80">Ocupe sua mente agora</span>
                </div>
              </button>

              <div className="pt-4 border-t border-slate-100 mt-4">
                 <p className="text-xs text-center text-slate-400 uppercase tracking-wide font-bold mb-4">Apoio imediato</p>
                 <button 
                    onClick={handleCommunityHelp}
                    className="w-full py-3 border-2 border-slate-200 text-slate-600 font-semibold rounded-xl hover:bg-slate-50 flex items-center justify-center gap-2"
                 >
                    <Users size={20} />
                    "Alguém online agora?"
                 </button>
              </div>
            </div>
          )}

          {step === 'breathe' && (
            <div className="h-96">
                <BreathingExercise onComplete={() => setStep('success')} />
            </div>
          )}

          {step === 'distract' && <DistractionCard />}
          
          {step === 'success' && <SuccessCard />}
        </div>
      </div>
    </div>
  );
};

export default PanicModal;