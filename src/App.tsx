import React, { useState, useEffect } from 'react';
import { Header, TabType } from './components/Header';
import { OverviewTab } from './components/OverviewTab';
import { YearlySplitGraphs } from './components/YearlySplitGraphs';
import { G20ComparisonTab } from './components/G20ComparisonTab';
import { PerPersonBudgetCalculator } from './components/PerPersonBudgetCalculator';
import { SpendingTab } from './components/SpendingTab';
import { RevenueTab } from './components/RevenueTab';
import { ChancellorSimulatorTab } from './components/ChancellorSimulatorTab';
import { HistoricalTab } from './components/HistoricalTab';
import { SpendingDetailModal } from './components/SpendingDetailModal';
import { AboutModal } from './components/AboutModal';
import { SpendingItem } from './data/ukBudgetData';
import { ExternalLink } from 'lucide-react';
import { ConsentBanner } from './components/ConsentBanner';
import { trackEvent } from "./utils/analytics";

export const App: React.FC = () => {
  // Import GA tracking and consent banner
  // We'll add imports at top separately
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [selectedSpendingItem, setSelectedSpendingItem] = useState<SpendingItem | null>(null);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  const handleSelectSpendingItem = (item: SpendingItem) => {
    setSelectedSpendingItem(item);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Top sticky navigation bar with real-time ticker */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenAbout={() => setIsAboutOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div role="note" className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-1 rounded-lg border border-slate-800 bg-slate-900/70 px-3 py-2 text-xs text-slate-300">
          <span className="font-semibold text-slate-100">Financial data last reviewed: 13 November 2026</span>
          <span className="hidden sm:inline text-slate-600" aria-hidden="true">|</span>
          <span>Figures use the source release dates and financial periods shown in each section; official statistics may be revised.</span>
          <button type="button" onClick={() => setIsAboutOpen(true)} className="text-blue-300 hover:text-blue-200 underline underline-offset-2">
            Methodology &amp; sources
          </button>
        </div>
        {activeTab === 'overview' && (
          <OverviewTab
            setActiveTab={setActiveTab}
            onSelectSpendingItem={handleSelectSpendingItem}
          />
        )}

        {activeTab === 'yearly_splits' && <YearlySplitGraphs />}

        {activeTab === 'per_person' && <PerPersonBudgetCalculator />}

        {activeTab === 'g20' && <G20ComparisonTab />}

        {activeTab === 'spending' && (
          <SpendingTab
            selectedItem={selectedSpendingItem}
            setSelectedItem={setSelectedSpendingItem}
          />
        )}

        {activeTab === 'revenue' && <RevenueTab />}


        {activeTab === 'simulator' && <ChancellorSimulatorTab />}

        {activeTab === 'historical' && <HistoricalTab />}
      </main>

      {/* Modals */}
      <SpendingDetailModal
        item={selectedSpendingItem}
        onClose={() => setSelectedSpendingItem(null)}
      />

      <AboutModal
        isOpen={isAboutOpen}
        onClose={() => setIsAboutOpen(false)}
      />

      <ConsentBanner />

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <span className="text-xl">🇬🇧</span>
            <div>
              <div className="font-bold text-white">UK National Budget Explorer & Policy Simulator</div>
              <p className="text-[11px] text-slate-500">
                Independent analysis using dated ONS, HM Treasury, HMRC, OBR and IMF data.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-xs">
            <button
              onClick={() => setIsAboutOpen(true)}
              className="text-slate-400 hover:text-white transition-colors"
            >
              Methodology & Sources
            </button>
            <a
              href="https://www.gov.uk/government/organisations/hm-treasury"
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-white transition-colors flex items-center gap-1"
            >
              <span>HM Treasury</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://github.com/uk-budget-explorer/uk-budget-explorer.github.io/issues"
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-white transition-colors"
            >
              Report an issue
            </a>
            <a
              href="https://obr.uk"
              target="_blank"
              rel="noreferrer"
              className="text-slate-400 hover:text-white transition-colors flex items-center gap-1"
            >
              <span>OBR</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
