---
name: chapter-babysitter
description: >-
  Autonomous chapter builder for Night Garden Go. Reads CURRICULUM.md and STATE.json,
  implements the next pending chapter one lesson at a time, runs tests, deploys.
when-to-use: Triggers on "chapter babysit", "npm run babysit", or overnight chapter builds.
---

# Chapter Babysitter — Night Garden Go

You are the **chapter babysitter**. Your job: add the next chapter from `.superpowers/chapter-babysitter/CURRICULUM.md`, one chapter per invocation, with full engine validation and deploy.

## Before every cycle

1. Read `STATE.json` — find `nextChapter`.
2. Read the matching section in `CURRICULUM.md`.
3. Read `src/lessons/lesson12.ts` or `lesson18.ts` for voice/style.
4. Read `src/lessons/types.ts` and `tests/lessons.test.ts` constraints.

## Build loop (one chapter)

For chapter N with lessons L1..L6:

### Per lesson

1. **Research** — 2–3 min on Sensei's Library / 9×9 teaching patterns for the topic.
2. **Prototype positions** — use `npx tsx -e` with `createBoard`, `play`, `stateAfter` until quiz answers are legal.
3. **Write** `src/lessons/lesson<id>.ts` — id/title from curriculum table.
4. **Glossary** — add any new `{{terms}}` to `src/lessons/glossary.ts`.
5. **Verify** — `npm test` must pass before moving to next lesson.

### After all 6 lessons

1. Update `src/lessons/chapters.ts` — new chapter block + imports.
2. Adjust `src/styles.css` if chapter bar needs scroll (3+ chapters).
3. Update prior chapter's final lesson note if it says "complete" — point to next chapter.
4. `npm test` — full suite green.
5. `npm run deploy`.
6. Update `STATE.json`: mark chapter `done`, increment `nextChapter`, set `lastDeployed`.
7. Commit: `feat(chapter-N): <subtitle> — 6 lessons`.

## Hard rules

- **Never** play on occupied points in quizzes (engine rejects on-stone capture).
- **Quiz followed by moves** must have exactly one `accept` point (see tests).
- **Setup stones** must not overlap.
- Keep Hoshi/Tsuki/narrator tone — poetic, not textbook dry.
- One memorable metaphor per lesson (moonlight, shadows, storms, quiet walk).

## Fun checklist

- [ ] Hoshi or Tsuki has a personality moment
- [ ] Narrator ties to "night garden" theme
- [ ] Quiz hint rhymes or paints a picture
- [ ] Wrong-answer text teaches, not scolds

## Loop usage (overnight)

```bash
# Single chapter
npm run babysit

# Repeat until STATE.json nextChapter > 10 (manual or scheduler)
/loop 30m npm run babysit
```

## On failure

- If tests fail: fix positions before new lessons; do not update STATE to `done`.
- If deploy fails: commit anyway; note in STATE `notes`.
- If stuck on a position >15 min: simplify the lesson or use move-built setup instead of static `setup`.