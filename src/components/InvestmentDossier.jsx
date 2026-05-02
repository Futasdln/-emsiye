import React from 'react';

const InvestmentDossier = ({ language, onClose }) => {
  const isTr = language === 'tr';

  return (
    <div className="dossier-overlay" onClick={onClose}>
      <div className="dossier-modal" onClick={(e) => e.stopPropagation()}>
        <button className="dossier-close" onClick={onClose}>&times;</button>
        
        <div className="dossier-header reveal-container">
          <div className="dossier-badge reveal-text">STRATEGIC DOSSIER · CONFIDENTIAL</div>
          <h1 className="reveal-text" style={{ animationDelay: '0.1s' }}>KAFM ORIGIN</h1>
          <p className="reveal-text" style={{ animationDelay: '0.2s' }}>
            {isTr ? 'Operasyonel Zırh ve Finansal Analiz' : 'Operational Armor & Financial Analysis'}
          </p>
        </div>

        <div className="dossier-grid">
          <div className="dossier-card reveal-container">
            <div className="reveal-text" style={{ animationDelay: '0.3s' }}>
              <h3>{isTr ? 'TEKNİK ÜSTÜNLÜK' : 'TECHNICAL SPECS'}</h3>
              <ul>
                <li><strong>Core:</strong> 120,000 RPM Jet-Flow</li>
                <li><strong>Optics:</strong> Borosilicate Crystal</li>
                <li><strong>Defense:</strong> UV-C Germicidal Shield</li>
              </ul>
            </div>
          </div>

          <div className="dossier-card featured reveal-container">
            <div className="reveal-text" style={{ animationDelay: '0.4s' }}>
              <h3>{isTr ? 'YATIRIM ANALİZİ' : 'INVESTMENT ANALYSIS'}</h3>
              <div className="dossier-stat">
                <span className="d-label">ROI</span>
                <span className="d-value">340%</span>
              </div>
              <div className="dossier-stat">
                <span className="d-label">{isTr ? 'Amortisman' : 'Payback'}</span>
                <span className="d-value">14 {isTr ? 'Ay' : 'Mos'}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="dossier-footer reveal-container">
          <button className="order-button primary reveal-text" style={{ animationDelay: '0.5s' }} onClick={() => window.print()}>
            {isTr ? 'PDF OLARAK KAYDET' : 'SAVE AS PDF'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvestmentDossier;
