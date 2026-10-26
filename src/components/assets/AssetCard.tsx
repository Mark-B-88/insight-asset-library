"use client";

import { useDispatch } from "react-redux";
import { Asset } from "@/types/asset";
import { openModal } from "@/store/uiSlice";

interface AssetCardProps {
  asset: Asset;
}

export function AssetCard({ asset }: AssetCardProps) {
  const dispatch = useDispatch();

  return (
    <div 
      onClick={() => dispatch(openModal(asset))}
      className="flex items-start p-4 border border-slate-200 rounded-lg hover:border-slate-300 transition-colors cursor-pointer bg-slate-50/50 shadow-sm hover:shadow-md"
    >
      <div className="flex-shrink-0 mr-4 mt-1 bg-white border border-slate-200 p-2 rounded-md">
        <svg className="w-8 h-8 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
        </svg>
      </div>
      <div>
        <h3 className="text-sm font-semibold text-slate-900 mb-1">{asset.name}</h3>
        <p className="text-xs text-slate-500 line-clamp-2 mb-2">
          {asset.description}
        </p>
        <span className="text-[10px] text-slate-400">{asset.date}</span>
      </div>
    </div>
  );
}
