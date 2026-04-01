'use client';

import { useEffect } from 'react';
import { useApp } from '@/app/context/AppContext';
import { Share2, Bell, RotateCw, Home } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SuccessResult() {
  const router = useRouter();
  const { state, unlockPiece, resetTimer } = useApp();
  const { puzzleInventory, activeTimer } = state;
  const currentTheme = puzzleInventory.currentTheme;

  const unlockedCount = puzzleInventory.unlockedPieces.filter(p => p).length;
  const totalPieces = currentTheme?.totalPieces || 4;
  const isComplete = unlockedCount >= totalPieces;
  const newPieceIndex = puzzleInventory.unlockedPieces.findIndex((p, i) => !p);

  useEffect(() => {
    // 如果没有完成专注，跳回首页（延迟检查，等待状态更新）
    const timer = setTimeout(() => {
      if (activeTimer.status !== 'finished') {
        router.push('/');
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [activeTimer.status]);

  const handleUnlock = () => {
    unlockPiece();
  };

  const handleReset = () => {
    resetTimer();
    router.push('/timer');
  };

  return (
    <div className="min-h-screen bg-purple-600">
      {/* 顶部 */}
      <div className="p-6 pt-12">
        <h1 className="text-2xl font-bold text-white text-center mb-2">
          {isComplete ? '🎉 拼图完成！' : '完成拼图！'}
        </h1>
        <p className="text-center text-purple-200">
          {isComplete
            ? `恭喜您和${currentTheme?.completedCount || 0}人一起点亮拼图！`
            : `恭喜您点亮拼图的 ${unlockedCount + 1}/${totalPieces}！`}
        </p>
      </div>

      {/* 主要内容卡片 */}
      <div className="bg-gray-50 rounded-t-[32px] min-h-[calc(100vh-140px)] p-6">
        {/* 拼图展示 */}
        <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
          {currentTheme && (
            <div className="relative aspect-square rounded-2xl overflow-hidden">
              {/* 完整拼图背景（暗色） */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `url(${currentTheme.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  filter: 'brightness(0.2) grayscale(0.3)',
                }}
              />

              {/* 已解锁的拼图块 */}
              <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-1">
                {puzzleInventory.unlockedPieces.map((unlocked, i) => {
                  const row = Math.floor(i / 2);
                  const col = i % 2;
                  return (
                    <div
                      key={i}
                      className="relative overflow-hidden transition-all duration-700"
                      style={{
                        backgroundImage: unlocked ? `url(${currentTheme.image})` : 'none',
                        backgroundSize: '200% 200%',
                        backgroundPosition: `${col * 100}% ${row * 100}%`,
                        opacity: unlocked ? 1 : 0,
                        transform: unlocked ? 'scale(1)' : 'scale(0.8)',
                      }}
                    >
                      {i === newPieceIndex - 1 && (
                        <div className="absolute inset-0 bg-purple-500/30 animate-pulse" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* 完成特效 */}
              {isComplete && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl animate-bounce">✨</div>
                </div>
              )}
            </div>
          )}

          {/* 拼图信息 */}
          <div className="mt-4 text-center">
            <h2 className="text-xl font-bold text-gray-800">{currentTheme?.name}</h2>
            <div className="flex justify-center gap-4 mt-2 text-sm text-gray-500">
              <span>已解锁: {unlockedCount}/{totalPieces}</span>
              <span>|</span>
              <span>{Math.round((unlockedCount / totalPieces) * 100)}% 完成</span>
            </div>
          </div>
        </div>

        {/* 获得的奖励 */}
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl p-4 mb-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-2xl">
                🎁
              </div>
              <div>
                <p className="font-bold">获得奖励</p>
                <p className="text-sm text-purple-200">+10 积分 | +1 拼图块</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold">+10</p>
              <p className="text-xs text-purple-200">积分</p>
            </div>
          </div>
        </div>

        {/* 操作按钮 */}
        <div className="space-y-3">
          {!isComplete ? (
            <>
              <button
                onClick={handleReset}
                className="w-full bg-purple-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-purple-200 hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
              >
                <RotateCw className="w-5 h-5" />
                再拼一块
              </button>

              <button className="w-full bg-white text-purple-600 border-2 border-purple-200 py-4 rounded-2xl font-bold text-lg hover:bg-purple-50 transition-colors flex items-center justify-center gap-2">
                <Bell className="w-5 h-5" />
                提醒我继续拼图
              </button>
            </>
          ) : (
            <>
              <Link
                href="/themes"
                className="w-full bg-purple-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-purple-200 hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
              >
                <RotateCw className="w-5 h-5" />
                开始新拼图
              </Link>

              <button className="w-full bg-white text-purple-600 border-2 border-purple-200 py-4 rounded-2xl font-bold text-lg hover:bg-purple-50 transition-colors flex items-center justify-center gap-2">
                <Share2 className="w-5 h-5" />
                分享成就
              </button>
            </>
          )}

          <Link
            href="/"
            className="w-full bg-gray-100 text-gray-600 py-4 rounded-2xl font-medium text-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            返回首页
          </Link>
        </div>

        {/* 提示 */}
        <p className="text-center text-gray-400 text-sm mt-6">
          {isComplete
            ? '太棒了！你已经完成了这张拼图的所有碎片！'
            : '每完成一次专注，就能解锁更多拼图碎片哦！'}
        </p>
      </div>
    </div>
  );
}
