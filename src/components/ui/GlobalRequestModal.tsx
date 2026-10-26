"use client";

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { closeGlobalRequestModal } from "@/store/uiSlice";

export function GlobalRequestModal() {
  const dispatch = useDispatch();
  const { isGlobalRequestModalOpen } = useSelector((state: RootState) => state.ui);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    type: "KPI",
    name: "",
    justification: ""
  });

  if (!isGlobalRequestModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call to ticketing system
    setTimeout(() => {
      console.log("New Asset Request Submitted:", formData);
      setIsSubmitting(false);
      setFormData({ type: "KPI", name: "", justification: "" });
      dispatch(closeGlobalRequestModal());
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg relative animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
        
        <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Request New Asset</h2>
            <p className="text-xs text-slate-500 mt-1">Submit a request to the data engineering team.</p>
          </div>
          <button 
            onClick={() => dispatch(closeGlobalRequestModal())} 
            className="text-slate-400 hover:text-slate-700 transition-colors p-1 rounded-full hover:bg-slate-200"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Asset Type</label>
            <select 
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full p-2.5 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-slate-800 bg-white"
            >
              <option value="KPI">KPI</option>
              <option value="Layout">Layout</option>
              <option value="Storyboard">Storyboard</option>
              <option value="Data viz">Data Visualization</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Proposed Name</label>
            <input 
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full p-2.5 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-slate-800"
              placeholder="e.g., Regional Sales Layout"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Business Justification & Requirements</label>
            <textarea 
              required
              value={formData.justification}
              onChange={(e) => setFormData({ ...formData, justification: e.target.value })}
              className="w-full p-3 border border-slate-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-slate-800"
              rows={4} 
              placeholder="Describe what data you need and why it's missing from the current library..."
            />
          </div>

          <div className="pt-4 flex justify-end gap-3 border-t border-slate-100">
            <button 
              type="button"
              onClick={() => dispatch(closeGlobalRequestModal())}
              className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              disabled={isSubmitting || !formData.name || !formData.justification}
              className="bg-slate-900 text-white px-5 py-2 rounded-md text-sm font-medium hover:bg-slate-800 transition-colors disabled:opacity-50 flex items-center min-w-[120px] justify-center"
            >
              {isSubmitting ? (
                 <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                 </svg>
              ) : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
