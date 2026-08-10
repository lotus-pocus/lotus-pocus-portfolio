const MEASUREMENT_ID = "G-F6VXDTFD9J";

let analyticsLoaded = false;

export function loadGoogleAnalytics() {
  if (analyticsLoaded) return;

  analyticsLoaded = true;

  window.dataLayer = window.dataLayer || [];

  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };

  // Set consent before loading/configuring GA4.
  window.gtag("consent", "default", {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });

  window.gtag("js", new Date());
  window.gtag("config", MEASUREMENT_ID);

  const script = document.createElement("script");

  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;

  document.head.appendChild(script);
}

export function initialiseAnalyticsFromConsent() {
  const consent = localStorage.getItem(
    "lotus-pocus-analytics-consent",
  );

  if (consent === "granted") {
    loadGoogleAnalytics();
  }
}