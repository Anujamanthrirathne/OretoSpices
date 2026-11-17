import React from 'react'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'

import { FacebookIcon, InstagramIcon, WhatsAppIcon } from './BrandIcons'
import { STORE, whatsappLink } from './config'
import { NavigateFn } from './format'
import { Logo } from './Logo'
import { NAV_LINKS } from './Navbar'

export function Footer({ onNavigate }: { onNavigate: NavigateFn }) {
  const year = new Date().getFullYear()
  return (
    <footer className="bg-espresso text-cream/75">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr]">
        <div className="max-w-sm">
          <Logo size={56} onClick={() => onNavigate('home')} />
          <p className="mt-6 text-sm leading-relaxed">
            Authentic Sri Lankan spices and traditional blends, ground fresh and packed with care — from local farms to
            your kitchen.
          </p>
          <div className="mt-6 flex gap-2">
            <SocialLink href={STORE.facebookUrl} label="Facebook">
              <FacebookIcon />
            </SocialLink>
            <SocialLink href={STORE.instagramUrl} label="Instagram">
              <InstagramIcon />
            </SocialLink>
            <SocialLink href={whatsappLink()} label="WhatsApp">
              <WhatsAppIcon />
            </SocialLink>
          </div>
        </div>

        <div>
          <h3 className="font-display text-xl font-semibold text-cream">Explore</h3>
          <ul className="mt-5 space-y-3 text-sm">
            {[...NAV_LINKS, { page: 'cart' as const, label: 'Shopping Cart' }].map((l) => (
              <li key={l.page}>
                <button
                  type="button"
                  onClick={() => onNavigate(l.page)}
                  className="transition-colors duration-150 hover:text-gold-soft"
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-xl font-semibold text-cream">Get in touch</h3>
          <ul className="mt-5 space-y-3.5 text-sm">
            <ContactRow icon={<Phone className="h-4 w-4" />}>
              <a href={`tel:+${STORE.whatsappNumber}`} className="hover:text-gold-soft">
                {STORE.phoneDisplay}
              </a>
            </ContactRow>
            <ContactRow icon={<Mail className="h-4 w-4" />}>
              <a href={`mailto:${STORE.email}`} className="hover:text-gold-soft">
                {STORE.email}
              </a>
            </ContactRow>
            <ContactRow icon={<MapPin className="h-4 w-4" />}>{STORE.address}</ContactRow>
            <ContactRow icon={<Clock className="h-4 w-4" />}>{STORE.hours}</ContactRow>
          </ul>
        </div>
      </div>
      <div className="border-t border-cream/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-cream/50 sm:flex-row sm:justify-between sm:px-8">
          <p>© {year} ORETO Spices. All rights reserved.</p>
          <p>Proudly made in Sri Lanka</p>
        </div>
      </div>
    </footer>
  )
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="grid h-10 w-10 place-items-center rounded-full border border-cream/15 text-cream/80 transition-colors duration-150 hover:border-gold hover:text-gold-soft"
    >
      {children}
    </a>
  )
}

function ContactRow({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 text-gold">{icon}</span>
      <span>{children}</span>
    </li>
  )
}
