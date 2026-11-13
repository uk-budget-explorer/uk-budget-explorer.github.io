import React from 'react';
import { X, Sparkles, AlertCircle, Users, Layers, ExternalLink } from 'lucide-react';
import { SpendingItem, UK_FISCAL_TOTALS } from '../data/ukBudgetData';
import { IconHelper } from './IconHelper';

interface SpendingDetailModalProps {
  item: SpendingItem | null;
  onClose: () => void;
}

export const SpendingDetailModal: React.FC<SpendingDetailModalProps> = ({ item, onClose }) => {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] animate-scaleUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-6 border-b border-slate-800 flex items-start justify-between gap-4 bg-slate-950/60">
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg shrink-0"
              style={{ backgroundColor: `${item.color}25`, color: item.color }}
            >
              <IconHelper name={item.icon} className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-lg font-bold text-white">{item.name}</h3>
                <span 
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                    item.delVsAme === 'AME' 
                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/30' 
                      : 'bg-blue-500/10 text-blue-400 border-blue-500/30'
                  }`}
                >
                  {item.delVsAme}
                </span>
              </div>
              <span className="text-xs text-slate-400">{item.category}</span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[11px] text-slate-400 block font-medium">Total Allocation</span>
              <span className="text-xl font-extrabold text-white mt-1 block">£{item.amount.toFixed(1)}bn</span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[11px] text-slate-400 block font-medium">Share of UK Budget</span>
              <span className="text-xl font-extrabold mt-1 block" style={{ color: item.color }}>
                {item.percentage}%
              </span>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-[11px] text-slate-400 block font-medium">Cost Per Resident</span>
              <span className="text-xl font-extrabold text-slate-200 mt-1 block">
                £{item.perCapita.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Sector Overview & Strategic Mission
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/40 p-3.5 rounded-xl border border-slate-800/80">
              {item.description}
            </p>
          </div>

          {/* Detailed Sub-Programs */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              Sub-Programs & Departmental Budget Breakdown
            </h4>
            <div className="space-y-2.5">
              {item.breakdown.map((sub, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-200">{sub.name}</span>
                    <span className="text-xs font-bold text-white bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                      £{sub.amount.toFixed(1)}bn
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{sub.description}</p>
                  <div className="flex items-center gap-2 pt-1 text-[10px] text-slate-500">
                    <div className="flex-1 h-1 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${(sub.amount / item.amount) * 100}%`,
                          backgroundColor: item.color
                        }}
                      />
                    </div>
                    <span>{((sub.amount / item.amount) * 100).toFixed(0)}% of this sector</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Facts */}
          <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-900/40 space-y-2">
            <h4 className="text-xs font-bold text-blue-300 uppercase tracking-wide">
              Key Policy Context & Parliamentary Analysis:
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
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

