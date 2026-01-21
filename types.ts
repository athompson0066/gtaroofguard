
export interface Roofer {
  name: string;
  phone?: string;
  email?: string;
  rating?: number;
  reviews?: number;
  uri?: string;
  address?: string;
  eta?: string;
  reviewSnippet?: string;
  location?: {
    lat: number;
    lng: number;
  };
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
  roofers?: Roofer[];
  isSafetyAlert?: boolean;
}

export interface LocationState {
  lat?: number;
  lng?: number;
  postalCode?: string;
  city?: string;
}

export interface OutreachAgentTask {
  id: string;
  agentName: string;
  status: 'idle' | 'working' | 'completed' | 'error';
  message: string;
}

export interface GeneratedEmail {
  subject: string;
  body: string;
}

export interface ListingStrategy {
  marketingCopy: string;
  marketingStrategy: string;
  pricingOptions: {
    tier: string;
    price: string;
    features: string[];
  }[];
}

export interface EstimationResult {
  estimatedCostRange: string;
  breakdown: string;
  marketInsights: string;
  recommendedCompanies: Roofer[];
}
