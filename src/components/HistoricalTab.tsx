import React, { useState } from 'react';
import { 
  LineChart, 
  TrendingUp, 
  Calendar, 
  Clock, 
  BarChart3,
  Flame,
  ArrowRight
} from 'lucide-react';
import { UK_HISTORICAL_DATA, HistoricalYearData } from '../data/ukBudgetData';
import { DebtInterestTicker } from './DebtInterestTicker';
import { YearlySplitGraphs } from './YearlySplitGraphs';

export const HistoricalTab: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState<'debt' | 'spending_vs_receipts' | 'borrowing' | 'macro'>('debt');
  const [activeYear, setActiveYear] = useState<HistoricalYearData>(UK_HISTORICAL_DATA[UK_HISTORICAL_DATA.length - 1]); // 2024/25
  const [showYearlySplits, setShowYearlySplits] = useState(true);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold border border-blue-500/20 mb-2">
            <Calendar className="w-3.5 h-3.5" />
            ONS Verified Fiscal History (2000/01–2025/26)
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            UK Debt, Spending and Borrowing Across 25 Years
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl mt-1">
            Selected fiscal years between 2000/01 and 2025/26 use ONS October 2026-vintage spending, receipts, borrowing and March debt stock; macroeconomic fields are deliberately excluded pending separate verification. Figures are outturn, not forecasts.
          </p>
        </div>

        {/* Metric Selector Buttons */}
        <div className="flex flex-wrap gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 self-start md:self-auto">
          <button
            onClick={() => setSelectedMetric('debt')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              selectedMetric === 'debt' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Debt (% GDP)
          </button>
          <button
            onClick={() => setSelectedMetric('spending_vs_receipts')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              selectedMetric === 'spending_vs_receipts' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Spend vs Tax (£bn)
          </button>
          <button
            onClick={() => setSelectedMetric('borrowing')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              selectedMetric === 'borrowing' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Annual Deficit
          </button>

        </div>
      </div>

      {/* Real-Time Debt Interest Counter Widget */}
      <DebtInterestTicker variant="compact" />

      {/* Interactive Visual SVG Chart */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <LineChart className="w-5 h-5 text-blue-400" />
            {selectedMetric === 'debt' && 'Public Sector Net Debt as % of GDP (2000/01–2025/26)'}
            {selectedMetric === 'spending_vs_receipts' && 'Total Managed Expenditure vs Total Receipts (£ Billions)'}
            {selectedMetric === 'borrowing' && 'Annual Public Sector Net Borrowing / Deficit (£ Billions)'}
            {selectedMetric === 'macro' && 'CPI Inflation Rate vs Bank of England Base Interest Rate (%)'}
          </h3>
          <span className="text-xs text-slate-400 hidden sm:inline">
            Click any column point to inspect fiscal data
          </span>
        </div>

        {/* Custom Interactive SVG Chart Component */}
        <div className="w-full h-72 sm:h-80 bg-slate-950 rounded-xl p-4 border border-slate-800 relative flex flex-col justify-end">
          {/* SVG Canvas */}
          <div className="w-full h-full flex items-end justify-between gap-1 sm:gap-2 pt-6 pb-2">
            {UK_HISTORICAL_DATA.map((item) => {
              let barHeight = 0;
              let label = '';
              let barColor = '#3b82f6';

              if (selectedMetric === 'debt') {
                barHeight = (item.debtPercentGdp / 110) * 100;
                label = `${item.debtPercentGdp.toFixed(1)}%`;
                barColor = item.debtPercentGdp > 90 ? '#f59e0b' : item.debtPercentGdp > 60 ? '#3b82f6' : '#10b981';
              } else if (selectedMetric === 'spending_vs_receipts') {
                barHeight = (item.spending / 1350) * 100;
                label = `£${item.spending.toFixed(0)}bn`;
                barColor = '#6366f1';
              } else if (selectedMetric === 'borrowing') {
                const normVal = Math.max(0, item.borrowing);
                barHeight = (normVal / 330) * 100;
                label = `£${item.borrowing.toFixed(0)}bn`;
                barColor = item.borrowing > 150 ? '#ef4444' : item.borrowing > 80 ? '#f97316' : item.borrowing < 0 ? '#10b981' : '#3b82f6';
              } else if (selectedMetric === 'macro') {
                barHeight = (Math.max(0, item.inflation) / 10) * 100;
                label = `${item.inflation.toFixed(1)}%`;
                barColor = item.inflation > 5 ? '#ef4444' : '#14b8a6';
              }

              const isSelected = activeYear.year === item.year;

              return (
                <div
                  key={item.year}
                  role="button"
                  tabIndex={0}
                  aria-label={`Inspect fiscal year ${item.year}: ${label}`}
                  aria-pressed={isSelected}
                  onKeyDown={event => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); setActiveYear(item); } }}
                  onClick={() => setActiveYear(item)}
                  className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer relative focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-400"
                >
                  {/* Floating tooltip on hover */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 bg-slate-800 text-[10px] text-white px-2 py-1 rounded shadow-lg whitespace-nowrap z-20 pointer-events-none border border-slate-700">
                    {item.year}: {label}
                  </div>

                  {/* The bar element */}
                  <div
                    style={{ height: `${Math.max(8, barHeight)}%`, backgroundColor: barColor }}
                    className={`w-full rounded-t transition-all duration-300 ${
                      isSelected ? 'ring-2 ring-white brightness-125' : 'hover:brightness-110 opacity-80'
                    }`}
                  />

                  {/* Year label underneath */}
                  <div className="mt-2 text-[9px] sm:text-[10px] text-slate-400 rotate-45 sm:rotate-0 origin-left truncate">
                    {item.year.split('/')[0].slice(-2)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Year Detail Callout */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-sm font-extrabold text-white">Year {activeYear.year}</span>
              {activeYear.keyEvent && (
                <span className="text-xs text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20 font-medium">
                  {activeYear.keyEvent}
                </span>
              )}
            </div>
            <div className="flex flex-wrap gap-4 text-xs text-slate-400 pt-1">
              <span>Public Spending: <strong className="text-white">£{activeYear.spending}bn</strong></span>
              <span>Receipts: <strong className="text-white">£{activeYear.receipts}bn</strong></span>
              <span>Deficit: <strong className={activeYear.borrowing < 0 ? 'text-emerald-400' : 'text-rose-400'}>
                {activeYear.borrowing < 0 ? `£${Math.abs(activeYear.borrowing)}bn Surplus` : `£${activeYear.borrowing}bn`}
              </strong></span>
              <span>Debt: <strong className="text-amber-400">{activeYear.debtPercentGdp}% GDP (£{activeYear.debtAmount}bn)</strong></span>
            </div>
          </div>

          <div className="text-xs text-slate-400 bg-slate-900 px-3 py-2 rounded-lg border border-slate-800 shrink-0">
            <div>ONS public sector finance outturn</div>
            <div>Data vintage: October 2026</div>
          </div>
        </div>
      </div>

      {/* Embedded Yearly Splits Section */}
      <div className="pt-4 border-t border-slate-800/80">
        <YearlySplitGraphs />
      </div>

      <p className="text-xs text-slate-400">Fiscal indicators shown are historical outturn statistics, not a continuous real-time measure of public debt. The separate debt-interest counter is an illustrative projection.</p>
    </div>
  );
};
