---
title: Recording why AI-written code exists
date: 2026-10-27
summary: git blame tells you who changed a line. Flight Recorder keeps the reason, by joining coding-agent transcripts with git history.
---

When a coding agent writes a line, the reason for it usually exists in exactly one place: the session transcript. The agent said what it assumed, what it decided, and what it was unsure about. Then the session ended.

Transcripts live on one machine and get cleaned up after a while. The code stays for years. A few months later someone asks why a value is what it is, and the only record is gone.

[Flight Recorder](https://github.com/atakanatamert/flight-recorder) (`fdr`) is a small Go tool I wrote to keep that record. The one-line version: `git blame` tells you who, `fdr` tells you why.

## Why not just ask a model

A model reading the code can explain what it does, often very well. But why a line exists is not in the code. Without the record, the model gives you a plausible reason, and a plausible reason reads exactly like a real one.

The README uses a small example. Ask why a session TTL is 24 hours, and a model reading only the code says 24 hours is a common default. The transcript says:

> The spec doesn't define expiry; assuming 24h, flagging for review.

One of those is a record. The other is a guess that looks like one, and it is most dangerous when it is wrong.

## What it does

`fdr` reads the transcripts your harness already writes. Today that is Claude Code, Oh My Pi and the Codex CLI. It joins them with your git history and distills the result into a small, text-only, append-only ledger in `.fdr/`, which you commit with your code.

```sh
fdr init
fdr sync
fdr why internal/auth/session.go:142
```

`fdr why` answers with the original task, the agent's stated reasoning word for word, and the commit. It runs offline and gives the same answer every time. There is no model in the loop.

Because the ledger is committed, the answer still works from a fresh clone, on a machine that never ran the original session.

## Honest answers over clever ones

The more interesting part is what happens when `fdr` does not know.

It answers by walking a fixed ladder. First it uses `git blame` to find the commit that introduced the line and looks for records anchored to that change. If several records match, it returns all of them, labelled, rather than picking one. If there is no line-level record, it falls back to the file: who touched it, and which sessions edited it. If there is nothing at all, it says so and tells you where the ledger's coverage starts.

Every answer also has to pass a check. A record is only returned if the lines it says were added actually match the diff of the resolved commit. If they do not, the answer degrades to a lower rung instead of guessing.

Human edits have no transcript, and `fdr` says that plainly too. It will never explain code no agent wrote.

## Small, private, and careful with secrets

The ledger keeps selections, not whole transcripts. Statement text and diff excerpts are capped, and the bulk of a transcript, file reads and tool output, is dropped because it carries no provenance.

Agents sometimes echo credentials into their reasoning. Before anything reaches the ledger, a redaction pass replaces known secret shapes and high-entropy tokens with visible markers like `[REDACTED:github-token]`, and files like `.env` are never excerpted. That is a safety net, not a guarantee, so review the `.fdr/` diff before you push, like any other file.

`fdr` makes no network calls. No telemetry, no update checks.

## Using it with agents

`fdr` is meant to be read by agents as much as by people. `fdr why <file>:<line> --json` returns verified records or a clear miss, with exit codes to match. A short note in `AGENTS.md` or `CLAUDE.md` asks the agent to check it before changing code it did not write this session, quote the record instead of paraphrasing, and say plainly when nothing is known.

## Limits

Coverage starts when you start. Transcripts your harness already deleted cannot be recovered. Extraction misses some phrasings. Commits rewritten by a rebase or squash currently fall back to a file-level answer. The README lists all of these, and I would rather say them up front.

If you want to try it:

```sh
go install github.com/atakanatamert/flight-recorder/cmd/fdr@latest
fdr preflight
```
