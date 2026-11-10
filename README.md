# SheSaid — The Female Language Translator 😂

> **"She said what?"** — Confused by that message? Let's decode it. 👀

**SheSaid** is a fun, modern, AI-powered entertainment web tool that humorously decodes confusing conversational texts and cryptic messages into simpler, more understandable language. 

The app is witty, clever, slightly sarcastic, but genuinely empathetic and grounded. It never assumes all women communicate the same way, acknowledges situational uncertainty, and offers sensible, constructive replies to keep communication positive.

---

## 🌟 Key Features

1. **6-Point Dimensional Decode**:
   - **The Translation**: Plain-English interpretation of what she might actually mean.
   - **Possible Emotion**: Empathy-first analysis of the underlying feelings or concerns.
   - **Another Possibility**: Nuanced alternative interpretation if the message is ambiguous.
   - **What You Should Reply**: A respectful, sensible, non-defensive response you can copy in 1 click.
   - **The Funny Version 💀**: Entertaining, witty, and slightly chaotic commentary.
   - **Confidence Level**: Low / Medium / High indicator gauge.

2. **Context & Relationship Nuance**:
   - Optional relationship selector (*Partner / Girlfriend, Wife, Crush, Friend, Co-worker, Ex, Mom*).
   - Optional backstory input (*e.g., "I forgot our dinner date yesterday"*).

3. **Smart Heuristic Fallback & Demo Mode**:
   - Works immediately out-of-the-box even without an API key configured!
   - Built-in heuristic engine handles classic examples and custom text patterns seamlessly.

4. **Modern, Playful & Minimal Design**:
   - Soft sky-blue accents with crisp, clean white/light surfaces.
   - Fully integrated dark mode with one-click theme toggle.
   - Micro-interactions, animated cycling status messages during loading, and confetti celebration on decode.
   - Interactive clickable examples (*"Fine, do whatever you want.", "I'm not mad.", "K.", "It's up to you."*).
   - Local decode history saved in `localStorage`.

5. **Production Ready & Secure**:
   - Server-side API route keeps API credentials private.
   - In-memory rate limiting per IP to prevent spam and abuse.
   - Structured JSON validation with resilient markdown fence stripping.
   - 100% TypeScript type safety.
   - Zero-config deployment on Vercel.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, React 19)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Confetti**: [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **AI Integration**: Compatible with [APINext.bond](https://apinext.bond) or any OpenAI-compatible API endpoint

---

## 🚀 Getting Started

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/your-username/female-translator.git
cd female-translator
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file from the provided `.env.example`:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
# APINext.bond or any OpenAI-compatible endpoint
API_BASE_URL=https://api.apinext.bond/v1

# Your API Key (leave empty or placeholder to run in smart demo mode)
API_KEY=your_api_key_here

# Select the cheapest capable text-generation model
# Examples: gpt-4o-mini, gpt-3.5-turbo, deepseek-chat
AI_MODEL=gpt-4o-mini
```

> **Note**: If `API_KEY` is not provided or remains `your_api_key_here`, SheSaid automatically operates in its high-fidelity **Smart Heuristic Mode**, allowing complete offline testing and demonstration without paying API fees.

### 3. Run Locally

```bash
# Start development server
npm run dev

# Or build and run production server
npm run build
npm run start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🌐 Deploy to Vercel

The application is built specifically for Vercel:

1. Push your code to GitHub / GitLab / Bitbucket.
2. Import the repository into your [Vercel Dashboard](https://vercel.com/new).
3. Under **Environment Variables**, add:
   - `API_BASE_URL`
   - `API_KEY`
   - `AI_MODEL`
4. Click **Deploy**!

---

## 🔒 Security & Privacy

- All API keys and provider URLs remain strictly on the server; none are ever exposed to the client browser.
- Rate limiting protects against bot spam and excessive token consumption.
- Inputs are sanitized and bounded to prevent oversized requests.
- No personal user messages or chat transcripts are permanently stored on any server database.

---

## ⚖️ Disclaimer

*SheSaid is an entertainment tool created for laughs, lighthearted perspective, and better empathy. We can't actually read minds, and real humans are infinitely complex. Honest, open communication will always beat guessing games!*
