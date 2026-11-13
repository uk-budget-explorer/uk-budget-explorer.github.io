export interface SpendingItem {
  id: string;
  name: string;
  category: string;
  amount: number; // in billions GBP
  percentage: number;
  perCapita: number; // GBP per UK resident
  delVsAme: 'DEL' | 'AME' | 'Mixed'; // Departmental Expenditure Limits vs Annually Managed Expenditure
  icon: string;
  color: string;
  description: string;
  breakdown: {
    name: string;
    amount: number;
    description: string;
  }[];
  keyFacts: string[];
}

export interface RevenueItem {
  id: string;
  name: string;
  category: 'Direct Taxes' | 'Indirect Taxes' | 'Capital & Business Taxes' | 'Duties & Levies' | 'Other';
  amount: number; // in billions GBP
  percentage: number;
  color: string;
  description: string;
  details: string;
}

export interface HistoricalYearData {
  year: string;
  spending: number; // £bn
  receipts: number; // £bn
  borrowing: number; // £bn
  debtPercentGdp: number; // %
  debtAmount: number; // £bn
  gdp: number; // £bn
  inflation: number; // %
  bankRate: number; // %
  keyEvent?: string;
}

export interface FiscalTotals {
  fiscalYear: string;
  totalSpending: number; // £bn
  totalReceipts: number; // £bn
  netBorrowing: number; // £bn
  borrowingPercentGdp: number; // %
  netDebt: number; // £bn
  debtPercentGdp: number; // %
  gdp: number; // £bn
  population: number; // millions
  taxPayingAdults: number; // millions
}

export const UK_FISCAL_TOTALS: FiscalTotals = {
  // ONS Public Sector Finances (October 2026 vintage), April 2024-March 2025.
  // All monetary figures £bn. ONS definition chosen so spending - receipts = borrowing.
  fiscalYear: '2024/25 (ONS outturn, Oct 2026 vintage)',
  totalSpending: 1290.348,
  totalReceipts: 1140.539,
  netBorrowing: 149.809,
  borrowingPercentGdp: 5.1, // ONS J5IJ, financial year ending March 2025
  netDebt: 2806.699, // March 2025 PSND ex banks
  debtPercentGdp: 92.9, // ONS March 2025 PSND / GDP
  gdp: 3021.2, // indicative ratio-implied denominator; do not label as official annual GDP
  population: 69.2563, // ONS revised mid-2024 population, published October 2026
  taxPayingAdults: 38.6, // HMRC 2024/25 estimated Income Tax payers, published July 2026
};

export const UK_SPENDING_DATA: SpendingItem[] = [
  {
    id: 'social-protection', name: 'Social protection', category: 'Welfare & Benefits', amount: 387.2,
    percentage: 33.1620, perCapita: Math.round(387.2 * 1000 / UK_FISCAL_TOTALS.population),
    delVsAme: 'Mixed', // COFOG is NOT a DEL/AME classification; do not infer one
    icon: 'Shield', color: '#3b82f6',
    description: 'State pensions, social assistance and other government social protection expenditure.',
    breakdown: [], // Not invented: detailed programme allocations require source verification
    keyFacts: ['HM Treasury, Public Spending Statistics May 2026, Table 9, 2024/25 outturn.']
  },
  {
    id: 'health', name: 'Health', category: 'Public Services', amount: 242.4,
    percentage: 20.7605, perCapita: Math.round(242.4 * 1000 / UK_FISCAL_TOTALS.population),
    delVsAme: 'Mixed', // COFOG is NOT a DEL/AME classification; do not infer one
    icon: 'HeartPulse', color: '#06b6d4',
    description: 'Government expenditure on health under the Treasury COFOG classification.',
    breakdown: [], // Not invented: detailed programme allocations require source verification
    keyFacts: ['HM Treasury, Public Spending Statistics May 2026, Table 9, 2024/25 outturn.']
  },
  {
    id: 'general-public-services', name: 'General public services', category: 'Administration', amount: 159.5,
    percentage: 13.6605, perCapita: Math.round(159.5 * 1000 / UK_FISCAL_TOTALS.population),
    delVsAme: 'Mixed', // COFOG is NOT a DEL/AME classification; do not infer one
    icon: 'Building2', color: '#64748b',
    description: 'General public services, including public debt transactions and government administration within the functional classification.',
    breakdown: [], // Not invented: detailed programme allocations require source verification
    keyFacts: ['HM Treasury, Public Spending Statistics May 2026, Table 9, 2024/25 outturn.']
  },
  {
    id: 'education', name: 'Education', category: 'Public Services', amount: 122.6,
    percentage: 10.5002, perCapita: Math.round(122.6 * 1000 / UK_FISCAL_TOTALS.population),
    delVsAme: 'Mixed', // COFOG is NOT a DEL/AME classification; do not infer one
    icon: 'GraduationCap', color: '#8b5cf6',
    description: 'Government spending on education across the United Kingdom.',
    breakdown: [], // Not invented: detailed programme allocations require source verification
    keyFacts: ['HM Treasury, Public Spending Statistics May 2026, Table 9, 2024/25 outturn.']
  },
  {
    id: 'economic-affairs', name: 'Economic affairs', category: 'Economy', amount: 87.8,
    percentage: 7.5197, perCapita: Math.round(87.8 * 1000 / UK_FISCAL_TOTALS.population),
    delVsAme: 'Mixed', // COFOG is NOT a DEL/AME classification; do not infer one
    icon: 'Cpu', color: '#ec4899',
    description: 'Transport, energy, industry and other economic affairs classified by HM Treasury.',
    breakdown: [], // Not invented: detailed programme allocations require source verification
    keyFacts: ['HM Treasury, Public Spending Statistics May 2026, Table 9, 2024/25 outturn.']
  },
  {
    id: 'defence', name: 'Defence', category: 'Public Services', amount: 63.7,
    percentage: 5.4556, perCapita: Math.round(63.7 * 1000 / UK_FISCAL_TOTALS.population),
    delVsAme: 'Mixed', // COFOG is NOT a DEL/AME classification; do not infer one
    icon: 'ShieldAlert', color: '#10b981',
    description: 'Defence expenditure classified by the Treasury expenditure-on-services framework.',
    breakdown: [], // Not invented: detailed programme allocations require source verification
    keyFacts: ['HM Treasury, Public Spending Statistics May 2026, Table 9, 2024/25 outturn.']
  },
  {
    id: 'public-order', name: 'Public order and safety', category: 'Public Services', amount: 51.7,
    percentage: 4.4279, perCapita: Math.round(51.7 * 1000 / UK_FISCAL_TOTALS.population),
    delVsAme: 'Mixed', // COFOG is NOT a DEL/AME classification; do not infer one
    icon: 'Scale', color: '#f59e0b',
    description: 'Police, justice, courts, prisons and public safety expenditure.',
    breakdown: [], // Not invented: detailed programme allocations require source verification
    keyFacts: ['HM Treasury, Public Spending Statistics May 2026, Table 9, 2024/25 outturn.']
  },
  {
    id: 'housing-communities', name: 'Housing and community amenities', category: 'Infrastructure', amount: 21.8,
    percentage: 1.8671, perCapita: Math.round(21.8 * 1000 / UK_FISCAL_TOTALS.population),
    delVsAme: 'Mixed', // COFOG is NOT a DEL/AME classification; do not infer one
    icon: 'Home', color: '#ea580c',
    description: 'Housing development and community amenities expenditure within the Treasury COFOG framework.',
    breakdown: [], // Not invented: detailed programme allocations require source verification
    keyFacts: ['HM Treasury, Public Spending Statistics May 2026, Table 9, 2024/25 outturn.']
  },
  {
    id: 'environment-rural', name: 'Environmental protection', category: 'Environment', amount: 17.3,
    percentage: 1.4817, perCapita: Math.round(17.3 * 1000 / UK_FISCAL_TOTALS.population),
    delVsAme: 'Mixed', // COFOG is NOT a DEL/AME classification; do not infer one
    icon: 'Trees', color: '#16a34a',
    description: 'Waste, pollution and other environment-protection expenditure across government.',
    breakdown: [], // Not invented: detailed programme allocations require source verification
    keyFacts: ['HM Treasury, Public Spending Statistics May 2026, Table 9, 2024/25 outturn.']
  },
  {
    id: 'culture', name: 'Recreation, culture and religion', category: 'Public Services', amount: 13.6,
    percentage: 1.1648, perCapita: Math.round(13.6 * 1000 / UK_FISCAL_TOTALS.population),
    delVsAme: 'Mixed', // COFOG is NOT a DEL/AME classification; do not infer one
    icon: 'Landmark', color: '#0284c7',
    description: 'Recreation, cultural, religious and other related public services expenditure.',
    breakdown: [], // Not invented: detailed programme allocations require source verification
    keyFacts: ['HM Treasury, Public Spending Statistics May 2026, Table 9, 2024/25 outturn.']
  }
];

/** HMRC 2025/26 Trust Statement, including the restated 2024/25 comparison.
 *  These are accrual-based revenues. Other HMRC Revenue is the residual of the
 *  published total after the six displayed groups, using rounded amounts.
 */
export const HMRC_REVENUE_TOTAL_2024_25 = 876.0;
export const HMRC_REVENUE_TOTAL_2025_26 = 966.4;
const HMRC_REVENUE_GROUPS: Omit<RevenueItem, 'percentage'>[] = [
  { id: "income-tax", name: "Income Tax", category: "Direct Taxes", amount: 309.4, color: "#3b82f6", description: "Income Tax received by HMRC, covering PAYE, self-assessment and other Income Tax liabilities.", details: "HMRC 2025/26 Trust Statement, restated 2024/25 comparative figures. Amounts are on an accrual basis and rounded to £0.1bn." },
  { id: "nics", name: "National Insurance Contributions", category: "Direct Taxes", amount: 168.8, color: "#6366f1", description: "National Insurance contributions collected by HMRC (employees, employers and other contributors).", details: "HMRC 2025/26 Trust Statement, restated 2024/25 comparative figures. Amounts are on an accrual basis and rounded to £0.1bn." },
  { id: "vat", name: "Value Added Tax (VAT)", category: "Indirect Taxes", amount: 178.5, color: "#06b6d4", description: "Value Added Tax collected by HMRC on taxable supplies and imports.", details: "HMRC 2025/26 Trust Statement, restated 2024/25 comparative figures. Amounts are on an accrual basis and rounded to £0.1bn." },
  { id: "corporation-tax", name: "Corporation Tax", category: "Capital & Business Taxes", amount: 89.7, color: "#8b5cf6", description: "Corporation Tax revenue collected by HMRC.", details: "HMRC 2025/26 Trust Statement, restated 2024/25 comparative figures. Amounts are on an accrual basis and rounded to £0.1bn." },
  { id: "fuel-duty", name: "Hydrocarbon Oils Duties", category: "Duties & Levies", amount: 24.7, color: "#f97316", description: "Hydrocarbon oils duties collected by HMRC, including fuel duties.", details: "HMRC 2025/26 Trust Statement, restated 2024/25 comparative figures. Amounts are on an accrual basis and rounded to £0.1bn." },
  { id: "stamp-taxes", name: "Stamp Taxes", category: "Capital & Business Taxes", amount: 18.8, color: "#84cc16", description: "HMRC stamp taxes, including SDLT, SDRT and related duties; not solely SDLT.", details: "HMRC 2025/26 Trust Statement, restated 2024/25 comparative figures. Amounts are on an accrual basis and rounded to £0.1bn." },
  { id: "other-hmrc", name: "Other HMRC Revenue", category: "Other", amount: 86.1, color: "#64748b", description: "Residual HMRC revenue, including Capital Gains Tax, alcohol duties and other revenue and income.", details: "HMRC 2025/26 Trust Statement, restated 2024/25 comparative figures. Amounts are on an accrual basis and rounded to £0.1bn." }
];

export const UK_REVENUE_DATA: RevenueItem[] = HMRC_REVENUE_GROUPS.map(item => ({
  ...item,
  percentage: (item.amount / HMRC_REVENUE_TOTAL_2024_25) * 100,
}));

/** ONS Public Sector Finances, October 2026 vintage. These selected year-end FY
 *  outturn figures are constructed by summing twelve Apr-Mar monthly observations:
 *  series KX5Q (PS ex banks TME), JW2O (PS ex banks current receipts),
 *  DZLS (PS net borrowing ex banks). March PSND is KSE6; debt/GDP is HF6X.
 *  All monetary figures £bn. GDP, CPI and Bank Rate unused pending source validation.
 *  The FY2025/26 amount is outturn, not a forecast.
 */
export const UK_HISTORICAL_DATA: HistoricalYearData[] = [
  { year: '2000/01', spending: 390.115, receipts: 406.42, borrowing: -16.305, debtPercentGdp: 28.3, debtAmount: 321.966, gdp: 0, inflation: 0, bankRate: 0 },
  { year: '2004/05', spending: 534.903, receipts: 483.238, borrowing: 51.665, debtPercentGdp: 33.5, debtAmount: 460.879, gdp: 0, inflation: 0, bankRate: 0 },
  { year: '2008/09', spending: 685.79, receipts: 569.457, borrowing: 116.333, debtPercentGdp: 50.3, debtAmount: 787.157, gdp: 0, inflation: 0, bankRate: 0 },
  { year: '2009/10', spending: 720.331, receipts: 560.687, borrowing: 159.644, debtPercentGdp: 64.4, debtAmount: 1027.887, gdp: 0, inflation: 0, bankRate: 0 },
  { year: '2012/13', spending: 759.546, receipts: 635.936, borrowing: 123.61, debtPercentGdp: 77, debtAmount: 1366.18, gdp: 0, inflation: 0, bankRate: 0 },
  { year: '2015/16', spending: 794.365, receipts: 714.264, borrowing: 80.101, debtPercentGdp: 80.6, debtAmount: 1594.981, gdp: 0, inflation: 0, bankRate: 0 },
  { year: '2018/19', spending: 857.627, receipts: 813.554, borrowing: 44.073, debtPercentGdp: 79.4, debtAmount: 1778.022, gdp: 0, inflation: 0, bankRate: 0 },
  { year: '2020/21', spending: 1103.793, receipts: 792.959, borrowing: 310.834, debtPercentGdp: 95.2, debtAmount: 2157.667, gdp: 0, inflation: 0, bankRate: 0 },
  { year: '2021/22', spending: 1038.195, receipts: 922.217, borrowing: 115.978, debtPercentGdp: 93.9, debtAmount: 2379.717, gdp: 0, inflation: 0, bankRate: 0 },
  { year: '2022/23', spending: 1158.392, receipts: 1034.576, borrowing: 123.816, debtPercentGdp: 92.7, debtAmount: 2542.731, gdp: 0, inflation: 0, bankRate: 0 },
  { year: '2023/24', spending: 1231.793, receipts: 1096.559, borrowing: 135.234, debtPercentGdp: 93.7, debtAmount: 2684.142, gdp: 0, inflation: 0, bankRate: 0 },
  { year: '2024/25', spending: 1290.348, receipts: 1140.539, borrowing: 149.809, debtPercentGdp: 92.9, debtAmount: 2806.699, gdp: 0, inflation: 0, bankRate: 0 },
  { year: '2025/26', spending: 1365.598, receipts: 1231.387, borrowing: 134.211, debtPercentGdp: 93.2, debtAmount: 2916.811, gdp: 0, inflation: 0, bankRate: 0 },
];

export interface YearlySpendingSplit {
  year: string;
  welfare: number; // £bn (Social Protection & Pensions)
  health: number; // £bn (NHS & Social Care)
  debtInterest: number; // £bn
  education: number; // £bn
  defence: number; // £bn
  otherServices: number; // £bn
  totalSpending: number; // £bn
}

export interface YearlyRevenueSplit {
  year: string;
  incomeTax: number; // £bn
  nics: number; // £bn
  vat: number; // £bn
  corpTax: number; // £bn
  otherTaxes: number; // £bn
  borrowing: number; // £bn
  totalReceiptsAndBorrowing: number; // £bn
}

/** HM Treasury May 2026 Public Spending Statistics, Table 9. Nominal COFOG functional
 *  expenditure-on-services in £bn; excludes TME accounting adjustments. Debt interest
 *  is a subgroup of general public services and is removed from the residual to avoid
 *  double counting. Six groups sum to published TES each fiscal year. */
export const YEARLY_SPENDING_SPLITS: YearlySpendingSplit[] = [
  { year: '2010/11', welfare: 230.4, health: 119.9, debtInterest: 57.3, education: 91.5, defence: 39.3, otherServices: 136.9, totalSpending: 675.3 },
  { year: '2011/12', welfare: 244.8, health: 121.3, debtInterest: 60.1, education: 86.5, defence: 38.7, otherServices: 126.6, totalSpending: 678 },
  { year: '2012/13', welfare: 253.4, health: 124.3, debtInterest: 55.9, education: 84.1, defence: 36.3, otherServices: 127, totalSpending: 681 },
  { year: '2013/14', welfare: 254.2, health: 129.4, debtInterest: 55.9, education: 84.7, defence: 36.4, otherServices: 131.4, totalSpending: 692 },
  { year: '2014/15', welfare: 261.1, health: 134.1, debtInterest: 53.7, education: 85.1, defence: 36.7, otherServices: 133.8, totalSpending: 704.5 },
  { year: '2015/16', welfare: 264.9, health: 138.5, debtInterest: 54.9, education: 84.9, defence: 36.6, otherServices: 139.2, totalSpending: 719 },
  { year: '2016/17', welfare: 265.4, health: 142.6, debtInterest: 56.9, education: 84.9, defence: 37.1, otherServices: 140.3, totalSpending: 727.2 },
  { year: '2017/18', welfare: 268.7, health: 147.3, debtInterest: 61.6, education: 86.1, defence: 38.7, otherServices: 147.5, totalSpending: 749.9 },
  { year: '2018/19', welfare: 274.8, health: 152.9, debtInterest: 56.3, education: 88.1, defence: 40.2, otherServices: 160.3, totalSpending: 772.6 },
  { year: '2019/20', welfare: 275.8, health: 164.1, debtInterest: 55.2, education: 90.6, defence: 42.2, otherServices: 171.6, totalSpending: 799.5 },
  { year: '2020/21', welfare: 299.3, health: 218.6, debtInterest: 42.3, education: 95.5, defence: 44.6, otherServices: 311.1, totalSpending: 1011.4 },
  { year: '2021/22', welfare: 300, health: 216.2, debtInterest: 72.7, education: 100.1, defence: 48.7, otherServices: 213.8, totalSpending: 951.5 },
  { year: '2022/23', welfare: 322, health: 212.7, debtInterest: 130.4, education: 107.3, defence: 55.5, otherServices: 248.7, totalSpending: 1076.6 },
  { year: '2023/24', welfare: 364.9, health: 222, debtInterest: 127.3, education: 114.2, defence: 56.8, otherServices: 229.5, totalSpending: 1114.7 },
  { year: '2024/25', welfare: 387.2, health: 242.4, debtInterest: 126.5, education: 122.6, defence: 63.7, otherServices: 223.9, totalSpending: 1166.3 }
];

// Consecutive 10-year dataset (2014/15 to 2024/25) for Sector Growth X/Y Line Graph
export const TEN_YEAR_SECTOR_DATA = YEARLY_SPENDING_SPLITS.filter(item => 
  ['2014/15', '2015/16', '2016/17', '2017/18', '2018/19', '2019/20', '2020/21', '2021/22', '2022/23', '2023/24', '2024/25'].includes(item.year)
);

/** HMRC Annual Report and Accounts 2024/25, Financial Review figure 15. All £bn.
 *  Legacy field totalReceiptsAndBorrowing means HMRC REVENUE ONLY for these rows.
 *  Borrowing is NOT a tax receipt and is set to zero. Other taxes are the official
 *  annual HMRC total less Income Tax, NIC, VAT and Corporation Tax; 0.1bn rounding
 *  differences are absorbed in residual. The revenue chart remains withheld.
 */
export const YEARLY_REVENUE_SPLITS: YearlyRevenueSplit[] = [
  { year: '2020/21', incomeTax: 192, nics: 141.5, vat: 122.1, corpTax: 53.7, otherTaxes: 99.5, borrowing: 0, totalReceiptsAndBorrowing: 608.8 },
  { year: '2021/22', incomeTax: 233.4, nics: 158.3, vat: 148.7, corpTax: 68.3, otherTaxes: 122.4, borrowing: 0, totalReceiptsAndBorrowing: 731.1 },
  { year: '2022/23', incomeTax: 258, nics: 175.8, vat: 166.9, corpTax: 80.5, otherTaxes: 132.8, borrowing: 0, totalReceiptsAndBorrowing: 814 },
  { year: '2023/24', incomeTax: 286.2, nics: 177, vat: 165.5, corpTax: 89.6, otherTaxes: 125.1, borrowing: 0, totalReceiptsAndBorrowing: 843.4 },
  { year: '2024/25', incomeTax: 309.4, nics: 168.8, vat: 178.5, corpTax: 89.7, otherTaxes: 129.6, borrowing: 0, totalReceiptsAndBorrowing: HMRC_REVENUE_TOTAL_2024_25 },
];

// ONS September 2026 release. The monthly net debt estimate is provisional.
export const LATEST_ONS_NET_DEBT = {
  amount: 3_005_000_000_000,
  date: 'September 2026',
  interestStart: Date.parse('2026-10-01T00:00:00+01:00'),
  percentGdp: 94.0,
};

// OBR October 2026 EFO, table 6.17, 2026/27, central government interest net of APF.
const annualDebtInterest = 123_900_000_000;
export const DEBT_INTEREST_METRICS = {
  annualAmount: annualDebtInterest,
  perSecond: annualDebtInterest / (365 * 24 * 60 * 60),
  perMinute: annualDebtInterest / (365 * 24 * 60),
  perHour: annualDebtInterest / (365 * 24),
  perDay: annualDebtInterest / 365,
};

// Add forecast interest only within the financial year covered by the forecast.
export function estimateDebtWithInterest(now: number) {
  const forecastEnd = Date.parse('2027-04-01T00:00:00+01:00');
  const elapsedSeconds = Math.max(0, Math.min(now, forecastEnd) - LATEST_ONS_NET_DEBT.interestStart) / 1000;
  const interest = Math.round(elapsedSeconds * DEBT_INTEREST_METRICS.perSecond);
  return { interest, total: LATEST_ONS_NET_DEBT.amount + interest };
}
