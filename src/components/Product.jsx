import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useScroll, Text } from '@react-three/drei'
import * as THREE from 'three'

const Product = ({ color = '#dde2e8' }) => {
  const scroll = useScroll()

  const groupRef        = useRef()
  const umbrellaRef     = useRef()
  const turbineRef      = useRef()
  const uvRingRef       = useRef()
  const uvLightRef      = useRef()
  const uvBeamRef       = useRef()
  const waterRef        = useRef()
  const waterGroupRef   = useRef()
  const ejectGroupRef   = useRef()
  const centrifDropsRef = useRef()
  const wallDropsRef    = useRef()
  const bubblesRef      = useRef()
  const dripsRef        = useRef()
  const fanRef          = useRef()
  const fanLightRef     = useRef()

  // ── TÜRBİN BİÇEKLERİ ──────────────────────────────────────────────────
  const turbineBlades = useMemo(() =>
    Array.from({ length: 12 }, (_, i) => ({
      rotation: [0, (i / 12) * Math.PI * 2, 0.42],
    })), [])

  // ── GERÇEK J-HOOK SAP (kapalı şemsiye tutacağı) ────────────────────────
  const handleGeo = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      new THREE.Vector3( 0.00,  0.00,  0),   // şaft üst birleşim
      new THREE.Vector3( 0.00,  0.10,  0),   // düz yukarı
      new THREE.Vector3( 0.04,  0.18,  0),   // kıvrım başlangıcı
      new THREE.Vector3( 0.16,  0.22,  0),   // J tepe noktası
      new THREE.Vector3( 0.25,  0.18,  0),   // J dış kenar
      new THREE.Vector3( 0.27,  0.06,  0),   // aşağı iniş
      new THREE.Vector3( 0.24, -0.06,  0),   // J iç alt
      new THREE.Vector3( 0.16, -0.10,  0),   // son
    ])
    return new THREE.TubeGeometry(curve, 40, 0.032, 14, false)
  }, [])

  // ── KABURGA İZ GEOMETRİLERİ (canopy yüzeyinde taperlanmış) ────────────
  const ribRidgeGeos = useMemo(() =>
    Array.from({ length: 8 }, (_, i) => {
      const ang = (i / 8) * Math.PI * 2
      const cos = Math.cos(ang), sin = Math.sin(ang)
      const curve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(cos * 0.138,  0.06, sin * 0.138),
        new THREE.Vector3(cos * 0.110, -0.38, sin * 0.110),
        new THREE.Vector3(cos * 0.072, -0.88, sin * 0.072),
        new THREE.Vector3(cos * 0.038, -1.26, sin * 0.038),
      ])
      return new THREE.TubeGeometry(curve, 14, 0.006, 5, false)
    }), [])

  // ── SANTRİFÜJ DAMLALAR (türbin aktifken) ───────────────────────────────
  const centrifugalDrops = useMemo(() =>
    Array.from({ length: 38 }, () => ({
      angle:      Math.random() * Math.PI * 2,
      orbitSpeed: 2.0 + Math.random() * 3.0,
      cycleSpeed: 0.38 + Math.random() * 0.55,
      phase:      Math.random() * Math.PI * 2,
    })), [])

  const wallDrops = useMemo(() =>
    Array.from({ length: 18 }, (_, i) => ({
      angle:  (i / 18) * Math.PI * 2 + Math.random() * 0.4,
      speed:  0.007 + Math.random() * 0.011,
      startY: 0.9 + Math.random() * 0.3,
    })), [])

  const bubbles = useMemo(() =>
    Array.from({ length: 22 }, () => ({
      position: [(Math.random()-0.5)*1.0, Math.random()*-0.55, (Math.random()-0.5)*1.0],
      speed: 0.08 + Math.random() * 0.22,
    })), [])

  // Kaburga uçlarından damlayanlar (kapalı şemsiye, dışarıdayken)
  const drips = useMemo(() =>
    Array.from({ length: 16 }, () => ({
      r:     0.03 + Math.random() * 0.05,   // kaburga ucu yarıçapında
      angle: Math.random() * Math.PI * 2,
      speed: 0.4 + Math.random() * 0.7,
      phase: Math.random() * Math.PI * 2,
    })), [])

  // ── ANİMASYON ──────────────────────────────────────────────────────────
  useFrame((state, delta) => {
    if (!groupRef.current) return
    const t      = state.clock.getElapsedTime()
    const offset = scroll.offset
    const dt     = Math.min(delta, 0.05)

    // Prestige nefes alma
    groupRef.current.position.y = Math.sin(t * 0.38) * 0.06

    // 1. ŞEMSİYE GİRİŞİ — y=5.2'den y=1.0'a (sap makinenin üstünde kalır)
    const insertProgress = THREE.MathUtils.smoothstep(offset, 0.12, 0.38)
    if (umbrellaRef.current) {
      umbrellaRef.current.position.y = THREE.MathUtils.lerp(5.2, 1.0, insertProgress)
      umbrellaRef.current.rotation.y = t * 0.14
    }

    // 2. TÜRBİN
    const dryingPhase = THREE.MathUtils.smoothstep(offset, 0.32, 0.58)
    if (turbineRef.current) {
      turbineRef.current.rotation.y += dt * (1.0 + dryingPhase * 24)
    }

    // 3. SANTRİFÜJ DAMLALAR
    if (centrifDropsRef.current) {
      centrifDropsRef.current.children.forEach((drop, i) => {
        const d      = centrifugalDrops[i]
        const localT = ((t * d.cycleSpeed + d.phase) % 1.0)
        const angle  = d.angle + t * d.orbitSpeed
        let r, dropY, opacity
        if (localT < 0.38) {
          const p = localT / 0.38
          r       = THREE.MathUtils.lerp(0.05, 0.78, p)
          dropY   = THREE.MathUtils.lerp(0.2, 0.04, p)
          opacity = dryingPhase * Math.min(p * 2.5, 1.0)
        } else if (localT < 0.88) {
          const p = (localT - 0.38) / 0.50
          r       = 0.78
          dropY   = THREE.MathUtils.lerp(0.04, -1.52, p)
          opacity = dryingPhase * (1 - p * 0.65) * 0.75
        } else {
          r = 0.05; dropY = 0.2; opacity = 0
        }
        drop.position.x = Math.cos(angle) * r
        drop.position.z = Math.sin(angle) * r
        drop.position.y = dropY
        if (drop.material) drop.material.opacity = opacity
      })
    }

    // 4. DUVAR DAMLALARI
    if (wallDropsRef.current) {
      wallDropsRef.current.children.forEach((drop, i) => {
        const d = wallDrops[i]
        drop.position.y -= d.speed
        if (drop.position.y < -1.6) {
          drop.position.y = d.startY
          drop.position.x = Math.cos(d.angle) * 0.78
          drop.position.z = Math.sin(d.angle) * 0.78
        }
        if (drop.material) drop.material.opacity = dryingPhase * 0.50
      })
    }

    // 5. UV STERİLİZASYON
    const uvPhase = THREE.MathUtils.smoothstep(offset, 0.45, 0.65)
    if (uvRingRef.current) {
      uvRingRef.current.material.emissiveIntensity = uvPhase * 16
      uvRingRef.current.material.opacity = 0.04 + uvPhase * 0.94
    }
    if (uvLightRef.current) uvLightRef.current.intensity  = uvPhase * 500
    if (uvBeamRef.current)  uvBeamRef.current.material.opacity = uvPhase * 0.30

    // 6. SU DOLUMU
    const fillPhase = THREE.MathUtils.smoothstep(offset, 0.60, 0.88)
    let waterScale = 0.01
    if (waterRef.current) {
      waterScale = THREE.MathUtils.lerp(0.01, 1.0, fillPhase)
      waterRef.current.scale.y = waterScale
      waterRef.current.position.y = -0.36 + (0.72 * waterScale) / 2
      if (fillPhase > 0 && fillPhase < 1) {
        waterRef.current.rotation.x = Math.sin(t * 10) * 0.030 * (1 - fillPhase)
        waterRef.current.rotation.z = Math.cos(t * 13) * 0.026 * (1 - fillPhase)
      } else {
        waterRef.current.rotation.x = 0
        waterRef.current.rotation.z = 0
      }
    }

    // 7. TANK ÇALKALANMA & KABARCIKLAR
    const ejectProgress = THREE.MathUtils.smoothstep(offset, 0.87, 0.97)
    if (waterGroupRef.current && ejectProgress > 0) {
      waterGroupRef.current.rotation.x = Math.sin(t * 9) * 0.09 * ejectProgress
      waterGroupRef.current.rotation.z = Math.cos(t * 7) * 0.06 * ejectProgress
    }
    if (bubblesRef.current && waterScale > 0.06) {
      const topLimit = -0.36 + (0.72 * waterScale) - 0.02
      bubblesRef.current.children.forEach((bubble, i) => {
        bubble.position.y += dt * bubbles[i].speed
        if (bubble.position.y > topLimit) {
          bubble.position.y = -0.35
          bubble.position.x = (Math.random() - 0.5) * 1.0
          bubble.position.z = (Math.random() - 0.5) * 1.0
        }
        bubble.position.x += Math.sin(t * 4 + i) * 0.0012
      })
    }

    // 8. TANK EJECTION — kameraya doğru fırlar, ekranda görünür kalır
    if (ejectGroupRef.current) {
      ejectGroupRef.current.position.y = THREE.MathUtils.lerp(-1.335, -2.0, ejectProgress)
      ejectGroupRef.current.position.z = THREE.MathUtils.lerp(0,      2.8,  ejectProgress)
      ejectGroupRef.current.position.x = THREE.MathUtils.lerp(0,      0.4,  ejectProgress)
      ejectGroupRef.current.rotation.x = THREE.MathUtils.lerp(0,     -0.22, ejectProgress)
    }

    // 8b. FAN (türbin aktifken döner)
    if (fanRef.current) {
      fanRef.current.rotation.z += dt * (1.5 + dryingPhase * 20)
    }
    if (fanLightRef.current) {
      fanLightRef.current.intensity = dryingPhase * 55
    }

    // 9. SU DAMLALARI — kaburga uçlarından (şemsiye dışarıdayken)
    const dripPhase = THREE.MathUtils.smoothstep(offset, 0.04, 0.18)
      * (1 - THREE.MathUtils.smoothstep(offset, 0.28, 0.40))
    if (dripsRef.current && umbrellaRef.current) {
      // Kaburga uçları şaft altından ~1.48 birim aşağıda
      dripsRef.current.position.y = umbrellaRef.current.position.y - 1.48
      dripsRef.current.children.forEach((drip, i) => {
        const d     = drips[i]
        const dripT = ((t * d.speed + d.phase) % 1.0)
        drip.position.x = Math.cos(d.angle) * d.r
        drip.position.z = Math.sin(d.angle) * d.r
        drip.position.y = THREE.MathUtils.lerp(0, -3.5, dripT)
        if (drip.material) drip.material.opacity = dripPhase * (1 - dripT * 0.85) * 0.65
      })
    }
  })

  return (
    <group ref={groupRef} scale={[1.4, 1.4, 1.4]}>

      {/* ══ JET-FLOW ENGINE (ÜST MODÜL) ════════════════════════════════════ */}
      <group position={[0, 1.6, 0]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.92, 0.92, 0.55, 64, 1, true]} />
          <meshPhysicalMaterial color={color} metalness={1.0} roughness={0.04} clearcoat={1} clearcoatRoughness={0} envMapIntensity={3} />
        </mesh>
        <mesh position={[0, 0.275, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.90, 0.024, 16, 64]} />
          <meshPhysicalMaterial color={color} metalness={1.0} roughness={0.04} clearcoat={1} clearcoatRoughness={0} envMapIntensity={3} />
        </mesh>
        <mesh position={[0, -0.275, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.90, 0.020, 16, 64]} />
          <meshPhysicalMaterial color={color} metalness={1.0} roughness={0.04} clearcoat={1} clearcoatRoughness={0} envMapIntensity={3} />
        </mesh>
        <mesh position={[0, 0.09, 0]}>
          <cylinderGeometry args={[0.87, 0.28, 0.36, 48, 1, true]} />
          <meshStandardMaterial color="#141618" metalness={1} roughness={0.2} />
        </mesh>
        <mesh position={[0, -0.02, 0.932]}>
          <planeGeometry args={[0.78, 0.20]} />
          <meshStandardMaterial color="#000000" emissive="#000511" emissiveIntensity={2} metalness={1} roughness={0.05} />
        </mesh>
        <group position={[0, -0.02, 0.944]}>
          <Text fontSize={0.040} color="#ffffff" anchorX="center" anchorY="middle">KAFM ORIGIN</Text>
          <Text position={[0, -0.058, 0]} fontSize={0.011} color="#446688" anchorX="center" anchorY="middle">AVM PRESTIGE EDITION</Text>
        </group>
        {/* Türbin */}
        <group position={[0, -0.36, 0]}>
          <pointLight color="#ffffff" intensity={220} distance={1.4} decay={2} />
          <group ref={turbineRef}>
            <mesh>
              <cylinderGeometry args={[0.26, 0.33, 0.16, 32]} />
              <meshStandardMaterial color="#080808" metalness={1} roughness={0.1} />
            </mesh>
            <mesh rotation={[Math.PI/2, 0, 0]}>
              <torusGeometry args={[0.12, 0.020, 8, 20]} />
              <meshPhysicalMaterial color={color} metalness={1} roughness={0.05} clearcoat={1} />
            </mesh>
            {turbineBlades.map((b, i) => (
              <group key={i} rotation={b.rotation}>
                <mesh position={[0.56, 0, 0]} rotation={[0.35, 0, 0]}>
                  <boxGeometry args={[0.46, 0.010, 0.16]} />
                  <meshPhysicalMaterial color={color} metalness={1.0} roughness={0.05} clearcoat={1} clearcoatRoughness={0} envMapIntensity={3} />
                </mesh>
              </group>
            ))}
          </group>
        </group>
      </group>

      {/* ══ OPTİK VOID CHAMBER ══════════════════════════════════════════════ */}
      <group>
        {[-0.82, 0.82].map((xPos, i) => (
          <mesh key={i} position={[xPos, 0.26, 0]}>
            <cylinderGeometry args={[0.013, 0.013, 2.50, 12]} />
            <meshPhysicalMaterial color={color} metalness={1.0} roughness={0.04} clearcoat={1} clearcoatRoughness={0} envMapIntensity={3} />
          </mesh>
        ))}
        <group position={[0, 1.28, 0]}>
          <pointLight ref={uvLightRef} color="#9900ff" intensity={0} distance={3.5} decay={2} />
          <mesh ref={uvRingRef} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.72, 0.058, 16, 64]} />
            <meshStandardMaterial color="#9900ff" emissive="#cc00ff" emissiveIntensity={0} transparent opacity={0.06} />
          </mesh>
          <mesh ref={uvBeamRef} position={[0, -0.88, 0]}>
            <cylinderGeometry args={[0.68, 0.82, 1.76, 32, 1, true]} />
            <meshBasicMaterial color="#5500cc" transparent opacity={0} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.DoubleSide} />
          </mesh>
        </group>
        <mesh position={[0, 1.34, 0]}>
          <cylinderGeometry args={[0.92, 0.92, 0.055, 64]} />
          <meshPhysicalMaterial color={color} metalness={1.0} roughness={0.04} clearcoat={1} clearcoatRoughness={0} envMapIntensity={3} />
        </mesh>
        <mesh position={[0, -0.90, 0]}>
          <cylinderGeometry args={[0.94, 0.94, 0.055, 64]} />
          <meshPhysicalMaterial color={color} metalness={1.0} roughness={0.04} clearcoat={1} clearcoatRoughness={0} envMapIntensity={3} />
        </mesh>
        <mesh position={[0, 0.22, 0]}>
          <cylinderGeometry args={[0.85, 0.85, 2.22, 64, 1, true]} />
          <meshPhysicalMaterial color="#c8e4ff" metalness={0.0} roughness={0.0} transparent opacity={0.13} clearcoat={1} clearcoatRoughness={0} envMapIntensity={2} side={THREE.DoubleSide} />
        </mesh>
        {/* Santrifüj damlalar */}
        <group ref={centrifDropsRef} position={[0, 0.22, 0]}>
          {centrifugalDrops.map((_, i) => (
            <mesh key={i}>
              <sphereGeometry args={[0.013, 6, 6]} />
              <meshBasicMaterial color="#55aaff" transparent opacity={0} blending={THREE.AdditiveBlending} depthWrite={false} />
            </mesh>
          ))}
        </group>
        {/* Duvar akış damlalar */}
        <group ref={wallDropsRef} position={[0, 0.22, 0]}>
          {wallDrops.map((d, i) => (
            <mesh key={i} position={[Math.cos(d.angle)*0.78, d.startY, Math.sin(d.angle)*0.78]}>
              <sphereGeometry args={[0.009, 5, 5]} />
              <meshBasicMaterial color="#99ccff" transparent opacity={0} depthWrite={false} />
            </mesh>
          ))}
        </group>
      </group>

      {/* ══ MAG-SAFE MODÜLER TANK ═══════════════════════════════════════════ */}
      <group ref={ejectGroupRef} position={[0, -1.335, 0]}>
        <mesh renderOrder={2}>
          <cylinderGeometry args={[0.92, 0.92, 0.82, 64, 1, true]} />
          <meshPhysicalMaterial color="#c8e4ff" metalness={0.0} roughness={0.0} transparent opacity={0.12} clearcoat={1} clearcoatRoughness={0} envMapIntensity={2} side={THREE.DoubleSide} depthWrite={false} />
        </mesh>
        <mesh position={[0, -0.41, 0]}>
          <cylinderGeometry args={[0.94, 0.94, 0.14, 64]} />
          <meshPhysicalMaterial color={color} metalness={1.0} roughness={0.04} clearcoat={1} clearcoatRoughness={0} envMapIntensity={3} />
        </mesh>
        {[0, 72, 144, 216, 288].map((deg, i) => (
          <mesh key={i} position={[Math.cos(deg*Math.PI/180)*0.72, -0.50, Math.sin(deg*Math.PI/180)*0.72]}>
            <cylinderGeometry args={[0.055, 0.07, 0.06, 12]} />
            <meshStandardMaterial color="#111111" roughness={0.95} />
          </mesh>
        ))}
        <mesh position={[0, 0.42, 0]} rotation={[Math.PI/2, 0, 0]}>
          <torusGeometry args={[0.90, 0.020, 12, 48]} />
          <meshStandardMaterial color="#00aaff" emissive="#0066ff" emissiveIntensity={2.5} />
        </mesh>
        {[0.05, 0.20, 0.35].map((yOff, i) => (
          <mesh key={i} position={[0, yOff-0.36, 0]} rotation={[Math.PI/2, 0, 0]}>
            <torusGeometry args={[0.88, 0.003, 4, 48]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={0.14} />
          </mesh>
        ))}
        <group ref={waterGroupRef} position={[0, -0.04, 0]}>
          <mesh ref={waterRef} renderOrder={1}>
            <cylinderGeometry args={[0.86, 0.86, 0.72, 32]} />
            <meshPhysicalMaterial color="#0077bb" transparent opacity={0.90} metalness={0.0} roughness={0.05} clearcoat={1} envMapIntensity={2} />
          </mesh>
          <group ref={bubblesRef}>
            {bubbles.map((b, i) => (
              <mesh key={i} position={b.position}>
                <sphereGeometry args={[0.012, 6, 6]} />
                <meshBasicMaterial color="#ffffff" transparent opacity={0.45} />
              </mesh>
            ))}
          </group>
        </group>
      </group>

      {/* ══ CANOPY SU DAMLALARI ════════════════════════════════════════════ */}
      <group ref={dripsRef} position={[0, 5.2, 0]}>
        {drips.map((d, i) => (
          <mesh key={i} position={[Math.cos(d.angle)*d.r, 0, Math.sin(d.angle)*d.r]}>
            <sphereGeometry args={[0.009, 5, 5]} />
            <meshBasicMaterial color="#88bbff" transparent opacity={0} depthWrite={false} />
          </mesh>
        ))}
      </group>

      {/* ══ KAPALI ŞEMSİYE (GERÇEK ANATOMİ) ═══════════════════════════════ */}
      <group ref={umbrellaRef} position={[0, 5.2, 0]}>

        {/* ── J-HOOK SAP (TubeGeometry, eğrisel) ── */}
        {/* Sap şaftın tepesinde, y=1.5'ten başlıyor */}
        <group position={[0, 1.5, 0]}>
          <mesh geometry={handleGeo} castShadow>
            <meshPhysicalMaterial
              color="#111111"
              metalness={0.05}
              roughness={0.20}
              clearcoat={1}
              clearcoatRoughness={0.10}
            />
          </mesh>
          {/* Sap üzerindeki grip bölümü (hafif kabartma) */}
          <mesh position={[0, -0.06, 0]}>
            <cylinderGeometry args={[0.035, 0.032, 0.28, 16]} />
            <meshStandardMaterial color="#1a1a1a" roughness={0.55} metalness={0.1} />
          </mesh>
        </group>

        {/* ── ANA MİL (şaftın tamamı) ── */}
        {/* Şaft: y=-1.55 (ferrule altı) → y=+1.5 (sap birleşimi) */}
        <mesh castShadow>
          <cylinderGeometry args={[0.016, 0.016, 3.05, 16]} />
          <meshStandardMaterial color="#505050" metalness={1.0} roughness={0.08} envMapIntensity={2} />
        </mesh>

        {/* ── RUNNER HALKASI (sürgü) ── */}
        <mesh position={[0, 0.10, 0]} rotation={[Math.PI/2, 0, 0]}>
          <torusGeometry args={[0.042, 0.013, 8, 24]} />
          <meshStandardMaterial color="#888888" metalness={1} roughness={0.10} />
        </mesh>

        {/* ── KAPALI KANAPÉ GÖVDE (8-panel, gerçek hacim) ── */}
        {/* Üstten geniş → alta doğru daralıyor, 8 segment = rib panelleri */}
        <mesh position={[0, -0.61, 0]}>
          <cylinderGeometry args={[0.145, 0.042, 1.42, 8]} />
          <meshStandardMaterial color={color} roughness={0.88} metalness={0.01} />
        </mesh>

        {/* 8 kaburga izi — TubeGeometry ile yüzeyde taperlanmış şerit */}
        {ribRidgeGeos.map((geo, i) => (
          <mesh key={i} geometry={geo}>
            <meshStandardMaterial color="#1c1c20" metalness={0.85} roughness={0.28} />
          </mesh>
        ))}

        {/* ── SNAP STRAP (1/3'te altın bant) ── */}
        <mesh position={[0, -0.34, 0]} rotation={[Math.PI/2, 0, 0]}>
          <torusGeometry args={[0.118, 0.011, 8, 28]} />
          <meshStandardMaterial color="#c8a020" metalness={0.4} roughness={0.40} />
        </mesh>
        <mesh position={[0.122, -0.34, 0]}>
          <sphereGeometry args={[0.016, 8, 6]} />
          <meshStandardMaterial color="#e2c040" metalness={0.7} roughness={0.22} />
        </mesh>

        {/* Kanapé alt kenar halkası */}
        <mesh position={[0, -1.32, 0]} rotation={[Math.PI/2, 0, 0]}>
          <torusGeometry args={[0.052, 0.009, 6, 22]} />
          <meshStandardMaterial color="#444444" metalness={1} roughness={0.12} />
        </mesh>

        {/* ── 8 KABURGA UCU (star-burst, alt uç) ── */}
        {Array.from({ length: 8 }, (_, i) => {
          const angle = (i / 8) * Math.PI * 2
          return (
            <group key={i} rotation={[0, angle, 0]}>
              <mesh position={[0.055, -1.40, 0]} rotation={[0, 0, -(Math.PI / 2 - 0.38)]}>
                <cylinderGeometry args={[0.003, 0.0016, 0.30, 5]} />
                <meshStandardMaterial color="#2e2e2e" metalness={1} roughness={0.10} />
              </mesh>
            </group>
          )
        })}

        {/* ── FERRULE (gümüş konik uç) ── */}
        <group position={[0, -1.60, 0]} rotation={[Math.PI, 0, 0]}>
          <mesh>
            <coneGeometry args={[0.016, 0.12, 10]} />
            <meshStandardMaterial color="#cccccc" metalness={1} roughness={0.04} envMapIntensity={2} />
          </mesh>
          <mesh position={[0, -0.062, 0]} rotation={[Math.PI/2, 0, 0]}>
            <torusGeometry args={[0.016, 0.005, 6, 16]} />
            <meshStandardMaterial color="#aaaaaa" metalness={1} roughness={0.08} />
          </mesh>
        </group>

      </group>

    </group>
  )
}

export default Product
