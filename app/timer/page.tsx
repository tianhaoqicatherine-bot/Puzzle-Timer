'use client';

import { useState, useEffect } from 'react';
import { useApp } from '@/app/context/AppContext';
import { ArrowLeft, Mic, Camera, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function TimerSetup() {
  const router = useRouter();
  const { state, setActiveTimer, startTimer } = useApp();
  const { puzzleInventory } = state;
  const currentTheme = puzzleInventory.currentTheme;

  const [duration, setDuration] = useState(25);
  const [taskName, setTaskName] = useState('');
  const [deepFocus, setDeepFocus] = useState(false);
  const [isListening, setIsListening] = useState(false);

  // 模拟语音输入
  const handleVoiceInput = () => {
    setIsListening(true);
    setTimeout(() => {
      setTaskName('阅读专业书籍30页');
      setIsListening(false);
    }, 1500);
  };

  const handleStart = () => {
    setActiveTimer({
      status: 'running',
      timeLeft: duration * 60,
      totalTime: duration * 60,
      taskName: taskName || '专注任务',
      deepFocus,
    });
    startTimer();
    router.push('/timer/active');
  };

  // 预设时间选项
  const timePresets = [15, 25, 45, 60];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-purple-600 text-white p-6">
        <div className="flex items-center gap-4 mb-4">
          <Link href="/">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">专注设置</h1>
        </div>

        {/* 当前拼图主题 */}
        {currentTheme && (
          <div className="flex items-center gap-3 bg-white/10 rounded-2xl p-3">
            <div
              className="w-12 h-12 rounded-xl bg-cover bg-center"
              style={{ backgroundImage: `url(${currentTheme.image})` }}
            />
            <div className="flex-1">
              <p className="text-sm text-purple-200">当前拼图</p>
              <p className="font-bold">{currentTheme.name}</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">
                {puzzleInventory.unlockedPieces.filter(p => p).length}/{currentTheme.totalPieces}
              </p>
              <p className="text-xs text-purple-200">已解锁</p>
            </div>
          </div>
        )}
      </div>

      {/* 主要内容 */}
      <div className="p-4">
        {/* 任务输入 */}
        <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
          <label className="text-sm text-gray-500 mb-2 block">我要专注做什么？</label>
          <div className="relative">
            <input
              type="text"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              placeholder="输入任务名称..."
              className="w-full bg-gray-100 rounded-xl px-4 py-3 pr-24 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
              <button
                onClick={handleVoiceInput}
                className={`p-2 rounded-lg transition-colors ${
                  isListening ? 'bg-red-100 text-red-500' : 'bg-purple-100 text-purple-600'
                }`}
              >
                <Mic className="w-4 h-4" />
              </button>
              <button className="p-2 rounded-lg bg-gray-100 text-gray-600">
                <Camera className="w-4 h-4" />
              </button>
            </div>
          </div>
          {isListening && (
            <p className="text-xs text-purple-600 mt-2 flex items-center gap-1">
              <span className="animate-pulse">●</span> 正在聆听...
            </p>
          )}
        </div>

        {/* 深度专注模式 */}
        <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">深度专注模式</p>
                <p className="text-xs text-gray-500">开启后屏蔽通知和干扰</p>
              </div>
            </div>
            <button
              onClick={() => setDeepFocus(!deepFocus)}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                deepFocus ? 'bg-purple-600' : 'bg-gray-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${
                  deepFocus ? 'translate-x-6' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>
        </div>

        {/* 时间选择 */}
        <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
          <label className="text-sm text-gray-500 mb-4 block">设置专注时长</label>

          {/* 环形时间选择器简化版 */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-48 h-48 rounded-full border-8 border-purple-100 flex items-center justify-center relative">
              <div className="text-center">
                <span className="text-5xl font-bold text-purple-600">{duration}</span>
                <span className="text-gray-500 ml-1">分钟</span>
              </div>
              {/* 进度指示 */}
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle
                  cx="96"
                  cy="96"
                  r="88"
                  fill="none"
                  stroke="#9333ea"
                  strokeWidth="8"
                  strokeDasharray={`${(duration / 60) * 552} 552`}
                  className="transition-all duration-300"
                />
              </svg>
            </div>
          </div>

          {/* 时间预设 */}
          <div className="grid grid-cols-4 gap-2">
            {timePresets.map((time) => (
              <button
                key={time}
                onClick={() => setDuration(time)}
                className={`py-2 rounded-xl text-sm font-medium transition-colors ${
                  duration === time
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {time}分钟
              </button>
            ))}
          </div>

          {/* 滑块 */}
          <input
            type="range"
            min="5"
            max="120"
            step="5"
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value))}
            className="w-full mt-4 accent-purple-600"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>5分钟</span>
            <span>120分钟</span>
          </div>
        </div>

        {/* 提示信息 */}
        <div className="bg-purple-50 rounded-2xl p-4 mb-4">
          <div className="flex items-center gap-2 text-purple-700">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm">
              每专注25分钟可以获得1块拼图碎片
            </span>
          </div>
        </div>

        {/* 开始按钮 */}
        <button
          onClick={handleStart}
          className="w-full bg-purple-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-purple-200 hover:bg-purple-700 transition-colors"
        >
          开始专注
        </button>
      </div>

      {/* 底部留白 */}
      <div className="h-6" />
    </div>
  );
}
