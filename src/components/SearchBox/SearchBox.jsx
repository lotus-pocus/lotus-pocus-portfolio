import { useEffect, useState } from "react";
import { client } from "../../sanityClient";
import "./SearchBox.css";

export default function SearchBox() {
  const [term, setTerm] = useState("");
  const [results, setResults] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const trimmedTerm = term.trim();
  const hasSearchTerm = trimmedTerm.length >= 2;

  useEffect(() => {
    if (!hasSearchTerm) {
      return;
    }

    const query = `
      *[
        _type == "project" &&
        !(_id in path("drafts.**")) &&
        (
          title match $searchTerm ||
          type match $searchTerm ||
          description match $searchTerm ||
          tags[] match $searchTerm
        )
      ] | order(title asc) {
        _id,
        title,
        "slug": slug.current,
        type,
        description,
        projectUrl,
        repo,
        tags
      }
    `;

    client
      .fetch(query, {
        searchTerm: `${trimmedTerm}*`,
      })
      .then((data) => {
        setResults(data || []);
      })
      .catch((error) => {
        console.error(error);
        setResults([]);
      });
  }, [trimmedTerm, hasSearchTerm]);

  function getResultLink(item) {
    if (item.slug) {
      return `/projects#${item.slug}`;
    }

    return item.projectUrl || item.repo || "/projects";
  }

  function isExternalLink(item) {
    return !item.slug && Boolean(item.projectUrl || item.repo);
  }

  return (
    <div className="search-box">
      <input
        type="search"
        placeholder="Search the site..."
        value={term}
        onChange={(event) => setTerm(event.target.value)}
        onFocus={() => setIsOpen(true)}
        onBlur={() => {
          window.setTimeout(() => {
            setIsOpen(false);
          }, 150);
        }}
        aria-label="Search projects"
      />

      {isOpen && hasSearchTerm && results.length > 0 && (
        <div className="search-results">
          {results.map((item) => {
            const external = isExternalLink(item);

            return (
              <a
                key={item._id}
                href={getResultLink(item)}
                className="search-result"
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer" : undefined}
              >
                {item.type && (
                  <span className="search-result-type">{item.type}</span>
                )}

                <strong>{item.title}</strong>

                {item.description && <p>{item.description}</p>}

                {item.tags?.length > 0 && (
                  <div className="search-result-tags">
                    {item.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                )}
              </a>
            );
          })}
        </div>
      )}

      {isOpen && hasSearchTerm && results.length === 0 && (
        <div className="search-results">
          <div className="search-empty">No results found.</div>
        </div>
      )}
    </div>
  );
}