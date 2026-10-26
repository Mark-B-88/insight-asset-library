'use client';

import { useDispatch } from 'react-redux';
import { Asset } from '@/types/asset';
import { openModal } from '@/store/uiSlice';

interface AssetCardProps {
  asset: Asset;
}

export function AssetCard({ asset }: AssetCardProps) {
  const dispatch = useDispatch();

  return (
    <div
      onClick={() => dispatch(openModal(asset))}
      className="flex cursor-pointer items-start rounded-lg border border-slate-200 bg-slate-50/50 p-4 shadow-sm transition-colors hover:border-slate-300 hover:shadow-md"
    >
      <div className="mt-1 mr-4 flex-shrink-0 rounded-md border border-slate-200 bg-white p-2">
        <svg
          className="h-8 w-8 text-slate-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
          />
        </svg>
      </div>
      <div>
        <h3 className="mb-1 text-sm font-semibold text-slate-900">{asset.name}</h3>
        <p className="mb-2 line-clamp-2 text-xs text-slate-500">{asset.description}</p>
        <span className="text-[10px] text-slate-400">{asset.date}</span>
      </div>
    </div>
  );
}
