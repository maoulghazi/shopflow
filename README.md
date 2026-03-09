# ShopFlow 🛍️

A full-stack e-commerce storefront built for DevOps practice.

## Stack
- **Frontend**: Next.js 14 (App Router) + Tailwind CSS
- **API**: Express.js + Prisma ORM
- **Database**: PostgreSQL
- **Containerization**: Docker + Docker Compose

## Project Structure
```
shopflow/
├── frontend/         # Next.js app
├── api/              # Express REST API
├── infra/
│   └── docker/       # Dockerfiles
├── docker-compose.yml
└── docker-compose.prod.yml
```

## Getting Started (Local Dev without Docker)
```bash
npm run install:all
# Set up your .env files (see .env.example in each folder)
npm run dev
```

## Getting Started (Docker)
```bash
docker-compose up --build
```
Services:
- Frontend: http://localhost:3000
- API:      http://localhost:4000
- DB:       postgres://localhost:5432

## DevOps Roadmap
- [x] Phase 1 — App
- [ ] Phase 2 — Docker & Docker Compose
- [ ] Phase 3 — CI/CD (GitHub Actions)
- [ ] Phase 4 — Terraform (AWS infra)
- [ ] Phase 5 — Kubernetes (EKS)
- [ ] Phase 6 — Monitoring (Prometheus + Grafana)
- [ ] Phase 7 — Security (IAM, Secrets Manager, Trivy)
