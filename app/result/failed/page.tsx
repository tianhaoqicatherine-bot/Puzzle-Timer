'use client';

import { useEffect } from 'react';
import { useApp } from '@/app/context/AppContext';
import { Bell, RotateCw, Home, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function FailedResult() {
  const router = useRouter();
  const { state, resetTimer } = useApp();
  const { puzzleInventory, activeTimer } = state;
  const currentTheme = puzzleInventory.currentTheme;

  useEffect(() => {
    // 如果不是失败状态，跳回首页（延迟检查，等待状态更新）
    const timer = setTimeout(() => {
      if (activeTimer.status !== 'failed') {
        router.push('/');
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [activeTimer.status]);

  const handleRetry = () => {
    resetTimer();
    router.push('/timer');
  };

  const handleChangeTheme = () => {
    resetTimer();
    router.push('/themes');
  };

  return (
    <div className="min-h-screen bg-gray-800">
      {/* 顶部 */}
      <div className="p-6 pt-12">
        <h1 className="text-2xl font-bold text-white text-center mb-2">
          下一次一定！
        </h1>
        <p className="text-center text-gray-400">
          虽然没有点亮拼图，但不意味着会面对黑暗
        </p>
      </div>

      {/* 主要内容卡片 */}
      <div className="bg-gray-50 rounded-t-[32px] min-h-[calc(100vh-140px)] p-6">
        {/* 暗色拼图展示 */}
        <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
          {currentTheme && (
            <div className="relative aspect-square rounded-2xl overflow-hidden">
              {/* 暗色拼图轮廓 */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url(${currentTheme.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  filter: 'brightness(0.15) grayscale(0.8)',
                }}
              />

              {/* 拼图网格线 */}
              <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="border border-gray-600/30"
                  />
                ))}
              </div>

              {/* 已解锁的部分（较亮的） */}
              <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-1">
                {puzzleInventory.unlockedPieces.map((unlocked, i) => {
                  const row = Math.floor(i / 2);
                  const col = i % 2;
                  return (
                    <div
                      key={i}
                      className="relative overflow-hidden"
                      style={{
                        backgroundImage: unlocked ? `url(${currentTheme.image})` : 'none',
                        backgroundSize: '200% 200%',
                        backgroundPosition: `${col * 100}% ${row * 100}%`,
                        opacity: unlocked ? 0.6 : 0,
                        filter: unlocked ? 'brightness(0.4)' : 'none',
                      }}
                    />
                  );
                })}
              </div>

              {/* 安慰文字 */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <span className="text-5xl mb-2 block">💪</span>
                  <p className="text-white/60 text-sm">继续加油</p>
                </div>
              </div>
            </div>
          )}

          {/* 拼图信息 */}
          <div className="mt-4 text-center">
            <h2 className="text-xl font-bold text-gray-800">{currentTheme?.name}</h2>
            <p className="text-sm text-gray-500 mt-1">
              当前进度: {puzzleInventory.unlockedPieces.filter(p => p).length}/{currentTheme?.totalPieces || 4}
            </p>
          </div>
        </div>

        {/* 鼓励卡片 */}
        <div className="bg-gradient-to-r from-gray-600 to-gray-700 rounded-2xl p-4 mb-6 text-white">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-2xl">
              🌟
            </div>
            <div>
              <p className="font-bold">专注是一场马拉松</p>
              <p className="text-sm text-gray-300">每一次尝试都是进步，不要放弃！</p>
            </div>
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="space-y-3">
          <button
            onClick={handleRetry}
            className="w-full bg-gray-800 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
          >
            <RotateCw className="w-5 h-5" />
            再试一次
          </button>

          <button
            onClick={handleChangeTheme}
            className="w-full bg-white text-gray-700 border-2 border-gray-200 py-4 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
          >
            换一张拼图
            <ChevronRight className="w-5 h-5" />
          </button>

          <button className="w-full bg-purple-100 text-purple-600 py-4 rounded-2xl font-bold text-lg hover:bg-purple-200 transition-colors flex items-center justify-center gap-2">
            <Bell className="w-5 h-5" />
            提醒我继续拼图
          </button>

          <Link
            href="/"
            className="w-full bg-gray-100 text-gray-600 py-4 rounded-2xl font-medium text-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            返回首页
          </Link>
        </div>

        {/* 提示 */}
        <div className="mt-6 p-4 bg-blue-50 rounded-2xl">
          <p className="text-sm text-blue-700 text-center">
            💡 小提示：下次可以尝试开启"深度专注模式"，帮助你更好地保持专注
          </p>
        </div>
      </div>
    </div>
  );
}
