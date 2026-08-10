import CookieSettings from "../CookieSettings/CookieSettings";
import "./Footer.css";

function Footer() {
  return (
    <footer className="site-footer">
      <p>© {new Date().getFullYear()} Lotus Tay</p>

      <div className="site-footer__links">
        <a href="/privacy">Privacy & cookies</a>
        <CookieSettings />
      </div>
    </footer>
  );
}

export default Footer;