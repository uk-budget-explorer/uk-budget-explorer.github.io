import React from 'react';
import { g20FiscalData } from '../data/g20FiscalData';

const countries = [...g20FiscalData].sort((a, b) => b.debt - a.debt);

export const G20ComparisonTab: React.FC = () => (
  <section className="space-y-5 rounded-2xl border border-slate-800 bg-slate-900 p-4 sm:p-6">
    <h2 className="text-2xl font-extrabold text-white">G20 public finances</h2>
    <p className="text-sm text-slate-300">
      The IMF’s October 2026 projections cover the same general government measures for each of the 19 national members.
      The European Union and African Union are regional members and sit outside this country ranking.
      The UK overview uses ONS public sector net debt, a different measure from the IMF gross debt shown here.
    </p>
    <div className="overflow-x-auto rounded-lg border border-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-400"
         tabIndex={0} role="region" aria-label="Scrollable G20 country comparison">
      <table className="w-full min-w-[38rem] text-sm">
        <caption className="p-3 text-left text-slate-300">2026 projections, all figures as a percentage of GDP</caption>
        <thead className="bg-slate-950 text-slate-200">
          <tr>
            <th scope="col" className="p-3 text-left">Country</th>
            <th scope="col" className="p-3 text-right">Gross debt</th>
            <th scope="col" className="p-3 text-right">Spending</th>
            <th scope="col" className="p-3 text-right">Revenue</th>
            <th scope="col" className="p-3 text-right">Fiscal balance</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800">
          {countries.map(country => (
            <tr key={country.code} className={country.code === 'GBR' ? 'bg-blue-950 text-white' : 'text-slate-200'}>
              <th scope="row" className="p-3 text-left font-medium">{country.name}</th>
              {[country.debt, country.spending, country.revenue, country.balance].map((value, index) => (
                <td key={index} className="p-3 text-right tabular-nums">{value.toFixed(1)}%</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <p className="text-sm text-slate-300">A negative fiscal balance indicates net borrowing. A positive balance indicates net lending.</p>
    <a className="inline-block text-sm text-blue-300 underline" href="https://data.imf.org/Datasets/WEO">
      IMF World Economic Outlook database
    </a>
  </section>
);
