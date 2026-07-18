# Ryklo Backend

Simple Node/Express API that stores **Contact** and **Registration** form submissions in Google Sheets.

## Endpoints

| Method | Path | Body |
|--------|------|------|
| `GET` | `/health` | — |
| `POST` | `/api/contact` | `name`, `email`, `message` (required); `company` (optional) |
| `POST` | `/api/register` | `name`, `email` (required); `company`, `phone`, `interest`, `notes` (optional) |
| `POST` | `/api/enroll` | `name`, `email`, `phone`, `course`, `batch`, `startDate` (required); `sessions`, `hours`, `fee` (optional) |

Submissions are written to Google Sheets. If Sheets is unavailable (bad credentials, permission error, etc.), the API still succeeds and stores a local JSONL copy under `backend/data/` so forms keep working.

## Local run

```bash
cd backend
cp .env.example .env
# fill in Google credentials (see below)
npm install
npm run dev
```

Server defaults to `http://localhost:3001`.

### Quick test

```bash
curl -s http://localhost:3001/health

curl -s -X POST http://localhost:3001/api/contact \
  -H 'Content-Type: application/json' \
  -d '{"name":"Jane","email":"jane@example.com","company":"Acme","message":"Hello"}'

curl -s -X POST http://localhost:3001/api/register \
  -H 'Content-Type: application/json' \
  -d '{"name":"Jane","email":"jane@example.com","company":"Acme","phone":"+1 555 0100","interest":"Maximo MAS"}'
```

---

## Google Sheets setup (one-time)

### 1. Create a Google Cloud project

1. Open [Google Cloud Console](https://console.cloud.google.com/).
2. Create a new project (e.g. `ryklo-forms`) or select an existing one.

### 2. Enable the Google Sheets API

1. Go to **APIs & Services → Library**.
2. Search for **Google Sheets API**.
3. Click **Enable**.

### 3. Create a service account

1. Go to **APIs & Services → Credentials**.
2. Click **Create credentials → Service account**.
3. Name it (e.g. `ryklo-sheets-writer`) and finish creation.
4. Open the service account → **Keys** tab → **Add key → Create new key → JSON**.
5. Download the JSON file and keep it private (do not commit it).

From the JSON you will need:

- `client_email` → `GOOGLE_SERVICE_ACCOUNT_EMAIL`
- `private_key` → `GOOGLE_PRIVATE_KEY` (keep the `\n` characters; wrap the whole value in double quotes in `.env`)

### 4. Create the spreadsheet

1. Create a new Google Sheet (any name, e.g. `Ryklo Form Submissions`).
2. Copy the spreadsheet ID from the URL:

   `https://docs.google.com/spreadsheets/d/`**`SPREADSHEET_ID`**`/edit`

3. Put that ID in `.env` as `GOOGLE_SHEETS_ID`.

### 5. Share the sheet with the service account

1. In the Google Sheet, click **Share**.
2. Paste the service account email (`...@....iam.gserviceaccount.com`).
3. Give it **Editor** access.
4. Uncheck “Notify people” and share.

You do **not** need to create the `Contacts` / `Registrations` tabs yourself — the API creates them and writes header rows on the first submission.

### 6. Fill `.env`

```env
GOOGLE_SHEETS_ID=...
GOOGLE_SERVICE_ACCOUNT_EMAIL=...@....iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIE...\n-----END PRIVATE KEY-----\n"
```

Then restart the server and send a test `curl` (see above). You should see a new row in the sheet.

---

## Sheet columns

**Contacts:** Timestamp, Name, Email, Company, Message  

**Registrations:** Timestamp, Name, Email, Company, Phone, Interest, Notes

---

## Deploy note

DigitalOcean droplet / `doctl` deployment will be set up in the next step once you provide droplet details.
