export function Header() {
  return (
    <header className="flex justify-between items-start mb-8">
      <div className="text-center w-full relative">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Library</h1>
        <p className="text-slate-500 text-sm">
          Browse for assets needed to report and present analysis.
        </p>
        <button className="absolute top-0 right-0 bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium py-2 px-4 rounded-md transition-colors">
          + Request
        </button>
      </div>
    </header>
  );
}
