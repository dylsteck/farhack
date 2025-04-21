import { clsx, type ClassValue } from "clsx"
import { Inter, Karla, Lora } from "next/font/google";
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

const isDev = process.env.NODE_ENV === 'development';
const port = process.env.PORT || 3000;
const localUrl = `http://localhost:${port}`;

export const BASE_URL = isDev ? localUrl : 'https://farhack.xyz';

export const BANNER_IMG = 'https://i.imgur.com/4sLMVg2.png';
export const ICON_IMG = `${BASE_URL}/icons/icon-512x512.png`;