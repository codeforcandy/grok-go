#!/usr/bin/env node
/**
 * Chapter babysitter — prints the next build target for humans or AI agents.
 * Does not generate lessons itself; orchestrates the workflow.
 */
import { readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const statePath = join(root, '.superpowers/chapter-babysitter/STATE.json');
const curriculumPath = join(root, '.superpowers/chapter-babysitter/CURRICULUM.md');

const state = JSON.parse(readFileSync(statePath, 'utf8'));
const next = state.nextChapter;

if (next > 10) {
  console.log('🌙 All chapters complete (1–10). Sleep well.');
  process.exit(0);
}

const ch = state.chapters[String(next)];
if (!ch) {
  console.error(`No chapter ${next} in STATE.json`);
  process.exit(1);
}

if (ch.status === 'done') {
  state.nextChapter = next + 1;
  writeFileSync(statePath, JSON.stringify(state, null, 2) + '\n');
  console.log(`Chapter ${next} already done. Advanced to ${state.nextChapter}. Re-run.`);
  process.exit(0);
}

const curriculum = readFileSync(curriculumPath, 'utf8');
const sectionRe = new RegExp(`## Chapter ${next} —[\\s\\S]*?(?=\\n## Chapter |$)`);
const section = curriculum.match(sectionRe)?.[0] ?? '(see CURRICULUM.md)';

console.log(`
╔══════════════════════════════════════════════════════════════╗
║  🌙 NIGHT GARDEN GO — CHAPTER BABYSITTER                     ║
╚══════════════════════════════════════════════════════════════╝

Next chapter:  ${next}
Subtitle:      ${ch.subtitle}
Lessons:       ${ch.lessons.join(', ')}
Status:        ${ch.status}

${section}

────────────────────────────────────────────────────────────────
AGENT INSTRUCTIONS (execute now, one chapter only):

1. Implement lessons ${ch.lessons[0]}–${ch.lessons[5]} in src/lessons/
2. Wire chapter ${next} in src/lessons/chapters.ts
3. Extend glossary for all {{terms}}
4. npm test  →  must pass
5. npm run deploy
6. Mark chapter ${next} "done" in STATE.json, set nextChapter to ${next + 1}
7. git commit -m "feat(chapter-${next}): ${ch.subtitle}"

Skill file: .superpowers/chapter-babysitter/SKILL.md
Good luck. The garden grows while you sleep.
`);

// Optional: run tests to show current health
try {
  execSync('npm test', { cwd: root, stdio: 'inherit' });
} catch {
  console.error('\n⚠️  Tests failing before babysit cycle — fix baseline first.\n');
  process.exit(1);
}