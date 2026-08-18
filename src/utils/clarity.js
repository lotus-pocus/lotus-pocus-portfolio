import Clarity from "@microsoft/clarity";

const PROJECT_ID = "y4d4fx8417";

let clarityLoaded = false;

export function loadClarity() {
  if (!clarityLoaded) {
    Clarity.init(PROJECT_ID);
    clarityLoaded = true;
  }

  Clarity.consentV2({
    analytics_Storage: "granted",
    ad_Storage: "denied",
  });
}

export function denyClarity() {
  if (!clarityLoaded) {
    return;
  }

  Clarity.consentV2({
    analytics_Storage: "denied",
    ad_Storage: "denied",
  });
}

export function initialiseClarityFromConsent() {
  const consent = localStorage.getItem(
    "lotus-pocus-analytics-consent",
  );

  if (consent === "granted") {
    loadClarity();
  }
}