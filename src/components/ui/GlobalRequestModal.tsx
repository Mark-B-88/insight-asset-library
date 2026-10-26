'use client';

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/store/store';
import { closeGlobalRequestModal } from '@/store/uiSlice';

export function GlobalRequestModal() {
  const dispatch = useDispatch();
  const { isGlobalRequestModalOpen } = useSelector((state: RootState) => state.ui);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    type: 'KPI',
    name: '',
    justification: '',
  });

  if (!isGlobalRequestModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call to ticketing system
    setTimeout(() => {
      console.log('New Asset Request Submitted:', formData);
      setIsSubmitting(false);
      setFormData({ type: 'KPI', name: '', justification: '' });
      dispatch(closeGlobalRequestModal());
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
      <div className="animate-in fade-in zoom-in-95 relative w-full max-w-lg overflow-hidden rounded-xl bg-white shadow-2xl duration-200">
        <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 p-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Request New Asset</h2>
            <p className="mt-1 text-xs text-slate-500">
              Submit a request to the data engineering team.
            </p>
          </div>
          <button
            onClick={() => dispatch(closeGlobalRequestModal())}
            className="rounded-full p-1 text-slate-400 transition-colors hover:bg-slate-200 hover:text-slate-700"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">Asset Type</label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full rounded-md border border-slate-300 bg-white p-2.5 text-sm focus:ring-2 focus:ring-slate-800 focus:outline-none"
            >
              <option value="KPI">KPI</option>
              <option value="Layout">Layout</option>
              <option value="Storyboard">Storyboard</option>
              <option value="Data viz">Data Visualization</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">Proposed Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full rounded-md border border-slate-300 p-2.5 text-sm focus:ring-2 focus:ring-slate-800 focus:outline-none"
              placeholder="e.g., Regional Sales Layout"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-700">
              Business Justification & Requirements
            </label>
            <textarea
              required
              value={formData.justification}
              onChange={(e) => setFormData({ ...formData, justification: e.target.value })}
              className="w-full rounded-md border border-slate-300 p-3 text-sm focus:ring-2 focus:ring-slate-800 focus:outline-none"
              rows={4}
              placeholder="Describe what data you need and why it's missing from the current library..."
            />
          </div>

          <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
            <button
              type="button"
              onClick={() => dispatch(closeGlobalRequestModal())}
              className="px-4 py-2 text-sm font-medium text-slate-600 transition-colors hover:text-slate-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !formData.name || !formData.justification}
              className="flex min-w-[120px] items-center justify-center rounded-md bg-slate-900 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800 disabled:opacity-50"
            >
              {isSubmitting ? (
                <svg
                  className="h-4 w-4 animate-spin text-white"
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
                'Submit'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
