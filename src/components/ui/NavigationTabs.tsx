export function NavigationTabs() {
  return (
    <nav className="flex space-x-2 border-b border-slate-200 mb-10 pb-2">
      <button className="px-4 py-2 text-sm font-medium bg-slate-100 text-slate-900 rounded-md">
        Featured
      </button>
      <button className="px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-700">
        KPI
      </button>
      <button className="px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-700">
        Layouts
      </button>
      <button className="px-4 py-2 text-sm font-medium text-slate-500 hover:text-slate-700">
        Storyboards
      </button>
    </nav>
  );
}
