import React from 'react'

import { LOGO_URL } from './config'

type Props = { size?: number; withWordmark?: boolean; tone?: 'light' | 'dark'; onClick?: () => void }

/** The ORETO emblem, cropped from the uploaded logo artwork into a round badge. */
export function Logo({ size = 48, withWordmark = true, tone = 'light', onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex items-center gap-3 text-left"
      aria-label="ORETO Spices home"
    >
      <span
        className="relative block shrink-0 overflow-hidden rounded-full bg-[#f8f6f1] ring-1 ring-gold/60"
        style={{ width: size, height: size }}
      >
        <img
          src={LOGO_URL}
          alt="ORETO Spices logo"
          width={896}
          height={1200}
          decoding="async"
          className="absolute max-w-none"
          style={{ width: '145%', left: '-22.5%', top: '-35.4%' }}
        />
      </span>
      {withWordmark && (
        <span className="flex flex-col leading-none">
          <span
            className={`font-display text-2xl font-bold tracking-wide ${tone === 'light' ? 'text-cream' : 'text-chili'}`}
          >
            ORETO
          </span>
          <span className={`mt-1 text-[10px] font-medium tracking-[0.28em] ${tone === 'light' ? 'text-gold-soft' : 'text-cocoa'}`}>
            SPICES
          </span>
        </span>
      )}
    </button>
  )
}
