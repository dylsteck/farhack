export interface SessionUser {
    id: string;
    name: string;
    image: string;
  }
  
  export interface User {
    id: number;
    created_at: Date;
    name: string;
    image: string;
    is_admin: boolean;
    admin_hackathons: string;
  }
  
  export interface FullHackathon {
    id: number;
    name: string;
    description: string;
    slug: string;
    square_image: string;
    start_date: Date;
    end_date: Date;
    created_at: Date;
    tracks: Track[];
    bounties: Bounty[];
    schedule: ScheduleItem[];
    teams: Team[];
    is_demo: boolean;
  }
  
  export interface Hackathon {
    id: number;
    name: string;
    description: string;
    slug: string;
    square_image: string;
    start_date: Date;
    end_date: Date;
    created_at: Date;
    tracks: Track[];
    bounties: Bounty[];
    schedule: ScheduleItem[];
    is_demo: boolean;
  }
  
  export interface Ticket {
    id: number;
    user_id: number;
    user_address: string;
    hackathon_id: number;
    txn_hash: string;
    ticket_type: string; // 'priority' | 'day'
    amount: number;
    created_at: Date;
  }
  
  export interface Track {
    id: number;
    name: string;
    description: string;
  }
  
  export interface Bounty {
    id: number;
    name: string;
    description: string;
    image?: string;
    amount?: {
      currency: string;
      value: number;
    }
  }
  
  export interface ScheduleItem {
    id: number;
    name: string;
    date: Date;
    url: string;
  }
  
  export interface Embed {
    type: 'url' | 'image';
    url: string;
  }
  
  export interface Team {
    id: number;
    fids: number[];
    name: string;
    description: string;
    hackathon_id: number;
    submitted_at: Date | null;
    wallet_address: string;
    embeds?: Embed[];
    created_at: Date;
    bounty_id?: number | null;
  }
  
  export interface Invite {
    id: number;
    token: string;
    created_at: Date;
    expires_at: Date;
    user_id: number;
    accepted_at?: Date;
    accepted_by: number;
    team_id: number;
  }
  
  export type State = {
    count: number;
  };  

  // Neynar API types
  export interface NeynarUserDehydrated {
    object: "user_dehydrated";
    fid: number;
    username: string;
    display_name: string;
    pfp_url: string;
    custody_address: string;
  }

  export interface NeynarChannelDehydrated {
    id: string;
    name: string;
    object: "channel_dehydrated";
    image_url: string;
    viewer_context?: {
      following: boolean;
      role: string;
    };
  }

  export interface NeynarUserBio {
    text: string;
    mentioned_profiles?: NeynarUserDehydrated[];
    mentioned_profiles_ranges?: { start: number; end: number }[];
    mentioned_channels?: NeynarChannelDehydrated[];
    mentioned_channels_ranges?: { start: number; end: number }[];
  }

  export interface NeynarUserLocation {
    latitude?: number;
    longitude?: number;
    address?: {
      city?: string;
      state?: string;
      state_code?: string;
      country?: string;
      country_code?: string;
    };
  }

  export interface NeynarUserProfile {
    bio?: NeynarUserBio;
    location?: NeynarUserLocation;
  }

  export interface NeynarUserVerifiedAccounts {
    platform: string;
    username: string;
  }

  export interface NeynarVerifiedAddresses {
    eth_addresses?: string[];
    sol_addresses?: string[];
    primary?: {
      eth_address?: string;
      sol_address?: string;
    };
  }

  export interface NeynarUser {
    object: "user";
    fid: number;
    username: string;
    display_name: string;
    custody_address: string;
    pfp_url: string;
    profile?: NeynarUserProfile;
    follower_count?: number;
    following_count?: number;
    verifications?: string[];
    verified_addresses?: NeynarVerifiedAddresses;
    verified_accounts?: NeynarUserVerifiedAccounts[];
    power_badge?: boolean;
    experimental?: {
      neynar_user_score?: number;
    };
    viewer_context?: {
      following?: boolean;
      followed_by?: boolean;
      blocking?: boolean;
      blocked_by?: boolean;
    };
  }

  export interface NeynarUserSearchResponse {
    result: {
      users: NeynarUser[];
      next?: {
        cursor: string;
      };
    };
  }  

  export interface FarcasterNotificationPayload {
    title: string;
    body: string;
    targetUrl: string;
    tokens: string[];
  }  