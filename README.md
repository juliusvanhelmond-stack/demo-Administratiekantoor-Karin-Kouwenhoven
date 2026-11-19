# Demo: Administratiekantoor Karin Kouwenhoven

Vrijblijvende redesign-demo van JUNEStudio. Zie **[DEMO_NOTES.md](./DEMO_NOTES.md)** voor het concept, de bronnen, de rechten, de tests en wat er vóór livegang bevestigd moet worden.

```bash
npm install
npm run dev          # http://localhost:3000
npm run build && npx next start -p 3100
node tests/e2e.cjs   # Playwright-checks tegen http://localhost:3100 (BASE=... om te wijzigen)
```
