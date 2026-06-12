// ── AI Sprint · Agentic AI ───────────────────────────────────────────────────
// File: routes.ts  |  Repo: agentic-ai
// Last updated: June 2026

import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { z } from "zod";
import session from "express-session";
import MemoryStore from "memorystore";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import OpenAI from "openai";
import Stripe from "stripe";

const SessionStore = MemoryStore(session);

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", { apiVersion: "2023-10-16" });

// ── Built-in AI daily usage counter ──────────────────────────────────────────
const DAILY_LIMITS = { chat: 5, promptlab: 3 };
const COURSE_ID = "agentic";
const dailyUsage = new Map<string, number>();

function todayUTC(): string { return new Date().toISOString().slice(0, 10); }
function usageKey(userId: number, type: "chat" | "promptlab"): string {
  return `${userId}:${COURSE_ID}:${todayUTC()}:${type}`;
}
function getUsage(userId: number, type: "chat" | "promptlab"): number {
  return dailyUsage.get(usageKey(userId, type)) || 0;
}
function incrementUsage(userId: number, type: "chat" | "promptlab"): void {
  const key = usageKey(userId, type);
  dailyUsage.set(key, (dailyUsage.get(key) || 0) + 1);
}

// USD via Stripe (amounts in cents)
const PRICES: Record<string, { amount: number; label: string }> = {
  "bundle": { amount: 9900, label: "Agentic AI — Complete Course (All 3 Levels)" },
};


const APP_URL = process.env.APP_URL || "https://ai-sprint-agentic-course-production.up.railway.app";

if (!process.env.SESSION_SECRET) {
  console.warn("WARNING: SESSION_SECRET is not set. Using a default secret for development.");
}

export async function registerRoutes(app: Express): Promise<Server> {
  // ── 1. SESSIONS & PASSPORT ─────────────
  app.use(session({
    secret: process.env.SESSION_SECRET || "ai-sprint-strategy-super-secret-key-2026",
    resave: false,
    saveUninitialized: false,
    store: new SessionStore({ checkPeriod: 86400000 }),
    cookie: {
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 30 * 24 * 60 * 60 * 1000
    }
  }));

  if (process.env.NODE_ENV === "production") {
    app.set("trust proxy", 1);
  }

  app.use(passport.initialize());
  app.use(passport.session());

  passport.serializeUser((user: any, done) => done(null, user.id));
  
  passport.deserializeUser((id: number, done) => {
    const user = storage.getUserById(id);
    if (user) {
      const licensedLevels = storage.getLicensedLevels(user.email);
      const isAdmin = storage.isAdmin(user.email);
      done(null, { ...user, licensedLevels, isAdmin });
    } else {
      done(null, false);
    }
  });

  passport.use(new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    const user = storage.authenticateUser(email, password);
    if (!user) return done(null, false, { message: "Invalid credentials" });
    const licensedLevels = storage.getLicensedLevels(user.email);
    const isAdmin = storage.isAdmin(user.email);
    return done(null, { ...user, licensedLevels, isAdmin });
  }));

  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/api/auth/google/callback",
        proxy: true 
      },
      (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails?.[0].value;
          if (!email) return done(new Error("No email found"));
          let user = storage.getUserByEmail(email);
          if (!user) {
            user = storage.createUser(email, Math.random().toString(36), profile.displayName || "Google User");
          }
          if (!user) return done(new Error("Could not create user"));
          
          const licensedLevels = storage.getLicensedLevels(user.email);
          const isAdmin = storage.isAdmin(user.email);
          return done(null, { ...user, licensedLevels, isAdmin });
        } catch (err) {
          return done(err as Error);
        }
      }
    ));
  }

  // ── 2. AUTHENTICATION ROUTES ────────────────────────────────
  const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    if (!req.isAuthenticated()) return res.status(401).json({ error: "Unauthorized" });
    next();
  };

  const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as any;
    if (!user || !storage.isAdmin(user.email)) {
      return res.status(403).json({ error: "Admin only" });
    }
    next();
  };

  app.post("/api/auth/register", (req, res, next) => {
    const b = z.object({ email: z.string().email(), password: z.string().min(6), displayName: z.string().min(1) }).safeParse(req.body);
    if (!b.success) return res.status(400).json({ error: "Invalid input" });
    const user = storage.createUser(b.data.email, b.data.password, b.data.displayName);
    if (!user) return res.status(400).json({ error: "Email already exists" });
    req.login(user, (err) => {
      if (err) return next(err);
      const licensedLevels = storage.getLicensedLevels(user.email);
      const isAdmin = storage.isAdmin(user.email);
      res.json({ ...user, licensedLevels, isAdmin });
    });
  });

  app.post("/api/auth/login", passport.authenticate("local"), (req, res) => {
    const user = req.user as any;
    const licensedLevels = storage.getLicensedLevels(user.email);
    const isAdmin = storage.isAdmin(user.email);
    res.json({ ...user, licensedLevels, isAdmin });
  });

  app.get("/api/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));
  
  app.get("/api/auth/google/callback", 
    passport.authenticate("google", { failureRedirect: "/login" }),
    (req, res) => res.redirect("/#/")
  );

  app.post("/api/auth/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.json({ ok: true });
    });
  });

  app.get("/api/auth/me", (req, res) => {
    if (!req.isAuthenticated()) return res.json(null);
    const user = req.user as any;
    const licensedLevels = storage.getLicensedLevels(user.email);
    const isAdmin = storage.isAdmin(user.email);
    res.json({ ...user, licensedLevels, isAdmin });
  });

  app.post("/api/auth/change-password", requireAuth, (req, res) => {
    const user = req.user as any;
    const b = z.object({ newPassword: z.string().min(6) }).safeParse(req.body);
    
    if (!b.success) {
      return res.status(400).json({ error: "Password must be at least 6 characters." });
    }

    const ok = storage.resetUserPassword(user.email, b.data.newPassword);
    if (!ok) return res.status(500).json({ error: "Failed to update password." });
    
    res.json({ ok: true });
  });

  // ── 3. SETTINGS, CHAT, & E-COMMERCE ──────────────────────────
  app.get("/api/licenses", requireAuth, (req, res) => {
    const user = req.user as any;
    const licensedLevels = storage.getLicensedLevels(user.email);
    res.json({ purchases: [], licensedLevels }); 
  });

  app.get("/api/settings", requireAuth, async (req, res) => {
    try {
      const user = req.user as any;
      const s = await Promise.resolve(storage.getApiSettings(user.id));
      if (!s || !s.apiKey) return res.json(null);
      
      res.json({
        provider: s.baseUrl?.includes("deepseek") ? "deepseek" 
                  : s.baseUrl?.includes("groq") ? "groq" 
                  : s.baseUrl?.includes("mistral") ? "mistral" 
                  : "custom",
        apiKeyPreview: s.apiKey.substring(0, 8) + "...",
        baseUrl: s.baseUrl,
        model: s.model
      });
    } catch (e) {
      res.json(null);
    }
  });

  app.post("/api/settings", requireAuth, async (req, res) => {
    try {
      const user = req.user as any;
      const safeData = {
        apiKey: req.body.apiKey || "",
        baseUrl: req.body.baseUrl || req.body.baseURL || "",
        model: req.body.model || "",
        provider: req.body.provider || "custom"
      };

      await Promise.resolve(storage.saveApiSettings(user.id, safeData));
      
      res.json({ 
        ok: true, 
        success: true,
        provider: safeData.provider,
        apiKeyPreview: safeData.apiKey ? safeData.apiKey.substring(0, 8) + "..." : "",
        baseUrl: safeData.baseUrl,
        model: safeData.model
      });
    } catch (err: any) {
      console.error("Save Error:", err);
      res.json({ ok: true, success: true, provider: req.body.provider || "custom", apiKeyPreview: "Saved...", baseUrl: req.body.baseUrl || "", model: req.body.model || "" });
    }
  });

  app.post("/api/settings/test", requireAuth, async (req, res) => {
    try {
      const user = req.user as any;
      const { apiKey = "", baseUrl = "", model = "", customPrompt } = req.body;
      const finalUrlFromReq = baseUrl || req.body.baseURL || "";

      let testApiKey = apiKey;
      let testBaseUrl = finalUrlFromReq;
      let testModel = model;

      if (!testApiKey) {
        const savedSettings = storage.getApiSettings(user.id);
        if (!savedSettings || !savedSettings.apiKey) {
          throw new Error("No API key provided or saved. Please add one in Settings.");
        }
        testApiKey = savedSettings.apiKey;
        testBaseUrl = savedSettings.baseUrl || "";
        testModel = savedSettings.model || "";
      }

      if (!testModel && testBaseUrl.includes("deepseek")) testModel = "deepseek-chat";

      const client = new OpenAI({ apiKey: testApiKey, baseURL: testBaseUrl || undefined });
      const promptToUse = customPrompt || "Ping";
      const maxTokens = customPrompt ? 4000 : 5;

      const response = await client.chat.completions.create({
        model: testModel || "gpt-3.5-turbo",
        messages: [{ role: "user", content: promptToUse }],
        max_tokens: maxTokens,
      });

      const replyText = response.choices[0]?.message?.content || "";
      res.json({ success: true, message: "Connection successful", response: replyText });
    } catch (err: any) {
      console.error("Test Connection Error:", err.message);
      res.status(400).json({ success: false, error: err.message });
    }
  });

  // ── GET /api/chat/usage ───────────────────────────────────────
  app.get("/api/chat/usage", requireAuth, (req, res) => {
    const user = req.user as any;
    const settings = storage.getApiSettings(user.id);
    res.json({
      byok:      !!(settings?.apiKey),
      chat:      { used: getUsage(user.id, "chat"),      limit: DAILY_LIMITS.chat },
      promptlab: { used: getUsage(user.id, "promptlab"), limit: DAILY_LIMITS.promptlab },
    });
  });

  // ── POST /api/chat ────────────────────────────────────────────
  app.post("/api/chat", requireAuth, async (req, res) => {
    try {
      const user = req.user as any;
      const settings = await Promise.resolve(storage.getApiSettings(user.id));
      const hasByok = !!(settings?.apiKey);
      const type: "chat" | "promptlab" = req.body.type === "promptlab" ? "promptlab" : "chat";

      // Daily limit check (built-in only)
      if (!hasByok) {
        const used = getUsage(user.id, type);
        const limit = DAILY_LIMITS[type];
        if (used >= limit) {
          return res.status(429).json({
            error: "daily_limit_reached",
            type,
            used,
            limit,
            message: `You've used all ${limit} free ${type === "promptlab" ? "PromptLab runs" : "AI Coach messages"} for today. Add your own API key in Settings for unlimited use, or come back tomorrow.`,
          });
        }
      }

      res.setHeader("Content-Type", "text/plain; charset=utf-8");

      let messages = req.body.messages || [];
      const dayContext = req.body.dayContext || "You are a helpful AI assistant focused on agentic AI and multi-agent systems.";
      if (messages.length === 0 && req.body.prompt) {
        messages = [{ role: "user", content: req.body.prompt }];
      }

      // Topic lock for built-in AI
      const topicLock = hasByok ? "" :
        "\n\nIMPORTANT: You are a focused lesson coach. Only answer questions directly related to today's agentic AI and multi-agent systems lesson topic and tasks. Politely redirect off-topic questions back to the lesson.";
      const finalSystemPrompt = dayContext + topicLock;

      // Resolve credentials
      let apiKey: string, baseURL: string | undefined, model: string;
      if (hasByok) {
        apiKey  = settings!.apiKey;
        baseURL = settings!.baseUrl || undefined;
        model   = settings!.model || (settings!.baseUrl?.includes("deepseek") ? "deepseek-chat" : "gpt-3.5-turbo");
      } else {
        const builtInKey = process.env.DEEPSEEK_API_KEY;
        if (!builtInKey) {
          return res.status(503).json({ error: "Built-in AI is not configured. Please add your own API key in Settings." });
        }
        apiKey  = builtInKey;
        baseURL = "https://api.deepseek.com";
        model   = "deepseek-chat";
      }

      const client = new OpenAI({ apiKey, baseURL });
      const stream = await client.chat.completions.create({
        model,
        messages: [{ role: "system", content: finalSystemPrompt }, ...messages],
        stream: true,
      });

      for await (const chunk of stream) {
        const text = chunk.choices[0]?.delta?.content;
        if (text) res.write(text);
      }
      res.end();

      // Increment after successful stream (built-in only)
      if (!hasByok) incrementUsage(user.id, type);

    } catch (err: any) {
      res.write(`\n\n[API Connection Error: ${err.message}]`);
      res.end();
    }
  });

  // ── 4. ADMIN ROUTES ───────────────────────────────────────────
  app.get("/api/admin/dashboard", requireAuth, requireAdmin, (req, res) => {
    res.json(storage.getAllMembersData());
  });

  app.post("/api/admin/grant", requireAuth, requireAdmin, (req, res) => {
    const b = z.object({ email: z.string().email(), level: z.string() }).safeParse(req.body);
    if (!b.success) return res.status(400).json({ error: "Invalid input" });

    storage.recordPurchase(b.data.email, b.data.level, "admin_grant_" + Date.now(), null, 0);
    res.json({ ok: true });
  });

  app.post("/api/admin/reset-password", requireAuth, requireAdmin, (req, res) => {
    const b = z.object({ email: z.string().email(), newPassword: z.string().min(6) }).safeParse(req.body);
    if (!b.success) return res.status(400).json({ error: "Invalid input" });
    
    const ok = storage.resetUserPassword(b.data.email, b.data.newPassword);
    if (!ok) return res.status(404).json({ error: "User not found" });
    res.json({ ok: true });
  });

  // ── 5. DAILY PROGRESS ──────────────────────────────────────
  app.get("/api/progress", requireAuth, (req, res) => {
    const user = req.user as any;
    res.json(storage.getAllProgress(user.id));
  });

  // Handles "L1-7", "L2-14"
  app.post("/api/progress/:level-:day", requireAuth, (req, res) => {
    const user = req.user as any;
    const b = z.object({ completed: z.boolean() }).safeParse(req.body);
    if (!b.success) return res.status(400).json({ error: "Invalid input" });
    const dayId = `${req.params.level}-${req.params.day}`;
    res.json(storage.setDayComplete(user.id, dayId, b.data.completed));
  });

  // Fallback: any single-segment param
  app.post("/api/progress/:dayParam", requireAuth, (req, res) => {
    const user = req.user as any;
    const b = z.object({ completed: z.boolean() }).safeParse(req.body);
    if (!b.success) return res.status(400).json({ error: "Invalid input" });
    res.json(storage.setDayComplete(user.id, req.params.dayParam, b.data.completed));
  });

  // ── DELETE API SETTINGS ──────────────────────────────────────
  app.delete("/api/settings", requireAuth, (req, res) => {
    try {
      const user = req.user as any;
      storage.deleteApiSettings(user.id);
      res.json({ ok: true });
    } catch (err) {
      res.status(500).json({ error: "Failed to remove API key." });
    }
  });

  // ── REMOVE USER (admin) ───────────────────────────────────────
  app.post("/api/admin/remove-user", requireAuth, requireAdmin, (req, res) => {
    const b = z.object({ email: z.string().email() }).safeParse(req.body);
    if (!b.success) return res.status(400).json({ error: "Invalid input" });
    const admin = req.user as any;
    if (b.data.email.toLowerCase() === admin.email.toLowerCase()) {
      return res.status(400).json({ error: "You cannot delete your own account." });
    }
    storage.deleteUser(b.data.email);
    res.json({ ok: true });
  });

  // ── REVIEWS ──────────────────────────────────────────────────
  app.get("/api/reviews", (req, res) => {
    res.json(storage.getApprovedReviews());
  });

  app.post("/api/reviews/submit", (req, res) => {
    const b = z.object({
      name: z.string().min(1),
      email: z.string().email(),
      review: z.string().min(1),
      rating: z.number().int().min(1).max(5),
    }).safeParse(req.body);
    if (!b.success) return res.status(400).json({ error: "Invalid input" });
    storage.submitReview(b.data.name, b.data.email, b.data.review, b.data.rating);
    res.json({ ok: true });
  });

  app.get("/api/admin/reviews", requireAuth, requireAdmin, (req, res) => {
    res.json(storage.getAllReviews());
  });

  app.post("/api/admin/reviews/approve", requireAuth, requireAdmin, (req, res) => {
    const b = z.object({ id: z.number().int() }).safeParse(req.body);
    if (!b.success) return res.status(400).json({ error: "Invalid input" });
    const ok = storage.approveReview(b.data.id);
    if (!ok) return res.status(404).json({ error: "Review not found" });
    res.json({ ok: true });
  });

  app.post("/api/admin/reviews/delete", requireAuth, requireAdmin, (req, res) => {
    const b = z.object({ id: z.number().int() }).safeParse(req.body);
    if (!b.success) return res.status(400).json({ error: "Invalid input" });
    const ok = storage.deleteReview(b.data.id);
    if (!ok) return res.status(404).json({ error: "Review not found" });
    res.json({ ok: true });
  });

  // ── STRIPE CHECKOUT ────────────────────────────────────────────
  app.post("/api/stripe/checkout", requireAuth, async (req, res) => {
    const b = z.object({ plan: z.string() }).safeParse(req.body);
    const user = req.user as any;
    if (!user?.email) return res.status(401).json({ error: "Not logged in. Please log in and try again." });
    try {
      const planKey = b.data?.plan || "bundle";
      const priceInfo = PRICES[planKey] || PRICES["bundle"];
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        customer_email: user.email,
        line_items: [{ price_data: { currency: "usd", product_data: { name: priceInfo.label }, unit_amount: priceInfo.amount }, quantity: 1 }],
        mode: "payment",
        success_url: `${APP_URL}/#/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${APP_URL}/#/pricing`,
        metadata: { level: planKey, email: user.email },
      });
      res.json({ url: session.url });
    } catch (err: any) {
      console.error("[stripe] checkout error:", err);
      res.status(500).json({ error: err.message });
    }
  });

  // ── STRIPE WEBHOOK ─────────────────────────────────────────────
  app.post("/api/webhook", async (req: any, res) => {
    const sig = req.headers["stripe-signature"];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    let event: any;
    try {
      if (!webhookSecret) throw new Error("Missing STRIPE_WEBHOOK_SECRET");
      event = stripe.webhooks.constructEvent(req.rawBody, sig as string, webhookSecret);
    } catch (err: any) { return res.status(400).send(`Webhook Error: ${err.message}`); }
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as any;
      const level = session.metadata?.level || "bundle";
      const email = session.customer_email;
      if (email) storage.recordPurchase(email, level, session.id, session.payment_intent as string | null, session.amount_total || 0);
    }
    res.json({ received: true });
  });

  // ── VERIFY LICENSE ─────────────────────────────────────────────
  app.post("/api/auth/verify-license", (req, res) => {
    const b = z.object({
      email: z.string().email(),
      password: z.string(),
      level: z.string(),
    }).safeParse(req.body);
    if (!b.success) return res.status(400).json({ error: "Invalid input" });

    const levels = storage.getLicensedLevels(b.data.email);
    if (levels.includes(b.data.level) || levels.includes("bundle")) {
      return res.json({ ok: true, licensedLevels: levels });
    }
    return res.status(403).json({
      error: `No Level ${b.data.level} license found for this email.`,
      purchaseUrl: "/#/pricing",
    });
  });

  // ========== CONTACT FORM (Resend) ==========
  // ⚠️  Requires RESEND_API_KEY in Railway environment variables
  app.post("/api/contact", async (req, res) => {
    const b = z.object({
      name:    z.string().min(1).max(100),
      email:   z.string().email(),
      message: z.string().min(1).max(5000),
    }).safeParse(req.body);
    if (!b.success) return res.status(400).json({ error: "Invalid input. Please fill in all fields." });

    const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
    if (!RESEND_API_KEY) {
      console.error("Missing RESEND_API_KEY env var");
      return res.status(500).json({ error: "Server email config missing. Please email support@aisprint.app directly." });
    }
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { "Authorization": `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from:     "AI Sprint Agentic <noreply@aisprint.app>",
          to:       ["support@aisprint.app"],
          reply_to: b.data.email,
          subject:  `[Agentic Course] Message from ${b.data.name}`,
          html: `<h2>New Contact Form — Agentic AI Course</h2>
            <p><strong>Name:</strong> ${b.data.name}</p>
            <p><strong>Email:</strong> <a href="mailto:${b.data.email}">${b.data.email}</a></p>
            <hr/>
            <p><strong>Message:</strong></p>
            <p style="white-space:pre-wrap">${b.data.message}</p>
            <hr/>
            <p style="color:#888;font-size:12px">Sent via Agentic AI course contact form · aisprint.app</p>`,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        console.error("Resend error:", data);
        return res.status(500).json({ error: "Failed to send. Please email support@aisprint.app directly." });
      }
      res.json({ ok: true });
    } catch (err: any) {
      console.error("Contact route error:", err);
      res.status(500).json({ error: "Network error. Please email support@aisprint.app directly." });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}