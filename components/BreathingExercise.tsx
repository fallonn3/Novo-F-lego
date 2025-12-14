import React, { useState, useEffect } from 'react';

interface BreathingExerciseProps {
  onComplete: () => void;
}

const BreathingExercise: React.FC<BreathingExerciseProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'Inhale' | 'Segure' | 'Expire'>('Inhale');
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes
  const [instruction, setInstruction] = useState("Inspire profundamente...");

  useEffect(() => {
    // Timer logic
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Breathing cycle logic (4-4-4 seconds box breathing simulation)
    const cycle = setInterval(() => {
      setPhase((prev) => {
        if (prev === 'Inhale') {
            setInstruction("Segure o ar...");
            return 'Segure';
        }
        if (prev === 'Segure') {
            setInstruction("Solte o ar devagar...");
            return 'Expire';
        }
        setInstruction("Inspire profundamente...");
        return 'Inhale';
      });
    }, 4000);

    return () => {
      clearInterval(timer);
      clearInterval(cycle);
    };
  }, [onComplete]);

  return (
    <div className="flex flex-col items-center justify-center h-full space-y-8 animate-fade-in">
      <div className="relative flex items-center justify-center w-64 h-64">
        {/* Animated Circles */}
        <div className={`absolute w-full h-full bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 ${phase === 'Inhale' ? 'animate-breathe' : 'scale-100 transition-all duration-[4000ms]'}`}></div>
        <div className={`absolute w-48 h-48 bg-teal-300 rounded-full mix-blend-multiply filter blur-lg opacity-70 ${phase === 'Inhale' ? 'animate-breathe' : 'scale-100 transition-all duration-[4000ms]'}`}></div>
        
        {/* Text Center */}
        <div className="z-10 text-center">
            <h2 className="text-2xl font-bold text-teal-900 transition-all duration-500">{phase === 'Inhale' ? 'Inspire' : phase === 'Segure' ? 'Segure' : 'Expire'}</h2>
        </div>
      </div>

      <div className="text-center space-y-2">
        <p className="text-lg font-medium text-slate-700">{instruction}</p>
        <p className="text-sm text-slate-500">Tempo restante: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</p>
      </div>
    </div>
  );
};

export default BreathingExercise;