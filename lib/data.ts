import data from './data.json';

// Simplified type definitions for basic hackathon info
export interface Hackathon {
  id: number;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  square_image: string;
  slug: string;
}

// Static data
const { hackathons } = data;

// Data access functions
export async function getHackathons(): Promise<Hackathon[]> {
  return hackathons;
}

export async function getHackathon(slug: string): Promise<Hackathon | null> {
  return hackathons.find(h => h.slug === slug) || null;
}
