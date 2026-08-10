const MEASUREMENT_ID = "G-F6VXDTFD9J";

let analyticsLoaded = false;

function setupGtag() {
  window.dataLayer = window.dataLayer || [];

  if (!window.gtag) {
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
  }
}

function removeAnalyticsCookies() {
  const cookieNames = [
    "_ga",
    `_ga_${MEASUREMENT_ID.replace("G-", "")}`,
  ];

  cookieNames.forEach((name) => {
    document.cookie = `${name}=; Max-Age=0; path=/`;
    document.cookie = `${name}=; Max-Age=0; path=/; domain=${window.location.hostname}`;
  });
}

export function loadGoogleAnalytics() {
  if (analyticsLoaded) {
    if (window.gtag) {
      window.gtag("consent", "update", {
        analytics_storage: "granted",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
      });
    }

    return;
  }

  analyticsLoaded = true;

  setupGtag();

  window.gtag("consent", "default", {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });

  window.gtag("js", new Date());

  window.gtag("config", MEASUREMENT_ID, {
    anonymize_ip: true,
  });

  const script = document.createElement("script");

  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;

  document.head.appendChild(script);
}

export function denyGoogleAnalytics() {
  if (window.gtag) {
    window.gtag("consent", "update", {
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
  }

  removeAnalyticsCookies();
}

export function initialiseAnalyticsFromConsent() {
  const consent = localStorage.getItem(
    "lotus-pocus-analytics-consent",
  );

  if (consent === "granted") {
    loadGoogleAnalytics();
  }
}