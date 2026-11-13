import React, { useState } from 'react';
import { 
  Coins, 
  Search, 
  TrendingUp, 
  AlertCircle, 
  Info, 
  ArrowRight,
  ShieldCheck,
  Building,
  Zap
} from 'lucide-react';
import { UK_REVENUE_DATA, UK_FISCAL_TOTALS, HMRC_REVENUE_TOTAL_2024_25, HMRC_REVENUE_TOTAL_2025_26, RevenueItem } from '../data/ukBudgetData';

export const RevenueTab: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Direct Taxes', 'Indirect Taxes', 'Capital & Business Taxes', 'Duties & Levies', 'Other'];

  const filteredItems = UK_REVENUE_DATA.filter((item) => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.details.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
            <Coins className="w-3.5 h-3.5" />
            HMRC Tax Revenues · 2024/25 Outturn
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            HMRC Reported £{HMRC_REVENUE_TOTAL_2024_25.toFixed(1)}bn in 2024/25
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
            HMRC's 2025/26 Trust Statement restated the 2024/25 total. The seven groups below show 2024/25 on an accrual basis. HMRC reported £{HMRC_REVENUE_TOTAL_2025_26.toFixed(1)}bn for 2025/26. The ONS measure of £{UK_FISCAL_TOTALS.totalReceipts.toFixed(1)}bn covers public-sector current receipts for 2024/25.
          </p>
        </div>

        {/* Total Receipts Pill */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-left md:text-right shrink-0">
          <div className="text-xs text-slate-400 font-medium">Total HMRC Revenue</div>
          <div className="text-2xl font-black text-emerald-400">£{HMRC_REVENUE_TOTAL_2024_25.toFixed(1)}bn</div>
          <div className="text-[11px] text-slate-500">HMRC 2025/26 Trust Statement · restated 2024/25</div>
          <div className="mt-3 border-t border-slate-800 pt-3">
            <div className="text-sm font-semibold text-slate-200">
              £{(HMRC_REVENUE_TOTAL_2024_25 * 1000 / UK_FISCAL_TOTALS.population).toLocaleString('en-GB', { maximumFractionDigits: 0 })} per UK resident
            </div>
            <p className="mt-1 text-[11px] text-slate-400">
              Restated 2024/25 HMRC revenue divided by the revised ONS mid-2024 UK population of {UK_FISCAL_TOTALS.population.toFixed(2)} million. This average includes revenue from businesses and divides it across all residents, including children.
            </p>
          </div>
        </div>
      </div>

      {/* Fiscal Drag Spotlight Notice */}
      <div className="p-5 rounded-xl bg-gradient-to-r from-amber-950/30 via-slate-900 to-slate-900 border border-amber-900/40 flex items-start gap-3.5">
        <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
          <Zap className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-bold text-amber-300">The Power of "Fiscal Drag": Stealth Tax Increases</h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            Personal tax allowances (the £12,570 tax-free allowance and £50,270 higher rate band) have remained frozen in cash terms 
            since 2021. As nominal wages rise to meet inflation, millions of workers are dragged into higher tax brackets. 
            The OBR regularly quantifies the effect of frozen thresholds in its forecasts. The revenue effect depends on the forecast period and baseline; no fixed annual figure is asserted here.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between p-4 rounded-xl bg-slate-900/70 border border-slate-800">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search taxes (e.g. VAT, Corporation Tax, Fuel Duty)..."
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:outline-none text-xs sm:text-sm text-slate-100 placeholder-slate-500"
          />
        </div>

        {/* Categories */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Revenue Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className={`p-5 rounded-xl bg-slate-900/90 border transition-all shadow-md flex flex-col justify-between ${
              item.id === 'borrowing-shortfall'
                ? 'border-rose-900/50 bg-rose-950/10'
                : 'border-slate-800 hover:border-slate-700'
            }`}
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-slate-950 text-slate-400 border border-slate-800">
                    {item.category}
                  </span>
                  <h3 className="text-base font-bold text-white mt-2">
                    {item.name}
                  </h3>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-extrabold ${item.id === 'borrowing-shortfall' ? 'text-rose-400' : 'text-emerald-400'}`}>
                    £{item.amount.toFixed(1)}bn
                  </div>
                  <div className="text-xs text-slate-400">
                    {item.percentage.toFixed(1)}% of HMRC revenue
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="h-1.5 w-full bg-slate-950 rounded-full mt-3 overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${Math.min(100, item.percentage * 3.5)}%`,
                    backgroundColor: item.color
                  }}
                />
              </div>

              <p className="mt-3 text-xs text-slate-300 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-400 bg-slate-950/60 p-2.5 rounded-lg">
              <strong className="text-slate-300">Rules & Rates:</strong> {item.details}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

