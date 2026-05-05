import React, { Suspense, useState, useCallback, memo } from 'react'
import { Canvas } from '@react-three/fiber'
import { ScrollControls, Scroll } from '@react-three/drei'
import Experience from './components/Experience'
import Overlay from './components/Overlay'
import InvestmentDossier from './components/InvestmentDossier'
import ShowcaseGallery from './components/ShowcaseGallery'
import { useEffect } from 'react'

const Loader = () => (
    <div className="v-loader">
      <div className="v-loader-text">KAFM ORIGIN: AVM PRESTIGE v3.2</div>
    </div>
)

const langs = [
  { code: 'tr', label: 'TR' },
  { code: 'en', label: 'EN' },
  { code: 'de', label: 'DE' },
  { code: 'fr', label: 'FR' },
  { code: 'zh', label: 'ZH' }
];

const colors = [
  { id: 'black',  hex: '#0a0a0a', bg: '#080c12', label: 'Onyx' },
  { id: 'blue',   hex: '#002244', bg: '#000810', label: 'Space Blue' },
  { id: 'pink',   hex: '#d48888', bg: '#150a0a', label: 'Rose' },
  { id: 'silver', hex: '#8e8e93', bg: '#0d0d0d', label: 'Titanium' },
  { id: 'gold',   hex: '#b5935b', bg: '#100a00', label: 'Gold' }
];

// ── Hafif pub/sub: dil değişince sadece abone componentler render olur ──────
const langListeners = new Set()
export const langStore = {
  current: 'tr',
  subscribe: (fn) => { langListeners.add(fn); return () => langListeners.delete(fn) },
  set: (code) => { langStore.current = code; langListeners.forEach(fn => fn(code)) }
}

// Dil değişimine abone olan hook — sadece bunu kullanan component render olur
function useLang() {
  const [lang, setLang] = useState(langStore.current)
  useEffect(() => langStore.subscribe(setLang), [])
  return lang
}

// ── Canvas içeriği memo ile sarılmış — dil değişince RENDER OLMAZ ───────────
const CanvasContent = memo(({ color, bgColor, pages, onOpenDossier }) => {
  const lang = useLang()  // Overlay dili doğrudan buradan alır
  return (
    <ScrollControls pages={pages} damping={0.15} infinite={false}>
      <Experience color={color} bgColor={bgColor} />
      <Scroll html>
        <Overlay language={lang} onOpenDossier={onOpenDossier} />
      </Scroll>
    </ScrollControls>
  )
})

// ── Modal'lar da kendi dilini dinler ─────────────────────────────────────────
const DossierModal = memo(({ onClose }) => {
  const lang = useLang()
  return <InvestmentDossier language={lang} onClose={onClose} />
})

const ShowcaseModal = memo(({ onClose }) => {
  const lang = useLang()
  return <ShowcaseGallery language={lang} onClose={onClose} />
})

function App() {
  const [activeLang, setActiveLang] = useState('tr')
  const [productColor, setProductColor] = useState(colors[0])
  const [showDossier, setShowDossier] = useState(false)
  const [showShowcase, setShowShowcase] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)

  const handleLangChange = useCallback((code) => {
    langStore.set(code)   // Canvas'ı yeniden mount ETMİYOR
    setActiveLang(code)   // Sadece lang-switcher butonlarını günceller
  }, [])

  const toggleDossier = useCallback(() => setShowDossier(prev => !prev), [])
  const toggleShowcase = useCallback(() => {
    setShowShowcase(prev => {
      const next = !prev
      document.body.style.overflow = next ? 'hidden' : 'auto'
      return next
    })
  }, [])

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768)
    window.addEventListener('resize', handleResize)
    window.addEventListener('toggle-showcase', toggleShowcase)
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('toggle-showcase', toggleShowcase)
    }
  }, [toggleShowcase])

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      {/* UI Kontrolleri — Canvas dışında */}
      <div className="ui-container">
        <div className="lang-switcher">
          {langs.map(l => (
            <button
              key={l.code}
              className={`lang-btn ${activeLang === l.code ? 'active' : ''}`}
              onClick={() => handleLangChange(l.code)}
            >
              {l.label}
            </button>
          ))}
        </div>

        <div className="color-picker">
          {colors.map(c => (
            <button
              key={c.id}
              className={`color-btn ${productColor.id === c.id ? 'active' : ''}`}
              style={{ '--btn-color': c.hex }}
              onClick={() => setProductColor(c)}
              title={c.label}
            />
          ))}
        </div>
      </div>

      {/* Canvas — productColor değişmediği sürece yeniden mount OLMAZ */}
      <Suspense fallback={<Loader />}>
        <Canvas
          shadows
          dpr={[1, 2]}
          style={{ position: 'fixed', top: 0, left: 0 }}
        >
          <CanvasContent
            color={productColor.hex}
            bgColor={productColor.bg}
            pages={isMobile ? 17 : 11}
            onOpenDossier={toggleDossier}
          />
        </Canvas>
      </Suspense>

      {showDossier && <DossierModal onClose={toggleDossier} />}
      {showShowcase && <ShowcaseModal onClose={toggleShowcase} />}
    </div>
  )
}

export default App
