import type { CSSProperties } from 'react'
import type { CmsBindings } from '@/lib/cms/bindings'
import { cmsImage } from '@/lib/cms/bindings'

type FallbackImage = {
  src: string
  mobile?: string
  tablet?: string
  desktop?: string
  alt?: string
}

type CmsPictureProps = {
  bindings?: CmsBindings
  cmsKey: string
  fallback: FallbackImage
  pictureClassName?: string
  imgClassName?: string
  style?: CSSProperties
  width?: number
  height?: number
  loading?: 'eager' | 'lazy'
  decoding?: 'sync' | 'async' | 'auto'
  fetchPriority?: 'high' | 'low' | 'auto'
}

export default function CmsPicture({
  bindings = {},
  cmsKey,
  fallback,
  pictureClassName,
  imgClassName,
  style,
  width,
  height,
  loading = 'lazy',
  decoding = 'async',
  fetchPriority = 'auto',
}: CmsPictureProps) {
  const image = cmsImage(bindings, cmsKey, fallback)

  return (
    <picture data-cms-key={cmsKey} className={pictureClassName}>
      <source media="(max-width: 767px)" srcSet={image.mobile} />
      <source media="(max-width: 1023px)" srcSet={image.tablet} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={image.desktop}
        alt={image.alt}
        className={imgClassName}
        style={style}
        width={width}
        height={height}
        loading={loading}
        decoding={decoding}
        fetchPriority={fetchPriority}
      />
    </picture>
  )
}
