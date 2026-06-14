# Night Garden Go — Chapters 4–10 Curriculum

Research-backed arc for seven new chapters. Each chapter has **6 lessons** (matching Chapters 1–3), validated against the engine, Night Garden voice (Hoshi / Tsuki / narrator), and glossary terms.

**Pedagogical order** (OGS, Sensei's Library, Kageyama, Ishida): reading → urgency/direction → influence → joseki-in-context → ko → endgame → capstone game.

---

## Chapter 4 — Life & Death Deep Dive
*Subtitle: Puzzles in Moonlight*

Tsumego habits after tactics. Students learn to find the **vital point** before every local fight ends.

| # | ID | Title | Core skill |
|---|-----|-------|------------|
| 19 | vital-point | The Vital Point | One move splits eyes or kills |
| 20 | l-group | The L-Group | Classic corner death shape |
| 21 | run-to-live | Run to the Edge | Escape / connect outward |
| 22 | bent-four | Bent Four in the Corner | Known dead shape (concept) |
| 23 | kill-without-capture | Kill by Shape | Outside atari + fill |
| 24 | puzzle-rhythm | Puzzle Rhythm | Review: read before you play |

---

## Chapter 5 — Direction & Urgency
*Subtitle: Where the Board Calls*

**Haengma** — urgent vs big; defend weak groups; tenuki when the local fight is settled.

| # | ID | Title | Core skill |
|---|-----|-------|------------|
| 25 | urgent-vs-big | Urgent Before Big | Fix weakness before territory |
| 26 | weak-groups | Weak Stones | Groups with few eyes / cutting points |
| 27 | peep-and-connect | Peep and Answer | Threaten cut; defend |
| 28 | sacrifice | Order of Sacrifice | Give stones to save the group |
| 29 | miai | Miai — Mutual Points | Either move works; opponent chooses |
| 30 | whole-board-glance | The Whole Board | Largest area / direction |

---

## Chapter 6 — Influence & Thickness
*Subtitle: Stones That Cast Shadows*

Do not cash thickness for small territory. Use it to attack and build frameworks.

| # | ID | Title | Core skill |
|---|-----|-------|------------|
| 31 | what-is-thickness | What Is Thickness? | Solid, outward-facing power |
| 32 | moyo | Building a Framework | Large potential territory |
| 33 | invasion-vs-reduction | Invasion or Reduction? | Deep vs light approach |
| 34 | use-thickness | Attack with Thickness | Push toward open area |
| 35 | overconcentration | Do Not Overconcentrate | Too many stones, one area |
| 36 | wall-value | The Value of a Wall | Influence toward center |

---

## Chapter 7 — Joseki on 9×9
*Subtitle: Corner Stories*

Short corner sequences with **why**, not memorization.

| # | ID | Title | Core skill |
|---|-----|-------|------------|
| 37 | star-point-approach | Approaching the Star | 4-4 approach basics |
| 38 | three-three | The 3-3 Invasion | Live small in the corner |
| 39 | one-space-low | One-Space Low Enclosure | Fence the corner |
| 40 | kick-and-extend | Kick and Extend | Respond along the side |
| 41 | pincer-spirit | The Pincer Idea | Pressure from farther away |
| 42 | joseki-choice | Choosing a Joseki | Thickness vs territory trade |

---

## Chapter 8 — Ko Fighting
*Subtitle: Storms in the Garden*

Beyond the ko rule: threats, timing, and when to fight.

| # | ID | Title | Core skill |
|---|-----|-------|------------|
| 43 | ko-threats | Ko Threats | Play elsewhere to recapture |
| 44 | threat-size | How Big Is a Threat? | Threat must matter |
| 45 | ignore-ko | Ignore Ko? | When the ko is small |
| 46 | multi-step-ko | Multi-Step Ko | One-sided recapture chains |
| 47 | ko-and-life | Ko in Life & Death | Living by ko |
| 48 | ko-fight-finish | Ending the Fight | Connect; remove ko possibility |

---

## Chapter 9 — Endgame
*Subtitle: The Quiet Last Walk*

**Yose** — sente, gote, counting, largest move.

| # | ID | Title | Core skill |
|---|-----|-------|------------|
| 49 | sente-gote | Sente and Gote | Who answers locally |
| 50 | double-sente | Double Sente | Both want to play first |
| 51 | count-the-points | Count the Points | Area vs territory on 9×9 |
| 52 | largest-move | Largest Move First | Big endgame points |
| 53 | dame-last | Dame Last | Neutral points score nothing |
| 54 | half-point | Half-Point Fights | Small but decisive |

---

## Chapter 10 — One Full Night
*Subtitle: A Complete Game*

Capstone: scripted 9×9 from opening to scoring with commentary.

| # | ID | Title | Core skill |
|---|-----|-------|------------|
| 55 | opening-reminder | Opening Moves | Corners → sides → center |
| 56 | first-fight | The First Fight | Apply tactics mid-game |
| 57 | middle-turning | The Turning Point | Direction / thickness |
| 58 | ko-moment | A Ko Appears | Ko fight in context |
| 59 | yose-phase | Entering Yose | Switch to counting |
| 60 | scoring-night | Scoring the Night | Territory + prisoners + komi |

---

## Babysitter rules

1. **One chapter per cycle** — never skip ahead; update `STATE.json` after each.
2. **Engine first** — every `move` and `quiz accept` must pass `stateAfter()` / `npm test`.
3. **Glossary** — every `{{term}}` must exist in `src/lessons/glossary.ts`.
4. **Voice** — Hoshi bold/aggressive, Tsuki calm, narrator poetic but clear.
5. **Fun** — each lesson needs one memorable image or line (“the stair”, “the net”, “moonlight puzzles”).
6. **Ship** — after each chapter: `npm test`, commit, `npm run deploy`.
7. **UI** — if chapter count > 3, consider scrollable chapter bar (see `src/styles.css`).