import React, { useEffect, useState } from 'react';
import { translations } from '../translations';

const InvestmentDossier = ({ language, onClose }) => {
  const t = translations[language] || translations.tr;
  const dossier = t.investmentDossier;
  const common = t.common;
  const formLang = t.form;

  const [isUnlocked, setIsUnlocked] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', company: '' });

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.company) {
      setIsUnlocked(true);
    }
  };

  return (
    <div className="dossier-overlay" onClick={onClose}>
      <div className="dossier-modal" onClick={(e) => e.stopPropagation()}>
        <button className="dossier-close" onClick={onClose} aria-label={common.close}>&times;</button>
        
        {!isUnlocked ? (
          <div className="dossier-form-container reveal-container">
            <div className="dossier-badge reveal-text">{dossier.badge}</div>
            <h2 className="reveal-text">{formLang.title}</h2>
            <form onSubmit={handleSubmit} className="dossier-form">
              <div className="form-group reveal-text" style={{ animationDelay: '0.1s' }}>
                <label>{formLang.name}</label>
                <input 
                  type="text" 
                  required 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="John Doe"
                />
              </div>
              <div className="form-group reveal-text" style={{ animationDelay: '0.2s' }}>
                <label>{formLang.email}</label>
                <input 
                  type="email" 
                  required 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="john@company.com"
                />
              </div>
              <div className="form-group reveal-text" style={{ animationDelay: '0.3s' }}>
                <label>{formLang.company}</label>
                <input 
                  type="text" 
                  required 
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  placeholder="Luxury Hotel Group"
                />
              </div>
              <button type="submit" className="order-button primary reveal-text" style={{ animationDelay: '0.4s' }}>
                {formLang.submit}
              </button>
            </form>
          </div>
        ) : (
          <>
            <div className="dossier-header reveal-container">
              <div className="dossier-badge reveal-text">{dossier.badge}</div>
              <h1 className="reveal-text" style={{ animationDelay: '0.1s' }}>{dossier.title}</h1>
              <p className="reveal-text" style={{ animationDelay: '0.2s' }}>{dossier.subtitle}</p>
            </div>

            <div className="dossier-grid">
              <div className="dossier-card reveal-container">
                <div className="reveal-text" style={{ animationDelay: '0.3s' }}>
                  <h3>{dossier.technicalTitle}</h3>
                  <ul>
                    <li><strong>{dossier.coreLabel}:</strong> {dossier.coreValue}</li>
                    <li><strong>{dossier.opticsLabel}:</strong> {dossier.opticsValue}</li>
                    <li><strong>{dossier.defenseLabel}:</strong> {dossier.defenseValue}</li>
                  </ul>
                </div>
              </div>

              <div className="dossier-card featured reveal-container">
                <div className="reveal-text" style={{ animationDelay: '0.4s' }}>
                  <h3>{dossier.analysisTitle}</h3>
                  <div className="dossier-stat">
                    <span className="d-label">{dossier.roiLabel}</span>
                    <span className="d-value">{dossier.roiValue}</span>
                  </div>
                  <div className="dossier-stat">
                    <span className="d-label">{dossier.paybackLabel}</span>
                    <span className="d-value">{dossier.paybackValue}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="dossier-footer reveal-container">
              <button className="order-button primary reveal-text" style={{ animationDelay: '0.5s' }} onClick={() => window.print()}>
                {dossier.savePdf}
              </button>
              <p className="dossier-assumption-note">{dossier.assumptionNote}</p>
              <p className="dossier-confidential">{dossier.confidentiality}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default InvestmentDossier;
