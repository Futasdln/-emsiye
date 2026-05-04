import React, { Suspense, useState } from 'react'
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

function App() {
  const [language, setLanguage] = useState('tr');
  const [productColor, setProductColor] = useState(colors[0]);
  const [showDossier, setShowDossier] = useState(false);
  const [showShowcase, setShowShowcase] = useState(false);

  const toggleDossier = () => setShowDossier(!showDossier);
  const toggleShowcase = () => {
    setShowShowcase(!showShowcase);
    // When opening showcase, we might want to disable scrolling on body
    document.body.style.overflow = !showShowcase ? 'hidden' : 'auto';
  };

  useEffect(() => {
    const handleToggle = () => toggleShowcase();
    window.addEventListener('toggle-showcase', handleToggle);
    return () => window.removeEventListener('toggle-showcase', handleToggle);
  }, [showShowcase]);

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <div className="ui-container">
        <div className="lang-switcher">
          {langs.map(l => (
            <button 
              key={l.code} 
              className={`lang-btn ${language === l.code ? 'active' : ''}`}
              onClick={() => setLanguage(l.code)}
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

      <Suspense fallback={<Loader />}>
        <Canvas 
          shadows 
          dpr={[1, 2]} 
          style={{ position: 'fixed', top: 0, left: 0 }}
        >
          <ScrollControls pages={11} damping={0.15} infinite={false}>
            <Experience color={productColor.hex} bgColor={productColor.bg} />
            <Scroll html>
              <Overlay language={language} onOpenDossier={toggleDossier} />
            </Scroll>
          </ScrollControls>
        </Canvas>
      </Suspense>

      {showDossier && <InvestmentDossier language={language} onClose={toggleDossier} />}
      {showShowcase && <ShowcaseGallery language={language} onClose={toggleShowcase} />}
    </div>
  )
}

export default App
