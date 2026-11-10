export type ConfidenceLevel = "Low" | "Medium" | "High";

export type RelationshipType =
  | "Partner / Girlfriend"
  | "Wife"
  | "Crush / Talking Stage"
  | "Friend"
  | "Co-worker"
  | "Ex"
  | "Family / Mom"
  | "Other";

export interface TranslationRequest {
  message: string;
  context?: string;
  relationship?: RelationshipType | string;
}

export interface TranslationResponse {
  translation: string;
  possibleEmotion: string;
  alternativeMeaning: string;
  suggestedReply: string;
  funnyVersion: string;
  confidence: ConfidenceLevel;
}

export interface StoredTranslation extends TranslationResponse {
  id: string;
  originalMessage: string;
  context?: string;
  relationship?: string;
  createdAt: number;
}
