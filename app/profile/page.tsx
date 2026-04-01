'use client';

import { useApp } from '../context/AppContext';
import { Settings, ChevronRight, Crown, Users, Gift, Award, Bell, Shield, HelpCircle } from 'lucide-react';
import Link from 'next/link';

const menuItems = [
  { icon: Crown, label: '充值会员', desc: '解锁更多专属主题', color: 'bg-yellow-100 text-yellow-600' },
  { icon: Users, label: '邀请好友', desc: '邀请好友获得积分', color: 'bg-green-100 text-green-600' },
  { icon: Gift, label: '拼图商店', desc: '购买精美拼图主题', color: 'bg-pink-100 text-pink-600' },
  { icon: Award, label: '查看成就', desc: '查看你的专注成就', color: 'bg-purple-100 text-purple-600' },
  { icon: Bell, label: '消息通知', desc: '设置提醒方式', color: 'bg-blue-100 text-blue-600' },
  { icon: Shield, label: '隐私设置', desc: '管理隐私权限', color: 'bg-gray-100 text-gray-600' },
  { icon: HelpCircle, label: '帮助中心', desc: '常见问题解答', color: 'bg-orange-100 text-orange-600' },
  { icon: Settings, label: '设置', desc: '应用设置', color: 'bg-gray-100 text-gray-600' },
];

export default function Profile() {
  const { state } = useApp();
  const { userStatus } = state;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header 背景 */}
      <div className="bg-purple-600 text-white p-6 pb-12">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl font-bold">个人中心</h1>
          <Link href="/" className="p-2">
            <span className="text-white">✕</span>
          </Link>
        </div>

        {/* 用户信息卡片 */}
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-3xl border-4 border-white/30">
            🧩
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold">专注达人</h2>
            <p className="text-purple-200 text-sm">ID: 88481234</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="px-2 py-1 bg-white/20 rounded-full text-xs">VIP会员</span>
              <span className="px-2 py-1 bg-yellow-400/30 rounded-full text-xs">🏆 黄金段位</span>
            </div>
          </div>
        </div>
      </div>

      {/* 主要内容 */}
      <div className="px-4 -mt-6">
        {/* 统计数据卡片 */}
        <div className="bg-white rounded-2xl p-4 shadow-lg mb-4">
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-purple-600">{userStatus.points}</p>
              <p className="text-xs text-gray-500">积分</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">{userStatus.streakDays}</p>
              <p className="text-xs text-gray-500">连续打卡</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">{userStatus.collectedPuzzles}</p>
              <p className="text-xs text-gray-500">收集拼图</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-purple-600">
                {Math.floor(userStatus.totalFocusTime / 60)}h
              </p>
              <p className="text-xs text-gray-500">专注时长</p>
            </div>
          </div>
        </div>

        {/* 数据详情 */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">📊</span>
              <span className="text-sm text-gray-500">本周专注</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">12.5h</p>
            <p className="text-xs text-green-500 mt-1">↑ 比上周多 2h</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🎯</span>
              <span className="text-sm text-gray-500">完成率</span>
            </div>
            <p className="text-2xl font-bold text-gray-800">85%</p>
            <p className="text-xs text-green-500 mt-1">↑ 比上周高 5%</p>
          </div>
        </div>

        {/* 成就展示 */}
        <div className="bg-white rounded-2xl p-4 shadow-sm mb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-gray-800">我的成就</h3>
            <Link href="/" className="text-purple-600 text-sm flex items-center gap-1">
              查看全部
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="flex gap-3">
            {[
              { icon: '🔥', name: '连续7天', desc: '坚持就是胜利' },
              { icon: '📚', name: '阅读达人', desc: '阅读100小时' },
              { icon: '💪', name: '健身先锋', desc: '运动50小时' },
            ].map((achievement, i) => (
              <div key={i} className="flex-1 bg-gray-50 rounded-xl p-3 text-center">
                <span className="text-2xl block mb-1">{achievement.icon}</span>
                <p className="text-xs font-medium text-gray-800">{achievement.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 菜单列表 */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {menuItems.map((item, index) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-4 p-4 hover:bg-gray-50 transition-colors ${
                index !== menuItems.length - 1 ? 'border-b border-gray-100' : ''
              }`}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${item.color}`}>
                <item.icon className="w-5 h-5" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-medium text-gray-800">{item.label}</p>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-300" />
            </button>
          ))}
        </div>

        {/* 版本信息 */}
        <p className="text-center text-gray-400 text-xs mt-6 mb-8">
          拼图 v1.0.0 | 用户协议 | 隐私政策
        </p>
      </div>

      {/* 底部导航 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 py-3 max-w-md mx-auto">
        <div className="flex justify-around">
          <Link href="/" className="flex flex-col items-center text-gray-400">
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
          <Link href="/profile" className="flex flex-col items-center text-purple-600">
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
