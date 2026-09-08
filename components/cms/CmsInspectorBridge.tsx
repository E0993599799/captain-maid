'use client'

import { useEffect } from 'react'

const CMS_PARENT_ORIGIN = 'https://cms.arigeo.com'
const HIGHLIGHT_ID = 'captain-maid-cms-inspector-highlight'
const LABEL_ID = 'captain-maid-cms-inspector-label'
const SAFE_STYLE_KEYS = new Set([
  'width', 'maxWidth', 'minHeight', 'margin', 'padding', 'gap', 'alignItems', 'justifyContent',
  'textAlign', 'fontSize', 'lineHeight', 'letterSpacing', 'fontWeight', 'color', 'backgroundColor',
  'borderWidth', 'borderStyle', 'borderColor', 'borderRadius', 'opacity', 'objectPositionX',
  'objectPositionY', 'imageZoom',
])
const UNITLESS_STYLE_KEYS = new Set(['opacity', 'lineHeight', 'fontWeight'])
const COMPUTED_KEYS = [
  'display', 'position', 'width', 'height', 'minWidth', 'maxWidth', 'minHeight', 'maxHeight',
  'marginTop', 'marginRight', 'marginBottom', 'marginLeft', 'paddingTop', 'paddingRight',
  'paddingBottom', 'paddingLeft', 'gap', 'fontFamily', 'fontSize', 'fontWeight', 'lineHeight',
  'letterSpacing', 'color', 'backgroundColor', 'backgroundImage', 'border', 'borderRadius',
  'boxShadow', 'opacity', 'transform', 'overflow', 'objectFit', 'justifyContent', 'alignItems',
  'gridTemplateColumns', 'flexDirection', 'textAlign', 'whiteSpace',
] as const

type InspectorContext = { token: string; pageId: string; locale: 'th' | 'en' }
type CmsElement = HTMLElement & { dataset: DOMStringMap & {
  cmsSection?: string; cmsComponent?: string; cmsInstance?: string; cmsField?: string
  cmsSourceKind?: string; cmsCollection?: string; cmsDocumentId?: string; cmsRelationTo?: string
  cmsIndex?: string; cmsLocale?: string
} }
type StylePatch = Record<string, unknown>
type RawSourceRef =
  | { kind: 'builder-component'; pageId: string; componentType: string; instanceId: string; field: string }
  | { kind: 'collection-field'; collection: string; documentId: string; field: string; locale?: 'th' | 'en' }
  | { kind: 'relationship-field'; collection: string; documentId: string; field: string; relationTo: string; index?: number; locale?: 'th' | 'en' }

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
}

function cssPath(element: Element) {
  const parts: string[] = []
  let current: Element | null = element
  while (current && current !== document.documentElement) {
    const tag = current.tagName.toLowerCase()
    let selector = tag
    if (current.id) {
      selector += `#${CSS.escape(current.id)}`
      parts.unshift(selector)
      break
    }
    const classes = Array.from(current.classList).slice(0, 3).map((v) => `.${CSS.escape(v)}`).join('')
    if (classes) selector += classes
    const parent = current.parentElement
    if (parent) {
      const siblings = Array.from(parent.children).filter((node) => node.tagName === current?.tagName)
      if (siblings.length > 1) selector += `:nth-of-type(${siblings.indexOf(current) + 1})`
    }
    parts.unshift(selector)
    current = parent
  }
  return parts.join(' > ')
}

function rectSnapshot(element: HTMLElement) {
  const r = element.getBoundingClientRect()
  return { x: r.x, y: r.y, width: r.width, height: r.height, top: r.top, right: r.right, bottom: r.bottom, left: r.left }
}

function computedSnapshot(element: HTMLElement) {
  const style = getComputedStyle(element)
  return Object.fromEntries(COMPUTED_KEYS.map((key) => [key, style[key] ?? '']))
}

function mappedElement(target: HTMLElement) {
  return target.matches('[data-cms-instance]') ? target as CmsElement : null
}

function identityFor(element: CmsElement | null, context: InspectorContext) {
  if (!element?.dataset.cmsInstance) return null
  return {
    site: 'captain-maid' as const,
    pageId: context.pageId,
    locale: context.locale,
    sectionId: element.dataset.cmsSection || 'captain-maid-page',
    componentType: element.dataset.cmsComponent || 'CaptainMaidElement',
    instanceId: element.dataset.cmsInstance,
    ...(element.dataset.cmsField ? { field: element.dataset.cmsField } : {}),
  }
}

function sourceFor(target: HTMLElement, context: InspectorContext): RawSourceRef | null {
  const element = target as CmsElement
  const kind = element.dataset.cmsSourceKind
  const field = element.dataset.cmsField
  if (!kind || !field) return null
  if (kind === 'builder-component') {
    const componentType = element.dataset.cmsComponent
    const instanceId = element.dataset.cmsInstance
    if (!componentType || !instanceId) return null
    return { kind, pageId: context.pageId, componentType, instanceId, field }
  }
  const collection = element.dataset.cmsCollection
  const documentId = element.dataset.cmsDocumentId
  if (!collection || !documentId) return null
  const locale = element.dataset.cmsLocale === 'en' || element.dataset.cmsLocale === 'th' ? element.dataset.cmsLocale : context.locale
  if (kind === 'collection-field') return { kind, collection, documentId, field, locale }
  if (kind === 'relationship-field') {
    const relationTo = element.dataset.cmsRelationTo
    if (!relationTo) return null
    const rawIndex = element.dataset.cmsIndex
    const index = rawIndex !== undefined && /^\d+$/.test(rawIndex) ? Number(rawIndex) : undefined
    return { kind, collection, documentId, field, relationTo, ...(index !== undefined ? { index } : {}), locale }
  }
  return null
}

function collectElementContext(target: HTMLElement, context: InspectorContext) {
  const attributes: Record<string, string> = {}
  for (const attr of Array.from(target.attributes).slice(0, 30)) attributes[attr.name] = attr.value
  const identity = identityFor(mappedElement(target), context)
  const source = sourceFor(target, context)
  return {
    selector: cssPath(target),
    tagName: target.tagName.toLowerCase(),
    text: (target.innerText || target.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 1400),
    attributes,
    computed: computedSnapshot(target),
    rect: rectSnapshot(target),
    nearbyText: (target.parentElement?.innerText ?? '').replace(/\s+/g, ' ').trim().slice(0, 700),
    imageSource: target instanceof HTMLImageElement ? target.currentSrc || target.src || null : null,
    linkTarget: target instanceof HTMLAnchorElement ? target.href || null : null,
    identity,
    source,
    wired: Boolean(identity || source),
  }
}

function ensureOverlay() {
  let highlight = document.getElementById(HIGHLIGHT_ID) as HTMLDivElement | null
  let label = document.getElementById(LABEL_ID) as HTMLDivElement | null
  if (!highlight) {
    highlight = document.createElement('div')
    highlight.id = HIGHLIGHT_ID
    Object.assign(highlight.style, { position: 'fixed', pointerEvents: 'none', zIndex: '2147483000', border: '2px solid #2563eb', background: 'rgba(37,99,235,.08)', boxSizing: 'border-box', display: 'none' })
    document.documentElement.append(highlight)
  }
  if (!label) {
    label = document.createElement('div')
    label.id = LABEL_ID
    Object.assign(label.style, { position: 'fixed', pointerEvents: 'none', zIndex: '2147483001', padding: '5px 8px', borderRadius: '6px', background: '#111827', color: '#fff', font: '12px/1.35 ui-monospace,monospace', display: 'none', maxWidth: 'min(520px,calc(100vw - 16px))', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' })
    document.documentElement.append(label)
  }
  return { highlight, label }
}

function showHighlight(element: HTMLElement) {
  const { highlight, label } = ensureOverlay()
  const rect = element.getBoundingClientRect()
  Object.assign(highlight.style, { display: 'block', left: `${rect.left}px`, top: `${rect.top}px`, width: `${rect.width}px`, height: `${rect.height}px` })
  label.textContent = `${element.tagName.toLowerCase()} · ${element.matches('[data-cms-instance], [data-cms-source-kind]') ? 'CMS' : 'Editable'} · ${cssPath(element)}`
  Object.assign(label.style, { display: 'block', left: `${Math.max(8, Math.min(window.innerWidth - 340, rect.left))}px`, top: `${Math.max(8, rect.top - 30)}px` })
}

function scalarStyleValue(key: string, value: string | number) {
  if (key === 'width' && value === 'full') return '100%'
  if (key === 'width' && value === 'auto') return 'auto'
  if (key === 'justifyContent' && value === 'between') return 'space-between'
  if ((key === 'justifyContent' || key === 'alignItems') && value === 'start') return 'flex-start'
  if ((key === 'justifyContent' || key === 'alignItems') && value === 'end') return 'flex-end'
  if (typeof value === 'number' && !UNITLESS_STYLE_KEYS.has(key)) return `${value}px`
  return String(value)
}

function applyAllowedStylePatch(target: HTMLElement, patch: StylePatch) {
  for (const [key, value] of Object.entries(patch)) {
    if (!SAFE_STYLE_KEYS.has(key)) continue
    if ((key === 'margin' || key === 'padding') && isRecord(value)) {
      for (const side of ['top', 'right', 'bottom', 'left'] as const) {
        const sideValue = value[side]
        if (typeof sideValue !== 'number' || !Number.isFinite(sideValue)) continue
        const property = `${key}${side[0].toUpperCase()}${side.slice(1)}`
        ;(target.style as unknown as Record<string, string>)[property] = `${sideValue}px`
      }
      continue
    }
    if ((key === 'objectPositionX' || key === 'objectPositionY') && target instanceof HTMLImageElement && typeof value === 'number') {
      const [x = '50%', y = '50%'] = (target.style.objectPosition || '50% 50%').split(/\s+/)
      target.style.objectPosition = key === 'objectPositionX' ? `${value}% ${y}` : `${x} ${value}%`
      continue
    }
    if (key === 'imageZoom' && target instanceof HTMLImageElement && typeof value === 'number') {
      target.style.transform = `scale(${Math.max(0.1, value)})`
      continue
    }
    if (typeof value === 'string' || typeof value === 'number') (target.style as unknown as Record<string, string>)[key] = scalarStyleValue(key, value)
  }
}

function findExactElement(selector: string) {
  if (!selector || selector.length > 2048 || selector.includes('\0')) return null
  try { return document.querySelector<HTMLElement>(selector) } catch { return null }
}

function safeUrl(value: string) {
  if (!value || value.includes('\0')) return null
  if (value.startsWith('/') || value.startsWith('#') || value.startsWith('?')) return value
  try {
    const url = new URL(value, window.location.origin)
    return url.protocol === 'http:' || url.protocol === 'https:' ? value : null
  } catch { return null }
}

function applyElementAttribute(target: HTMLElement, attribute: unknown, value: unknown) {
  if (typeof attribute !== 'string' || typeof value !== 'string' || value.length > 4096 || value.includes('\0')) return
  if (attribute === 'alt' && target instanceof HTMLImageElement) target.alt = value
  if (attribute === 'href' && target instanceof HTMLAnchorElement) {
    const next = safeUrl(value)
    if (next !== null) target.setAttribute('href', next)
  }
  if (attribute === 'src' && target instanceof HTMLImageElement) {
    const next = safeUrl(value)
    if (next !== null) target.setAttribute('src', next)
  }
}

export default function CmsInspectorBridge() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('cmsInspector') !== '1') return
    let context: InspectorContext | null = null

    const post = (payload: Record<string, unknown>) => {
      if (!context || window.parent === window) return
      window.parent.postMessage({ ...payload, token: context.token }, CMS_PARENT_ORIGIN)
    }

    const onMessage = (event: MessageEvent) => {
      if (event.origin !== CMS_PARENT_ORIGIN || event.source !== window.parent) return
      const message = event.data as Record<string, unknown> | null
      if (!message || typeof message !== 'object') return
      if (message.type === 'cms-inspector:init') {
        if (message.site !== 'captain-maid' || typeof message.token !== 'string' || typeof message.pageId !== 'string') return
        context = { token: message.token, pageId: message.pageId, locale: message.locale === 'en' ? 'en' : 'th' }
        post({ type: 'cms-inspector:ready' })
        return
      }
      if (!context || message.token !== context.token) return
      if (message.type === 'cms-inspector:preview-element-style') {
        if (typeof message.selector !== 'string' || !isRecord(message.patch)) return
        const target = findExactElement(message.selector); if (!target) return
        applyAllowedStylePatch(target, message.patch); showHighlight(target); return
      }
      if (message.type === 'cms-inspector:preview-element-content') {
        if (typeof message.selector !== 'string' || typeof message.value !== 'string' || message.value.length > 20_000) return
        const target = findExactElement(message.selector); if (!target) return
        target.textContent = message.value; showHighlight(target); return
      }
      if (message.type === 'cms-inspector:preview-element-attribute') {
        if (typeof message.selector !== 'string') return
        const target = findExactElement(message.selector); if (!target) return
        applyElementAttribute(target, message.attribute, message.value); showHighlight(target); return
      }
      const identity = message.identity as Record<string, unknown> | undefined
      if (!identity || identity.site !== 'captain-maid' || identity.pageId !== context.pageId || typeof identity.instanceId !== 'string') return
      const field = typeof identity.field === 'string' ? identity.field : ''
      const selector = `[data-cms-instance="${CSS.escape(identity.instanceId)}"]${field ? `[data-cms-field="${CSS.escape(field)}"]` : ''}`
      const target = document.querySelector<HTMLElement>(selector); if (!target) return
      if (message.type === 'cms-inspector:preview-content' && typeof message.value === 'string') target.textContent = message.value
      if (message.type === 'cms-inspector:preview-style' && isRecord(message.patch)) applyAllowedStylePatch(target, message.patch)
    }

    const onMove = (event: MouseEvent) => {
      if (!context) return
      const target = event.target instanceof HTMLElement ? event.target : null
      if (target && target.id !== HIGHLIGHT_ID && target.id !== LABEL_ID) showHighlight(target)
    }
    const onClick = (event: MouseEvent) => {
      if (!context) return
      const target = event.target instanceof HTMLElement ? event.target : null
      if (!target || target.id === HIGHLIGHT_ID || target.id === LABEL_ID) return
      event.preventDefault(); event.stopImmediatePropagation()
      const elementContext = collectElementContext(target, context)
      post({ type: 'cms-inspector:element-context', context: elementContext })
      post({ type: 'cms-inspector:selected', identity: elementContext.identity, rect: elementContext.rect, computed: elementContext.computed })
      showHighlight(target)
    }

    window.addEventListener('message', onMessage)
    document.addEventListener('mousemove', onMove, true)
    document.addEventListener('click', onClick, true)
    return () => {
      window.removeEventListener('message', onMessage)
      document.removeEventListener('mousemove', onMove, true)
      document.removeEventListener('click', onClick, true)
      document.getElementById(HIGHLIGHT_ID)?.remove()
      document.getElementById(LABEL_ID)?.remove()
    }
  }, [])
  return null
}
