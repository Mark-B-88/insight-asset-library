import { AssetCard } from './AssetCard';
import { Asset } from '@/types/asset';

interface AssetSectionProps {
  title: string;
  subtitle: string;
  assets: Asset[];
}

export function AssetSection({ title, subtitle, assets }: AssetSectionProps) {
  if (assets.length === 0) return null;

  return (
    <section className="mb-12 last:mb-0">
      <div className="mb-6">
        <h2 className="mb-1 text-xl font-semibold">{title}</h2>
        <p className="text-sm text-slate-500">{subtitle}</p>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {assets.map((asset) => (
          <AssetCard key={asset.id} asset={asset} />
        ))}
      </div>
    </section>
  );
}
