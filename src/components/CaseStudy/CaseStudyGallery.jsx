import "./CaseStudyGallery.css";

function CaseStudyGallery({
  images = [],
  layout = "single",
}) {
  const safeImages = Array.isArray(images) ? images : [];

  if (safeImages.length === 0) {
    return null;
  }

  return (
    <div className={`case-study-gallery ${layout}`}>
      {safeImages.map((image, index) => {
        const imageUrl = image?.asset?.url;

        if (!imageUrl) {
          return null;
        }

        return (
          <img
            key={`${imageUrl}-${index}`}
            src={imageUrl}
            alt={`Case study image ${index + 1}`}
            loading="lazy"
          />
        );
      })}
    </div>
  );
}

export default CaseStudyGallery;