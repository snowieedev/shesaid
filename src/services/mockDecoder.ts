import { TranslationRequest, TranslationResponse } from "@/types/translation";

interface Presets {
  [key: string]: TranslationResponse;
}

const PRESET_MESSAGES: Presets = {
  "fine, do whatever you want": {
    translation:
      "I strongly advise against doing what you are about to do. I have yielded the argument out of exhaustion, but you will definitely hear about this later.",
    possibleEmotion: "Frustrated, unheard, and emotionally detached for self-preservation.",
    alternativeMeaning:
      "If said warmly or casually, she might genuinely not have a preference and is trusting your judgment (though historically unlikely).",
    suggestedReply:
      "I can tell you're not completely comfortable with this. Let's figure out an option we're both actually happy with.",
    funnyVersion:
      "Translation: Go ahead. Pack your bags for the emotional doghouse. You have 3 minutes to reconsider your life choices.",
    confidence: "High",
  },
  "fine! if that's what you wanna do.": {
    translation:
      "I might not be happy about this. Please consider how I feel before making your decision.",
    possibleEmotion: "Irritated, testing your attentiveness and empathy.",
    alternativeMeaning:
      "She could be busy and genuinely moving on from the topic, but the exclamation point suggests mild exasperation.",
    suggestedReply:
      "I want to make sure you're good with it first. What's on your mind?",
    funnyVersion:
      "Do NOT proceed. This is not permission; it's a verbal tripwire with a 30-megaton blast radius.",
    confidence: "High",
  },
  "i'm not mad": {
    translation:
      "I am currently processing disappointment or irritation and would appreciate you noticing without having to draw you a diagram.",
    possibleEmotion: "Simmering annoyance, vulnerability, or fatigue.",
    alternativeMeaning:
      "She might genuinely be calm and simply speaking flatly because she is tired or preoccupied with work.",
    suggestedReply:
      "I'm glad to hear that, but you seem a bit quiet. If anything is on your mind, I'm here to listen whenever you're ready.",
    funnyVersion:
      "I am not mad; I am entering Phase 4 of tactical silence where every breath you take is being logged for future court proceedings.",
    confidence: "High",
  },
  "nothing, forget it": {
    translation:
      "It was actually something important to me, but I feel like explaining it right now won't be received the way I hoped.",
    possibleEmotion: "Resigned, disheartened, or feeling misunderstood.",
    alternativeMeaning:
      "It truly was a trivial detail that isn't worth the bandwidth to rehash.",
    suggestedReply:
      "I really don't want to brush it off if it mattered to you. Can we take a minute so I can understand?",
    funnyVersion:
      "It is NEVER nothing. The last time 'nothing' was actually nothing was before the Big Bang.",
    confidence: "High",
  },
  "you should already know": {
    translation:
      "I expected you to pay closer attention to previous conversations, patterns, or promises we made.",
    possibleEmotion: "Disappointed that she has to verbalize a need that felt obvious to her.",
    alternativeMeaning:
      "She might mistakenly assume she already told you yesterday when she only thought about telling you.",
    suggestedReply:
      "You're right that I should be paying closer attention. Help me out so I can make it right instead of guessing.",
    funnyVersion:
      "You have failed the unannounced pop quiz on chapter 47 of our relationship syllabus. There is no extra credit.",
    confidence: "High",
  },
  "it's up to you": {
    translation:
      "You make the decision, but please make the one you know I would prefer.",
    possibleEmotion: "Desiring you to take initiative and demonstrate consideration.",
    alternativeMeaning:
      "Genuine decision fatigue — she honestly doesn't care where dinner is as long as food arrives soon.",
    suggestedReply:
      "How about I pick two great options and you choose between them?",
    funnyVersion:
      "A casual coin toss where both sides are rigged. Choose wisely, Indiana Jones.",
    confidence: "Medium",
  },
  "k": {
    translation:
      "I am deliberately using the shortest possible response to signal that the vibe has drastically shifted.",
    possibleEmotion: "Cold, displeased, or thoroughly uninterested in continuing this conversation.",
    alternativeMeaning:
      "She is driving, typing while walking, or literally has 2% battery.",
    suggestedReply:
      "Everything okay on your end? Just checking in.",
    funnyVersion:
      "A single uppercase letter loaded with more passive-aggressive kinetic energy than the Large Hadron Collider.",
    confidence: "High",
  },
  "have fun with your friends!": {
    translation:
      "Have fun, but don't disappear into another dimension, keep your phone in your pocket, and remember you have a life here.",
    possibleEmotion: "Slight fomo, protective affection, or testing whether you'll remember to text her.",
    alternativeMeaning:
      "Warm and supportive — she's excited to have the house to herself for self-care or binge-watching shows.",
    suggestedReply:
      "Thanks babe! I'll check in later. Thinking of you!",
    funnyVersion:
      "Enjoy yourself, but if you don't send a proof-of-life selfie by 10:30 PM, your privileges will be revoked.",
    confidence: "Medium",
  },
  "we need to talk later": {
    translation:
      "There is a serious topic requiring dedicated attention and uninterrupted conversation.",
    possibleEmotion: "Concerned, anxious to resolve an issue, or emotionally prepared for a heavy discussion.",
    alternativeMeaning:
      "Could simply be logistics (finances, schedule change, trip planning) that are too tedious for text.",
    suggestedReply:
      "Sounds good. Is everything okay, or should I be ready for a specific topic when we meet?",
    funnyVersion:
      "The international 5-word panic button guaranteed to raise your resting heart rate to 180 bpm immediately.",
    confidence: "High",
  },
  "do you notice anything different?": {
    translation:
      "I changed something (hair, outfit, nails, decor) and I am hoping you noticed because it shows you pay attention to me.",
    possibleEmotion: "Playful, expectant, seeking validation and romantic focus.",
    alternativeMeaning:
      "She bought something new for the apartment or made a subtle change she expects feedback on.",
    suggestedReply:
      "You look gorgeous! Your hair/outfit is stunning. Tell me what else changed so I can admire it properly!",
    funnyVersion:
      "Red alert. Sweep the room. Check hair length, tint, eyebrows, earrings, shoes, and wall paint. You have 5 seconds.",
    confidence: "High",
  },
};

/**
 * Intelligent fallback generator that crafts dynamic, humorous, contextual translations
 * when an external API key is not configured or during offline testing.
 */
export function generateHeuristicTranslation(
  request: TranslationRequest
): TranslationResponse {
  const cleanMsg = request.message.trim().toLowerCase().replace(/[.!?]+$/, "");
  
  // Check preset match (exact match or phrase match for longer phrases)
  for (const [key, preset] of Object.entries(PRESET_MESSAGES)) {
    const isMatch =
      key.length <= 2
        ? cleanMsg === key || cleanMsg.split(/\s+/).includes(key)
        : cleanMsg === key || cleanMsg.includes(key);

    if (isMatch) {
      // If there is added context, weave it in slightly
      if (request.context) {
        return {
          ...preset,
          alternativeMeaning: `${preset.alternativeMeaning} (Given the context: "${request.context.slice(0, 70)}...", she may be reacting specifically to prior events).`,
        };
      }
      return preset;
    }
  }

  const raw = request.message.trim();
  const rel = request.relationship || "person";
  const hasQuestion = raw.includes("?");
  const hasExclamation = raw.includes("!");
  const isShort = raw.split(" ").length <= 3;
  const lower = raw.toLowerCase();

  // Dynamic heuristics based on content patterns
  if (isShort && (lower.includes("ok") || lower.includes("cool") || lower.includes("sure"))) {
    return {
      translation: `A lukewarm response indicating she acknowledged what you said, but lacks enthusiasm.`,
      possibleEmotion: "Mild detachment, distraction, or subtle discontent.",
      alternativeMeaning: "She might simply be in a rush or replying while multitasking at work.",
      suggestedReply: "Sounds good! Let me know if you'd rather do something else.",
      funnyVersion: `Translation: "I acknowledge your statement with 0.04% enthusiasm and will now return to other priorities."`,
      confidence: "Medium",
    };
  }

  if (lower.includes("busy") || lower.includes("later")) {
    return {
      translation: `She is genuinely occupied with tasks, or she is prioritizing space before engaging.`,
      possibleEmotion: "Overwhelmed by current responsibilities, or needing downtime.",
      alternativeMeaning: "Literal: She has an urgent deadline or appointment and can't focus on chatting.",
      suggestedReply: "No rush at all! Take care of what you need to do and message me whenever you're free.",
      funnyVersion: `Translation: "The queue is currently closed. Please take a ticket and check back during regular business hours."`,
      confidence: "Medium",
    };
  }

  if (lower.includes("who is") || lower.includes("who was that")) {
    return {
      translation: `She is curious about the person mentioned and looking for reassurance regarding boundaries.`,
      possibleEmotion: "Curious, protective, or seeking transparency.",
      alternativeMeaning: "Casual curiosity — she might just be interested in who you were talking about.",
      suggestedReply: "Explain clearly and openly who the person is without getting defensive.",
      funnyVersion: `Translation: FBI background check initiated. Please provide first name, last name, and reason for existence.`,
      confidence: "High",
    };
  }

  if (lower.includes("sorry") || lower.includes("my bad")) {
    return {
      translation: `An expression of regret or an attempt to de-escalate tension between you two.`,
      possibleEmotion: "Remorseful, anxious about conflict, or wanting to restore harmony.",
      alternativeMeaning: "Polite conversational courtesy rather than deep guilt.",
      suggestedReply: "Thank you for saying that. I appreciate it, and we're all good.",
      funnyVersion: `Translation: Peace treaty draft submitted. Please sign and return with emotional reciprocity.`,
      confidence: "High",
    };
  }

  // General high-quality contextual response
  return {
    translation: `She is expressing a perspective that requires reading between the lines. While the words appear straightforward, the underlying sentiment suggests ${
      hasExclamation ? "heightened emotion or urgency" : hasQuestion ? "she is seeking clarity or reassurance" : "she is sharing information while waiting to see how you respond"
    }.`,
    possibleEmotion: hasExclamation
      ? "Passionate, frustrated, or urgently wanting to be understood."
      : "Thoughtful, observant, and gauging your reaction.",
    alternativeMeaning: `She might mean this in the most literal, direct sense without any subtext or hidden agenda.`,
    suggestedReply: `Acknowledge her message with warmth: "I hear you, and I want to make sure I'm understanding you properly. Are we on the same page?"`,
    funnyVersion: `Translation: A subtle test of conversational navigation. Tread carefully and remember: listening is 80% nodding and 20% validation.`,
    confidence: "Medium",
  };
}
