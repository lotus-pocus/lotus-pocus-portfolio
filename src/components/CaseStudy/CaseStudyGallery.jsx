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

        const imageKey =
          image?._key || `${imageUrl}-${index}`;

        const dimensions =
          image?.asset?.metadata?.dimensions;

        if (!imageUrl) {
          return null;
        }

        const imageElement = (
          <img
            src={imageUrl}
            alt={
              image.alt ||
              `Case study image ${index + 1}`
            }
            width={dimensions?.width}
            height={dimensions?.height}
            loading="lazy"
          />
        );

        return (
          <figure
            className="case-study-gallery-item"
            key={imageKey}
          >
            {image.linkUrl ? (
              <a
                href={image.linkUrl}
                target="_blank"
                rel="noreferrer"
                className="case-study-image-link"
                aria-label={
                  image.alt
                    ? `Open ${image.alt}`
                    : "Open related page"
                }
              >
                {imageElement}
              </a>
            ) : (
              imageElement
            )}

            {image.caption && (
              <figcaption>
                {image.caption}
              </figcaption>
            )}
          </figure>
        );
      })}
    </div>
  );
}

export default CaseStudyGallery;