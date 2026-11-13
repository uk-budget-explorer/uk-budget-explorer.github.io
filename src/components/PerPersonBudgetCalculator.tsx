import React, { useState } from 'react';
import { 
  Users, 
  PoundSterling, 
  Calendar, 
  Clock, 
  Home, 
  Briefcase, 
  Download, 
  ChevronDown, 
  ChevronUp, 
  Sparkles, 
  ShieldCheck, 
  HeartPulse, 
  Landmark, 
  ArrowRight,
  Info
} from 'lucide-react';
import { UK_SPENDING_DATA, UK_FISCAL_TOTALS, SpendingItem } from '../data/ukBudgetData';
import { IconHelper } from './IconHelper';

export const PerPersonBudgetCalculator: React.FC = () => {
  const [householdSize, setHouseholdSize] = useState<number>(1);
  const [perspective, setPerspective] = useState<'resident' | 'taxpayer' | 'household'>('resident');
  const [timeframe, setTimeframe] = useState<'annual' | 'monthly' | 'daily'>('annual');
  const [expandedSectorId, setExpandedSectorId] = useState<string | null>(null);

  // Demographic divisor:
  // - resident: 69.2563 Million UK population
  // - taxpayer: 38.6 million estimated Income Tax payers
  // - household: 28.6 Million UK households
  const totalSpending = UK_FISCAL_TOTALS.totalSpending * 1_000_000_000; // in £

  let divisor = UK_FISCAL_TOTALS.population * 1_000_000; // 69.3m
  let perspectiveLabel = 'Per UK Resident';
  if (perspective === 'taxpayer') {
    divisor = UK_FISCAL_TOTALS.taxPayingAdults * 1_000_000; // 38.6m
    perspectiveLabel = 'Per Income Tax Payer';
  } else if (perspective === 'household') {
    divisor = 28_600_000; // 28.6m households
    perspectiveLabel = 'Per UK Household';
  }

  // Base unit cost (for 1 unit)
  const baseCost = totalSpending / divisor;
  // Multiplied by household size if in resident mode
  const effectiveCost = perspective === 'resident' ? baseCost * householdSize : baseCost;

  const formatCurrency = (amount: number) => {
    let val = amount;
    if (timeframe === 'monthly') val = amount / 12;
    if (timeframe === 'daily') val = amount / 365;

    return `£${val.toLocaleString('en-GB', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  };

  const getTimeframeLabel = () => {
    if (timeframe === 'annual') return 'Per Year';
    if (timeframe === 'monthly') return 'Per Month';
    return 'Per Day';
  };

  const toggleSector = (id: string) => {
    setExpandedSectorId(prev => (prev === id ? null : id));
  };

  return (
    <div className="space-y-8 animate-fadeIn print-statement" data-print-statement="true">
      <div className="hidden print:block print-report-heading">
        <h1>UK National Budget Explorer — Illustrative Spending Statement</h1>
        <p>2024/25 ONS public expenditure · Independent educational illustration</p>
        <p>Perspective: {perspectiveLabel} · {getTimeframeLabel()} · {perspective === 'resident' ? `${householdSize} resident(s)` : 'One unit'}</p>
      </div>
      {/* Intro Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
            <Users className="w-3.5 h-3.5" />
            Illustrative Public Expenditure Per Person · 2024/25
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            UK National Budget Split Per Person
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
            If ONS 2024/25 expenditure of £{UK_FISCAL_TOTALS.totalSpending.toFixed(1)}bn is illustratively divided by the <strong>ONS revised mid-2024 population of {UK_FISCAL_TOTALS.population.toFixed(2)} million</strong>, 
            see an illustrative equal-share cost of public services. Treasury functional spending totals are independently sourced; spending is not distributed equally in reality.
          </p>
        </div>

        {/* Big Total Pill */}
        <div className="p-4 rounded-xl bg-slate-950 border border-emerald-500/30 text-left md:text-right shrink-0 shadow-lg">
          <div className="text-xs text-emerald-400 font-semibold">
            {perspective === 'resident' && householdSize > 1 ? `Household of ${householdSize} People` : perspectiveLabel}
          </div>
          <div className="text-2xl font-black text-white mt-0.5 font-mono">
            {formatCurrency(effectiveCost)}
          </div>
          <div className="text-[11px] text-slate-400">
            {getTimeframeLabel()} • Total Public Spending
          </div>
        </div>
      </div>

      {/* Control Panel: Perspective + Household Size + Timeframe */}
      <div className="print-hide p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* 1. Perspective Switcher */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
              1. Calculation Perspective:
            </label>
            <div className="flex flex-col gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setPerspective('resident')}
                className={`p-2 rounded-lg text-left transition-colors flex items-center justify-between ${
                  perspective === 'resident' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>Per Citizen / Resident</span>
                <span className="font-mono text-[11px] opacity-80">69.3m people</span>
              </button>
              <button
                onClick={() => setPerspective('taxpayer')}
                className={`p-2 rounded-lg text-left transition-colors flex items-center justify-between ${
                  perspective === 'taxpayer' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>Per Income Tax Payer</span>
                <span className="font-mono text-[11px] opacity-80">38.6m Income Tax payers</span>
              </button>
              <button
                onClick={() => setPerspective('household')}
                className={`p-2 rounded-lg text-left transition-colors flex items-center justify-between ${
                  perspective === 'household' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>Per UK Household</span>
                <span className="font-mono text-[11px] opacity-80">28.6m homes</span>
              </button>
            </div>
          </div>

          {/* 2. Household Multiplier (for resident mode) */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
              2. Family / Household Size:
            </label>
            {perspective === 'resident' ? (
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-300 font-medium">Number of People:</span>
                  <span className="text-lg font-bold text-emerald-400 font-mono">
                    {householdSize} {householdSize === 1 ? 'person' : 'people'}
                  </span>
                </div>
                <input
                  aria-label="Number of residents in household"
                  type="range"
                  min="1"
                  max="8"
                  step="1"
                  value={householdSize}
                  onChange={(e) => setHouseholdSize(Number(e.target.value))}
                  className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>1 Single</span>
                  <span>2 Couple</span>
                  <span>4 Family</span>
                  <span>8 Large</span>
                </div>
              </div>
            ) : (
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-center justify-center text-xs text-slate-500 h-[108px] text-center">
                Household size slider is active in "Per Citizen / Resident" mode.
              </div>
            )}
          </div>

          {/* 3. Timeframe Toggle */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
              3. Timeframe:
            </label>
            <div className="flex flex-col gap-1.5 bg-slate-950 p-1.5 rounded-xl border border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setTimeframe('annual')}
                className={`p-2 rounded-lg text-left transition-colors flex items-center justify-between ${
                  timeframe === 'annual' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>Annual (£/year)</span>
                <Calendar className="w-4 h-4" />
              </button>
              <button
                onClick={() => setTimeframe('monthly')}
                className={`p-2 rounded-lg text-left transition-colors flex items-center justify-between ${
                  timeframe === 'monthly' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>Monthly (£/month)</span>
                <Clock className="w-4 h-4" />
              </button>
              <button
                onClick={() => setTimeframe('daily')}
                className={`p-2 rounded-lg text-left transition-colors flex items-center justify-between ${
                  timeframe === 'daily' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                <span>Daily (£/day)</span>
                <Sparkles className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Context Banner */}
        <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <strong className="text-white">UK Public Finance Reality:</strong> The state deploys{' '}
            <strong className="text-emerald-400">£{(UK_FISCAL_TOTALS.totalSpending * 1000 / UK_FISCAL_TOTALS.population).toLocaleString('en-GB',{minimumFractionDigits:2,maximumFractionDigits:2})}</strong> per resident annually using the revised ONS mid-2024 population. 
            For a family of four, an equal-share illustration equals <strong className="text-white">£{(UK_FISCAL_TOTALS.totalSpending * 4000 / UK_FISCAL_TOTALS.population).toLocaleString('en-GB',{minimumFractionDigits:2,maximumFractionDigits:2})}</strong> in annual expenditure.
          </div>
          <div className="text-[11px] text-slate-400 font-mono shrink-0">
            = £{formatCurrency(effectiveCost)} ({getTimeframeLabel()})
          </div>
        </div>
      </div>

      <p className="rounded-xl border border-amber-700/50 bg-amber-950/20 p-4 text-xs text-amber-100 leading-relaxed">
        Treasury's ten expenditure functions total £1,167.6bn before EU transactions in 2024/25,
        whereas the ONS Total Managed Expenditure measure used for the headline per-person figure is
        £1,290.348bn. The distinction reflects expenditure-on-services versus TME, accounting adjustments
        and data vintages. The function cards do not purport to allocate every pound of TME.
        Per-person values are arithmetical averages, not entitlements or actual individual usage.
      </p>
      {/* Itemized Sector Split Table / Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-white">
              Treasury Expenditure by Function (Excluding TME Adjustments)
            </h3>
            <p className="text-xs text-slate-400">
              Illustrative expenditure per {perspectiveLabel.toLowerCase()} {getTimeframeLabel().toLowerCase()}; not the value of services actually used
            </p>
          </div>
          <button
            onClick={() => window.print()}
            aria-label="Print or save the current illustrative spending statement as PDF"
            className="print-hide "px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Print / Save Statement</span>
          </button>
        </div>

        <div className="space-y-3">
          {UK_SPENDING_DATA.map((sector) => {
            const isExpanded = expandedSectorId === sector.id;
            const sectorTotalGbp = sector.amount * 1_000_000_000;
            const perUnitCost = sectorTotalGbp / divisor;
            const itemCost = perspective === 'resident' ? perUnitCost * householdSize : perUnitCost;

            return (
              <div
                key={sector.id}
                className="rounded-xl bg-slate-900 border border-slate-800 overflow-hidden hover:border-slate-700 transition-all shadow-md"
              >
                {/* Sector Primary Row */}
                <div
                  className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer"
                  onClick={() => toggleSector(sector.id)}
                >
                  {/* Left: Icon, Name, Category */}
                  <div className="flex items-center gap-4">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center text-white shrink-0 shadow-md"
                      style={{ backgroundColor: `${sector.color}25`, color: sector.color }}
                    >
                      <IconHelper name={sector.icon} className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="text-sm sm:text-base font-bold text-white">
                          {sector.name}
                        </h4>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                          {sector.category}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">
                        {sector.description}
                      </p>
                    </div>
                  </div>

                  {/* Right: Per Person Amount & Percentage */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-800">
                    <div className="text-left sm:text-right">
                      <div className="text-lg sm:text-xl font-black text-white font-mono">
                        {formatCurrency(itemCost)}
                      </div>
                      <div className="flex items-center sm:justify-end gap-2 text-xs">
                        <span className="font-semibold" style={{ color: sector.color }}>
                          {sector.percentage.toFixed(1)}% of published Treasury function totals
                        </span>
                        <span className="text-slate-500">•</span>
                        <span className="text-slate-400 font-mono">£{sector.amount.toFixed(1)}bn total</span>
                      </div>
                    </div>

                    <button
                      className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
                      aria-label="Toggle Subprogram details"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="h-1.5 w-full bg-slate-950">
                  <div
                    className="h-full transition-all duration-300"
                    style={{ width: `${sector.percentage}%`, backgroundColor: sector.color }}
                  />
                </div>

                {/* Expanded Subprogram Breakdown per Person */}
                {isExpanded && (
                  <div className="p-5 bg-slate-950 border-t border-slate-800/80 space-y-4 animate-fadeIn">
                    <div className="flex items-center justify-between">
                      <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                        Programme details (official figures not supplied for this function):
                      </h5>
                      <span className="text-[11px] text-slate-500">Calculated proportionately</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {sector.breakdown.map((sub, idx) => {
                        const subTotalGbp = sub.amount * 1_000_000_000;
                        const subPerUnit = subTotalGbp / divisor;
                        const subCost = perspective === 'resident' ? subPerUnit * householdSize : subPerUnit;

                        return (
                          <div
                            key={idx}
                            className="p-3 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-between gap-3"
                          >
                            <div className="truncate">
                              <span className="text-xs font-semibold text-slate-200 block truncate">
                                {sub.name}
                              </span>
                              <span className="text-[10px] text-slate-400 block truncate">
                                {sub.description}
                              </span>
                            </div>
                            <div className="text-right shrink-0">
                              <span className="text-xs font-bold text-white font-mono block">
                                {formatCurrency(subCost)}
                              </span>
                              <span className="text-[10px] text-slate-500 font-mono">
                                £{sub.amount.toFixed(1)}bn
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

