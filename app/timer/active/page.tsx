'use client';

import { useEffect, useState } from 'react';
import { useApp } from '@/app/context/AppContext';
import { ArrowLeft, Pause, Play, X, Check } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function TimerActive() {
  const router = useRouter();
  const { state, setActiveTimer, pauseTimer, resumeTimer, stopTimer } = useApp();
  const { activeTimer } = state;
  const [progress, setProgress] = useState(100);

  // 格式化时间
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // 计算进度
  useEffect(() => {
    const percentage = (activeTimer.timeLeft / activeTimer.totalTime) * 100;
    setProgress(percentage);
  }, [activeTimer.timeLeft, activeTimer.totalTime]);

  // 倒计时逻辑
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (activeTimer.status === 'running' && activeTimer.timeLeft > 0) {
      interval = setInterval(() => {
        setActiveTimer({ timeLeft: activeTimer.timeLeft - 1 });
      }, 1000);
    } else if (activeTimer.timeLeft === 0 && activeTimer.status === 'running') {
      stopTimer(true);
      router.push('/result/success');
    }
    return () => clearInterval(interval);
  }, [activeTimer.status, activeTimer.timeLeft]);

  // 如果不在运行状态，跳转到设置页
  useEffect(() => {
    if (activeTimer.status === 'idle') {
      router.push('/timer');
    }
  }, [activeTimer.status]);

  const handlePause = () => {
    if (activeTimer.status === 'running') {
      pauseTimer();
    } else if (activeTimer.status === 'paused') {
      resumeTimer();
    }
  };

  const handleGiveUp = () => {
    stopTimer(false);
    router.push('/result/failed');
  };

  const handleComplete = () => {
    stopTimer(true);
    router.push('/result/success');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <div className="p-6 flex items-center justify-between">
        <Link href="/">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <span className="text-sm text-gray-400">
          {activeTimer.deepFocus ? '深度专注模式' : '普通专注模式'}
        </span>
        <div className="w-6" />
      </div>

      {/* 主要内容 */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {/* 任务名称 */}
        <p className="text-lg text-gray-300 mb-8">{activeTimer.taskName || '专注任务'}</p>

        {/* 环形倒计时 */}
        <div className="relative w-72 h-72 mb-12">
          {/* 背景圆环 */}
          <svg className="w-full h-full -rotate-90">
            <circle
              cx="144"
              cy="144"
              r="130"
              fill="none"
              stroke="#374151"
              strokeWidth="8"
            />
            <circle
              cx="144"
              cy="144"
              r="130"
              fill="none"
              stroke="#9333ea"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={`${progress * 8.17} 817`}
              className="transition-all duration-1000"
            />
          </svg>

          {/* 时间显示 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <span className="text-6xl font-bold tabular-nums">
                {formatTime(activeTimer.timeLeft)}
              </span>
              <p className="text-gray-400 mt-2 text-sm">
                {activeTimer.status === 'paused' ? '已暂停' : '保持专注'}
              </p>
            </div>
          </div>
        </div>

        {/* 控制按钮 */}
        <div className="flex items-center gap-8">
          {/* 提前离开 */}
          <button
            onClick={handleGiveUp}
            className="flex flex-col items-center gap-2 text-gray-400 hover:text-red-400 transition-colors"
          >
            <div className="w-14 h-14 rounded-full bg-gray-800 flex items-center justify-center">
              <X className="w-6 h-6" />
            </div>
            <span className="text-xs">提前离开</span>
          </button>

          {/* 暂停/继续 */}
          <button
            onClick={handlePause}
            className="flex flex-col items-center gap-2"
          >
            <div className="w-20 h-20 rounded-full bg-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
              {activeTimer.status === 'running' ? (
                <Pause className="w-8 h-8" />
              ) : (
                <Play className="w-8 h-8 ml-1" />
              )}
            </div>
            <span className="text-xs text-gray-400">
              {activeTimer.status === 'running' ? '暂停' : '继续'}
            </span>
          </button>

          {/* 完成（测试用） */}
          <button
            onClick={handleComplete}
            className="flex flex-col items-center gap-2 text-gray-400 hover:text-green-400 transition-colors"
          >
            <div className="w-14 h-14 rounded-full bg-gray-800 flex items-center justify-center">
              <Check className="w-6 h-6" />
            </div>
            <span className="text-xs">完成</span>
          </button>
        </div>
      </div>

      {/* 底部提示 */}
      <div className="p-6 text-center">
        <p className="text-sm text-gray-500">
          {activeTimer.deepFocus
            ? '深度专注模式下，离开此页面将导致专注失败'
            : '保持专注，完成目标'}
        </p>
      </div>
    </div>
  );
}
