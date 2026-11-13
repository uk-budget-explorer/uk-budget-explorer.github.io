import React from 'react';
import {
  Landmark,
  PieChart,
  Sliders,
  LineChart,
  Coins,
  HelpCircle,
  ExternalLink,
  BarChart3,
  Globe2,
  Users
} from 'lucide-react';
import { UK_FISCAL_TOTALS } from '../data/ukBudgetData';
import { DebtInterestTicker } from './DebtInterestTicker';

export type TabType = 'overview' | 'yearly_splits' | 'g20' | 'per_person' | 'spending' | 'revenue' | 'simulator' | 'historical';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onOpenAbout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onOpenAbout }) => {
  const tabs = [
    { id: 'overview', label: 'Overview & Flow', icon: Landmark, badge: 'Summary' },
    { id: 'yearly_splits', label: 'Yearly Splits', icon: BarChart3, badge: 'Interactive' },
    { id: 'per_person', label: 'Per Person Budget', icon: Users, badge: `£${(UK_FISCAL_TOTALS.totalSpending * 1000 / UK_FISCAL_TOTALS.population / 1000).toFixed(1)}k/ea` },
    { id: 'g20', label: 'G20 Comparison', icon: Globe2, badge: 'Debt & Spend' },
    { id: 'spending', label: 'Public Spending', icon: PieChart, badge: '£1.29T' },
    { id: 'revenue', label: 'Tax Receipts', icon: Coins, badge: '£1.14T' },
    { id: 'simulator', label: 'Chancellor Simulator', icon: Sliders, badge: 'Interactive' },
    { id: 'historical', label: 'Historical Trends', icon: LineChart, badge: '2000–2026' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 shadow-xl">
      {/* Top micro bar with official data notice & LIVE TICKER */}
      <div className="bg-slate-950 px-4 py-1.5 border-b border-slate-800/60 text-xs text-slate-400 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5 font-medium text-amber-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            ONS 2024/25 outturn · OBR 2026/27 interest
          </span>
          <span className="hidden sm:inline text-slate-600">|</span>
          <span className="hidden sm:inline">Total Public Expenditure: <strong className="text-slate-200">£{UK_FISCAL_TOTALS.totalSpending.toFixed(1)}bn (ONS, 2024/25)</strong></span>
          <span className="hidden md:inline text-slate-600">|</span>
          <span className="hidden md:inline">Receipts: <strong className="text-slate-200">£{UK_FISCAL_TOTALS.totalReceipts.toFixed(1)}bn</strong></span>
        </div>

        {/* Live Debt Interest Mini Ticker in Header */}
        <div className="flex items-center gap-3 text-xs">
          <DebtInterestTicker variant="mini" />
          <span className="hidden sm:inline text-slate-600">|</span>
          <button
            onClick={onOpenAbout}
            className="text-slate-400 hover:text-slate-200 flex items-center gap-1 transition-colors"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Data Sources</span>
          </button>
        </div>
      </div>

      {/* Main Branding & Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3.5">
          {/* Logo / Title */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('overview')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-amber-500 p-0.5 shadow-lg shadow-blue-500/20">
              <div className="w-full h-full bg-slate-900 rounded-[10px] flex items-center justify-center">
                <span className="text-xl">🇬🇧</span>
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                  UK National Budget Explorer
                </h1>
                <span className="text-[10px] uppercase font-semibold tracking-wider bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded-full border border-blue-500/20">
                  Official data
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Independent explorer of UK public finances, spending & policy scenarios
              </p>
            </div>
          </div>

          {/* Quick Action Badge */}
          <div className="flex items-center gap-2">
            <a
              href="https://obr.uk"
              target="_blank"
              rel="noreferrer"
              className="text-xs text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-800 px-2.5 py-1.5 rounded-lg border border-slate-700/80 transition-all flex items-center gap-1.5"
            >
              <span className="hidden sm:inline">Office for Budget Responsibility</span>
              <span className="sm:hidden">OBR</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
          </div>
        </div>

        {/* Tab Navigation Bar */}
        <nav className="flex space-x-1 overflow-x-auto pb-2 scrollbar-none border-t border-slate-800/80 pt-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as TabType)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-150 ${isActive
                  ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                  }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-md font-semibold tracking-tight ${isActive
                      ? 'bg-blue-700/80 text-blue-100'
                      : 'bg-slate-800 text-slate-400 border border-slate-700/50'
                      }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
