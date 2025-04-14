import { Team, Hackathon, FullHackathon, Invite } from "./types";
import { BASE_URL } from "./utils";

interface InviteResponse {
  token: string;
}

type TeamAPIResponse = {
  success: boolean;
  team: Team;
}

class FarHackSDK {
  private baseUrl: string;
  private static instance: FarHackSDK;

  constructor() {
    this.baseUrl = BASE_URL;
  }

  static getInstance(): FarHackSDK {
    if (!FarHackSDK.instance) {
      FarHackSDK.instance = new FarHackSDK();
    }
    return FarHackSDK.instance;
  }

  private async fetcher<T>(url: string, options?: RequestInit): Promise<T> {
    const headers: Record<string, string> = {
      'Accept': '*/*',
      'Content-Type': 'application/json'
    };

    const response = await fetch(`${this.baseUrl}${url}`, { headers, ...options });

    if (!response.ok) {
      console.error(await response.text());
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json() as Promise<T>;
  }

  async getHackathon(slug: string): Promise<FullHackathon> {
    return this.fetcher<FullHackathon>(`/api/hackathons/${slug}`);
  }

  async getHackathons(): Promise<Hackathon[]> {
    return this.fetcher<Hackathon[]>('/api/hackathons');
  }

  async getTeam(type: 'teamId' | 'userId' = 'teamId', identifier: string): Promise<Team | null> {
    return this.fetcher<Team | null>(`/api/hackathons/teams?type=${type}&identifier=${identifier}`);
  }

  async getTeams(): Promise<Team[]> {
    return this.fetcher<Team[]>('/api/hackathons/teams');
  }

  async createTeam(name: string, description: string, hackathonId: number, userId: number): Promise<Team> {
    const response = await fetch('/api/hackathons/teams', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, description, hackathonId, userId }),
    });

    if (!response.ok) {
      throw new Error('Failed to create team');
    }

    const data = await response.json() as TeamAPIResponse;
    return data.team;
  }

  async updateTeam(id: number, updates: Partial<Team>): Promise<void> {
    const response = await fetch('/api/hackathons/teams', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, ...updates }),
    });

    if (!response.ok) {
      throw new Error('Failed to update team');
    }
  }

  async deleteTeam(id: number): Promise<void> {
    const response = await fetch('/api/hackathons/teams', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id }),
    });

    if (!response.ok) {
      throw new Error('Failed to delete team');
    }
  }

  async createInvite(hackathonSlug: string, userId: number, teamId: number): Promise<string> {
    const response = await fetch(`/api/hackathons/${hackathonSlug}/invites`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, teamId }),
    });

    if (!response.ok) {
      throw new Error('Failed to create invite');
    }

    const data = await response.json() as InviteResponse;
    return data.token;
  }

  async createFarcasterUserInvite(hackathonSlug: string, userId: number, teamId: number, farcasterUsername: string): Promise<string> {
    const response = await fetch(`/api/hackathons/${hackathonSlug}/invites`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, teamId, farcasterUsername }),
    });

    if (!response.ok) {
      throw new Error('Failed to create invite for Farcaster user');
    }

    const data = await response.json() as InviteResponse;
    return data.token;
  }

  async acceptInvite(hackathonSlug: string, token: string, userId: number): Promise<void> {
    const response = await fetch(`/api/hackathons/${hackathonSlug}/invites`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, userId }),
    });

    if (!response.ok) {
      throw new Error('Failed to accept invite');
    }
  }
}

export const farhackSDK = FarHackSDK.getInstance();