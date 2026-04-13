import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { ScrollControls, Scroll } from '@react-three/drei'
import Experience from './components/Experience'
import Overlay from './components/Overlay'

const Loader = () => (
    <div className="v-loader">
      <div className="v-loader-text">KAFM ORIGIN: AVM PRESTIGE v3.2</div>
    </div>
)

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#010101' }}>
      {/* RESTORE SUSPENSE for AVM/Lobby Asset Loading */}
      <Suspense fallback={<Loader />}>
        <Canvas
          shadows
          dpr={[1, 2]} // Balanced for quality vs stability
          camera={{ position: [0, 0, 15], fov: 35 }}
          onCreated={({ gl }) => {
            console.log('Canvas Created Successfully', gl.getContext());
            if (!gl.getContext()) console.error('WebGL Context failed to initialize');
          }}
          gl={{ 
            antialias: true, 
            stencil: false,
            depth: true,
            alpha: false,
            powerPreference: "high-performance",
            preserveDrawingBuffer: true
          }}
          style={{ position: 'fixed', top: 0, left: 0 }}
        >

          
          <ScrollControls pages={7} damping={0.2}>
            <Experience />
            
            <Scroll html>
              <Overlay />
            </Scroll>
          </ScrollControls>
          
        </Canvas>
      </Suspense>
    </div>
  )
}

export default App
