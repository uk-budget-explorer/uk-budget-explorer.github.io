import React, { useState } from 'react';

const source = 'https://www.gov.uk/government/publications/budget-2026-document/budget-2026-html';

const scenarios = [
  { name: 'Council tax rebate funding in England', type: 'Public spending', year: '2026/27', tableRow: 1, borrowingImpact: 2625 },
  { name: 'Temporary VAT cut on domestic electricity', type: 'Tax receipts', year: '2026/27', tableRow: 2, borrowingImpact: 755 },
  { name: 'Fuel duty cut extension and deferred uprating', type: 'Tax receipts', year: '2026/27', tableRow: 3, borrowingImpact: 575 },
];

export const ChancellorSimulatorTab: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const scenario = scenarios[selectedIndex];

  return (
    <section className="space-y-5 rounded-2xl border border-slate-800 bg-slate-900 p-4 sm:p-6">
      <div>
        <h2 className="text-2xl font-extrabold text-white">Chancellor Simulator</h2>
        <p className="mt-2 text-sm text-slate-300">
          Choose a published Budget 2026 example to see its estimated direct effect on UK public sector net borrowing.
          Each example shows the effect of one measure in the stated financial year.
        </p>
      </div>
      <label className="block max-w-xl text-sm text-slate-200">
        Budget measure
        <select className="mt-2 block w-full rounded-lg border border-slate-600 bg-slate-950 p-3 text-white"
                value={selectedIndex} onChange={event => setSelectedIndex(Number(event.currentTarget.value))}>
          {scenarios.map((item, index) => <option key={item.tableRow} value={index}>{item.name}</option>)}
        </select>
      </label>
      <div className="rounded-xl border border-slate-700 bg-slate-950 p-4" aria-live="polite" aria-atomic="true">
        <h3 className="font-semibold text-white">{scenario.name}</h3>
        <p className="mt-1 text-sm text-slate-300">{scenario.type} · {scenario.year}</p>
        <p className="mt-3 text-2xl font-bold text-white">£{scenario.borrowingImpact.toLocaleString('en-GB')} million more borrowing</p>
        <p className="mt-2 text-sm text-slate-300">
          {scenario.type === 'Public spending'
            ? 'Higher public spending increases borrowing in this example.'
            : 'Lower tax receipts increase borrowing in this example.'}
        </p>
        <a className="mt-3 inline-block text-sm text-blue-300 underline" href={source}>
          HM Treasury Budget 2026, Table 6.1, measure {scenario.tableRow}
        </a>
      </div>
      <p className="text-sm text-slate-300">
        These published estimates describe national borrowing effects. Actual outcomes depend on how the measures are implemented and how the economy responds.
      </p>
    </section>
  );
};
