const activeFeatures = () => {
  return (window.org && window.org.cans && window.org.cans.active_features) || []
}
export const isFeatureActive = feature => activeFeatures().indexOf(feature) >= 0

export const isCans2 = () => isFeatureActive('cans2')
