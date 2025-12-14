export enum ViewState {
  DASHBOARD = 'DASHBOARD',
  COMMUNITY = 'COMMUNITY',
  ACHIEVEMENTS = 'ACHIEVEMENTS',
  MENTOR = 'MENTOR'
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  hoursRequired: number;
  iconName: 'medal' | 'shield' | 'zap' | 'crown' | 'star' | 'trophy';
  color: string;
}

export interface PostReaction {
  force: number;    // 💙
  fire: number;     // 🔥
  handshake: number; // 🤝
}

export interface Post {
  id: string;
  author: string;
  content: string;
  timeAgo: string;
  comments: number;
  type: 'celebration' | 'support' | 'tip';
  isAnonymous: boolean;
  reactions: PostReaction;
  userReaction?: 'force' | 'fire' | 'handshake';
}

export interface UserSettings {
  quitDate: Date;
  cigarettesPerDay: number;
  pricePerPack: number; // Assuming pack of 20
  currency: string;
  userName: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
}