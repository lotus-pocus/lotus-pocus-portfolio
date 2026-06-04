import { useState } from "react";
import "./Accordion.css";

function Accordion({ title, content }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!title || !content) return null;

  return (
    <div className="accordion">
      <button
        className="accordion-trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <span>{title}</span>
        <span>{isOpen ? "−" : "+"}</span>
      </button>

      {isOpen && (
        <div className="accordion-content">
          <p>{content}</p>
        </div>
      )}
    </div>
  );
}

export default Accordion;