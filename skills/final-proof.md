# SKILL: Final Proof of Work

## Mission
To enforce a strict, evidence-based definition of "DONE" for every task, preventing premature or unverified completion claims and ensuring all quality gates have been passed.

## Scope
This skill must be the **final step** applied by an agent before delivering its final response to the user for any development or deployment task.

## Source References Studied
- This skill is a synthesis of best practices from all previously studied sources, formalizing the concept of a "Definition of Done."

## Core Principles
- **Show, Don't Tell:** Proof is more valuable than claims. The output must contain evidence of completion.
- **"DONE" is an objective state:** A task is only DONE when it is designed, built, tested, and (if requested) deployed, with proof for each step.
- **Transparency is mandatory:** All errors, failures, and remaining risks must be reported clearly. Hiding problems is a critical failure.
- **The User's Next Step Must Be Clear:** The final output must guide the user on what to do next, if anything.

## Strict "DONE" Rules
1.  **Do not say `DONE` without providing proof** as defined in the Output Contract below.
2.  **`PARTIAL` is the correct status** if any required proof is missing (e.g., code was written but not tested, or a Lighthouse score was not measured).
3.  **`FAILED` is the correct status** if a build, test, or deployment fails.
4.  **`BLOCKED` is the correct status** if you cannot proceed due to missing information, access, or a dependency.
5.  **`NEEDS_USER_ACTION` is the correct status** if the user must perform a specific action (e.g., run a command, provide a secret).

## Final Proof Structure (Output Contract)

Your final response to the user for any given task *must* include the following sections, in order.

### 1. Request Summary
A brief, one-sentence summary of the user's original request.

### 2. Files Changed
A list of all files that were created, modified, or deleted.

### 3. Commands Run
A log of the significant commands that were executed (e.g., `npm run build`, `vercel`, `npx rimraf`).

### 4. Build & Lint Result
- The final exit code and summary of the build command (e.g., `npm run build`).
- Must explicitly state `Success` or `Failed`.

### 5. Quality Gate Results
A summary of the checks from the other skills.
- **Design Gate:** "Checked against `visual-design` skill: [Pass/Fail/Not Applicable]"
- **Performance Gate:** "Checked against `performance` skill: [Pass/Fail/Not Applicable]" (Include Lighthouse score if measured).
- **Security Gate:** "Checked against `security` skill: [Pass/Fail/Not Applicable]"

### 6. Vercel Deploy Result (If Applicable)
- **Deployment Target:** `Preview` or `Production`.
- **Status:** `Success` or `Failed`.
- **Preview URL:** The generated URL for the preview deployment.
- **Production URL:** The live production URL.

### 7. Remaining Risks
A bulleted list of any known issues, limitations, or potential problems that were not addressed.

### 8. Final Status
One of the following, and only one: `DONE`, `PARTIAL`, `FAILED`, `BLOCKED`, `NEEDS_USER_ACTION`.

## Common AI Mistakes to Avoid
- **Claiming "DONE" too early:** Saying a task is done after only writing the code, without building, testing, or deploying it.
- **Hiding errors:** Reporting a successful build when there were warnings, or not showing the error output from a failed command.
- **Faking results:** Inventing a Lighthouse score or claiming a security review was performed when it wasn't.
- **Providing a vague summary:** Not including the specific, structured proof required by this skill.

## Quality Gate (Self-Check)
Before providing the final response, you must ask yourself: "Does my response contain all the sections required by the Final Proof Structure?"

## Output Contract
Your entire final output for the task is this structured proof.
