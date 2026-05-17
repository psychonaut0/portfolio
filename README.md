# portfolio

Personal portfolio site — Next.js 16 (App Router, standalone output).

Deployed to `portfolio.ncsp.dev` from `ghcr.io/psychonaut0/portfolio:latest`
on `ct-portfolio` in the home-lab fleet (see the `infra` repo).

## Local dev

```bash
pnpm install
pnpm dev
```

## Build the container

```bash
docker compose build
docker compose up -d
curl -fsS http://localhost:3000/
```

## CI / release

Every push to `main` builds and publishes `:latest` + `:sha-<short>`.
Tags `vX.Y.Z` publish `:vX.Y.Z`. Deploy is pinned by the image tag in the
infra repo's `stacks/ct-portfolio/docker-compose.yml`.
