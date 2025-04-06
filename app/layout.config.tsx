import FarHackLogo from '@/components/custom/icons/farhack-logo';
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/hacking-guide/layout.tsx
 */
export const baseOptions: BaseLayoutProps = {
  githubUrl: 'https://github.com/farhackxyz/farhack',
  nav: {
    title: (
      <>
        <FarHackLogo width={25} height={25} />
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
