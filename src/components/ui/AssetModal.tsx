"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { closeModal } from "@/store/uiSlice";
import { KPIAsset, LayoutAsset } from "@/types/asset";

export function AssetModal() {
  const dispatch = useDispatch();
  const { isModalOpen, selectedAsset } = useSelector((state: RootState) => state.ui);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [requestReason, setRequestReason] = useState("");

  if (!isModalOpen || !selectedAsset) return null;

  const handleRequestSubmit = () => {
    if (!requestReason.trim()) return;
    
    setIsSubmitting(true);
    
    // Simulate API Call
    setTimeout(() => {
      console.log(`Access requested for ${selectedAsset.name} with reason: ${requestReason}`);
      setIsSubmitting(false);
      setRequestReason("");
      dispatch(closeModal());
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col relative animate-in fade-in zoom-in-95 duration-200">
        
        <div className="flex justify-between items-start p-6 border-b border-slate-100">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{selectedAsset.name}</h2>
            <span className="inline-block mt-2 px-2.5 py-1 text-xs font-semibold bg-slate-100 text-slate-600 rounded-full">
              {selectedAsset.type}
            </span>
          </div>
          <button 
            onClick={() => dispatch(closeModal())} 
            className="text-slate-400 hover:text-slate-700 transition-colors p-1 rounded-full hover:bg-slate-100"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          <p className="text-slate-600 mb-8 leading-relaxed">{selectedAsset.description}</p>

          {!selectedAsset.hasAccess ? (
            <div className="bg-slate-50 p-5 rounded-lg border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-2">Request Access</h3>
              <p className="text-sm text-slate-500 mb-4">
                You do not have authorization to view the underlying data for this layout. Please provide a business justification.
              </p>
              <textarea 
                value={requestReason}
                onChange={(e) => setRequestReason(e.target.value)}
                disabled={isSubmitting}
                className="w-full p-3 border border-slate-300 rounded-md mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-slate-800 disabled:opacity-50"
                rows={4} 
                placeholder="Reason for access..."
              />
              <button 
                onClick={handleRequestSubmit}
                disabled={isSubmitting || !requestReason.trim()}
                className="bg-slate-900 text-white px-5 py-2.5 rounded-md text-sm font-medium hover:bg-slate-800 transition-colors disabled:opacity-50 flex items-center justify-center min-w-[140px]"
              >
                {isSubmitting ? (
                   <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                   </svg>
                ) : "Submit Request"}
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              
              {selectedAsset.type === 'KPI' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Business Questions</h3>
                    <ul className="list-disc pl-5 text-sm text-slate-700 space-y-2">
                      {(selectedAsset as KPIAsset).businessQuestions.map((q, i) => <li key={i}>{q}</li>)}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">Calculation</h3>
                    <code className="block bg-slate-100 p-3 rounded-md border border-slate-200 text-sm text-slate-800 font-mono">
                      {(selectedAsset as KPIAsset).calculation}
                    </code>
                  </div>
                </div>
              )}

              {selectedAsset.type === 'Layout' && (
                <div className="flex gap-12 bg-slate-50 p-6 rounded-lg border border-slate-100">
                  <div>
                    <span className="block text-3xl font-bold text-slate-900">{(selectedAsset as LayoutAsset).amountOfPages}</span>
                    <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Total Pages</span>
                  </div>
                  <div>
                    <span className="block text-3xl font-bold text-slate-900">{(selectedAsset as LayoutAsset).kpisUsed.length}</span>
                    <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">KPIs Tracked</span>
                  </div>
                </div>
              )}

              <div className="pt-6 mt-6 border-t border-slate-100 flex gap-3">
                <button className="flex-1 bg-slate-900 text-white px-4 py-2.5 rounded-md text-sm font-medium hover:bg-slate-800 transition-colors">
                  Favorite Asset
                </button>
                <button className="flex-1 bg-white border border-slate-300 text-slate-700 px-4 py-2.5 rounded-md text-sm font-medium hover:bg-slate-50 transition-colors">
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
