const GlassInfoPanel = ({
  children,
  className = '',
  variant = 'default',
  as: Component = 'div'
}) => {
  const panelClass = `glass-info-panel glass-info-panel--${variant} ${className}`.trim()

  return <Component className={panelClass}>{children}</Component>
}

export default GlassInfoPanel
