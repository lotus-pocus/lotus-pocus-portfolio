import "./LearningCard.css";

function formatCategory(category) {
  if (!category) return "Learning";

  return category
    .split("-")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

function formatDate(date) {
  if (!date) return null;

  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

function LearningCard({ learning }) {
  return (
    <article className="learning-card">
      <div className="learning-card-meta">
        <span>{formatCategory(learning.category)}</span>

        {learning.publishedAt && (
          <time dateTime={learning.publishedAt}>
            {formatDate(learning.publishedAt)}
          </time>
        )}
      </div>

      <h2>{learning.title}</h2>

      {learning.summary && <p>{learning.summary}</p>}

      {learning.slug && (
        <a href={`/learnings/${learning.slug}`}>
          Read learning →
        </a>
      )}
    </article>
  );
}

export default LearningCard;