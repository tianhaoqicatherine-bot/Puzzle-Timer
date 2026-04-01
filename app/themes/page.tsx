'use client';

import { useState } from 'react';
import { useApp } from '@/app/context/AppContext';
import { ArrowLeft, Search, Filter, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const mockThemes = [
  {
    id: 'cat',
    name: '可爱猫咪',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=crop',
    category: '动物',
    totalPieces: 4,
    completedCount: 1234,
  },
  {
    id: 'dog',
    name: '萌宠狗狗',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop',
    category: '动物',
    totalPieces: 4,
    completedCount: 987,
  },
  {
    id: 'landscape',
    name: '山水风景',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
    category: '自然',
    totalPieces: 9,
    completedCount: 2341,
  },
  {
    id: 'space',
    name: '太空探索',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400&h=400&fit=crop',
    category: '科幻',
    totalPieces: 9,
    completedCount: 1567,
  },
  {
    id: 'flower',
    name: '春日花卉',
    image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=400&fit=crop',
    category: '植物',
    totalPieces: 4,
    completedCount: 876,
  },
  {
    id: 'city',
    name: '城市夜景',
    image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=400&h=400&fit=crop',
    category: '建筑',
    totalPieces: 16,
    completedCount: 3421,
  },
];

const categories = ['全部', '动物', '自然', '科幻', '植物', '建筑', '动漫', '游戏'];

export default function Themes() {
  const router = useRouter();
  const { selectTheme } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [pieceFilter, setPieceFilter] = useState(50);

  const filteredThemes = mockThemes.filter((theme) => {
    const matchesSearch = theme.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === '全部' || theme.category === selectedCategory;
    const matchesPieces = theme.totalPieces <= pieceFilter;
    return matchesSearch && matchesCategory && matchesPieces;
  });

  const handleSelectTheme = (theme: typeof mockThemes[0]) => {
    selectTheme(theme as any);
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-purple-600 text-white p-6 sticky top-0 z-10">
        <div className="flex items-center gap-4 mb-4">
          <Link href="/">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold">发现主题</h1>
        </div>

        {/* 搜索框 */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="搜索拼图主题..."
            className="w-full bg-white rounded-xl pl-12 pr-4 py-3 text-gray-800 placeholder-gray-400 focus:outline-none"
          />
        </div>
      </div>

      {/* 分类筛选 */}
      <div className="bg-white p-4 border-b border-gray-100">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* 拼图数量筛选 */}
      <div className="bg-white px-4 py-3 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <Filter className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">拼图块数:</span>
          <input
            type="range"
            min="4"
            max="100"
            step="1"
            value={pieceFilter}
            onChange={(e) => setPieceFilter(parseInt(e.target.value))}
            className="flex-1 accent-purple-600"
          />
          <span className="text-sm font-medium text-purple-600 w-10 text-right">{pieceFilter}</span>
        </div>
      </div>

      {/* 主题列表 */}
      <div className="p-4">
        <div className="space-y-4">
          {filteredThemes.map((theme) => (
            <div
              key={theme.id}
              onClick={() => handleSelectTheme(theme)}
              className="bg-white rounded-2xl p-4 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="flex gap-4">
                {/* 主题图片 */}
                <div
                  className="w-24 h-24 rounded-xl bg-cover bg-center flex-shrink-0"
                  style={{ backgroundImage: `url(${theme.image})` }}
                />

                {/* 主题信息 */}
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-bold text-gray-800">{theme.name}</h3>
                      <span className="inline-block mt-1 px-2 py-0.5 bg-purple-100 text-purple-600 text-xs rounded-full">
                        {theme.category}
                      </span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-300" />
                  </div>

                  <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                    <span>{theme.totalPieces} 块拼图</span>
                    <span>|</span>
                    <span>{theme.completedCount} 人已集齐</span>
                  </div>

                  {/* 进度条模拟 */}
                  <div className="mt-3">
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 rounded-full" style={{ width: '0%' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 空状态 */}
        {filteredThemes.length === 0 && (
          <div className="text-center py-12">
            <span className="text-4xl mb-4 block">🔍</span>
            <p className="text-gray-500">没有找到符合条件的主题</p>
            <p className="text-sm text-gray-400 mt-2">试试调整筛选条件</p>
          </div>
        )}
      </div>

      {/* 底部留白 */}
      <div className="h-6" />
    </div>
  );
}
