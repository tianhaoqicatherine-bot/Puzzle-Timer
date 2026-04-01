'use client';

import { useState } from 'react';
import { useApp } from '@/app/context/AppContext';
import { Play, ChevronRight, Clock, Star, MoreHorizontal, Search, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const { state } = useApp();
  const { puzzleInventory, userStatus } = state;
  const currentTheme = puzzleInventory.currentTheme;

  // 确认弹窗状态
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // 计算当前拼图进度
  const unlockedCount = puzzleInventory.unlockedPieces.filter(p => p).length;
  const hasProgress = unlockedCount > 0;

  // 处理切换点击
  const handleSwitchClick = (e: React.MouseEvent) => {
    if (hasProgress) {
      e.preventDefault();
      setShowConfirmModal(true);
    }
    // 如果没有进度，正常跳转到 /themes
  };

  // 确认切换
  const confirmSwitch = () => {
    setShowConfirmModal(false);
    router.push('/themes');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-purple-600 text-white p-6 pb-8 rounded-b-[32px]">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
              <span className="text-lg">🧩</span>
            </div>
            <div>
              <h1 className="font-bold text-lg">拼图</h1>
              <p className="text-xs text-purple-200">专注成就美好</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-white/20 px-3 py-1 rounded-full">
              <Star className="w-4 h-4 text-yellow-300" />
              <span className="text-sm font-medium">{userStatus.points}</span>
            </div>
            <Link href="/profile">
              <MoreHorizontal className="w-6 h-6" />
            </Link>
          </div>
        </div>

        {/* 统计信息 */}
        <div className="flex justify-between text-center">
          <div>
            <p className="text-2xl font-bold">{userStatus.streakDays}</p>
            <p className="text-xs text-purple-200">连续打卡</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{userStatus.collectedPuzzles}</p>
            <p className="text-xs text-purple-200">收集拼图</p>
          </div>
          <div>
            <p className="text-2xl font-bold">{Math.floor(userStatus.totalFocusTime / 60)}h</p>
            <p className="text-xs text-purple-200">专注时长</p>
          </div>
        </div>
      </div>

      {/* 主要内容区 */}
      <div className="p-4 -mt-4">
        {/* 当前拼图卡片 */}
        <div className="bg-white rounded-3xl shadow-lg p-5 mb-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="text-sm text-gray-500">正在进行的拼图</p>
              <h2 className="text-xl font-bold text-gray-800">{currentTheme?.name || '未选择主题'}</h2>
            </div>
            <button
              onClick={handleSwitchClick}
              className="text-purple-600 text-sm flex items-center gap-1"
            >
              切换
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* 拼图预览 */}
          <Link href="/timer">
            <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 bg-gray-100">
              {currentTheme ? (
                <>
                  <div
                    className="absolute inset-0 transition-opacity duration-500"
                    style={{
                      backgroundImage: `url(${currentTheme.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      filter: 'brightness(0.3)',
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
                          className="relative overflow-hidden"
                          style={{
                            backgroundImage: unlocked ? `url(${currentTheme.image})` : 'none',
                            backgroundSize: '200% 200%',
                            backgroundPosition: `${col * 100}% ${row * 100}%`,
                            opacity: unlocked ? 1 : 0,
                            transition: 'opacity 0.5s ease',
                          }}
                        />
                      );
                    })}
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-gray-400">点击选择主题</p>
                </div>
              )}

              {/* 开始按钮 */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full bg-purple-600/90 flex items-center justify-center shadow-lg backdrop-blur-sm">
                  <Play className="w-8 h-8 text-white ml-1" />
                </div>
              </div>

              {/* 进度标签 */}
              <div className="absolute bottom-4 left-4 right-4 flex justify-between">
                <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-purple-700">
                  进度: {unlockedCount}/{currentTheme?.totalPieces || 4}
                </span>
                <span className="bg-purple-600/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-white">
                  {Math.round((unlockedCount / (currentTheme?.totalPieces || 4)) * 100)}%
                </span>
              </div>
            </div>
          </Link>

          <p className="text-center text-gray-500 text-sm">
            点击开始专注，解锁更多拼图碎片
          </p>
        </div>

        {/* 快捷入口 */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <Link href="/themes">
            <div className="bg-white rounded-2xl p-4 text-center shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center mx-auto mb-2">
                <Search className="w-5 h-5 text-purple-600" />
              </div>
              <p className="text-xs font-medium text-gray-700">发现主题</p>
            </div>
          </Link>
          <Link href="/create">
            <div className="bg-white rounded-2xl p-4 text-center shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-pink-100 flex items-center justify-center mx-auto mb-2">
                <span className="text-xl">✨</span>
              </div>
              <p className="text-xs font-medium text-gray-700">创建主题</p>
            </div>
          </Link>
          <Link href="/schedule">
            <div className="bg-white rounded-2xl p-4 text-center shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center mx-auto mb-2">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-xs font-medium text-gray-700">日程规划</p>
            </div>
          </Link>
        </div>

        {/* 最近活动 */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-3">最近活动</h3>
          <div className="space-y-3">
            {[
              { task: '阅读学习', time: '25分钟', reward: '+1 拼图块', icon: '📚' },
              { task: '运动健身', time: '45分钟', reward: '+1 拼图块', icon: '💪' },
            ].map((activity, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-xl">
                  {activity.icon}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{activity.task}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
                <span className="text-xs text-purple-600 bg-purple-50 px-2 py-1 rounded-full">
                  {activity.reward}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 确认弹窗 */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full animate-slide-up">
            <div className="text-center mb-6">
              <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">确定要切换拼图吗？</h3>
              <p className="text-gray-500">
                当前拼图 <span className="font-medium text-purple-600">{currentTheme?.name}</span>
                已解锁 {unlockedCount}/{currentTheme?.totalPieces} 块
              </p>
              <p className="text-sm text-red-500 mt-2">
                切换后将丢失当前进度，需要重新开始
              </p>
            </div>

            <div className="space-y-3">
              <button
                onClick={confirmSwitch}
                className="w-full bg-purple-600 text-white py-3 rounded-2xl font-bold hover:bg-purple-700 transition-colors"
              >
                仍要切换
              </button>
              <button
                onClick={() => setShowConfirmModal(false)}
                className="w-full bg-gray-100 text-gray-600 py-3 rounded-2xl font-medium hover:bg-gray-200 transition-colors"
              >
                继续当前拼图
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 底部导航 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-3 max-w-md mx-auto">
        <div className="flex justify-around">
          <Link href="/" className="flex flex-col items-center text-purple-600">
            <span className="text-xl mb-1">🏠</span>
            <span className="text-xs">首页</span>
          </Link>
          <Link href="/themes" className="flex flex-col items-center text-gray-400">
            <span className="text-xl mb-1">🎨</span>
            <span className="text-xs">主题</span>
          </Link>
          <Link href="/timer" className="flex flex-col items-center text-gray-400">
            <span className="text-xl mb-1">⏱️</span>
            <span className="text-xs">专注</span>
          </Link>
          <Link href="/profile" className="flex flex-col items-center text-gray-400">
            <span className="text-xl mb-1">👤</span>
            <span className="text-xs">我的</span>
          </Link>
        </div>
      </div>

      {/* 底部留白 */}
      <div className="h-20" />
    </div>
  );
}
