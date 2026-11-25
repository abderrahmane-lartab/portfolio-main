import https from "node:https";
import {
  abderrahmaneProfile,
  buildAssistantSystemPrompt,
} from "../src/data/abderrahmaneProfile.js";

const DEFAULT_GEMINI_MODEL = "gemini-3.5-flash-lite";
const FALLBACK_GEMINI_MODELS = [
  "gemini-3.5-flash-lite",
  "gemini-flash-lite-latest",
  "gemini-3.1-flash-lite",
  "gemini-3-flash-preview",
  "gemini-3.5-flash",
];

const MAX_MESSAGE_LENGTH = 1000;
const MAX_HISTORY_TURNS = 10;

function detectLanguage(text) {
  if (/[\u0600-\u06FF]/.test(text)) return "ar";
  if (
    /\b(bonjour|salut|projet|compétence|formation|expérience|disponib|comment|parle|quel|quelle|est-il|qui est|a-t-il)\b/i.test(
      text
    )
  ) {
    return "fr";
  }
  return "en";
}

function outOfScopeReply(lang) {
  if (lang === "ar") {
    return "عذراً، لا يمكنني الإجابة عن أسئلة خارج نطاق البورتفوليو. يمكنك سؤالي عن مشاريع عبد الرحمان، مهاراته التقنية، دراسته أو خبراته!";
  }
  if (lang === "fr") {
    return "Désolé, je ne peux pas répondre aux questions en dehors du portfolio. N'hésitez pas à me poser des questions sur les projets, compétences, formations ou expériences d'Abderrahmane !";
  }
  return "Sorry, I can't answer questions outside the portfolio. Feel free to ask me about Abderrahmane's projects, technical skills, education, or experience!";
}

/**
 * IPv4-first HTTPS POST helper for Google Generative Language API.
 * Avoids Node fetch/undici IPv6 timeouts on Linux networks while staying dependency-free.
 */
function postGeminiJson(model, apiKey, payload) {
  const path = `/v1beta/models/${encodeURIComponent(
    model
  )}:generateContent?key=${encodeURIComponent(apiKey)}`;
  const bodyStr = JSON.stringify(payload);

  return new Promise((resolve, reject) => {
    const req = https.request(
      {
        hostname: "generativelanguage.googleapis.com",
        path,
        method: "POST",
        family: 4,
        timeout: 12000,
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(bodyStr),
        },
      },
      (res) => {
        let raw = "";
        res.setEncoding("utf8");
        res.on("data", (chunk) => {
          raw += chunk;
        });
        res.on("end", () => {
          let parsed = null;
          try {
            parsed = JSON.parse(raw || "{}");
          } catch {
            parsed = null;
          }
          resolve({
            status: res.statusCode || 500,
            data: parsed,
            raw,
          });
        });
      }
    );

    req.on("timeout", () => {
      req.destroy(new Error("Gemini request timed out"));
    });
    req.on("error", (err) => reject(err));
    req.write(bodyStr);
    req.end();
  });
}

/**
 * Conversational offline fallback (used ONLY if every Gemini model is unreachable).
 */
function buildGroundedFallbackReply(message) {
  const q = message.toLowerCase().trim();
  const lang = detectLanguage(message);
  const {
    identity,
    education,
    experience,
    skills,
    projects,
    certifications,
    careerObjectives,
    contact,
  } = abderrahmaneProfile;

  const isYesNo =
    /^(did|does|has|is|can|do|est-ce|a-t-il|هل)\b/i.test(q) ||
    /\b(is abderrahmane|did abderrahmane|has abderrahmane)\b/i.test(q);

  if (
    /^(hi|hello|hey|salam|slm|bonjour|salut|bonsoir|good morning|good evening|مرحبا|السلام عليكم)[!?. ]*$/i.test(
      q
    )
  ) {
    if (lang === "ar") {
      return `مرحباً! أنا المساعد الشخصي لبورتفوليو **${identity.fullName}** (${identity.role}). كيف يمكنني مساعدتك؟`;
    }
    if (lang === "fr") {
      return `Bonjour ! Je suis l'assistant du portfolio d'**${identity.fullName}** (${identity.role}). Que souhaitez-vous savoir sur ses projets ou compétences ?`;
    }
    return `Hello! I'm **${identity.fullName}'s** portfolio assistant. Feel free to ask me anything about his AI & Full Stack projects, skills, education, or experience!`;
  }

  // ML / AI / Deep Learning / Computer Vision project questions
  if (
    (/project|projet|built|work|did|made|مشروع|مشاريع/i.test(q) &&
      /machine learning|\bml\b|deep learning|\bai\b|\bia\b|vision|data/i.test(q)) ||
    /machine learning project|ml project|ai project/i.test(q)
  ) {
    const mlProjects = projects.slice(0, 3);
    const intro = isYesNo
      ? "Yes, Abderrahmane has worked on several Machine Learning, Deep Learning, and Data Engineering projects:"
      : "Abderrahmane has worked on the following Machine Learning and AI projects:";
    return `${intro}\n\n${mlProjects
      .map((p) => `• **${p.name}:** ${p.summary}`)
      .join("\n")}`;
  }

  if (q.includes("brain") || q.includes("tumor") || q.includes("mri") || q.includes("yolo") || q.includes("googlenet")) {
    const p = projects.find((item) => item.name.includes("Brain Tumor"));
    return `${isYesNo ? "Yes — " : ""}**${p.name}** is ${p.summary}\n\n• **Technologies:** ${p.technologies.join(", ")}`;
  }

  if (q.includes("dataco") || q.includes("recengine") || q.includes("forecast") || q.includes("azure")) {
    const p = projects.find((item) => item.name.includes("DataCo"));
    return `${isYesNo ? "Yes — " : ""}**${p.name}:** ${p.summary}`;
  }

  if (q.includes("churn") || q.includes("telco") || q.includes("knn")) {
    const p = projects.find((item) => item.name.includes("Telco"));
    return `${isYesNo ? "Yes — " : ""}**${p.name}:** ${p.summary}`;
  }

  if (/project|projet|portfolio|built|réalis|مشاريع|مشروع/i.test(q)) {
    const list = projects
      .map((p) => `• **${p.name}:** ${p.summary}`)
      .join("\n");
    return `Here are **${identity.fullName}'s** projects:\n\n${list}`;
  }

  if (
    /skill|stack|tech|compétence|outil|tool|frontend|backend|python|react|laravel|fastapi|typescript|ai|ml|ia|machine learning|deep learning|computer vision|data|cloud|docker|linux|database|sql|mongo|مهارات|تقنيات/i.test(
      q
    )
  ) {
    return `Here is **${identity.fullName}'s** technical stack:\n\n• **AI & Machine Learning:** ${skills.aiAndMl.join(", ")}\n• **Data Engineering & Cloud:** ${skills.dataEngineeringAndCloud.join(", ")}\n• **Frontend:** ${skills.frontend.join(", ")}\n• **Backend:** ${skills.backend.join(", ")}\n• **Databases:** ${skills.databases.join(", ")}\n• **Tools:** ${skills.tools.join(", ")}`;
  }

  if (
    /educat|study|studi|school|youcode|ofppt|isag|lycée|bac|diplom|degree|formation|études|دراسة|تعليم/i.test(
      q
    )
  ) {
    const eduList = education
      .map(
        (e) =>
          `• **${e.title}** (${e.period}${e.status ? ` | ${e.status}` : ""})${
            e.program ? ` — ${e.program}` : ""
          }${e.details ? `: ${e.details}` : ""}`
      )
      .join("\n");
    return `**Education:**\n\n${eduList}`;
  }

  if (/experien|intern|stage|brt|work history|خبرة|تدريب/i.test(q)) {
    const exp = experience[0];
    return `**Professional Experience:**\n\n• **${exp.title} – ${exp.organization}** (${exp.period}): ${exp.details}`;
  }

  if (/certif|course|google ai|meta|udemy|ibm|boolean|شهادات/i.test(q)) {
    return `**Certifications:**\n\n${certifications.map((c) => `• ${c}`).join("\n")}`;
  }

  if (
    /availab|hire|recruit|opportunit|goal|objective|career|disponib|objectif|carrière|متاح|أهداف/i.test(
      q
    )
  ) {
    return `**Availability & Career Objectives:**\n\n• ${careerObjectives.opportunities}\n• **Long-term goal:** ${careerObjectives.longTermGoal}\n\nYou can reach Abderrahmane at **${contact.email}**.`;
  }

  if (/contact|email|mail|linkedin|github|reach|location|casablanca|morocco|تواصل/i.test(q)) {
    return `**Contact (${identity.location}):**\n\n• **Email:** ${contact.email}\n• **LinkedIn:** ${contact.linkedin}\n• **GitHub:** ${contact.github}`;
  }

  if (/who|about|abderrahmane|lartab|introduce|profile|bio|qui est|من هو|نبذة/i.test(q)) {
    return `**${identity.fullName}** is a **${identity.role}** based in **${identity.location}**, currently studying in the **YouCode – AI Developer Program (2026–2027)** after completing Full Stack Web Development at **OFPPT – ISAG Lalla Aicha (2024–2026)** and interning at **BRT Solutions**.`;
  }

  return outOfScopeReply(lang);
}

/**
 * Handles a chat request securely on the server using Google Gemini API,
 * cascading across active Gemini Flash models if one hits rate/quota limits.
 */
export async function handleChatRequest(payload, env = process.env) {
  const rawMessage =
    typeof payload?.message === "string" ? payload.message.trim() : "";
  if (!rawMessage) {
    return {
      status: 400,
      body: { error: "Please enter a message before sending." },
    };
  }

  const message = rawMessage.slice(0, MAX_MESSAGE_LENGTH);
  const rawHistory = Array.isArray(payload?.history) ? payload.history : [];
  const safeHistory = rawHistory
    .slice(-MAX_HISTORY_TURNS)
    .filter(
      (item) =>
        item &&
        (item.role === "user" || item.role === "assistant") &&
        typeof item.content === "string" &&
        item.content.trim().length > 0
    )
    .map((item) => ({
      role: item.role === "assistant" ? "model" : "user",
      parts: [{ text: item.content.slice(0, MAX_MESSAGE_LENGTH) }],
    }));

  const apiKey = env?.GEMINI_API_KEY?.trim();
  if (!apiKey) {
    return {
      status: 200,
      body: {
        reply: buildGroundedFallbackReply(message),
        source: "profile-knowledge",
      },
    };
  }

  const preferredModel = env?.GEMINI_MODEL?.trim() || DEFAULT_GEMINI_MODEL;
  const candidateModels = [
    ...new Set([preferredModel, ...FALLBACK_GEMINI_MODELS]),
  ];

  const requestBody = {
    system_instruction: {
      parts: [{ text: buildAssistantSystemPrompt() }],
    },
    contents: [
      ...safeHistory,
      {
        role: "user",
        parts: [{ text: message }],
      },
    ],
    generationConfig: {
      temperature: 0.35,
      topP: 0.9,
      maxOutputTokens: 900,
    },
  };

  for (const model of candidateModels) {
    try {
      const response = await postGeminiJson(model, apiKey, requestBody);

      if (response.status >= 200 && response.status < 300) {
        const parts = response.data?.candidates?.[0]?.content?.parts || [];
        const reply = parts
          .filter((part) => !part.thought)
          .map((part) => part.text || "")
          .join("")
          .trim();

        if (reply) {
          return {
            status: 200,
            body: {
              reply,
              source: "gemini",
              model,
            },
          };
        }
      } else {
        console.warn(
          `[Gemini model ${model} returned ${response.status}] trying next model...`
        );
      }
    } catch (error) {
      console.warn(
        `[Gemini model ${model} network error]`,
        error?.message || error
      );
    }
  }

  return {
    status: 200,
    body: {
      reply: buildGroundedFallbackReply(message),
      source: "profile-knowledge",
    },
  };
}
