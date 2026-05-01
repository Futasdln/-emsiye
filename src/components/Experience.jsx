import { useRef, Suspense } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScroll, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei'
import * as THREE from 'three'
import Product from './Product'
import Rain from './Rain'

// Kamera keyframe'leri
const KF = [
  { at: 0.000, pos: [1.8,  0.8,  9.5], look: [0,  0.2,  0] },
  { at: 0.125, pos: [0.4,  2.8,  6.0], look: [0,  2.2,  0] },
  { at: 0.250, pos: [-3.5, 0.8,  7.0], look: [0,  0.5,  0] },
  { at: 0.375, pos: [2.8,  1.4,  6.5], look: [0,  1.2,  0] },
  { at: 0.500, pos: [-2.0, 1.0,  7.5], look: [0,  0.8,  0] },
  { at: 0.625, pos: [1.2, -2.2,  6.0], look: [0, -1.5,  0] },
  { at: 0.750, pos: [0,   -4.0,  8.0], look: [0, -2.5,  0] },
  { at: 0.875, pos: [0,    0.0, 10.5], look: [0,  0.0,  0] },
]

function getKF(offset) {
  let a = KF[KF.length - 2], b = KF[KF.length - 1]
  for (let i = 0; i < KF.length - 1; i++) {
    if (offset >= KF[i].at && offset < KF[i + 1].at) {
      a = KF[i]; b = KF[i + 1]; break
    }
  }
  const range = b.at - a.at
  const t = range < 0.0001 ? 1 : THREE.MathUtils.clamp((offset - a.at) / range, 0, 1)
  const s = THREE.MathUtils.smoothstep(t, 0, 1)
  return {
    pos:  [a.pos[0]  + (b.pos[0]  - a.pos[0])  * s,
           a.pos[1]  + (b.pos[1]  - a.pos[1])  * s,
           a.pos[2]  + (b.pos[2]  - a.pos[2])  * s],
    look: [a.look[0] + (b.look[0] - a.look[0]) * s,
           a.look[1] + (b.look[1] - a.look[1]) * s,
           a.look[2] + (b.look[2] - a.look[2]) * s],
  }
}

const Experience = ({ color }) => {
  const scrollData = useScroll()
  const cameraRef  = useRef()

  // Module-level vektörler yerine useRef — HMR güvenli
  const camGoal     = useRef(new THREE.Vector3(1.8, 0.8, 9.5))
  const lookGoal    = useRef(new THREE.Vector3(0, 0.2, 0))
  const lookCurrent = useRef(new THREE.Vector3(0, 0.2, 0))

  useFrame((state, delta) => {
    if (!cameraRef.current) return
    const dt     = Math.min(delta, 0.05)
    const offset = scrollData.offset
    const t      = state.clock.getElapsedTime()

    const kf = getKF(offset)

    const breathX = Math.sin(t * 0.28) * 0.06
    const breathY = Math.cos(t * 0.22) * 0.04

    camGoal.current.set(kf.pos[0] + breathX, kf.pos[1] + breathY, kf.pos[2])
    cameraRef.current.position.lerp(camGoal.current, dt * 2.8)

    lookGoal.current.set(kf.look[0], kf.look[1], kf.look[2])
    lookCurrent.current.lerp(lookGoal.current, dt * 3.2)
    cameraRef.current.lookAt(lookCurrent.current)
  })

  return (
    <>
      <PerspectiveCamera 
        makeDefault 
        ref={cameraRef} 
        position={[1.8, 0.8, 9.5]} 
        fov={window.innerWidth < 768 ? 58 : 42} 
      />

      <color attach="background" args={['#080c12']} />
      <fog attach="fog" args={['#080c12', 10, 25]} />

      <Suspense fallback={null}>
        <Environment preset="studio" blur={0.8} />
      </Suspense>

      {/* ── KEY LIGHT ── */}
      <directionalLight
        position={[10, 14, 8]}
        intensity={2.8}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={60}
        shadow-camera-left={-12}
        shadow-camera-right={12}
        shadow-camera-top={12}
        shadow-camera-bottom={-12}
        shadow-bias={-0.0005}
      />

      {/* ── FILL (soğuk mavi) ── */}
      <directionalLight position={[-8, 4, 6]} intensity={0.9} color="#90B8E8" />

      {/* ── RIM (arka kenar) ── */}
      <directionalLight position={[0, 6, -12]} intensity={2.0} color="#ffffff" />

      {/* ── GROUND BOUNCE ── */}
      <directionalLight position={[0, -18, 8]} intensity={0.5} color="#D8EEFF" />

      {/* ── PRODUCT ACCENT ── */}
      <pointLight position={[0, 0, 5]} intensity={25} color="#ffffff" distance={12} decay={2} />

      <ContactShadows
        position={[0, -3.8, 0]}
        opacity={0.5}
        scale={20}
        blur={2.5}
        far={12}
        resolution={512}
        color="#000020"
      />

      <Rain />
      <Product color={color} />
    </>
  )
}

export default Experience
