const Overlay = () => {
  return (
    <div className="overlay">

      {/* ══ SECTION 0: HERO ══════════════════════════════════════════════ */}
      <section className="hero">
        <div className="content left">
          <div className="hero-badge">YENİ NESİL · 2025</div>
          <h1>KAFM<br />ORIGIN</h1>
          <p className="hero-sub">Drystation Pro</p>
          <p className="hero-desc">
            Sadece cerrahi çelik, elmas netliğinde kristal cam<br />
            ve saf jet gücü. Islak şemsiyenizi bir saniyede<br />
            steril ve kuru teslim alır.
          </p>
          <div className="scroll-indicator">KAYDIRARAK KEŞFEDİN ↓</div>
        </div>
      </section>

      {/* ══ SECTION 1: PROBLEM ═══════════════════════════════════════════ */}
      <section className="feature dark-section">
        <div className="content right">
          <div className="section-tag">SORUN</div>
          <h2>ISLAK ŞEMSİYE<br />GÖRÜLMEYENİN MALİYETİ</h2>
          <p>
            Her yağmurlu günde ofisinizin girişi bir kayma tuzağına
            dönüşür. Zemin kirlenir, mikroplar yayılır, kurumsal imaj
            zedelenir. Bu sorun çözülmemiş değil — sadece ciddiye
            alınmamış.
          </p>
          <div className="stat-row">
            <div className="stat-item">
              <div className="stat-number red">₺ 42K</div>
              <div className="stat-label">Yıllık ortalama iş kazası maliyeti</div>
            </div>
            <div className="stat-item">
              <div className="stat-number orange">%78</div>
              <div className="stat-label">Islak zeminli kaza oranı girişlerde</div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SECTION 2: TEKNOLOJİ – CERRAHİ GİRİŞ ═══════════════════════ */}
      <section className="feature">
        <div className="content left">
          <div className="section-tag">TEKNOLOJİ 01</div>
          <h2>CERRAHİ<br />GİRİŞ MEKANİZMASI</h2>
          <p>
            Manyetik hizalama sistemi şemsiyenizi milimetrik hassasiyetle
            merkeze kilitler. Eğik giriş hunisi, her boyuttaki şemsiyeyi
            otomatik olarak türbin eksenine hizalar. Tek hareket — süreç başlar.
          </p>
          <div className="tech-pills">
            <span className="pill">Otomatik Hizalama</span>
            <span className="pill">360° Giriş Açısı</span>
            <span className="pill">IP67 Seviye</span>
          </div>
        </div>
      </section>

      {/* ══ SECTION 3: TEKNOLOJİ – TÜRBİN ═══════════════════════════════ */}
      <section className="feature dark-section">
        <div className="content right">
          <div className="section-tag">TEKNOLOJİ 02</div>
          <h2>120,000 RPM<br />JET-FLOW TÜRBİN</h2>
          <p>
            12 bıçaklı aerospace sınıfı türbin, şemsiyenizdeki suyu
            santrifüj kuvvetiyle 0.8 saniyede uzaklaştırır. Isı yok.
            Sürtünme yok. Saf mekanik mükemmellik.
          </p>
          <div className="ui-metric">
            <div className="metric-title">TÜRBİN PERFORMANS MATRİSİ</div>
            <div className="metric-row">
              <span className="metric-key">Hız</span>
              <div className="metric-bar-container">
                <div className="metric-bar scan-animate-speed"></div>
              </div>
              <span className="metric-val cyan">120K RPM</span>
            </div>
            <div className="metric-row">
              <span className="metric-key">Süre</span>
              <div className="metric-bar-container" style={{flex: 1}}>
                <div className="metric-bar scan-animate-speed" style={{animationDuration: '2s'}}></div>
              </div>
              <span className="metric-val cyan">0.8 sn</span>
            </div>
            <div className="metric-row">
              <span className="metric-key">Gürültü</span>
              <div className="metric-bar-container" style={{flex: 1, width: '30%'}}>
                <div className="metric-bar scan-animate-steel" style={{width: '22%'}}></div>
              </div>
              <span className="metric-val">38 dB</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SECTION 4: UV STERİLİZASYON ══════════════════════════════════ */}
      <section className="feature">
        <div className="content left">
          <div className="section-tag">TEKNOLOJİ 03</div>
          <h2>UV-C<br />STERİLİZASYON KALKANI</h2>
          <p>
            4 noktalı yüksek yoğunluklu UV-C halka paneli, kurutma
            sürecinde şemsiye yüzeyindeki tüm patojenleri, bakterileri
            ve virüsleri mikroskobik düzeyde imha eder. Görünmez tehdit,
            görünür çözüm.
          </p>
          <div className="ring-container">
            <div className="uv-ring"></div>
            <div className="uv-text-container">
              <div className="metric-title uv-label">PATOJEN İMHASI</div>
              <div className="uv-text">%99.9</div>
              <div className="uv-sub">WHO onaylı UV-C spektrumu</div>
            </div>
          </div>
          <div className="tech-pills">
            <span className="pill purple">UV-C 254nm</span>
            <span className="pill purple">E.coli ✓</span>
            <span className="pill purple">Influenza ✓</span>
          </div>
        </div>
      </section>

      {/* ══ SECTION 5: ELMAS CAM ═════════════════════════════════════════ */}
      <section className="feature dark-section">
        <div className="content right">
          <div className="section-tag">TASARIM</div>
          <h2>ELMAS BERRAKLIĞINDA<br />ULTRA-CLEAR CAM</h2>
          <p>
            %99.4 saydamlık oranıyla üretilen borosilikat cam, kurutma
            sürecini gerçek zamanlı izlemenizi sağlar. Teknoloji artık
            gizli değil — sergileniyor.
          </p>
          <div className="glass-stat">
            <div className="glass-bar-wrap">
              <div className="glass-fill"></div>
              <span className="glass-label">Saydamlık</span>
            </div>
            <div className="glass-value">99.4%</div>
          </div>
          <div className="ui-metric" style={{marginTop: '1.5rem'}}>
            <div className="metric-title">MATERYAL SAFLIĞI</div>
            <div className="metric-bar-container">
              <div className="metric-bar scan-animate-steel"></div>
            </div>
            <div className="metric-value">100% CERRAHİ ÇELİK + TİTANYUM</div>
          </div>
        </div>
      </section>

      {/* ══ SECTION 6: SU HAZNESİ ════════════════════════════════════════ */}
      <section className="feature">
        <div className="content left">
          <div className="section-tag">KAPASITE</div>
          <h2>MAG-SAFE<br />ULTRA HAZNE</h2>
          <p>
            2.5 litrelik akıllı su haznesi, manyetik kilit sistemiyle
            tek elle çıkarılır. Doluluk sensörü uyarı verir. Temizlik
            saniyeler içinde tamamlanır. 150 şemsiye — tek dolum.
          </p>
          <div className="ui-metric water-card">
            <div className="metric-title cyan-label">HAZNE DESTEK KAPASİTESİ</div>
            <div className="water-visual">
              <div className="water-fill-bar">
                <div className="water-fill-inner"></div>
              </div>
              <div className="water-stats">
                <div className="water-stat">
                  <div className="water-val">2.5L</div>
                  <div className="water-key">Hacim</div>
                </div>
                <div className="water-stat">
                  <div className="water-val">150+</div>
                  <div className="water-key">Kurutma</div>
                </div>
                <div className="water-stat">
                  <div className="water-val">1 sn</div>
                  <div className="water-key">Çıkarma</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SECTION 7: KURUMSAL ROI ═══════════════════════════════════════ */}
      <section className="feature dark-section dashboard">
        <div className="content center wide">
          <div className="section-tag center-tag">YATIRIM GETİRİSİ</div>
          <h2 className="center-h2">KURUMSAL ETKİ MATRİSİ</h2>
          <p className="center-p">
            Tek bir cihaz, beş ayrı kurumsal sorunun çözümü.
          </p>
          <div className="roi-grid">
            <div className="roi-card">
              <div className="roi-icon">⚠</div>
              <div className="roi-title">KAZA & KAYMA RİSKİ</div>
              <div className="roi-bar-container">
                <div className="roi-bar slip-risk"></div>
              </div>
              <div className="roi-value green">%0</div>
              <div className="roi-sub">İş kazası eliminasyonu</div>
            </div>
            <div className="roi-card featured-card">
              <div className="roi-icon gold">★</div>
              <div className="roi-title">KURUMSAL PRESTIJ</div>
              <div className="roi-bar-container">
                <div className="roi-bar profit"></div>
              </div>
              <div className="roi-value gold">MAKSİMUM</div>
              <div className="roi-sub">İlk izlenim güçlendirme</div>
            </div>
            <div className="roi-card">
              <div className="roi-icon cyan">⬡</div>
              <div className="roi-title">KARBON AYAK İZİ</div>
              <div className="ring-container mini">
                <div className="eco-ring"></div>
                <div className="uv-text eco-zero">0G</div>
              </div>
              <div className="roi-sub">Sıfır plastik tüketim</div>
            </div>
          </div>
          <div className="roi-bottom-stats">
            <div className="bottom-stat">
              <span className="bstat-num">₺ 280K+</span>
              <span className="bstat-label">5 yıllık tasarruf tahmini (50 kişilik ofis)</span>
            </div>
            <div className="bottom-stat">
              <span className="bstat-num">ROI %340</span>
              <span className="bstat-label">18 aylık geri dönüş süresi</span>
            </div>
            <div className="bottom-stat">
              <span className="bstat-num">A+</span>
              <span className="bstat-label">ISO 14001 çevre uyumluluğu</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══ SECTION 8: CTA ═══════════════════════════════════════════════ */}
      <section className="cta">
        <div className="content center cta-content">
          <div className="section-tag center-tag">PRESTİJ</div>
          <h2 className="cta-h2">PRESTİJ SATIN<br />ALMANIN ZAMANI</h2>
          <p className="cta-p">
            KAFM Origin Drystation ile kurumunuzun gücünü<br />
            ilk adımda gösterin. Liderlerin tercihi.
          </p>
          <div className="cta-buttons">
            <button className="order-button primary">HEMEN SİPARİŞ VERİN</button>
            <button className="order-button secondary">DEMO TALEP EDİN</button>
          </div>
          <div className="cta-meta">
            <span>✓ 2 Yıl Garanti</span>
            <span>✓ Kurumsal Faturalama</span>
            <span>✓ Aynı Gün Kurulum</span>
          </div>
        </div>
      </section>

    </div>
  )
}

export default Overlay
