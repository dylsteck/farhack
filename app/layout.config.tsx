import FarHackLogo from '@/components/custom/icons/farhack-logo';
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
  nav: {
    title: (
      <>
        <FarHackLogo width={30} height={30} />
        FarHack
      </>
    ),
    transparentMode: 'top'
  },
  links: [
    {
      text: 'Hackathons',
      url: '/hackathons',
      active: 'none'
    },
    {
      text: 'Hacking Guide',
      url: '/hacking-guide',
      active: 'none'
    }
  ],
};
