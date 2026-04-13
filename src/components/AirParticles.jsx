/**
 * AirParticles — upward-flowing particles inside the AURA chamber.
 *
 * Visible only during section 3 ("How it works").
 * Particles rise from the bottom of the glass cylinder, drift laterally,
 * and reset when they exit the top opening — simulating warm drying airflow.
 */

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { scrollStore } from '../scrollStore'

const COUNT   = 220
const ORIGIN  = { x: 0.4, y: -0.55 }   // product world position
const RADIUS  = 0.24                     // chamber inner radius
const Y_FLOOR = ORIGIN.y - 1.1          // bottom of particle spawn
const Y_CEIL  = ORIGIN.y + 1.4          // top (exit) of chamber

export default function AirParticles() {
  const pointsRef = useRef()
  const matRef    = useRef()
  const speeds    = useRef(null)
  const phases    = useRef(null)

  const { geometry, initSpeeds, initPhases } = useMemo(() => {
    const positions   = new Float32Array(COUNT * 3)
    const dropSpeeds  = new Float32Array(COUNT)
    const dropPhases  = new Float32Array(COUNT)

    for (let i = 0; i < COUNT; i++) {
      // Spawn randomly within cylinder cross-section
      const angle  = Math.random() * Math.PI * 2
      const r      = Math.random() * RADIUS
      positions[i * 3]     = ORIGIN.x + Math.cos(angle) * r
      positions[i * 3 + 1] = Y_FLOOR + Math.random() * (Y_CEIL - Y_FLOOR)
      positions[i * 3 + 2] = Math.sin(angle) * r

      dropSpeeds[i] = 0.008 + Math.random() * 0.014
      dropPhases[i] = Math.random() * Math.PI * 2
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return { geometry: geo, initSpeeds: dropSpeeds, initPhases: dropPhases }
  }, [])

  if (!speeds.current) { speeds.current = initSpeeds; phases.current = initPhases }

  useFrame((state, delta) => {
    if (!pointsRef.current || !matRef.current) return

    const dt  = Math.min(delta, 0.05)
    const t   = state.clock.elapsedTime
    const sec = scrollStore.section

    // ── Opacity: only visible in section 3 ──────────────────────────
    const targetOpacity = sec === 3 ? 0.75 : 0.0
    matRef.current.opacity += (targetOpacity - matRef.current.opacity) * dt * 5.0

    if (matRef.current.opacity < 0.01) return

    // ── Animate particles upward + gentle swirl ──────────────────────
    const pos = pointsRef.current.geometry.attributes.position.array

    for (let i = 0; i < COUNT; i++) {
      const ph = phases.current[i]
      const b  = i * 3

      // Rise
      pos[b + 1] += speeds.current[i]

      // Lateral swirl within radius
      const angle = t * 0.8 + ph
      const r     = Math.random() * 0.04 - 0.02
      pos[b]     = ORIGIN.x + Math.cos(angle + ph) * (RADIUS * 0.7) + r
      pos[b + 2] = Math.sin(angle + ph) * (RADIUS * 0.7)

      // Reset at top
      if (pos[b + 1] > Y_CEIL) {
        const ang2 = Math.random() * Math.PI * 2
        const r2   = Math.random() * RADIUS
        pos[b]     = ORIGIN.x + Math.cos(ang2) * r2
        pos[b + 1] = Y_FLOOR + Math.random() * 0.3
        pos[b + 2] = Math.sin(ang2) * r2
        speeds.current[i] = 0.008 + Math.random() * 0.014
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={pointsRef} geometry={geometry} frustumCulled={false}>
      <pointsMaterial
        ref={matRef}
        size={0.022}
        color="#88AAFF"
        transparent
        opacity={0}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
      />
    </points>
  )
}
