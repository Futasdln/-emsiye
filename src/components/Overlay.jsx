import React, { useState } from 'react'
import { translations } from '../translations'
import GlassInfoPanel from './GlassInfoPanel'
import MetricCard from './MetricCard'

const Overlay = ({ language, onOpenDossier }) => {
  const t = translations[language] || translations.tr
  
  // ROI Calculator State
  const [visitors, setVisitors] = useState(5000);
  const [rainyDays, setRainyDays] = useState(60);
  const [results, setResults] = useState(null);

  const calculateROI = () => {
    // Basic logic: probability of slip * visitors * rainy days * cost per slip
    const savings = Math.round((visitors * rainyDays * 0.0008) * 12000);
    const payback = Math.max(8, Math.round(450000 / (savings / 12)));
    setResults({ savings, payback });
  };

  return (
    <div className="overlay">

      {/* ══ SECTION 0: HERO ══════════════════════════════════════════════ */}
      <section className="hero">
        <div className="content left">
          <GlassInfoPanel variant="hero">
          <div className="hero-badge reveal-container">
            <span className="reveal-text">{t.category.eyebrow}</span>
          </div>
          <h1 className="masked-text">
            <span className="reveal-container">
              <span className="reveal-text hero-brand-line" style={{ animationDelay: '0.02s' }}>
                KAFM ORIGI<span className="cut-letter">N</span>
              </span>
            </span>
            <span className="reveal-container">
              <span className="reveal-text hero-category-line" style={{ animationDelay: '0.1s' }}>
                {t.category.title}
              </span>
            </span>
          </h1>
          <p className="hero-sub reveal-container">
            <span className="reveal-text" style={{ animationDelay: '0.3s' }}>{t.category.subtitle}</span>
          </p>
          <p className="hero-desc reveal-container">
            <span className="reveal-text" style={{ animationDelay: '0.4s' }}>{t.hero.desc}</span>
          </p>
          <div className="hero-signals reveal-container">
            <span className="reveal-text" style={{ animationDelay: '0.5s' }}>{t.category.investorLine}</span>
            <span className="reveal-text" style={{ animationDelay: '0.6s' }}>{t.category.buyerLine}</span>
          </div>
          <div className="scroll-indicator">{t.common.scrollExplore}</div>
          </GlassInfoPanel>
        </div>
      </section>

      {/* ══ SECTION 1: PROBLEM ═══════════════════════════════════════════ */}
      <section className="feature dark-section">
        <div className="content right">
          <GlassInfoPanel>
          <div className="section-tag reveal-container">
            <span className="reveal-text">{t.problem.tag}</span>
          </div>
          <h2 className="masked-text reveal-container">
            <span className="reveal-text" style={{ animationDelay: '0.1s' }}>{t.problem.title}</span>
          </h2>
          <p className="reveal-container">
            <span className="reveal-text" style={{ animationDelay: '0.2s' }}>{t.problem.desc}</span>
          </p>
          
          <div className="roi-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <div className="roi-card">
              <div className="roi-title">{t.problem.legal_risk}</div>
              <div className="roi-value" style={{ color: '#ff4444', fontSize: '1.5rem' }}>{t.problem.risk_status}</div>
              <div className="roi-sub">{t.problem.risk_title}</div>
            </div>
            <div className="roi-card">
              <div className="roi-title">{t.problem.complaints}</div>
              <div className="roi-value" style={{ color: '#ff8800', fontSize: '1.5rem' }}>{t.problem.risk_status}</div>
              <div className="roi-sub">{t.problem.risk_desc}</div>
            </div>
            <div className="roi-card">
              <div className="roi-title">{t.problem.risk_title}</div>
              <div className="roi-value" style={{ color: '#ff8800', fontSize: '1.5rem' }}>{t.problem.risk_status}</div>
              <div className="roi-sub">{t.problem.risk_desc}</div>
            </div>
            <div className="roi-card">
              <div className="roi-title">{t.problem.risk_title}</div>
              <div className="roi-value" style={{ color: '#ff4444', fontSize: '1.5rem' }}>{t.problem.risk_status}</div>
              <div className="roi-sub">{t.problem.risk_desc}</div>
            </div>
          </div>
          </GlassInfoPanel>
        </div>
      </section>

      {/* ══ SECTION 2: TECHNOLOGY ═══════════════════════════════════════ */}
      <section className="feature">
        <div className="content left">
          <GlassInfoPanel variant="default">
          <div className="section-tag reveal-container">
            <span className="reveal-text">{t.tech2.tag}</span>
          </div>
          <h2 className="masked-text reveal-container">
            <span className="reveal-text" style={{ animationDelay: '0.1s' }}>{t.tech2.title}</span>
          </h2>
          <p className="reveal-container">
            <span className="reveal-text" style={{ animationDelay: '0.2s' }}>{t.tech2.desc}</span>
          </p>
          
          <div className="infographic-card" style={{ background: 'transparent', border: 'none', padding: 0 }}>
            <ul style={{listStyle: 'none', padding: 0}}>
               <li className="reveal-container" style={{marginBottom: '0.8rem'}}>
                 <span className="reveal-text" style={{color: 'var(--accent)', fontWeight: 700}}>• {t.tech2.analytics}</span>
               </li>
               <li className="reveal-container" style={{marginBottom: '0.8rem'}}>
                 <span className="reveal-text" style={{animationDelay: '0.1s'}}>• {t.tech2.savings_tag}</span>
               </li>
               <li className="reveal-container" style={{marginBottom: '0.8rem'}}>
                 <span className="reveal-text" style={{animationDelay: '0.2s'}}>• {t.tech2.metric}</span>
               </li>
               <li className="reveal-container" style={{marginBottom: '0.8rem'}}>
                 <span className="reveal-text" style={{animationDelay: '0.3s'}}>• {t.tech2.value}</span>
               </li>
               <li className="reveal-container">
                 <span className="reveal-text" style={{animationDelay: '0.4s'}}>• {t.tech2.annual}</span>
               </li>
            </ul>
          </div>
          </GlassInfoPanel>
        </div>
      </section>

      {/* ══ SECTION 3: PERFORMANCE ══════════════════════════════════════ */}
      <section className="feature dark-section">
        <div className="content right">
          <GlassInfoPanel variant="compact">
          <div className="section-tag reveal-container">
            <span className="reveal-text">{t.tech3.tag}</span>
          </div>
          <h2 className="masked-text reveal-container">
            <span className="reveal-text" style={{ animationDelay: '0.1s', color: 'var(--accent-gold)' }}>{t.tech3.title}</span>
          </h2>
          <p className="reveal-container">
            <span className="reveal-text" style={{ animationDelay: '0.2s' }}>{t.tech3.desc}</span>
          </p>

          <div className="roi-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
            <div className="roi-card">
              <div className="roi-title">{t.tech3.status}</div>
              <div className="roi-value gold" style={{ fontSize: '1.8rem' }}>{t.tech3.active}</div>
              <div className="roi-sub">{t.tech2.energy}</div>
            </div>
            <div className="roi-card">
              <div className="roi-title">{t.tech3.kill_rate}</div>
              <div className="roi-value cyan" style={{ fontSize: '1.8rem' }}>{t.tech3.exposure}</div>
              <div className="roi-sub">{t.tech2.drying}</div>
            </div>
          </div>
          </GlassInfoPanel>
        </div>
      </section>

      {/* ══ SECTION 4: HYGIENE ══════════════════════════════════════════ */}
      <section className="feature">
        <div className="content left">
          <GlassInfoPanel variant="compact">
          <div className="section-tag reveal-container">
            <span className="reveal-text">{t.design.tag}</span>
          </div>
          <h2 className="masked-text reveal-container">
            <span className="reveal-text" style={{ animationDelay: '0.1s' }}>{t.design.title}</span>
          </h2>
          <p className="reveal-container">
            <span className="reveal-text" style={{ animationDelay: '0.2s' }}>{t.design.desc}</span>
          </p>
          
          <div className="material-signal">
            <div className="material-emblem" aria-hidden="true">
              <span className="material-emblem__ring material-emblem__ring--outer"></span>
              <span className="material-emblem__ring material-emblem__ring--inner"></span>
              <span className="material-emblem__dot"></span>
            </div>
            <div className="uv-text-container" style={{ textAlign: 'center' }}>
              <div className="uv-text" style={{fontSize:'2.5rem', fontWeight: 900, color: 'var(--accent)'}}>{t.design.glass}</div>
              <div className="uv-sub" style={{letterSpacing: '0.3em'}}>{t.design.steel}</div>
            </div>
          </div>
          </GlassInfoPanel>
        </div>
      </section>

      {/* ══ SECTION 5: CAPACITY ═════════════════════════════════════════ */}
      <section className="feature dark-section">
        <div className="content right">
          <GlassInfoPanel variant="compact">
          <div className="section-tag reveal-container">
            <span className="reveal-text">{t.capacity.tag}</span>
          </div>
          <h2 className="masked-text reveal-container">
            <span className="reveal-text" style={{ animationDelay: '0.1s' }}>{t.capacity.title}</span>
          </h2>
          <p className="reveal-container" style={{ marginBottom: '2rem' }}>
            <span className="reveal-text" style={{ animationDelay: '0.2s' }}>{t.capacity.desc}</span>
          </p>
          
          <div className="tech-pills">
            <span className="pill">{t.capacity.tank}</span>
            <span className="pill">{t.capacity.volume}</span>
            <span className="pill">{t.capacity.optimized}</span>
            <span className="pill">{t.tech2.energy}</span>
          </div>
          <div className="trust-block">
            <h3>{t.trust.title}</h3>
            <p>{t.trust.subtitle}</p>
            <div className="trust-grid">
              <article className="trust-card">
                <h4>{t.trust.installation}</h4>
                <p>{t.trust.disclaimer}</p>
              </article>
              <article className="trust-card">
                <h4>{t.trust.maintenance}</h4>
                <p>{t.trust.service}</p>
              </article>
              <article className="trust-card">
                <h4>{t.trust.testing}</h4>
                <p>{t.trust.certification}</p>
              </article>
              <article className="trust-card">
                <h4>{t.roi.assumptionTitle}</h4>
                <p>{t.roi.modelNote}</p>
              </article>
            </div>
          </div>
          </GlassInfoPanel>
        </div>
      </section>

      {/* ══ SECTION 6: ROI ══════════════════════════════════════════════ */}
      <section className="feature dashboard">
        <div className="content center wide">
          <GlassInfoPanel variant="metric">
          <div className="section-tag center-tag reveal-container">
            <span className="reveal-text">{t.roi.tag}</span>
          </div>
          <h2 className="center-h2 masked-text reveal-container">
            <span className="reveal-text" style={{ animationDelay: '0.1s' }}>{t.roi.title}</span>
          </h2>
          <p className="center-p reveal-container">
            <span className="reveal-text" style={{ animationDelay: '0.2s' }}>{t.roi.desc}</span>
          </p>
          <p className="roi-assumption-note reveal-container">
            <span className="reveal-text" style={{ animationDelay: '0.25s' }}>{t.roi.modelNote}</span>
          </p>
          <div className="roi-assumptions reveal-container">
            <span className="reveal-text" style={{ animationDelay: '0.3s' }}>{t.roi.assumptionTraffic}</span>
            <span className="reveal-text" style={{ animationDelay: '0.35s' }}>{t.roi.assumptionRain}</span>
            <span className="reveal-text" style={{ animationDelay: '0.4s' }}>{t.roi.assumptionIncident}</span>
            <span className="reveal-text" style={{ animationDelay: '0.45s' }}>{t.roi.assumptionCost}</span>
          </div>
          
          <div className="metric-grid">
            <MetricCard
              label={t.roiMetrics.riskManagementLabel}
              value={t.roiMetrics.riskManagementValue}
              caption={t.roiMetrics.riskManagementCaption}
            />
            <MetricCard
              label={t.roiMetrics.paybackLabel}
              value={`${t.roiMetrics.paybackValue} ${t.common.monthsShort}`}
              caption={t.roiMetrics.paybackCaption}
              className="metric-card--featured"
            />
            <MetricCard
              label={t.roiMetrics.sustainabilityLabel}
              value={t.roiMetrics.sustainabilityValue}
              caption={t.roiMetrics.sustainabilityCaption}
            />
          </div>
          </GlassInfoPanel>
        </div>
      </section>

      {/* ══ SECTION 7: CTA ═══════════════════════════════════════════════ */}
      <section className="cta decision-section">
        <div className="content center cta-content decision-content" style={{ maxWidth: '800px' }}>
          <GlassInfoPanel variant="cta" className="decision-panel">
          <div className="section-tag center-tag reveal-container">
            <span className="reveal-text">{t.cta.tag}</span>
          </div>
          <h2 className="cta-h2 masked-text reveal-container">
            <span className="reveal-text" style={{ animationDelay: '0.1s' }}>{t.cta.title}</span>
          </h2>
          <p className="cta-p reveal-container" style={{ marginBottom: '3rem' }}>
            <span className="reveal-text" style={{ animationDelay: '0.2s' }}>{t.cta.desc}</span>
          </p>
          <div className="cta-buttons" style={{display: 'flex', gap: '1rem', justifyContent: 'center'}}>
            <button className="order-button primary" onClick={onOpenDossier}>
              {t.cta.primaryButton}
            </button>
          </div>
          <div className="decision-support">
            <span>{t.cta.global}</span>
            <span>{t.cta.efficiency}</span>
            <span>{t.cta.maintenance}</span>
          </div>
          </GlassInfoPanel>
        </div>
      </section>

      <section className="roi-calculator-section" style={{paddingBottom: '50px'}}>
        <div className="content wide center">
          <GlassInfoPanel variant="cta">
            <span className="section-tag center-tag">{t.calculator.title}</span>
            <h2 className="center-h2">{t.calculator.title}</h2>
            <p className="center-p">{t.calculator.subtitle}</p>

            <div className="roi-dashboard">
              {/* INPUTS */}
              <div className="calc-controls">
                <div className="input-card">
                  <div className="input-header">
                    <span className="input-label">{t.calculator.visitors}</span>
                    <span className="input-value">{visitors.toLocaleString()}</span>
                  </div>
                  <input 
                    type="range" min="500" max="50000" step="500" 
                    className="premium-slider"
                    value={visitors} 
                    onChange={(e) => setVisitors(parseInt(e.target.value))} 
                  />
                </div>

                <div className="input-card">
                  <div className="input-header">
                    <span className="input-label">{t.calculator.rainyDays}</span>
                    <span className="input-value">{rainyDays}</span>
                  </div>
                  <input 
                    type="range" min="10" max="250" step="5" 
                    className="premium-slider"
                    value={rainyDays} 
                    onChange={(e) => setRainyDays(parseInt(e.target.value))} 
                  />
                </div>

                <button className="order-button primary" onClick={calculateROI} style={{width: '100%', marginTop: '1rem'}}>
                  {t.calculator.calculate}
                </button>
              </div>

              {/* RESULTS */}
              <div className="results-display">
                <div className="impact-card">
                  <span className="impact-label">{t.calculator.savingsLabel}</span>
                  <div className="impact-main-val">
                    {results ? results.savings.toLocaleString() : '---'} <span style={{fontSize: '1.5rem'}}>{t.calculator.currency}</span>
                  </div>
                  <div style={{fontSize: '0.7rem', color: 'var(--dimmer)', marginTop: '0.5rem'}}>YILLIK PROJEKSİYON</div>
                </div>

                <div className="impact-card" style={{padding: '1.5rem'}}>
                  <span className="impact-label">{t.calculator.paybackLabel}</span>
                  <div className="impact-main-val" style={{fontSize: '2.5rem'}}>
                    {results ? results.payback : '--'} <span style={{fontSize: '1rem'}}>{t.calculator.unit}</span>
                  </div>
                </div>
              </div>
            </div>
          </GlassInfoPanel>
        </div>
      </section>
    </div>
  )
}

export default Overlay
