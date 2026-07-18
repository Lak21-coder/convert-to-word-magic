require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { saveContact, saveRegistration, saveEnrollment } = require("./sheets");
const { appendLocal } = require("./localStore");

const app = express();
const PORT = process.env.PORT || 3001;

const allowedOrigins = (process.env.CORS_ORIGINS || "")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins.length
      ? (origin, callback) => {
          if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
          } else {
            callback(new Error("Not allowed by CORS"));
          }
        }
      : true,
  })
);

app.use(express.json({ limit: "32kb" }));

function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function isValidEmail(value) {
  return typeof value === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function trimFields(body, keys) {
  const out = {};
  for (const key of keys) {
    out[key] =
      typeof body[key] === "string" ? body[key].trim() : body[key] ?? "";
  }
  return out;
}

function sheetsStatus(err) {
  if (err.code === "CONFIG") return 503;
  if (err.code === 403 || /permission/i.test(err.message || "")) return 403;
  return 500;
}

/**
 * Prefer Google Sheets; if that fails, persist locally so the form still works.
 */
async function persist(collection, sheetsSave, record) {
  try {
    await sheetsSave(record);
    return { ok: true, storage: "sheets" };
  } catch (sheetsErr) {
    console.error(`[${collection}] Sheets save failed:`, sheetsErr.message);
    try {
      const filePath = appendLocal(collection, {
        sheetsError: sheetsErr.message,
        ...record,
      });
      console.warn(`[${collection}] Saved locally at ${filePath}`);
      return { ok: true, storage: "local", warning: sheetsErr.message };
    } catch (localErr) {
      console.error(`[${collection}] Local fallback failed:`, localErr.message);
      const err = new Error(sheetsErr.message || "Failed to save submission.");
      err.status = sheetsStatus(sheetsErr);
      throw err;
    }
  }
}

app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "ryklo-backend" });
});

app.post("/api/contact", async (req, res) => {
  try {
    const data = trimFields(req.body || {}, [
      "name",
      "email",
      "company",
      "message",
    ]);

    if (!isNonEmptyString(data.name)) {
      return res.status(400).json({ error: "Name is required." });
    }
    if (!isValidEmail(data.email)) {
      return res.status(400).json({ error: "A valid email is required." });
    }
    if (!isNonEmptyString(data.message)) {
      return res.status(400).json({ error: "Message is required." });
    }

    const result = await persist("contacts", saveContact, data);
    return res.status(201).json({
      ok: true,
      message: "Contact saved.",
      storage: result.storage,
    });
  } catch (err) {
    console.error("Contact error:", err.message);
    return res.status(err.status || 500).json({
      error:
        err.status === 403
          ? "Google Sheet permission denied. Share the sheet with the service account as Editor."
          : "Failed to save contact form.",
    });
  }
});

app.post("/api/register", async (req, res) => {
  try {
    const data = trimFields(req.body || {}, [
      "name",
      "email",
      "company",
      "phone",
      "interest",
      "notes",
    ]);

    if (!isNonEmptyString(data.name)) {
      return res.status(400).json({ error: "Name is required." });
    }
    if (!isValidEmail(data.email)) {
      return res.status(400).json({ error: "A valid email is required." });
    }

    const result = await persist("registrations", saveRegistration, data);
    return res.status(201).json({
      ok: true,
      message: "Registration saved.",
      storage: result.storage,
    });
  } catch (err) {
    console.error("Register error:", err.message);
    return res.status(err.status || 500).json({
      error:
        err.status === 403
          ? "Google Sheet permission denied. Share the sheet with the service account as Editor."
          : "Failed to save registration.",
    });
  }
});

app.post("/api/enroll", async (req, res) => {
  try {
    const data = trimFields(req.body || {}, [
      "name",
      "email",
      "phone",
      "course",
      "batch",
      "startDate",
    ]);
    data.sessions = req.body?.sessions ?? "";
    data.hours = req.body?.hours ?? "";
    data.fee = req.body?.fee ?? "";

    if (!isNonEmptyString(data.name)) {
      return res.status(400).json({ error: "Name is required." });
    }
    if (!isValidEmail(data.email)) {
      return res.status(400).json({ error: "A valid email is required." });
    }
    if (!isNonEmptyString(data.phone)) {
      return res.status(400).json({ error: "Phone number is required." });
    }
    if (!isNonEmptyString(data.course)) {
      return res.status(400).json({ error: "Please select a course." });
    }
    if (!isNonEmptyString(data.batch)) {
      return res.status(400).json({ error: "Please select a batch." });
    }
    if (!isNonEmptyString(data.startDate)) {
      return res.status(400).json({ error: "Please choose a start date." });
    }

    const result = await persist("enrollments", saveEnrollment, data);
    return res.status(201).json({
      ok: true,
      message: "Enrollment saved.",
      storage: result.storage,
    });
  } catch (err) {
    console.error("Enroll error:", err.message);
    return res.status(err.status || 500).json({
      error:
        err.status === 403
          ? "Google Sheet permission denied. Share the sheet with the service account as Editor."
          : "Failed to save enrollment.",
    });
  }
});

// Always return JSON for API clients (avoids HTML SyntaxError pages).
app.use((err, _req, res, next) => {
  if (res.headersSent) return next(err);
  if (err instanceof SyntaxError && "body" in err) {
    return res.status(400).json({ error: "Invalid JSON body." });
  }
  console.error("Unhandled error:", err.message);
  return res.status(500).json({ error: "Internal server error." });
});

app.use((_req, res) => {
  res.status(404).json({ error: "Not found." });
});

app.listen(PORT, () => {
  console.log(`Ryklo backend listening on port ${PORT}`);
});
