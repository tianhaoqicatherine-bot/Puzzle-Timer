'use client';

import { useState, useRef } from 'react';
import { ArrowLeft, Upload, Clock, Share2, Image as ImageIcon } from 'lucide-react';
import Link from 'next/link';

export default function CreateTheme() {
  const [themeName, setThemeName] = useState('');
  const [description, setDescription] = useState('');
  const [totalPieces, setTotalPieces] = useState(9);
  const [reminderTime, setReminderTime] = useState('09:00');
  const [reminderEnabled, setReminderEnabled] = useState(true);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    // 模拟创建成功
    alert('主题创建成功！');
  };

  // 拼图块数选项
  const pieceOptions = [4, 9, 16, 25, 36, 49, 64, 81, 100];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-purple-600 text-white p-6">
        <div className="flex items-center gap-4">
          <Link href="/">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">创建主题</h1>
        </div>
      </div>

      {/* 主要内容 */}
      <div className="p-4">
        {/* 图片上传 */}
        <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
          <label className="text-sm text-gray-500 mb-3 block">上传拼图图片</label>
          <div
            onClick={() => fileInputRef.current?.click()}
            className="relative aspect-video rounded-xl bg-gray-100 flex items-center justify-center cursor-pointer overflow-hidden border-2 border-dashed border-gray-300 hover:border-purple-400 transition-colors"
          >
            {uploadedImage ? (
              <img
                src={uploadedImage}
                alt="上传的图片"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-3">
                  <Upload className="w-8 h-8 text-purple-600" />
                </div>
                <p className="text-gray-600 font-medium">点击上传图片</p>
                <p className="text-sm text-gray-400 mt-1">支持 JPG、PNG 格式</p>
              </div>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>

        {/* 主题信息 */}
        <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
          <label className="text-sm text-gray-500 mb-2 block">主题名称</label>
          <input
            type="text"
            value={themeName}
            onChange={(e) => setThemeName(e.target.value)}
            placeholder="给你的拼图起个名字..."
            className="w-full bg-gray-100 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
          />

          <label className="text-sm text-gray-500 mb-2 block">主题简介</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="描述一下这个主题..."
            rows={3}
            className="w-full bg-gray-100 rounded-xl px-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
          />
        </div>

        {/* 拼图块数设置 */}
        <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
          <label className="text-sm text-gray-500 mb-3 block">
            拼图块数: <span className="text-purple-600 font-bold">{totalPieces}</span> 块
          </label>

          <div className="grid grid-cols-5 gap-2 mb-4">
            {pieceOptions.map((num) => (
              <button
                key={num}
                onClick={() => setTotalPieces(num)}
                className={`py-2 rounded-xl text-sm font-medium transition-colors ${
                  totalPieces === num
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {num}
              </button>
            ))}
          </div>

          <input
            type="range"
            min="4"
            max="100"
            step="1"
            value={totalPieces}
            onChange={(e) => setTotalPieces(parseInt(e.target.value))}
            className="w-full accent-purple-600"
          />
          <div className="flex justify-between text-xs text-gray-400 mt-1">
            <span>4块</span>
            <span>100块</span>
          </div>

          {/* 预览网格 */}
          <div className="mt-4 p-4 bg-gray-50 rounded-xl">
            <p className="text-xs text-gray-500 mb-2">拼图预览</p>
            <div
              className="grid gap-1 mx-auto"
              style={{
                gridTemplateColumns: `repeat(${Math.ceil(Math.sqrt(totalPieces))}, 1fr)`,
                maxWidth: '150px',
              }}
            >
              {Array.from({ length: Math.min(totalPieces, 36) }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-square bg-purple-200 rounded"
                  style={{ opacity: i < 4 ? 1 : 0.3 }}
                />
              ))}
              {totalPieces > 36 && (
                <div className="aspect-square bg-purple-200 rounded flex items-center justify-center text-xs text-purple-600">
                  +{totalPieces - 36}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 提醒设置 */}
        <div className="bg-white rounded-2xl p-4 mb-4 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-gray-800">每日提醒</p>
                <p className="text-xs text-gray-500">定时提醒你专注</p>
              </div>
            </div>
            <button
              onClick={() => setReminderEnabled(!reminderEnabled)}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                reminderEnabled ? 'bg-purple-600' : 'bg-gray-300'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${
                  reminderEnabled ? 'translate-x-6' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>

          {reminderEnabled && (
            <input
              type="time"
              value={reminderTime}
              onChange={(e) => setReminderTime(e.target.value)}
              className="w-full bg-gray-100 rounded-xl px-4 py-3 text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          )}
        </div>

        {/* 分享选项 */}
        <div className="bg-white rounded-2xl p-4 mb-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
              <Share2 className="w-5 h-5 text-green-600" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-gray-800">分享到社群</p>
              <p className="text-xs text-gray-500">让更多人看到你的创作</p>
            </div>
            <input type="checkbox" className="w-5 h-5 accent-purple-600" defaultChecked />
          </div>
        </div>

        {/* 创建按钮 */}
        <button
          onClick={handleSubmit}
          disabled={!uploadedImage || !themeName}
          className="w-full bg-purple-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-purple-200 hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          创建主题
        </button>

        {/* 提示 */}
        <p className="text-center text-gray-400 text-sm mt-4">
          创建的主题将在审核后公开显示
        </p>
      </div>

      {/* 底部留白 */}
      <div className="h-6" />
    </div>
  );
}
