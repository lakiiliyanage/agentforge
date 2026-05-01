You are performing end-of-sprint memory cleanup for the AgentForge project.
Work through the following steps in order, confirming each one before moving to the next.

STEP 1 — Identify the week being closed
Ask me: "Which week guide are we archiving?" if it is not obvious from context.

STEP 2 — Summarise what was actually built
Read the current WEEK_X_GUIDE.md and write a 2-sentence summary of what was
*actually completed* (not just planned). Focus on: what exists now that did not before,
and any important decisions or blockers that future-me should know.

STEP 3 — Update CLAUDE.md
- Append the 2-sentence summary under the "## Completed Work" section
- Update "## Current Focus" to reflect the *next* sprint's goal
- Remove the @-import line for the archived guide
- Verify the total character count of CLAUDE.md stays under 8,000 characters

STEP 4 — Update AGENTS.md
- Remove the @-import line for the archived guide if it exists there

STEP 5 — Archive the guide
Move the week guide to /docs/weeks/ (create the folder if it does not exist):
mv WEEK_X_GUIDE.md docs/weeks/WEEK_X_GUIDE.md

STEP 6 — Confirm and report
Tell me:
- What summary was written to CLAUDE.md
- Which @-imports were removed
- The new character count of CLAUDE.md
- What the "Current Focus" is now set to

