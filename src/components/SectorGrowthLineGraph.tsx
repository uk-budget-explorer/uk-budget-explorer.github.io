import React, { useState } from 'react';
import { 
  TrendingUp, 
  LineChart, 
  Layers, 
  Grid, 
  Maximize2, 
  Percent, 
  ArrowRight,
  Sparkles,
  Info,
  Calendar,
  AlertCircle
} from 'lucide-react';
import { TEN_YEAR_SECTOR_DATA } from '../data/ukBudgetData';

interface SectorConfig {
  key: 'welfare' | 'health' | 'debtInterest' | 'education' | 'defence' | 'otherServices';
  label: string;
  color: string;
  desc: string;
}

export const SectorGrowthLineGraph: React.FC = () => {
  const [viewMode, setViewMode] = useState<'combined' | 'separate'>('combined');
  const [scaleMode, setScaleMode] = useState<'absolute' | 'indexed'>('absolute');
  const [hoveredYearIndex, setHoveredYearIndex] = useState<number | null>(null);
  const [selectedYearIndex, setSelectedYearIndex] = useState<number | null>(null);
  const activeHoverIndex = hoveredYearIndex ?? selectedYearIndex;
  const [visibleSectors, setVisibleSectors] = useState<{ [key: string]: boolean }>({
    welfare: true,
    health: true,
    debtInterest: true,
    education: true,
    defence: true,
    otherServices: true,
  });

  const sectors: SectorConfig[] = [
    { key: 'welfare', label: 'Welfare & Pensions', color: '#3b82f6', desc: 'State Pension & working-age support' },
    { key: 'health', label: 'Health', color: '#06b6d4', desc: 'Treasury health expenditure on services' },
    { key: 'debtInterest', label: 'Debt Interest Servicing', color: '#ef4444', desc: 'Government gilt coupons & index bonds' },
    { key: 'education', label: 'Education & Skills', color: '#8b5cf6', desc: 'Primary, secondary, nursery & colleges' },
    { key: 'defence', label: 'Defence & Security', color: '#10b981', desc: 'Armed forces, equipment & NATO operations' },
    { key: 'otherServices', label: 'Other Treasury services', color: '#94a3b8', desc: 'Residual expenditure-on-services functions including EU transactions' },
  ];

  const dataPoints = TEN_YEAR_SECTOR_DATA;
  const baseYearData = dataPoints[0]; // 2014/15
  const latestYearData = dataPoints[dataPoints.length - 1]; // 2024/25
  const peakDebtInterest = dataPoints.reduce((peak, year) => year.debtInterest > peak.debtInterest ? year : peak);

  // SVG Dimensions for Combined Chart
  const svgWidth = 900;
  const svgHeight = 440;
  const marginLeft = 65;
  const marginRight = 30;
  const marginTop = 30;
  const marginBottom = 50;

  const plotWidth = svgWidth - marginLeft - marginRight;
  const plotHeight = svgHeight - marginTop - marginBottom;

  // Max values for scaling
  const maxAbsoluteVal = 450; // official COFOG social protection reaches £387.2bn
  const maxIndexedVal = 250;  // max 250% (indexed base 100%)
  const minIndexedVal = 80;

  const getX = (index: number) => {
    return marginLeft + (index / (dataPoints.length - 1)) * plotWidth;
  };

  const getY = (val: number, sectorKey: SectorConfig['key']) => {
    if (scaleMode === 'absolute') {
      const clamped = Math.max(0, Math.min(maxAbsoluteVal, val));
      return marginTop + plotHeight - (clamped / maxAbsoluteVal) * plotHeight;
    } else {
      // Indexed growth where 2014/15 value = 100%
      const baseVal = baseYearData[sectorKey] as number;
      const indexPercent = (val / baseVal) * 100;
      const clamped = Math.max(minIndexedVal, Math.min(maxIndexedVal, indexPercent));
      return marginTop + plotHeight - ((clamped - minIndexedVal) / (maxIndexedVal - minIndexedVal)) * plotHeight;
    }
  };

  const toggleSector = (key: string) => {
    setVisibleSectors(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const isolateSector = (key: string) => {
    const next: { [key: string]: boolean } = {};
    sectors.forEach(s => {
      next[s.key] = s.key === key;
    });
    setVisibleSectors(next);
  };

  const showAllSectors = () => {
    const next: { [key: string]: boolean } = {};
    sectors.forEach(s => { next[s.key] = true; });
    setVisibleSectors(next);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold border border-blue-500/20">
            <LineChart className="w-3.5 h-3.5" />
            10-Year Sector Growth Line Graph (2014/15 to 2024/25)
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            Growth of UK Public Expenditure by Sector
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
            Trace HM Treasury's official 2014/15 to 2024/25 functional expenditure trajectories (Table 9). 
            Compare actual spending in £ Billions or switch to Indexed Growth (%) to see which departments grew fastest.
          </p>
        </div>

        {/* View & Scale Toggles */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Combined vs Separate */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
            <button
              onClick={() => setViewMode('combined')}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                viewMode === 'combined' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <LineChart className="w-3.5 h-3.5" />
              <span>Combined X/Y</span>
            </button>
            <button
              onClick={() => setViewMode('separate')}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                viewMode === 'separate' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Separate Graphs</span>
            </button>
          </div>

          {/* Absolute £bn vs Indexed % */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-semibold">
            <button
              onClick={() => setScaleMode('absolute')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                scaleMode === 'absolute' ? 'bg-slate-800 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              £ Billions
            </button>
            <button
              onClick={() => setScaleMode('indexed')}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 ${
                scaleMode === 'indexed' ? 'bg-slate-800 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Percent className="w-3 h-3" />
              <span>Indexed Growth</span>
            </button>
          </div>
        </div>
      </div>

      {/* 10-Year Sector Growth Scorecard Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {sectors.map((sector) => {
          const startVal = baseYearData[sector.key] as number;
          const endVal = latestYearData[sector.key] as number;
          const growthPercent = ((endVal - startVal) / startVal) * 100;
          const isHighest = sector.key === 'debtInterest';
          const isLowest = sector.key === 'education';

          return (
            <div
              key={sector.key}
              onClick={() => isolateSector(sector.key)}
              className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 cursor-pointer transition-all shadow-md group space-y-1.5"
              title="Click to isolate this sector line"
            >
              <div className="flex items-center justify-between">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: sector.color }}></span>
                {isHighest && (
                  <span className="text-[9px] uppercase font-bold px-1.5 py-0.2 bg-red-500/20 text-red-400 rounded border border-red-500/30">
                    Fastest
                  </span>
                )}
                {isLowest && (
                  <span className="text-[9px] uppercase font-bold px-1.5 py-0.2 bg-slate-800 text-slate-400 rounded">
                    Slowest
                  </span>
                )}
              </div>
              <div className="text-xs font-bold text-white truncate">{sector.label}</div>
              <div className="text-lg font-black text-white font-mono">
                £{endVal.toFixed(1)}bn
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-slate-400">10-Yr:</span>
                <span className={`font-bold ${growthPercent > 100 ? 'text-red-400' : growthPercent > 40 ? 'text-emerald-400' : 'text-amber-400'}`}>
                  +{growthPercent.toFixed(1)}%
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* VIEW 1: COMBINED MASTER X/Y LINE GRAPH */}
      {viewMode === 'combined' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <LineChart className="w-5 h-5 text-blue-400" />
                <span>
                  {scaleMode === 'absolute' 
                    ? 'UK Expenditure by Main Sector (£ Billions, 2014/15 – 2024/25)' 
                    : 'Indexed Expenditure Growth (Base Year 2014/15 = 100%)'}
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Move your cursor across the chart to inspect figures for each year. Click legend items to toggle lines.
              </p>
            </div>

            <button
              onClick={showAllSectors}
              className="text-xs text-blue-400 hover:text-blue-300 font-medium self-start sm:self-auto"
            >
              Show all sectors
            </button>
          </div>

          {/* Interactive Legend Row */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            {sectors.map((sector) => {
              const isVisible = visibleSectors[sector.key];
              return (
                <button
                  key={sector.key}
                  onClick={() => toggleSector(sector.key)}
                  className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all ${
                    isVisible
                      ? 'bg-slate-950 text-white border-slate-700 shadow-sm'
                      : 'bg-slate-950/40 text-slate-500 border-slate-800/60 line-through opacity-60'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: sector.color }}></span>
                  <span className="font-medium">{sector.label}</span>
                </button>
              );
            })}
          </div>

          {/* Master SVG Line Graph Canvas */}
          <div className="relative w-full bg-slate-950 rounded-xl border border-slate-800 p-2 overflow-hidden shadow-inner">
            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="w-full h-auto select-none"
              onMouseLeave={() => setHoveredYearIndex(null)}
            >
              {/* Y-Axis Grid Lines & Numerical Labels */}
              {scaleMode === 'absolute' ? (
                // Absolute £bn Grid: 0, 50, 100, 150, 200, 250, 300, 350
                [0, 50, 100, 150, 200, 250, 300, 350].map((val) => {
                  const y = marginTop + plotHeight - (val / maxAbsoluteVal) * plotHeight;
                  return (
                    <g key={val} className="text-slate-600 font-mono text-[10px]">
                      <line
                        x1={marginLeft}
                        y1={y}
                        x2={marginLeft + plotWidth}
                        y2={y}
                        stroke="#334155"
                        strokeDasharray={val === 0 ? '0' : '4 4'}
                        strokeOpacity={val === 0 ? 0.8 : 0.4}
                      />
                      <text x={marginLeft - 8} y={y + 3.5} textAnchor="end" fill="#64748b">
                        £{val}bn
                      </text>
                    </g>
                  );
                })
              ) : (
                // Indexed % Grid: 100%, 125%, 150%, 175%, 200%, 225%, 250%
                [100, 125, 150, 175, 200, 225, 250].map((pct) => {
                  const y = marginTop + plotHeight - ((pct - minIndexedVal) / (maxIndexedVal - minIndexedVal)) * plotHeight;
                  return (
                    <g key={pct} className="text-slate-600 font-mono text-[10px]">
                      <line
                        x1={marginLeft}
                        y1={y}
                        x2={marginLeft + plotWidth}
                        y2={y}
                        stroke={pct === 100 ? '#38bdf8' : '#334155'}
                        strokeDasharray={pct === 100 ? '0' : '4 4'}
                        strokeOpacity={pct === 100 ? 0.6 : 0.4}
                      />
                      <text x={marginLeft - 8} y={y + 3.5} textAnchor="end" fill={pct === 100 ? '#38bdf8' : '#64748b'}>
                        {pct}%
                      </text>
                    </g>
                  );
                })
              )}

              {/* X-Axis Vertical Lines & Fiscal Year Labels */}
              {dataPoints.map((dp, idx) => {
                const x = getX(idx);
                return (
                  <g key={dp.year} className="text-slate-500 font-mono text-[10px]">
                    <line
                      x1={x}
                      y1={marginTop}
                      x2={x}
                      y2={marginTop + plotHeight}
                      stroke="#1e293b"
                      strokeWidth="1"
                    />
                    <text x={x} y={marginTop + plotHeight + 20} textAnchor="middle" fill="#94a3b8">
                      {dp.year.split('/')[0].slice(-2)}/{dp.year.split('/')[1]?.slice(0, 2) || ''}
                    </text>
                  </g>
                );
              })}

              {/* X-Axis Baseline Rule */}
              <line
                x1={marginLeft}
                y1={marginTop + plotHeight}
                x2={marginLeft + plotWidth}
                y2={marginTop + plotHeight}
                stroke="#475569"
                strokeWidth="1.5"
              />

              {/* Sector Trend Lines & Data Dots */}
              {sectors.map((sector) => {
                if (!visibleSectors[sector.key]) return null;

                // Build path string
                const points = dataPoints.map((dp, idx) => {
                  const x = getX(idx);
                  const y = getY(dp[sector.key] as number, sector.key);
                  return `${x},${y}`;
                });
                const pathData = `M ${points.join(' L ')}`;

                return (
                  <g key={sector.key}>
                    {/* Shadow / Glow line */}
                    <path
                      d={pathData}
                      fill="none"
                      stroke={sector.color}
                      strokeWidth="6"
                      strokeOpacity="0.15"
                      strokeLinecap="round"
                    />
                    {/* Main stroke line */}
                    <path
                      d={pathData}
                      fill="none"
                      stroke={sector.color}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Data Points */}
                    {dataPoints.map((dp, idx) => {
                      const x = getX(idx);
                      const y = getY(dp[sector.key] as number, sector.key);
                      const isHovered = activeHoverIndex === idx;

                      return (
                        <circle
                          key={idx}
                          cx={x}
                          cy={y}
                          r={isHovered ? 5.5 : 3.5}
                          fill={sector.color}
                          stroke="#090d16"
                          strokeWidth="2"
                          className="transition-all duration-150 cursor-pointer hover:r-6"
                        />
                      );
                    })}
                  </g>
                );
              })}

              {/* Interactive Vertical Cursor Guide Line */}
              {activeHoverIndex !== null && (
                <line
                  x1={getX(activeHoverIndex)}
                  y1={marginTop}
                  x2={getX(activeHoverIndex)}
                  y2={marginTop + plotHeight}
                  stroke="#f8fafc"
                  strokeWidth="1.5"
                  strokeDasharray="3 3"
                  className="pointer-events-none"
                />
              )}

              {/* Transparent Interactive Hover Slices */}
              {dataPoints.map((_, idx) => {
                const x = getX(idx);
                const sliceWidth = plotWidth / (dataPoints.length - 1);
                return (
                  <rect
                    key={idx}
                    x={x - sliceWidth / 2}
                    y={marginTop}
                    width={sliceWidth}
                    height={plotHeight}
                    fill="transparent"
                    className="cursor-pointer"
                    onMouseEnter={() => setHoveredYearIndex(idx)}
                  />
                );
              })}
            </svg>
          </div>

          <label className="flex flex-wrap items-center gap-2 text-xs text-slate-300">
            Inspect fiscal year
            <select
              className="rounded-md border border-slate-600 bg-slate-900 px-2 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-400"
              value={selectedYearIndex ?? ''}
              onChange={event => {
                const year = event.currentTarget.value;
                setSelectedYearIndex(year === '' ? null : Number(year));
                setHoveredYearIndex(null);
              }}
            >
              <option value="">Choose a year</option>
              {dataPoints.map((point, index) => (
                <option key={point.year} value={index}>{point.year}</option>
              ))}
            </select>
          </label>

          {/* Interactive Inspection HUD */}
          {activeHoverIndex !== null && (
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 animate-fadeIn" role="region" aria-label="Selected fiscal year spending">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white">
                    Inspecting Fiscal Year: <strong className="text-blue-400 font-mono">{dataPoints[activeHoverIndex].year}</strong>
                  </span>
                  <span className="text-xs text-slate-400">
                    (Total Spending: £{dataPoints[activeHoverIndex].totalSpending.toFixed(1)}bn)
                  </span>
                </div>
                <span className="text-xs text-slate-500">
                  {scaleMode === 'absolute' ? 'Showing actual £bn' : 'Showing % growth relative to 2014/15'}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {sectors.map((sec) => {
                  const currentVal = dataPoints[activeHoverIndex][sec.key] as number;
                  const startVal = baseYearData[sec.key] as number;
                  const growthSince2014 = ((currentVal - startVal) / startVal) * 100;

                  return (
                    <div key={sec.key} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                      <div className="text-[11px] font-semibold text-slate-300 truncate flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: sec.color }}></span>
                        <span className="truncate">{sec.label}</span>
                      </div>
                      <div className="text-base font-bold text-white font-mono">
                        £{currentVal.toFixed(1)}bn
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono">
                        vs 2014: <strong className={growthSince2014 >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                          {growthSince2014 >= 0 ? `+${growthSince2014.toFixed(1)}%` : `${growthSince2014.toFixed(1)}%`}
                        </strong>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* VIEW 2: SEPARATE INDIVIDUAL X/Y GRAPHS (SMALL MULTIPLES) */}
      {viewMode === 'separate' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white">
                Individual X/Y Line Graphs Per Expenditure Sector
              </h3>
              <p className="text-xs text-slate-400">
                Dedicated independent coordinate axes for each service showing 10-year trend progression
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {sectors.map((sector) => {
              const startVal = baseYearData[sector.key] as number;
              const endVal = latestYearData[sector.key] as number;
              const delta = endVal - startVal;
              const growthPct = (delta / startVal) * 100;

              // Local max for this individual graph
              const values = dataPoints.map(dp => dp[sector.key] as number);
              const minVal = Math.min(...values) * 0.85;
              const maxVal = Math.max(...values) * 1.15;

              // Local mini SVG coords
              const miniW = 340;
              const miniH = 180;
              const miniML = 45;
              const miniMR = 15;
              const miniMT = 15;
              const miniMB = 30;
              const mPlotW = miniW - miniML - miniMR;
              const mPlotH = miniH - miniMT - miniMB;

              const getMiniX = (idx: number) => miniML + (idx / (dataPoints.length - 1)) * mPlotW;
              const getMiniY = (val: number) => miniMT + mPlotH - ((val - minVal) / (maxVal - minVal)) * mPlotH;

              const points = dataPoints.map((dp, idx) => `${getMiniX(idx)},${getMiniY(dp[sector.key] as number)}`).join(' L ');
              const areaPath = `M ${getMiniX(0)},${miniMT + mPlotH} L ${points} L ${getMiniX(dataPoints.length - 1)},${miniMT + mPlotH} Z`;

              return (
                <div
                  key={sector.key}
                  className="p-5 rounded-xl bg-slate-900 border border-slate-800 shadow-lg space-y-3 flex flex-col justify-between"
                >
                  {/* Card Header */}
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-md" style={{ backgroundColor: sector.color }}></span>
                        <div>
                          <h4 className="text-sm font-bold text-white">{sector.label}</h4>
                          <span className="text-[11px] text-slate-400">{sector.desc}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-base font-extrabold text-white font-mono">
                          £{endVal.toFixed(1)}bn
                        </div>
                        <div className={`text-xs font-bold font-mono ${growthPct >= 50 ? 'text-red-400' : 'text-emerald-400'}`}>
                          +{growthPct.toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Individual Mini X/Y SVG */}
                  <div className="w-full bg-slate-950 rounded-lg p-2 border border-slate-800/80">
                    <svg viewBox={`0 0 ${miniW} ${miniH}`} className="w-full h-auto">
                      {/* Grid line min & max */}
                      <line x1={miniML} y1={miniMT} x2={miniML + mPlotW} y2={miniMT} stroke="#334155" strokeDasharray="3 3" strokeOpacity="0.4" />
                      <line x1={miniML} y1={miniMT + mPlotH} x2={miniML + mPlotW} y2={miniMT + mPlotH} stroke="#334155" strokeOpacity="0.6" />

                      {/* Y-axis labels */}
                      <text x={miniML - 6} y={miniMT + 8} textAnchor="end" fill="#64748b" className="text-[9px] font-mono">
                        £{Math.round(maxVal)}b
                      </text>
                      <text x={miniML - 6} y={miniMT + mPlotH} textAnchor="end" fill="#64748b" className="text-[9px] font-mono">
                        £{Math.round(minVal)}b
                      </text>

                      {/* X-axis labels */}
                      <text x={miniML} y={miniMT + mPlotH + 18} textAnchor="start" fill="#94a3b8" className="text-[9px] font-mono">
                        2014/15
                      </text>
                      <text x={miniML + mPlotW} y={miniMT + mPlotH + 18} textAnchor="end" fill="#94a3b8" className="text-[9px] font-mono">
                        2024/25
                      </text>

                      {/* Area Fill */}
                      <path d={areaPath} fill={sector.color} fillOpacity="0.1" />

                      {/* Line */}
                      <path d={`M ${points}`} fill="none" stroke={sector.color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

                      {/* Start and End Dots */}
                      <circle cx={getMiniX(0)} cy={getMiniY(startVal)} r="3.5" fill={sector.color} stroke="#0f172a" strokeWidth="1.5" />
                      <circle cx={getMiniX(dataPoints.length - 1)} cy={getMiniY(endVal)} r="4" fill={sector.color} stroke="#ffffff" strokeWidth="1.5" />
                    </svg>
                  </div>

                  {/* Footnote summary */}
                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
                    <span>10-Yr Increase: <strong className="text-white">+£{delta.toFixed(1)}bn</strong></span>
                    <span>2014: £{startVal.toFixed(1)}bn</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Structural Growth Insights Callout */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-red-950/20 via-slate-900 to-blue-950/20 border border-slate-800 space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          Key Observations from the 10-Year Sector Growth Data:
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-300 leading-relaxed">
          <div>
            <strong className="text-red-400 block mb-0.5">1. Debt interest</strong>
            Debt interest rose from £{baseYearData.debtInterest.toFixed(1)}bn in {baseYearData.year} to £{latestYearData.debtInterest.toFixed(1)}bn in {latestYearData.year}. It peaked at £{peakDebtInterest.debtInterest.toFixed(1)}bn in {peakDebtInterest.year} over the period shown.
          </div>
          <div>
            <strong className="text-cyan-400 block mb-0.5">2. Health spending</strong>
            Treasury health expenditure rose from £{baseYearData.health.toFixed(1)}bn in {baseYearData.year} to £{latestYearData.health.toFixed(1)}bn in {latestYearData.year}, an increase of £{(latestYearData.health - baseYearData.health).toFixed(1)}bn in cash terms.
          </div>
        </div>
      </div>
    </div>
  );
};

