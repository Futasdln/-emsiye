import React, { useRef, Suspense } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScroll, PerspectiveCamera, Environment, SpotLight, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'
import Product from './Product'

const Experience = () => {
  const scroll = useScroll()
  const cameraRef = useRef()

  useFrame((state, delta) => {
    const offset = scroll.offset
    if (cameraRef.current) {
        // CINEMATIC 'AVM' CINEMATOGRAPHY
        // Adjusted to avoid overlapping with text boxes in Overlay
        let targetX = 0; let targetY = 0; let targetZ = 16 
        
        if (offset < 0.2) {
            targetX = 1.8; targetY = -0.6; targetZ = 15 // Side framing for hero
        } else if (offset < 0.45) {
            targetX = 4.5; targetY = 2.0; targetZ = 18 // Turbine focus
        } else if (offset < 0.75) {
            targetX = -5.0; targetY = 0.5; targetZ = 14 // Dome clarity
        } else {
            targetX = 0; targetY = -5.5 ; targetZ = 13 // Tank Ejection reveal
        }

        cameraRef.current.position.lerp(new THREE.Vector3(targetX, targetY, targetZ), 0.05)
        cameraRef.current.lookAt(0, offset > 0.88 ? -4.5 : 0, 0)
    }
  })

  return (
    <>
      {/* 25 FOV: Professional Narrow Lens */}
      <PerspectiveCamera makeDefault ref={cameraRef} position={[2, 0, 18]} fov={25} />
      

      <color attach="background" args={['#080808']} />
      
      <ambientLight intensity={0.6} />
      
      <Suspense fallback={null}>
        {/* PREMIUM STUDIO REFLECTIONS (Background Hidden) */}
        <Environment preset="studio" blur={1} />
      </Suspense>

      {/* ── PROFESSIONAL STUDIO RIG (Clean Mirror Steel) ─────────── */}
      
      {/* KEY LIGHT (Top Right) */}
      <SpotLight
        position={[40, 50, 40]}
        angle={0.3}
        penumbra={1}
        intensity={8000}
        color="#ffffff"
        castShadow
      />

      {/* FILL LIGHT (Left Front) */}
      <SpotLight
        position={[-30, 20, 25]}
        angle={0.6}
        intensity={3000}
        color="#ffffff"
      />

      {/* RIM LIGHT (Back Edge Highlight) */}
      <SpotLight
          position={[0, 15, -20]}
          intensity={2000}
          color="#ffffff"
      />

      {/* GROUND BOUNCE */}
      <directionalLight position={[0, -25, 12]} intensity={2.0} color="#ffffff" />

      {/* MODULAR EJECT FOCUS */}
      <pointLight position={[0, -6, 6]} intensity={600} color="#00ffff" />

      <ContactShadows 
        position={[0, -3.2, 0]} 
        opacity={0.7} 
        scale={40} 
        blur={1.5} 
        far={15} 
        resolution={1024} 
        color="#000000"
      />

      <Product />
    </>
  )
}

export default Experience
