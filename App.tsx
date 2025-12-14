import React, { useState } from 'react';
import { ViewState, UserSettings, Post } from './types';
import Dashboard from './components/Dashboard';
import CommunityFeed from './components/CommunityFeed';
import BadgeGrid from './components/BadgeGrid';
import PanicModal from './components/PanicModal';
import MentorChat from './components/MentorChat';
import Onboarding from './components/Onboarding';
import { Home, Users, Award, Siren, Bot } from 'lucide-react';
import { differenceInHours, differenceInDays } from 'date-fns';

// Initial Mock Data Structure (Actual data set via Onboarding)
const DEFAULT_SETTINGS: UserSettings = {
  quitDate: new Date(),
  cigarettesPerDay: 15,
  pricePerPack: 20,
  currency: 'BRL',
  userName: 'Eu'
};

const MOCK_POSTS: Post[] = [
  {
    id: '1',
    author: 'Maria S.',
    content: 'Hoje completei 7 dias! A manhã foi difícil sem o café tradicional, mas usei a técnica da água gelada e passou. Orgulhosa!',
    timeAgo: '2h atrás',
    comments: 5,
    type: 'celebration',
    isAnonymous: false,
    reactions: { force: 24, fire: 5, handshake: 10 },
    userReaction: 'force'
  },
  {
    id: '2',
    author: 'Usuário 482',
    content: 'Estou sentindo muita ansiedade agora à tarde. Alguém mais teve isso no 3º dia?',
    timeAgo: '5min atrás',
    comments: 12,
    type: 'support',
    isAnonymous: true,
    reactions: { force: 8, fire: 0, handshake: 3 }
  },
  {
    id: '3',
    author: 'Novo Fôlego Bot',
    content: 'Dica do dia: Se a vontade vier forte, lembre-se dos 5 D\'s: Delay (Espere), Distract (Distraia), Drink water (Beba água), Deep breaths (Respire), Discuss (Converse).',
    timeAgo: '1h atrás',
    comments: 0,
    type: 'tip',
    isAnonymous: false,
    reactions: { force: 56, fire: 20, handshake: 0 }
  }
];

const App: React.FC = () => {
  // State
  const [isOnboardingComplete, setIsOnboardingComplete] = useState(false);
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.DASHBOARD);
  const [settings, setSettings] = useState<UserSettings>(DEFAULT_SETTINGS);
  const [isPanicOpen, setIsPanicOpen] = useState(false);
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  
  const handleOnboardingComplete = (date: Date) => {
    setSettings(prev => ({ ...prev, quitDate: date }));
    setIsOnboardingComplete(true);
  };

  // Derived state for props
  const daysFree = differenceInDays(new Date(), settings.quitDate);
  const hoursFree = differenceInHours(new Date(), settings.quitDate);

  const handleAddPost = (newPost: Omit<Post, 'id' | 'timeAgo' | 'comments' | 'reactions' | 'userReaction'>) => {
    const post: Post = {
      ...newPost,
      id: Date.now().toString(),
      timeAgo: 'Agora',
      comments: 0,
      reactions: { force: 0, fire: 0, handshake: 0 }
    };
    setPosts([post, ...posts]);
  };

  const handlePanicPost = () => {
    handleAddPost({
      author: `Usuário ${Math.floor(Math.random() * 999)}`,
      content: 'Estou com muita vontade agora. Preciso de apoio para não recair.',
      type: 'support',
      isAnonymous: true
    });
    setCurrentView(ViewState.COMMUNITY);
  };

  const handleShareBadge = (badge: any) => {
    handleAddPost({
      author: settings.userName,
      content: `Acabei de desbloquear a conquista "${badge.title}"! ${badge.description} 🏆`,
      type: 'celebration',
      isAnonymous: false
    });
    setCurrentView(ViewState.COMMUNITY);
  };

  const handleReact = (postId: string, reaction: 'force' | 'fire' | 'handshake') => {
    setPosts(posts.map(post => {
      if (post.id !== postId) return post;
      
      const isRemoving = post.userReaction === reaction;
      const newReactions = { ...post.reactions };
      
      if (post.userReaction) {
        newReactions[post.userReaction]--;
      }
      
      if (!isRemoving) {
        newReactions[reaction]++;
      }

      return {
        ...post,
        reactions: newReactions,
        userReaction: isRemoving ? undefined : reaction
      };
    }));
  };

  // Render Onboarding if not complete
  if (!isOnboardingComplete) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  // Navigation Item Component
  const NavItem = ({ view, icon: Icon, label }: { view: ViewState, icon: any, label: string }) => (
    <button 
      onClick={() => setCurrentView(view)}
      className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-all duration-300 ${
        currentView === view ? 'text-emerald-600 scale-105' : 'text-slate-400 hover:text-slate-600'
      }`}
    >
      <Icon size={24} strokeWidth={currentView === view ? 2.5 : 2} />
      <span className={`text-[10px] font-bold tracking-wide ${currentView === view ? 'opacity-100' : 'opacity-70'}`}>{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50 mx-auto max-w-lg shadow-2xl overflow-hidden relative font-sans animate-fade-in text-slate-800">
      
      {/* Dynamic Content */}
      <main className="h-screen overflow-y-auto no-scrollbar">
        {currentView === ViewState.DASHBOARD && <Dashboard settings={settings} onNavigate={setCurrentView} />}
        {currentView === ViewState.COMMUNITY && (
          <CommunityFeed 
            posts={posts} 
            onAddPost={handleAddPost} 
            onReact={handleReact}
          />
        )}
        {currentView === ViewState.ACHIEVEMENTS && (
          <BadgeGrid 
            hoursSinceQuit={hoursFree} 
            onShareBadge={handleShareBadge}
          />
        )}
        {currentView === ViewState.MENTOR && <MentorChat />}
      </main>

      {/* FLOATING PANIC BUTTON (PROTAGONIST) */}
      <div className="fixed bottom-24 right-5 z-40 flex flex-col items-end gap-2 pointer-events-none">
        {/* Tooltip */}
        <div className="bg-slate-800 text-white text-xs font-bold py-2 px-4 rounded-xl rounded-br-none shadow-xl animate-bounce mr-2 opacity-90 backdrop-blur-sm">
          Vontade agora?
        </div>
        
        <button 
          onClick={() => setIsPanicOpen(true)}
          className="pointer-events-auto shadow-2xl shadow-rose-500/40 bg-gradient-to-br from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white rounded-full p-4 flex items-center justify-center transition-all hover:scale-110 active:scale-95 animate-pulse-slow border-4 border-white/30"
          aria-label="Botão de Pânico"
        >
          <Siren size={30} fill="currentColor" className="text-white" />
        </button>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-slate-100 h-20 px-2 pb-4 z-30 max-w-lg mx-auto">
        <div className="flex justify-around items-center h-full">
          <NavItem view={ViewState.DASHBOARD} icon={Home} label="Início" />
          <NavItem view={ViewState.ACHIEVEMENTS} icon={Award} label="Conquistas" />
          <div className="w-12"></div> {/* Spacer for Panic Button */}
          <NavItem view={ViewState.COMMUNITY} icon={Users} label="Tribo" />
          <NavItem view={ViewState.MENTOR} icon={Bot} label="Mentor" />
        </div>
      </nav>

      {/* Panic Modal Layer */}
      <PanicModal 
        isOpen={isPanicOpen} 
        onClose={() => setIsPanicOpen(false)} 
        daysFree={daysFree}
        onPostHelp={handlePanicPost}
      />

    </div>
  );
};

export default App;