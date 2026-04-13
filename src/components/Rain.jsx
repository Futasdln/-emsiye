/**
 * Rain — LineSegments particle system.
 *
 * Each raindrop is a two-point line segment (top, bottom).
 * Drops fall at varying speeds, wrap back to the top when off-screen.
 * Opacity fades out as the user scrolls past the problem section (sec > 2).
 */

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { scrollStore } from '../scrollStore'

const COUNT  = 2200           // number of drops
const SPREAD = { x: 28, z: 18 }
const TOP    = 14             // y spawn height
const BOTTOM = -5             // y reset threshold
const LEN_MIN = 0.18
const LEN_MAX = 0.46

export default function Rain() {
  const linesRef   = useRef()
  const matRef     = useRef()
  const speeds     = useRef(null)      // per-drop fall speed

  // Build geometry once
  const { geometry, initSpeeds } = useMemo(() => {
    const positions  = new Float32Array(COUNT * 6)   // 2 verts × 3 components
    const dropSpeeds = new Float32Array(COUNT)

    for (let i = 0; i < COUNT; i++) {
      const x   = (Math.random() - 0.5) * SPREAD.x
      const y   = Math.random() * (TOP - BOTTOM) + BOTTOM
      const z   = (Math.random() - 0.5) * SPREAD.z
      const len = LEN_MIN + Math.random() * (LEN_MAX - LEN_MIN)
      const dx  = (Math.random() - 0.5) * 0.06  // slight horizontal drift

      positions[i * 6]     = x
      positions[i * 6 + 1] = y
      positions[i * 6 + 2] = z
      positions[i * 6 + 3] = x + dx
      positions[i * 6 + 4] = y - len
      positions[i * 6 + 5] = z

      dropSpeeds[i] = 0.12 + Math.random() * 0.14
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return { geometry: geo, initSpeeds: dropSpeeds }
  }, [])

  // Store speeds in ref so animation loop can mutate them
  if (!speeds.current) speeds.current = initSpeeds

  useFrame((state, delta) => {
    if (!linesRef.current || !matRef.current) return

    const dt  = Math.min(delta, 0.05)
    const sec = scrollStore.section

    // ── Opacity: visible in sections 0–2, fade out from section 3 ──
    const targetOpacity = sec <= 1 ? 0.40 : sec === 2 ? 0.18 : 0.0
    matRef.current.opacity += (targetOpacity - matRef.current.opacity) * dt * 4.0

    if (matRef.current.opacity < 0.005) return   // skip position update if invisible

    // ── Animate drop positions ──────────────────────────────────────
    const pos = linesRef.current.geometry.attributes.position.array

    for (let i = 0; i < COUNT; i++) {
      const spd = speeds.current[i]
      const b   = i * 6

      pos[b + 1] -= spd        // top y
      pos[b + 4] -= spd        // bottom y

      // Wrap when drop passes BOTTOM
      if (pos[b + 4] < BOTTOM) {
        const x   = (Math.random() - 0.5) * SPREAD.x
        const z   = (Math.random() - 0.5) * SPREAD.z
        const len = LEN_MIN + Math.random() * (LEN_MAX - LEN_MIN)
        const dx  = (Math.random() - 0.5) * 0.06

        pos[b]     = x
        pos[b + 1] = TOP + Math.random() * 4
        pos[b + 2] = z
        pos[b + 3] = x + dx
        pos[b + 4] = pos[b + 1] - len
        pos[b + 5] = z

        speeds.current[i] = 0.12 + Math.random() * 0.14
      }
    }

    linesRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <lineSegments ref={linesRef} geometry={geometry} frustumCulled={false}>
      <lineBasicMaterial
        ref={matRef}
        color="#7A95BB"
        transparent
        opacity={0.4}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </lineSegments>
  )
}
