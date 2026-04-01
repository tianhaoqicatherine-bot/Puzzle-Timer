'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

// 类型定义
type TimerStatus = 'idle' | 'running' | 'paused' | 'finished' | 'failed';

interface UserStatus {
  points: number;
  totalFocusTime: number; // 分钟
  streakDays: number;
  collectedPuzzles: number;
}

interface ActiveTimer {
  status: TimerStatus;
  timeLeft: number; // 秒
  totalTime: number; // 秒
  taskName: string;
  deepFocus: boolean;
}

interface PuzzleTheme {
  id: string;
  name: string;
  image: string;
  category: string;
  totalPieces: number;
  collectedPieces: number;
  completedCount: number;
}

interface PuzzleInventory {
  currentTheme: PuzzleTheme | null;
  unlockedPieces: boolean[];
}

interface AppState {
  userStatus: UserStatus;
  activeTimer: ActiveTimer;
  puzzleInventory: PuzzleInventory;
}

// 初始状态
const initialState: AppState = {
  userStatus: {
    points: 0,
    totalFocusTime: 0,
    streakDays: 5,
    collectedPuzzles: 3,
  },
  activeTimer: {
    status: 'idle',
    timeLeft: 25 * 60, // 默认25分钟
    totalTime: 25 * 60,
    taskName: '',
    deepFocus: false,
  },
  puzzleInventory: {
    currentTheme: {
      id: 'cat',
      name: '可爱猫咪',
      image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&h=800&fit=crop',
      category: '动物',
      totalPieces: 4,
      collectedPieces: 1,
      completedCount: 1234,
    },
    unlockedPieces: [true, false, false, false],
  },
};

// Context
interface AppContextType {
  state: AppState;
  setUserStatus: (status: Partial<UserStatus>) => void;
  setActiveTimer: (timer: Partial<ActiveTimer>) => void;
  setPuzzleInventory: (inventory: Partial<PuzzleInventory>) => void;
  startTimer: () => void;
  pauseTimer: () => void;
  resumeTimer: () => void;
  stopTimer: (completed: boolean) => void;
  resetTimer: () => void;
  unlockPiece: () => void;
  selectTheme: (theme: PuzzleTheme) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(initialState);

  const setUserStatus = useCallback((status: Partial<UserStatus>) => {
    setState(prev => ({
      ...prev,
      userStatus: { ...prev.userStatus, ...status },
    }));
  }, []);

  const setActiveTimer = useCallback((timer: Partial<ActiveTimer>) => {
    setState(prev => ({
      ...prev,
      activeTimer: { ...prev.activeTimer, ...timer },
    }));
  }, []);

  const setPuzzleInventory = useCallback((inventory: Partial<PuzzleInventory>) => {
    setState(prev => ({
      ...prev,
      puzzleInventory: { ...prev.puzzleInventory, ...inventory },
    }));
  }, []);

  const startTimer = useCallback(() => {
    setState(prev => ({
      ...prev,
      activeTimer: { ...prev.activeTimer, status: 'running' },
    }));
  }, []);

  const pauseTimer = useCallback(() => {
    setState(prev => ({
      ...prev,
      activeTimer: { ...prev.activeTimer, status: 'paused' },
    }));
  }, []);

  const resumeTimer = useCallback(() => {
    setState(prev => ({
      ...prev,
      activeTimer: { ...prev.activeTimer, status: 'running' },
    }));
  }, []);

  const stopTimer = useCallback((completed: boolean) => {
    const newStatus = completed ? 'finished' : 'failed';
    setState(prev => ({
      ...prev,
      activeTimer: { ...prev.activeTimer, status: newStatus },
    }));
  }, []);

  const resetTimer = useCallback(() => {
    setState(prev => ({
      ...prev,
      activeTimer: {
        ...prev.activeTimer,
        status: 'idle',
        timeLeft: prev.activeTimer.totalTime,
      },
    }));
  }, []);

  const unlockPiece = useCallback(() => {
    setState(prev => {
      const unlocked = [...prev.puzzleInventory.unlockedPieces];
      const nextIndex = unlocked.findIndex(p => !p);
      if (nextIndex !== -1) {
        unlocked[nextIndex] = true;
      }
      return {
        ...prev,
        puzzleInventory: {
          ...prev.puzzleInventory,
          unlockedPieces: unlocked,
        },
        userStatus: {
          ...prev.userStatus,
          points: prev.userStatus.points + 10,
          totalFocusTime: prev.userStatus.totalFocusTime + Math.floor(prev.activeTimer.totalTime / 60),
          collectedPuzzles: unlocked.filter(p => p).length,
        },
      };
    });
  }, []);

  const selectTheme = useCallback((theme: PuzzleTheme) => {
    setState(prev => ({
      ...prev,
      puzzleInventory: {
        ...prev.puzzleInventory,
        currentTheme: theme,
        unlockedPieces: new Array(theme.totalPieces).fill(false),
      },
    }));
  }, []);

  return (
    <AppContext.Provider
      value={{
        state,
        setUserStatus,
        setActiveTimer,
        setPuzzleInventory,
        startTimer,
        pauseTimer,
        resumeTimer,
        stopTimer,
        resetTimer,
        unlockPiece,
        selectTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
