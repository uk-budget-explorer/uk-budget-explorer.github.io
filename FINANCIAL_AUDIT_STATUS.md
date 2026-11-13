# UK Budget Explorer — Financial audit and release gate

**Review date:** 13 November 2026  
**Branch:** `audit/financial-accuracy-2026-11-12`  
**Release status:** **NOT APPROVED FOR MARKETING OR MERGE**  
**Design:** Original React/Vite website retained; no visual redesign.

## Verified metrics and definitions

| Dataset | Measure / period | Source and method |
|---|---|---|
| ONS | 2024/25 total managed expenditure £1,290.348bn; public-sector current receipts £1,140.539bn; public-sector net borrowing £149.809bn | ONS public sector finances data, October 2026 vintage, worksheet `data`. Sum April 2024–March 2025 monthly series KX5Q, JW2O, DZLS; expenditure less receipts equals borrowing. ONS series J5IJ gives borrowing of 5.1% of GDP. PSNB excludes public sector banks. |
| ONS | March 2025 PSND excl banks £2,806.699bn (92.9% GDP); March 2026 £2,916.811bn (93.2% GDP); September 2026 £3,005.0bn (94.0% GDP, provisional) | Series KSE6 and HF6X, March entries. Debt stocks are at period end, not annual flow values. |
| ONS | Selected long-run FY 2000/01–2025/26 expenditure, receipts and borrowing; March debt | Same October 2026 source series and method; fiscal years reconstructed from 12 monthly figures. Historical macro fields excluded pending separate validation. |
| HMT | 2024/25 TME £1,290.6bn; TES £1,166.3bn; ten COFOG functions £1,167.6bn before £−1.4bn EU transactions (rounding) | Public Spending Statistics May 2026 (published 21 May 2026), Table 9. HMT and ONS TME reflect different publication vintages. |
| HMT | 2010/11–2024/25 COFOG spending composition | Table 9, nominal figures £bn. Social protection, health, debt interest (subset of general public services), education, defence and remaining expenditure-on-services functions + EU transactions add up to TES annually. No double counting of debt interest. |
| HMRC | 2024/25 restated revenue £876.0bn; 2025/26 revenue £966.4bn | HMRC 2025/26 Trust Statement. The 2024/25 restatement raises Corporation Tax from £89.6bn to £89.7bn. The site shows seven 2024/25 accrual-based revenue groups, with other revenue calculated as a residual. |
| OBR | 2026/27 central government debt interest **net of APF** £123.9bn at published precision | October 2026 Economic and Fiscal Outlook, central government debt interest forecast. The per-second indicator divides forecast annual amount by 365 days; it is **not** real-time debt servicing cash outflow. |
| ONS | UK population revised mid-2024 69,256,300 and 2024 households 28.6m | ONS population estimates, October 2026 revisions; ONS Families and Households 2024. |
| HMRC | Estimated 2024/25 income tax payers 38.6m | HMRC Income Tax Liabilities Statistics, published 15 July 2026. Estimated tax payers are not equivalent to all workers or residents. |

## Authoritative public source links

- ONS Public Sector Finances: https://www.ons.gov.uk/economy/governmentpublicsectorandtaxes/publicsectorfinance
- HM Treasury May 2026 Public Spending Statistics: https://www.gov.uk/government/statistics/public-spending-statistics-release-may-2026
- HMRC 2024/25 Annual Report: https://www.gov.uk/government/publications/hmrc-annual-report-and-accounts-2025-to-2026/hmrcs-annual-report-and-accounts-2025-to-2026-our-accounts-and-annexes
- OBR October 2026 forecasts: https://obr.uk/economic-and-fiscal-outlooks/
- ONS population mid-2025, with revised mid-2024 estimate: https://www.ons.gov.uk/peoplepopulationandcommunity/populationandmigration/populationestimates/bulletins/annualmidyearpopulationestimates/mid2025
- ONS families and households 2024: https://www.ons.gov.uk/peoplepopulationandcommunity/birthsdeathsandmarriages/families/bulletins/familiesandhouseholds/2024
- HMRC Income Tax payers: https://www.gov.uk/government/statistics/income-tax-liabilities-statistics-tax-year-2023-to-2024-to-tax-year-2026-to-2027/summary-statistics

## Modules under review

1. **G20 comparison.** The October 2026 IMF World Economic Outlook workbook supplies 2026 projections for gross debt, expenditure, revenue and net lending or borrowing as shares of GDP for the 19 national members. The EU and AU are identified separately from the country ranking.
2. **Chancellor Simulator.** The three examples use the published 2026/27 direct effects on borrowing from HM Treasury Budget 2026 Table 6.1, measures 1–3. Treasury records these costs as negative amounts; the site shows the corresponding increases in borrowing.
3. **Yearly revenue composition: WITHHELD.** An older revenue-versus-borrowing chart conflates HMRC receipts and ONS public borrowing. Revenue tax cards are now based on separately reconciled HMRC 2024/25 figures, and Treasury expenditure-history split charts are restored using Table 9.
4. **Macroeconomic history: WITHHELD.** Inflation, Bank Rate and nominal GDP need an independently checked harmonised source series. Fields in legacy data are not presented to visitors.
5. **Subprogramme allocations: WITHHELD.** No invented split amounts. The official ten Treasury COFOG functions remain available.
6. **Debt interest ticker: ILLUSTRATION.** The ticker spreads the OBR 2026/27 forecast across a 365-day financial year. The September 2026 ONS debt stock is displayed separately as a dated, provisional figure. The illustrative daily counter resets at midnight in Europe/London.

## Build and release requirements

- GitHub Actions runs `npm ci`, `npm run build` and `node scripts/verify-finance.mjs` on the audit branch and on a pull request to main.
- Source-based numerical tests must pass; Treasury annual spending splits, HMRC 2024/25 tax groups, ONS annual accounts identity and OBR interest denominators are checked.
- **The CI test suite does not prove that every qualitative statement or external source is correct.** A separate editorial review, accessibility and responsive-layout/browser QA, privacy and analytics consent review and broken-link check are still required.
- Check source definitions, dates, units and signs before publishing changes to fiscal figures.

## Review decisions

- Retain the original UK Budget Explorer visual design.
- Treat ONS public-finance outturn, Treasury TES functions, HMRC tax receipts and OBR debt-interest forecast as four **distinct measures**.
- Do not alter data until sources and period definitions are recorded.
- Do not infer a cash-flow identity by combining unrelated expenditure, tax revenue and borrowing definitions.
