import React from 'react';
interface Props { title: string; reason: string; sources: string; }
export const FinancialVerificationNotice: React.FC<Props> = ({ title, reason, sources }) => (
  <section className="rounded-2xl bg-slate-900 border border-amber-800/60 p-6 sm:p-8 space-y-4" role="status" aria-live="polite">
    <div className="text-xs uppercase tracking-widest text-amber-400 font-bold">Independent verification in progress</div>
    <h2 className="text-2xl sm:text-3xl font-extrabold text-white">{title}</h2>
    <p className="text-slate-200 max-w-3xl leading-relaxed">{reason}</p>
    <p className="text-sm text-slate-400">Required source basis: {sources}.</p>
    <p className="text-sm text-amber-300">This module is temporarily withheld rather than publish values that cannot be verified. The original design and feature code are preserved in the repository.</p>
  </section>
);
