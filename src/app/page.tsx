"use client";

import { GlobalRequestModal } from "@/components/ui/GlobalRequestModal";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { Header } from "@/components/layout/Header";
import { SearchBar } from "@/components/ui/SearchBar";
import { NavigationTabs } from "@/components/ui/NavigationTabs";
import { AssetSection } from "@/components/assets/AssetSection";
import { AssetModal } from "@/components/ui/AssetModal";
import { mockAssets } from "@/data/mockAssets";

export default function LibraryPage() {
  const { searchQuery, activeTab } = useSelector((state: RootState) => state.ui);

  const filteredAssets = mockAssets.filter((asset) => {
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

  // Separate by default categories when no strict filter is applied
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

        {isDefaultView ? (
          <>
            <AssetSection
              title="Featured"
              subtitle="Curated top picks from this week"
              assets={featuredAssets}
            />
            <AssetSection
              title="Trending"
              subtitle="Most popular by community"
              assets={trendingAssets}
            />
          </>
        ) : (
          <AssetSection
            title="Search Results"
            subtitle={`Showing results for ${activeTab !== "Featured" ? activeTab : "all assets"}`}
            assets={filteredAssets}
          />
        )}
        
        {filteredAssets.length === 0 && (
          <div className="text-center py-12 text-slate-500">
            No assets found matching your criteria.
          </div>
        )}
      </main>
    </div>
  );
}
