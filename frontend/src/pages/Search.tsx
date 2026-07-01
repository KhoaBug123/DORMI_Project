import { useState, useEffect } from 'react';
import { GlobalNav } from '../components/ui/GlobalNav';
import { LocalNav } from '../components/ui/LocalNav';
import { BentoCard } from '../components/ui/BentoCard';
import { AppleButton } from '../components/ui/AppleButton';
import { MapPin, MagnifyingGlass, SlidersHorizontal, X, MagnifyingGlassMinus } from '@phosphor-icons/react';

import { mockRooms, mockUniversities } from '../data/mockData';

export function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState(mockRooms);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      let filtered = [...mockRooms];
      
      if (searchQuery.trim().toLowerCase() !== 'empty' && searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().replace(/đ/g, 'd');
        filtered = mockRooms.filter(r => {
          const matchTitle = r.title.toLowerCase().replace(/đ/g, 'd').includes(query);
          const matchAddress = r.address.toLowerCase().replace(/đ/g, 'd').includes(query);
          const matchUni = r.nearbyUniversities?.some(nu => nu.toLowerCase().replace(/đ/g, 'd').includes(query));
          return matchTitle || matchAddress || matchUni;
        });
      }

      // Sorting logic
      if (sortBy === 'price_asc') {
        filtered = filtered.sort((a, b) => a.price - b.price);
      } else if (sortBy === 'price_desc') {
        filtered = filtered.sort((a, b) => b.price - a.price);
      } else if (sortBy === 'trust_desc') {
        filtered = filtered.sort((a, b) => b.trustScore - a.trustScore);
      } else if (sortBy === 'trust_asc') {
        filtered = filtered.sort((a, b) => a.trustScore - b.trustScore);
      }

      setResults(filtered);
      setIsLoading(false);
    }, 500); // Faster fake delay
    return () => clearTimeout(timer);
  }, [searchQuery, sortBy]);

  const filterItems = [
    { label: 'Tất cả phòng', path: '/search' },
    { label: 'Studio', path: '/search/studio' },
    { label: 'Căn hộ mini', path: '/search/apartment' },
    { label: 'Ký túc xá', path: '/search/dorm' },
  ];

  return (
    <div className="bg-background min-h-screen">
      <GlobalNav />
      <LocalNav 
        title="Khám phá phòng trọ" 
        items={filterItems} 
      />
      
      <main className="apple-container px-4 sm:px-6 pt-6 md:pt-8 pb-24">
        {/* Search Bar & Sort */}
        <div className="mb-8 md:mb-10 w-full flex flex-col md:flex-row items-center gap-4">
          <div className="relative flex flex-1 w-full max-w-[600px] items-center">
            <label htmlFor="searchInput" className="sr-only">Tìm kiếm</label>
            <MagnifyingGlass className="absolute left-4 h-5 w-5 text-neutral-500" />
            <input 
              id="searchInput"
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm quận, trường học, đường..."
              className="h-[50px] md:h-[56px] w-full rounded-full bg-white pl-11 md:pl-12 pr-20 md:pr-24 text-[15px] md:text-[17px] shadow-sm outline-none transition-all focus:ring-4 focus:ring-primary/20"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                aria-label="Xóa tìm kiếm"
                className="absolute right-12 text-neutral-500 hover:text-foreground p-1 transition-colors"
              >
                <X className="h-4 w-4 md:h-5 md:w-5" weight="bold" />
              </button>
            )}
            <button aria-label="Bộ lọc tìm kiếm" className="absolute right-3 md:right-4 text-neutral-500 hover:text-foreground transition-colors p-1">
              <SlidersHorizontal className="h-5 w-5" />
            </button>
          </div>
          
          <select 
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="h-[50px] md:h-[56px] w-full md:w-auto bg-white border border-gray-100 rounded-full md:rounded-lg px-4 outline-none focus:border-blue-500 shadow-sm text-[15px] font-medium"
          >
            <option value="newest">Mới nhất</option>
            <option value="price_asc">Giá thấp đến cao</option>
            <option value="price_desc">Giá cao đến thấp</option>
            <option value="trust_desc">Trust Score cao nhất</option>
            <option value="trust_asc">Trust Score thấp nhất</option>
          </select>
        </div>

        {/* Loading State / Skeleton UI */}
        {isLoading ? (
          <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <BentoCard key={i} noPadding className="bg-white flex flex-col h-[380px] md:h-[420px] animate-pulse">
                <div className="relative h-[200px] md:h-[220px] w-full bg-neutral-200"></div>
                <div className="flex flex-1 flex-col justify-between p-5 md:p-6">
                  <div>
                    <div className="h-3 w-16 bg-neutral-200 rounded-full mb-3"></div>
                    <div className="h-6 w-full bg-neutral-200 rounded-lg mb-2"></div>
                    <div className="h-4 w-2/3 bg-neutral-200 rounded-lg"></div>
                  </div>
                  <div className="flex items-center justify-between pt-4 mt-4 border-t border-neutral-100">
                    <div className="h-8 w-1/3 bg-neutral-200 rounded-lg"></div>
                    <div className="h-8 w-24 bg-neutral-200 rounded-full"></div>
                  </div>
                </div>
              </BentoCard>
            ))}
          </div>
        ) : results.length === 0 ? (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-16 md:py-20 text-center px-4">
            <div className="h-16 w-16 md:h-20 md:w-20 rounded-full bg-neutral-100 flex items-center justify-center text-neutral-400 mb-4">
              <MagnifyingGlassMinus className="w-8 h-8 md:w-10 md:h-10" />
            </div>
            <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">Không tìm thấy phòng trọ nào</h3>
            <p className="text-sm md:text-base text-neutral-500 max-w-md">Rất tiếc, không có kết quả nào phù hợp với tìm kiếm của bạn. Vui lòng thử lại bằng từ khóa khác.</p>
            <AppleButton className="mt-6" onClick={() => setSearchQuery('')}>Xóa tìm kiếm</AppleButton>
          </div>
        ) : (
          /* Results Grid */
          <>
            <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((room) => (
                <BentoCard key={room.id} noPadding hoverEffect className="bg-white flex flex-col h-[380px] md:h-[420px]">
                  <div className="relative h-[200px] md:h-[220px] w-full shrink-0 overflow-hidden bg-neutral-100">
                    <img 
                      src={room.images[0]} 
                      alt={room.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-md text-xs font-bold text-gray-900 shadow-sm">
                      {room.type}
                    </div>
                  </div>
                  <div className="p-4 sm:p-5 flex flex-col flex-1">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-bold text-gray-900 text-[15px] sm:text-base line-clamp-1">{room.title}</h3>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-500 text-xs sm:text-sm mb-3">
                      <MapPin className="w-4 h-4 shrink-0" />
                      <span className="line-clamp-1">{room.address}</span>
                    </div>

                    <div className="flex flex-col gap-1 mb-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider">Trust Score</span>
                        <span className="text-xs font-bold text-blue-600">{room.trustScore}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-neutral-100 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-blue-500 to-blue-400" style={{ width: `${room.trustScore}%` }}></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                      <span className="font-black text-blue-600 text-lg sm:text-xl">{room.price.toLocaleString('vi-VN')}đ</span>
                      <AppleButton variant="secondary" size="sm">Chi tiết</AppleButton>
                    </div>
                  </div>
                </BentoCard>
              ))}
            </div>
            
            {/* Pagination / Load More */}
            <div className="mt-8 md:mt-12 flex justify-center">
              <AppleButton variant="outline" size="lg" className="w-full sm:w-auto">Tải thêm kết quả</AppleButton>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
