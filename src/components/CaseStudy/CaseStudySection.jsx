import "./CaseStudySection.css";
import CaseStudyGallery from "./CaseStudyGallery";

function CaseStudySection({
  title,
  text,
  images = [],
  layout = "single",
}) {
  const safeImages = Array.isArray(images) ? images : [];
  const hasImages = safeImages.length > 0;

  if (!text && !hasImages) {
    return null;
  }

  return (
    <section className="case-study-section">
      {(title || text) && (
        <div className="case-study-copy">
          {title && <h3>{title}</h3>}
          {text && <p>{text}</p>}
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