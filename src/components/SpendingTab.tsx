import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight, 
  PieChart, 
  Layers,
  Sparkles,
  ExternalLink,
  Users
} from 'lucide-react';
import { UK_SPENDING_DATA, UK_FISCAL_TOTALS, SpendingItem } from '../data/ukBudgetData';
import { IconHelper } from './IconHelper';

interface SpendingTabProps {
  selectedItem: SpendingItem | null;
  setSelectedItem: (item: SpendingItem | null) => void;
}

export const SpendingTab: React.FC<SpendingTabProps> = ({ selectedItem, setSelectedItem }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [delAmeFilter, setDelAmeFilter] = useState<'All' | 'DEL' | 'AME'>('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const categories = ['All', 'Public Services', 'Welfare & Benefits', 'Infrastructure', 'Economy', 'Administration', 'Environment'];

  const filteredItems = UK_SPENDING_DATA.filter((item) => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.breakdown.some(b => b.name.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
    const matchesDelAme = true; // COFOG does not classify spending as DEL or AME

    return matchesSearch && matchesCategory && matchesDelAme;
  });

  const totalFilteredAmount = filteredItems.reduce((acc, curr) => acc + curr.amount, 0);

  const toggleExpand = (id: string) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold border border-blue-500/20">
            <PieChart className="w-3.5 h-3.5" />
            HM Treasury Functional Expenditure · 2024/25 (COFOG)
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            UK Spending by Function · Treasury expenditure on services
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
            These ten functions are HM Treasury's official 2024/25 categories, reported to one decimal place. They sum to £1,167.6bn before EU transactions; the Treasury expenditure-on-services total is £1,166.3bn and TME is £1,290.6bn. ONS TME is £1,290.3bn on its October 2026 vintage. No fabricated programme-level splits are shown.
          </p>
        </div>

        {/* DEL vs AME Explainer Pill */}
        <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80 text-xs space-y-1 max-w-sm">
          <div className="flex items-center gap-1.5 font-semibold text-slate-200">
            <Layers className="w-3.5 h-3.5 text-blue-400" />
            <span>Classification note:</span>
          </div>
          <p className="text-slate-400 text-[11px] leading-relaxed">
            The ten categories are functional expenditure (COFOG). They do not map directly to the separate DEL/AME budgeting system. Debt interest is included within public services classifications, rather than shown again as an extra function.
          </p>
        </div>
      </div>

      {/* Controls Bar: Search + Category + DEL/AME Filter */}
      <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between p-4 rounded-xl bg-slate-900/70 border border-slate-800">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search departments, services (e.g., NHS, Pensions, Police)..."
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-slate-950 border border-slate-800 focus:border-blue-500 focus:outline-none text-xs sm:text-sm text-slate-100 placeholder-slate-500 transition-colors"
          />
        </div>

        {/* Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                categoryFilter === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Filter summary status */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <span>
          Showing <strong>{filteredItems.length}</strong> spending sectors (Total:{' '}
          <strong className="text-white">£{totalFilteredAmount.toFixed(1)}bn</strong> /{' '}
          <strong className="text-blue-400">{((totalFilteredAmount / UK_FISCAL_TOTALS.totalSpending) * 100).toFixed(1)}%</strong> of ONS 2024/25 TME; categories are Treasury TES functions)
        </span>
        {searchTerm && (
          <button 
            onClick={() => { setSearchTerm(''); setCategoryFilter('All'); setDelAmeFilter('All'); }}
            className="text-blue-400 hover:underline"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Spending Sectors List */}
      <div className="space-y-4">
        {filteredItems.map((item) => {
          const isExpanded = expandedId === item.id;
          return (
            <div
              key={item.id}
              className="rounded-xl bg-slate-900/90 border border-slate-800 overflow-hidden hover:border-slate-700 transition-all shadow-md"
            >
              {/* Primary Card Row */}
              <div 
                className="p-5 cursor-pointer flex flex-col md:flex-row md:items-center justify-between gap-4"
                onClick={() => toggleExpand(item.id)}
              >
                {/* Left: Icon, Name & Category */}
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-white shrink-0 shadow-lg mt-0.5"
                    style={{ backgroundColor: `${item.color}25`, color: item.color }}
                  >
                    <IconHelper name={item.icon} className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base font-bold text-white hover:text-blue-400 transition-colors">
                        {item.name}
                      </h3>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                        {item.category}
                      </span>
                      <span 
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                          item.delVsAme === 'AME' 
                            ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' 
                            : item.delVsAme === 'DEL'
                            ? 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                            : 'bg-purple-500/10 text-purple-400 border-purple-500/30'
                        }`}
                      >
                        {item.delVsAme}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-400 max-w-2xl leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Right: Amounts & Toggle */}
                <div className="flex items-center justify-between md:justify-end gap-6 border-t md:border-t-0 pt-3 md:pt-0 border-slate-800">
                  <div className="text-left md:text-right">
                    <div className="text-xl font-extrabold text-white">
                      £{item.amount.toFixed(1)}bn
                    </div>
                    <div className="flex items-center md:justify-end gap-2 text-xs">
                      <span className="font-semibold" style={{ color: item.color }}>
                        {item.percentage}%
                      </span>
                      <span className="text-slate-500">•</span>
                      <span className="text-slate-400">£{item.perCapita.toLocaleString()} / person</span>
                    </div>
                  </div>

                  <button
                    className="p-2 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
                    aria-label={isExpanded ? 'Collapse' : 'Expand'}
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Progress Bar of total budget */}
              <div className="h-1.5 w-full bg-slate-950">
                <div
                  className="h-full transition-all duration-300"
                  style={{ width: `${item.percentage}%`, backgroundColor: item.color }}
                />
              </div>

              {/* Expanded Breakdown Drawer */}
              {isExpanded && (
                <div className="p-5 bg-slate-950/80 border-t border-slate-800/80 space-y-5 animate-fadeIn">
                  {/* Sub-item breakdowns */}
                  <div>
                    <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                      Sub-programme breakdown
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {item.breakdown.length === 0 && <p className="text-xs text-slate-400">Official programme-level allocations are not available in this dataset. No estimated amounts are presented.</p>}
                      {item.breakdown.map((sub, idx) => (
                        <div
                          key={idx}
                          className="p-3.5 rounded-lg bg-slate-900 border border-slate-800/80 flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-semibold text-slate-200">{sub.name}</span>
                              <span className="text-xs font-bold text-white bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                                £{sub.amount.toFixed(1)}bn
                              </span>
                            </div>
                            <p className="mt-1.5 text-[11px] text-slate-400 leading-relaxed">
                              {sub.description}
                            </p>
                          </div>
                          {/* Mini share of this sector */}
                          <div className="mt-2.5 flex items-center gap-2 text-[10px] text-slate-500">
                            <div className="flex-1 h-1 bg-slate-800 rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full"
                                style={{
                                  width: `${(sub.amount / item.amount) * 100}%`,
                                  backgroundColor: item.color
                                }}
                              />
                            </div>
                            <span>{((sub.amount / item.amount) * 100).toFixed(0)}% of sector</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Key policy facts */}
                  <div className="p-4 rounded-lg bg-blue-950/20 border border-blue-900/40 space-y-2">
                    <h4 className="text-xs font-bold text-blue-300 uppercase tracking-wide">
                      Key Policy & Economic Insights:
                    </h4>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {item.keyFacts.map((fact, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2">
                          <span className="text-blue-400 mt-1">•</span>
                          <span>{fact}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action row */}
                  <div className="flex justify-end gap-3 pt-2">
                    <button
                      onClick={() => setSelectedItem(item)}
                      className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium transition-colors flex items-center gap-1.5"
                    >
                      <span>Deep Dive Modal View</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12 p-8 rounded-2xl bg-slate-900 border border-slate-800 text-slate-400 space-y-3">
          <p className="text-base font-semibold text-slate-300">No public spending categories found matching your query.</p>
          <button
            onClick={() => { setSearchTerm(''); setCategoryFilter('All'); setDelAmeFilter('All'); }}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white text-xs font-medium"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

