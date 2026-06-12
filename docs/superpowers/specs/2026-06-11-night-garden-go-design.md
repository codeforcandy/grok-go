# Night Garden Go — Design

**Date:** 2026-06-11
**Status:** Approved for planning

## Overview

A single-screen, browser-based tutorial that teaches the game of Go (the board
game) to a beginner. Two characters — **Hoshi (Black)**, a bold attacker, and
**Tsuki (White)**, a patient defender — play scripted teaching games on a 9×9
board. Every move comes with commentary in their voices (plus a Narrator)
explaining *why* the move was played. At key moments the lesson pauses with a
"you try" quiz: the learner clicks an intersection and a real rules engine
validates the answer.

The visual identity is a **Zen night garden**, rendered in **2D top-down** on
Canvas: a lantern-lit wooden board floating in deep indigo, glowing stones,
ember particles on capture, drifting fireflies.

## Goals

- Teach a complete beginner the core rules and first concepts of Go.
- Make every move's reasoning explicit and readable.
- Be artistically beautiful — calm, cinematic, warm.
- Active learning: short quizzes with real-rules feedback, not hard-coded answers.

## Non-Goals (v1)

- 19×19 board, SGF import, AI opponents, free-play mode.
- Full sound design (a soft stone-click sound is a stretch goal, off by default).
- Mobile-first layout (desktop-first; must not break on tablets).

## Curriculum (6 lessons)

1. **The Board** — intersections, placing stones, alternating turns, star points.
2. **Liberties & Capture** — liberties, atari, capturing a single stone and a group.
3. **Connection & Cutting** — groups share liberties; cutting weakens.
4. **Life & Death** — why two eyes live; a dead shape.
5. **Ko** — the repetition rule, why it exists, a small ko fight.
6. **A Real Game** — a complete short 9×9 game; counting territory and captures
   to decide the winner.

Each lesson is a small staged position or mini-game with 8–20 steps and 1–3
quizzes. Lessons unlock in order but can be revisited freely.

## Architecture

Stack: **Vite + TypeScript**, zero runtime dependencies. Static site output.
Code style: 2-space indent, single quotes, functional patterns where natural.

```
src/
  engine/    Pure rules of Go. No DOM, no rendering imports.
  lessons/   Lesson data files + shared step types.
  render/    Canvas 2D renderer + animation/particle system.
  ui/        HTML/CSS overlay: panel, lesson chips, controls.
  app/       Orchestrator wiring engine → render → ui.
```

### engine/

Pure TypeScript, fully unit-tested.

- `Board` — immutable-ish state: 9×9 grid of `empty | black | white`,
  captures count per player, ko point, move history.
- Operations: `play(board, color, point)` returns a new board or a typed
  illegal-move reason (`occupied`, `suicide`, `ko`).
- Group/liberty computation (flood fill), capture removal.
- Simple ko rule (forbid immediate recapture of single stone).
- `territory(board)` — flood-fill territory count for the scoring lesson
  (area surrounded exclusively by one color; neutral otherwise). Chinese-style
  counting is not needed; lesson 6 uses territory + captures (Japanese style)
  on a clean final position so the simple algorithm is sufficient.

### lessons/

A lesson is data, replayed through the engine — board states are always
derived, never hand-encoded. A validator test replays every lesson and fails
if any scripted move is illegal.

```ts
type Step =
  | { kind: 'note'; speaker: Speaker; title?: string; text: string; focus?: Point[] }
  | { kind: 'move'; point: Point; speaker: Speaker; text: string }
  | { kind: 'quiz'; prompt: string; accept: Point[]; hint: string;
      explainCorrect: string; explainWrong: string;
      nearMisses?: { point: Point; text: string }[] }
  | { kind: 'highlight'; points: Point[]; style: 'glow' | 'territory-black' | 'territory-white'; text: string };

type Speaker = 'hoshi' | 'tsuki' | 'narrator';
```

(Exact shape may be refined during planning; the invariant is: moves carry
commentary, quizzes carry accepted answers + feedback text, and all of it is
plain data.)

Move color is implicit from alternation unless a lesson sets up a position
with explicit colors in a `setup` field on the lesson.

### render/

Single full-window `<canvas>`, layered draw each frame via
`requestAnimationFrame` (idle frames are cheap; only particles/animations
force redraws — static board renders are cached to an offscreen canvas).

Layers, back to front:
1. Night background — radial indigo gradient, subtle vignette.
2. Board — warm wood gradient + procedural grain, soft outer glow, grid
   lines, star points.
3. Stones — radial-gradient shading; white stones get a faint warm halo.
4. Effects — additive-composited glow layer: placement ripple, capture
   embers (stones dissolve into rising amber particles), firefly drift,
   quiz shimmer on candidate intersections, last-move ring.

Animations: stone placement (scale-in + light ripple, ~400 ms), capture
(ember dissolve, ~800 ms), focus hint (dim everything outside the action
area, used instead of camera moves).

### ui/

DOM overlay over the canvas (matches approved mockup):
- **Right panel** — frosted glass: lesson label, step title, speaker
  avatars (black stone / white stone / amber dot for Narrator), commentary
  text. Go terms in commentary render highlighted (amber, dotted underline)
  with a tooltip definition.
- **Left chips** — lesson list, current highlighted, completed checked.
- **Bottom transport** — first / prev / next / autoplay buttons, move counter.
  Autoplay advances on a timer (~3.5 s per step, pausing at quizzes).
- Keyboard: ←/→ steps, space toggles autoplay.

### app/

- Holds current lesson + step index; derives board state by replaying moves
  through the engine up to the current step (cheap at 9×9 scale — makes
  prev/next trivially correct).
- Quiz mode: canvas click → nearest intersection → checked against `accept`
  list → success (stone animates in, `explainCorrect` shown) or gentle
  miss (`explainWrong` / hint shown, learner tries again). Quizzes never
  block: after two misses, a "show me" button reveals the answer.
- Progress (completed lessons) persisted to `localStorage`.

## Visual Design Tokens

- Night background: `#0a0e1f` → `#1b2440` radial.
- Amber accent (glow, terms, UI borders): `#ffd98a`.
- Wood: `#d2a963` → `#96702f` gradient, grid lines `#3b2a12`.
- Panel: `rgba(16, 22, 44, 0.72)`, 1 px border `rgba(255, 217, 138, 0.18)`,
  backdrop blur.
- Type: a humanist serif for titles (e.g., 'Crimson Pro' via system/Google
  fonts), system sans for body. Uppercase letter-spaced labels.

## Error Handling

- Lesson data errors are build-time failures (validator test), not runtime.
- Canvas resize handled via `ResizeObserver`; device-pixel-ratio aware.
- `localStorage` unavailable → progress simply not persisted, no error.

## Testing

- **Vitest** unit tests for `engine/`: liberties, single/group capture,
  suicide, ko, edge-of-board cases, territory counting.
- **Lesson validator test**: replays every lesson; asserts all moves legal,
  all quiz `accept` points are legal moves, final positions match any
  declared expectations (e.g., lesson 6 winner).
- Build smoke test: `vite build` passes in CI/locally.
- Manual visual pass per lesson (animations, panel text, quiz flow).

## Milestones (for planning)

1. Engine + tests.
2. Lesson data format + validator + Lesson 1–2 content.
3. Renderer: board, stones, basic placement animation.
4. UI overlay + step transport + app orchestration.
5. Effects polish: embers, fireflies, ripples, shimmer, focus dim.
6. Lessons 3–6 content + autoplay + progress persistence.
