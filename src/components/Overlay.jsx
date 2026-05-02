import { translations } from '../translations'

const Overlay = ({ language, onOpenDossier }) => {
  const t = translations[language] || translations.tr

  return (
    <div className="overlay">

      {/* ══ SECTION 0: HERO ══════════════════════════════════════════════ */}
      <section className="hero">
        <div className="content left">
          <div className="hero-badge reveal-container">
            <span className="reveal-text">{t.hero.badge}</span>
          </div>
          <h1 className="masked-text">
            <span className="reveal-container">
              <span className="reveal-text">KAFM</span>
            </span>
            <span className="reveal-container">
              <span className="reveal-text" style={{ animationDelay: '0.1s' }}>
                ORIGI<span className="cut-letter">N</span>
              </span>
            </span>
          </h1>
          <p className="hero-sub reveal-container">
            <span className="reveal-text" style={{ animationDelay: '0.3s' }}>{t.hero.subtitle}</span>
          </p>
          <p className="hero-desc reveal-container">
            <span className="reveal-text" style={{ animationDelay: '0.4s' }}>{t.hero.desc}</span>
          </p>
          <div className="scroll-indicator">{language === 'tr' ? 'KAYDIRARAK KEŞFEDİN ↓' : 'SCROLL TO EXPLORE ↓'}</div>
        </div>
      </section>

      {/* ══ SECTION 1: PROBLEM ═══════════════════════════════════════════ */}
      <section className="feature dark-section">
        <div className="content right">
          <div className="section-tag reveal-container">
            <span className="reveal-text">{t.problem.tag}</span>
          </div>
          <h2 className="masked-text reveal-container">
            <span className="reveal-text" style={{ animationDelay: '0.1s' }}>{t.problem.title}</span>
          </h2>
          <p className="reveal-container">
            <span className="reveal-text" style={{ animationDelay: '0.2s' }}>{t.problem.desc}</span>
          </p>
          <div className="stat-row">
            <div className="stat-item reveal-container">
              <div className="stat-number red reveal-text" style={{ animationDelay: '0.3s' }}>₺ 42M</div>
              <div className="stat-label reveal-text" style={{ animationDelay: '0.4s' }}>{t.problem.legal_risk}</div>
            </div>
            <div className="stat-item reveal-container">
              <div className="stat-number orange reveal-text" style={{ animationDelay: '0.3s' }}>150+</div>
              <div className="stat-label reveal-text" style={{ animationDelay: '0.4s' }}>{t.problem.complaints}</div>
            </div>
          </div>

          <div className="infographic-card" style={{ borderLeft: '4px solid #ff4444' }}>
            <div className="stat-header">
              <span className="stat-title">{t.problem.risk_title}</span>
              <span className="stat-percent" style={{color:'#ff4444'}}>{t.problem.risk_status}</span>
            </div>
            <div className="progress-track" style={{background: 'rgba(255,68,68,0.1)'}}>
              <div className="progress-fill" style={{ '--fill': '85%', background: '#ff4444' }}></div>
            </div>
            <p style={{fontSize:'0.8rem', marginTop:'1rem', color:'var(--dimmer)'}}>
              {t.problem.risk_desc}
            </p>
          </div>
        </div>
      </section>

      {/* ══ SECTION 2: TEKNOLOJİ 01 ═════════════════════════════════════ */}
      <section className="feature">
        <div className="content left">
          <div className="section-tag reveal-container">
            <span className="reveal-text">{t.tech1.tag}</span>
          </div>
          <h2 className="masked-text reveal-container">
            <span className="reveal-text" style={{ animationDelay: '0.1s' }}>{t.tech1.title}</span>
          </h2>
          <p className="reveal-container">
            <span className="reveal-text" style={{ animationDelay: '0.2s' }}>{t.tech1.desc}</span>
          </p>
          <div className="tech-pills">
            <span className="pill">RISK SHIELD</span>
            <span className="pill">MAG-LOCK</span>
            <span className="pill">IP67</span>
          </div>

          <div className="infographic-card">
            <div className="stat-header">
              <span className="stat-title">{t.tech1.index}</span>
              <span className="stat-percent">%99.8</span>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ '--fill': '99.8%' }}></div>
            </div>
            <div className="gauge-container">
              <div className="gauge-item">
                <span className="stat-title" style={{fontSize:'0.65rem'}}>{t.tech1.safety}</span>
                <div className="gauge-mini"><div className="gauge-mini-fill" style={{ '--fill': '100%' }}></div></div>
              </div>
              <div className="gauge-item">
                <span className="stat-title" style={{fontSize:'0.65rem'}}>{t.tech1.stability}</span>
                <div className="gauge-mini"><div className="gauge-mini-fill" style={{ '--fill': '95%' }}></div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SECTION 3: TEKNOLOJİ 02 ═════════════════════════════════════ */}
      <section className="feature dark-section">
        <div className="content right">
          <div className="section-tag reveal-container">
            <span className="reveal-text">{t.tech2.tag}</span>
          </div>
          <h2 className="masked-text reveal-container">
            <span className="reveal-text" style={{ animationDelay: '0.1s' }}>{language === 'tr' ? '120.000 RPM TÜRBİN' : '120,000 RPM TURBINE'}</span>
          </h2>
          <p className="reveal-container">
            <span className="reveal-text" style={{ animationDelay: '0.2s' }}>{t.tech2.desc}</span>
          </p>
          <div className="ui-metric">
            <div className="metric-title">{t.tech2.analytics}</div>
            <div className="metric-row">
              <div className="metric-bar-container tall">
                <div className="metric-bar scan-animate-speed"></div>
              </div>
            </div>
            <div className="metric-value">120K RPM / %35 {t.tech2.savings_tag}</div>
          </div>

          <div className="infographic-card">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th align="left" className="stat-title">{t.tech2.metric}</th>
                  <th align="right" className="stat-title">{t.tech2.value}</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="label">{t.tech2.energy}</td>
                  <td className="value gain">A+++</td>
                </tr>
                <tr>
                  <td className="label">{t.tech2.drying}</td>
                  <td className="value">4.2s</td>
                </tr>
                <tr>
                  <td className="label">{t.tech2.annual}</td>
                  <td className="value gain">₺ 140K+</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ══ SECTION 4: BİOGÜVENLİK ══════════════════════════════════════ */}
      <section className="feature">
        <div className="content left">
          <div className="section-tag reveal-container">
            <span className="reveal-text">{t.tech3.tag}</span>
          </div>
          <h2 className="masked-text reveal-container">
            <span className="reveal-text" style={{ animationDelay: '0.1s' }}>{language === 'tr' ? 'BİOGÜVENLİK ZIRHI' : 'BIO-SECURITY ARMOR'}</span>
          </h2>
          <p className="reveal-container">
            <span className="reveal-text" style={{ animationDelay: '0.2s' }}>{t.tech3.desc}</span>
          </p>
          
          <div className="pulse-container">
            <div className="pulse-core"></div>
            <div className="pulse-wave" style={{animationDelay:'0s'}}></div>
            <div className="pulse-wave" style={{animationDelay:'1s'}}></div>
            <div className="pulse-wave" style={{animationDelay:'2s'}}></div>
            <div className="uv-text-container" style={{marginTop:'120px'}}>
              <div className="uv-text" style={{fontSize:'2rem'}}>%99.9</div>
              <div className="uv-sub">UV-C STERILIZATION</div>
            </div>
          </div>

          <div className="infographic-card" style={{ borderLeft: '4px solid #00e5ff', marginTop:'4rem' }}>
             <div className="stat-header">
              <span className="stat-title">{t.tech3.status}</span>
              <span className="stat-percent" style={{color:'#00e5ff'}}>{t.tech3.active}</span>
            </div>
            <table className="comparison-table">
              <tbody>
                <tr>
                  <td className="label">{t.tech3.kill_rate}</td>
                  <td className="value gain">99.9%</td>
                </tr>
                <tr>
                  <td className="label">{t.tech3.exposure}</td>
                  <td className="value">0.2s</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ══ SECTION 5: TASARIM ═══════════════════════════════════════════ */}
      <section className="feature dark-section">
        <div className="content right">
          <div className="section-tag reveal-container">
            <span className="reveal-text">{t.design.tag}</span>
          </div>
          <h2 className="masked-text reveal-container">
            <span className="reveal-text" style={{ animationDelay: '0.1s' }}>{t.design.title}</span>
          </h2>
          <p className="reveal-container">
            <span className="reveal-text" style={{ animationDelay: '0.2s' }}>{t.design.desc}</span>
          </p>
          
          <div className="infographic-card">
            <div className="stat-header">
              <span className="stat-title">{t.design.material_title}</span>
              <span className="stat-percent">316L</span>
            </div>
            <div className="gauge-container">
              <div className="gauge-item">
                <span className="stat-title" style={{fontSize:'0.65rem'}}>{t.design.glass}</span>
                <p style={{fontSize:'0.7rem', color:'var(--dimmer)'}}>{t.design.glass_desc}</p>
                <div className="gauge-mini"><div className="gauge-mini-fill" style={{ '--fill': '100%', background:'var(--white)' }}></div></div>
              </div>
              <div className="gauge-item">
                <span className="stat-title" style={{fontSize:'0.65rem'}}>{t.design.steel}</span>
                <p style={{fontSize:'0.7rem', color:'var(--dimmer)'}}>{t.design.steel_desc}</p>
                <div className="gauge-mini"><div className="gauge-mini-fill" style={{ '--fill': '100%', background:'var(--white)' }}></div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SECTION 6: SU HAZNESİ ════════════════════════════════════════ */}
      <section className="feature">
        <div className="content left">
          <div className="section-tag reveal-container">
            <span className="reveal-text">{t.capacity.tag}</span>
          </div>
          <h2 className="masked-text reveal-container">
            <span className="reveal-text" style={{ animationDelay: '0.1s' }}>{language === 'tr' ? 'ULTRA KAPASİTE' : 'ULTRA CAPACITY'}</span>
          </h2>
          <p className="reveal-container">
            <span className="reveal-text" style={{ animationDelay: '0.2s' }}>{t.capacity.desc}</span>
          </p>
          
          <div className="infographic-card">
            <div className="stat-header">
              <span className="stat-title">{t.capacity.tank}</span>
              <span className="stat-percent">{t.capacity.volume}</span>
            </div>
            <div className="progress-track" style={{height:'10px'}}>
              <div className="progress-fill" style={{ '--fill': '65%', background: 'linear-gradient(90deg, #0099ff, #00e5ff)' }}></div>
            </div>
            <p style={{fontSize:'0.85rem', marginTop:'1.2rem', color:'var(--dimmer)', fontStyle:'italic'}}>
              {t.capacity.optimized}
            </p>
          </div>
        </div>
      </section>

      {/* ══ SECTION 7: ROI DASHBOARD ══════════════════════════════════════ */}
      <section className="feature dark-section dashboard">
        <div className="content center wide">
          <div className="section-tag center-tag reveal-container">
            <span className="reveal-text">{t.roi.tag}</span>
          </div>
          <h2 className="center-h2 masked-text reveal-container">
            <span className="reveal-text" style={{ animationDelay: '0.1s' }}>{t.roi.title}</span>
          </h2>
          <p className="center-p reveal-container">
            <span className="reveal-text" style={{ animationDelay: '0.2s' }}>{t.roi.desc}</span>
          </p>
          
          <div className="roi-grid">
            <div className="roi-card">
              <div className="roi-title">{t.roi.risk_mgt}</div>
              <div className="roi-value green">%0</div>
              <div className="roi-sub">LIABILITY</div>
            </div>

            <div className="roi-card featured-card">
              <div className="roi-title">{t.roi.payback}</div>
              <div className="roi-value gold">14 {language === 'tr' ? 'AY' : 'MOS'}</div>
              <div className="roi-sub">PAYBACK</div>
            </div>

            <div className="roi-card">
              <div className="roi-title">{t.roi.sustainability}</div>
              <div className="roi-value cyan">A+</div>
              <div className="roi-sub">ECO-RATING</div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SECTION 8: CTA ═══════════════════════════════════════════════ */}
      <section className="cta">
        <div className="content center cta-content">
          <div className="section-tag center-tag reveal-container">
            <span className="reveal-text">{t.cta.tag}</span>
          </div>
          <h2 className="cta-h2 masked-text reveal-container">
            <span className="reveal-text" style={{ animationDelay: '0.1s' }}>{t.cta.title}</span>
          </h2>
          <p className="cta-p reveal-container" style={{ marginBottom: '3rem' }}>
            <span className="reveal-text" style={{ animationDelay: '0.2s' }}>{t.cta.desc}</span>
          </p>
          <div className="cta-buttons">
            <button className="order-button primary" onClick={onOpenDossier}>
              {t.cta.button}
            </button>
          </div>

          <div className="infographic-card" style={{ maxWidth: '450px', margin: '4rem auto 0', textAlign:'left' }}>
            <div className="stat-header">
              <span className="stat-title">{t.cta.global}</span>
              <span className="stat-percent">A+ EXCELLENCE</span>
            </div>
            <table className="comparison-table">
              <tbody>
                <tr>
                  <td className="label">{t.cta.efficiency}</td>
                  <td className="value gain">+%94</td>
                </tr>
                <tr>
                  <td className="label">{t.cta.maintenance}</td>
                  <td className="value loss">-%85</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Overlay
