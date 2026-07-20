import { useEffect, useState } from "react";
import { client } from "../sanityClient";
import LearningCard from "../components/LearningCard/LearningCard";
import "./LearningsPage.css";

function LearningsPage() {
  const [learnings, setLearnings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const query = `
      *[
        _type == "learning" &&
        !(_id in path("drafts.**"))
      ]
      | order(
          featured desc,
          coalesce(displayOrder, 9999) asc,
          publishedAt desc
        ) {
          _id,
          title,
          "slug": slug.current,
          category,
          summary,
          publishedAt,
          featured
        }
    `;

    client
      .fetch(query)
      .then((data) => {
        setLearnings(data || []);
      })
      .catch((fetchError) => {
        console.error(fetchError);
        setError("The learnings could not be loaded.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <main className="learnings-page">
      <header className="learnings-header">
        <p className="learnings-kicker">Learnings</p>

        <h1>
          Notes from building, testing and improving digital experiences.
        </h1>

        <p className="learnings-introduction">
          Practical observations about frontend development, website UX,
          search visibility, content management and the small decisions that
          make websites easier to use.
        </p>
      </header>

      {isLoading && (
        <p className="learnings-status">Loading learnings…</p>
      )}

      {error && (
        <p className="learnings-status">{error}</p>
      )}

      {!isLoading && !error && learnings.length === 0 && (
        <p className="learnings-status">
          New learnings will be added here soon.
        </p>
      )}

      {learnings.length > 0 && (
        <section
          className="learnings-grid"
          aria-label="Learning articles"
        >
          {learnings.map((learning) => (
            <LearningCard
              key={learning._id}
              learning={learning}
            />
          ))}
        </section>
      )}
    </main>
  );
}

export default LearningsPage;