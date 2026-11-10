import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/utils/rateLimiter";
import { translateMessage } from "@/services/aiService";
import { TranslationRequest } from "@/types/translation";

export async function POST(req: NextRequest) {
  try {
    // 1. Rate limiting by IP
    const forwardedFor = req.headers.get("x-forwarded-for");
    const ip = forwardedFor ? forwardedFor.split(",")[0].trim() : "127.0.0.1";
    const { allowed, remaining, resetInSec } = checkRateLimit(ip, 25, 60000);

    if (!allowed) {
      return NextResponse.json(
        {
          error: "Rate limit exceeded. Please wait a moment before decoding more messages.",
          resetInSec,
        },
        {
          status: 429,
          headers: {
            "Retry-After": resetInSec.toString(),
            "X-RateLimit-Remaining": remaining.toString(),
          },
        }
      );
    }

    // 2. Parse request body
    const body = await req.json().catch(() => null);

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid request payload. Please send a valid JSON body." },
        { status: 400 }
      );
    }

    const { message, context, relationship } = body as Partial<TranslationRequest>;

    // 3. Validate message input
    if (!message || typeof message !== "string" || message.trim().length === 0) {
      return NextResponse.json(
        { error: "Please enter what she said to decode." },
        { status: 400 }
      );
    }

    if (message.length > 1000) {
      return NextResponse.json(
        { error: "Message is too long. Please keep it under 1,000 characters." },
        { status: 400 }
      );
    }

    const sanitizedRequest: TranslationRequest = {
      message: message.trim(),
      context: typeof context === "string" ? context.trim().slice(0, 800) : undefined,
      relationship:
        typeof relationship === "string" ? relationship.trim().slice(0, 100) : undefined,
    };

    // 4. Translate message
    const result = await translateMessage(sanitizedRequest);

    return NextResponse.json(result, {
      status: 200,
      headers: {
        "X-RateLimit-Remaining": remaining.toString(),
      },
    });
  } catch (error) {
    console.error("[API /api/translate error]:", error);
    return NextResponse.json(
      {
        error: "Something went wrong while decoding. Please try again in a moment.",
      },
      { status: 500 }
    );
  }
}
