# Night Garden Go

An interactive tutorial for the game of Go. Two characters — Hoshi (Black)
and Tsuki (White) — play teaching games on a 9×9 board in a lantern-lit
night garden, explaining every move. At key moments, you click the board
and play the move yourself.

## Live

https://codeforcandy.github.io/grok-go/

## Run

```bash
npm install
npm run dev
```

## Test

```bash
npm test
```

## Deploy (GitHub Pages)

```bash
npm run deploy
```

Pushes the `dist/` build to the `gh-pages` branch. The site is served at
`https://<username>.github.io/grok-go/` (Vite `base` is `/grok-go/`).

Twelve lessons across two chapters:

- **Chapter 1 — The Rules:** board basics, capture, connection, life & death, ko, scoring
- **Chapter 2 — Playing to Win:** corners first, enclosures, invasion, false eyes, capturing races, seki

Built with TypeScript + Canvas 2D. No runtime dependencies.
The rules engine in `src/engine/` is pure and reusable; lessons in
`src/lessons/` are plain data replayed through it.