'use client';

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { closeModal } from '@/store/uiSlice';
import { KPIAsset, LayoutAsset } from '@/types/asset';

export function AssetModal() {
  const dispatch = useDispatch();
  const { isModalOpen, selectedAsset } = useSelector((state: RootState) => state.ui);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requestReason, setRequestReason] = useState('');

  if (!isModalOpen || !selectedAsset) return null;

  const handleRequestSubmit = () => {
    if (!requestReason.trim()) return;

    setIsSubmitting(true);

    // Simulate API Call
    setTimeout(() => {
      console.log(`Access requested for ${selectedAsset.name} with reason: ${requestReason}`);
      setIsSubmitting(false);
      setRequestReason('');
      dispatch(closeModal());
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
      <div className="animate-in fade-in zoom-in-95 relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-y-auto rounded-xl bg-white shadow-2xl duration-200">
        <div className="flex items-start justify-between border-b border-slate-100 p-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{selectedAsset.name}</h2>
            <span className="mt-2 inline-block rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
              {selectedAsset.type}
            </span>
          </div>
          <button
            onClick={() => dispatch(closeModal())}
            className="rounded-full p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="p-6">
          <p className="mb-8 leading-relaxed text-slate-600">{selectedAsset.description}</p>

          {!selectedAsset.hasAccess ? (
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
              <h3 className="mb-2 font-semibold text-slate-900">Request Access</h3>
              <p className="mb-4 text-sm text-slate-500">
                You do not have authorization to view the underlying data for this layout. Please
                provide a business justification.
              </p>
              <textarea
                value={requestReason}
                onChange={(e) => setRequestReason(e.target.value)}
                disabled={isSubmitting}
                className="mb-4 w-full rounded-md border border-slate-300 p-3 text-sm focus:ring-2 focus:ring-slate-800 focus:outline-none disabled:opacity-50"
                rows={4}
                placeholder="Reason for access..."
              />
              <button
                onClick={handleRequestSubmit}
                disabled={isSubmitting || !requestReason.trim()}
                className="flex min-w-[140px] items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-800 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <svg
                    className="mr-2 -ml-1 h-4 w-4 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  'Submit Request'
                )}
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {selectedAsset.type === 'KPI' && (
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <h3 className="mb-3 text-xs font-bold tracking-wider text-slate-500 uppercase">
                      Business Questions
                    </h3>
                    <ul className="list-disc space-y-2 pl-5 text-sm text-slate-700">
                      {(selectedAsset as KPIAsset).businessQuestions.map((q, i) => (
                        <li key={i}>{q}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="mb-3 text-xs font-bold tracking-wider text-slate-500 uppercase">
                      Calculation
                    </h3>
                    <code className="block rounded-md border border-slate-200 bg-slate-100 p-3 font-mono text-sm text-slate-800">
                      {(selectedAsset as KPIAsset).calculation}
                    </code>
                  </div>
                </div>
              )}

              {selectedAsset.type === 'Layout' && (
                <div className="flex gap-12 rounded-lg border border-slate-100 bg-slate-50 p-6">
                  <div>
                    <span className="block text-3xl font-bold text-slate-900">
                      {(selectedAsset as LayoutAsset).amountOfPages}
                    </span>
                    <span className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                      Total Pages
                    </span>
                  </div>
                  <div>
                    <span className="block text-3xl font-bold text-slate-900">
                      {(selectedAsset as LayoutAsset).kpisUsed.length}
                    </span>
                    <span className="text-xs font-semibold tracking-wider text-slate-500 uppercase">
                      KPIs Tracked
                    </span>
                  </div>
                </div>
              )}

              <div className="mt-6 flex gap-3 border-t border-slate-100 pt-6">
                <button className="flex-1 rounded-md bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-slate-800">
                  Favorite Asset
                </button>
                <button className="flex-1 rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50">
                  Copy Link
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
