import React, { useState } from 'react'

type Props = { src: string; alt: string; className?: string; eager?: boolean }

/** Lazy-loaded image with a warm skeleton and a short fade once decoded. */
export function ProductImage({ src, alt, className = '', eager = false }: Props) {
  const [loaded, setLoaded] = useState(false)
  return (
    <div className={`relative overflow-hidden bg-sand/60 ${className}`}>
      {!loaded && <div className="absolute inset-0 animate-pulse bg-sand" aria-hidden="true" />}
      <img
        src={src}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        width={317}
        height={470}
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-cover transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  )
}
