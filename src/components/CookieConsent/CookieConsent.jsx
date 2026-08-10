import { useEffect, useState } from "react";
import "./CookieConsent.css";

const CONSENT_KEY = "lotus-pocus-analytics-consent";

function CookieConsent() {
  const [showBanner, setShowBanner] = useState(() => {
    const savedConsent = localStorage.getItem(CONSENT_KEY);
    return !savedConsent;
  });

  useEffect(() => {
    function handleOpenCookieSettings() {
      setShowBanner(true);
    }

    window.addEventListener(
      "open-cookie-settings",
      handleOpenCookieSettings,
    );

    return () => {
      window.removeEventListener(
        "open-cookie-settings",
        handleOpenCookieSettings,
      );
    };
  }, []);

  function saveConsent(value) {
    localStorage.setItem(CONSENT_KEY, value);
    setShowBanner(false);

    window.dispatchEvent(
      new CustomEvent("analytics-consent-changed", {
        detail: value,
      }),
    );
  }

  function acceptAnalytics() {
    saveConsent("granted");
  }

  function rejectAnalytics() {
    saveConsent("denied");
  }

  if (!showBanner) {
    return null;
  }

  return (
    <aside
      className="cookie-consent"
      aria-label="Cookie and analytics preferences"
    >
      <div className="cookie-consent__content">
        <div className="cookie-consent__text">
          <p className="cookie-consent__title">
            Cookies & analytics
          </p>

          <p>
            I use Google Analytics to understand how people use
            my portfolio and to help me improve the site.
            Analytics cookies are only used with your permission.
          </p>

          <a
            className="cookie-consent__link"
            href="/privacy"
          >
            Privacy & cookies
          </a>
        </div>

        <div className="cookie-consent__actions">
          <button
            type="button"
            className="cookie-consent__button"
            onClick={rejectAnalytics}
          >
            Reject
          </button>

          <button
            type="button"
            className="cookie-consent__button"
            onClick={acceptAnalytics}
          >
            Accept analytics
          </button>
        </div>
      </div>
    </aside>
  );
}

export default CookieConsent;