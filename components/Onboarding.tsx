import React, { useState, useEffect } from 'react';
import { ArrowRight, Clock, Shield, Users, Calendar, CheckCircle2, Siren, ChevronRight, Wallet, Activity } from 'lucide-react';
import { differenceInMinutes, differenceInHours } from 'date-fns';

interface OnboardingProps {
  onComplete: (quitDate: Date) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [showSecondText, setShowSecondText] = useState(false);
  const [quitDate, setQuitDate] = useState<Date | null>(null);

  // Initial animation timing
  useEffect(() => {
    if (step === 0) {
      const timer = setTimeout(() => setShowSecondText(true), 1500); // 1.5s delay for second line
      return () => clearTimeout(timer);
    }
  }, [step]);

  const handleDateSelection = (type: 'now' | 'picker' | 'prep') => {
    let date = new Date();
    if (type === 'picker') {
      // Simulating a date in the past for demo purposes
      // In a real app, this would open a native date picker
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      date = yesterday;
    }
    setQuitDate(date);
    setStep(3); // Go to Feedback screen
  };

  const nextStep = () => setStep(prev => prev + 1);

  // --- RENDERING STEPS ---

  // 1. Intro Part 1
  if (step === 0) {
    return (
      <div className="h-screen bg-slate-900 text-white flex flex-col justify-center items-center p-8 text-center transition-all duration-1000" onClick={nextStep}>
        <div className="animate-fade-in">
          <p className="text-2xl font-light tracking-wide text-slate-200">Você não está aqui por acaso.</p>
        </div>
        {showSecondText && (
          <div className="mt-6 animate-slide-up">
            <p className="text-sm text-slate-500 uppercase tracking-widest mb-8 animate-pulse">Toque para continuar</p>
          </div>
        )}
      </div>
    );
  }

  // 2. Intro Part 2
  if (step === 1) {
    return (
      <div className="h-screen bg-slate-900 text-white flex flex-col justify-center items-center p-8 text-center">
        <div className="animate-slide-up space-y-6">
          <h1 className="text-4xl font-bold leading-tight">
            A vontade passa.<br />
            <span className="text-emerald-400">A decisão fica.</span>
          </h1>
          <button 
            onClick={nextStep}
            className="mt-12 px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full font-bold text-lg shadow-lg shadow-emerald-500/20 transition-all active:scale-95 flex items-center gap-2 mx-auto"
          >
            Começar <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // 3. Date Selection (Control)
  if (step === 2) {
    return (
      <div className="h-screen bg-slate-50 text-slate-900 flex flex-col justify-center p-6 animate-in fade-in duration-500">
        <h2 className="text-3xl font-bold mb-2 text-slate-800">Vamos oficializar.</h2>
        <p className="text-slate-500 mb-10 text-lg">Quando foi o último cigarro?</p>
        
        <div className="space-y-4">
          <button 
            onClick={() => handleDateSelection('now')}
            className="w-full p-6 text-left bg-white border-2 border-emerald-100 hover:border-emerald-500 rounded-3xl transition-all group shadow-sm hover:shadow-md"
          >
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold text-slate-800">Agora</span>
              <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                 <CheckCircle2 size={20} />
              </div>
            </div>
            <p className="text-slate-400 text-sm mt-2">Acabei de apagar. Este é o meu momento.</p>
          </button>

          <button 
            onClick={() => handleDateSelection('picker')}
            className="w-full p-6 text-left bg-white border-2 border-slate-100 hover:border-emerald-500 rounded-3xl transition-all group shadow-sm hover:shadow-md"
          >
            <div className="flex justify-between items-center">
              <span className="text-xl font-semibold text-slate-800">Escolher data</span>
              <Calendar className="text-slate-400 group-hover:text-emerald-500 transition-colors" />
            </div>
            <p className="text-slate-400 text-sm mt-2">Já estou limpo há algum tempo.</p>
          </button>

          <button 
            onClick={() => handleDateSelection('prep')}
            className="w-full p-4 text-center text-slate-500 font-medium text-sm hover:text-slate-700 mt-4"
          >
            Ainda não parei, quero me preparar
          </button>
        </div>
      </div>
    );
  }

  // 4. Immediate Feedback (The "WOW" Moment)
  if (step === 3) {
    const mins = quitDate ? Math.max(1, differenceInMinutes(new Date(), quitDate)) : 0;
    
    return (
      <div className="h-screen bg-emerald-600 text-white flex flex-col justify-between p-6 animate-fade-in">
        <div className="mt-12 space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/50 border border-emerald-400/30 text-xs font-bold uppercase tracking-wider mb-4 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-white"></span>
            Tempo Real
          </div>
          <h2 className="text-5xl font-bold tracking-tight">{mins} <span className="text-2xl font-normal opacity-80">minutos</span></h2>
          <p className="text-xl text-emerald-100 font-medium">Sem fumar. O monóxido de carbono já começou a baixar.</p>
        </div>

        <div className="space-y-4">
            {/* Benefits Preview */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 flex items-center gap-4 animate-slide-up" style={{animationDelay: '0.1s'}}>
                <div className="w-10 h-10 rounded-full bg-white text-emerald-600 flex items-center justify-center">
                    <Wallet size={20} />
                </div>
                <div>
                    <p className="text-xs text-emerald-100 uppercase font-bold">Economia iniciada</p>
                    <p className="font-semibold text-white">R$ 0,50 salvos agora</p>
                </div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 flex items-center gap-4 animate-slide-up" style={{animationDelay: '0.2s'}}>
                <div className="w-10 h-10 rounded-full bg-white text-emerald-600 flex items-center justify-center">
                    <Activity size={20} />
                </div>
                <div>
                    <p className="text-xs text-emerald-100 uppercase font-bold">Corpo</p>
                    <p className="font-semibold text-white">Pulso voltando ao normal</p>
                </div>
            </div>
        </div>

        <button 
          onClick={nextStep}
          className="w-full py-4 bg-white text-emerald-700 rounded-2xl font-bold text-lg shadow-xl hover:bg-emerald-50 transition-transform active:scale-95 flex items-center justify-center gap-2 mt-8"
        >
          Continuar <ChevronRight size={20} />
        </button>
      </div>
    );
  }

  // 5. Panic Button Intro
  if (step === 4) {
    return (
      <div className="h-screen bg-slate-50 flex flex-col justify-center items-center p-8 text-center">
        <div className="mb-8 relative">
          <div className="absolute inset-0 bg-rose-500 rounded-full animate-ping opacity-20 duration-1000"></div>
          <div className="w-24 h-24 bg-gradient-to-br from-rose-400 to-rose-600 rounded-full flex items-center justify-center shadow-xl shadow-rose-500/40 animate-pulse-slow">
            <Siren size={40} className="text-white" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-slate-800 mb-4 animate-slide-up">Seu "Plano B"</h2>
        <p className="text-lg text-slate-600 leading-relaxed mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          Quando a vontade vier,<br/>
          <strong className="text-rose-600">você não precisa ser forte.</strong><br/>
          Você só precisa tocar aqui.
        </p>

        <button onClick={nextStep} className="text-slate-400 text-sm font-bold uppercase tracking-widest hover:text-slate-600">
          Entendi
        </button>
      </div>
    );
  }

  // 6. Community Intro
  if (step === 5) {
    return (
      <div className="h-screen bg-indigo-50 flex flex-col justify-center p-8">
        <h2 className="text-3xl font-bold text-indigo-900 mb-2 animate-slide-up">Você não está sozinho.</h2>
        <p className="text-indigo-600/80 text-lg mb-10">Conecte-se com quem te entende.</p>
        
        <div className="space-y-4 mb-12">
          {/* Mock Bubbles */}
          <div className="bg-white p-5 rounded-2xl rounded-tl-none shadow-sm border border-indigo-100 animate-slide-up w-[90%]" style={{ animationDelay: '0.1s' }}>
            <p className="text-slate-600 italic">"Passei pela crise de agora há pouco. Obrigado pelo apoio gente!"</p>
            <div className="flex items-center gap-2 mt-3">
                <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-[10px] text-indigo-600 font-bold">M</div>
                <p className="text-xs text-slate-400">há 2 min</p>
            </div>
          </div>
          
          <div className="bg-indigo-600 p-5 rounded-2xl rounded-tr-none shadow-xl shadow-indigo-500/20 ml-auto w-[90%] animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <p className="text-white font-medium">"Continue firme! O 3º dia é sempre o divisor de águas."</p>
            <p className="text-xs text-indigo-200 mt-3 text-right">Você (se quiser ser anônimo)</p>
          </div>
        </div>

        <button 
          onClick={nextStep}
          className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-indigo-500/20 active:scale-95 transition-transform"
        >
          Próximo
        </button>
      </div>
    );
  }

  // 7. Commitment (Final)
  if (step === 6) {
    return (
      <div className="h-screen bg-slate-900 text-white flex flex-col justify-center items-center p-8 text-center animate-fade-in">
        <Shield size={80} className="text-emerald-400 mb-8 animate-pulse-slow" strokeWidth={1} />
        
        <h1 className="text-4xl font-bold mb-6">Não é para sempre.</h1>
        <p className="text-2xl text-slate-300 mb-12 font-light">É só hoje.</p>

        <button 
          onClick={() => quitDate && onComplete(quitDate)}
          className="w-full py-4 bg-white hover:bg-slate-100 text-slate-900 rounded-2xl font-bold text-lg shadow-2xl transition-transform active:scale-95"
        >
          Começar
        </button>
      </div>
    );
  }

  return null;
};

export default Onboarding;