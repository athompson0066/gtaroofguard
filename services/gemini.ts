
import { GoogleGenAI, Type } from "@google/genai";
import { ChatMessage, LocationState, Roofer, GeneratedEmail, ListingStrategy, EstimationResult } from "../types";

const SYSTEM_INSTRUCTION = `
You are the "GTA Emergency Roof Response Unit" Crisis Coordinator.
Your mission: Minimize water damage by connecting homeowners in the Greater Toronto Area with available 24/7 roofing crews.
`;

const SALES_AGENT_INSTRUCTION = `
You are the "Senior Growth Consultant" for GTA Roof Guard. 
Your sole objective is to persuade roofing company owners in the Greater Toronto Area to join our exclusive 24/7 emergency dispatch network.

TONE: 
High-energy, professional, ROI-focused, and results-driven. You speak "Business-to-Business". Use direct, punchy, and persuasive language.

FORMATTING RULES:
- Use Markdown headers (###) for major selling points.
- Use **Bold text** for key ROI metrics, margins, and calls to action.
- Use bullet points for features.
- Ensure the response looks like a professional, high-conversion sales presentation.

KEY SELLING POINTS TO WEAVE IN:
1. PRE-TRIAGED LEADS: Our AI assesses damage severity before dispatching. No more "tire kickers". Mention 2x-3x higher margins for emergency jobs.
2. THE "ACTIVE/INACTIVE" TOGGLE: Partners have total control over lead flow.
3. GPS EFFICIENCY: Dispatching the closest available crew to slash fuel costs.
4. EXCLUSIVE TERRITORY: Priority for elite members in specific GTA zones.
5. NO CONTRACTS: Month-to-month results-based partnership.

OBJECTION HANDLING:
- Cost: One emergency call pays for a full year.
- Schedule: The toggle gives them control.
`;

const ADMIN_OUTREACH_INSTRUCTION = `
You are a "Multi-Agent Outreach Crew" (Researcher, Copywriter, and Compliance Officer) working for GTA Roof Guard.

AGENT WORKFLOW:
1. RESEARCHER: Use Google Search to analyze the company's online reputation, specific services (e.g., cedar, metal, shingles), and recent project highlights.
2. COPYWRITER: Write a highly personalized, B2B invitation email. Mention specific details found during research.
3. COMPLIANCE: Ensure the email follows GTA Roof Guard brand voice and uses the modern "No-Call" CTA.

CALL TO ACTION (CRITICAL):
Do NOT ask for a phone call or meeting. Instead, invite them to visit our "Partner Growth Portal" to experience our AI dispatch technology firsthand and chat with Marcus.
Tell them they can chat directly with "Marcus", our Senior Growth Consultant AI, who has already analyzed their local market data and is ready to show them their ROI projections and answer any questions.

LINK TO USE: https://gtaroofguard.ca/partner-growth
`;

const STRATEGY_LAB_INSTRUCTION = `
You are a high-performance B2B Marketing Agency consisting of three expert agents:
1. Copywriter: Writes persuasive, emotional, and benefit-driven headlines and copy to get roofing contractors excited about joining the GTA Roof Guard network.
2. Marketing Strategist: Outlines 3 key strategic growth moves for our partners to dominate their local GTA city.
3. Pricing Strategist: Develops three monthly subscription tiers (Essential, Pro, Elite) with realistic pricing and scaling features.

Your goal is to produce a "Partner Growth Blueprint" that will be displayed on our 'Add Listing' page.

OUTPUT FORMAT:
Return a JSON object with:
- marketingCopy: A strong sales headline and sub-headline.
- marketingStrategy: 3 key strategic points for the partner.
- pricingOptions: An array of 3 objects with 'tier', 'price' (monthly), and 'features' list.
`;

const ESTIMATOR_INSTRUCTION = `
You are a Toronto Roofing Cost Estimator Agent. 
Your role is to provide realistic, local price ranges for roofing projects in the Greater Toronto Area.
Current Toronto Market Data:
- Asphalt Shingles: $4.50 - $6.50 per sq ft.
- Metal Roofing: $9.00 - $16.00 per sq ft.
- Slate/Tile: $20.00+ per sq ft.
- Complexity (Steep pitch, many valleys): Add 15-30% to base.

You must provide a professional breakdown and use Google Maps to find the top 3 highest-rated local companies to fulfill this specific request.

IMPORTANT: You must return your response as a valid JSON object. Do not include any other text outside the JSON structure.
JSON Structure:
{
  "estimatedCostRange": "$12,000 - $15,500",
  "breakdown": "Explanation of size, material, labor...",
  "marketInsights": "Current local trends in GTA..."
}
`;

export async function engagePartnerSales(message: string, history: ChatMessage[]) {
  const apiKey = typeof process !== 'undefined' ? process.env.API_KEY : (window as any).process?.env?.API_KEY;
  if (!apiKey) throw new Error("API Key is missing.");

  const ai = new GoogleGenAI({ apiKey });
  
  const contents = history
    .filter(h => h.role === 'user' || h.role === 'assistant')
    .map(h => ({
      role: h.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: h.content }]
    }));
    
  contents.push({ role: 'user', parts: [{ text: message }] });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview", 
      contents: contents,
      config: {
        systemInstruction: SALES_AGENT_INSTRUCTION,
      },
    });

    return response.text || "Our growth team is currently scaling operations. Join the waitlist.";
  } catch (error) {
    console.error("Sales Agent Error:", error);
    throw error;
  }
}

export async function sendEmergencyMessage(
  message: string,
  history: ChatMessage[],
  location?: LocationState
) {
  const apiKey = typeof process !== 'undefined' ? process.env.API_KEY : (window as any).process?.env?.API_KEY;
  if (!apiKey) throw new Error("API Key is missing.");

  const ai = new GoogleGenAI({ apiKey });
  
  const contents = history
    .filter(h => h.role === 'user' || h.role === 'assistant')
    .map(h => ({
      role: h.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: h.content }]
    }));
    
  contents.push({ role: 'user', parts: [{ text: message }] });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", 
      contents: contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        tools: [{ googleMaps: {} }],
        toolConfig: {
          retrievalConfig: {
            latLng: location?.lat && location?.lng ? { latitude: location.lat, longitude: location.lng } : undefined
          }
        }
      },
    });

    const text = response.text || "Dispatch processing...";
    const roofers: Roofer[] = [];
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    
    if (chunks) {
      chunks.forEach((chunk: any) => {
        if (chunk.maps) {
          let snippet = "";
          const source = chunk.maps.placeAnswerSources || chunk.maps.source;
          if (source?.reviewSnippets?.[0]?.text) snippet = source.reviewSnippets[0].text;
          
          roofers.push({
            name: chunk.maps.title || "Emergency Crew",
            uri: chunk.maps.uri,
            address: chunk.maps.address,
            phone: chunk.maps.phoneNumber,
            rating: chunk.maps.rating,
            reviewSnippet: snippet,
            location: chunk.maps.latLng ? { lat: chunk.maps.latLng.latitude, lng: chunk.maps.latLng.longitude } : undefined
          });
        }
      });
    }
    return { text, roofers };
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
}

export async function generateOutreachEmail(companyName: string, city: string, website?: string, instructions?: string): Promise<GeneratedEmail> {
  const apiKey = typeof process !== 'undefined' ? process.env.API_KEY : (window as any).process?.env?.API_KEY;
  if (!apiKey) throw new Error("API Key missing.");

  const ai = new GoogleGenAI({ apiKey });
  
  const prompt = `
    TARGET COMPANY DATA:
    - Name: ${companyName}
    - City: ${city}
    - Website: ${website || "Not provided (Search Google for this company in this city)"}

    ADDITIONAL INSTRUCTIONS: ${instructions || "Ensure a warm but highly professional tone."}

    TASK: 
    1. Researcher Agent: Perform a deep dive on ${companyName}. Find their specific roofing specialties and check their recent Google reviews to find a positive detail to mention.
    2. Copywriter Agent: Draft a personalized outreach email. 
    
    REQUIRED CALL TO ACTION:
    Ensure the email specifically mentions "Marcus", our Senior Growth Consultant AI.
    Invite them to: "Experience our AI dispatch technology and chat directly with Marcus at our secure Partner Portal: https://gtaroofguard.ca/partner-growth"
    Emphasize that Marcus has already pre-calculated their local market ROI projections and is standing by to answer questions.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: ADMIN_OUTREACH_INSTRUCTION,
        tools: [{ googleSearch: {} }],
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            subject: { type: Type.STRING, description: "The email subject line" },
            body: { type: Type.STRING, description: "The full email body text with personalization" }
          },
          required: ["subject", "body"]
        }
      },
    });

    const text = response.text || "{}";
    return JSON.parse(text);
  } catch (error) {
    console.error("Outreach Generation Error:", error);
    throw error;
  }
}

export async function generateNetworkStrategy(marketContext: string): Promise<ListingStrategy> {
  const apiKey = typeof process !== 'undefined' ? process.env.API_KEY : (window as any).process?.env?.API_KEY;
  if (!apiKey) throw new Error("API Key missing.");

  const ai = new GoogleGenAI({ apiKey });
  
  const prompt = `
    MARKET CONTEXT: ${marketContext}
    
    Develop a comprehensive partnership strategy for the GTA Roof Guard network including marketing copy and 3 subscription tiers.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: STRATEGY_LAB_INSTRUCTION,
        responseMimeType: "application/json",
      },
    });

    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Strategy Generation Error:", error);
    throw error;
  }
}

export async function getRoofingEstimate(data: { size: number, material: string, complexity: string, city: string }): Promise<EstimationResult> {
  const apiKey = typeof process !== 'undefined' ? process.env.API_KEY : (window as any).process?.env?.API_KEY;
  if (!apiKey) throw new Error("API Key missing.");

  const ai = new GoogleGenAI({ apiKey });
  
  const prompt = `
    Calculate a realistic roofing estimate for:
    City: ${data.city}
    Roof Size: ${data.size} sq ft
    Material: ${data.material}
    Complexity: ${data.complexity}
    
    Find 3 high-rated local roofers in ${data.city} that specialize in ${data.material} installations using Google Maps.
    
    IMPORTANT: Provide the estimation and breakdown in a valid JSON object as per the system instruction.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", 
      contents: prompt,
      config: {
        systemInstruction: ESTIMATOR_INSTRUCTION,
        tools: [{ googleMaps: {} }],
        // responseMimeType: "application/json" IS NOT ALLOWED with googleMaps tool on 2.5 series.
      },
    });

    const text = response.text || "";
    
    // Robust JSON extraction
    let jsonStr = "";
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      jsonStr = jsonMatch[0];
    } else {
      throw new Error("No JSON found in response");
    }

    const parsed = JSON.parse(jsonStr);
    const roofers: Roofer[] = [];
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    
    if (chunks) {
      chunks.forEach((chunk: any) => {
        if (chunk.maps) {
          roofers.push({
            name: chunk.maps.title || "Elite Installer",
            uri: chunk.maps.uri,
            address: chunk.maps.address,
            phone: chunk.maps.phoneNumber,
            rating: chunk.maps.rating,
          });
        }
      });
    }

    return {
      estimatedCostRange: parsed.estimatedCostRange || "Contact for pricing",
      breakdown: parsed.breakdown || "Detailed estimation currently unavailable.",
      marketInsights: parsed.marketInsights || "Local market data restricted.",
      recommendedCompanies: roofers
    };
  } catch (error) {
    console.error("Estimator Error:", error);
    throw error;
  }
}
