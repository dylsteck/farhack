/* eslint-disable @next/next/no-img-element */
import { clsx } from 'clsx';

type HackathonPartnerLogoProps = {
  /** Asset for light site theme (typically dark ink on the page background). */
  srcLight: string;
  /** Asset for dark site theme (typically white/light logo). */
  srcDark: string;
  alt: string;
  className?: string;
};

/**
 * Renders the correct sponsor SVG for the active color scheme. Pair a
 * dark-ink variant (for light backgrounds) with the existing white-filled SVGs
 * used on dark backgrounds — avoids invisible logos when `dark` is toggled off.
 */
export function HackathonPartnerLogo({ srcLight, srcDark, alt, className }: HackathonPartnerLogoProps) {
  return (
    <span className="inline-flex items-center justify-center">
      <img src={srcLight} alt={alt} className={clsx('dark:hidden', className)} />
      <img src={srcDark} alt="" aria-hidden className={clsx('hidden dark:block', className)} />
    </span>
  );
}
