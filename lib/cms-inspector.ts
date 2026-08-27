export function isAllowedCmsInspectorOrigin(origin: string) {
  if (origin === 'https://cms.arigeo.com') return true
  try {
    const host = new URL(origin).hostname
    return host.startsWith('cms-arigeo-') && host.endsWith('.vercel.app')
  } catch {
    return false
  }
}

export function isInspectorRequested(search: string) {
  return new URLSearchParams(search).get('cmsInspector') === '1'
}

export function safeComputedStyle(element: HTMLElement) {
  const style = getComputedStyle(element)
  return {
    display: style.display,
    width: style.width,
    height: style.height,
    margin: style.margin,
    padding: style.padding,
    gap: style.gap,
    fontSize: style.fontSize,
    lineHeight: style.lineHeight,
    letterSpacing: style.letterSpacing,
    color: style.color,
    backgroundColor: style.backgroundColor,
    borderRadius: style.borderRadius,
    opacity: style.opacity,
    textAlign: style.textAlign,
  }
}
