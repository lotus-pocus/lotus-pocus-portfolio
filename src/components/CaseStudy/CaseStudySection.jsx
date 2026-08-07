import { PortableText } from "@portabletext/react";
import "./CaseStudySection.css";
import CaseStudyGallery from "./CaseStudyGallery";

const portableTextComponents = {
  marks: {
    link: ({ children, value }) => {
      const href = value?.href;

      if (!href) {
        return children;
      }

      const isExternal =
        href.startsWith("http://") || href.startsWith("https://");

      return (
        <a
          href={href}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noreferrer" : undefined}
        >
          {children}
        </a>
      );
    },
  },
};

function CaseStudySection({
  title,
  text,
  richText,
  images = [],
  layout = "single",
}) {
  const safeImages = Array.isArray(images) ? images : [];
  const hasImages = safeImages.length > 0;

  const hasRichText =
    Array.isArray(richText) && richText.length > 0;

  const hasCopy = hasRichText || Boolean(text);

  if (!title && !hasCopy && !hasImages) {
    return null;
  }

  return (
    <section className="case-study-section">
      {(title || hasCopy) && (
        <div className="case-study-copy">
          {title && <h3>{title}</h3>}

          {hasRichText ? (
            <PortableText
              value={richText}
              components={portableTextComponents}
            />
          ) : (
            text && <p>{text}</p>
          )}
        </div>
      )}

      {hasImages && (
        <CaseStudyGallery
          images={safeImages}
          layout={layout}
        />
      )}
    </section>
  );
}

export default CaseStudySection;