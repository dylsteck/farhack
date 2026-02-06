import { clsx, type ClassValue } from "clsx"
import { Funnel_Display, Funnel_Sans, Inter, Karla, Lora } from "next/font/google";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const inter = Inter({
  subsets: ['latin'],
});

export const lora = Lora({
  subsets: ['latin'],
  display: 'swap'
});

export const karla = Karla({
  subsets: ['latin'],
  display: 'swap'
});

export const funnelSans = Funnel_Sans({
  subsets: ['latin'],
  display: 'swap',
});

export const funnelDisplay = Funnel_Display({
  subsets: ['latin'],
  display: 'swap',
});

const isDev = process.env.NODE_ENV === 'development';
const port = process.env.PORT || 3000;
const localUrl = `http://localhost:${port}`;

export const BASE_URL = isDev ? localUrl : 'https://farhack.xyz';

export const BANNER_IMG = 'https://i.imgur.com/jhw0cQL.png';
export const BUILDERS_DAY_FARCON_2025_BANNER_IMG = 'https://i.imgur.com/9b4Fbo2.png';
export const FARCON_ROME_2026_BANNER_IMG = `${BASE_URL}/farhack-online-2026.png`;
export const HACKING_GUIDE_BANNER_IMG = 'https://i.imgur.com/5TBXea9.png';
export const ICON_IMG = `${BASE_URL}/icons/icon-512x512.png`;

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0, // Assuming we don't want cents
  }).format(amount);
}