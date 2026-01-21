
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
`;

const ADMIN_OUTREACH_INSTRUCTION = `
You are a "Multi-Agent Outreach Crew" (Researcher, Copywriter, and Compliance Officer) working for GTA Roof Guard.

AGENT WORKFLOW:
1. RESEARCHER: Use Google Search to analyze the company's online reputation, specific services, and recent project highlights.
2. COPYWRITER: Write a highly personalized, B2B invitation email. 
3. COMPLIANCE: Ensure the email follows GTA Roof Guard brand voice.

CALL TO ACTION (CRITICAL):
Invite them to: "Experience our AI dispatch technology and chat directly with Marcus at our secure Partner Portal: https://gtaroofguard.ca/partner-growth"
Marcus is our Senior Growth Consultant AI.
`;

const STRATEGY_LAB_INSTRUCTION = `
You are a high-performance B2B Marketing Agency. Goal: Produce a "Partner Growth Blueprint".
`;

const ESTIMATOR_INSTRUCTION = `
You are a Toronto Roofing Cost Estimator Agent. Return a JSON object with estimatedCostRange, breakdown, and marketInsights.
`;

export async function engagePartnerSales(message: string, history: ChatMessage[]) {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
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
      config: { systemInstruction: SALES_AGENT_INSTRUCTION },
    });
    return response.text || "Dispatch active.";
  } catch (error) {
    console.error("Sales Agent Error:", error);
    throw error;
  }
}

export async function sendEmergencyMessage(message: string, history: ChatMessage[], location?: LocationState) {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
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

    const text = response.text || "Processing...";
    const roofers: Roofer[] = [];
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (chunks) {
      chunks.forEach((chunk: any) => {
        if (chunk.maps) {
          roofers.push({
            name: chunk.maps.title || "Emergency Crew",
            uri: chunk.maps.uri,
            address: chunk.maps.address,
            phone: chunk.maps.phoneNumber,
            rating: chunk.maps.rating,
          });
        }
      });
    }
    return { text, roofers };
  } catch (error) {
    console.error("Emergency Message Error:", error);
    throw error;
  }
}

export async function generateOutreachEmail(companyName: string, city: string, website?: string, instructions?: string): Promise<GeneratedEmail> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = `Target: ${companyName}, City: ${city}. Instructions: ${instructions}. CTA must link to https://gtaroofguard.ca/partner-growth and mention Marcus.`;

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
            subject: { type: Type.STRING },
            body: { type: Type.STRING }
          },
          required: ["subject", "body"]
        }
      },
    });
    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Outreach Email Error:", error);
    throw error;
  }
}

export async function generateNetworkStrategy(marketContext: string): Promise<ListingStrategy> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: marketContext,
      config: {
        systemInstruction: STRATEGY_LAB_INSTRUCTION,
        responseMimeType: "application/json",
      },
    });
    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error("Strategy Error:", error);
    throw error;
  }
}

export async function getRoofingEstimate(data: { size: number, material: string, complexity: string, city: string }): Promise<EstimationResult> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = `Calculate estimate for ${data.size}sqft ${data.material} in ${data.city}. Find 3 local roofers.`;
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash", 
      contents: prompt,
      config: {
        systemInstruction: ESTIMATOR_INSTRUCTION,
        tools: [{ googleMaps: {} }],
      },
    });
    const text = response.text || "";
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const parsed = JSON.parse(jsonMatch ? jsonMatch[0] : "{}");
    const roofers: Roofer[] = [];
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;
    if (chunks) {
      chunks.forEach((chunk: any) => {
        if (chunk.maps) {
          roofers.push({ name: chunk.maps.title, uri: chunk.maps.uri, address: chunk.maps.address, rating: chunk.maps.rating });
        }
      });
    }
    return {
      estimatedCostRange: parsed.estimatedCostRange || "Contact for Quote",
      breakdown: parsed.breakdown || "Analysis complete.",
      marketInsights: parsed.marketInsights || "GTA region prioritized.",
      recommendedCompanies: roofers
    };
  } catch (error) {
    console.error("Estimator Error:", error);
    throw error;
  }
}
