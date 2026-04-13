import React from 'react'

const Overlay = () => {
  return (
    <div className="overlay">
      <section className="hero">
        <div className="content">
          <p className="subtitle">Islaklığın Sonu. Prestijin Doğuşu.</p>
          <h1>KAFM ORIGIN<br/>DRYSTATION</h1>
          <p>Sıradanlığı ıslak günlerde bırakın. Sadece cerrahi çelik, elmas netliğinde kristal cam ve saf jet gücü. Detaylar yalan söylemez.</p>
          <div className="scroll-indicator">MÜKEMMELLİĞİ KEŞFEDİN</div>
        </div>
      </section>

      <section className="feature">
        <div className="content right">
          <h2>CERRAHİ ÇELİK STANDARDI</h2>
          <p>Plastik yok. Kusurlara yer yok. Uzay havacılığında kullanılan Surgical-Grade paslanmaz çelikten üretilen gövde, ömür boyu yansıma garantisi sunuyor.</p>
          <div className="ui-metric">
            <div className="metric-title">MATERYAL SAFLIĞI</div>
            <div className="metric-bar-container"><div className="metric-bar scan-animate-steel"></div></div>
            <div className="metric-value">100% SAF TİTANYUM KAPLAMA</div>
          </div>
        </div>
      </section>

      <section className="feature">
        <div className="content left">
          <h2>AERODİNAMİK SİBER-GÜÇ</h2>
          <p>Suyu sadece kurutmuyor, atomlarına ayırıyor. Özel üretim 12 bıçaklı Jet-Flow türbini ile doğanın hız sınırlarını ofisinizde test edin.</p>
          <div className="ui-metric">
            <div className="metric-title">TÜRBİN HIZ MERKEZİ</div>
            <div className="metric-bar-container"><div className="metric-bar scan-animate-speed"></div></div>
            <div className="metric-value">120,000 RPM GÜÇ</div>
          </div>
        </div>
      </section>

      <section className="feature">
        <div className="content right">
          <h2>GÖRÜNMEYEN TEHLİKEYE SON</h2>
          <p>Yağmur suyu sandığınız kadar masum değil. 4 noktalı yüksek yoğunluklu UV-C panelleri, kumaştaki gizli patojenleri mikroskobik düzeyde imha eder.</p>
          <div className="ring-container">
            <div className="uv-ring"></div>
            <div className="uv-text-container">
                <div className="metric-title" style={{color: '#7b00ff'}}>PATOJEN İMHASI</div>
                <div className="uv-text">%99.9</div>
            </div>
          </div>
        </div>
      </section>

      <section className="feature">
        <div className="content left">
          <h2>ELMAS BERRAKLIĞINDA ŞOV</h2>
          <p>Kurutma işlemi artık sıkıcı bir zorunluluk değil, izlemesi zevkli bir teknoloji şovu. Yüksek çözünürlüklü ultra-clear cam sayesinde kusursuz şeffaflık.</p>
        </div>
      </section>

      <section className="feature">
        <div className="content right">
          <h2>BİTMEYEN GÜÇ KAPASİTESİ</h2>
          <p>Damla hesabı yapmayı bırakın. Devridaim için tasarlanan Mag-Safe kilitli ultra depo. Ofisteki herkesin şemsiyesi için fazlasıyla yeterli bir destek harikası.</p>
          <div className="ui-metric water-card">
            <div className="metric-title" style={{color: '#00ffff'}}>HAZNE DESTEK KAPASİTESİ</div>
            <div className="metric-bar-container tall"><div className="metric-bar wave-animate-capacity"></div></div>
            <div className="metric-value" style={{color: '#00ccff'}}>2.5 LİTRE / 150 KURUTMA</div>
          </div>
        </div>
      </section>

      <section className="feature">
        <div className="content center dashboard">
          <h2 style={{textAlign: 'center', marginBottom: '3rem'}}>KURUMSAL KATKI MATRİSİ</h2>
          <div className="roi-grid">
             <div className="roi-card">
                 <div className="roi-title">KAZA VE KAYMA RİSKİ</div>
                 <div className="roi-bar-container"><div className="roi-bar slip-risk"></div></div>
                 <div className="roi-value" style={{color: '#00ff88'}}>%0</div>
             </div>
             <div className="roi-card">
                 <div className="roi-title">TEMİZLİK TASARRUFU</div>
                 <div className="roi-bar-container"><div className="roi-bar profit"></div></div>
                 <div className="roi-value" style={{color: '#e2b34a'}}>MAKSİMUM</div>
             </div>
             <div className="roi-card">
                 <div className="roi-title">KARBON AYAK İZİ (Plastik)</div>
                 <div className="ring-container mini">
                    <div className="eco-ring"></div>
                    <div className="uv-text" style={{fontSize: '1.5rem', color: '#00ffff'}}>0G</div>
                 </div>
             </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="content center" style={{margin: '0 auto', textAlign: 'center'}}>
          <h2 style={{fontSize: '4rem'}}>PRESTİJİ SATIN ALIN</h2>
          <p style={{margin: '0 auto 3rem auto'}}>Origin DryStation ile kurumunuzun gücünü ilk adımda gösterin. Liderlerin tercihi.</p>
          <button className="order-button">HEMEN TESLİM ALIN</button>
        </div>
      </section>
    </div>
  )
}

export default Overlay
