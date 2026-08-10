import "./CookieSettings.css";

function CookieSettings() {
  function openCookieSettings() {
    window.dispatchEvent(new Event("open-cookie-settings"));
  }

  return (
    <button
      type="button"
      className="cookie-settings-button"
      onClick={openCookieSettings}
    >
      Cookie settings
    </button>
  );
}

export default CookieSettings;