const activeFeatures = () => {
  return (window.org && window.org.cans && window.org.cans.active_features) || []
}
export const isFeatureActive = feature => activeFeatures().indexOf(feature) >= 0

export const isCans2 = () => isFeatureActive('cans2')

export const isDesignSystemLayoutEnabled = () => isCans2() && isFeatureActive('enable_design_system_layout')
