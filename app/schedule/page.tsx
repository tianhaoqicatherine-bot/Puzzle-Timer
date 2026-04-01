'use client';

import { useState } from 'react';
import { ArrowLeft, Calendar, Clock, Bell, Plus, Trash2, Repeat } from 'lucide-react';
import Link from 'next/link';

interface ScheduleItem {
  id: string;
  date: string;
  time: string;
  task: string;
  forceStart: boolean;
  repeat: boolean;
}

export default function Schedule() {
  const [schedules, setSchedules] = useState<ScheduleItem[]>([
    {
      id: '1',
      date: '2024-12-05',
      time: '09:00',
      task: '晨间阅读',
      forceStart: true,
      repeat: true,
    },
    {
      id: '2',
      date: '2024-12-05',
      time: '14:00',
      task: '项目开发',
      forceStart: false,
      repeat: false,
    },
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [newSchedule, setNewSchedule] = useState({
    date: '',
    time: '09:00',
    task: '',
    forceStart: false,
    repeat: false,
  });

  // 生成日历数据
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const calendarDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDayOfMonth }, (_, i) => i);

  const handleAddSchedule = () => {
    if (newSchedule.date && newSchedule.task) {
      setSchedules([...schedules, { ...newSchedule, id: Date.now().toString() }]);
      setShowAddModal(false);
      setNewSchedule({ date: '', time: '09:00', task: '', forceStart: false, repeat: false });
    }
  };

  const handleDeleteSchedule = (id: string) => {
    setSchedules(schedules.filter((s) => s.id !== id));
  };

  // 获取某天的日程数量
  const getScheduleCount = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return schedules.filter((s) => s.date === dateStr).length;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-purple-600 text-white p-6">
        <div className="flex items-center gap-4 mb-4">
          <Link href="/">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">日程规划</h1>
        </div>

        {/* 统计 */}
        <div className="flex gap-6">
          <div>
            <p className="text-2xl font-bold">{schedules.length}</p>
            <p className="text-xs text-purple-200">待办日程</p>
          </div>
          <div>
            <p className="text-2xl font-bold">
              {schedules.filter((s) => s.forceStart).length}
            </p>
            <p className="text-xs text-purple-200">强制专注</p>
          </div>
        </div>
      </div>

      {/* 主要内容 */}
      <div className="p-4">
        {/* 日历 */}
        <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-800">
              {currentYear}年{currentMonth + 1}月
            </h2>
            <div className="flex gap-2">
              <button className="p-1 rounded-lg hover:bg-gray-100">
                <span className="text-gray-400">◀</span>
              </button>
              <button className="p-1 rounded-lg hover:bg-gray-100">
                <span className="text-gray-400">▶</span>
              </button>
            </div>
          </div>

          {/* 星期标题 */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {['日', '一', '二', '三', '四', '五', '六'].map((day) => (
              <div key={day} className="text-center text-xs text-gray-400 py-2">
                {day}
              </div>
            ))}
          </div>

          {/* 日期网格 */}
          <div className="grid grid-cols-7 gap-1">
            {emptyDays.map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}
            {calendarDays.map((day) => {
              const scheduleCount = getScheduleCount(day);
              const isToday = day === today.getDate();
              return (
                <button
                  key={day}
                  className={`aspect-square rounded-xl flex flex-col items-center justify-center relative ${
                    isToday ? 'bg-purple-600 text-white' : 'hover:bg-gray-100'
                  }`}
                >
                  <span className="text-sm font-medium">{day}</span>
                  {scheduleCount > 0 && (
                    <div
                      className={`w-1.5 h-1.5 rounded-full mt-1 ${
                        isToday ? 'bg-white' : 'bg-purple-500'
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 今日日程列表 */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-800">今日日程</h2>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-1 text-purple-600 text-sm font-medium"
            >
              <Plus className="w-4 h-4" />
              添加
            </button>
          </div>

          <div className="space-y-3">
            {schedules.length === 0 ? (
              <div className="text-center py-8">
                <span className="text-4xl mb-2 block">📅</span>
                <p className="text-gray-500">暂无日程安排</p>
                <p className="text-sm text-gray-400 mt-1">点击右上角添加</p>
              </div>
            ) : (
              schedules.map((schedule) => (
                <div
                  key={schedule.id}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
                >
                  <div className="w-14 text-center">
                    <p className="text-lg font-bold text-purple-600">{schedule.time}</p>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{schedule.task}</p>
                    <div className="flex items-center gap-2 mt-1">
                      {schedule.forceStart && (
                        <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full">
                          强制
                        </span>
                      )}
                      {schedule.repeat && (
                        <span className="text-xs bg-blue-100 text-blue-600 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Repeat className="w-3 h-3" />
                          重复
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteSchedule(schedule.id)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* 添加日程弹窗 */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
          <div className="bg-white rounded-t-[32px] w-full p-6 animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-800">添加日程</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-500 mb-2 block">任务名称</label>
                <input
                  type="text"
                  value={newSchedule.task}
                  onChange={(e) => setNewSchedule({ ...newSchedule, task: e.target.value })}
                  placeholder="例如：阅读学习"
                  className="w-full bg-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-500 mb-2 block">日期</label>
                  <input
                    type="date"
                    value={newSchedule.date}
                    onChange={(e) => setNewSchedule({ ...newSchedule, date: e.target.value })}
                    className="w-full bg-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-500 mb-2 block">时间</label>
                  <input
                    type="time"
                    value={newSchedule.time}
                    onChange={(e) => setNewSchedule({ ...newSchedule, time: e.target.value })}
                    className="w-full bg-gray-100 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
                    <Bell className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">强制开始</p>
                    <p className="text-xs text-gray-500">到时间自动开始专注</p>
                  </div>
                </div>
                <button
                  onClick={() =>
                    setNewSchedule({ ...newSchedule, forceStart: !newSchedule.forceStart })
                  }
                  className={`w-12 h-6 rounded-full transition-colors relative ${
                    newSchedule.forceStart ? 'bg-purple-600' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${
                      newSchedule.forceStart ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                    <Repeat className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">每日重复</p>
                    <p className="text-xs text-gray-500">每天同一时间提醒</p>
                  </div>
                </div>
                <button
                  onClick={() => setNewSchedule({ ...newSchedule, repeat: !newSchedule.repeat })}
                  className={`w-12 h-6 rounded-full transition-colors relative ${
                    newSchedule.repeat ? 'bg-purple-600' : 'bg-gray-300'
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${
                      newSchedule.repeat ? 'translate-x-6' : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>

              <button
                onClick={handleAddSchedule}
                disabled={!newSchedule.task || !newSchedule.date}
                className="w-full bg-purple-600 text-white py-4 rounded-2xl font-bold text-lg mt-4 disabled:opacity-50"
              >
                添加日程
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 底部留白 */}
      <div className="h-6" />
    </div>
  );
}
