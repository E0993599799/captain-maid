'use client'

import { useEffect } from 'react'

const CMS_PARENT_ORIGIN = 'https://cms.arigeo.com'
const INSPECTOR_PROTOCOL_VERSION = 2
const SITE = 'captain-maid' as const
const HIGHLIGHT_ID = 'captain-maid-cms-inspector-highlight'
const LABEL_ID = 'captain-maid-cms-inspector-label'
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
const COMPUTED_KEYS = ['display','position','width','height','minWidth','maxWidth','minHeight','maxHeight','marginTop','marginRight','marginBottom','marginLeft','paddingTop','paddingRight','paddingBottom','paddingLeft','gap','fontFamily','fontSize','fontWeight','lineHeight','letterSpacing','color','backgroundColor','backgroundImage','border','borderRadius','boxShadow','opacity','transform','overflow','objectFit','justifyContent','alignItems','gridTemplateColumns','flexDirection','textAlign','whiteSpace'] as const
const FORBIDDEN_CSS = /(?:javascript\s*:|vbscript\s*:|expression\s*\(|@import|[{};]|<\/?script)/i
const STATE_PSEUDO: Record<string, string> = { hover: ':hover', focus: ':focus', focusVisible: ':focus-visible', active: ':active' }

type InspectorContext = { token: string; pageId: string; locale: 'th' | 'en' }
type CmsElement = HTMLElement & { dataset: DOMStringMap & { cmsSection?: string; cmsComponent?: string; cmsInstance?: string; cmsField?: string; cmsSourceKind?: string; cmsCollection?: string; cmsDocumentId?: string; cmsRelationTo?: string; cmsIndex?: string; cmsLocale?: string } }
type RawSourceRef =
  | { kind: 'builder-component'; pageId: string; componentType: string; instanceId: string; field: string }
  | { kind: 'collection-field'; collection: string; documentId: string; field: string; locale?: 'th' | 'en' }
  | { kind: 'relationship-field'; collection: string; documentId: string; field: string; relationTo: string; index?: number; locale?: 'th' | 'en' }

function isRecord(value: unknown): value is Record<string, unknown> { return Boolean(value) && typeof value === 'object' && !Array.isArray(value) }
function safeString(value: string) { return value.length <= 2048 && !value.includes('\0') && !FORBIDDEN_CSS.test(value) }
function safeStylePatch(input: unknown): input is Record<string, unknown> {
  return isRecord(input) && Object.entries(input).every(([key, value]) => {
    if (!SAFE_STYLE_KEYS.has(key) || /css|code|html|script|styleText/i.test(key)) return false
    if (key === 'margin' || key === 'padding') return isRecord(value) && Object.entries(value).every(([side, amount]) => ['top','right','bottom','left'].includes(side) && typeof amount === 'number' && Number.isFinite(amount) && Math.abs(amount) <= 10000)
    if (value == null) return true
    if (typeof value === 'number') return Number.isFinite(value) && Math.abs(value) <= 100000
    return typeof value === 'string' && safeString(value)
  })
}
function cssPath(element: Element) {
  const parts: string[] = []
  let current: Element | null = element
  while (current && current !== document.documentElement) {
    let part = current.tagName.toLowerCase()
    if (current.id) { part += `#${CSS.escape(current.id)}`; parts.unshift(part); break }
    const classes = Array.from(current.classList).slice(0, 3).map((value) => `.${CSS.escape(value)}`).join('')
    if (classes) part += classes
    const parent = current.parentElement
    if (parent) {
      const same = Array.from(parent.children).filter((node) => node.tagName === current!.tagName)
      if (same.length > 1) part += `:nth-of-type(${same.indexOf(current) + 1})`
    }
    parts.unshift(part); current = parent
  }
  return parts.join(' > ')
}
function rectSnapshot(element: HTMLElement) { const r = element.getBoundingClientRect(); return { x:r.x,y:r.y,width:r.width,height:r.height,top:r.top,right:r.right,bottom:r.bottom,left:r.left } }
function computedSnapshot(element: HTMLElement) { const style = getComputedStyle(element); return Object.fromEntries(COMPUTED_KEYS.map((key) => [key, style[key] ?? ''])) }
function identityFor(target: HTMLElement, context: InspectorContext) {
  const element = target.matches('[data-cms-instance]') ? target as CmsElement : null
  if (!element?.dataset.cmsInstance) return null
  return { site: SITE, pageId: context.pageId, locale: context.locale, sectionId: element.dataset.cmsSection || 'captain-maid-page', componentType: element.dataset.cmsComponent || 'CaptainMaidElement', instanceId: element.dataset.cmsInstance, ...(element.dataset.cmsField ? { field: element.dataset.cmsField } : {}) }
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
    const index = element.dataset.cmsIndex && /^\d+$/.test(element.dataset.cmsIndex) ? Number(element.dataset.cmsIndex) : undefined
    return { kind, collection, documentId, field, relationTo, ...(index !== undefined ? { index } : {}), locale }
  }
  return null
}
function collectElementContext(target: HTMLElement, context: InspectorContext) {
  const attributes = Object.fromEntries(Array.from(target.attributes).slice(0, 30).map((attr) => [attr.name, attr.value]))
  const identity = identityFor(target, context)
  const source = sourceFor(target, context)
  return { selector: cssPath(target), tagName: target.tagName.toLowerCase(), text: (target.innerText || target.textContent || '').replace(/\s+/g,' ').trim().slice(0,1400), attributes, computed: computedSnapshot(target), rect: rectSnapshot(target), nearbyText: (target.parentElement?.innerText ?? '').replace(/\s+/g,' ').trim().slice(0,700), imageSource: target instanceof HTMLImageElement ? target.currentSrc || target.src || null : null, linkTarget: target instanceof HTMLAnchorElement ? target.href || null : null, identity, source, wired: Boolean(identity || source) }
}
function ensureOverlay() {
  let h = document.getElementById(HIGHLIGHT_ID) as HTMLDivElement | null
  let l = document.getElementById(LABEL_ID) as HTMLDivElement | null
  if (!h) { h = document.createElement('div'); h.id = HIGHLIGHT_ID; Object.assign(h.style,{position:'fixed',pointerEvents:'none',zIndex:'2147483000',border:'2px solid #2563eb',background:'rgba(37,99,235,.08)',boxSizing:'border-box',display:'none'}); document.documentElement.append(h) }
  if (!l) { l = document.createElement('div'); l.id = LABEL_ID; Object.assign(l.style,{position:'fixed',pointerEvents:'none',zIndex:'2147483001',padding:'5px 8px',borderRadius:'6px',background:'#111827',color:'#fff',font:'12px/1.35 ui-monospace,monospace',display:'none',maxWidth:'min(520px,calc(100vw - 16px))',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}); document.documentElement.append(l) }
  return { h, l }
}
function showHighlight(element: HTMLElement) { const {h,l}=ensureOverlay(); const r=element.getBoundingClientRect(); Object.assign(h.style,{display:'block',left:`${r.left}px`,top:`${r.top}px`,width:`${r.width}px`,height:`${r.height}px`}); l.textContent=`${element.tagName.toLowerCase()} · ${element.matches('[data-cms-instance],[data-cms-source-kind]')?'CMS':'Editable'} · ${cssPath(element)}`; Object.assign(l.style,{display:'block',left:`${Math.max(8,Math.min(window.innerWidth-340,r.left))}px`,top:`${Math.max(8,r.top-30)}px`}) }
function exactElement(selector: unknown) { if (typeof selector !== 'string' || selector.length < 1 || selector.length > 2048 || selector.includes('\0')) return null; try { return document.querySelector<HTMLElement>(selector) } catch { return null } }
function scalar(key: string, value: string | number) {
  if ((key === 'width' || key === 'height') && value === 'full') return '100%'
  if (key === 'justifyContent' && value === 'between') return 'space-between'
  if (key === 'justifyContent' && value === 'around') return 'space-around'
  if (key === 'justifyContent' && value === 'evenly') return 'space-evenly'
  if ((key === 'justifyContent' || key === 'alignItems' || key === 'alignContent' || key === 'alignSelf') && value === 'start') return 'flex-start'
  if ((key === 'justifyContent' || key === 'alignItems' || key === 'alignContent' || key === 'alignSelf') && value === 'end') return 'flex-end'
  if (typeof value === 'number') return UNITLESS.has(key) ? String(value) : `${value}${key.startsWith('transition') ? 'ms' : 'px'}`
  return String(value)
}
const PROP: Record<string,string> = { maxWidth:'max-width',minWidth:'min-width',minHeight:'min-height',maxHeight:'max-height',aspectRatio:'aspect-ratio',rowGap:'row-gap',columnGap:'column-gap',flexDirection:'flex-direction',flexWrap:'flex-wrap',alignItems:'align-items',alignContent:'align-content',justifyContent:'justify-content',alignSelf:'align-self',flexGrow:'flex-grow',flexShrink:'flex-shrink',flexBasis:'flex-basis',gridTemplateColumns:'grid-template-columns',gridTemplateRows:'grid-template-rows',gridAutoFlow:'grid-auto-flow',gridColumn:'grid-column',gridRow:'grid-row',justifyItems:'justify-items',justifySelf:'justify-self',textAlign:'text-align',fontFamily:'font-family',fontSize:'font-size',lineHeight:'line-height',letterSpacing:'letter-spacing',fontWeight:'font-weight',fontStyle:'font-style',textTransform:'text-transform',textDecoration:'text-decoration',whiteSpace:'white-space',wordBreak:'word-break',textOverflow:'text-overflow',textShadow:'text-shadow',backgroundColor:'background-color',backgroundImage:'background-image',backgroundSize:'background-size',backgroundPosition:'background-position',backgroundRepeat:'background-repeat',borderWidth:'border-width',borderStyle:'border-style',borderColor:'border-color',borderRadius:'border-radius',outlineWidth:'outline-width',outlineStyle:'outline-style',outlineColor:'outline-color',outlineOffset:'outline-offset',boxShadow:'box-shadow',backdropFilter:'backdrop-filter',mixBlendMode:'mix-blend-mode',transformOrigin:'transform-origin',overflowX:'overflow-x',overflowY:'overflow-y',pointerEvents:'pointer-events',objectFit:'object-fit',transitionProperty:'transition-property',transitionDuration:'transition-duration',transitionDelay:'transition-delay',transitionTimingFunction:'transition-timing-function' }
function declarations(patch: Record<string, unknown>) {
  const out: string[]=[]
  for (const [key,value] of Object.entries(patch)) {
    if ((key==='margin'||key==='padding') && isRecord(value)) { for (const side of ['top','right','bottom','left']) if (typeof value[side]==='number') out.push(`${key}-${side}:${value[side]}px`); continue }
    if (key==='lineClamp' && typeof value==='number') { out.push(`-webkit-line-clamp:${value}`,'-webkit-box-orient:vertical','display:-webkit-box','overflow:hidden'); continue }
    if (key==='objectPositionX'||key==='objectPositionY'||key==='imageZoom'||value==null) continue
    if (typeof value==='string'||typeof value==='number') out.push(`${PROP[key]||key}:${scalar(key,value)}`)
  }
  return out.join(';')
}
function applyBase(target: HTMLElement, patch: Record<string, unknown>) {
  for (const decl of declarations(patch).split(';').filter(Boolean)) { const i=decl.indexOf(':'); if (i>0) target.style.setProperty(decl.slice(0,i),decl.slice(i+1)) }
  if ((typeof patch.objectPositionX==='number'||typeof patch.objectPositionY==='number') && target instanceof HTMLImageElement) { const [x='50%',y='50%']=(target.style.objectPosition||'50% 50%').split(/\s+/); target.style.objectPosition=`${typeof patch.objectPositionX==='number'?`${patch.objectPositionX}%`:x} ${typeof patch.objectPositionY==='number'?`${patch.objectPositionY}%`:y}` }
  if (typeof patch.imageZoom==='number' && target instanceof HTMLImageElement) target.style.transform=`scale(${patch.imageZoom})`
}
let stateSeq=0
function applyStyle(target: HTMLElement, state: unknown, patch: unknown) {
  if (!safeStylePatch(patch)) return
  if (!state || state === 'base') { applyBase(target,patch); return }
  if (!['hover','focus','focusVisible','active','disabled'].includes(String(state))) return
  let key=target.dataset.cmsPreviewStateKey
  if (!key) { key=`captain-${++stateSeq}`; target.dataset.cmsPreviewStateKey=key }
  const id=`cms-inspector-state-${key}-${state}`
  let tag=document.getElementById(id) as HTMLStyleElement|null
  if (!tag) { tag=document.createElement('style'); tag.id=id; document.head.append(tag) }
  const root=`[data-cms-preview-state-key="${key}"]`
  const selector=state==='disabled'?`${root}:disabled,${root}[aria-disabled="true"]`:`${root}${STATE_PSEUDO[String(state)]}`
  tag.textContent=`${selector}{${declarations(patch)}}`
}
function safeUrl(value:string) { if (!value || value.length>4096 || value.includes('\0')) return null; if (/^(?:\/|#|\?|mailto:|tel:)/i.test(value)) return value; try { const u=new URL(value,window.location.origin); return u.protocol==='http:'||u.protocol==='https:'?value:null } catch { return null } }
function applyAttribute(target:HTMLElement,attribute:unknown,value:unknown) {
  if (typeof attribute!=='string'||typeof value!=='string'||value.length>4096||value.includes('\0')||/^on|^style$|^srcdoc$/i.test(attribute)) return
  if (attribute==='href') { if (!(target instanceof HTMLAnchorElement)) return; const v=safeUrl(value); if(v!==null) target.setAttribute('href',v); return }
  if (attribute==='src') { if (!(target instanceof HTMLImageElement)) return; const v=safeUrl(value); if(v!==null) target.setAttribute('src',v); return }
  if (attribute==='alt') { if(target instanceof HTMLImageElement) target.alt=value; return }
  if (['id','title','role','tabindex','lang','target','rel'].includes(attribute)||attribute.startsWith('aria-')||attribute.startsWith('data-arigeo-')) target.setAttribute(attribute,value)
}

export default function CmsInspectorBridge() {
  useEffect(() => {
    if (new URLSearchParams(window.location.search).get('cmsInspector') !== '1' || window.parent === window) return
    let context: InspectorContext | null = null
    const post=(payload:Record<string,unknown>)=>{ if(context) window.parent.postMessage({...payload,token:context.token},CMS_PARENT_ORIGIN) }
    const onMessage=(event:MessageEvent)=>{
      if (event.origin !== CMS_PARENT_ORIGIN || event.source !== window.parent) return
      const message=event.data as Record<string,unknown>|null
      if (!message) return
      if (message.type==='cms-inspector:init') {
        if(message.site!==SITE||typeof message.token!=='string'||typeof message.pageId!=='string') return
        context={token:message.token,pageId:message.pageId,locale:message.locale==='en'?'en':'th'}
        post({type:'cms-inspector:ready',protocolVersion:INSPECTOR_PROTOCOL_VERSION}); return
      }
      if(!context||message.token!==context.token) return
      if(message.type==='cms-inspector:preview-element-style') { const target=exactElement(message.selector); if(target){applyStyle(target,message.state,message.patch);showHighlight(target)} return }
      if(message.type==='cms-inspector:preview-element-content') { const target=exactElement(message.selector); if(target&&typeof message.value==='string'&&message.value.length<=20000&&!message.value.includes('\0')){target.textContent=message.value;showHighlight(target)} return }
      if(message.type==='cms-inspector:preview-element-attribute') { const target=exactElement(message.selector); if(target){applyAttribute(target,message.attribute,message.value);showHighlight(target)} return }
      const identity=message.identity as Record<string,unknown>|undefined
      if(!identity||identity.site!==SITE||identity.pageId!==context.pageId||typeof identity.instanceId!=='string') return
      const field=typeof identity.field==='string'?identity.field:''
      const target=document.querySelector<HTMLElement>(`[data-cms-instance="${CSS.escape(identity.instanceId)}"]${field?`[data-cms-field="${CSS.escape(field)}"]`:''}`)
      if(!target) return
      if(message.type==='cms-inspector:preview-content'&&typeof message.value==='string') target.textContent=message.value
      if(message.type==='cms-inspector:preview-style') applyStyle(target,message.state,message.patch)
    }
    const onMove=(event:MouseEvent)=>{ if(!context) return; const target=event.target instanceof HTMLElement?event.target:null; if(target&&target.id!==HIGHLIGHT_ID&&target.id!==LABEL_ID) showHighlight(target) }
    const onClick=(event:MouseEvent)=>{ if(!context) return; const target=event.target instanceof HTMLElement?event.target:null; if(!target||target.id===HIGHLIGHT_ID||target.id===LABEL_ID) return; event.preventDefault();event.stopImmediatePropagation(); const elementContext=collectElementContext(target,context); post({type:'cms-inspector:element-context',context:elementContext}); post({type:'cms-inspector:selected',identity:elementContext.identity,rect:elementContext.rect,computed:elementContext.computed});showHighlight(target) }
    window.addEventListener('message',onMessage);document.addEventListener('mousemove',onMove,true);document.addEventListener('click',onClick,true)
    return()=>{window.removeEventListener('message',onMessage);document.removeEventListener('mousemove',onMove,true);document.removeEventListener('click',onClick,true);document.getElementById(HIGHLIGHT_ID)?.remove();document.getElementById(LABEL_ID)?.remove();document.querySelectorAll('[id^="cms-inspector-state-"]').forEach((node)=>node.remove())}
  },[])
  return null
}
