import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScroll, Text } from '@react-three/drei'
import * as THREE from 'three'

const Product = () => {
  const scroll = useScroll()
  const groupRef = useRef()
  const umbrellaRef = useRef()
  const waterRef = useRef()
  const waterGroupRef = useRef()
  const dropsRef = useRef()
  const turbineRef = useRef()
  const uvEffectRef = useRef()
  const uvLightRef = useRef()
  const uvBeamRef = useRef()
  const ejectGroupRef = useRef()
  const bubblesRef = useRef()

  const raindrops = useMemo(() => {
    return new Array(24).fill(0).map((_, i) => ({
      position: [Math.random() * 0.4 - 0.2, 0, Math.random() * 0.4 - 0.2],
    }))
  }, [])

  const bubbles = useMemo(() => {
    return new Array(25).fill(0).map((_, i) => ({
      position: [(Math.random() - 0.5) * 1.3, Math.random() * -0.7, (Math.random() - 0.5) * 1.3],
      speed: 0.1 + Math.random() * 0.3
    }))
  }, [])

  const turbineBlades = useMemo(() => {
    return new Array(12).fill(0).map((_, i) => ({
      rotation: [0, (i / 12) * Math.PI * 2, 0.4],
    }))
  }, [])

  const ribs = useMemo(() => {
    return new Array(8).fill(0).map((_, i) => ({
      rotation: [0, (i / 8) * Math.PI * 2, 0.15],
    }))
  }, [])

  useFrame((state, delta) => {
    if (!groupRef.current) return
    const t = state.clock.getElapsedTime()
    const offset = scroll.offset
    
    // Group Breathing - Subtle Prestige
    groupRef.current.position.y = Math.sin(t * 0.4) * 0.05
    
    // ── LOGICAL UMBRELLA GLIDE (FIXED CLIPPING) ──────────────────
    // Ensures the canopy and shaft align perfectly with the funnel center
    const moveRange = THREE.MathUtils.smoothstep(offset, 0.2, 0.85)
    if (umbrellaRef.current) {
        umbrellaRef.current.position.y = THREE.MathUtils.lerp(4.0, 0.25, moveRange)
        umbrellaRef.current.rotation.y = t * 0.2 // Slow spin during entry
    }

    // JET-FLOW TURBINE (Sync with entry)
    const engineActive = THREE.MathUtils.smoothstep(offset, 0.35, 0.9)
    if (turbineRef.current) {
        turbineRef.current.rotation.y += delta * (1.5 + engineActive * 20)
    }

    // ELITE UV STERILIZATION (Volumetric + Real Light)
    const uvActive = THREE.MathUtils.smoothstep(offset, 0.75, 0.95)
    if (uvEffectRef.current) {
        uvEffectRef.current.material.emissiveIntensity = uvActive * 12
        uvEffectRef.current.material.opacity = 0.05 + uvActive * 0.95
    }
    if (uvLightRef.current) {
        uvLightRef.current.intensity = uvActive * 800 // Powerful purple burst
    }
    if (uvBeamRef.current) {
        uvBeamRef.current.material.opacity = uvActive * 0.4
    }

    // MAG-SAFE MODULAR EJECTION
    const ejectProgress = THREE.MathUtils.smoothstep(offset, 0.9, 1.0)
    if (ejectGroupRef.current) {
        ejectGroupRef.current.position.y = THREE.MathUtils.lerp(-1.335, -2.5, ejectProgress)
        ejectGroupRef.current.position.z = THREE.MathUtils.lerp(0, 1.5, ejectProgress)
        ejectGroupRef.current.rotation.x = THREE.MathUtils.lerp(0, 0.15, ejectProgress)
    }

    // WATER PHYSICS & LEVEL (Starts Empty -> Fills Up from Bottom)
    // Tank internal height is approx 0.72. Bottom local Y is -0.36.
    const fill = THREE.MathUtils.smoothstep(offset, 0.5, 0.9)
    let waterScale = 0.01;
    if (waterRef.current) {
        waterScale = THREE.MathUtils.lerp(0.01, 1.0, fill)
        waterRef.current.scale.y = waterScale
        waterRef.current.position.y = -0.36 + (0.72 * waterScale) / 2
        
        // Fluid Sloshing Physics during the fill
        if (fill > 0 && fill < 1) {
            waterRef.current.rotation.x = Math.sin(t * 12) * 0.04 * (1 - fill)
            waterRef.current.rotation.z = Math.cos(t * 15) * 0.04 * (1 - fill)
        } else {
            waterRef.current.rotation.x = 0;
            waterRef.current.rotation.z = 0;
        }
    }

    if (waterGroupRef.current && ejectProgress > 0) {
        waterGroupRef.current.rotation.x = Math.sin(t * 10) * 0.12 * ejectProgress
        waterGroupRef.current.rotation.z = Math.cos(t * 8) * 0.08 * ejectProgress
    }

    // MICRO-BUBBLES FLUID DYNAMICS
    if (bubblesRef.current && waterScale > 0.05) {
        const topLimit = -0.36 + (0.72 * waterScale) - 0.02; // Bubble breaking point
        bubblesRef.current.children.forEach((bubble, i) => {
            bubble.position.y += delta * bubbles[i].speed;
            
            // Pop & Reset at the top
            if (bubble.position.y > topLimit) {
                bubble.position.y = -0.35;
                bubble.position.x = (Math.random() - 0.5) * 1.3;
                bubble.position.z = (Math.random() - 0.5) * 1.3;
            }
            
            // Wobble
            bubble.position.x += Math.sin(t * 5 + i) * 0.002;
        })
    }

    // DROPS
    const activation = THREE.MathUtils.smoothstep(offset, 0.4, 0.8)
    if (dropsRef.current) {
        dropsRef.current.children.forEach((drop, i) => {
            const dropT = (t + i * 0.12) % 1.0
            drop.position.y = THREE.MathUtils.lerp(0.5, -1.8, dropT)
            drop.material.opacity = (1.0 - dropT) * activation
        })
    }
  })

  // ELITE 'SURGICAL GRADE' MATERIAL
  const surgicalSteel = (
    <meshPhysicalMaterial 
        color="#ffffff" metalness={1.0} roughness={0.05} 
        clearcoat={1} clearcoatRoughness={0} envMapIntensity={3} 
    />
  )

  return (
    <group ref={groupRef} scale={[1.4, 1.4, 1.4]}>
      
      {/* ── JET-FLOW ENGINE CORE ──────────────────────────────────── */}
      <group position={[0, 1.6, 0]}>
        {/* Outer Shell (Open Ended) */}
        <mesh castShadow>
          <cylinderGeometry args={[0.92, 0.92, 0.55, 64, 1, true]} />
          {surgicalSteel}
        </mesh>
        
        {/* Top Rim (Smooth Edge) */}
        <mesh position={[0, 0.275, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.9, 0.02, 16, 64]} />
            {surgicalSteel}
        </mesh>

        {/* Internal Slanted Funnel for Umbrella Entry */}
        <mesh position={[0, 0.1, 0]}>
            <cylinderGeometry args={[0.9, 0.35, 0.35, 32, 1, true]} />
            <meshStandardMaterial color="#222222" metalness={1} roughness={0.2} />
        </mesh>
        
        {/* OLED UI PANEL */}
        <mesh position={[0, 0, 0.935]}>
           <planeGeometry args={[0.82, 0.22]} />
           <meshStandardMaterial color="#000000" metalness={1} roughness={0.1} />
        </mesh>
        
        <group position={[0, 0, 0.95]}>
            <Text position={[0, 0, 0]} fontSize={0.04} color="#ffffff">KAFM ORIGIN</Text>
            <Text position={[0, -0.06, 0]} fontSize={0.012} color="#666666">AVM PRESTIGE EDITION</Text>
        </group>

        {/* 12-BLADE TURBINE (Internal Detail with Micro-Lighting) */}
        <group position={[0, -0.4, 0]}>
            {/* Turbine Internal Lighting to make blades POP */}
            <pointLight position={[0, 0, 0]} color="#ffffff" intensity={200} distance={1.5} decay={2} />
            
            <group ref={turbineRef}>
                <mesh>
                    <cylinderGeometry args={[0.3, 0.35, 0.15, 32]} />
                    <meshStandardMaterial color="#111111" metalness={1} />
                </mesh>
                {turbineBlades.map((b, i) => (
                    <group key={i} rotation={b.rotation}>
                        <mesh position={[0.6, 0, 0]} rotation={[0.4, 0, 0]}>
                            <boxGeometry args={[0.5, 0.01, 0.2]} />
                            {surgicalSteel}
                        </mesh>
                    </group>
                ))}
            </group>
        </group>
      </group>

      {/* ── OPTICAL VOID CHAMBER ──────────────────────────────────── */}
      <group>
        {/* SURGICAL INTERNAL PLUMBING (Logical Detail) */}
        <group position={[0, 0.25, 0]}>
            <mesh position={[0.82, 0, 0]}>
                <cylinderGeometry args={[0.015, 0.015, 2.5, 12]} />
                {surgicalSteel}
            </mesh>
            <mesh position={[-0.82, 0, 0]}>
                <cylinderGeometry args={[0.015, 0.015, 2.5, 12]} />
                {surgicalSteel}
            </mesh>
        </group>

        {/* UV PANEL & VOLUMETRIC BEAM */}
        <group position={[0, 1.3, 0]}>
            {/* Actual Light Source Casting on Umbrella */}
            <pointLight ref={uvLightRef} color="#9d00ff" intensity={0} distance={3} decay={2} castShadow />
            
            {/* The Physical Emissive Ring */}
            <mesh ref={uvEffectRef} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.72, 0.05, 16, 64]} />
                <meshStandardMaterial color="#9d00ff" emissive="#9d00ff" emissiveIntensity={0} transparent opacity={0.1} />
            </mesh>

            {/* Volumetric UV Light Cone (Additive Blending) */}
            <mesh ref={uvBeamRef} position={[0, -0.8, 0]}>
                <cylinderGeometry args={[0.7, 0.85, 1.6, 32, 1, true]} />
                <meshBasicMaterial 
                    color="#7b00ff" 
                    transparent 
                    opacity={0} 
                    blending={THREE.AdditiveBlending} 
                    depthWrite={false}
                    side={THREE.DoubleSide}
                />
            </mesh>
        </group>

        <mesh position={[0, 1.35, 0]}>
          <cylinderGeometry args={[0.92, 0.92, 0.05, 64]} />
          {surgicalSteel}
        </mesh>
        <mesh position={[0, -0.9, 0]}>
          <cylinderGeometry args={[0.94, 0.94, 0.05, 64]} />
          {surgicalSteel}
        </mesh>

        {/* PURE CLEAR GLASS (No distortions/refractions) */}
        <mesh position={[0, 0.22, 0]}>
          <cylinderGeometry args={[0.85, 0.85, 2.22, 64, 1, true]} />
          <meshPhysicalMaterial 
              color="#ffffff" transparent opacity={0.15} 
              metalness={0.1} roughness={0} clearcoat={1} clearcoatRoughness={0}
          />
        </mesh>
      </group>

      {/* ── MAG-SAFE MODULAR TANK ─────────────────────────────────── */}
      <group ref={ejectGroupRef} position={[0, -1.335, 0]}>
        {/* Outer Tank Glass (RenderOrder 2 prevents internal depth bugs) */}
        <mesh renderOrder={2}>
          <cylinderGeometry args={[0.92, 0.92, 0.82, 64, 1, true]} />
          <meshPhysicalMaterial 
              color="#ffffff" transparent opacity={0.15} depthWrite={false}
              metalness={0.1} roughness={0} clearcoat={1} clearcoatRoughness={0}
          />
        </mesh>
        
        {/* Tank Base Ring */}
        <mesh position={[0, -0.41, 0]}>
            <cylinderGeometry args={[0.94, 0.94, 0.12, 64]} />
            {surgicalSteel}
        </mesh>
        
        {/* DYNAMIC FLUID & BUBBLES */}
        <group ref={waterGroupRef} position={[0, -0.05, 0]}>
            {/* Real Water Transmission Surface */}
            <mesh ref={waterRef} renderOrder={1}>
                <cylinderGeometry args={[0.88, 0.88, 0.72, 32]} />
                <meshPhysicalMaterial 
                    color="#00aaff" 
                    transparent 
                    opacity={1} 
                    transmission={0.95} 
                    ior={1.33} 
                    thickness={0.5} 
                    metalness={0.0} 
                    roughness={0.05} 
                    clearcoat={1}
                />
            </mesh>
            
            {/* O2 Bubbles Particle System */}
            <group ref={bubblesRef}>
                {bubbles.map((b, i) => (
                    <mesh key={i} position={b.position}>
                        <sphereGeometry args={[0.015 + Math.random() * 0.015, 8, 8]} />
                        <meshBasicMaterial color="#ffffff" transparent opacity={0.6} />
                    </mesh>
                ))}
            </group>
        </group>
      </group>

      {/* RAINDROPS */}
      <group ref={dropsRef} position={[0, 0.4, 0]}>
        {raindrops.map((d, i) => (
            <mesh key={i} position={d.position}>
                <sphereGeometry args={[0.015, 8, 8]} />
                <meshStandardMaterial color="#ffffff" transparent opacity={0.8} />
            </mesh>
        ))}
      </group>

      {/* ── INDUSTRIAL UMBRELLA (LOGICAL CORRECTION) ──────────────── */}
      <group ref={umbrellaRef} position={[0, 2.5, 0]}>
        {/* Handle */}
        <mesh position={[0, 0.8, 0]}>
            <cylinderGeometry args={[0.08, 0.1, 0.4, 32]} />
            <meshStandardMaterial color="#111111" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Titanium Shaft */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.04, 0.04, 2.2, 16]} />
          <meshStandardMaterial color="#444444" metalness={1} roughness={0.1} />
        </mesh>
        {/* Clean Canopy Entry */}
        <group position={[0, -0.28, 0]}>
            <mesh>
                <cylinderGeometry args={[0.22, 0.06, 1.5, 32]} />
                <meshStandardMaterial color="#000000" roughness={0.9} />
            </mesh>
            <group position={[0, 0.65, 0]}>
                {ribs.map((rib, i) => (
                    <mesh key={i} rotation={rib.rotation}>
                        <cylinderGeometry args={[0.012, 0.012, 1.5, 8]} />
                        <meshStandardMaterial color="#222222" metalness={1} />
                    </mesh>
                ))}
            </group>
        </group>
      </group>

    </group>
  )
}

export default Product
