export type AssetType = 'KPI' | 'Layout' | 'Data viz' | 'Storyboard';

export interface BaseAsset {
  id: string;
  name: string;
  description: string;
  type: AssetType;
  date: string;
  isFeatured?: boolean;
  isTrending?: boolean;
  hasAccess: boolean;
}

export interface KPIAsset extends BaseAsset {
  type: 'KPI';
  businessQuestions: string[];
  metricIds: string[];
  calculation: string;
  visualsAvailable: string[];
  affiliateApplicability: string[];
}

export interface LayoutAsset extends BaseAsset {
  type: 'Layout';
  amountOfPages: number;
  kpisUsed: string[];
}

export interface StoryboardAsset extends BaseAsset {
  type: 'Storyboard';
  coupledKpisFilters: string[];
  applicableAffiliates: string[];
}

export interface DataVizAsset extends BaseAsset {
  type: 'Data viz';
  applicableKpiFavorites: string[];
  assetInfoContext: string;
}

export type Asset = KPIAsset | LayoutAsset | StoryboardAsset | DataVizAsset;
