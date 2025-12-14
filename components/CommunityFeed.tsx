import React, { useState } from 'react';
import { MessageCircle, MoreHorizontal, Award, Shield, Flame, HeartHandshake, User, Ghost } from 'lucide-react';
import { Post } from '../types';

interface CommunityFeedProps {
  posts: Post[];
  onAddPost: (post: Omit<Post, 'id' | 'timeAgo' | 'comments' | 'reactions' | 'userReaction'>) => void;
  onReact: (postId: string, reaction: 'force' | 'fire' | 'handshake') => void;
}

const QUICK_REPLIES = ["Força! 💪", "Você não está sozinho", "Um dia de cada vez", "Respira fundo"];

const CommunityFeed: React.FC<CommunityFeedProps> = ({ posts, onAddPost, onReact }) => {
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');

  const handleSubmit = () => {
    if (!newPostContent.trim()) return;
    
    onAddPost({
      author: isAnonymous ? `Usuário ${Math.floor(Math.random() * 999)}` : 'Eu',
      content: newPostContent,
      type: 'support',
      isAnonymous
    });
    setNewPostContent('');
  };

  return (
    <div className="pb-24">
      <div className="sticky top-0 z-10 bg-slate-50/95 backdrop-blur-sm p-4 border-b border-slate-200">
        <h2 className="text-xl font-bold text-slate-800">Comunidade</h2>
        <div className="flex justify-between items-center mt-2">
          <p className="text-xs text-slate-500">Estamos juntos nessa</p>
          
          {/* Identity Toggle */}
          <button 
            onClick={() => setIsAnonymous(!isAnonymous)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
              isAnonymous 
                ? 'bg-slate-800 text-white' 
                : 'bg-white border border-slate-200 text-slate-600'
            }`}
          >
            {isAnonymous ? <Ghost size={14} /> : <User size={14} />}
            {isAnonymous ? 'Modo Anônimo' : 'Modo Público'}
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Quick Input */}
        <div className={`p-4 rounded-2xl shadow-sm border transition-colors ${isAnonymous ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
            <div className="flex gap-3 mb-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0 ${
                isAnonymous ? 'bg-slate-700 text-slate-300' : 'bg-teal-100 text-teal-700'
              }`}>
                {isAnonymous ? <Ghost size={20}/> : 'Eu'}
              </div>
              <textarea 
                  value={newPostContent}
                  onChange={(e) => setNewPostContent(e.target.value)}
                  placeholder={isAnonymous ? "Desabafe anonimamente..." : "Compartilhe sua jornada..."}
                  className={`flex-1 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 resize-none h-20 ${
                    isAnonymous 
                      ? 'bg-slate-700 text-white placeholder-slate-400 focus:ring-slate-500' 
                      : 'bg-slate-50 text-slate-800 focus:ring-teal-500'
                  }`}
              />
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-2 overflow-x-auto no-scrollbar max-w-[200px] sm:max-w-none">
                {/* Quick Tags/Topics could go here */}
              </div>
              <button 
                onClick={handleSubmit}
                disabled={!newPostContent.trim()}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                  isAnonymous 
                    ? 'bg-white text-slate-900 hover:bg-slate-200' 
                    : 'bg-teal-600 text-white hover:bg-teal-700'
                }`}
              >
                Postar
              </button>
            </div>
        </div>

        {posts.map(post => (
          <div key={post.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm
                    ${post.isAnonymous ? 'bg-slate-100 text-slate-500' : 
                      post.type === 'celebration' ? 'bg-yellow-100 text-yellow-700' : 
                      post.type === 'tip' ? 'bg-indigo-100 text-indigo-700' : 'bg-teal-50 text-teal-700'}`}>
                    {post.type === 'celebration' ? <Award size={18}/> : 
                     post.isAnonymous ? <Ghost size={18} /> : 
                     post.author.charAt(0)}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-800 text-sm flex items-center gap-2">
                    {post.author}
                    {post.isAnonymous && <span className="px-1.5 py-0.5 bg-slate-100 text-slate-500 text-[10px] rounded">Anônimo</span>}
                  </h3>
                  <span className="text-xs text-slate-400">{post.timeAgo}</span>
                </div>
              </div>
              <button className="text-slate-300">
                <MoreHorizontal size={20} />
              </button>
            </div>

            <p className="text-slate-700 leading-relaxed text-sm mb-4">
              {post.content}
            </p>

            {/* Reactions Bar */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-50">
              <div className="flex gap-2">
                <button 
                  onClick={() => onReact(post.id, 'force')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    post.userReaction === 'force' ? 'bg-blue-100 text-blue-700' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  <Shield size={14} /> 
                  <span className="hidden sm:inline">Força</span>
                  {post.reactions.force > 0 && <span>{post.reactions.force}</span>}
                </button>
                
                <button 
                  onClick={() => onReact(post.id, 'fire')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    post.userReaction === 'fire' ? 'bg-orange-100 text-orange-700' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  <Flame size={14} />
                  <span className="hidden sm:inline">Continue</span>
                  {post.reactions.fire > 0 && <span>{post.reactions.fire}</span>}
                </button>

                <button 
                  onClick={() => onReact(post.id, 'handshake')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    post.userReaction === 'handshake' ? 'bg-teal-100 text-teal-700' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                  }`}
                >
                  <HeartHandshake size={14} />
                  <span className="hidden sm:inline">Juntos</span>
                  {post.reactions.handshake > 0 && <span>{post.reactions.handshake}</span>}
                </button>
              </div>

              <div className="flex gap-2">
                 <button className="text-slate-400 hover:text-slate-600">
                    <MessageCircle size={18} />
                 </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityFeed;