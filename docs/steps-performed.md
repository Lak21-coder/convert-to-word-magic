# Steps performed — Ryklo web

Chronological record of work done on this project. For live server details, see [deployment.md](./deployment.md). For the original requirements notes, see [deployment setup first time.txt](./deployment%20setup%20first%20time.txt).

---

## 1. Backend: contact & registration APIs

**Goal:** Node/Express API that saves form submissions to Google Sheets.

**Done:**

1. Created `backend/` with Express server (`src/server.js`) and Sheets helper (`src/sheets.js`).
2. Endpoints:
   - `GET /health`
   - `POST /api/contact` — name, email, message (required); company (optional)
   - `POST /api/register` — name, email (required); company, phone, interest, notes (optional)
3. Documented Google Sheets one-time setup in `backend/README.md`:
   - Create GCP project → enable Sheets API → service account + JSON key
   - Create Sheet → share with service account as Editor
   - Fill `backend/.env` from `.env.example` (sheet ID + service account fields)
4. Tabs `Contacts` / `Registrations` are created automatically on first write (headers included).

---

## 2. Frontend ↔ API wiring

**Goal:** Static site forms post to the backend instead of dead ends.

**Done:**

1. Moved site assets under `frontend/` (`index.html`, `styles.css`, `script.js`, SEO files).
2. Contact (and registration, where present) forms call `${API_BASE}/api/...`.
3. In production, Nginx proxies `/api` and `/health` to the Node process on port `3001`.

---

## 3. DigitalOcean droplet (Bangalore, $4)

**Goal:** Host FE + BE on a DO droplet with Nginx.

**Done:**

1. Created droplet `ryklo-web` in Bangalore (`blr1`), size `s-1vcpu-512mb-10gb`, Ubuntu 24.04.
2. Droplet IP: `167.71.229.13` (SSH: `ssh -i ~/.ssh/id_ed25519 root@167.71.229.13`).
3. Layout on server:
   - Frontend → `/var/www/ryklo/frontend`
   - Backend → `/opt/ryklo/backend` (PM2 process `ryklo-api`, port 3001)
   - Nginx → static site at `/`; reverse proxy for `/api` and `/health`
4. Verified site and health over HTTP on the droplet/reserved IP.

---

## 4. Reserved IP

**Goal:** Stable public IP for DNS (not tied only to the ephemeral droplet IP).

**Done:**

1. Created and assigned reserved IP **`168.144.0.15`** to `ryklo-web`.
2. Use this IP in GoDaddy A records (not `167.71.229.13`).

---

## 5. DNS (GoDaddy) + SSL (Let’s Encrypt)

**Goal:** Point `ryklotechnologies.com` at the droplet and enable HTTPS.

**Done:**

1. Pointed apex and `www` A records to `168.144.0.15` (removed GitHub Pages targets).
2. Issued cert with Certbot (Nginx plugin) for `ryklotechnologies.com` and `www`.
3. HTTP → HTTPS redirect enabled; cert auto-renew via Certbot (expires 2026-10-09 at time of setup).
4. Live: https://ryklotechnologies.com and https://www.ryklotechnologies.com

---

## 6. CI/CD: GitHub Actions → droplet (replaced GitHub Pages)

**Goal:** Deploy on push to `main` instead of publishing to GitHub Pages.

**Done:**

1. Added `.github/workflows/deploy.yml`.
2. On push to `main` (or manual workflow dispatch):
   - Rsync `frontend/` → `/var/www/ryklo/frontend`
   - Rsync `backend/` → `/opt/ryklo/backend` (does **not** overwrite server `.env`)
   - `npm install` + `pm2 restart ryklo-api`
3. Set GitHub secrets: `DEPLOY_HOST`, `DEPLOY_USER`, `DEPLOY_SSH_KEY`.
4. Disabled GitHub Pages; production is the droplet only.
5. Fixed deploy health-check race after PM2 restart (follow-up commit).

---

## 7. Site content updates

### Phone

- Contact section phone updated to **+91 998877 6644**.

### Headquarters address (2026-07-11)

Replaced the placeholder San Francisco address with the Pune office address in:

1. **Visible contact block** (`frontend/index.html` → Headquarters)
2. **JSON-LD Organization** `PostalAddress`
3. **JSON-LD ProfessionalService** `PostalAddress`

**Address set to:**

```
S.N 48/1/1/3, Anand Park, Dhanori Road,
Near Saibaba Mandir, Bhairav Nagar, Pune City,
Dighi Camp PO, Pune, Maharashtra-411015
```

Structured data fields used:

| Field | Value |
|-------|--------|
| `streetAddress` | S.N 48/1/1/3, Anand Park, Dhanori Road, Near Saibaba Mandir, Bhairav Nagar |
| `addressLocality` | Pune |
| `addressRegion` | Maharashtra |
| `postalCode` | 411015 |
| `addressCountry` | IN |

Also set `areaServed` to `India` on the ProfessionalService schema.

---

## Quick reference

| Item | Value |
|------|--------|
| Production URL | https://ryklotechnologies.com |
| Reserved IP | 168.144.0.15 |
| Droplet IP | 167.71.229.13 |
| Deploy | Push to `main` → GitHub Actions |
| Forms data | Google Sheets via backend |
| Full deploy notes | [deployment.md](./deployment.md) |
