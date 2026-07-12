require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { saveContact, saveRegistration, saveEnrollment } = require("./sheets");

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

    await saveContact(data);
    return res.status(201).json({ ok: true, message: "Contact saved." });
  } catch (err) {
    console.error("Contact error:", err.message);
    const status = err.code === 403 || /permission/i.test(err.message)
      ? 403
      : 500;
    return res.status(status).json({
      error:
        status === 403
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

    await saveRegistration(data);
    return res.status(201).json({ ok: true, message: "Registration saved." });
  } catch (err) {
    console.error("Register error:", err.message);
    const status = err.code === 403 || /permission/i.test(err.message)
      ? 403
      : 500;
    return res.status(status).json({
      error:
        status === 403
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

    await saveEnrollment(data);
    return res.status(201).json({ ok: true, message: "Enrollment saved." });
  } catch (err) {
    console.error("Enroll error:", err.message);
    const status =
      err.code === 403 || /permission/i.test(err.message) ? 403 : 500;
    return res.status(status).json({
      error:
        status === 403
          ? "Google Sheet permission denied. Share the sheet with the service account as Editor."
          : "Failed to save enrollment.",
    });
  }
});

app.use((_req, res) => {
  res.status(404).json({ error: "Not found." });
});

app.listen(PORT, () => {
  console.log(`Ryklo backend listening on port ${PORT}`);
});
