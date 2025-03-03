import { BASE_URL } from "./utils"

class FarHackSDK {
  private baseUrl: string
  private static instance: FarHackSDK

  constructor() {
    this.baseUrl = BASE_URL
  }

  static getInstance(): FarHackSDK {
    if (!FarHackSDK.instance) {
      FarHackSDK.instance = new FarHackSDK()
    }
    return FarHackSDK.instance
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

  async addTicket(user_id: string, user_address: string, hackathon_id: string, txn_hash: string, ticket_type: string, amount: number) {
    return this.fetcher('/api/hackathons/tickets', {
      method: 'POST',
      body: JSON.stringify({ user_id, user_address, hackathon_id, txn_hash, ticket_type, amount })
    });
  }
}

export const farhackSDK = FarHackSDK.getInstance()