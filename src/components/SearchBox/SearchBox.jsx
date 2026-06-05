import { useEffect, useState } from 'react'
import { client } from '../../sanityClient'
import './SearchBox.css'

export default function SearchBox() {
  const [term, setTerm] = useState('')
  const [results, setResults] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (term.trim().length < 2) {
      setResults([])
      return
    }

    const query = `
      *[
        _type == "project" &&
        (
          title match $searchTerm ||
          type match $searchTerm ||
          description match $searchTerm ||
          $plainTerm in tags
        )
      ]{
        title,
        type,
        description,
        projectUrl,
        repo,
        tags
      }
    `

    client
      .fetch(query, {
        searchTerm: `${term}*`,
        plainTerm: term,
      })
      .then((data) => {
        setResults(data)
        setIsOpen(true)
      })
      .catch(console.error)
  }, [term])

  return (
    <div className="search-box">
      <input
        type="search"
        placeholder="Search the site..."
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        onFocus={() => setIsOpen(true)}
      />

      {isOpen && results.length > 0 && (
        <div className="search-results">
          {results.map((item) => (
            <a
              key={item.title}
              href={item.projectUrl || item.repo || '#projects'}
              className="search-result"
              target={item.projectUrl || item.repo ? '_blank' : undefined}
              rel="noreferrer"
            >
              <span className="search-result-type">{item.type}</span>
              <strong>{item.title}</strong>
              <p>{item.description}</p>

              {item.tags?.length > 0 && (
                <div className="search-result-tags">
                  {item.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              )}
            </a>
          ))}
        </div>
      )}

      {isOpen && term.length >= 2 && results.length === 0 && (
        <div className="search-results">
          <div className="search-empty">No results found.</div>
        </div>
      )}
    </div>
  )
}