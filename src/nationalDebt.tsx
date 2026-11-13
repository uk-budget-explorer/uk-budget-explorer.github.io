import React from 'react';
import ReactDOM from 'react-dom/client';
import { DebtInterestTicker } from './components/DebtInterestTicker';
import { ConsentBanner } from './components/ConsentBanner';
import './index.css';

const widget = document.getElementById('debt-calculator');
if (widget) {
  ReactDOM.createRoot(widget).render(
    <React.StrictMode>
      <DebtInterestTicker variant="full" />
    </React.StrictMode>
  );
}
const consent = document.getElementById('consent-root');
if (consent) {
  ReactDOM.createRoot(consent).render(
    <React.StrictMode>
      <ConsentBanner />
    </React.StrictMode>
  );
}
