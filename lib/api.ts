import { Team } from "./types";
import { BASE_URL } from "./utils";

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

    return response.json();
  }

  async getHackathon(slug: string) {
    return this.fetcher(`/api/hackathons/${slug}`);
  }

  async getHackathons() {
    return this.fetcher('/api/hackathons');
  }

  async getTeam(type: 'teamId' | 'userId' = 'teamId', identifier: string) {
    return this.fetcher(`/api/hackathons/teams?type=${type}&identifier=${identifier}`);
  }

  async getTeams() {
    return this.fetcher('/api/hackathons/teams');
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

    return await response.json();
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

    const data = await response.json();
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