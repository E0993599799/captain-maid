'use client'

import { useEffect } from 'react'

const CMS_PARENT_ORIGIN = 'https://cms.arigeo.com'
const INSPECTOR_PROTOCOL_VERSION = 2
const SITE = 'captain-maid' as const
const HIGHLIGHT_ID = 'captain-maid-cms-inspector-highlight'
const LABEL_ID = 'captain-maid-cms-inspector-label'
const STATE_PSEUDO: Record<string, string> = {
  hover: ':hover',
  focus: ':focus',
  focusVisible: ':focus-visible',
  active: ':active',
}
const SAFE_STYLE_KEYS = new Set([
  'display','position','top','right','bottom','left','zIndex','width','minWidth','maxWidth','height','minHeight','maxHeight','aspectRatio',
  'margin','padding','gap','rowGap','columnGap','flexDirection','flexWrap','alignItems','alignContent','justifyContent','alignSelf','order','flexGrow','flexShrink','flexBasis',
  'gridTemplateColumns','gridTemplateRows','gridAutoFlow','gridColumn','gridRow','justifyItems','alignItemsGrid','justifySelf',
  'textAlign','fontFamily','fontSize','lineHeight','letterSpacing','fontWeight','fontStyle','textTransform','textDecoration','whiteSpace','wordBreak','textOverflow','lineClamp','color','textShadow',
  'backgroundColor','backgroundImage','backgroundSize','backgroundPosition','backgroundRepeat','borderWidth','borderStyle','borderColor','borderRadius','outlineWidth','outlineStyle','outlineColor','outlineOffset',
  'opacity','boxShadow','filter','backdropFilter','mixBlendMode','transform','transformOrigin','visibility','overflow','overflowX','overflowY','pointerEvents','objectFit','objectPositionX','objectPositionY','imageZoom',
  'transitionProperty','transitionDuration','transitionDelay','transitionTimingFunction',
])
const UNITLESS = new Set(['opacity','lineHeight','fontWeight','zIndex','order','flexGrow','flexShrink'])
const COMPUTED_KEYS = [
  'display','position','width','height','minWidth','maxWidth','minHeight','maxHeight',
  'marginTop','marginRight','marginBottom','marginLeft','paddingTop','paddingRight','paddingBottom','paddingLeft',
  'gap','fontFamily','fontSize','fontWeight','lineHeight','letterSpacing','color','backgroundColor','backgroundImage',
  'border','borderRadius','boxShadow','opacity','transform','overflow','objectFit','justifyContent','alignItems',
  'gridTemplateColumns','flexDirection','textAlign','whiteSpace',
] as const
const FORBIDDEN_STYLE_VALUE = /(?:javascript\s*:|vbscript\s*:|expression\s*\(|@import|[{};]|<\/?script)/i

type InspectorContext = { token: string; pageId: string; locale: 'th' | 'en' }
type RawSourceRef =
  | { kind: 'builder-component'; pageId: string; componentType: string; instanceId: string; field: string }
  | { kind: 'collection-field'; collection: string; documentId: string; field: string; locale?: 'th' | 'en' }
  | { kind: 'relationship-field'; collection: string; documentId: string; field: string; relationTo: string; index?: number; locale?: 'th' | 'en' }

type CmsElement = HTMLElement & {
  dataset: DOMStringMap & {
    cmsSection?: string
    cmsComponent?: string
    cmsInstance?: string
    cmsField?: string
    cmsSourceKind?: string
    cmsCollection?: string
    cmsDocumentId?: string
    cmsRelationTo?: string
    cmsIndex?: string
    cmsLocale?: string
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
}

function isSafeStylePatch(input: unknown): input is Record<string, unknown> {
  if (!isRecord(input)) return false
  return Object.entries(input).every(([key, value]) => {
    if (!SAFE_STYLE_KEYS.has(key) || /css|code|html|script|styleText/i.test(key)) return false
    if (key === 'margin' || key === 'padding') {
      if (!isRecord(value)) return false
      return Object.entries(value).every(([side, amount]) =>
        ['top','right','bottom','left'].includes(side)
        && typeof amount === 'number'
        && Number.isFinite(amount)
        && Math.abs(amount) <= 10_000)
    }
    if (value == null) return true
    if (typeof value === 'number') return Number.isFinite(value) && Math.abs(value) <= 100_000
    return typeof value === 'string' && value.length <= 2048 && !value.includes('\0') && !FORBIDDEN_STYLE_VALUE.test(value)
  })
}

function cssPath(element: Element) {
  const parts: string[] = []
  let current: Element | null = element
  while (current && current !== document.documentElement) {
    let part = current.tagName.toLowerCase()
    if (current.id) {
      part += `#${CSS.escape(current.id)}`
      parts.unshift(part)
      break
    }
    const classes = Array.from(current.classList).slice(0, 3).map((value) => `.${CSS.escape(value)}`).join('')
    if (classes) part += classes
    const parentElement: Element | null = current.parentElement
    if (parentElement) {
      const siblings: Element[] = Array.from(parentElement.children) as Element[]
      const sameTag = siblings.filter((node: Element) => node.tagName === current!.tagName)
      if (sameTag.length > 1) part += `:nth-of-type(${sameTag.indexOf(current) + 1})`
    }
    parts.unshift(part)
    current = parentElement
  }
  return parts.join(' > ')
}

function rectSnapshot(element: HTMLElement) {
  const rect = element.getBoundingClientRect()
  return { x: rect.x, y: rect.y, width: rect.width, height: rect.height, top: rect.top, right: rect.right, bottom: rect.bottom, left: rect.left }
}

function computedSnapshot(element: HTMLElement) {
  const style = getComputedStyle(element)
  return Object.fromEntries(COMPUTED_KEYS.map((key) => [key, style[key] ?? '']))
}

function identityFor(target: HTMLElement, context: InspectorContext) {
  const element = target.matches('[data-cms-instance]') ? target as CmsElement : null
  if (!element?.dataset.cmsInstance) return null
  return {
    site: SITE,
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
    if (!element.dataset.cmsComponent || !element.dataset.cmsInstance) return null
    return { kind, pageId: context.pageId, componentType: element.dataset.cmsComponent, instanceId: element.dataset.cmsInstance, field }
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
  const attributes = Object.fromEntries(Array.from(target.attributes).slice(0, 30).map((attr) => [attr.name, attr.value]))
  const identity = identityFor(target, context)
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
    Object.assign(label.style, { position: 'fixed', pointerEvents: 'none', zIndex: '2147483001', padding: '5px 8px', borderRadius: '6px', background: '#111827', color: '#fff', font: '12px/1.35 ui-monospace,monospace', display: 'none' })
    document.documentElement.append(label)
  }
  return { highlight, label }
}

function showHighlight(element: HTMLElement) {
  const { highlight, label } = ensureOverlay()
  const rect = element.getBoundingClientRect()
  Object.assign(highlight.style, { display: 'block', left: `${rect.left}px`, top: `${rect.top}px`, width: `${rect.width}px`, height: `${rect.height}px` })
  label.textContent = `${element.tagName.toLowerCase()} · ${element.matches('[data-cms-instance],[data-cms-source-kind]') ? 'CMS' : 'Editable'} · ${cssPath(element)}`
  Object.assign(label.style, { display: 'block', left: `${Math.max(8, rect.left)}px`, top: `${Math.max(8, rect.top - 30)}px` })
}

function exactElement(selector: unknown) {
  if (typeof selector !== 'string' || selector.length < 1 || selector.length > 2048 || selector.includes('\0')) return null
  try { return document.querySelector<HTMLElement>(selector) } catch { return null }
}

function scalarValue(key: string, value: string | number) {
  if ((key === 'width' || key === 'height') && value === 'full') return '100%'
  if (key === 'justifyContent' && value === 'between') return 'space-between'
  if (key === 'justifyContent' && value === 'around') return 'space-around'
  if (key === 'justifyContent' && value === 'evenly') return 'space-evenly'
  if (['justifyContent','alignItems','alignContent','alignSelf'].includes(key) && value === 'start') return 'flex-start'
  if (['justifyContent','alignItems','alignContent','alignSelf'].includes(key) && value === 'end') return 'flex-end'
  if (typeof value === 'number') {
    if (key.startsWith('transition')) return `${value}ms`
    if (UNITLESS.has(key)) return String(value)
    return `${value}px`
  }
  return String(value)
}

function cssProperty(key: string) {
  return key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)
}

function declarations(patch: Record<string, unknown>) {
  const out: string[] = []
  for (const [key, value] of Object.entries(patch)) {
    if ((key === 'margin' || key === 'padding') && isRecord(value)) {
      for (const side of ['top','right','bottom','left']) {
        const amount = value[side]
        if (typeof amount === 'number') out.push(`${key}-${side}:${amount}px`)
      }
      continue
    }
    if (key === 'lineClamp' && typeof value === 'number') {
      out.push(`-webkit-line-clamp:${value}`, '-webkit-box-orient:vertical', 'display:-webkit-box', 'overflow:hidden')
      continue
    }
    if (key === 'objectPositionX' || key === 'objectPositionY' || key === 'imageZoom' || value == null) continue
    if (typeof value === 'string' || typeof value === 'number') out.push(`${cssProperty(key)}:${scalarValue(key, value)}`)
  }
  return out.join(';')
}

function applyBaseStyle(target: HTMLElement, patch: Record<string, unknown>) {
  for (const declaration of declarations(patch).split(';').filter(Boolean)) {
    const separator = declaration.indexOf(':')
    if (separator > 0) target.style.setProperty(declaration.slice(0, separator), declaration.slice(separator + 1))
  }
  if ((typeof patch.objectPositionX === 'number' || typeof patch.objectPositionY === 'number') && target instanceof HTMLImageElement) {
    const [x = '50%', y = '50%'] = (target.style.objectPosition || '50% 50%').split(/\s+/)
    target.style.objectPosition = `${typeof patch.objectPositionX === 'number' ? `${patch.objectPositionX}%` : x} ${typeof patch.objectPositionY === 'number' ? `${patch.objectPositionY}%` : y}`
  }
  if (typeof patch.imageZoom === 'number' && target instanceof HTMLImageElement) target.style.transform = `scale(${patch.imageZoom})`
}

let stateSequence = 0
function applyStyle(target: HTMLElement, state: unknown, patch: unknown) {
  if (!isSafeStylePatch(patch)) return
  if (!state || state === 'base') { applyBaseStyle(target, patch); return }
  if (!['hover','focus','focusVisible','active','disabled'].includes(String(state))) return
  let key = target.dataset.cmsPreviewStateKey
  if (!key) { key = `captain-${++stateSequence}`; target.dataset.cmsPreviewStateKey = key }
  const styleId = `cms-inspector-state-${key}-${String(state)}`
  let styleTag = document.getElementById(styleId) as HTMLStyleElement | null
  if (!styleTag) { styleTag = document.createElement('style'); styleTag.id = styleId; document.head.append(styleTag) }
  const base = `[data-cms-preview-state-key="${key}"]`
  const selector = state === 'disabled' ? `${base}:disabled,${base}[aria-disabled="true"]` : `${base}${STATE_PSEUDO[String(state)]}`
  styleTag.textContent = `${selector}{${declarations(patch)}}`
}

function safeUrl(value: string) {
  if (!value || value.length > 4096 || value.includes('\0')) return null
  if (/^(?:\/|#|\?|mailto:|tel:)/i.test(value)) return value
  try { const url = new URL(value, window.location.origin); return url.protocol === 'http:' || url.protocol === 'https:' ? value : null } catch { return null }
}

function applyAttribute(target: HTMLElement, attribute: unknown, value: unknown) {
  if (typeof attribute !== 'string' || typeof value !== 'string' || value.length > 4096 || value.includes('\0') || /^on|^style$|^srcdoc$/i.test(attribute)) return
  if (attribute === 'href') { if (target instanceof HTMLAnchorElement) { const next = safeUrl(value); if (next !== null) target.setAttribute('href', next) } return }
  if (attribute === 'src') { if (target instanceof HTMLImageElement) { const next = safeUrl(value); if (next !== null) target.setAttribute('src', next) } return }
  if (attribute === 'alt') { if (target instanceof HTMLImageElement) target.alt = value; return }
  if (['id','title','role','tabindex','lang','target','rel'].includes(attribute) || attribute.startsWith('aria-') || attribute.startsWith('data-arigeo-')) target.setAttribute(attribute, value)
}

export default function CmsInspectorBridge() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    if (params.get('cmsInspector') !== '1' || window.parent === window) return
    let context: InspectorContext | null = null

    const post = (payload: Record<string, unknown>) => {
      if (context) window.parent.postMessage({ ...payload, token: context.token }, CMS_PARENT_ORIGIN)
    }

    const onMessage = (event: MessageEvent) => {
      if (event.origin !== CMS_PARENT_ORIGIN || event.source !== window.parent) return
      const message = event.data as Record<string, unknown> | null
      if (!message) return
      if (message.type === 'cms-inspector:init') {
        if (message.site !== SITE || typeof message.token !== 'string' || typeof message.pageId !== 'string') return
        context = { token: message.token, pageId: message.pageId, locale: message.locale === 'en' ? 'en' : 'th' }
        post({ type: 'cms-inspector:ready', protocolVersion: INSPECTOR_PROTOCOL_VERSION })
        return
      }
      if (!context || message.token !== context.token) return

      if (message.type === 'cms-inspector:preview-element-style') { const target = exactElement(message.selector); if (target) { applyStyle(target, message.state, message.patch); showHighlight(target) } return }
      if (message.type === 'cms-inspector:preview-element-content') { const target = exactElement(message.selector); if (target && typeof message.value === 'string' && message.value.length <= 20_000) { target.textContent = message.value; showHighlight(target) } return }
      if (message.type === 'cms-inspector:preview-element-attribute') { const target = exactElement(message.selector); if (target) { applyAttribute(target, message.attribute, message.value); showHighlight(target) } return }

      const identity = message.identity as Record<string, unknown> | undefined
      if (!identity || identity.site !== SITE || identity.pageId !== context.pageId || typeof identity.instanceId !== 'string') return
      const field = typeof identity.field === 'string' ? identity.field : ''
      const target = document.querySelector<HTMLElement>(`[data-cms-instance="${CSS.escape(identity.instanceId)}"]${field ? `[data-cms-field="${CSS.escape(field)}"]` : ''}`)
      if (!target) return
      if (message.type === 'cms-inspector:preview-content' && typeof message.value === 'string') target.textContent = message.value
      if (message.type === 'cms-inspector:preview-style') applyStyle(target, message.state, message.patch)
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
      event.preventDefault()
      event.stopImmediatePropagation()
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
      document.querySelectorAll('[id^="cms-inspector-state-"]').forEach((node) => node.remove())
    }
  }, [])
  return null
}
