import React, { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { ScrollControls, Scroll } from '@react-three/drei'
import Experience from './components/Experience'
import Overlay from './components/Overlay'

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
  { id: 'black',  hex: '#0a0a0a', label: 'Onyx' },
  { id: 'blue',   hex: '#002244', label: 'Space Blue' },
  { id: 'pink',   hex: '#d48888', label: 'Rose' },
  { id: 'silver', hex: '#8e8e93', label: 'Titanium' },
  { id: 'gold',   hex: '#b5935b', label: 'Gold' }
];

function App() {
  const [language, setLanguage] = useState('tr');
  const [productColor, setProductColor] = useState(colors[0]);

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#010101' }}>
      
      {/* UI OVERLAY CONTROLS */}
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
          camera={{ position: [0, 0, 15], fov: 35 }}
          gl={{ 
            antialias: true,
            powerPreference: "high-performance",
          }}
          style={{ position: 'fixed', top: 0, left: 0 }}
        >
          <ScrollControls pages={8} damping={0.25}>
            <Experience color={productColor.hex} />
            <Scroll html>
              <Overlay language={language} />
            </Scroll>
          </ScrollControls>
        </Canvas>
      </Suspense>
    </div>
  )
}

export default App
