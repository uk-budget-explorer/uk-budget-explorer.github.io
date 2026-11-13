import React, { useState } from 'react';
import {
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Scale,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  TrendingDown,
  Landmark,
  BarChart3
} from 'lucide-react';
import {
  UK_FISCAL_TOTALS,
  UK_SPENDING_DATA,
  UK_REVENUE_DATA,
  HMRC_REVENUE_TOTAL_2024_25,
  DEBT_INTEREST_METRICS,
  SpendingItem
} from '../data/ukBudgetData';
import { IconHelper } from './IconHelper';
import { TabType } from './Header';
import { DebtInterestTicker } from './DebtInterestTicker';

interface OverviewTabProps {
  setActiveTab: (tab: TabType) => void;
  onSelectSpendingItem: (item: SpendingItem) => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ setActiveTab, onSelectSpendingItem }) => {
  const [hoveredSector, setHoveredSector] = useState<string | null>(null);
  const incomeTaxAndNicShare = UK_REVENUE_DATA
    .filter(item => item.id === 'income-tax' || item.id === 'nics')
    .reduce((share, item) => share + item.percentage, 0);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 border border-slate-800 p-6 sm:p-8 shadow-xl">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-300 text-xs font-semibold border border-blue-500/20 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            Official UK Fiscal Year 2024/25 Overview
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            How the United Kingdom Raises and Spends Public Money
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-300 leading-relaxed">
            The UK raises public revenue to help fund
            the National Health Service, State Pensions, Defence, Schools, and infrastructure.
            Explore public debt, borrowing, revenue and spending by function.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              onClick={() => setActiveTab('per_person')}
              className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs sm:text-sm transition-all shadow-md shadow-emerald-600/30 flex items-center gap-2"
            >
              <span>👥 Per Person Budget</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setActiveTab('g20')}
              className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs sm:text-sm transition-all shadow-md shadow-indigo-600/30 flex items-center gap-2"
            >
              <span>🇬🇧 G20 Comparison</span>
            </button>
            <button
              onClick={() => setActiveTab('yearly_splits')}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs sm:text-sm transition-all shadow-md shadow-blue-600/30 flex items-center gap-2"
            >
              <BarChart3 className="w-4 h-4" />
              <span>Yearly Split Graphs</span>
            </button>
          </div>
        </div>
      </div>

      {/* Debt feature introduction: visible content for users and search-engine indexing. */}
      <section aria-labelledby="national-debt-calculator-title" className="rounded-xl border border-slate-800 bg-slate-900/70 p-4 sm:p-5">
        <h2 id="national-debt-calculator-title" className="text-lg sm:text-xl font-bold text-white">
          UK National Debt Calculator &amp; Debt Interest Counter
        </h2>
        <p className="mt-2 text-sm text-slate-300 leading-relaxed">
          How much is UK national debt, and what does government borrowing cost in interest?
          Compare the latest published ONS public sector net debt figure shown below with an interactive
          illustration of debt interest per second, minute, hour and day using the OBR's 2026/27 forecast.
          The moving calculation is an illustrative average, <strong>not</strong> a real-time national debt balance
          or observed interest payments.
        </p>
        <p className="mt-2 text-xs text-slate-400">
          Official debt stock: ONS September 2026 (provisional). Forecast interest: OBR 2026/27.
          Financial data last reviewed 13 November 2026; sources and definitions are available under Methodology &amp; Sources.
        </p>
      </section>

      {/* Real-Time Debt Interest Live Ticker Widget */}
      <DebtInterestTicker variant="full" />

      {/* Top 4 Key KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Spending */}
        <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all shadow-lg group">
          <div className="flex items-center justify-between text-xs font-medium text-slate-400 mb-2">
            <span>Total Public Spending</span>
            <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400 group-hover:bg-blue-500/20 transition-colors">
              <ArrowUpRight className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            £{UK_FISCAL_TOTALS.totalSpending.toFixed(1)}bn
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
            <span><strong className="text-blue-400">2024/25 ONS</strong></span>
            <span className="text-slate-500">•</span>
            <span><strong className="text-slate-200">2024 ONS population: 69.256m</strong></span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500 leading-tight">
            ONS Total Managed Expenditure (TME), 2024/25; HM Treasury PSS reports £1,290.6bn using its publication basis.
          </div>
        </div>

        {/* Total Receipts */}
        <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all shadow-lg group">
          <div className="flex items-center justify-between text-xs font-medium text-slate-400 mb-2">
            <span>Total Government Receipts</span>
            <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 group-hover:bg-emerald-500/20 transition-colors">
              <ArrowDownRight className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            £{UK_FISCAL_TOTALS.totalReceipts.toFixed(1)}bn
          </div>
          <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
            <span className="font-semibold text-emerald-400">ONS current receipts</span>
          </div>
          <div className="mt-2 text-[11px] text-slate-500 leading-tight">
            Taxes, National Insurance, VAT, Corporation tax and statutory commercial fees.
          </div>
        </div>

        {/* Net Borrowing / Deficit */}
        <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all shadow-lg group">
          <div className="flex items-center justify-between text-xs font-medium text-slate-400 mb-2">
            <span>Annual Borrowing (Deficit)</span>
            <span className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400 group-hover:bg-rose-500/20 transition-colors">
              <TrendingDown className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-rose-400 tracking-tight">
            £{UK_FISCAL_TOTALS.netBorrowing.toFixed(1)}bn
          </div>
          <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
            <span className="font-semibold text-rose-300">{UK_FISCAL_TOTALS.borrowingPercentGdp}%</span> of UK GDP
          </div>
          <div className="mt-2 text-[11px] text-slate-500 leading-tight">
            ONS public sector net borrowing (PSNB), a statistical deficit measure; it is not identical to gross gilt issuance.
          </div>
        </div>

        {/* National Debt */}
        <div className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all shadow-lg group">
          <div className="flex items-center justify-between text-xs font-medium text-slate-400 mb-2">
            <span>Public Sector Net Debt</span>
            <span className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 group-hover:bg-amber-500/20 transition-colors">
              <Landmark className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-amber-400 tracking-tight">
            £{UK_FISCAL_TOTALS.netDebt.toFixed(0)}bn
          </div>
          <div className="mt-2 flex items-center gap-2 text-xs text-slate-400">
            <span className="font-semibold text-amber-300">{UK_FISCAL_TOTALS.debtPercentGdp}%</span> of GDP
          </div>
          <div className="mt-2 text-[11px] text-slate-500 leading-tight">
            ONS public sector net debt excluding banks, measured at the end of March 2025.
          </div>
        </div>
      </div>

      {/* Visual Budget Balance: Receipts + Deficit = Expenditure */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Scale className="w-5 h-5 text-blue-400" />
              The UK Budget Balance: Where the Money Comes From & Where It Goes
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              ONS public sector receipts and borrowing against ONS Total Managed Expenditure for 2024/25.
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-medium">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2.5 h-2.5 rounded-sm bg-emerald-500"></span> Receipts (£{UK_FISCAL_TOTALS.totalReceipts.toFixed(1)}bn)
            </span>
            <span className="flex items-center gap-1.5 text-rose-400">
              <span className="w-2.5 h-2.5 rounded-sm bg-rose-500"></span> Borrowing (£{UK_FISCAL_TOTALS.netBorrowing.toFixed(1)}bn)
            </span>
          </div>
        </div>

        {/* Proportional Stacked Balance Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-slate-400">
            <span><strong>Funding Sources</strong> (£{UK_FISCAL_TOTALS.totalSpending.toFixed(1)}bn total)</span>
            <span>Receipts cover <strong>{(UK_FISCAL_TOTALS.totalReceipts / UK_FISCAL_TOTALS.totalSpending * 100).toFixed(1)}%</strong> | Borrowing <strong>{(UK_FISCAL_TOTALS.netBorrowing / UK_FISCAL_TOTALS.totalSpending * 100).toFixed(1)}%</strong></span>
          </div>
          <div className="h-9 w-full bg-slate-950 rounded-xl overflow-hidden flex border border-slate-800 p-1 gap-1">
            <div
              style={{ width: `${(UK_FISCAL_TOTALS.totalReceipts / UK_FISCAL_TOTALS.totalSpending) * 100}%` }}
              className="h-full bg-gradient-to-r from-emerald-600 to-teal-500 rounded-lg flex items-center px-3 text-xs font-bold text-white shadow-inner truncate transition-all duration-300"
              title={`Taxation & Receipts: £${UK_FISCAL_TOTALS.totalReceipts}bn (${(UK_FISCAL_TOTALS.totalReceipts / UK_FISCAL_TOTALS.totalSpending * 100).toFixed(1)}%)`}
            >
              Receipts: £{UK_FISCAL_TOTALS.totalReceipts.toFixed(1)}bn
            </div>
            <div
              style={{ width: `${(UK_FISCAL_TOTALS.netBorrowing / UK_FISCAL_TOTALS.totalSpending) * 100}%` }}
              className="h-full bg-rose-600 rounded-lg flex items-center justify-center px-2 text-xs font-bold text-white shadow-inner truncate transition-all duration-300"
              title={`Net Borrowing: £${UK_FISCAL_TOTALS.netBorrowing}bn (${(UK_FISCAL_TOTALS.netBorrowing / UK_FISCAL_TOTALS.totalSpending * 100).toFixed(1)}%)`}
            >
              Borrowing: £{UK_FISCAL_TOTALS.netBorrowing.toFixed(1)}bn
            </div>
          </div>
        </div>

        {/* Expenditure Sector Distribution Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-slate-400">
            <span><strong>Expenditure by Key Category</strong></span>
            <span>Hover or click any sector to inspect</span>
          </div>
          <div className="h-9 w-full bg-slate-950 rounded-xl overflow-hidden flex border border-slate-800 p-1 gap-1">
            {UK_SPENDING_DATA.map((item) => (
              <button
                key={item.id}
                onClick={() => onSelectSpendingItem(item)}
                onMouseEnter={() => setHoveredSector(item.id)}
                onMouseLeave={() => setHoveredSector(null)}
                style={{
                  width: `${item.percentage}%`,
                  backgroundColor: item.color,
                  opacity: hoveredSector && hoveredSector !== item.id ? 0.4 : 1
                }}
                className="h-full rounded-md transition-all duration-150 relative group cursor-pointer"
                title={`${item.name}: £${item.amount}bn (${item.percentage}%)`}
              >
                <div className="sr-only">{item.name}</div>
              </button>
            ))}
          </div>
          {/* Legend row */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 pt-1 text-[11px] text-slate-400">
            {UK_SPENDING_DATA.slice(0, 6).map((item) => (
              <button
                key={item.id}
                onClick={() => onSelectSpendingItem(item)}
                className="inline-flex items-center gap-1.5 hover:text-slate-200 transition-colors"
              >
                <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: item.color }}></span>
                <span>{item.name.split('(')[0]}: <strong>£{item.amount.toFixed(0)}bn</strong> ({item.percentage}%)</span>
              </button>
            ))}
            <button
              onClick={() => setActiveTab('spending')}
              className="text-blue-400 hover:text-blue-300 ml-auto font-medium"
            >
              View all {UK_SPENDING_DATA.length} sectors →
            </button>
          </div>
        </div>
      </div>

      {/* Top 6 Major Spending Sectors Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white">Major Public Spending Categories</h3>
            <p className="text-xs text-slate-400">Illustrative sector cards: detailed categories still being reconciled</p>
          </div>
          <button
            onClick={() => setActiveTab('spending')}
            className="text-xs text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1"
          >
            <span>Full Breakdown</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {UK_SPENDING_DATA.slice(0, 6).map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectSpendingItem(item)}
              className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 hover:bg-slate-850 cursor-pointer transition-all shadow-md group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-inner"
                      style={{ backgroundColor: `${item.color}25`, color: item.color }}
                    >
                      <IconHelper name={item.icon} className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-blue-400 transition-colors">
                        {item.name}
                      </h4>
                      <span className="text-[11px] text-slate-400">
                        {item.category} • <strong className="text-slate-300">{item.delVsAme}</strong>
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-base font-extrabold text-white">
                      £{item.amount.toFixed(1)}bn
                    </div>
                    <div className="text-xs font-semibold" style={{ color: item.color }}>
                      {item.percentage}% of total
                    </div>
                  </div>
                </div>

                <p className="mt-3 text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <span>Per person: <strong className="text-slate-200">£{item.perCapita.toLocaleString()}</strong>/yr</span>
                <span className="text-blue-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-1 font-medium text-[11px]">
                  Explore breakdown →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4 Critical UK Fiscal Facts & Context */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Fact 1: Debt Interest */}
        <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800 flex gap-4 items-start">
          <div className="w-10 h-10 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center shrink-0 mt-0.5">
            <AlertCircle className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-white">OBR Forecast Debt Interest — Distinct Measure</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              The OBR forecasts <strong className="text-rose-400">£{(DEBT_INTEREST_METRICS.annualAmount / 1e9).toFixed(1)}bn</strong> in central-government debt interest net of APF for 2026/27. This is a forecast from a different period and classification from the historical spending categories below.
            </p>
          </div>
        </div>

        {/* Fact 2: Income Tax & NICs Concentration */}
        <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800 flex gap-4 items-start">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
            <Landmark className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-white">Income Tax and NICs — HMRC's Largest Revenue Sources</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              HMRC reported <strong className="text-blue-400">£309.4bn Income Tax</strong> and <strong className="text-indigo-400">£168.8bn NICs</strong> in 2024/25. Together these are {incomeTaxAndNicShare.toFixed(1)}% of HMRC's restated £{HMRC_REVENUE_TOTAL_2024_25.toFixed(1)}bn accrual-based revenue total. This differs from the broader ONS current-receipts measure.
            </p>
          </div>
        </div>

        {/* Fact 3: The Triple Lock Cost */}
        <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800 flex gap-4 items-start">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
            <CheckCircle className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-white">The State Pension & Demographic Aging</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              The State Pension sits within the Treasury's <strong className="text-emerald-400">£387.2bn social protection</strong> function for 2024/25. The function also includes a range of working-age and other benefits; it is not identical to State Pension expenditure.
            </p>
          </div>
        </div>

        {/* Fact 4: Fiscal Rules */}
        <div className="p-5 rounded-xl bg-slate-900/70 border border-slate-800 flex gap-4 items-start">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
            <Scale className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className="text-sm font-bold text-white">HM Treasury Fiscal Rules & Headroom</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              The fiscal mandate and debt objectives are defined in the current Charter for Budget Responsibility and assessed by the OBR. These targets concern forecasts rather than guarantees of realised budget outcomes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
