'use client'

import { useEffect } from 'react'
import { isAllowedCmsInspectorOrigin, isInspectorRequested, safeComputedStyle } from '@/lib/cms-inspector'

export function CmsInspectorBridge() {
  useEffect(() => {
    if (!isInspectorRequested(window.location.search) || window.parent === window) return
    let token = ''
    let parentOrigin = ''

    const onMessage = (event: MessageEvent) => {
      if (!isAllowedCmsInspectorOrigin(event.origin) || !event.data || typeof event.data !== 'object') return
      if (event.data.type === 'cms-inspector:init' && typeof event.data.token === 'string') {
        token = event.data.token
        parentOrigin = event.origin
        window.parent.postMessage({ type: 'cms-inspector:ready', token }, parentOrigin)
        return
      }
      if (!token || event.origin !== parentOrigin || event.data.token !== token) return
      const identity = event.data.identity
      if (!identity || typeof identity.instanceId !== 'string') return
      const target = document.querySelector<HTMLElement>(`[data-cms-instance="${CSS.escape(identity.instanceId)}"]`)
      if (!target) return
      if (event.data.type === 'cms-inspector:preview-content' && identity.field) target.textContent = String(event.data.value ?? '')
      if (event.data.type === 'cms-inspector:preview-style' && event.data.patch && typeof event.data.patch === 'object') {
        const patch = event.data.patch as Record<string, unknown>
        if (typeof patch.fontSize === 'number') target.style.fontSize = `${patch.fontSize}px`
        if (typeof patch.lineHeight === 'number') target.style.lineHeight = String(patch.lineHeight)
        if (typeof patch.letterSpacing === 'number') target.style.letterSpacing = `${patch.letterSpacing}px`
        if (typeof patch.color === 'string') target.style.color = patch.color
        if (typeof patch.backgroundColor === 'string') target.style.backgroundColor = patch.backgroundColor
        if (typeof patch.borderRadius === 'number') target.style.borderRadius = `${patch.borderRadius}px`
        if (typeof patch.opacity === 'number') target.style.opacity = String(patch.opacity)
        if (typeof patch.width === 'number') target.style.width = `${patch.width}px`
        if (typeof patch.maxWidth === 'number') target.style.maxWidth = `${patch.maxWidth}px`
        if (typeof patch.minHeight === 'number') target.style.minHeight = `${patch.minHeight}px`
        if (typeof patch.gap === 'number') target.style.gap = `${patch.gap}px`
      }
    }

    const onClick = (event: MouseEvent) => {
      if (!token || !parentOrigin) return
      const clicked = event.target instanceof HTMLElement ? event.target : null
      if (!clicked) return
      const mapped = clicked.closest<HTMLElement>('[data-cms-instance]')
      event.preventDefault()
      event.stopPropagation()
      const rect = clicked.getBoundingClientRect()
      const identity = mapped ? {
        site: mapped.dataset.cmsSite || 'captain-maid',
        pageId: mapped.dataset.cmsPage || '',
        locale: mapped.dataset.cmsLocale || 'th',
        sectionId: mapped.dataset.cmsSection || '',
        componentType: mapped.dataset.cmsComponent || '',
        instanceId: mapped.dataset.cmsInstance || '',
        ...(mapped.dataset.cmsField ? { field: mapped.dataset.cmsField } : {}),
      } : null
      window.parent.postMessage({
        type: 'cms-inspector:selected', token, identity,
        rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height, top: rect.top, right: rect.right, bottom: rect.bottom, left: rect.left },
        computed: safeComputedStyle(clicked),
      }, parentOrigin)
    }

    window.addEventListener('message', onMessage)
    document.addEventListener('click', onClick, true)
    return () => {
      window.removeEventListener('message', onMessage)
      document.removeEventListener('click', onClick, true)
    }
  }, [])

  return null
}
