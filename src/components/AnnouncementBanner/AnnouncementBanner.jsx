import { useEffect, useState } from 'react'
import { client } from '../../sanityClient'
import './AnnouncementBanner.css'

export default function AnnouncementBanner() {
  const [banner, setBanner] = useState(null)

  useEffect(() => {
    const query = `
      *[
        _type == "announcementBanner" &&
        active == true
      ][0]{
        message,
        link,
        displayStyle,
        backgroundColour{ hex },
        textColour{ hex }
      }
    `

    client.fetch(query).then(setBanner).catch(console.error)
  }, [])

  if (!banner) return null

  const style = {
    backgroundColor: banner.backgroundColour?.hex || '#111',
    color: banner.textColour?.hex || '#fff',
  }

  const isTicker = banner.displayStyle === 'ticker'

  const bannerContent = (
    <div
      className={`announcement-banner ${isTicker ? 'announcement-banner--ticker' : ''}`}
      style={style}
    >
      {isTicker ? (
        <div className="announcement-ticker">
          <div className="announcement-ticker-track">
            <span>{banner.message}</span>
            <span>{banner.message}</span>
            <span>{banner.message}</span>
            <span>{banner.message}</span>
          </div>
        </div>
      ) : (
        <div className="announcement-content">{banner.message}</div>
      )}
    </div>
  )

  if (banner.link) {
    return (
      <a
        href={banner.link}
        target="_blank"
        rel="noreferrer"
        className="announcement-link"
      >
        {bannerContent}
      </a>
    )
  }

  return bannerContent
}