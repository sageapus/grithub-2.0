import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'

import type { Footer as FooterGlobal, Media } from '@/payload-types'
import FooterEmailForm from '../emails/FooterEmailForm'
import CopyrightDate from './CopyrightDate'
import logo from '@/public/assets/grithub-logo-horz.svg'
import whatsapp from '@/public/assets/whatsapp.svg'
import mailOutline from '@/public/assets/mail_outline.svg'
import facebook from '@/public/assets/facebook.svg'
import linkedin from '@/public/assets/linkedin.svg'
import instagram from '@/public/assets/instagram.svg'
import patreon from '@/public/assets/patreon.svg'

const socialIcons = {
  facebook,
  linkedin,
  instagram,
  patreon,
}

const socialLabels = {
  facebook: 'Facebook',
  linkedin: 'LinkedIn',
  instagram: 'Instagram',
  patreon: 'Patreon',
}

const fallbackFooter = {
  description:
    'Garden Route Innovation & Technology Hub (GRIT Hub) is a registered Non-Profit company (CIPC: 2021/502703/08) catalyzing innovation and technology in the digital economy.',
  address: {
    line1: 'Office Suite #2',
    line2: 'York Street Blvd. Shopping Center.',
    city: 'George South, George 6529',
    country: 'South Africa',
    directionsUrl:
      'https://www.google.com/maps/dir//garden+route+innovation+and+technology+hub/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x1dd61bad26029aad:0xe15b07dedb1520bf?sa=X&ved=2ahUKEwicrqbBw9b-AhWYi1wKHToBDNAQ9Rd6BAhMEAU',
  },
  phone: '+27 (063) 070 5752',
  email: 'workforce@grithub.org.za',
  newsletterHeading: 'Join Us.',
  newsletterDescription:
    'Be the first to know when we publish new articles and specialized updates on programming.',
  bottomLinks: [
    { label: 'About Us', url: '/about' },
    { label: 'Terms', url: '/terms' },
    { label: 'Privacy', url: '/privacy' },
    { label: 'Media Kit', url: '/media-kit' },
  ],
}

function getMedia(value: FooterGlobal['logo']) {
  return typeof value === 'object' && value ? (value as Media) : null
}

function getPhoneHref(phone?: string | null) {
  if (!phone) return null

  return `https://wa.me/${phone.replace(/\D/g, '')}`
}

export async function Footer() {
  const payload = await getPayload({ config })

  const footer = await payload.findGlobal({
    slug: 'footer',
    depth: 1,
  })

  const footerLogo = getMedia(footer.logo)
  const phone = footer.phone || fallbackFooter.phone
  const email = footer.email || fallbackFooter.email
  const phoneHref = getPhoneHref(phone)
  const bottomLinks = footer.bottomLinks?.length ? footer.bottomLinks : fallbackFooter.bottomLinks
  const socialLinks = footer.socialLinks?.filter((link) => link.platform && link.url) || []

  return (
    <footer
      className="col-12 d-flex flex-wrap justify-content-center flex-wrap p-4 pb-0 border-top"
      id="contact"
    >
      <div className="col-md-4 col-12 d-flex p-md-4 pb-4 flex-column">
        <Image
          src={footerLogo?.url || logo}
          width={270}
          height={75}
          alt={footerLogo?.alt || 'GRIT Hub Logo'}
          className="w-md-100"
          style={{color:'transparent'}}
        />

        <small className="mt-2">{footer.description || fallbackFooter.description}</small>

        <address className="mt-3 pt-3 border-top lh-sm">
          <small>
            {footer.address?.line1 || fallbackFooter.address.line1}
            <br />
            {footer.address?.line2 || fallbackFooter.address.line2}
            <br />
            {footer.address?.city || fallbackFooter.address.city}
            <br />
            {footer.address?.country || fallbackFooter.address.country}
            <br />
          </small>

          <a
            rel="noreferrer"
            target="_blank"
            href={footer.address?.directionsUrl || fallbackFooter.address.directionsUrl}
          >
            <small>Get directions &rsaquo;</small>
          </a>
        </address>
      </div>

      <div className="col-md-3 col-12 p-md-4 pb-4 d-flex justify-content-top flex-column">
        <p className="fw-bold fs-4">Find Us.</p>

        {phoneHref && (
          <a className="px-1 d-flex py-1 align-items-center" href={phoneHref}>
            <Image src={whatsapp} width={25} height={25} alt="whatsapp us" />
            <small className="ms-2">{phone}</small>
          </a>
        )}

        {email && (
          <a className="px-1 d-flex py-1 align-items-center" href={`mailto:${email}`}>
            <Image src={mailOutline} width={25} height={25} alt="email us" />
            <small className="ms-2">{email}</small>
          </a>
        )}

        {socialLinks.length > 0 && (
          <div className="d-flex flex-row flex-wrap mt-4">
            {socialLinks.map((link) => {
              if (!link.platform || !link.url) return null

              return (
                <a
                  key={link.id || link.platform}
                  className="px-1 d-flex w-50 py-1 align-items-center"
                  href={link.url}
                >
                  <Image
                    src={socialIcons[link.platform]}
                    width={25}
                    height={25}
                    alt={`GRIT Hub on ${socialLabels[link.platform]}`}
                  />
                  <small className="ms-2">{socialLabels[link.platform]}</small>
                </a>
              )
            })}
          </div>
        )}
      </div>

      <div className="col-md-4 col-12 p-md-4 d-flex justify-content-top flex-column align-item-center">
        <p className="fw-bold fs-4">{footer.newsletterHeading || fallbackFooter.newsletterHeading}</p>

        <small className="mb-3 text-muted">
          {footer.newsletterDescription || fallbackFooter.newsletterDescription}
        </small>
        <FooterEmailForm />
      </div>

      <small className="col-12 px-0 py-5 py-md-4 mb-5 mb-md-0 border-top mt-2 text-center text-muted">
        {footer.copyrightText || (
          <>
            <Suspense>
              <CopyrightDate />
            </Suspense>{' '}
            Garden Route Innovation & Technology Hub, NPC. All rights reserved.
          </>
        )}
        &nbsp;&nbsp;
        {bottomLinks.map((link, index) => (
          <span key={link.url || link.label || index}>
            {index > 0 && <>&nbsp;|&nbsp;</>}
            {link.url && (
              <Link href={link.url} title={link.label || undefined}>
                {link.label}
              </Link>
            )}
          </span>
        ))}
      </small>
    </footer>
  )
}

export default Footer
