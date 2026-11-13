// Analytics utility for GA4 event tracking
// Sends events only if user consent is given (window.gaConsent === true)
// Requires that the gtag function is loaded in the page (via index.html)

export const trackEvent = (
  name: string,
  params?: Record<string, any>
) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const consent = (window as any).gaConsent;
  // @ts-ignore - gtag is injected globally when consented
  if (consent && typeof gtag === "function") {
    // @ts-ignore
    gtag("event", name, params);
  }
};

