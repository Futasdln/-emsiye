import { translations } from '../translations'

const Overlay = ({ language }) => {
  const t = translations[language] || translations.tr

  return (
    <div className="overlay">

      {/* ══ SECTION 0: HERO ══════════════════════════════════════════════ */}
      <section className="hero">
        <div className="content left">
          <div className="hero-badge">{t.hero.badge}</div>
          <h1>{t.hero.title.split(' ')[0]}<br />{t.hero.title.split(' ')[1]}</h1>
          <p className="hero-sub">{t.hero.subtitle}</p>
          <p className="hero-desc">{t.hero.desc}</p>
          <div className="scroll-indicator">{language === 'tr' ? 'KAYDIRARAK KEŞFEDİN ↓' : 'SCROLL TO EXPLORE ↓'}</div>
        </div>
      </section>

      {/* ══ SECTION 1: PROBLEM ═══════════════════════════════════════════ */}
      <section className="feature dark-section">
        <div className="content right">
          <div className="section-tag">{t.problem.tag}</div>
          <h2>{t.problem.title.split(' ').slice(0, 2).join(' ')}<br />{t.problem.title.split(' ').slice(2).join(' ')}</h2>
          <p>{t.problem.desc}</p>
          <div className="stat-row">
            <div className="stat-item">
              <div className="stat-number red">₺ 42M</div>
              <div className="stat-label">{language === 'tr' ? 'Yıllık ortalama hukuki dava yükü' : 'Avg. annual legal lawsuit burden'}</div>
            </div>
            <div className="stat-item">
              <div className="stat-number orange">150+</div>
              <div className="stat-label">{language === 'tr' ? 'Şikayet / Aylık (Ortalama AVM)' : 'Complaints / Month (Avg Mall)'}</div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SECTION 2: TEKNOLOJİ 01 ═════════════════════════════════════ */}
      <section className="feature">
        <div className="content left">
          <div className="section-tag">{t.tech1.tag}</div>
          <h2>{t.tech1.title.split(' ').slice(0, 1).join(' ')}<br />{t.tech1.title.split(' ').slice(1).join(' ')}</h2>
          <p>{t.tech1.desc}</p>
          <div className="tech-pills">
            <span className="pill">{language === 'tr' ? 'Liability Kontrol' : 'Liability Control'}</span>
            <span className="pill">{language === 'tr' ? 'Mıknatıs Kilidi' : 'Magnet Lock'}</span>
            <span className="pill">IP67</span>
          </div>
        </div>
      </section>

      {/* ══ SECTION 3: TEKNOLOJİ 02 ═════════════════════════════════════ */}
      <section className="feature dark-section">
        <div className="content right">
          <div className="section-tag">{t.tech2.tag}</div>
          <h2>120,000 RPM<br />{language === 'tr' ? 'ROI TÜRBİNİ' : 'ROI TURBINE'}</h2>
          <p>{t.tech2.desc}</p>
          <div className="ui-metric">
            <div className="metric-title">{language === 'tr' ? 'OPERASYONEL VERİMLİLİK' : 'OPERATIONAL EFFICIENCY'}</div>
            <div className="metric-row">
              <span className="metric-key">{language === 'tr' ? 'Hız' : 'Speed'}</span>
              <div className="metric-bar-container">
                <div className="metric-bar scan-animate-speed"></div>
              </div>
              <span className="metric-val cyan">120K RPM</span>
            </div>
            <div className="metric-row">
              <span className="metric-key">{language === 'tr' ? 'Tasarruf' : 'Savings'}</span>
              <div className="metric-bar-container">
                <div className="metric-bar scan-animate-speed" style={{animationDuration: '2.2s'}}></div>
              </div>
              <span className="metric-val cyan">%35</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SECTION 4: BİOGÜVENLİK ══════════════════════════════════════ */}
      <section className="feature">
        <div className="content left">
          <div className="section-tag">{t.tech3.tag}</div>
          <h2>{language === 'tr' ? 'BİOGÜVENLİK' : 'BIO-SECURITY'}<br />{language === 'tr' ? 'STANDARTI' : 'STANDARD'}</h2>
          <p>{t.tech3.desc}</p>
          <div className="ring-container">
            <div className="uv-ring"></div>
            <div className="uv-text-container">
              <div className="metric-title uv-label">{language === 'tr' ? 'PATOJEN İMHASI' : 'PATHOGEN DESTRUCTION'}</div>
              <div className="uv-text">%99.9</div>
              <div className="uv-sub">UV-C 254nm</div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SECTION 5: TASARIM ═══════════════════════════════════════════ */}
      <section className="feature dark-section">
        <div className="content right">
          <div className="section-tag">{t.design.tag}</div>
          <h2>{t.design.title.split(' ').slice(0, 2).join(' ')}<br />{t.design.title.split(' ').slice(2).join(' ')}</h2>
          <p>{t.design.desc}</p>
          <div className="ui-metric" style={{marginTop: '1.5rem'}}>
            <div className="metric-title">{language === 'tr' ? 'VİZYONER MATERYAL' : 'VISIONARY MATERIAL'}</div>
            <div className="metric-bar-container">
              <div className="metric-bar scan-animate-steel"></div>
            </div>
            <div className="metric-value">100% {language === 'tr' ? 'BOROSİLİKAT + ÇELİK' : 'BOROSILICATE + STEEL'}</div>
          </div>
        </div>
      </section>

      {/* ══ SECTION 6: SU HAZNESİ ════════════════════════════════════════ */}
      <section className="feature">
        <div className="content left">
          <div className="section-tag">{t.capacity.tag}</div>
          <h2>MAG-SAFE<br />{language === 'tr' ? 'ULTRA KAPASİTE' : 'ULTRA CAPACITY'}</h2>
          <p>{t.capacity.desc}</p>
          <div className="ui-metric water-card">
            <div className="metric-title cyan-label">{language === 'tr' ? 'HAZNE ANALİTİĞİ' : 'TANK ANALYTICS'}</div>
            <div className="water-stats">
              <div className="water-stat">
                <div className="water-val">2.5L</div>
                <div className="water-key">{language === 'tr' ? 'Hacim' : 'Volume'}</div>
              </div>
              <div className="water-stat">
                <div className="water-val">2000+</div>
                <div className="water-key">{language === 'tr' ? 'Ziyaretçi' : 'Visitors'}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SECTION 7: ROI DASHBOARD (RESTORED) ══════════════════════════ */}
      <section className="feature dark-section dashboard">
        <div className="content center wide">
          <div className="section-tag center-tag">{t.roi.tag}</div>
          <h2 className="center-h2">{t.roi.title}</h2>
          <p className="center-p">{t.roi.desc}</p>
          
          <div className="roi-grid">
            <div className="roi-card">
              <div className="roi-icon">⚠</div>
              <div className="roi-title">{language === 'tr' ? 'KAZA & KAYMA RİSKİ' : 'SLIP & FALL RISK'}</div>
              <div className="roi-bar-container">
                <div className="roi-bar slip-risk"></div>
              </div>
              <div className="roi-value green">%0</div>
              <div className="roi-sub">{language === 'tr' ? 'Liability Eliminasyonu' : 'Liability Elimination'}</div>
            </div>

            <div className="roi-card featured-card">
              <div className="roi-icon gold">★</div>
              <div className="roi-title">{language === 'tr' ? 'KURUMSAL PRESTİJ' : 'CORPORATE PRESTIGE'}</div>
              <div className="roi-bar-container">
                <div className="roi-bar profit"></div>
              </div>
              <div className="roi-value gold">MAKSİMUM</div>
              <div className="roi-sub">{language === 'tr' ? 'A+ Müşteri Memnuniyeti' : 'A+ Customer Satisfaction'}</div>
            </div>

            <div className="roi-card">
              <div className="roi-icon cyan">⬡</div>
              <div className="roi-title">{language === 'tr' ? 'KARBON AYAK İZİ' : 'CARBON FOOTPRINT'}</div>
              <div className="ring-container mini">
                <div className="eco-ring"></div>
                <div className="uv-text eco-zero">0G</div>
              </div>
              <div className="roi-sub">{language === 'tr' ? 'Sıfır Plastik Atık' : 'Zero Plastic Waste'}</div>
            </div>
          </div>

          <div className="roi-bottom-stats">
            <div className="bottom-stat">
              <span className="bstat-num">₺ 280K+</span>
              <span className="bstat-label">{language === 'tr' ? '5 Yıllık Tasarruf Tahmini' : '5 Year Savings Projection'}</span>
            </div>
            <div className="bottom-stat">
              <span className="bstat-num">ROI %340</span>
              <span className="bstat-label">{language === 'tr' ? 'Amortisman Süresi (14 Ay)' : 'Payback Period (14 Mos)'}</span>
            </div>
            <div className="bottom-stat">
              <span className="bstat-num">A+</span>
              <span className="bstat-label">{language === 'tr' ? 'ISO 14001 Çevre Standartı' : 'ISO 14001 Environmental Std'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SECTION 8: CTA ═══════════════════════════════════════════════ */}
      <section className="cta">
        <div className="content center cta-content">
          <div className="section-tag center-tag">{t.cta.tag}</div>
          <h2 className="cta-h2">{t.cta.title.split(' ').slice(0, 2).join(' ')}<br />{t.cta.title.split(' ').slice(2).join(' ')}</h2>
          <p className="cta-p">{t.cta.desc}</p>
          <div className="cta-buttons">
            <button className="order-button primary">{t.cta.button}</button>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Overlay
