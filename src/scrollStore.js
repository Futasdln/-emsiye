/**
 * Shared mutable scroll state.
 * NOT React state — intentionally a plain object so R3F's useFrame
 * can read it every tick without triggering React re-renders.
 */
export const scrollStore = {
  progress: 0,   // 0 → 1, total page scroll progress
  section: 0,    // 0-7, active section index
}
