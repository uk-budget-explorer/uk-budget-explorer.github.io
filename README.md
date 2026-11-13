# 🇬🇧 UK National Budget Explorer & Policy Simulator

An interactive, high-fidelity public finances dashboard and policy simulator for the United Kingdom. Built with **React 18**, **TypeScript**, **Tailwind CSS**, and **Vite**, powered by official datasets from **HM Treasury**, the **Office for Budget Responsibility (OBR)**, and the **Office for National Statistics (ONS)**.

---

## 🚀 Key Features

### 1. 🏛️ Overview & Budget Balance
- **Headline Fiscal KPIs**: Total Managed Expenditure (**£1,226.4bn**), Government Receipts (**£1,139.2bn**), Annual Borrowing/Deficit (**£87.2bn**, 3.15% of GDP), and Public Sector Net Debt (**£2,724.8bn**, 98.4% of GDP).
- **Proportional Budget Flow**: Visualizes the balance between taxation receipts and borrowing shortfall funding functional expenditure.
- **Dynamic Sector Distribution Bar**: Proportional breakdown of where public money is deployed.

### 2. 📊 Public Spending Deep Dive (£1.23 Trillion)
- **13 Comprehensive Spending Sectors**:
  - Social Protection & Pensions (£316.5bn)
  - Health & Social Care / NHS (£211.4bn)
  - Public Debt Interest (£102.3bn)
  - Education & Skills (£91.8bn)
  - Defence & National Security (£54.2bn)
  - Police & Justice (£42.1bn)
  - Transport Infrastructure (£41.5bn)
  - Science & Clean Economy (£34.2bn)
  - General Public Administration (£32.6bn)
  - Housing & Communities (£19.8bn)
  - Foreign Office & ODA Aid (£14.2bn)
  - Environment, Farming & Floods (£8.4bn)
  - Contingency Reserves & EU Settlement (£67.4bn)
- **Control Framework Filter**: Distinguish between **DEL** (Departmental Expenditure Limits - multi-year discretionary budgets) and **AME** (Annually Managed Expenditure - demand-driven welfare, pensions, debt interest).
- **Per Capita Calculations**: Real-time spending per UK resident.
- **Detailed Sub-Programs**: Expand each sector to see exact program allocations (e.g. within NHS: Hospitals, GP surgeries, medicines, adult social care, capital diagnostics).

### 3. 🪙 Tax Receipts & Revenue Streams (£1.14 Trillion)
- Breakdown of every major UK tax: Income Tax, Employee & Employer NICs, VAT, Corporation Tax, Business Rates, Fuel Duty, Council Tax, CGT, SDLT, and IHT.
- **Fiscal Drag Spotlight**: Analysis of frozen personal allowances (£12,570 and £50,270) raising stealth revenues via inflation.

### 4. 💼 "Chancellor for a Day" Policy Simulator
- Step into 11 Downing Street with the Chancellor's Budget Box.
- **10 Interactive Policy Levers**:
  - Basic Rate Income Tax (17% to 25%)
  - Higher Rate Income Tax (35% to 48%)
  - VAT Standard Rate (15% to 25%)
  - Corporation Tax Main Rate (19% to 30%)
  - Employer National Insurance (12% to 18%)
  - Fuel Duty unfreeze / escalator
  - Real NHS funding growth (-5% to +15%)
  - Defence spending target as % of GDP (1.8% to 3.5%)
  - State Pension Triple Lock modification
  - Schools & childcare funding
- **Live Fiscal Scorecard**:
  - Real-time impact on Net Borrowing and Deficit as % of GDP.
  - **Fiscal Rule Compliance Check**: Evaluates if the Budget complies with the OBR rolling deficit rule (&le;3% of GDP).
- **Preset Scenarios**:
  - *Public Services Boost*
  - *Tax Cut Stimulus*
  - *Balanced Budget (Eliminate £87bn Deficit)*
  - *Baseline Reset*

### 5. 📈 25-Year Historical Fiscal Trends (2000–2026)
- Interactive time-series tracking how UK Debt surged from **30.6% to 98.4% of GDP**.
- View Historical Debt (% of GDP), Total Spending vs Receipts (£bn), Annual Borrowing, and Inflation/Bank Rate.
- Milestone historical breakdowns:
  - 2000/01 Dot-com Budget Surplus
  - 2008/09 Global Financial Crisis & Bank Bailouts
  - 2010–2015 Austerity Program
  - 2020/21 COVID-19 Pandemic Furlough & £313bn Borrowing Peak
  - 2022–2024 Energy Price Guarantee & Inflation Gilt Yield Spikes

---

## 🛠️ Development & Build

```bash
# Install dependencies
npm install

# Start the interactive dev server
npm run dev

# Compile TypeScript and build for production
npm run build

# Preview production build locally
npm run preview
```

---

## 📚 Data Methodology

All figures are aligned with:
- **HM Treasury**: Autumn Budget Statement & Public Expenditure Statistical Analyses (PESA)
- **Office for Budget Responsibility (OBR)**: Economic and Fiscal Outlook (EFO) and Public Finances Databank
- **Office for National Statistics (ONS)**: Public Sector Finances Bulletins

