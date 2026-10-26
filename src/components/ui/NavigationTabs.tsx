'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { setActiveTab } from '@/store/uiSlice';

export function NavigationTabs() {
  const dispatch = useDispatch();
  const activeTab = useSelector((state: RootState) => state.ui.activeTab);

  const tabs = ['Featured', 'KPI', 'Layouts', 'Storyboards'];

  return (
    <nav className="mb-10 flex space-x-2 border-b border-slate-200 pb-2">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => dispatch(setActiveTab(tab))}
          className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === tab
              ? 'bg-slate-100 text-slate-900'
              : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
          }`}
        >
          {tab}
        </button>
      ))}
    </nav>
  );
}
