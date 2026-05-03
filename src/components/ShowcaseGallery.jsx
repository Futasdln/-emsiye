import React, { useEffect, useRef } from 'react'
import { translations } from '../translations'
import gsap from 'gsap'

const ShowcaseGallery = ({ language, onClose }) => {
  const t = translations[language] || translations.tr
  const containerRef = useRef()

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.showcase-overlay', { opacity: 0, duration: 0.5 })
      gsap.from('.showcase-card', {
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.08,
        ease: 'power3.out'
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  const images = [
    { id: 1, src: '/showcase/img5.jpg', title: 'THE ATRIUM SEOUL', category: 'PRESTIGE', size: 'span-4' },
    { id: 2, src: '/showcase/img7.jpg', title: 'TECHNICAL', category: 'DETAIL', size: 'span-2' },
    { id: 3, src: '/showcase/img1.jpg', title: 'LOBBY', category: 'INTEGRATION', size: 'span-3' },
    { id: 4, src: '/showcase/img9.jpg', title: 'RAIN DEFENSE', category: 'ATMOSPHERE', size: 'span-3' },
    { id: 5, src: '/showcase/img10.jpg', title: 'TRAFFIC', category: 'RELIABILITY', size: 'span-3' },
    { id: 6, src: '/showcase/img2.jpg', title: 'UV-C CORE', category: 'HYGIENE', size: 'span-4' },
    { id: 7, src: '/showcase/img5.jpg', title: 'PREMIUM FINISH', category: 'DESIGN', size: 'span-2' },
    { id: 8, src: '/showcase/img7.jpg', title: 'MICRO FOCUS', category: 'TECH', size: 'span-3' },
  ]

  return (
    <div className="showcase-overlay" ref={containerRef}>
      <div className="showcase-header-v3">
        <div className="header-left">
          <span className="brand-tag">KAFM ORIGIN</span>
          <h1 className="showcase-title-v3">{t.common.vitrinTitle}</h1>
        </div>
        <button className="close-btn-v3" onClick={onClose}>
          {t.common.close} <span>×</span>
        </button>
      </div>

      <div className="showcase-grid-v3">
        {images.map((img) => (
          <div key={img.id} className={`showcase-card-v3 ${img.size}`}>
            <div className="img-wrapper-v3">
              <img src={img.src} alt={img.title} />
              <div className="card-overlay-v3">
                <span className="cat-v3">{img.category}</span>
                <h3 className="title-v3">{img.title}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ShowcaseGallery
