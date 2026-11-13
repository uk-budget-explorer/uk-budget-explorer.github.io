import React, { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import { trackEvent } from "../utils/analytics";

// Simple consent banner that appears at the bottom of the page.
// Stores consent in localStorage under key "gaConsent" ("true" or "false").
// Updates global window.gaConsent flag for the GA loader script.

export const ConsentBanner: React.FC = () => {
  const [consent, setConsent] = useState<boolean | null>(null);

  // Initialize consent from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("gaConsent");
    if (stored === "true") {
      (window as any).gaConsent = true;
      setConsent(true);
    } else if (stored === "false") {
      (window as any).gaConsent = false;
      setConsent(false);
    } else {
      (window as any).gaConsent = null;
      setConsent(null);
    }
  }, []);

  const loadGA = () => {
    (function(){
      const g = document.createElement('script');
      g.async = true;
      g.src = 'https://www.googletagmanager.com/gtag/js?id=G-8SP4GE7VJW';
      document.head.appendChild(g);
    })();
    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).gtag = (...args: any[]) => (window as any).dataLayer.push(args);
    (window as any)['ga-disable-G-8SP4GE7VJW'] = false;
    (window as any).gtag('js', new Date());
    (window as any).gtag('config', 'G-8SP4GE7VJW', { anonymize_ip: true });
  };

  const accept = () => {
    localStorage.setItem("gaConsent", "true");
    (window as any).gaConsent = true;
    setConsent(true);
    loadGA();
    trackEvent('consent', { granted: true });
  };

  const reject = () => {
    localStorage.setItem("gaConsent", "false");
    (window as any).gaConsent = false;
    setConsent(false);
    trackEvent('consent', { granted: false });
  };

  const change = () => {
    // Reload after clearing consent so any previously loaded analytics scripts cease running.
    localStorage.removeItem("gaConsent");
    (window as any).gaConsent = null;
    (window as any)['ga-disable-G-8SP4GE7VJW'] = true;
    window.location.reload();
  };

  if (consent !== null) {
    return (
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-slate-800 text-slate-100 px-4 py-2 rounded-md shadow-lg text-sm flex items-center gap-2">
        <span>{consent ? "Analytics enabled" : "Analytics disabled"}</span>
        <button onClick={change} className="underline hover:text-white">Change</button>
        <a href="/privacy.html" target="_blank" rel="noreferrer" className="flex items-center gap-1 ml-2">
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    );
  }

  return (
    <div className="fixed inset-x-0 bottom-0 bg-slate-900 text-slate-100 p-4 border-t border-slate-700 flex flex-col md:flex-row items-center justify-between gap-4">
      <p className="text-sm max-w-md">
        With your permission, Google Analytics collects website usage information to help improve this site. See our privacy notice for details.
        <a href="/privacy.html" target="_blank" rel="noreferrer" className="ml-2 underline hover:text-white">Privacy notice</a>
      </p>
      <div className="flex gap-2">
        <button onClick={reject} className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded text-sm">Reject</button>
        <button onClick={accept} className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded text-sm">Accept</button>
      </div>
    </div>
  );
};
