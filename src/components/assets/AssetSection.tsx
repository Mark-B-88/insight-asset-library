import { AssetCard } from "./AssetCard";

interface AssetSectionProps {
  title: string;
  subtitle: string;
}

export function AssetSection({ title, subtitle }: AssetSectionProps) {
  return (
    <section className="mb-12 last:mb-0">
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-1">{title}</h2>
        <p className="text-sm text-slate-500">{subtitle}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AssetCard />
        <AssetCard />
        <AssetCard />
        <AssetCard />
      </div>
    </section>
  );
}
