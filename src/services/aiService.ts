import { TranslationRequest, TranslationResponse } from "@/types/translation";
import { generateHeuristicTranslation } from "./mockDecoder";

const SYSTEM_PROMPT = `You are SheSaid, a humorous conversational interpretation assistant.

Your job is to interpret confusing messages and conversations in simple, understandable language.

For every input:
1. Explain what the person might actually be communicating.
2. Identify the possible emotion or concern behind the message.
3. Give an alternative interpretation if the message is ambiguous.
4. Suggest a sensible and respectful reply.
5. Add a humorous translation when appropriate.

Rules:
- Never claim to know someone's actual thoughts.
- Never assume all women communicate identically.
- Don't automatically interpret neutral messages negatively.
- Don't encourage manipulation, arguments, or mind games.
- Consider context carefully.
- Keep responses entertaining but useful.
- Use simple everyday English.

You MUST respond strictly with valid JSON without any markdown formatting or commentary. Use this exact JSON structure:
{
  "translation": "Simple interpretation",
  "possibleEmotion": "Possible emotion",
  "alternativeMeaning": "Another reasonable interpretation",
  "suggestedReply": "A respectful response",
  "funnyVersion": "Humorous interpretation",
  "confidence": "Low, Medium, or High"
}`;

/**
 * Clean and extract JSON object from potentially fenced LLM output
 */
function cleanJsonString(raw: string): string {
  let cleaned = raw.trim();
  // Remove markdown code fences if present
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/i, "");
  }
  return cleaned.trim();
}

/**
 * Validates and normalizes the parsed JSON object to match TranslationResponse
 */
function validateResponse(parsed: unknown): TranslationResponse {
  if (typeof parsed !== "object" || parsed === null) {
    throw new Error("Invalid response format: expected an object");
  }

  const obj = parsed as Record<string, unknown>;

  const translation =
    typeof obj.translation === "string" && obj.translation.trim().length > 0
      ? obj.translation.trim()
      : "Could not decode message cleanly.";

  const possibleEmotion =
    typeof obj.possibleEmotion === "string" && obj.possibleEmotion.trim().length > 0
      ? obj.possibleEmotion.trim()
      : "Nuanced or contemplative feelings.";

  const alternativeMeaning =
    typeof obj.alternativeMeaning === "string" && obj.alternativeMeaning.trim().length > 0
      ? obj.alternativeMeaning.trim()
      : "Could also be taken at face value without any hidden meaning.";

  const suggestedReply =
    typeof obj.suggestedReply === "string" && obj.suggestedReply.trim().length > 0
      ? obj.suggestedReply.trim()
      : "Take a breath, listen openly, and ask gently if everything is okay.";

  const funnyVersion =
    typeof obj.funnyVersion === "string" && obj.funnyVersion.trim().length > 0
      ? obj.funnyVersion.trim()
      : "💀 Proceed with caution, soldier.";

  let confidence: "Low" | "Medium" | "High" = "Medium";
  if (typeof obj.confidence === "string") {
    const confUpper = obj.confidence.trim().toLowerCase();
    if (confUpper.includes("high")) confidence = "High";
    else if (confUpper.includes("low")) confidence = "Low";
    else confidence = "Medium";
  }

  return {
    translation,
    possibleEmotion,
    alternativeMeaning,
    suggestedReply,
    funnyVersion,
    confidence,
  };
}

export async function translateMessage(
  request: TranslationRequest
): Promise<TranslationResponse> {
  const apiKey = process.env.API_KEY?.trim();
  let baseUrl = (
    process.env.API_BASE_URL?.trim() || "https://apinext.bond/v1"
  ).replace(/\/+$/, "");

  // Auto-normalize api.apinext.bond to apinext.bond if entered with api. prefix
  if (baseUrl.includes("api.apinext.bond")) {
    baseUrl = baseUrl.replace("api.apinext.bond", "apinext.bond");
  }

  const configuredModel = process.env.AI_MODEL?.trim() || "free/minimax-m3.1-flash";
  const candidateModels = Array.from(
    new Set([configuredModel, "free/minimax-m3.1-flash", "free/hy4", "gemini-3.8-flash", "gpt-4o-mini"])
  );

  // Check if API key is missing or dummy placeholder
  const isKeyPlaceholder =
    !apiKey ||
    apiKey === "your_api_key_here" ||
    apiKey.toLowerCase().includes("placeholder") ||
    apiKey.length < 5;

  if (isKeyPlaceholder) {
    // Graceful fallback to smart heuristic decoder for development & demos
    return generateHeuristicTranslation(request);
  }

  // Construct user prompt with contextual variables
  let userPrompt = `Message to translate:\n"${request.message.trim()}"\n`;
  if (request.context && request.context.trim()) {
    userPrompt += `\nPrior context / What happened before:\n"${request.context.trim()}"\n`;
  }
  if (request.relationship && request.relationship.trim()) {
    userPrompt += `\nRelationship context:\n"${request.relationship.trim()}"\n`;
  }

  const endpoint = `${baseUrl}/chat/completions`;

  // Try candidate models in order before falling back
  for (const model of candidateModels) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 12000); // 12s timeout per candidate

      const res = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: model,
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: userPrompt },
          ],
          temperature: 0.7,
          max_tokens: 800,
          response_format: { type: "json_object" },
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        const data = await res.json();
        const content = data?.choices?.[0]?.message?.content;
        if (content) {
          const cleaned = cleanJsonString(content);
          const parsed = JSON.parse(cleaned);
          return validateResponse(parsed);
        }
      } else {
        const errorText = await res.text();
        console.warn(
          `[SheSaid AI Service] Model '${model}' returned status ${res.status}: ${errorText}`
        );
      }
    } catch (err: unknown) {
      console.warn(`[SheSaid AI Service] Error trying model '${model}':`, err);
    }
  }

  // If remote models fail or are temporarily unavailable, fallback to heuristic decoder
  console.info("[SheSaid AI Service] Using smart heuristic fallback.");
  return generateHeuristicTranslation(request);
}
