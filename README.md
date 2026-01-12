🔒 FINAL BASELINE — Cloudflare Workers Redirects

Status: ✅ CONFIRMED WORKING  
Version: v1.0.0  
Change policy: ❌ DO NOT MODIFY unless re-audited

---

## Purpose
This repository provides a hardened, production-safe baseline for handling
vanity subdomain redirects using **Cloudflare Workers**.

It replaces Cloudflare Redirect Rules limits and avoids origin leakage.

---

## Architecture
User → Cloudflare Edge → Worker → 301 Redirect → Target URL

- Origin server is never contacted
- Hostinger / backend IPs remain hidden
- Unlimited redirects supported

---

## DNS Requirements
For every vanity subdomain:

- Type: `A`
- Value: `192.0.2.1`
- Proxy: ✅ Proxied (orange cloud)
- TTL: Auto

⚠ Do not use numeric-leading subdomains (e.g. `4k.`).  
Use `desi4k`, `tv4k`, etc.

---

## Worker Route
Attach the Worker to:
.yourdomain.com/

> Optional: A sample redirect mapping is provided in `redirects.example.json`
> for documentation and future reference. The active configuration lives in
> `worker.js`.




yaml

---

## HTTPS Policy
- `Always Use HTTPS`: ❌ OFF
- `Automatic HTTPS Rewrites`: ✅ ON
- HTTPS enforced **only** for main site (`rkdutta.com`)

---

## Security Guarantees
- No origin IP exposure
- No Hostinger headers leaked
- Unknown subdomains return 404
- Cloudflare Free plan compatible

---

## Release
Tag: `v1.0.0`  
This baseline is production locked.
