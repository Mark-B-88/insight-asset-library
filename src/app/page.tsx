"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { fetchAssets } from "@/store/uiSlice";
import { Header } from "@/components/layout/Header";
import { SearchBar } from "@/components/ui/SearchBar";
import { NavigationTabs } from "@/components/ui/NavigationTabs";
import { AssetSection } from "@/components/assets/AssetSection";
import { AssetModal } from "@/components/ui/AssetModal";
import { GlobalRequestModal } from "@/components/ui/GlobalRequestModal";

export default function LibraryPage() {
  const dispatch = useDispatch<AppDispatch>();
  const { 
    assets, 
    isLoading, 
    searchQuery, 
    activeTab 
  } = useSelector((state: RootState) => state.ui);

  useEffect(() => {
    dispatch(fetchAssets());
  }, [dispatch]);

  const filteredAssets = assets.filter((asset) => {
    const matchesSearch =
      asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      asset.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTab =
      activeTab === "Featured" ? true :
      activeTab === "KPI" ? asset.type === "KPI" :
      activeTab === "Layouts" ? asset.type === "Layout" :
      activeTab === "Storyboards" ? asset.type === "Storyboard" : true;

    return matchesSearch && matchesTab;
  });

  const isDefaultView = activeTab === "Featured" && searchQuery.trim() === "";
  const featuredAssets = filteredAssets.filter((asset) => asset.isFeatured);
  const trendingAssets = filteredAssets.filter((asset) => asset.isTrending);

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 font-sans text-slate-900 flex justify-center">
      <AssetModal />
      <GlobalRequestModal />
      <main className="w-full max-w-5xl bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12">
        <Header />
        <SearchBar />
        <NavigationTabs />

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <svg className="animate-spin h-8 w-8 text-slate-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : (
          <>
            {isDefaultView ? (
              <>
                <AssetSection title="Featured" subtitle="Curated top picks from this week" assets={featuredAssets} />
                <AssetSection title="Trending" subtitle="Most popular by community" assets={trendingAssets} />
              </>
            ) : (
              <AssetSection title="Search Results" subtitle={`Showing results for ${activeTab !== "Featured" ? activeTab : "all assets"}`} assets={filteredAssets} />
            )}
            
            {filteredAssets.length === 0 && (
              <div className="text-center py-12 text-slate-500">
                No assets found matching your criteria.
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
