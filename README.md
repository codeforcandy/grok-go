# Night Garden Go

An interactive tutorial for the game of Go. Two characters — Hoshi (Black)
and Tsuki (White) — play teaching games on a 9×9 board in a lantern-lit
night garden, explaining every move. At key moments, you click the board
and play the move yourself.

## Run

```bash
npm install
npm run dev
```

## Test

```bash
npm test
```

Six lessons: the board, liberties & capture, connection & cutting,
life & death, ko, and a complete counted game.

Built with TypeScript + Canvas 2D. No runtime dependencies.
The rules engine in `src/engine/` is pure and reusable; lessons in
`src/lessons/` are plain data replayed through it.