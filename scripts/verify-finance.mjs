import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import ts from 'typescript';

const source = fs.readFileSync('src/data/ukBudgetData.ts', 'utf8');
const output = ts.transpileModule(source, {
  compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.CommonJS }
}).outputText;
const sandbox = { exports: {}, console };
vm.runInNewContext(output, sandbox, { timeout: 5000 });
const {
  UK_FISCAL_TOTALS, UK_SPENDING_DATA, UK_REVENUE_DATA, HMRC_REVENUE_TOTAL_2024_25, HMRC_REVENUE_TOTAL_2025_26,
  LATEST_ONS_NET_DEBT, DEBT_INTEREST_METRICS, estimateDebtWithInterest,
  UK_HISTORICAL_DATA, YEARLY_SPENDING_SPLITS, YEARLY_REVENUE_SPLITS
} = sandbox.exports;

const close = (actual, expected, tolerance=0.001) =>
  assert.ok(Number.isFinite(actual) && Math.abs(actual - expected) <= tolerance,
    'Expected ' + actual + ' to be within ' + tolerance + ' of ' + expected);

close(UK_FISCAL_TOTALS.totalSpending, 1290.348);
close(UK_FISCAL_TOTALS.totalReceipts, 1140.539);
close(UK_FISCAL_TOTALS.netBorrowing, 149.809);
close(UK_FISCAL_TOTALS.borrowingPercentGdp, 5.1);
close(UK_FISCAL_TOTALS.totalSpending - UK_FISCAL_TOTALS.totalReceipts, UK_FISCAL_TOTALS.netBorrowing);
close(UK_FISCAL_TOTALS.netDebt, 2806.699);
close(UK_FISCAL_TOTALS.population, 69.2563);
close(UK_FISCAL_TOTALS.taxPayingAdults, 38.6);
close(DEBT_INTEREST_METRICS.annualAmount, 123900000000);
close(DEBT_INTEREST_METRICS.perSecond, DEBT_INTEREST_METRICS.annualAmount / 31536000, 0.00001);

const interestStart = Date.parse('2026-10-01T00:00:00+01:00');
const forecastEnd = Date.parse('2027-04-01T00:00:00+01:00');
const baseline = LATEST_ONS_NET_DEBT.amount;
close(estimateDebtWithInterest(interestStart - 1000).total, baseline);
const afterDay = estimateDebtWithInterest(interestStart + 86_400_000);
close(afterDay.interest, Math.round(DEBT_INTEREST_METRICS.perDay));
close(afterDay.total, baseline + afterDay.interest);
close(estimateDebtWithInterest(forecastEnd + 86_400_000).total, estimateDebtWithInterest(forecastEnd).total);

assert.equal(YEARLY_REVENUE_SPLITS.length,5,'HMRC official tax history has five sourced years');
for(const row of YEARLY_REVENUE_SPLITS){
  close(row.incomeTax+row.nics+row.vat+row.corpTax+row.otherTaxes,row.totalReceiptsAndBorrowing);
  close(row.borrowing,0);
}
close(YEARLY_REVENUE_SPLITS[0].totalReceiptsAndBorrowing,608.8);
close(YEARLY_REVENUE_SPLITS[4].totalReceiptsAndBorrowing,876.0);
assert.equal(UK_REVENUE_DATA.length, 7, 'Exactly seven HMRC tax groups');
close(HMRC_REVENUE_TOTAL_2024_25, 876.0);
close(HMRC_REVENUE_TOTAL_2025_26, 966.4);
close(LATEST_ONS_NET_DEBT.amount, 3_005_000_000_000);
close(LATEST_ONS_NET_DEBT.percentGdp, 94.0);
close(UK_REVENUE_DATA.reduce((sum, item) => sum + item.percentage, 0), 100);
close(UK_REVENUE_DATA.reduce((a,b)=>a+b.amount,0),HMRC_REVENUE_TOTAL_2024_25);
close(UK_REVENUE_DATA.find(x=>x.id === 'income-tax').amount,309.4);
close(UK_REVENUE_DATA.find(x=>x.id === 'nics').amount,168.8);
close(UK_REVENUE_DATA.find(x=>x.id === 'vat').amount,178.5);
close(UK_REVENUE_DATA.find(x=>x.id === 'corporation-tax').amount,89.7);
assert.ok(!UK_REVENUE_DATA.some(x=>x.id === 'borrowing-shortfall'),
  'Borrowing is NOT HMRC tax revenue');
assert.equal(UK_HISTORICAL_DATA.length,13,'Historical chart must show 13 independently checked ONS fiscal periods');
close(UK_HISTORICAL_DATA[0].borrowing,-16.305);
close(UK_HISTORICAL_DATA[UK_HISTORICAL_DATA.length-1].debtAmount,2916.811);
for(const row of UK_HISTORICAL_DATA){
  close(row.spending - row.receipts,row.borrowing);
}
assert.ok(UK_SPENDING_DATA.some(x=>x.name==='Social protection'),'Official spending category exists');
assert.equal(YEARLY_SPENDING_SPLITS.length,15,'Treasury Table 9 covers every year 2010/11–2024/25');
for(const row of YEARLY_SPENDING_SPLITS){
  close(row.welfare+row.health+row.debtInterest+row.education+row.defence+row.otherServices,row.totalSpending,0.00001);
}
close(YEARLY_SPENDING_SPLITS[0].totalSpending,675.3);
close(YEARLY_SPENDING_SPLITS[YEARLY_SPENDING_SPLITS.length-1].totalSpending,1166.3);
close(YEARLY_SPENDING_SPLITS[YEARLY_SPENDING_SPLITS.length-1].welfare,387.2);
close(YEARLY_SPENDING_SPLITS[YEARLY_SPENDING_SPLITS.length-1].health,242.4);
close(YEARLY_SPENDING_SPLITS[YEARLY_SPENDING_SPLITS.length-1].debtInterest,126.5);
assert.equal(UK_SPENDING_DATA.length, 10, 'Exactly ten official COFOG functional categories');
close(UK_SPENDING_DATA.reduce((a,b)=>a+b.amount,0),1167.6);
assert.ok(UK_SPENDING_DATA.every(x=>x.delVsAme==='Mixed'),
  'COFOG and budget control DEL/AME must not be misrepresented as equivalent');
assert.ok(UK_SPENDING_DATA.every(x=>x.breakdown.length===0),
  'No invented departmental or programme sub-allocations');
const history = UK_HISTORICAL_DATA.find(x=>x.year==='2024/25');
close(history.borrowing, 149.809);
close(history.debtAmount, 2806.699);

console.log('PASS: ONS/OBR/HMT/HMRC reconciliations, 15 annual Treasury category splits, historical outturns and demographics.');
