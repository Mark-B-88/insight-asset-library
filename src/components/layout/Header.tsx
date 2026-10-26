'use client';

import { useDispatch } from 'react-redux';
import { openGlobalRequestModal } from '@/store/uiSlice';

export function Header() {
  const dispatch = useDispatch();

  return (
    <header className="mb-8 flex items-start justify-between">
      <div className="relative w-full text-center">
        <h1 className="mb-2 text-3xl font-bold tracking-tight">Library</h1>
        <p className="text-sm text-slate-500">
          Browse for assets needed to report and present analysis.
        </p>
        <button
          onClick={() => dispatch(openGlobalRequestModal())}
          className="absolute top-0 right-0 rounded-md bg-slate-800 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-slate-700"
        >
          + Request
        </button>
      </div>
    </header>
  );
}
