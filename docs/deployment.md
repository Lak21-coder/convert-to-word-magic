# Production deployment — Ryklo web

## Droplet

| Field | Value |
|-------|-------|
| Name | `ryklo-web` |
| Region | Bangalore (`blr1`) |
| Size | `s-1vcpu-512mb-10gb` ($4/mo) |
| IP | **167.71.229.13** (droplet) |
| Reserved IP | **168.144.0.15** ← use this in DNS |
| OS | Ubuntu 24.04 |
| SSH | `ssh -i ~/.ssh/id_ed25519 root@167.71.229.13` |

## Layout on server

- Frontend: `/var/www/ryklo/frontend`
- Backend: `/opt/ryklo/backend` (PM2 process `ryklo-api` on port 3001)
- Nginx: proxies `/api` and `/health` → Node; serves static site at `/`

## Verified

- `http://168.144.0.15/` → 200 (reserved IP)
- `http://168.144.0.15/health` → ok
- Contact API → saved to Google Sheets

## DNS (required for SSL) — GoDaddy

Domain nameservers: `ns77.domaincontrol.com` / `ns78.domaincontrol.com` (GoDaddy).

1. Open GoDaddy → **My Products** → **DNS** for `ryklotechnologies.com`.
2. Remove or edit existing **A** / **CNAME** records that point the apex/`www` to GitHub Pages.
3. Add / set:

| Type | Name | Value | TTL |
|------|------|-------|-----|
| A | `@` | `168.144.0.15` | 600 (or default) |
| A | `www` | `168.144.0.15` | 600 |

4. Wait until `dig +short ryklotechnologies.com` returns `168.144.0.15`.
5. Issue cert (already done):

```bash
ssh -i ~/.ssh/id_ed25519 root@167.71.229.13 \
  "certbot --nginx -d ryklotechnologies.com -d www.ryklotechnologies.com \
   --non-interactive --agree-tos -m ryklotechnologies@gmail.com --redirect"
```

## SSL status

- Live: https://ryklotechnologies.com and https://www.ryklotechnologies.com
- Expires: 2026-10-09 (certbot auto-renew enabled)
- HTTP → HTTPS redirect: enabled

## CI/CD (GitHub Actions → droplet)

On every push to `main` (and manual **Actions → Deploy to DigitalOcean → Run workflow**):

1. Rsync `frontend/` → `/var/www/ryklo/frontend`
2. Rsync `backend/` → `/opt/ryklo/backend` (does **not** overwrite server `.env`)
3. `npm install` + `pm2 restart ryklo-api`

### Secrets (already set)

| Secret | Purpose |
|--------|---------|
| `DEPLOY_HOST` | `168.144.0.15` |
| `DEPLOY_USER` | `root` |
| `DEPLOY_SSH_KEY` | Deploy-only SSH private key |

GitHub Pages has been disabled; production is this droplet only.
