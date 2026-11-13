import React, { useState } from 'react';
import { 
  BarChart3, 
  Layers, 
  Percent, 
  TrendingUp, 
  Coins, 
  PieChart, 
  Calendar,
  Sparkles,
  ArrowRight,
  Info,
  Maximize2,
  X,
  ChevronLeft,
  ChevronRight,
  LineChart
} from 'lucide-react';
import { 
  YEARLY_SPENDING_SPLITS, 
  YEARLY_REVENUE_SPLITS, 
  YearlySpendingSplit, 
  YearlyRevenueSplit,
  UK_FISCAL_TOTALS
} from '../data/ukBudgetData';
import { SectorGrowthLineGraph } from './SectorGrowthLineGraph';

export const YearlySplitGraphs: React.FC = () => {
  const [activeAnalysisMode, setActiveAnalysisMode] = useState<'splits' | 'lines'>('lines'); // default to 10-year lines or splits
  const [splitMode, setSplitMode] = useState<'spending' | 'revenue'>('spending');
  const [displayFormat, setDisplayFormat] = useState<'absolute' | 'percentage'>('absolute');
  const [selectedYearIndex, setSelectedYearIndex] = useState<number>(YEARLY_SPENDING_SPLITS.length - 1); // default 2024/25
  const [highlightCategory, setHighlightCategory] = useState<string | null>(null);

  // Enlarged Graph Modal state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Compare mode
  const [compareYearIndex1, setCompareYearIndex1] = useState<number>(0); // 2010/11
  const [compareYearIndex2, setCompareYearIndex2] = useState<number>(YEARLY_SPENDING_SPLITS.length - 1); // 2024/25

  const spendingCategories = [
    { key: 'welfare', label: 'Welfare & Pensions', color: '#3b82f6', desc: 'State Pension, Universal Credit, disability living benefits' },
    { key: 'health', label: 'Health & NHS', color: '#06b6d4', desc: 'NHS hospitals, GPs, medicines, and adult social care support' },
    { key: 'debtInterest', label: 'Debt Interest', color: '#ef4444', desc: 'Sovereign gilt coupons and inflation-linked index payments' },
    { key: 'education', label: 'Education & Skills', color: '#8b5cf6', desc: 'Primary & secondary schools, colleges, student support' },
    { key: 'defence', label: 'Defence & Security', color: '#10b981', desc: 'Royal Navy, Army, RAF, nuclear deterrent, procurement' },
    { key: 'otherServices', label: 'Other functions / EU transactions', color: '#64748b', desc: 'Residual Treasury services including other COFOG functions and EU transactions; avoids double-counting debt interest' },
  ];

  const revenueCategories = [
    { key: 'incomeTax', label: 'Income Tax', color: '#3b82f6', desc: 'Direct taxation on personal employment earnings and pensions' },
    { key: 'nics', label: 'National Insurance', color: '#6366f1', desc: 'Employee and employer contributions for NHS & state pension fund' },
    { key: 'vat', label: 'VAT (Consumption)', color: '#06b6d4', desc: '20% consumption sales tax on goods and services' },
    { key: 'corpTax', label: 'Corporation Tax', color: '#8b5cf6', desc: '25% tax on taxable company profits' },
    { key: 'otherTaxes', label: 'Other Taxes & Levies', color: '#10b981', desc: 'Council tax, business rates, fuel duty, CGT, stamp duty' },
    { key: 'borrowing', label: 'Borrowing (Deficit)', color: '#ef4444', desc: 'Shortfall funded by issuing new sovereign HM Treasury gilts' },
  ];

  const currentSpendingYear = YEARLY_SPENDING_SPLITS[selectedYearIndex];
  const currentRevenueYear = YEARLY_REVENUE_SPLITS[selectedYearIndex];

  const year1Spending = YEARLY_SPENDING_SPLITS[compareYearIndex1];
  const year2Spending = YEARLY_SPENDING_SPLITS[compareYearIndex2];

  const activeCategories = splitMode === 'spending' ? spendingCategories : revenueCategories;
  const activeYearData = splitMode === 'spending' ? currentSpendingYear : currentRevenueYear;
  const activeTotal = splitMode === 'spending' 
    ? currentSpendingYear.totalSpending 
    : currentRevenueYear.totalReceiptsAndBorrowing;

  const handleBarClick = (index: number) => {
    setSelectedYearIndex(index);
    setIsModalOpen(true);
  };

  const handlePrevYear = () => {
    if (selectedYearIndex > 0) {
      setSelectedYearIndex(selectedYearIndex - 1);
    }
  };

  const handleNextYear = () => {
    if (selectedYearIndex < YEARLY_SPENDING_SPLITS.length - 1) {
      setSelectedYearIndex(selectedYearIndex + 1);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Primary Navigation Switcher: Lines vs Stacked Splits */}
      <div className="flex items-center justify-center sm:justify-start gap-2 bg-slate-900 p-1.5 rounded-xl border border-slate-800 w-fit">
        <button
          onClick={() => setActiveAnalysisMode('lines')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
            activeAnalysisMode === 'lines'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <LineChart className="w-4 h-4" />
          <span>10-Year Growth Lines (X/Y)</span>
        </button>
        <button
          onClick={() => setActiveAnalysisMode('splits')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
            activeAnalysisMode === 'splits'
              ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Stacked Bar Yearly Splits</span>
        </button>
      </div>

      {activeAnalysisMode === 'lines' ? (
        <SectorGrowthLineGraph />
      ) : (
        <>
          {/* Header & Controls Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold border border-blue-500/20">
            <BarChart3 className="w-3.5 h-3.5" />
            Illustrative Multi-Year Composition Analysis (2010–2026)
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            UK Spending by Function Over Time
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
            Explore an illustrative historical composition of public expenditure and taxation. Category-level history is undergoing source verification; do not treat individual series as audited.
            Click any bar to <strong>enlarge the graph</strong> and inspect HM Treasury's sourced functional breakdown with figures and percentages. Historical revenue composition is withheld pending consistent HMRC series alignment.
          </p>
        </div>

        {/* View Switchers */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Spending vs Revenue Toggle */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
            <button
              onClick={() => setSplitMode('spending')}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                splitMode === 'spending' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <PieChart className="w-3.5 h-3.5" />
              <span>Spending Split</span>
            </button>

          </div>

          {/* Absolute (£bn) vs Percentage (%) Toggle */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
            <button
              onClick={() => setDisplayFormat('absolute')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                displayFormat === 'absolute' ? 'bg-slate-800 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              £ Billions
            </button>
            <button
              onClick={() => setDisplayFormat('percentage')}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 ${
                displayFormat === 'percentage' ? 'bg-slate-800 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Percent className="w-3 h-3" />
              <span>100% Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Interactive Stacked Graph Card */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-blue-400" />
              {splitMode === 'spending'
                ? `HM Treasury Expenditure on Services Split per Year (${displayFormat === 'absolute' ? '£ Billions' : 'Percentage Share %'})`
                : `UK Receipts & Borrowing Split per Year (${displayFormat === 'absolute' ? '£ Billions' : 'Percentage Share %'})`}
            </h3>
            <p className="text-xs text-slate-400">
              Click any bar to enlarge graph with detailed figures & percentages.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">
              Selected: <strong className="text-white font-mono">{activeYearData.year}</strong>
            </span>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-2.5 py-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 text-blue-300 text-xs font-semibold border border-blue-500/30 transition-colors flex items-center gap-1.5"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Enlarge Graph</span>
            </button>
          </div>
        </div>

        {/* Legend Row */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          {activeCategories.map((cat) => {
            const isHighlighted = highlightCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setHighlightCategory(isHighlighted ? null : cat.key)}
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg border transition-all ${
                  isHighlighted
                    ? 'bg-white/10 text-white border-white shadow-sm'
                    : 'bg-slate-950/60 text-slate-300 border-slate-800 hover:border-slate-700'
                }`}
              >
                <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: cat.color }}></span>
                <span>{cat.label}</span>
              </button>
            );
          })}
          {highlightCategory && (
            <button
              onClick={() => setHighlightCategory(null)}
              className="text-[11px] text-blue-400 hover:underline ml-auto"
            >
              Reset highlight
            </button>
          )}
        </div>

        {/* The Stacked Bar Graph Canvas */}
        <div className="w-full h-80 sm:h-96 bg-slate-950 rounded-xl p-4 sm:p-6 border border-slate-800 flex flex-col justify-end">
          <div className="w-full h-full flex items-end justify-between gap-1.5 sm:gap-3 pb-3">
            {(splitMode === 'spending' ? YEARLY_SPENDING_SPLITS : YEARLY_REVENUE_SPLITS).map((item, index) => {
              const isSelected = selectedYearIndex === index;
              const total = splitMode === 'spending' 
                ? (item as YearlySpendingSplit).totalSpending 
                : (item as YearlyRevenueSplit).totalReceiptsAndBorrowing;

              const barTotalHeightPercent = displayFormat === 'percentage' 
                ? 100 
                : (total / 1350) * 100;

              return (
                <div
                  key={item.year}
                  onClick={() => handleBarClick(index)}
                  className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer relative"
                  title="Click to enlarge graph & view breakdown"
                >
                  {/* Floating tooltip */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-12 bg-slate-800 text-[11px] text-white px-2.5 py-1.5 rounded-lg shadow-xl whitespace-nowrap z-20 pointer-events-none border border-slate-700 font-mono text-center">
                    <strong className="text-blue-300">{item.year}</strong>: £{total.toFixed(1)}bn
                    <div className="text-[9px] text-amber-400 font-sans">Click to enlarge 🔍</div>
                  </div>

                  {/* Stacked container */}
                  <div
                    style={{ height: `${barTotalHeightPercent}%` }}
                    className={`w-full flex flex-col-reverse rounded-t overflow-hidden transition-all duration-300 ${
                      isSelected ? 'ring-2 ring-white brightness-125 shadow-lg' : 'hover:brightness-110 opacity-90'
                    }`}
                  >
                    {activeCategories.map((cat) => {
                      const amount = (item as any)[cat.key] as number;
                      const segmentHeight = (amount / total) * 100;
                      const isCatDimmed = highlightCategory && highlightCategory !== cat.key;

                      return (
                        <div
                          key={cat.key}
                          style={{
                            height: `${segmentHeight}%`,
                            backgroundColor: cat.color,
                            opacity: isCatDimmed ? 0.2 : 1
                          }}
                          className="w-full transition-all duration-200"
                          title={`${cat.label}: £${amount.toFixed(1)}bn (${segmentHeight.toFixed(1)}%)`}
                        />
                      );
                    })}
                  </div>

                  {/* Year Label */}
                  <div className="mt-2 text-[9px] sm:text-[11px] text-slate-400 font-mono rotate-45 sm:rotate-0 origin-left truncate">
                    {item.year.split('/')[0].slice(-2)}/{item.year.split('/')[1]?.slice(0, 2) || ''}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Year Detailed Split Summary */}
        <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-3">
            <div>
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-amber-400" />
                <span>Exact Yearly Split for Fiscal Year: <strong>{activeYearData.year}</strong></span>
              </h4>
              <span className="text-xs text-slate-400">
                Total: <strong className="text-white font-mono">£{activeTotal.toFixed(1)}bn</strong>
              </span>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-xs text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1 self-start sm:self-auto"
            >
              <span>View Enlarged Modal with Percentages</span>
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {activeCategories.map((cat) => {
              const amount = (activeYearData as any)[cat.key] as number;
              const percentage = (amount / activeTotal) * 100;

              return (
                <div
                  key={cat.key}
                  className="p-3 rounded-lg bg-slate-900 border border-slate-800/80 space-y-1.5"
                >
                  <div className="flex items-center gap-1.5 text-xs text-slate-300 font-medium truncate">
                    <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: cat.color }}></span>
                    <span className="truncate">{cat.label}</span>
                  </div>
                  <div className="text-base font-extrabold text-white font-mono">
                    £{amount.toFixed(1)}bn
                  </div>
                  <div className="text-[11px] font-semibold" style={{ color: cat.color }}>
                    {percentage.toFixed(1)}% of total
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Side-by-Side 15-Year Growth Comparison Tool */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              Year-on-Year Departmental Shift Comparison
            </h3>
            <p className="text-xs text-slate-400">
              Compare any two fiscal years to identify structural shifts in UK state spending.
            </p>
          </div>

          {/* Year pickers */}
          <div className="flex items-center gap-2 text-xs">
            <select
              value={compareYearIndex1}
              onChange={(e) => setCompareYearIndex1(Number(e.target.value))}
              className="bg-slate-950 border border-slate-700 text-white rounded-lg px-2.5 py-1.5 font-mono focus:outline-none focus:border-blue-500"
            >
              {YEARLY_SPENDING_SPLITS.map((y, idx) => (
                <option key={y.year} value={idx}>{y.year}</option>
              ))}
            </select>
            <span className="text-slate-400 font-bold">vs</span>
            <select
              value={compareYearIndex2}
              onChange={(e) => setCompareYearIndex2(Number(e.target.value))}
              className="bg-slate-950 border border-slate-700 text-white rounded-lg px-2.5 py-1.5 font-mono focus:outline-none focus:border-blue-500"
            >
              {YEARLY_SPENDING_SPLITS.map((y, idx) => (
                <option key={y.year} value={idx}>{y.year}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] font-bold tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-3">Spending Category</th>
                <th className="p-3">{year1Spending.year}</th>
                <th className="p-3">{year2Spending.year}</th>
                <th className="p-3">Absolute Change (£bn)</th>
                <th className="p-3 text-right">Growth Rate (%)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 font-mono">
              {spendingCategories.map((cat) => {
                const val1 = (year1Spending as any)[cat.key] as number;
                const val2 = (year2Spending as any)[cat.key] as number;
                const delta = val2 - val1;
                const growthPercent = ((val2 - val1) / val1) * 100;

                return (
                  <tr key={cat.key} className="hover:bg-slate-850 transition-colors">
                    <td className="p-3 font-sans font-medium text-white flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: cat.color }}></span>
                      {cat.label}
                    </td>
                    <td className="p-3">£{val1.toFixed(1)}bn</td>
                    <td className="p-3 text-white font-bold">£{val2.toFixed(1)}bn</td>
                    <td className={`p-3 font-bold ${delta >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {delta >= 0 ? `+£${delta.toFixed(1)}bn` : `-£${Math.abs(delta).toFixed(1)}bn`}
                    </td>
                    <td className={`p-3 text-right font-bold ${growthPercent >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {growthPercent >= 0 ? `+${growthPercent.toFixed(1)}%` : `${growthPercent.toFixed(1)}%`}
                    </td>
                  </tr>
                );
              })}
              {/* Total Row */}
              <tr className="bg-slate-950/60 font-bold border-t-2 border-slate-800 text-white">
                <td className="p-3 font-sans">Total Public Spending</td>
                <td className="p-3">£{year1Spending.totalSpending.toFixed(1)}bn</td>
                <td className="p-3 text-blue-400">£{year2Spending.totalSpending.toFixed(1)}bn</td>
                <td className="p-3 text-blue-400">
                  +£{(year2Spending.totalSpending - year1Spending.totalSpending).toFixed(1)}bn
                </td>
                <td className="p-3 text-right text-blue-400">
                  +{(((year2Spending.totalSpending - year1Spending.totalSpending) / year1Spending.totalSpending) * 100).toFixed(1)}%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ENLARGED GRAPH MODAL (Triggered when user clicks ANY bar) */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header with Navigation */}
            <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/70">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center">
                  <BarChart3 className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-white">
                      Enlarged Fiscal Year Breakdown: {activeYearData.year}
                    </h3>
                    <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      {splitMode === 'spending' ? 'Public Spending' : 'Revenue & Borrowing'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Total {splitMode === 'spending' ? 'Expenditure' : 'Receipts & Borrowing'}: <strong className="text-white font-mono">£{activeTotal.toFixed(1)}bn</strong>
                  </p>
                </div>
              </div>

              {/* Prev / Next Year & Close */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrevYear}
                  disabled={selectedYearIndex === 0}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-300 transition-colors"
                  title="Previous Year"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNextYear}
                  disabled={selectedYearIndex === YEARLY_SPENDING_SPLITS.length - 1}
                  className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-300 transition-colors"
                  title="Next Year"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors ml-2"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6">
              {/* Giant Segmented Proportion Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold text-slate-300">
                  <span>Proportional Stacked Composition</span>
                  <span className="text-slate-400">100% of Total Budget</span>
                </div>
                <div className="h-10 w-full bg-slate-950 rounded-xl overflow-hidden flex border border-slate-800 p-1 gap-1 shadow-inner">
                  {activeCategories.map((cat) => {
                    const amount = (activeYearData as any)[cat.key] as number;
                    const pct = (amount / activeTotal) * 100;
                    return (
                      <div
                        key={cat.key}
                        style={{ width: `${pct}%`, backgroundColor: cat.color }}
                        className="h-full rounded-lg flex items-center justify-center text-[11px] font-bold text-white shadow-sm truncate transition-all duration-300 px-1 hover:brightness-110"
                        title={`${cat.label}: £${amount.toFixed(1)}bn (${pct.toFixed(1)}%)`}
                      >
                        {pct > 8 ? `${pct.toFixed(0)}%` : ''}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Comprehensive Breakdown Cards with Figures and Percentages */}
              <div className="space-y-3">
                <h4 className="text-xs uppercase font-bold tracking-wider text-slate-400">
                  Itemized Component Breakdown (Figures & Percentages)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeCategories.map((cat) => {
                    const amount = (activeYearData as any)[cat.key] as number;
                    const percentage = (amount / activeTotal) * 100;
                    const perCapita = (amount * 1000000000) / (UK_FISCAL_TOTALS.population * 1000000);

                    return (
                      <div
                        key={cat.key}
                        className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex flex-col justify-between space-y-2"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-2.5">
                            <span className="w-3.5 h-3.5 rounded-md shrink-0 shadow-sm" style={{ backgroundColor: cat.color }}></span>
                            <div>
                              <span className="text-xs font-bold text-white block">{cat.label}</span>
                              <span className="text-[11px] text-slate-400">{cat.desc}</span>
                            </div>
                          </div>
                          <div className="text-right shrink-0">
                            <div className="text-lg font-black text-white font-mono">
                              £{amount.toFixed(1)}bn
                            </div>
                            <div className="text-xs font-bold" style={{ color: cat.color }}>
                              {percentage.toFixed(1)}% of total
                            </div>
                          </div>
                        </div>

                        {/* Mini Progress Bar & Per Capita */}
                        <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                          <div className="flex-1 mr-3 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                            <div
                              className="h-full rounded-full"
                              style={{ width: `${percentage}%`, backgroundColor: cat.color }}
                            />
                          </div>
                          <span className="font-mono text-slate-300">
                            ~£{Math.round(perCapita).toLocaleString()} / person
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Historical Context Callout for this Year */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 text-xs text-slate-300 flex items-center justify-between gap-4">
                <div>
                  <span className="font-bold text-white block">UK Fiscal Context:</span>
                  <span className="text-slate-400">
                    In {activeYearData.year}, total public finance commitments stood at £{activeTotal.toFixed(1)}bn. 
                    {splitMode === 'spending' && activeYearData.year.includes('2020/21') && ' Marked the historic COVID-19 pandemic surge with £313bn emergency borrowing.'}
                    {splitMode === 'spending' && activeYearData.year.includes('2022/23') && ' Marked peak 40-year inflation spike driving debt interest payments to record £111.8bn.'}
                  </span>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[10px] text-slate-500 uppercase block">Share of GDP</span>
                  <span className="text-base font-bold text-blue-400 font-mono">~44.3%</span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-800 bg-slate-950/70 flex justify-between items-center">
              <span className="text-xs text-slate-500">
                Tip: Use ← and → arrow buttons to switch years seamlessly.
              </span>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
        </>
      )}
    </div>
  );
};
