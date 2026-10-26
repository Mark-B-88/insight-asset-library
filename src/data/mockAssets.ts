import { Asset } from "../types/asset";

export const mockAssets: Asset[] = [
  {
    id: "kpi-1",
    name: "Market Share Growth",
    description: "Tracks the quarter-over-quarter growth in market share across key regions.",
    type: "KPI",
    date: "06/27/2024",
    isFeatured: true,
    hasAccess: true,
    businessQuestions: ["Are we gaining ground against competitors?"],
    metricIds: ["M-101", "M-102"],
    calculation: "(Current Qtr - Prev Qtr) / Prev Qtr",
    visualsAvailable: ["Bar Chart", "Line Graph"],
    affiliateApplicability: ["North America", "EMEA"]
  },
  {
    id: "layout-1",
    name: "INTES Layout",
    description: "These options are already baked in with this model shoot me an email clear blue water...",
    type: "Layout",
    date: "07/23/2024",
    isFeatured: true,
    hasAccess: true,
    amountOfPages: 6,
    kpisUsed: ["Market Share Growth", "Patient Retention"]
  },
  {
    id: "storyboard-1",
    name: "Q3 Executive Summary",
    description: "High-level overview of quarterly performance metrics for regional directors.",
    type: "Storyboard",
    date: "06/25/2024",
    isFeatured: false,
    isTrending: true,
    hasAccess: false,
    coupledKpisFilters: ["Region", "Therapeutic Area"],
    applicableAffiliates: ["Global"]
  },
  {
    id: "viz-1",
    name: "Regional Adoption Heatmap",
    description: "Geographic distribution of new product adoption rates.",
    type: "Data viz",
    date: "06/20/2024",
    isTrending: true,
    hasAccess: true,
    applicableKpiFavorites: ["Adoption Rate"],
    assetInfoContext: "Sourced from CRM field data."
  }
];
