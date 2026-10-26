'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { setSearchQuery } from '@/store/uiSlice';

export function SearchBar() {
  const dispatch = useDispatch();
  const searchQuery = useSelector((state: RootState) => state.ui.searchQuery);

  return (
    <div className="relative mb-6">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <svg
          className="h-5 w-5 text-slate-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        className="block w-full rounded-md border border-slate-300 bg-white py-2 pr-3 pl-10 leading-5 placeholder-slate-500 focus:border-slate-500 focus:ring-1 focus:ring-slate-500 focus:outline-none sm:text-sm"
        placeholder="Type to search..."
      />
    </div>
  );
}
