import { Header } from "@/components/layout/Header";
import { SearchBar } from "@/components/ui/SearchBar";
import { NavigationTabs } from "@/components/ui/NavigationTabs";
import { AssetSection } from "@/components/assets/AssetSection";
import { mockAssets } from "@/data/mockAssets";
import { AssetModal } from "@/components/ui/AssetModal";

export default function LibraryPage() {
  const featuredAssets = mockAssets.filter(asset => asset.isFeatured);
  const trendingAssets = mockAssets.filter(asset => asset.isTrending);

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-12 font-sans text-slate-900 flex justify-center">
      <AssetModal />
      <main className="w-full max-w-5xl bg-white rounded-2xl shadow-sm border border-slate-200 p-8 md:p-12">
        <Header />
        <SearchBar />
        <NavigationTabs />
        
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
      </main>
    </div>
  );
}
