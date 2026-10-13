# Deploying to Cloudflare Pages

The site is a fully static Next.js export (`output: "export"` in `next.config.ts`).
`npm run build` writes plain HTML/CSS/JS to `out/`, and Cloudflare Pages serves that folder.
No Workers, no server runtime.

## 1. Push to GitHub

The repo already points at `https://github.com/mal49/miniature-octo-enigma`.

```bash
git add -A
git commit -m "Static export for Cloudflare Pages"
git push origin main
```

`out/`, `.next/`, `node_modules/` and `.env*` are git-ignored. Never commit them.

## 2. Connect the repo in Cloudflare Pages

1. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Authorise the Cloudflare GitHub app and pick `mal49/miniature-octo-enigma`.
3. Enter the build settings below, then **Save and Deploy**.

## 3. Build settings

| Setting | Value |
|---|---|
| Framework preset | Next.js (Static HTML Export) |
| Production branch | `main` |
| Build command | `npm run build` |
| Build output directory | `out` |
| Root directory | *(leave empty — repo root)* |

Node: the Pages v2/v3 build image defaults to Node 22, which Next.js 16 supports (needs ≥ 20.9).
To pin it, add an environment variable `NODE_VERSION = 22`.

Cloudflare detects `package-lock.json` and runs `npm clean-install` automatically before the build.

## 4. Automatic deployments

- Every push to `main` triggers a **production** deployment.
- Every push to any other branch, and every pull request, gets a **preview** deployment at `https://<hash>.<project>.pages.dev`, linked from the PR.
- To pause builds or limit preview branches: project → **Settings** → **Builds & deployments**.
- To roll back: project → **Deployments** → pick an older deployment → **Rollback to this deployment**.

## 5. Custom domain

1. Project → **Custom domains** → **Set up a custom domain**.
2. Enter `www.ikhmalhanif.xyz` (the URL used for `metadataBase` in `app/layout.tsx`).
3. If the domain's DNS is on Cloudflare, the CNAME record is created for you. If not, add a
   `CNAME www → <project>.pages.dev` record at your DNS provider.
4. For the bare domain (`ikhmalhanif.xyz`), the zone must be on Cloudflare. Add it as a second
   custom domain, or use a Redirect Rule to send it to `www`.

SSL certificates are issued automatically.

## 6. Environment variables

The site currently reads no environment variables. If you add some later:

- Set them in project → **Settings** → **Environment variables**, separately for Production and Preview.
- In a static export they are only available **at build time**. Anything prefixed `NEXT_PUBLIC_`
  is inlined into the public JavaScript, so it's visible to every visitor. Never put secrets in
  `NEXT_PUBLIC_*` variables, and never in a committed file. Use `.env.local` for local dev (git-ignored).
- Secret keys (payment gateways, APIs) need a server. Static export has none; use a Pages Function
  or a separate Worker for that.

## 7. Headers

Security headers (CSP, X-Frame-Options, etc.) and long-term caching for `/_next/static/*` are set in
`public/_headers`. Next.js's `headers()` config doesn't run in a static export; Cloudflare Pages reads
`_headers` from the output folder instead. Edit that file to change them.

## 8. Troubleshooting

| Symptom | Fix |
|---|---|
| Build fails on `npm clean-install` with `ERESOLVE` | `package.json` and `package-lock.json` are out of sync. Run `npm install` locally, commit the updated lockfile. Don't use `--force` / `--legacy-peer-deps`. |
| Build fails with "Node.js version >= 20.9 is required" | Set `NODE_VERSION = 22` in environment variables and retry. |
| "Output directory `out` not found" | The build command isn't `npm run build`, or `output: "export"` was removed from `next.config.ts`. |
| Error mentioning `headers`, `rewrites`, API routes, `cookies()`, Server Actions or middleware | Those need a server and aren't supported by static export. Remove the feature or move it to a Pages Function. |
| New dynamic route fails with "missing generateStaticParams" | Every `[param]` route must export `generateStaticParams()` listing all values (see `app/policies/[slug]/page.tsx`). |
| Page works locally but 404s on Pages | Check the file exists in `out/` after a local `npm run build`. Paths are case-sensitive on Cloudflare. |
| Headers not applied | Confirm `out/_headers` exists after the build and check the format in Cloudflare's `_headers` docs. |

Build logs: project → **Deployments** → click the failed deployment → **View build log**.

Check a build locally before pushing:

```bash
npm ci
npm run build
```

Then serve `out/` with any static server (for example `python -m http.server 3100 -d out`).
