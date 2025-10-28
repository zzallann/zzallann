import type React from 'react';
import type { SVGProps } from 'react';

// User and Authentication
export interface User {
  id: string;
  identifier: string;
  name: string;
  fullName: string;
  avatarId: string | null;
  uploadedImage: string | null; // Base64 string for uploaded images
  points: number;
  reactedPostsForPoints?: string[]; // Tracks post IDs for which user has received reaction points
  reactedMessagesForPoints?: string[]; // Tracks message IDs for which user has received reaction points
  commentedPostsForPoints?: string[]; // Tracks post IDs for which user received points for commenting
  reactedCommentsForPoints?: string[]; // Tracks comment IDs for which user has received reaction points
  registrationDate: number;
  pointsHistory: {
    reason: string;
    points: number;
    date: number;
  }[];
  status?: 'pro' | 'pro_max' | 'normal' | 'admin';
  lastSeen: number;
  strikes: number;
  approved: boolean;
}

// Avatars
export interface Avatar {
  id: string;
  name: string;
  component: React.FC<SVGProps<SVGSVGElement>>;
}

// Poll Types for Feed Posts
export interface PollOption {
  text: string;
  votes: string[]; // Array of user IDs who voted for this option
}

export interface Poll {
  question: string;
  options: PollOption[];
}

// Comments on Posts
export interface Comment {
    id: string;
    author: User;
    content: string | null;
    imageUrl: string | null;
    gifUrl: string | null;
    timestamp: number;
    reactions: {
      [key: string]: string[]; // e.g., { '❤️': ['userId1', 'userId2'] }
    };
}


// Feed Posts
export interface Post {
  id: string;
  author: User;
  content: string | null;
  gifUrl: string | null;
  imageUrl?: string | null; // For uploaded images
  videoUrl?: string | null; // For uploaded videos
  poll?: Poll | null; // For polls
  timestamp: number;
  reactions: {
    [key: string]: string[]; // e.g., { '❤️': ['userId1', 'userId2'] }
  };
  comments: Comment[];
}

// Awards & Events
export interface AwardWinner {
  userId: string;
  category: 'dolgozo_1' | 'konyhas_2' | 'kasszas_2' | 'kk_3' | 'negyedev_dolgozoja';
}

export interface MonthAward {
  id: string; // "YYYY-MM"
  winners: AwardWinner[];
  published?: boolean;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: number; // timestamp
  imageUrl: string | null;
  createdBy: string;
  createdAt: number;
}


// Messaging Types
export interface Message {
  id:string;
  conversationId: string;
  senderId: string; // 'system' for system notifications
  content: string;
  imageUrl?: string | null; // For shared images
  gifUrl?: string | null; // For shared GIFs
  timestamp: number;
  isFeedback?: boolean;
  reactions?: {
    [key: string]: string[]; // e.g., { '❤️': ['userId1', 'userId2'] }
  };
  seenBy?: string[]; // Array of user IDs who have seen the message
}

export interface Conversation {
  id: string;
  name?: string;
  imageUrl?: string | null;
  avatarId?: string | null;
  participants: User[]; // All participants, including current user
  lastMessage: Message | null;
  isSystemConversation: boolean;
  unreadCount: number;
  createdBy?: string;
  nicknames?: Record<string, string>;
}

// Pro/Pro Max Feature Types
export interface MealMenuItem {
    name: string;
    price: number;
    unit: 'db' | 'kg';
}

export interface MealLog {
    id: string;
    userId: string;
    userName: string;
    userAvatarId: string | null;
    userUploadedImage: string | null;
    items: { name: string; quantity: number; price: number }[];
    totalPrice: number;
    timestamp: number;
}

export interface WasteMenuItem {
    name: string;
    unit: 'db' | 'kg' | 'l';
}

export interface WasteLog {
    id: string;
    userId: string;
    // FIX: Added missing 'userName' property to align with its usage in services and components.
    userName: string;
    items: { name: string; quantity: number }[];
    timestamp: number;
}


export interface WorkTimeRequest {
    id: string;
    userId: string;
    userName: string;
    userAvatarId: string | null;
    userUploadedImage: string | null;
    days: {
        date: string; // ISO string date
        type: 'munkanap' | 'szabadság';
        from: string;
        to: string;
        isFlex: boolean;
    }[];
    submittedAt: number;
    message?: string | null;
}

export interface ProMaxDailySchedule {
  schedule: string;
  note: string;
}

export type ProMaxScheduleData = Record<string, Record<string, ProMaxDailySchedule>>; // UserId -> Day -> { schedule, note }

export interface WeeklySchedule {
    id: string;
    weekId: string; // e.g., "2023-42"
    text: string | null;
    imageUrl: string | null;
    gifUrl?: string | null;
    uploadedAt: number;
    uploaderName: string;
    proMaxScheduleText: string | null; // JSON string of ProMaxScheduleData
}

// FIX: Added missing ParsedScheduleItem type definition.
export interface ParsedScheduleItem {
  userId: string;
  name: string;
  identifier: string;
  schedule: Record<string, string>;
}

export interface AssignedTask {
  id: string;
  description: string;
  assignedToUserId: string;
  deadline: number; // timestamp
  status: 'pending' | 'completed' | 'rejected' | 'deleted';
  assignedById: string;
  completedAt?: number;
  isUpdateSeenByAssigner: boolean;
  deadlineHistory?: {
    oldDeadline: number;
    newDeadline: number;
    changedAt: number;
  }[];
  deletedById?: string;
  deletedAt?: number;
}

// FIX: Added missing game-related type definitions.
// Game ("Ki nevet a végén?") Types
export interface GamePiece {
    id: number;
    position: number; // -1 for home, 0-51 for board, >51 for safe zone
    state: 'home' | 'active' | 'safe';
}

export interface GamePlayer {
    user: User;
    color: 'red' | 'blue' | 'green' | 'yellow';
    pieces: GamePiece[];
}

export interface GameState {
    id: string;
    players: GamePlayer[];
    currentPlayerIndex: number;
    diceValue: number | null;
    status: 'playing' | 'finished';
    message: string;
    winner?: string;
}

// KPI and Newspaper types
export interface KpiData {
    nps: string;
    time: string;
    npsTarget: string;
    timeTarget: string;
    dailyMenu: string;
    customLabel1: string;
    customValue1: string;
    customLabel2: string;
    customValue2: string;
    customUnit1: '%' | 'p' | 'none';
    customUnit2: '%' | 'p' | 'none';
    npsLabel: string;
    timeLabel: string;
    npsTargetLabel: string;
    timeTargetLabel: string;
    dailyMenuLabel: string;
}

export interface Newspaper {
    id: string;
    weekId: string; // e.g., "2023-42"
    issueNumber: number;
    imageUrl: string;
    uploadedAt: number;
    uploaderId: string;
    comments: Comment[];
}

// Monthly Favorite Employee Votes
export interface FavoriteVote {
    voterId: string;
    category: 'normal' | 'pro' | 'pro_max';
    votedForId: string;
}

export interface MonthlyFavoriteVotes {
    id: string; // "YYYY-MM"
    votes: FavoriteVote[];
    notificationsSent?: boolean; // To track if winner notifications have been sent
}

export interface DeadlineConfig {
    deadline: number;
    resultsVisible: number;
}
