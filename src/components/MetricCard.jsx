import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'

const MetricCard = ({ label, value, caption, className = '' }) => {
  const valueRef = useRef(null)
  
  useEffect(() => {
    if (!valueRef.current) return
    
    // Extract number and suffix (e.g., "340%" -> {val: 340, suffix: "%"})
    const match = value.match(/(\d+)(.*)/)
    if (!match) return

    const targetVal = parseInt(match[1])
    const suffix = match[2] || ''
    
    const obj = { val: 0 }
    gsap.to(obj, {
      val: targetVal,
      duration: 2,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: valueRef.current,
        start: 'top 90%',
      },
      onUpdate: () => {
        if (valueRef.current) {
          valueRef.current.innerText = Math.round(obj.val) + suffix
        }
      }
    })
  }, [value])

  return (
    <article className={`metric-card ${className}`.trim()}>
      <div className="metric-card__label">{label}</div>
      <div className="metric-card__value" ref={valueRef}>{value}</div>
      <div className="metric-card__caption">{caption}</div>
    </article>
  )
}

export default MetricCard
