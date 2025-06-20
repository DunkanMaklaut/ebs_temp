'use client';
import styles from './settingsModal.module.css';

export default function SettingsModal({
  isOpen,
  onClose,
  theme,
  presetThemes,
  onThemeChange,
  onZoomIn,
  onZoomOut,
  scale
}) {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modal} style={{ 
        backgroundColor: theme.paper,
        color: theme.text
      }} onClick={e => e.stopPropagation()}>
        <div className={styles.modalHeader}>
          <h3>Настройки отображения</h3>
          <button 
            onClick={onClose} 
            className={styles.closeButton}
            style={{ color: theme.text }}
          >
            ×
          </button>
        </div>
        
        <div className={styles.themeOptions}>
          <h4>Предустановки:</h4>
          <div className={styles.presetThemes}>
            {presetThemes.map((preset, index) => (
              <button
                key={index}
                onClick={() => onThemeChange(preset)}
                className={styles.presetTheme}
                style={{
                  backgroundColor: preset.background,
                  color: preset.text,
                  border: `2px solid ${preset.text}`
                }}
                title={preset.name}
              >
                {preset.name}
              </button>
            ))}
          </div>
        </div>
        
        <div className={styles.colorPickers}>
          <div className={styles.colorPicker}>
            <label>Фон страницы:</label>
            <input 
              type="color" 
              value={theme.background} 
              onChange={(e) => onThemeChange('background', e.target.value)} 
            />
          </div>
          <div className={styles.colorPicker}>
            <label>Цвет текста:</label>
            <input 
              type="color" 
              value={theme.text} 
              onChange={(e) => onThemeChange('text', e.target.value)} 
            />
          </div>
          <div className={styles.colorPicker}>
            <label>Цвет элементов:</label>
            <input 
              type="color" 
              value={theme.paper} 
              onChange={(e) => onThemeChange('paper', e.target.value)} 
            />
          </div>
        </div>
        
        <div className={styles.zoomControls}>
          <h4>Масштаб:</h4>
          <div className={styles.zoomButtons}>
            <button 
              onClick={onZoomOut} 
              className={styles.zoomButton}
              style={{ backgroundColor: theme.paper, color: theme.text }}
            >
              -
            </button>
            <span>{Math.round(scale * 100)}%</span>
            <button 
              onClick={onZoomIn} 
              className={styles.zoomButton}
              style={{ backgroundColor: theme.paper, color: theme.text }}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}