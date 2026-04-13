import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'
import * as THREE from 'three'

const COUNT  = 2000
const SPREAD = { x: 26, z: 16 }
const TOP    = 12
const BOTTOM = -4
const LEN_MIN = 0.20
const LEN_MAX = 0.50

export default function Rain() {
  const linesRef = useRef()
  const matRef   = useRef()
  const speeds   = useRef(null)
  const scroll   = useScroll()

  const { geometry, initSpeeds } = useMemo(() => {
    const positions  = new Float32Array(COUNT * 6)
    const dropSpeeds = new Float32Array(COUNT)

    for (let i = 0; i < COUNT; i++) {
      const x   = (Math.random() - 0.5) * SPREAD.x
      const y   = Math.random() * (TOP - BOTTOM) + BOTTOM
      const z   = (Math.random() - 0.5) * SPREAD.z
      const len = LEN_MIN + Math.random() * (LEN_MAX - LEN_MIN)
      const dx  = (Math.random() - 0.5) * 0.05

      positions[i * 6]     = x
      positions[i * 6 + 1] = y
      positions[i * 6 + 2] = z
      positions[i * 6 + 3] = x + dx
      positions[i * 6 + 4] = y - len
      positions[i * 6 + 5] = z

      dropSpeeds[i] = 0.14 + Math.random() * 0.16
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return { geometry: geo, initSpeeds: dropSpeeds }
  }, [])

  if (!speeds.current) speeds.current = initSpeeds

  useFrame((state, delta) => {
    if (!linesRef.current || !matRef.current) return
    const dt = Math.min(delta, 0.05)
    const offset = scroll.offset

    // Yağmur yalnızca şemsiye dışarıdayken görünür (0-0.35), sonra solar
    const targetOpacity =
      offset < 0.18 ? 0.45 :
      offset < 0.38 ? THREE.MathUtils.lerp(0.45, 0, (offset - 0.18) / 0.20) :
      0.0

    matRef.current.opacity += (targetOpacity - matRef.current.opacity) * dt * 5.0
    if (matRef.current.opacity < 0.004) return

    const pos = linesRef.current.geometry.attributes.position.array

    for (let i = 0; i < COUNT; i++) {
      const spd = speeds.current[i]
      const b   = i * 6

      pos[b + 1] -= spd
      pos[b + 4] -= spd

      if (pos[b + 4] < BOTTOM) {
        const x   = (Math.random() - 0.5) * SPREAD.x
        const z   = (Math.random() - 0.5) * SPREAD.z
        const len = LEN_MIN + Math.random() * (LEN_MAX - LEN_MIN)
        const dx  = (Math.random() - 0.5) * 0.05

        pos[b]     = x
        pos[b + 1] = TOP + Math.random() * 3
        pos[b + 2] = z
        pos[b + 3] = x + dx
        pos[b + 4] = pos[b + 1] - len
        pos[b + 5] = z

        speeds.current[i] = 0.14 + Math.random() * 0.16
      }
    }

    linesRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <lineSegments ref={linesRef} geometry={geometry} frustumCulled={false}>
      <lineBasicMaterial
        ref={matRef}
        color="#88AACC"
        transparent
        opacity={0.45}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </lineSegments>
  )
}
