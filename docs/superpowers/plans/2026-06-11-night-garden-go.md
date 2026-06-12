# Night Garden Go Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** A single-screen browser tutorial that teaches the game of Go: two characters play scripted 9×9 teaching games with per-move commentary, quizzes validated by a real rules engine, rendered as a 2D top-down "zen night garden" on Canvas.

**Architecture:** Pure-TypeScript rules engine (no DOM) replays lesson data files so board states are always derived from real rules. A Canvas 2D renderer draws the night-garden scene with a particle effects layer; a DOM overlay provides the commentary panel, lesson chips, and transport controls. An orchestrator in `app/` wires them together.

**Tech Stack:** Vite + TypeScript (zero runtime dependencies), Vitest for tests. Code style: 2-space indent, single quotes.

**Spec:** `docs/superpowers/specs/2026-06-11-night-garden-go-design.md`

---

## File Structure

```
package.json, tsconfig.json, vite.config.ts, index.html, src/styles.css
src/main.ts                 Bootstrap: create App, start loop
src/engine/types.ts         Color, Cell, Point, Board, PlayResult
src/engine/board.ts         createBoard, neighbors, groupAt, play (captures/suicide/ko)
src/engine/territory.ts     Flood-fill territory counting
src/lessons/types.ts        Step/Lesson types, Speaker
src/lessons/glossary.ts     Go term -> definition map for {{term}} highlighting
src/lessons/replay.ts       stateAfter(lesson, stepIndex) — derive board via engine
src/lessons/lesson1..6.ts   Lesson content (data only)
src/lessons/index.ts        Ordered lesson list
src/render/theme.ts         Color tokens, fonts, layout constants
src/render/geometry.ts      Board rect math, point <-> pixel mapping
src/render/renderer.ts      Canvas scene: background, board, grid, stones, overlays
src/render/effects.ts       Particles: ripples, embers, fireflies, shimmer
src/ui/ui.ts                DOM overlay: panel, chips, transport, glossary tooltips
src/app/app.ts              Orchestrator: navigation, quiz flow, autoplay, progress
tests/engine.test.ts        Engine unit tests
tests/territory.test.ts     Territory tests
tests/replay.test.ts        Replay/alternation tests
tests/lessons.test.ts       Lesson validator (every scripted move legal, quiz rules)
tests/geometry.test.ts      Pixel mapping tests
```

---

### Task 1: Project Scaffold

**Files:**
- Create: `package.json`, `tsconfig.json`, `vite.config.ts`, `index.html`, `src/styles.css`, `src/main.ts`

- [ ] **Step 1: Create package.json**

```json
{
  "name": "night-garden-go",
  "private": true,
  "version": "0.1.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc --noEmit && vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "devDependencies": {
    "typescript": "^5.5.0",
    "vite": "^6.0.0",
    "vitest": "^3.0.0"
  }
}
```

- [ ] **Step 2: Create tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "skipLibCheck": true,
    "isolatedModules": true,
    "noEmit": true
  },
  "include": ["src", "tests"]
}
```

- [ ] **Step 3: Create vite.config.ts**

```ts
import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    include: ['tests/**/*.test.ts'],
    environment: 'node'
  }
} as Parameters<typeof defineConfig>[0]);
```

Note: Vitest reads the `test` key from this config. If `tsc` complains about the `test` property, install types via the triple-slash reference instead: add `/// <reference types="vitest/config" />` at the top and drop the `as` cast.

- [ ] **Step 4: Create minimal index.html**

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Night Garden Go</title>
    <link rel="stylesheet" href="/src/styles.css" />
  </head>
  <body>
    <canvas id="scene"></canvas>
    <main id="overlay"></main>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

- [ ] **Step 5: Create placeholder src/styles.css and src/main.ts**

`src/styles.css`:
```css
* { margin: 0; padding: 0; box-sizing: border-box; }
html, body { height: 100%; overflow: hidden; background: #0a0e1f; }
#scene { position: fixed; inset: 0; width: 100%; height: 100%; }
#overlay { position: fixed; inset: 0; pointer-events: none; }
```

`src/main.ts`:
```ts
console.log('night garden go');
```

- [ ] **Step 6: Install and verify**

Run: `npm install && npm run build && npm test`
Expected: build passes; vitest reports "no test files found" (exit code may be non-zero for no tests — that is fine at this step; confirm with `npx vitest run --passWithNoTests`).

- [ ] **Step 7: Commit**

```bash
git add package.json tsconfig.json vite.config.ts index.html src/ package-lock.json
git commit -m "chore: scaffold vite + typescript + vitest project"
```

### Task 2: Engine — Board, Neighbors, Groups & Liberties

**Files:**
- Create: `src/engine/types.ts`, `src/engine/board.ts`
- Test: `tests/engine.test.ts`

- [ ] **Step 1: Create src/engine/types.ts**

```ts
export type Color = 'black' | 'white';
export type Cell = Color | null;

export interface Point {
  x: number;
  y: number;
}

export interface Board {
  size: number;
  cells: Cell[];
  koPoint: number | null;
  captures: Record<Color, number>;
}

export type IllegalReason = 'off-board' | 'occupied' | 'suicide' | 'ko';

export type PlayResult =
  | { ok: true; board: Board; captured: Point[] }
  | { ok: false; reason: IllegalReason };
```

- [ ] **Step 2: Write failing tests for board basics and groups**

`tests/engine.test.ts`:
```ts
import { describe, expect, it } from 'vitest';
import { createBoard, groupAt, neighbors, toIndex, toPoint } from '../src/engine/board';
import type { Board, Color, Point } from '../src/engine/types';

export function place(board: Board, color: Color, points: Point[]): Board {
  const cells = [...board.cells];
  for (const p of points) cells[toIndex(board.size, p)] = color;
  return { ...board, cells };
}

describe('board basics', () => {
  it('creates an empty 9x9 board', () => {
    const b = createBoard();
    expect(b.size).toBe(9);
    expect(b.cells).toHaveLength(81);
    expect(b.cells.every((c) => c === null)).toBe(true);
    expect(b.captures).toEqual({ black: 0, white: 0 });
    expect(b.koPoint).toBeNull();
  });

  it('maps points to indices and back', () => {
    expect(toIndex(9, { x: 0, y: 0 })).toBe(0);
    expect(toIndex(9, { x: 8, y: 0 })).toBe(8);
    expect(toIndex(9, { x: 0, y: 1 })).toBe(9);
    expect(toPoint(9, 40)).toEqual({ x: 4, y: 4 });
  });

  it('finds 4 neighbors in the center, 2 in the corner, 3 on the edge', () => {
    expect(neighbors(9, toIndex(9, { x: 4, y: 4 }))).toHaveLength(4);
    expect(neighbors(9, toIndex(9, { x: 0, y: 0 }))).toHaveLength(2);
    expect(neighbors(9, toIndex(9, { x: 4, y: 0 }))).toHaveLength(3);
  });
});

describe('groups and liberties', () => {
  it('a lone center stone has 4 liberties', () => {
    const b = place(createBoard(), 'black', [{ x: 4, y: 4 }]);
    const g = groupAt(b, toIndex(9, { x: 4, y: 4 }));
    expect(g?.stones).toHaveLength(1);
    expect(g?.liberties).toHaveLength(4);
  });

  it('a corner stone has 2 liberties', () => {
    const b = place(createBoard(), 'white', [{ x: 0, y: 0 }]);
    const g = groupAt(b, 0);
    expect(g?.liberties).toHaveLength(2);
  });

  it('connected stones form one group and share liberties', () => {
    const b = place(createBoard(), 'black', [
      { x: 4, y: 4 },
      { x: 5, y: 4 }
    ]);
    const g = groupAt(b, toIndex(9, { x: 4, y: 4 }));
    expect(g?.stones).toHaveLength(2);
    expect(g?.liberties).toHaveLength(6);
  });

  it('enemy stones reduce liberties, diagonals do not connect', () => {
    let b = place(createBoard(), 'black', [{ x: 4, y: 4 }, { x: 5, y: 5 }]);
    b = place(b, 'white', [{ x: 4, y: 3 }]);
    const g = groupAt(b, toIndex(9, { x: 4, y: 4 }));
    expect(g?.stones).toHaveLength(1);
    expect(g?.liberties).toHaveLength(3);
  });

  it('returns null for an empty point', () => {
    expect(groupAt(createBoard(), 0)).toBeNull();
  });
});
```

- [ ] **Step 3: Run tests to verify they fail**

Run: `npm test`
Expected: FAIL — cannot resolve `../src/engine/board`.

- [ ] **Step 4: Implement src/engine/board.ts (basics + groupAt only)**

```ts
import type { Board, Color, Point } from './types';

export const opponent = (c: Color): Color => (c === 'black' ? 'white' : 'black');

export function createBoard(size = 9): Board {
  return {
    size,
    cells: Array(size * size).fill(null),
    koPoint: null,
    captures: { black: 0, white: 0 }
  };
}

export const toIndex = (size: number, p: Point): number => p.y * size + p.x;

export const toPoint = (size: number, i: number): Point => ({
  x: i % size,
  y: Math.floor(i / size)
});

export const inBounds = (size: number, p: Point): boolean =>
  p.x >= 0 && p.x < size && p.y >= 0 && p.y < size;

export function neighbors(size: number, i: number): number[] {
  const { x, y } = toPoint(size, i);
  const result: number[] = [];
  if (x > 0) result.push(i - 1);
  if (x < size - 1) result.push(i + 1);
  if (y > 0) result.push(i - size);
  if (y < size - 1) result.push(i + size);
  return result;
}

export interface Group {
  color: Color;
  stones: number[];
  liberties: number[];
}

export function groupAt(board: Board, i: number): Group | null {
  const color = board.cells[i];
  if (color === null) return null;
  const stones: number[] = [];
  const liberties = new Set<number>();
  const seen = new Set<number>([i]);
  const queue = [i];
  while (queue.length > 0) {
    const current = queue.pop()!;
    stones.push(current);
    for (const n of neighbors(board.size, current)) {
      const cell = board.cells[n];
      if (cell === null) {
        liberties.add(n);
      } else if (cell === color && !seen.has(n)) {
        seen.add(n);
        queue.push(n);
      }
    }
  }
  return { color, stones, liberties: [...liberties] };
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `npm test`
Expected: PASS (all `board basics` and `groups and liberties` tests).

- [ ] **Step 6: Commit**

```bash
git add src/engine/ tests/engine.test.ts
git commit -m "feat(engine): board model, neighbors, group and liberty computation"
```

### Task 3: Engine — play() with Captures, Suicide, and Ko

**Files:**
- Modify: `src/engine/board.ts` (append `play`)
- Test: `tests/engine.test.ts` (append)

- [ ] **Step 1: Append failing tests to tests/engine.test.ts**

```ts
import { play } from '../src/engine/board';

describe('play', () => {
  it('places a stone on an empty point', () => {
    const r = play(createBoard(), 'black', { x: 4, y: 4 });
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.board.cells[toIndex(9, { x: 4, y: 4 })]).toBe('black');
      expect(r.captured).toEqual([]);
    }
  });

  it('rejects occupied points and off-board points', () => {
    const b = place(createBoard(), 'black', [{ x: 4, y: 4 }]);
    expect(play(b, 'white', { x: 4, y: 4 })).toEqual({ ok: false, reason: 'occupied' });
    expect(play(b, 'white', { x: 9, y: 0 })).toEqual({ ok: false, reason: 'off-board' });
    expect(play(b, 'white', { x: -1, y: 0 })).toEqual({ ok: false, reason: 'off-board' });
  });

  it('does not mutate the input board', () => {
    const b = createBoard();
    play(b, 'black', { x: 0, y: 0 });
    expect(b.cells.every((c) => c === null)).toBe(true);
  });

  it('captures a single surrounded stone', () => {
    let b = place(createBoard(), 'white', [{ x: 4, y: 4 }]);
    b = place(b, 'black', [{ x: 3, y: 4 }, { x: 5, y: 4 }, { x: 4, y: 3 }]);
    const r = play(b, 'black', { x: 4, y: 5 });
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.captured).toEqual([{ x: 4, y: 4 }]);
      expect(r.board.cells[toIndex(9, { x: 4, y: 4 })]).toBeNull();
      expect(r.board.captures.black).toBe(1);
    }
  });

  it('captures a whole group at once', () => {
    let b = place(createBoard(), 'white', [{ x: 4, y: 4 }, { x: 5, y: 4 }]);
    b = place(b, 'black', [
      { x: 3, y: 4 }, { x: 6, y: 4 },
      { x: 4, y: 3 }, { x: 5, y: 3 },
      { x: 4, y: 5 }
    ]);
    const r = play(b, 'black', { x: 5, y: 5 });
    expect(r.ok).toBe(true);
    if (r.ok) {
      expect(r.captured).toHaveLength(2);
      expect(r.board.captures.black).toBe(2);
    }
  });

  it('captures in the corner with only 2 surrounding stones', () => {
    let b = place(createBoard(), 'white', [{ x: 0, y: 0 }]);
    b = place(b, 'black', [{ x: 1, y: 0 }]);
    const r = play(b, 'black', { x: 0, y: 1 });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.captured).toEqual([{ x: 0, y: 0 }]);
  });

  it('rejects suicide', () => {
    // White surrounds (0,0); black playing there would have no liberties.
    const b = place(createBoard(), 'white', [{ x: 1, y: 0 }, { x: 0, y: 1 }]);
    expect(play(b, 'black', { x: 0, y: 0 })).toEqual({ ok: false, reason: 'suicide' });
  });

  it('allows a self-atari move that captures (not suicide)', () => {
    // Black ring with a one-point gap; white plays into the gap and captures.
    let b = place(createBoard(), 'black', [{ x: 0, y: 0 }]);
    b = place(b, 'white', [{ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 0, y: 2 }]);
    // (0,1) is black's last liberty AND would-be white stone's only opening.
    const r = play(b, 'white', { x: 0, y: 1 });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.captured).toEqual([{ x: 0, y: 0 }]);
  });

  it('forbids immediate ko recapture, then allows it after another move', () => {
    // Classic ko: black (4,3),(3,4),(4,5); white (5,3),(6,4),(5,5) and white on (4,4).
    let b = place(createBoard(), 'black', [{ x: 4, y: 3 }, { x: 3, y: 4 }, { x: 4, y: 5 }]);
    b = place(b, 'white', [{ x: 5, y: 3 }, { x: 6, y: 4 }, { x: 5, y: 5 }, { x: 4, y: 4 }]);

    const take = play(b, 'black', { x: 5, y: 4 });
    expect(take.ok).toBe(true);
    if (!take.ok) return;
    expect(take.captured).toEqual([{ x: 4, y: 4 }]);
    expect(take.board.koPoint).toBe(toIndex(9, { x: 4, y: 4 }));

    // White may not recapture immediately.
    expect(play(take.board, 'white', { x: 4, y: 4 })).toEqual({ ok: false, reason: 'ko' });

    // After white plays elsewhere, the ko point clears.
    const elsewhere = play(take.board, 'white', { x: 0, y: 8 });
    expect(elsewhere.ok).toBe(true);
    if (elsewhere.ok) {
      expect(elsewhere.board.koPoint).toBeNull();
      expect(play(elsewhere.board, 'white', { x: 4, y: 4 }).ok).toBe(true);
    }
  });

  it('multi-stone capture does not set a ko point', () => {
    let b = place(createBoard(), 'white', [{ x: 4, y: 4 }, { x: 5, y: 4 }]);
    b = place(b, 'black', [
      { x: 3, y: 4 }, { x: 6, y: 4 },
      { x: 4, y: 3 }, { x: 5, y: 3 },
      { x: 4, y: 5 }
    ]);
    const r = play(b, 'black', { x: 5, y: 5 });
    expect(r.ok && r.board.koPoint === null).toBe(true);
  });
});
```

- [ ] **Step 2: Run tests to verify the new ones fail**

Run: `npm test`
Expected: FAIL — `play` is not exported.

- [ ] **Step 3: Append play() to src/engine/board.ts**

```ts
import type { Cell, PlayResult } from './types';
// (merge with the existing type imports at the top of the file)

export function play(board: Board, color: Color, p: Point): PlayResult {
  if (!inBounds(board.size, p)) return { ok: false, reason: 'off-board' };
  const i = toIndex(board.size, p);
  if (board.cells[i] !== null) return { ok: false, reason: 'occupied' };
  if (board.koPoint === i) return { ok: false, reason: 'ko' };

  const cells: Cell[] = [...board.cells];
  cells[i] = color;
  const next: Board = { ...board, cells, koPoint: null, captures: { ...board.captures } };

  const captured: number[] = [];
  for (const n of neighbors(board.size, i)) {
    if (next.cells[n] !== opponent(color)) continue;
    const group = groupAt(next, n)!;
    if (group.liberties.length === 0) {
      for (const s of group.stones) {
        next.cells[s] = null;
        captured.push(s);
      }
    }
  }
  next.captures[color] += captured.length;

  const own = groupAt(next, i)!;
  if (captured.length === 0 && own.liberties.length === 0) {
    return { ok: false, reason: 'suicide' };
  }

  if (
    captured.length === 1 &&
    own.stones.length === 1 &&
    own.liberties.length === 1 &&
    own.liberties[0] === captured[0]
  ) {
    next.koPoint = captured[0];
  }

  return { ok: true, board: next, captured: captured.map((c) => toPoint(board.size, c)) };
}
```

Note: the `next.cells[n] !== opponent(color)` guard also skips stones already removed by a previous neighbor's capture in the same move, so no group is captured twice.

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test`
Expected: PASS — all engine tests.

- [ ] **Step 5: Commit**

```bash
git add src/engine/board.ts tests/engine.test.ts
git commit -m "feat(engine): play with captures, suicide rule, and simple ko"
```

---

### Task 4: Engine — Territory Counting

**Files:**
- Create: `src/engine/territory.ts`
- Test: `tests/territory.test.ts`

- [ ] **Step 1: Write failing tests**

`tests/territory.test.ts`:
```ts
import { describe, expect, it } from 'vitest';
import { createBoard, toIndex } from '../src/engine/board';
import { territory } from '../src/engine/territory';
import { place } from './engine.test';

describe('territory', () => {
  it('empty board is all neutral', () => {
    const t = territory(createBoard());
    expect(t).toMatchObject({ black: 0, white: 0, neutral: 81 });
  });

  it('a full-height black wall on x=3 and white wall on x=5 split the board', () => {
    let b = createBoard();
    const blackWall = Array.from({ length: 9 }, (_, y) => ({ x: 3, y }));
    const whiteWall = Array.from({ length: 9 }, (_, y) => ({ x: 5, y }));
    b = place(b, 'black', blackWall);
    b = place(b, 'white', whiteWall);
    const t = territory(b);
    expect(t.black).toBe(27); // columns 0-2
    expect(t.white).toBe(27); // columns 6-8
    expect(t.neutral).toBe(9); // column 4 touches both walls
    expect(t.ownerOf.get(toIndex(9, { x: 0, y: 0 }))).toBe('black');
    expect(t.ownerOf.get(toIndex(9, { x: 4, y: 4 }))).toBe('neutral');
    expect(t.ownerOf.get(toIndex(9, { x: 8, y: 8 }))).toBe('white');
  });

  it('a region touching only one color belongs to that color', () => {
    // Black stones sealing the (0,0) corner point.
    const b = place(createBoard(), 'black', [{ x: 1, y: 0 }, { x: 0, y: 1 }]);
    const t = territory(b);
    expect(t.ownerOf.get(0)).toBe('black');
    expect(t.black).toBe(1);
    expect(t.neutral).toBe(78);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test`
Expected: FAIL — cannot resolve `../src/engine/territory`.

- [ ] **Step 3: Implement src/engine/territory.ts**

```ts
import { neighbors } from './board';
import type { Board, Color } from './types';

export interface Territory {
  black: number;
  white: number;
  neutral: number;
  ownerOf: Map<number, Color | 'neutral'>;
}

export function territory(board: Board): Territory {
  const result: Territory = { black: 0, white: 0, neutral: 0, ownerOf: new Map() };
  const seen = new Set<number>();

  for (let i = 0; i < board.cells.length; i++) {
    if (board.cells[i] !== null || seen.has(i)) continue;

    const region: number[] = [];
    const borders = new Set<Color>();
    const queue = [i];
    seen.add(i);
    while (queue.length > 0) {
      const current = queue.pop()!;
      region.push(current);
      for (const n of neighbors(board.size, current)) {
        const cell = board.cells[n];
        if (cell === null) {
          if (!seen.has(n)) {
            seen.add(n);
            queue.push(n);
          }
        } else {
          borders.add(cell);
        }
      }
    }

    const owner: Color | 'neutral' = borders.size === 1 ? [...borders][0] : 'neutral';
    for (const r of region) result.ownerOf.set(r, owner);
    if (owner === 'neutral') result.neutral += region.length;
    else result[owner] += region.length;
  }

  return result;
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/engine/territory.ts tests/territory.test.ts
git commit -m "feat(engine): flood-fill territory counting"
```

### Task 5: Lesson Types and Replay

**Files:**
- Create: `src/lessons/types.ts`, `src/lessons/replay.ts`
- Test: `tests/replay.test.ts`

- [ ] **Step 1: Create src/lessons/types.ts**

```ts
import type { Color, Point } from '../engine/types';

export type Speaker = 'hoshi' | 'tsuki' | 'narrator';

export interface NoteStep {
  kind: 'note';
  speaker: Speaker;
  title?: string;
  text: string;
  focus?: Point[];
}

export interface MoveStep {
  kind: 'move';
  point: Point;
  speaker: Speaker;
  title?: string;
  text: string;
}

export interface QuizStep {
  kind: 'quiz';
  title?: string;
  prompt: string;
  accept: Point[];
  hint: string;
  explainCorrect: string;
  explainWrong: string;
  nearMisses?: { point: Point; text: string }[];
}

export interface HighlightStep {
  kind: 'highlight';
  points: Point[];
  style: 'glow' | 'territory-black' | 'territory-white';
  speaker?: Speaker;
  title?: string;
  text: string;
}

export type Step = NoteStep | MoveStep | QuizStep | HighlightStep;

export interface Lesson {
  id: string;
  title: string;
  setup?: { black: Point[]; white: Point[] };
  firstToPlay: Color;
  steps: Step[];
}
```

- [ ] **Step 2: Write failing tests for replay**

`tests/replay.test.ts`:
```ts
import { describe, expect, it } from 'vitest';
import { toIndex } from '../src/engine/board';
import { stateAfter } from '../src/lessons/replay';
import type { Lesson } from '../src/lessons/types';

const lesson: Lesson = {
  id: 'test',
  title: 'Test',
  setup: { black: [{ x: 3, y: 4 }, { x: 5, y: 4 }], white: [{ x: 4, y: 4 }] },
  firstToPlay: 'black',
  steps: [
    { kind: 'note', speaker: 'narrator', text: 'intro' },
    { kind: 'move', point: { x: 4, y: 3 }, speaker: 'hoshi', text: 'closing in' },
    { kind: 'move', point: { x: 0, y: 0 }, speaker: 'tsuki', text: 'elsewhere' },
    {
      kind: 'quiz',
      prompt: 'capture',
      accept: [{ x: 4, y: 5 }],
      hint: 'last liberty',
      explainCorrect: 'yes',
      explainWrong: 'no'
    },
    { kind: 'note', speaker: 'narrator', text: 'done' }
  ]
};

describe('stateAfter', () => {
  it('index -1 returns the setup position with no moves', () => {
    const s = stateAfter(lesson, -1);
    expect(s.board.cells[toIndex(9, { x: 4, y: 4 })]).toBe('white');
    expect(s.toPlay).toBe('black');
    expect(s.lastMove).toBeNull();
  });

  it('notes do not consume turns', () => {
    const s = stateAfter(lesson, 0);
    expect(s.toPlay).toBe('black');
  });

  it('moves alternate colors starting from firstToPlay', () => {
    const after1 = stateAfter(lesson, 1);
    expect(after1.board.cells[toIndex(9, { x: 4, y: 3 })]).toBe('black');
    expect(after1.toPlay).toBe('white');
    const after2 = stateAfter(lesson, 2);
    expect(after2.board.cells[toIndex(9, { x: 0, y: 0 })]).toBe('white');
    expect(after2.toPlay).toBe('black');
  });

  it('a quiz consumes a turn and places its canonical (first) accept point', () => {
    const s = stateAfter(lesson, 3);
    expect(s.board.cells[toIndex(9, { x: 4, y: 5 })]).toBe('black');
    expect(s.board.cells[toIndex(9, { x: 4, y: 4 })]).toBeNull(); // captured
    expect(s.lastCaptured).toEqual([{ x: 4, y: 4 }]);
    expect(s.toPlay).toBe('white');
  });

  it('throws on an illegal scripted move', () => {
    const bad: Lesson = {
      ...lesson,
      steps: [{ kind: 'move', point: { x: 4, y: 4 }, speaker: 'hoshi', text: 'occupied!' }]
    };
    expect(() => stateAfter(bad, 0)).toThrow(/illegal/i);
  });
});
```

- [ ] **Step 3: Run tests to verify they fail**

Run: `npm test`
Expected: FAIL — cannot resolve `../src/lessons/replay`.

- [ ] **Step 4: Implement src/lessons/replay.ts**

```ts
import { createBoard, opponent, play, toIndex } from '../engine/board';
import type { Board, Color, Point } from '../engine/types';
import type { Lesson, Step } from './types';

export interface DerivedState {
  board: Board;
  toPlay: Color;
  lastMove: Point | null;
  lastCaptured: Point[];
}

const consumesTurn = (s: Step): boolean => s.kind === 'move' || s.kind === 'quiz';

function setupBoard(lesson: Lesson): Board {
  const board = createBoard();
  if (!lesson.setup) return board;
  const cells = [...board.cells];
  for (const p of lesson.setup.black) cells[toIndex(board.size, p)] = 'black';
  for (const p of lesson.setup.white) cells[toIndex(board.size, p)] = 'white';
  return { ...board, cells };
}

/**
 * Board state after applying steps 0..stepIndex (inclusive).
 * Pass -1 for the setup-only position. Quiz steps place their first
 * accept point (the canonical answer). Throws on illegal scripted moves —
 * lesson bugs are build-time failures, not runtime states.
 */
export function stateAfter(lesson: Lesson, stepIndex: number): DerivedState {
  let board = setupBoard(lesson);
  let toPlay = lesson.firstToPlay;
  let lastMove: Point | null = null;
  let lastCaptured: Point[] = [];

  for (let i = 0; i <= stepIndex && i < lesson.steps.length; i++) {
    const step = lesson.steps[i];
    if (!consumesTurn(step)) continue;
    const point = step.kind === 'move' ? step.point : (step as { accept: Point[] }).accept[0];
    const result = play(board, toPlay, point);
    if (!result.ok) {
      throw new Error(
        `Illegal scripted move in lesson '${lesson.id}' step ${i}: ` +
          `${toPlay} at (${point.x},${point.y}) — ${result.reason}`
      );
    }
    board = result.board;
    lastMove = point;
    lastCaptured = result.captured;
    toPlay = opponent(toPlay);
  }

  return { board, toPlay, lastMove, lastCaptured };
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `npm test`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/lessons/ tests/replay.test.ts
git commit -m "feat(lessons): step types and engine-backed replay"
```

### Task 6: Glossary, Lesson Validator, Lessons 1 & 2

Commentary text may embed Go terms as `{{term}}`; the UI later renders these
highlighted with a tooltip. The validator test enforces lesson integrity.

**Files:**
- Create: `src/lessons/glossary.ts`, `src/lessons/lesson1.ts`, `src/lessons/lesson2.ts`, `src/lessons/index.ts`
- Test: `tests/lessons.test.ts`

- [ ] **Step 1: Create src/lessons/glossary.ts**

```ts
export const glossary: Record<string, string> = {
  liberty: 'An empty point directly beside a stone or group — its breathing room.',
  liberties: 'Empty points directly beside a stone or group — its breathing room.',
  atari: 'A group with only one liberty left. Capture is threatened on the very next move.',
  group: 'Stones of one color connected along the lines. They live or die as a single unit.',
  prisoner: 'A captured stone. Each prisoner is worth one point at the end of the game.',
  prisoners: 'Captured stones. Each is worth one point at the end of the game.',
  ko: 'A shape where players could recapture each other forever. The rule: no immediate recapture — you must play elsewhere first.',
  eye: 'An empty point completely surrounded by one group. A group with two eyes can never be captured.',
  eyes: 'Empty points completely surrounded by one group. A group with two eyes can never be captured.',
  territory: 'Empty points fenced in entirely by one color. Each counts as a point at the end.',
  'star point': 'One of the marked dots on the board — landmarks that guide opening play.',
  komi: 'Bonus points White receives as compensation for Black moving first.',
  dame: 'Neutral empty points that belong to neither side and score nothing.'
};
```

- [ ] **Step 2: Create src/lessons/lesson1.ts**

```ts
import type { Lesson } from './types';

export const lesson1: Lesson = {
  id: 'the-board',
  title: 'The Board',
  firstToPlay: 'black',
  steps: [
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Welcome to the night garden',
      text:
        'This is Go — the oldest board game still played on Earth. Two players, ' +
        'Hoshi (Black) and Tsuki (White), take turns placing stones on the ' +
        'intersections of the lines, not the squares. Once placed, a stone never moves.'
    },
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Landmarks',
      text:
        'The dots you see are {{star point}}s. They claim nothing by themselves — ' +
        'they are landmarks that help players find their bearings on an empty board.',
      focus: [
        { x: 2, y: 2 }, { x: 6, y: 2 }, { x: 4, y: 4 }, { x: 2, y: 6 }, { x: 6, y: 6 }
      ]
    },
    {
      kind: 'move',
      point: { x: 2, y: 2 },
      speaker: 'hoshi',
      title: 'First stone',
      text:
        'I begin near a corner. Corners are the easiest places to surround ' +
        'territory — the edges of the board do half the fencing for free.'
    },
    {
      kind: 'move',
      point: { x: 6, y: 6 },
      speaker: 'tsuki',
      text: 'Then I will take the opposite corner. Balance answers ambition.'
    },
    {
      kind: 'move',
      point: { x: 6, y: 2 },
      speaker: 'hoshi',
      text: 'A second corner for me. Two corners beat one.'
    },
    {
      kind: 'move',
      point: { x: 2, y: 6 },
      speaker: 'tsuki',
      text: 'And I take the last one. Notice how we alternate — one stone each, forever.'
    },
    {
      kind: 'quiz',
      title: 'Your first stone',
      prompt:
        'All four corners are claimed, but one great point remains: the center ' +
        'star point. Play Black’s next stone there — click the board.',
      accept: [{ x: 4, y: 4 }],
      hint: 'The center of the board — the middle star point dot.',
      explainCorrect:
        'Beautiful. The center radiates influence in every direction. You have ' +
        'played your first stone of Go.',
      explainWrong:
        'A fine-looking point, but aim for the marked dot at the very center of the board.'
    },
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'That is the whole mechanism',
      text:
        'Place a stone, pass the turn. Everything else in Go — capture, life, ' +
        'death, {{territory}} — grows from this single gesture. Next: how stones breathe.'
    }
  ]
};
```

- [ ] **Step 3: Create src/lessons/lesson2.ts**

```ts
import type { Lesson } from './types';

export const lesson2: Lesson = {
  id: 'liberties-and-capture',
  title: 'Liberties & Capture',
  // A white stone at (4,4) already half-surrounded, and a doomed white pair
  // at (1,6),(1,7) with a single liberty at (1,8).
  setup: {
    black: [
      { x: 3, y: 4 }, { x: 4, y: 3 },
      { x: 0, y: 6 }, { x: 0, y: 7 }, { x: 2, y: 6 }, { x: 2, y: 7 }, { x: 1, y: 5 }
    ],
    white: [{ x: 4, y: 4 }, { x: 1, y: 6 }, { x: 1, y: 7 }]
  },
  firstToPlay: 'black',
  steps: [
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'The breath of a stone',
      text:
        'Every stone breathes through the empty points directly beside it — its ' +
        '{{liberties}}. Fill them all, and the stone is captured and removed. ' +
        'The white stone in the middle is already short of breath.',
      focus: [{ x: 4, y: 4 }]
    },
    {
      kind: 'highlight',
      points: [{ x: 5, y: 4 }, { x: 4, y: 5 }],
      style: 'glow',
      speaker: 'narrator',
      text: 'Two {{liberties}} remain — the two glowing points.'
    },
    {
      kind: 'move',
      point: { x: 5, y: 4 },
      speaker: 'hoshi',
      title: 'Closing in',
      text:
        'I take another breath away. One {{liberty}} left — that white stone is in {{atari}}.'
    },
    {
      kind: 'note',
      speaker: 'narrator',
      text:
        '{{atari}} is the warning bell of Go: one move from capture. White must ' +
        'decide — rescue the stone, or spend the move somewhere more valuable.'
    },
    {
      kind: 'move',
      point: { x: 6, y: 2 },
      speaker: 'tsuki',
      title: 'Letting go',
      text:
        'Running would only add stones to a lost cause. I let it go and build in ' +
        'an open corner instead. Knowing what to abandon is also strength.'
    },
    {
      kind: 'quiz',
      title: 'You try: take the stone',
      prompt: 'The white stone has one {{liberty}} left. Click the point that captures it.',
      accept: [{ x: 4, y: 5 }],
      hint: 'Find the last empty point touching the white stone along a line.',
      explainCorrect:
        'Captured! The stone’s last breath is gone, and it leaves the board as a {{prisoner}}.',
      explainWrong: 'Look for the one empty point still touching the white stone along a line.',
      nearMisses: [
        {
          point: { x: 5, y: 5 },
          text:
            'So close — but diagonals don’t touch in Go. Stones connect and ' +
            'breathe only along the lines.'
        }
      ]
    },
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'One point, kept',
      text:
        'The captured stone becomes a {{prisoner}} — worth a point at the end of ' +
        'the game. Now look to the lower left: stones standing together.',
      focus: [{ x: 1, y: 6 }, { x: 1, y: 7 }]
    },
    {
      kind: 'highlight',
      points: [{ x: 1, y: 8 }],
      style: 'glow',
      speaker: 'narrator',
      text:
        'Connected stones form a {{group}} and share their breath. This white ' +
        'pair breathes through a single point — the whole {{group}} is in {{atari}}.'
    },
    {
      kind: 'move',
      point: { x: 6, y: 6 },
      speaker: 'tsuki',
      text:
        'Those two are beyond saving as well. I keep claiming open ground — ' +
        'watch how many points I gather while Hoshi hunts.'
    },
    {
      kind: 'quiz',
      title: 'You try: capture the pair',
      prompt: 'One move captures both white stones. Where?',
      accept: [{ x: 1, y: 8 }],
      hint: 'The group’s single shared liberty — the point that glowed a moment ago.',
      explainCorrect:
        'Two {{prisoners}} with one stone. A {{group}} lives and dies together.',
      explainWrong:
        'The pair breathes through exactly one point. Fill that, and both stones fall.'
    },
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'What you now know',
      text:
        'Stones breathe through {{liberties}}. Fill the last one and you capture. ' +
        'Groups share breath and fall together. But Tsuki’s patience hints at a ' +
        'deeper truth: captures are sweet, territory is sweeter.'
    }
  ]
};
```

- [ ] **Step 4: Create src/lessons/index.ts**

```ts
import type { Lesson } from './types';
import { lesson1 } from './lesson1';
import { lesson2 } from './lesson2';

export const lessons: Lesson[] = [lesson1, lesson2];
```

- [ ] **Step 5: Write the lesson validator test**

`tests/lessons.test.ts`:
```ts
import { describe, expect, it } from 'vitest';
import { play, toIndex } from '../src/engine/board';
import { glossary } from '../src/lessons/glossary';
import { lessons } from '../src/lessons/index';
import { stateAfter } from '../src/lessons/replay';
import type { Lesson } from '../src/lessons/types';

const turnSteps = (lesson: Lesson) =>
  lesson.steps.map((s, i) => ({ step: s, i })).filter(({ step }) => step.kind === 'move' || step.kind === 'quiz');

describe.each(lessons.map((l) => [l.id, l] as const))('lesson %s', (_id, lesson) => {
  it('setup stones do not overlap', () => {
    const all = [...(lesson.setup?.black ?? []), ...(lesson.setup?.white ?? [])];
    const indices = all.map((p) => toIndex(9, p));
    expect(new Set(indices).size).toBe(indices.length);
  });

  it('every scripted move and canonical quiz answer is legal', () => {
    // stateAfter throws on any illegal move.
    expect(() => stateAfter(lesson, lesson.steps.length - 1)).not.toThrow();
  });

  it('every quiz accept point is legal at its position', () => {
    for (const { step, i } of turnSteps(lesson)) {
      if (step.kind !== 'quiz') continue;
      const before = stateAfter(lesson, i - 1);
      for (const p of step.accept) {
        expect(play(before.board, before.toPlay, p).ok, `accept (${p.x},${p.y}) in step ${i}`).toBe(true);
      }
    }
  });

  it('a quiz followed by more turns has exactly one accept point', () => {
    const turns = turnSteps(lesson);
    turns.forEach(({ step }, position) => {
      if (step.kind === 'quiz' && position < turns.length - 1) {
        expect(step.accept).toHaveLength(1);
      }
    });
  });

  it('all {{terms}} exist in the glossary', () => {
    for (const step of lesson.steps) {
      const texts = [
        'text' in step ? step.text : '',
        step.kind === 'quiz' ? [step.prompt, step.hint, step.explainCorrect, step.explainWrong].join(' ') : ''
      ].join(' ');
      for (const match of texts.matchAll(/\{\{([^}]+)\}\}/g)) {
        expect(glossary[match[1]], `missing glossary term: ${match[1]}`).toBeDefined();
      }
    }
  });
});
```

- [ ] **Step 6: Run tests**

Run: `npm test`
Expected: PASS. If a lesson test fails, the lesson data is wrong — fix the lesson, never the validator.

- [ ] **Step 7: Commit**

```bash
git add src/lessons/ tests/lessons.test.ts
git commit -m "feat(lessons): glossary, validator, lessons 1-2 content"
```

### Task 7: Render — Theme and Geometry

**Files:**
- Create: `src/render/theme.ts`, `src/render/geometry.ts`
- Test: `tests/geometry.test.ts`

- [ ] **Step 1: Create src/render/theme.ts**

```ts
export const theme = {
  nightInner: '#1b2440',
  nightOuter: '#0a0e1f',
  amber: '#ffd98a',
  amberSoft: 'rgba(255, 217, 138, 0.35)',
  woodLight: '#d2a963',
  woodMid: '#b98e48',
  woodDark: '#96702f',
  line: '#3b2a12',
  blackStoneHi: '#4a4a4a',
  blackStoneLo: '#060606',
  whiteStoneHi: '#ffffff',
  whiteStoneLo: '#ccd3da',
  territoryBlack: 'rgba(122, 162, 255, 0.30)',
  territoryWhite: 'rgba(255, 217, 138, 0.30)',
  dimVeil: 'rgba(10, 14, 31, 0.62)'
} as const;

export const STAR_POINTS_9 = [
  { x: 2, y: 2 }, { x: 6, y: 2 }, { x: 4, y: 4 }, { x: 2, y: 6 }, { x: 6, y: 6 }
];
```

- [ ] **Step 2: Write failing geometry tests**

`tests/geometry.test.ts`:
```ts
import { describe, expect, it } from 'vitest';
import { computeGeometry, pixelOf, pointAt } from '../src/render/geometry';

describe('geometry', () => {
  const g = computeGeometry(1280, 800);

  it('round-trips every intersection through pixels', () => {
    for (let y = 0; y < 9; y++) {
      for (let x = 0; x < 9; x++) {
        const { px, py } = pixelOf(g, { x, y });
        expect(pointAt(g, px, py)).toEqual({ x, y });
        expect(pointAt(g, px + g.cell * 0.3, py - g.cell * 0.3)).toEqual({ x, y });
      }
    }
  });

  it('returns null for clicks far from any intersection or off the board', () => {
    expect(pointAt(g, 5, 5)).toBeNull();
    const { px, py } = pixelOf(g, { x: 0, y: 0 });
    expect(pointAt(g, px - g.cell, py - g.cell)).toBeNull(); // outside grid
  });

  it('keeps the board inside the viewport and left of center', () => {
    expect(g.side).toBeLessThanOrEqual(800);
    expect(g.centerX).toBeLessThan(1280 / 2 + 1);
  });
});
```

- [ ] **Step 3: Run tests to verify they fail**

Run: `npm test`
Expected: FAIL — cannot resolve `../src/render/geometry`.

- [ ] **Step 4: Implement src/render/geometry.ts**

```ts
import type { Point } from '../engine/types';

export interface BoardGeometry {
  centerX: number;
  centerY: number;
  side: number;    // wooden board edge length in px
  cell: number;    // distance between grid lines
  gridLeft: number;
  gridTop: number;
  boardSize: number;
}

/**
 * The board sits left of center to leave room for the commentary panel.
 * Grid intersections are inset one cell from the wooden edge.
 */
export function computeGeometry(width: number, height: number, boardSize = 9): BoardGeometry {
  const side = Math.min(width * 0.52, height * 0.82);
  const cell = side / (boardSize + 1);
  const centerX = width * 0.40;
  const centerY = height * 0.5;
  const gridSpan = cell * (boardSize - 1);
  return {
    centerX,
    centerY,
    side,
    cell,
    gridLeft: centerX - gridSpan / 2,
    gridTop: centerY - gridSpan / 2,
    boardSize
  };
}

export function pixelOf(g: BoardGeometry, p: Point): { px: number; py: number } {
  return { px: g.gridLeft + p.x * g.cell, py: g.gridTop + p.y * g.cell };
}

/** Nearest intersection within 0.45 cells of the pixel, else null. */
export function pointAt(g: BoardGeometry, px: number, py: number): Point | null {
  const x = Math.round((px - g.gridLeft) / g.cell);
  const y = Math.round((py - g.gridTop) / g.cell);
  if (x < 0 || x >= g.boardSize || y < 0 || y >= g.boardSize) return null;
  const ideal = pixelOf(g, { x, y });
  const dist = Math.hypot(px - ideal.px, py - ideal.py);
  return dist <= g.cell * 0.45 ? { x, y } : null;
}
```

- [ ] **Step 5: Run tests to verify they pass**

Run: `npm test`
Expected: PASS.

- [ ] **Step 6: Commit**

```bash
git add src/render/ tests/geometry.test.ts
git commit -m "feat(render): theme tokens and board geometry mapping"
```

---

### Task 8: Render — Canvas Scene

The renderer is exercised manually (visual pass); its logic-bearing pieces
(geometry) are already unit-tested. Keep ALL drawing here — no canvas calls
anywhere else except effects.

**Files:**
- Create: `src/render/renderer.ts`
- Modify: `src/main.ts` (temporary harness to view the scene)

- [ ] **Step 1: Create src/render/renderer.ts**

```ts
import type { Board, Color, Point } from '../engine/types';
import { toPoint } from '../engine/board';
import { computeGeometry, pixelOf, type BoardGeometry } from './geometry';
import { STAR_POINTS_9, theme } from './theme';

export interface RenderState {
  board: Board;
  lastMove: Point | null;
  /** Stone currently animating in: start = performance.now() at placement. */
  placing: { point: Point; color: Color; start: number } | null;
  focus: Point[] | null;
  glow: Point[];
  territoryOverlay: Map<number, Color | 'neutral'> | null;
  hover: Point | null;
  quizActive: boolean;
}

export class Renderer {
  private ctx: CanvasRenderingContext2D;
  private geometry: BoardGeometry;
  private staticLayer: HTMLCanvasElement | null = null;
  private width = 0;
  private height = 0;

  constructor(private canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext('2d')!;
    this.geometry = computeGeometry(1, 1);
    this.resize();
  }

  get geo(): BoardGeometry {
    return this.geometry;
  }

  resize(): void {
    const dpr = window.devicePixelRatio || 1;
    this.width = this.canvas.clientWidth || window.innerWidth;
    this.height = this.canvas.clientHeight || window.innerHeight;
    this.canvas.width = Math.round(this.width * dpr);
    this.canvas.height = Math.round(this.height * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.geometry = computeGeometry(this.width, this.height);
    this.staticLayer = null; // invalidate cache
  }

  draw(state: RenderState, now: number): void {
    const { ctx } = this;
    ctx.clearRect(0, 0, this.width, this.height);
    ctx.drawImage(this.ensureStaticLayer(), 0, 0, this.width, this.height);
    this.drawTerritory(state);
    this.drawStones(state, now);
    this.drawGlowMarkers(state.glow, now);
    this.drawHover(state);
    this.drawFocusVeil(state.focus);
  }

  private ensureStaticLayer(): HTMLCanvasElement {
    if (this.staticLayer) return this.staticLayer;
    const layer = document.createElement('canvas');
    const dpr = window.devicePixelRatio || 1;
    layer.width = Math.round(this.width * dpr);
    layer.height = Math.round(this.height * dpr);
    const ctx = layer.getContext('2d')!;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.paintBackground(ctx);
    this.paintBoard(ctx);
    this.staticLayer = layer;
    return layer;
  }

  private paintBackground(ctx: CanvasRenderingContext2D): void {
    const grad = ctx.createRadialGradient(
      this.width * 0.45, this.height * 0.25, 0,
      this.width * 0.45, this.height * 0.25, Math.max(this.width, this.height) * 0.9
    );
    grad.addColorStop(0, theme.nightInner);
    grad.addColorStop(1, theme.nightOuter);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, this.width, this.height);
  }

  private paintBoard(ctx: CanvasRenderingContext2D): void {
    const g = this.geometry;
    const left = g.centerX - g.side / 2;
    const top = g.centerY - g.side / 2;

    // Lantern glow beneath the board.
    ctx.save();
    ctx.shadowColor = 'rgba(255, 180, 80, 0.35)';
    ctx.shadowBlur = g.side * 0.18;
    const wood = ctx.createLinearGradient(left, top, left + g.side, top + g.side);
    wood.addColorStop(0, theme.woodLight);
    wood.addColorStop(0.55, theme.woodMid);
    wood.addColorStop(1, theme.woodDark);
    ctx.fillStyle = wood;
    this.roundRect(ctx, left, top, g.side, g.side, g.side * 0.02);
    ctx.fill();
    ctx.restore();

    // Subtle grain: faint horizontal streaks.
    ctx.save();
    ctx.globalAlpha = 0.05;
    ctx.strokeStyle = theme.line;
    for (let i = 0; i < 28; i++) {
      const y = top + (g.side * (i + Math.sin(i * 3.7) * 0.4)) / 28;
      ctx.beginPath();
      ctx.moveTo(left + 2, y);
      ctx.bezierCurveTo(
        left + g.side * 0.3, y + 3, left + g.side * 0.7, y - 3, left + g.side - 2, y
      );
      ctx.stroke();
    }
    ctx.restore();

    // Grid lines.
    ctx.strokeStyle = theme.line;
    ctx.globalAlpha = 0.65;
    ctx.lineWidth = 1;
    for (let i = 0; i < g.boardSize; i++) {
      const { px } = pixelOf(g, { x: i, y: 0 });
      const { py: topY } = pixelOf(g, { x: 0, y: 0 });
      const { py: botY } = pixelOf(g, { x: 0, y: g.boardSize - 1 });
      ctx.beginPath();
      ctx.moveTo(px + 0.5, topY);
      ctx.lineTo(px + 0.5, botY);
      ctx.stroke();
      const { py } = pixelOf(g, { x: 0, y: i });
      const { px: leftX } = pixelOf(g, { x: 0, y: 0 });
      const { px: rightX } = pixelOf(g, { x: g.boardSize - 1, y: 0 });
      ctx.beginPath();
      ctx.moveTo(leftX, py + 0.5);
      ctx.lineTo(rightX, py + 0.5);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    // Star points.
    ctx.fillStyle = theme.line;
    for (const p of STAR_POINTS_9) {
      const { px, py } = pixelOf(g, p);
      ctx.beginPath();
      ctx.arc(px, py, Math.max(2.5, g.cell * 0.07), 0, Math.PI * 2);
      ctx.fill();
    }
  }

  private drawTerritory(state: RenderState): void {
    if (!state.territoryOverlay) return;
    const { ctx } = this;
    const g = this.geometry;
    for (const [i, owner] of state.territoryOverlay) {
      if (owner === 'neutral') continue;
      const { px, py } = pixelOf(g, toPoint(g.boardSize, i));
      ctx.fillStyle = owner === 'black' ? theme.territoryBlack : theme.territoryWhite;
      ctx.beginPath();
      ctx.arc(px, py, g.cell * 0.32, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  private drawStones(state: RenderState, now: number): void {
    const g = this.geometry;
    for (let i = 0; i < state.board.cells.length; i++) {
      const color = state.board.cells[i];
      if (color === null) continue;
      const p = toPoint(g.boardSize, i);
      let scale = 1;
      if (state.placing && state.placing.point.x === p.x && state.placing.point.y === p.y) {
        const t = Math.min(1, (now - state.placing.start) / 400);
        scale = easeOutBack(t);
      }
      this.drawStone(p, color, scale, state.lastMove);
    }
  }

  private drawStone(p: Point, color: Color, scale: number, lastMove: Point | null): void {
    const { ctx } = this;
    const g = this.geometry;
    const { px, py } = pixelOf(g, p);
    const r = g.cell * 0.46 * scale;
    if (r <= 0) return;

    ctx.save();
    if (color === 'white') {
      ctx.shadowColor = 'rgba(255, 240, 200, 0.45)';
      ctx.shadowBlur = g.cell * 0.35;
    } else {
      ctx.shadowColor = 'rgba(0, 0, 0, 0.6)';
      ctx.shadowBlur = g.cell * 0.2;
    }
    const grad = ctx.createRadialGradient(
      px - r * 0.35, py - r * 0.4, r * 0.1, px, py, r
    );
    if (color === 'black') {
      grad.addColorStop(0, theme.blackStoneHi);
      grad.addColorStop(1, theme.blackStoneLo);
    } else {
      grad.addColorStop(0, theme.whiteStoneHi);
      grad.addColorStop(1, theme.whiteStoneLo);
    }
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(px, py, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    if (lastMove && lastMove.x === p.x && lastMove.y === p.y && scale === 1) {
      ctx.strokeStyle = theme.amber;
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = 0.9;
      ctx.beginPath();
      ctx.arc(px, py, r + g.cell * 0.14, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = 1;
    }
  }

  private drawGlowMarkers(points: Point[], now: number): void {
    const { ctx } = this;
    const g = this.geometry;
    const pulse = 0.55 + 0.45 * Math.sin(now / 450);
    for (const p of points) {
      const { px, py } = pixelOf(g, p);
      ctx.save();
      ctx.globalCompositeOperation = 'lighter';
      const grad = ctx.createRadialGradient(px, py, 0, px, py, g.cell * 0.5);
      grad.addColorStop(0, `rgba(255, 217, 138, ${0.55 * pulse})`);
      grad.addColorStop(1, 'rgba(255, 217, 138, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(px, py, g.cell * 0.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  private drawHover(state: RenderState): void {
    if (!state.quizActive || !state.hover) return;
    const { ctx } = this;
    const g = this.geometry;
    const { px, py } = pixelOf(g, state.hover);
    ctx.save();
    ctx.strokeStyle = theme.amber;
    ctx.setLineDash([4, 4]);
    ctx.globalAlpha = 0.85;
    ctx.beginPath();
    ctx.arc(px, py, g.cell * 0.46, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  /** Dim everything except a soft window around the focus points. */
  private drawFocusVeil(focus: Point[] | null): void {
    if (!focus || focus.length === 0) return;
    const { ctx } = this;
    const g = this.geometry;
    ctx.save();
    ctx.fillStyle = theme.dimVeil;
    ctx.fillRect(0, 0, this.width, this.height);
    ctx.globalCompositeOperation = 'destination-out';
    for (const p of focus) {
      const { px, py } = pixelOf(g, p);
      const grad = ctx.createRadialGradient(px, py, 0, px, py, g.cell * 2.2);
      grad.addColorStop(0, 'rgba(0, 0, 0, 1)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(px, py, g.cell * 2.2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  private roundRect(
    ctx: CanvasRenderingContext2D,
    x: number, y: number, w: number, h: number, r: number
  ): void {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }
}

function easeOutBack(t: number): number {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
}

export function emptyRenderState(board: Board): RenderState {
  return {
    board,
    lastMove: null,
    placing: null,
    focus: null,
    glow: [],
    territoryOverlay: null,
    hover: null,
    quizActive: false
  };
}
```

- [ ] **Step 2: Temporary visual harness in src/main.ts**

```ts
import { createBoard, play } from './engine/board';
import { emptyRenderState, Renderer } from './render/renderer';

const canvas = document.querySelector<HTMLCanvasElement>('#scene')!;
const renderer = new Renderer(canvas);
new ResizeObserver(() => renderer.resize()).observe(canvas);

let board = createBoard();
for (const [color, x, y] of [
  ['black', 2, 2], ['white', 6, 6], ['black', 6, 2], ['white', 2, 6], ['black', 4, 4]
] as const) {
  const r = play(board, color, { x, y });
  if (r.ok) board = r.board;
}

const state = { ...emptyRenderState(board), lastMove: { x: 4, y: 4 }, glow: [{ x: 4, y: 3 }] };
const loop = (now: number) => {
  renderer.draw(state, now);
  requestAnimationFrame(loop);
};
requestAnimationFrame(loop);
```

- [ ] **Step 3: Verify visually**

Run: `npm run dev` and open the printed URL.
Expected: dark indigo night scene; warm glowing wooden board left of center; 9×9 grid with 5 star points; five stones with shading; amber ring on the center stone; pulsing amber glow at (4,3). Resize the window — the board scales crisply (no blur on retina).

- [ ] **Step 4: Run checks and commit**

Run: `npm run build && npm test`
Expected: both pass.

```bash
git add src/render/renderer.ts src/main.ts
git commit -m "feat(render): canvas night-garden scene with board, stones, glow, focus veil"
```

### Task 9: Render — Effects (Ripples, Embers, Fireflies)

**Files:**
- Create: `src/render/effects.ts`
- Modify: `src/main.ts` (extend harness)

- [ ] **Step 1: Create src/render/effects.ts**

```ts
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  age: number;
  life: number;
  size: number;
  kind: 'ember' | 'ripple';
}

interface Firefly {
  x: number;
  y: number;
  phase: number;
  speed: number;
  drift: number;
}

const FIREFLY_COUNT = 14;

export class Effects {
  private particles: Particle[] = [];
  private fireflies: Firefly[] = [];

  constructor(width: number, height: number) {
    this.reseed(width, height);
  }

  reseed(width: number, height: number): void {
    this.fireflies = Array.from({ length: FIREFLY_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      phase: Math.random() * Math.PI * 2,
      speed: 6 + Math.random() * 10,
      drift: Math.random() * Math.PI * 2
    }));
  }

  spawnRipple(px: number, py: number, cell: number): void {
    this.particles.push({
      x: px, y: py, vx: 0, vy: 0, age: 0, life: 600, size: cell, kind: 'ripple'
    });
  }

  spawnEmbers(px: number, py: number, cell: number): void {
    for (let i = 0; i < 14; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = cell * (0.2 + Math.random() * 0.8);
      this.particles.push({
        x: px + (Math.random() - 0.5) * cell * 0.4,
        y: py + (Math.random() - 0.5) * cell * 0.4,
        vx: Math.cos(angle) * speed * 0.3,
        vy: -speed * (0.5 + Math.random() * 0.7), // drift upward
        age: 0,
        life: 700 + Math.random() * 500,
        size: cell * (0.06 + Math.random() * 0.08),
        kind: 'ember'
      });
    }
  }

  update(dtMs: number, width: number, height: number): void {
    const dt = dtMs / 1000;
    this.particles = this.particles.filter((p) => (p.age += dtMs) < p.life);
    for (const p of this.particles) {
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      if (p.kind === 'ember') p.vy -= 14 * dt; // gentle lift
    }
    for (const f of this.fireflies) {
      f.drift += dt * 0.25;
      f.x += Math.cos(f.drift) * f.speed * dt;
      f.y += Math.sin(f.drift * 0.8) * f.speed * dt * 0.6;
      if (f.x < -10) f.x = width + 10;
      if (f.x > width + 10) f.x = -10;
      if (f.y < -10) f.y = height + 10;
      if (f.y > height + 10) f.y = -10;
    }
  }

  draw(ctx: CanvasRenderingContext2D, now: number): void {
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';

    for (const f of this.fireflies) {
      const glow = 0.35 + 0.3 * Math.sin(now / 700 + f.phase);
      const grad = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, 7);
      grad.addColorStop(0, `rgba(255, 217, 138, ${glow})`);
      grad.addColorStop(1, 'rgba(255, 217, 138, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(f.x, f.y, 7, 0, Math.PI * 2);
      ctx.fill();
    }

    for (const p of this.particles) {
      const t = p.age / p.life;
      if (p.kind === 'ripple') {
        const radius = p.size * (0.4 + t * 1.6);
        ctx.strokeStyle = `rgba(255, 217, 138, ${0.5 * (1 - t)})`;
        ctx.lineWidth = 2 * (1 - t);
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.stroke();
      } else {
        const alpha = (1 - t) * 0.8;
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2.5);
        grad.addColorStop(0, `rgba(255, 200, 110, ${alpha})`);
        grad.addColorStop(1, 'rgba(255, 200, 110, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    ctx.restore();
  }
}
```

- [ ] **Step 2: Extend the harness in src/main.ts**

Replace the loop section with:

```ts
import { Effects } from './render/effects';
import { pixelOf } from './render/geometry';

const effects = new Effects(window.innerWidth, window.innerHeight);
let last = performance.now();
canvas.addEventListener('click', () => {
  const { px, py } = pixelOf(renderer.geo, { x: 4, y: 4 });
  effects.spawnRipple(px, py, renderer.geo.cell);
  effects.spawnEmbers(px, py, renderer.geo.cell);
});

const loop = (now: number) => {
  effects.update(now - last, window.innerWidth, window.innerHeight);
  last = now;
  renderer.draw(state, now);
  effects.draw(canvas.getContext('2d')!, now);
  requestAnimationFrame(loop);
};
requestAnimationFrame(loop);
```

- [ ] **Step 3: Verify visually**

Run: `npm run dev`
Expected: fireflies drift and pulse across the night; clicking anywhere fires an amber ripple + rising ember burst at the center stone.

- [ ] **Step 4: Run checks and commit**

Run: `npm run build && npm test`
Expected: both pass.

```bash
git add src/render/effects.ts src/main.ts
git commit -m "feat(render): particle effects - ripples, capture embers, fireflies"
```

---

### Task 10: UI Overlay — Panel, Chips, Transport

**Files:**
- Modify: `index.html`, `src/styles.css`
- Create: `src/ui/ui.ts`

- [ ] **Step 1: Replace the overlay markup in index.html**

Replace `<main id="overlay"></main>` with:

```html
<main id="overlay">
  <nav id="chips" aria-label="Lessons"></nav>
  <aside id="panel">
    <div id="panel-label"></div>
    <h2 id="panel-title"></h2>
    <div id="panel-body"></div>
    <div id="quiz-box" hidden>
      <p id="quiz-prompt"></p>
      <p id="quiz-feedback" hidden></p>
      <button id="quiz-showme" hidden>Show me</button>
    </div>
  </aside>
  <footer id="transport">
    <button id="btn-first" title="Restart lesson">⏮</button>
    <button id="btn-prev" title="Previous (←)">◀</button>
    <button id="btn-next" title="Next (→)">▶</button>
    <button id="btn-auto" title="Autoplay (space)">⏵⏵</button>
    <span id="move-counter"></span>
  </footer>
</main>
```

- [ ] **Step 2: Replace src/styles.css**

```css
@import url('https://fonts.googleapis.com/css2?family=Crimson+Pro:ital,wght@0,400;0,600;1,400&display=swap');

:root {
  --night: #0a0e1f;
  --amber: #ffd98a;
  --amber-dim: rgba(255, 217, 138, 0.18);
  --panel-bg: rgba(16, 22, 44, 0.72);
  --text: #cfd2da;
  --text-bright: #ffffff;
}

* { margin: 0; padding: 0; box-sizing: border-box; }
html, body { height: 100%; overflow: hidden; background: var(--night); }
body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  color: var(--text);
}

#scene { position: fixed; inset: 0; width: 100%; height: 100%; }
#overlay { position: fixed; inset: 0; pointer-events: none; }
#overlay button { pointer-events: auto; cursor: pointer; }

/* Lesson chips */
#chips {
  position: absolute; left: 18px; top: 18px;
  display: flex; flex-direction: column; gap: 8px;
}
#chips button {
  background: var(--panel-bg); color: var(--text);
  border: 1px solid var(--amber-dim); border-radius: 999px;
  padding: 6px 14px; font-size: 12px; text-align: left;
  backdrop-filter: blur(6px); transition: border-color 0.2s, color 0.2s;
}
#chips button:hover { border-color: rgba(255, 217, 138, 0.45); }
#chips button.active { color: var(--amber); border-color: rgba(255, 217, 138, 0.6); }
#chips button.done::after { content: ' ✓'; color: var(--amber); }

/* Commentary panel */
#panel {
  position: absolute; right: 18px; top: 18px; bottom: 86px; width: 320px;
  background: var(--panel-bg); backdrop-filter: blur(8px);
  border: 1px solid var(--amber-dim); border-radius: 14px;
  padding: 20px; overflow-y: auto; pointer-events: auto;
}
#panel-label {
  font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase;
  color: var(--amber); opacity: 0.9;
}
#panel-title {
  font-family: 'Crimson Pro', Georgia, serif; font-weight: 600;
  color: var(--text-bright); font-size: 22px; margin: 6px 0 14px;
}
#panel-body p { font-size: 14px; line-height: 1.6; margin-bottom: 10px; }
.speaker {
  display: flex; align-items: center; gap: 8px; margin: 14px 0 4px;
  font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--amber);
}
.speaker .dot { width: 14px; height: 14px; border-radius: 50%; flex: none; }
.dot-hoshi { background: radial-gradient(circle at 35% 30%, #555, #000); }
.dot-tsuki { background: radial-gradient(circle at 35% 30%, #fff, #ccc); }
.dot-narrator { background: var(--amber); opacity: 0.85; }
.term {
  color: var(--amber);
  border-bottom: 1px dotted rgba(255, 217, 138, 0.5);
  cursor: help;
}

/* Quiz box */
#quiz-box {
  margin-top: 14px; padding: 12px 14px;
  border: 1px solid rgba(255, 217, 138, 0.4); border-radius: 10px;
  background: rgba(255, 217, 138, 0.07);
}
#quiz-prompt { color: #ffe9bd; font-size: 13.5px; line-height: 1.55; }
#quiz-feedback { margin-top: 10px; font-size: 13.5px; line-height: 1.55; }
#quiz-feedback.correct { color: #b9f0c0; }
#quiz-feedback.wrong { color: #f0cdb9; }
#quiz-showme {
  margin-top: 10px; background: none; border: 1px solid var(--amber-dim);
  border-radius: 999px; color: var(--amber); padding: 5px 14px; font-size: 12px;
}

/* Transport */
#transport {
  position: absolute; left: 50%; bottom: 18px; transform: translateX(-50%);
  display: flex; gap: 10px; align-items: center;
  background: var(--panel-bg); backdrop-filter: blur(6px);
  border: 1px solid var(--amber-dim); border-radius: 999px; padding: 8px 18px;
}
#transport button {
  width: 32px; height: 32px; border-radius: 50%; border: none;
  background: rgba(255, 217, 138, 0.12); color: var(--amber); font-size: 13px;
  transition: background 0.2s;
}
#transport button:hover:not(:disabled) { background: rgba(255, 217, 138, 0.28); }
#transport button:disabled { opacity: 0.35; cursor: default; }
#transport button.engaged { background: rgba(255, 217, 138, 0.4); }
#move-counter { font-size: 12px; opacity: 0.8; min-width: 80px; text-align: center; }
```

- [ ] **Step 3: Create src/ui/ui.ts**

```ts
import { glossary } from '../lessons/glossary';
import type { Speaker } from '../lessons/types';

export interface CommentBlock {
  speaker: Speaker;
  text: string;
}

export interface UiCallbacks {
  onFirst: () => void;
  onPrev: () => void;
  onNext: () => void;
  onToggleAuto: () => void;
  onSelectLesson: (index: number) => void;
  onShowMe: () => void;
}

const speakerNames: Record<Speaker, string> = {
  hoshi: 'Hoshi · Black',
  tsuki: 'Tsuki · White',
  narrator: 'Narrator'
};

/** Escape HTML, then turn {{term}} into glossary tooltips. */
export function renderText(text: string): string {
  const escaped = text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
  return escaped.replace(/\{\{([^}]+)\}\}/g, (_m, term: string) => {
    const def = glossary[term] ?? '';
    return `<span class="term" title="${def.replaceAll('"', '&quot;')}">${term}</span>`;
  });
}

export class Ui {
  private el = {
    chips: document.querySelector<HTMLElement>('#chips')!,
    label: document.querySelector<HTMLElement>('#panel-label')!,
    title: document.querySelector<HTMLElement>('#panel-title')!,
    body: document.querySelector<HTMLElement>('#panel-body')!,
    quizBox: document.querySelector<HTMLElement>('#quiz-box')!,
    quizPrompt: document.querySelector<HTMLElement>('#quiz-prompt')!,
    quizFeedback: document.querySelector<HTMLElement>('#quiz-feedback')!,
    quizShowMe: document.querySelector<HTMLButtonElement>('#quiz-showme')!,
    btnFirst: document.querySelector<HTMLButtonElement>('#btn-first')!,
    btnPrev: document.querySelector<HTMLButtonElement>('#btn-prev')!,
    btnNext: document.querySelector<HTMLButtonElement>('#btn-next')!,
    btnAuto: document.querySelector<HTMLButtonElement>('#btn-auto')!,
    counter: document.querySelector<HTMLElement>('#move-counter')!
  };

  constructor(callbacks: UiCallbacks) {
    this.el.btnFirst.addEventListener('click', callbacks.onFirst);
    this.el.btnPrev.addEventListener('click', callbacks.onPrev);
    this.el.btnNext.addEventListener('click', callbacks.onNext);
    this.el.btnAuto.addEventListener('click', callbacks.onToggleAuto);
    this.el.quizShowMe.addEventListener('click', callbacks.onShowMe);
    this.onSelectLesson = callbacks.onSelectLesson;
  }

  private onSelectLesson: (index: number) => void;

  setLessons(titles: string[], active: number, completed: boolean[]): void {
    this.el.chips.replaceChildren(
      ...titles.map((title, i) => {
        const b = document.createElement('button');
        b.textContent = `${i + 1} · ${title}`;
        b.classList.toggle('active', i === active);
        b.classList.toggle('done', completed[i]);
        b.addEventListener('click', () => this.onSelectLesson(i));
        return b;
      })
    );
  }

  setStep(opts: {
    label: string;
    title: string;
    blocks: CommentBlock[];
    counter: string;
    prevEnabled: boolean;
    nextEnabled: boolean;
  }): void {
    this.el.label.textContent = opts.label;
    this.el.title.textContent = opts.title;
    this.el.body.innerHTML = opts.blocks
      .map(
        (b) =>
          `<div class="speaker"><span class="dot dot-${b.speaker}"></span>${speakerNames[b.speaker]}</div>` +
          `<p>${renderText(b.text)}</p>`
      )
      .join('');
    this.el.counter.textContent = opts.counter;
    this.el.btnPrev.disabled = !opts.prevEnabled;
    this.el.btnFirst.disabled = !opts.prevEnabled;
    this.el.btnNext.disabled = !opts.nextEnabled;
    this.hideQuiz();
  }

  showQuiz(prompt: string): void {
    this.el.quizBox.hidden = false;
    this.el.quizPrompt.innerHTML = renderText(prompt);
    this.el.quizFeedback.hidden = true;
    this.el.quizShowMe.hidden = true;
  }

  showQuizFeedback(kind: 'correct' | 'wrong', text: string, showMe: boolean): void {
    this.el.quizFeedback.hidden = false;
    this.el.quizFeedback.className = kind;
    this.el.quizFeedback.innerHTML = renderText(text);
    this.el.quizShowMe.hidden = !showMe;
  }

  hideQuiz(): void {
    this.el.quizBox.hidden = true;
  }

  setAutoplay(on: boolean): void {
    this.el.btnAuto.classList.toggle('engaged', on);
  }
}
```

- [ ] **Step 4: Verify visually**

Run: `npm run dev`
Expected: chips, glass panel, and transport pill render over the scene (content still empty — wired in Task 11). Check the panel's frosted blur and amber accents match the night scene.

- [ ] **Step 5: Run checks and commit**

Run: `npm run build && npm test`
Expected: both pass (UI module is not imported yet; that is fine).

```bash
git add index.html src/styles.css src/ui/
git commit -m "feat(ui): overlay panel, lesson chips, transport controls"
```

### Task 11: App Orchestrator — Navigation, Quiz Flow, Autoplay, Progress

**Files:**
- Create: `src/app/app.ts`
- Modify: `src/main.ts` (replace harness with real bootstrap)

- [ ] **Step 1: Create src/app/app.ts**

```ts
import { play } from '../engine/board';
import { territory } from '../engine/territory';
import type { Color, Point } from '../engine/types';
import { lessons } from '../lessons/index';
import { stateAfter } from '../lessons/replay';
import type { Lesson, QuizStep, Step } from '../lessons/types';
import { Effects } from '../render/effects';
import { pixelOf, pointAt } from '../render/geometry';
import { Renderer, type RenderState } from '../render/renderer';
import { Ui } from '../ui/ui';

const AUTOPLAY_MS = 3500;
const PROGRESS_KEY = 'ngg-progress';

interface QuizState {
  answered: boolean;
  misses: number;
}

export class App {
  private lessonIndex = 0;
  private stepIndex = 0;
  private quiz: QuizState = { answered: false, misses: 0 };
  private autoplay = false;
  private lastAdvance = 0;
  private placing: RenderState['placing'] = null;
  private hover: Point | null = null;
  private completed = new Set<string>(loadProgress());
  private ui: Ui;

  constructor(
    private renderer: Renderer,
    private effects: Effects,
    private canvas: HTMLCanvasElement
  ) {
    this.ui = new Ui({
      onFirst: () => this.goTo(0),
      onPrev: () => this.goTo(this.stepIndex - 1),
      onNext: () => this.next(),
      onToggleAuto: () => this.toggleAutoplay(),
      onSelectLesson: (i) => this.selectLesson(i),
      onShowMe: () => this.revealQuizAnswer()
    });

    canvas.addEventListener('click', (e) => this.onCanvasClick(e));
    canvas.addEventListener('mousemove', (e) => {
      this.hover = pointAt(this.renderer.geo, e.clientX, e.clientY);
    });
    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') this.next();
      if (e.key === 'ArrowLeft') this.goTo(this.stepIndex - 1);
      if (e.key === ' ') {
        e.preventDefault();
        this.toggleAutoplay();
      }
    });

    this.refreshUi();
  }

  private get lesson(): Lesson {
    return lessons[this.lessonIndex];
  }

  private get step(): Step {
    return this.lesson.steps[this.stepIndex];
  }

  private get quizPending(): boolean {
    return this.step.kind === 'quiz' && !this.quiz.answered;
  }

  /** Board index the renderer should show: pending quizzes hide their answer. */
  private get boardStepIndex(): number {
    return this.quizPending ? this.stepIndex - 1 : this.stepIndex;
  }

  // --- Navigation ---

  selectLesson(i: number): void {
    this.lessonIndex = Math.max(0, Math.min(lessons.length - 1, i));
    this.goTo(0);
  }

  private next(): void {
    if (this.quizPending) return; // Next is disabled; ignore keyboard too.
    if (this.stepIndex >= this.lesson.steps.length - 1) {
      if (this.lessonIndex < lessons.length - 1) this.selectLesson(this.lessonIndex + 1);
      return;
    }
    this.goTo(this.stepIndex + 1, { animate: true });
  }

  private goTo(index: number, opts: { animate?: boolean } = {}): void {
    this.stepIndex = Math.max(0, Math.min(this.lesson.steps.length - 1, index));
    this.quiz = { answered: false, misses: 0 };
    this.placing = null;
    this.lastAdvance = performance.now();

    if (opts.animate && this.step.kind === 'move') {
      const s = stateAfter(this.lesson, this.stepIndex);
      this.placing = { point: this.step.point, color: colorOfLastMove(s.toPlay), start: performance.now() };
      this.spawnCaptureEffects(s.lastCaptured);
      this.spawnRippleAt(this.step.point);
    }

    if (this.stepIndex === this.lesson.steps.length - 1 && !this.completed.has(this.lesson.id)) {
      this.completed.add(this.lesson.id);
      saveProgress([...this.completed]);
    }

    this.refreshUi();
  }

  private toggleAutoplay(): void {
    this.autoplay = !this.autoplay;
    this.lastAdvance = performance.now();
    this.ui.setAutoplay(this.autoplay);
  }

  // --- Quiz flow ---

  private onCanvasClick(e: MouseEvent): void {
    if (!this.quizPending) return;
    const p = pointAt(this.renderer.geo, e.clientX, e.clientY);
    if (!p) return;
    const quiz = this.step as QuizStep;

    if (quiz.accept.some((a) => a.x === p.x && a.y === p.y)) {
      this.completeQuiz(quiz, quiz.explainCorrect);
      return;
    }

    this.quiz.misses += 1;
    const near = quiz.nearMisses?.find((n) => n.point.x === p.x && n.point.y === p.y);
    const before = stateAfter(this.lesson, this.stepIndex - 1);
    const legality = play(before.board, before.toPlay, p);
    const text = near
      ? near.text
      : !legality.ok
        ? 'That point cannot be played — it is occupied or forbidden. ' + quiz.hint
        : this.quiz.misses === 1
          ? quiz.explainWrong
          : quiz.explainWrong + ' Hint: ' + quiz.hint;
    this.ui.showQuizFeedback('wrong', text, this.quiz.misses >= 2);
  }

  private revealQuizAnswer(): void {
    const quiz = this.step as QuizStep;
    this.completeQuiz(quiz, 'Here is the move: ' + quiz.explainCorrect);
  }

  private completeQuiz(quiz: QuizStep, feedback: string): void {
    this.quiz.answered = true;
    const s = stateAfter(this.lesson, this.stepIndex);
    this.placing = {
      point: quiz.accept[0],
      color: colorOfLastMove(s.toPlay),
      start: performance.now()
    };
    this.spawnCaptureEffects(s.lastCaptured);
    this.spawnRippleAt(quiz.accept[0]);
    this.lastAdvance = performance.now();
    this.refreshUi();
    this.ui.showQuizFeedback('correct', feedback, false);
  }

  // --- Effects helpers ---

  private spawnRippleAt(p: Point): void {
    const { px, py } = pixelOf(this.renderer.geo, p);
    this.effects.spawnRipple(px, py, this.renderer.geo.cell);
  }

  private spawnCaptureEffects(captured: Point[]): void {
    for (const c of captured) {
      const { px, py } = pixelOf(this.renderer.geo, c);
      this.effects.spawnEmbers(px, py, this.renderer.geo.cell);
    }
  }

  // --- Rendering ---

  private refreshUi(): void {
    const step = this.step;
    const n = this.lesson.steps.length;
    const title =
      step.kind === 'quiz'
        ? step.title ?? 'You try'
        : step.title ?? (step.kind === 'move' ? 'The game continues' : this.lesson.title);
    const blocks =
      step.kind === 'quiz'
        ? []
        : [{ speaker: step.kind === 'highlight' ? step.speaker ?? 'narrator' : step.speaker, text: step.text }];

    this.ui.setLessons(
      lessons.map((l) => l.title),
      this.lessonIndex,
      lessons.map((l) => this.completed.has(l.id))
    );
    this.ui.setStep({
      label: `Lesson ${this.lessonIndex + 1} · ${this.lesson.title}`,
      title,
      blocks,
      counter: `Step ${this.stepIndex + 1} / ${n}`,
      prevEnabled: this.stepIndex > 0,
      nextEnabled: !this.quizPending
    });
    if (this.quizPending) this.ui.showQuiz((step as QuizStep).prompt);
  }

  buildRenderState(): RenderState {
    const derived = stateAfter(this.lesson, this.boardStepIndex);
    const step = this.step;
    const focus = step.kind === 'note' ? step.focus ?? null : null;
    const glow = step.kind === 'highlight' && step.style === 'glow' ? step.points : [];
    const territoryOverlay =
      step.kind === 'highlight' && step.style.startsWith('territory')
        ? territory(derived.board).ownerOf
        : null;

    return {
      board: derived.board,
      lastMove: derived.lastMove,
      placing: this.placing,
      focus,
      glow,
      territoryOverlay,
      hover: this.hover,
      quizActive: this.quizPending
    };
  }

  frame(now: number): void {
    if (
      this.autoplay &&
      !this.quizPending &&
      now - this.lastAdvance > AUTOPLAY_MS &&
      this.stepIndex < this.lesson.steps.length - 1
    ) {
      this.next();
    }
    this.renderer.draw(this.buildRenderState(), now);
  }
}

/** stateAfter already flipped toPlay; the stone just placed is the opposite. */
function colorOfLastMove(toPlay: Color): Color {
  return toPlay === 'black' ? 'white' : 'black';
}

function loadProgress(): string[] {
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    return raw ? (JSON.parse(raw) as { completed: string[] }).completed : [];
  } catch {
    return [];
  }
}

function saveProgress(completed: string[]): void {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify({ completed }));
  } catch {
    // Progress persistence is best-effort.
  }
}
```

- [ ] **Step 2: Replace src/main.ts with the real bootstrap**

```ts
import { App } from './app/app';
import { Effects } from './render/effects';
import { Renderer } from './render/renderer';

const canvas = document.querySelector<HTMLCanvasElement>('#scene')!;
const renderer = new Renderer(canvas);
const effects = new Effects(window.innerWidth, window.innerHeight);
const app = new App(renderer, effects, canvas);

new ResizeObserver(() => {
  renderer.resize();
  effects.reseed(window.innerWidth, window.innerHeight);
}).observe(canvas);

const ctx = canvas.getContext('2d')!;
let last = performance.now();
const loop = (now: number) => {
  effects.update(now - last, window.innerWidth, window.innerHeight);
  last = now;
  app.frame(now);
  effects.draw(ctx, now);
  requestAnimationFrame(loop);
};
requestAnimationFrame(loop);
```

- [ ] **Step 3: Manual verification checklist**

Run: `npm run dev` and walk through lessons 1 and 2 fully:
- Lesson chips show both lessons; clicking switches lessons and resets to step 1.
- → / ◀ / ⏮ navigate; panel text, title, and counter update every step.
- Move steps animate the stone in with a ripple; the amber last-move ring tracks.
- Lesson 2 note steps with `focus` dim the rest of the board; highlight steps pulse amber.
- Quiz: Next disabled; clicking the wrong point shows feedback; second miss reveals "Show me"; clicking the right point places the stone — captures dissolve into embers.
- Lesson 2 first quiz: clicking (5,5) shows the diagonal near-miss message.
- Space toggles autoplay; steps advance every ~3.5 s and pause at the quiz.
- Finish lesson 2 → chip gains a ✓; reload the page → ✓ persists.

- [ ] **Step 4: Run checks and commit**

Run: `npm run build && npm test`
Expected: both pass.

```bash
git add src/app/ src/main.ts
git commit -m "feat(app): orchestrator with navigation, quiz flow, autoplay, progress"
```

### Task 12: Lessons 3 & 4 Content

**Files:**
- Create: `src/lessons/lesson3.ts`, `src/lessons/lesson4.ts`
- Modify: `src/lessons/index.ts`

- [ ] **Step 1: Create src/lessons/lesson3.ts**

```ts
import type { Lesson } from './types';

export const lesson3: Lesson = {
  id: 'connection-and-cutting',
  title: 'Connection & Cutting',
  setup: {
    black: [{ x: 3, y: 3 }, { x: 4, y: 4 }],
    white: [{ x: 5, y: 5 }, { x: 6, y: 6 }]
  },
  firstToPlay: 'white',
  steps: [
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Together or apart',
      text:
        'Stones connected along the lines are one {{group}} and share their ' +
        'breath. But look at Hoshi’s two stones: they touch only at the corner. ' +
        'Diagonal stones are NOT connected — yet.',
      focus: [{ x: 3, y: 3 }, { x: 4, y: 4 }]
    },
    {
      kind: 'move',
      point: { x: 4, y: 3 },
      speaker: 'tsuki',
      title: 'The cut',
      text:
        'I slip between your stones. A diagonal has two doors — I walk through ' +
        'one of them. Now your stones must each fend for themselves.'
    },
    {
      kind: 'note',
      speaker: 'narrator',
      text:
        'One white stone has turned two black stones into two separate, weaker ' +
        'groups. Divided stones are easier to capture — divide and conquer is ' +
        'as old as Go itself.'
    },
    {
      kind: 'move',
      point: { x: 3, y: 4 },
      speaker: 'hoshi',
      title: 'Connecting',
      text:
        'I close the second door. My three stones now stand on one breath — ' +
        'count their {{liberties}}: far more than any stone alone.'
    },
    {
      kind: 'note',
      speaker: 'narrator',
      text:
        'Notice the reversal: Hoshi’s wall is strong, and suddenly Tsuki’s ' +
        'cutting stone is the lonely one.',
      focus: [{ x: 4, y: 3 }]
    },
    {
      kind: 'move',
      point: { x: 4, y: 2 },
      speaker: 'tsuki',
      text:
        'A stone that dares to cut must be defended. I reinforce it before ' +
        'Hoshi can strike back.'
    },
    {
      kind: 'note',
      speaker: 'narrator',
      text:
        'Now study Tsuki’s other two stones, standing diagonally in the lower ' +
        'right. Diagonals move fast across the board — but they always leave ' +
        'two doors open.',
      focus: [{ x: 5, y: 5 }, { x: 6, y: 6 }]
    },
    {
      kind: 'quiz',
      title: 'You try: cut!',
      prompt:
        'Where could Black cut Tsuki’s diagonal stones apart? Two points work — click either.',
      accept: [{ x: 5, y: 6 }, { x: 6, y: 5 }],
      hint: 'The two empty points that touch BOTH white stones along the lines.',
      explainCorrect:
        'Cut! The white stones are now two separate groups, each needing its ' +
        'own two {{eyes}} to live. One strong group became two weak ones.',
      explainWrong:
        'Look for an empty point that touches both white stones along the lines — a door between them.'
    },
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Half of all strategy',
      text:
        'Connect your own stones; cut your opponent’s. Strong shapes breathe ' +
        'together — and the player with fewer weak groups usually wins the fight.'
    }
  ]
};
```

- [ ] **Step 2: Create src/lessons/lesson4.ts**

```ts
import type { Lesson } from './types';

export const lesson4: Lesson = {
  id: 'life-and-death',
  title: 'Life & Death',
  // Bottom-left: a black group sealed in by white, alive with eyes at (1,8),(3,8).
  // Top-right: a black group with a three-space eye line (6,0),(7,0),(8,0) — not alive yet.
  setup: {
    black: [
      { x: 0, y: 8 }, { x: 2, y: 8 }, { x: 4, y: 8 },
      { x: 0, y: 7 }, { x: 1, y: 7 }, { x: 2, y: 7 }, { x: 3, y: 7 }, { x: 4, y: 7 },
      { x: 5, y: 0 }, { x: 5, y: 1 }, { x: 6, y: 1 }, { x: 7, y: 1 }, { x: 8, y: 1 }
    ],
    white: [
      { x: 5, y: 8 }, { x: 5, y: 7 },
      { x: 0, y: 6 }, { x: 1, y: 6 }, { x: 2, y: 6 }, { x: 3, y: 6 }, { x: 4, y: 6 },
      { x: 4, y: 0 }, { x: 4, y: 1 },
      { x: 5, y: 2 }, { x: 6, y: 2 }, { x: 7, y: 2 }, { x: 8, y: 2 }
    ]
  },
  firstToPlay: 'black',
  steps: [
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'The question of life',
      text:
        'Tonight’s board holds two black groups, both sealed in by white. ' +
        'Sealed groups cannot run — they must answer the oldest question in ' +
        'Go: can you live where you stand?',
      focus: [{ x: 2, y: 7 }, { x: 7, y: 1 }]
    },
    {
      kind: 'highlight',
      points: [{ x: 1, y: 8 }, { x: 3, y: 8 }],
      style: 'glow',
      speaker: 'narrator',
      text:
        'The lower group is already immortal. These two glowing points are ' +
        '{{eyes}} — empty points completely surrounded by the group.'
    },
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Why two eyes cannot die',
      text:
        'To capture, Tsuki must fill EVERY {{liberty}} — both eyes included. ' +
        'But placing a stone inside either eye would itself have no breath: ' +
        'the rules forbid it as suicide. Two {{eyes}}, two forbidden points, ' +
        'forever. The group cannot be captured by any sequence of moves.'
    },
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'One space is not enough',
      text:
        'Now the upper right. This black group has a row of three empty ' +
        'points — room for eyes, but no {{eyes}} yet. One single point decides ' +
        'whether it lives forever or dies. Tsuki sees it too.',
      focus: [{ x: 6, y: 0 }, { x: 7, y: 0 }, { x: 8, y: 0 }]
    },
    {
      kind: 'quiz',
      title: 'You try: the vital point',
      prompt:
        'Black to play. One move turns this group’s space into two {{eyes}} ' +
        'and eternal life. Click the vital point.',
      accept: [{ x: 7, y: 0 }],
      hint: 'Split the three-space row into two separate single points.',
      explainCorrect:
        'Alive! The space is split into two true {{eyes}}. No matter what ' +
        'White does, this group can never be captured. In Go we say: the vital ' +
        'point of three-in-a-row is its center.',
      explainWrong:
        'That leaves the remaining space in one piece — one big eye is still ' +
        'only one eye, and White can destroy it from inside.',
      nearMisses: [
        {
          point: { x: 6, y: 0 },
          text:
            'Close — but now (7,0) and (8,0) form ONE shared space, a single ' +
            'eye. White plays inside it and the group dies. Split the row at its center.'
        },
        {
          point: { x: 8, y: 0 },
          text:
            'Close — but now (6,0) and (7,0) form ONE shared space, a single ' +
            'eye. White plays inside it and the group dies. Split the row at its center.'
        }
      ]
    },
    {
      kind: 'move',
      point: { x: 4, y: 4 },
      speaker: 'tsuki',
      text:
        'Alive, then — there is nothing left for me there. I take my ' +
        'compensation in the open center instead.'
    },
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Life is two eyes',
      text:
        'Death is everything else, eventually. When you attack, steal the ' +
        'space where {{eyes}} would grow. When you defend, split your space in ' +
        'two while you still can.'
    }
  ]
};
```

- [ ] **Step 3: Update src/lessons/index.ts**

```ts
import type { Lesson } from './types';
import { lesson1 } from './lesson1';
import { lesson2 } from './lesson2';
import { lesson3 } from './lesson3';
import { lesson4 } from './lesson4';

export const lessons: Lesson[] = [lesson1, lesson2, lesson3, lesson4];
```

- [ ] **Step 4: Run the validator**

Run: `npm test`
Expected: PASS — `tests/lessons.test.ts` now validates four lessons. If a move is reported illegal, fix the lesson coordinates (the positions above have been checked by hand, but the validator is the source of truth).

- [ ] **Step 5: Verify in the browser**

Run: `npm run dev` — walk lessons 3 and 4 end to end; check the lesson-3 quiz accepts BOTH cut points and the lesson-4 near-miss messages fire on (6,0) and (8,0).

- [ ] **Step 6: Commit**

```bash
git add src/lessons/
git commit -m "feat(lessons): connection & cutting, life & death"
```

### Task 13: Lessons 5 & 6 Content

**Files:**
- Create: `src/lessons/lesson5.ts`, `src/lessons/lesson6.ts`
- Modify: `src/lessons/index.ts`

- [ ] **Step 1: Create src/lessons/lesson5.ts**

The setup is the exact ko shape verified by the engine test in Task 3.

```ts
import type { Lesson } from './types';

export const lesson5: Lesson = {
  id: 'ko',
  title: 'Ko',
  setup: {
    black: [{ x: 4, y: 3 }, { x: 3, y: 4 }, { x: 4, y: 5 }],
    white: [{ x: 5, y: 3 }, { x: 6, y: 4 }, { x: 5, y: 5 }, { x: 4, y: 4 }]
  },
  firstToPlay: 'black',
  steps: [
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'The eternal fight',
      text:
        'Study this shape — two interlocking mouths. The white stone in the ' +
        'middle is in {{atari}}. Hoshi can capture it. But watch what the ' +
        'capture creates.',
      focus: [{ x: 4, y: 4 }, { x: 5, y: 4 }]
    },
    {
      kind: 'move',
      point: { x: 5, y: 4 },
      speaker: 'hoshi',
      title: 'The capture',
      text: 'Taken! One {{prisoner}} for me.'
    },
    {
      kind: 'note',
      speaker: 'narrator',
      text:
        'But look closely: Hoshi’s new stone now sits in {{atari}} itself — in ' +
        'the very mouth it just emptied. If Tsuki recaptures, the board ' +
        'returns EXACTLY to where it was. Capture, recapture, forever. This ' +
        'shape is called {{ko}} — “eternity.”',
      focus: [{ x: 5, y: 4 }, { x: 4, y: 4 }]
    },
    {
      kind: 'move',
      point: { x: 2, y: 2 },
      speaker: 'tsuki',
      title: 'The rule stays my hand',
      text:
        'The {{ko}} rule: no immediate recapture — I must play somewhere else ' +
        'first. So I build elsewhere and wait. Next turn, if the ko still ' +
        'stands open, I may take it back.'
    },
    {
      kind: 'quiz',
      title: 'You try: end the ko',
      prompt:
        'Tsuki played elsewhere, so Black is free. One move ends this ko ' +
        'forever — click it.',
      accept: [{ x: 4, y: 4 }],
      hint: 'Fill the empty mouth so there is nothing left to recapture.',
      explainCorrect:
        'The ko is finished. Your stones connect into one solid {{group}}, and ' +
        'there is nothing left for White to recapture. Filling the ko is how ' +
        'most kos die.',
      explainWrong:
        'The danger is the empty point where White’s stone used to be — fill ' +
        'it and the fight is over.'
    },
    {
      kind: 'move',
      point: { x: 6, y: 6 },
      speaker: 'tsuki',
      text:
        'Settled. In real games we trade threats over a ko like an auction — ' +
        'each “elsewhere” move must be worth answering, or the opponent simply ' +
        'ends the ko as you just did.'
    },
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'Why the rule exists',
      text:
        'Without the {{ko}} rule, two stubborn players could capture the same ' +
        'stone until the stars burned out. With it, every repetition costs a ' +
        'move elsewhere — and the whole board becomes the tiebreaker.'
    }
  ]
};
```

- [ ] **Step 2: Create src/lessons/lesson6.ts**

A complete, countable game. Both players build a fence; White raids; Black
captures; the engine counts territory. Final score: Black 25 territory + 1
prisoner = 26, White 27 territory — White wins by one point.

```ts
import type { Lesson, Step } from './types';

const wallCommentary: string[] = [
  'We end where every game ends: with territory. I stake my claim on this side.',
  'And I answer, line for line. My fence rises opposite yours.',
  'Stone by stone, my border grows south.',
  'Mine grows with it. A wall is only as strong as its weakest gap.',
  'No gaps in mine.',
  'Nor mine. Watch the empty land behind each fence — that is the real prize.',
  'The land to my left will be mine alone.',
  'And the land to my right, mine.',
  'Halfway down the board now.',
  'Patience. Counting comes to those who finish their fences.',
  'I could turn and invade — but a broken fence loses more than it gains.',
  'Wise. Greed is how fences crumble.',
  'Three lines to go.',
  'Three for me as well.',
  'Almost to the edge.',
  'The edge is a fence that neither of us had to build.',
  'My border is complete.',
  'And mine. Now — shall we count?'
];

const wallSteps: Step[] = wallCommentary.map((text, i) => ({
  kind: 'move' as const,
  point: { x: i % 2 === 0 ? 3 : 5, y: Math.floor(i / 2) },
  speaker: i % 2 === 0 ? ('hoshi' as const) : ('tsuki' as const),
  text
}));

export const lesson6: Lesson = {
  id: 'a-real-game',
  title: 'A Real Game',
  firstToPlay: 'black',
  steps: [
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'The whole game, small',
      text:
        'Tonight Hoshi and Tsuki play a simplified game — one fence each, then ' +
        'we count. Real games sprawl across corners and centers, but the ' +
        'arithmetic at the end is exactly the same.'
    },
    ...wallSteps,
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'The board is divided',
      text:
        'Black owns everything left of his wall; White everything right of ' +
        'hers. The column between the fences touches both colors — those are ' +
        '{{dame}}, neutral points worth nothing.',
      focus: [{ x: 4, y: 3 }, { x: 4, y: 4 }, { x: 4, y: 5 }]
    },
    {
      kind: 'move',
      point: { x: 4, y: 4 },
      speaker: 'hoshi',
      text:
        'I seal the center path. A neutral point — it scores nothing, but it ' +
        'closes the argument.'
    },
    {
      kind: 'move',
      point: { x: 0, y: 0 },
      speaker: 'tsuki',
      title: 'The raid',
      text:
        'Before we count — one desperate raid behind enemy lines! A stone in ' +
        'your corner. What will it cost you to remove me?'
    },
    {
      kind: 'move',
      point: { x: 1, y: 0 },
      speaker: 'hoshi',
      text:
        'It cannot live there — no room for two {{eyes}}. I cut off its escape. ' +
        'One {{liberty}} left: {{atari}}.'
    },
    {
      kind: 'move',
      point: { x: 4, y: 2 },
      speaker: 'tsuki',
      text:
        'While you tidy your house, I take another neutral point — free moves, ' +
        'since you are busy answering me.'
    },
    {
      kind: 'quiz',
      title: 'You try: end the raid',
      prompt: 'Capture the white raider and end the game. Click the point.',
      accept: [{ x: 0, y: 1 }],
      hint: 'The raider’s last {{liberty}} is beside it, on the edge.',
      explainCorrect:
        'Captured — the raid is over, one more {{prisoner}} for Black. Both ' +
        'players now pass: there are no moves left worth making. The game ends.',
      explainWrong: 'Find the white stone’s one remaining empty neighbor.'
    },
    {
      kind: 'highlight',
      points: [],
      style: 'territory-black',
      speaker: 'narrator',
      title: 'Counting Black',
      text:
        'Black’s {{territory}}: 25 empty points behind his fence. Notice the ' +
        'cost of the raid — Hoshi placed two stones inside his own land, and ' +
        'each one erased a point of territory.'
    },
    {
      kind: 'highlight',
      points: [],
      style: 'territory-white',
      speaker: 'narrator',
      title: 'Counting White',
      text:
        'White’s {{territory}}: 27 untouched points. Tsuki spent her spare ' +
        'moves on {{dame}} — worthless, but also costless.'
    },
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'The score',
      text:
        'Black: 25 territory + 1 {{prisoner}} = 26. White: 27. Tsuki wins by ' +
        'one point — the exact price of answering a doomed raid twice inside ' +
        'your own land. (In real games White also receives {{komi}} — bonus ' +
        'points for moving second.)'
    },
    {
      kind: 'note',
      speaker: 'narrator',
      title: 'You know the game now',
      text:
        'Stones breathe, groups live with two {{eyes}}, ko forbids eternity, ' +
        'and the player who fences more empty land wins. Everything else — ' +
        'all of it — is just getting better at these few truths. Play.'
    }
  ]
};
```

- [ ] **Step 3: Update src/lessons/index.ts**

```ts
import type { Lesson } from './types';
import { lesson1 } from './lesson1';
import { lesson2 } from './lesson2';
import { lesson3 } from './lesson3';
import { lesson4 } from './lesson4';
import { lesson5 } from './lesson5';
import { lesson6 } from './lesson6';

export const lessons: Lesson[] = [lesson1, lesson2, lesson3, lesson4, lesson5, lesson6];
```

- [ ] **Step 4: Add a score assertion to the validator**

Append to `tests/lessons.test.ts`:

```ts
import { territory } from '../src/engine/territory';
import { lesson6 } from '../src/lessons/lesson6';

describe('lesson 6 final position', () => {
  it('scores Black 25 + 1 prisoner vs White 27', () => {
    const final = stateAfter(lesson6, lesson6.steps.length - 1);
    const t = territory(final.board);
    expect(t.black).toBe(25);
    expect(t.white).toBe(27);
    expect(final.board.captures.black).toBe(1);
    expect(final.board.captures.white).toBe(0);
  });
});
```

- [ ] **Step 5: Run the validator**

Run: `npm test`
Expected: PASS — all six lessons replay legally and the lesson-6 score matches the commentary.

- [ ] **Step 6: Verify in the browser**

Run: `npm run dev` — walk lessons 5 and 6 end to end. In lesson 5, the ko capture must show embers and the quiz must reject (5,4)-adjacent wrong points gracefully. In lesson 6, the two territory highlights must tint Black's side moon-blue and White's side amber, with the dame column untinted.

- [ ] **Step 7: Commit**

```bash
git add src/lessons/ tests/lessons.test.ts
git commit -m "feat(lessons): ko and the complete counting game"
```

---

### Task 14: README and Final Verification

**Files:**
- Create: `README.md`

- [ ] **Step 1: Create README.md**

```markdown
# Night Garden Go

An interactive tutorial for the game of Go. Two characters — Hoshi (Black)
and Tsuki (White) — play teaching games on a 9×9 board in a lantern-lit
night garden, explaining every move. At key moments, you click the board
and play the move yourself.

## Run

npm install
npm run dev

## Test

npm test

Six lessons: the board, liberties & capture, connection & cutting,
life & death, ko, and a complete counted game.

Built with TypeScript + Canvas 2D. No runtime dependencies.
The rules engine in `src/engine/` is pure and reusable; lessons in
`src/lessons/` are plain data replayed through it.
```

- [ ] **Step 2: Full verification pass**

Run: `npm test && npm run build && npm run preview`
Expected: all tests pass, build succeeds, and the production preview behaves identically to dev — walk lesson 1 and lesson 6 once in the preview build.

Manual checklist (production preview):
- All six chips present; completing a lesson persists ✓ across reload.
- No console errors during a full walkthrough.
- Window resize mid-lesson keeps board, stones, and click targets aligned.

- [ ] **Step 3: Commit**

```bash
git add README.md
git commit -m "docs: readme"
```

---

## Self-Review Notes

- **Spec coverage:** engine (Tasks 2–4), lesson data + replay + validator (5, 6, 12, 13), renderer + effects (7–9), UI overlay (10), orchestrator with quiz flow / autoplay / keyboard / progress (11), all six curriculum lessons (6, 12, 13), README + build verification (14). Sound is a stretch goal in the spec and is intentionally absent. Glossary tooltips implement the spec's term-highlighting requirement.
- **Type consistency:** `Step` union (`note`/`move`/`quiz`/`highlight`) defined in Task 5 is used verbatim in Tasks 6, 11, 12, 13. `stateAfter` signature matches all call sites. Renderer's `RenderState` matches `App.buildRenderState`.
- **Known judgment call:** quiz feedback for an *illegal* click reuses the hint with a fixed prefix rather than per-reason text — sufficient for v1.

