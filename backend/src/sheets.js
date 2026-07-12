const { google } = require("googleapis");

let sheetsClient = null;

function getAuth() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const spreadsheetId = process.env.GOOGLE_SHEETS_ID;

  if (!email || !privateKey || !spreadsheetId) {
    throw new Error(
      "Missing Google Sheets config. Set GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY, and GOOGLE_SHEETS_ID."
    );
  }

  const auth = new google.auth.JWT({
    email,
    key: privateKey,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  return { auth, spreadsheetId };
}

function getSheets() {
  if (!sheetsClient) {
    const { auth } = getAuth();
    sheetsClient = google.sheets({ version: "v4", auth });
  }
  return sheetsClient;
}

function getSpreadsheetId() {
  return getAuth().spreadsheetId;
}

/**
 * Append a row to a named sheet tab. Creates the tab with headers if missing.
 */
async function appendRow(sheetName, headers, values) {
  const sheets = getSheets();
  const spreadsheetId = getSpreadsheetId();

  await ensureSheetWithHeaders(sheets, spreadsheetId, sheetName, headers);

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${sheetName}!A:Z`,
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [values],
    },
  });
}

async function ensureSheetWithHeaders(sheets, spreadsheetId, sheetName, headers) {
  const meta = await sheets.spreadsheets.get({
    spreadsheetId,
    fields: "sheets.properties.title",
  });

  const exists = (meta.data.sheets || []).some(
    (s) => s.properties?.title === sheetName
  );

  if (!exists) {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId,
      requestBody: {
        requests: [{ addSheet: { properties: { title: sheetName } } }],
      },
    });

    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${sheetName}!A1`,
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [headers] },
    });
    return;
  }

  const existing = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${sheetName}!A1:Z1`,
  });

  const hasHeaders =
    existing.data.values &&
    existing.data.values[0] &&
    existing.data.values[0].length > 0;

  if (!hasHeaders) {
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: `${sheetName}!A1`,
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [headers] },
    });
  }
}

const CONTACT_HEADERS = [
  "Timestamp",
  "Name",
  "Email",
  "Company",
  "Message",
];

const REGISTER_HEADERS = [
  "Timestamp",
  "Name",
  "Email",
  "Company",
  "Phone",
  "Interest",
  "Notes",
];

const ENROLL_HEADERS = [
  "Timestamp",
  "Name",
  "Email",
  "Phone",
  "Course",
  "Sessions",
  "Hours",
  "Fee (INR)",
  "Batch",
  "Start Date",
];

async function saveContact({ name, email, company, message }) {
  const sheetName = process.env.SHEET_CONTACTS || "Contacts";
  await appendRow(sheetName, CONTACT_HEADERS, [
    new Date().toISOString(),
    name,
    email,
    company || "",
    message,
  ]);
}

async function saveRegistration({
  name,
  email,
  company,
  phone,
  interest,
  notes,
}) {
  const sheetName = process.env.SHEET_REGISTRATIONS || "Registrations";
  await appendRow(sheetName, REGISTER_HEADERS, [
    new Date().toISOString(),
    name,
    email,
    company || "",
    phone || "",
    interest || "",
    notes || "",
  ]);
}

async function saveEnrollment({
  name,
  email,
  phone,
  course,
  sessions,
  hours,
  fee,
  batch,
  startDate,
}) {
  const sheetName = process.env.SHEET_ENROLLMENTS || "Enrollments";
  await appendRow(sheetName, ENROLL_HEADERS, [
    new Date().toISOString(),
    name,
    email,
    phone || "",
    course,
    sessions ?? "",
    hours ?? "",
    fee ?? "",
    batch || "",
    startDate || "",
  ]);
}

module.exports = {
  saveContact,
  saveRegistration,
  saveEnrollment,
};
