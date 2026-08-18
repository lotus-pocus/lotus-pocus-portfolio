import CookieSettings from "../components/CookieSettings/CookieSettings";
import "./PrivacyPage.css";

function PrivacyPage() {
  return (
    <main className="privacy-page">
      <div className="privacy-page__content">
        <p className="privacy-page__kicker">
          Privacy
        </p>

        <h1>Privacy & cookies</h1>

        <section>
          <h2>About this website</h2>

          <p>
            This is my personal portfolio website. I use it to
            share examples of my work, projects and professional
            experience.
          </p>
        </section>

        <section>
          <h2>Analytics</h2>

          <p>
            I use Google Analytics and Microsoft Clarity to
            understand how visitors use this website and to help
            me improve its content, usability and performance.
          </p>

          <p>
            Google Analytics provides information such as page
            views, traffic sources and engagement. Microsoft Clarity provides behavioural insights such as heatmaps, scroll behaviour and session recordings with sensitive content masked, helping me understand how people interact with the site and identify usability issues.
          </p>

          <p>
            Analytics cookies are only used if you choose to
            accept analytics.
          </p>
        </section>

        <section>
          <h2>Cookies</h2>

          <p>
            If you accept analytics, Google Analytics and
            Microsoft Clarity may use cookies to help measure
            website usage and interaction.
          </p>

          <p>
            Your cookie preference is stored in your browser so
            that the site can remember your choice.
          </p>
        </section>

        <section>
          <h2>Your choice</h2>

          <p>
            You can accept or reject analytics when you first
            visit the site and can change your choice at any time.
          </p>

          <CookieSettings />
        </section>

        <section>
          <h2>Third-party services</h2>

          <p>
            This website is hosted using Vercel and uses Sanity
            to manage website content. Google Analytics and
            Microsoft Clarity are used for website analytics
            where consent has been given.
          </p>
        </section>

        <section>
          <h2>Contact</h2>

          <p>
            If you have a question about privacy on this website,
            you can contact me using the contact details provided
            on the portfolio.
          </p>
        </section>

        <p className="privacy-page__updated">
          Last updated: August 2026
        </p>
      </div>
    </main>
  );
}

export default PrivacyPage;