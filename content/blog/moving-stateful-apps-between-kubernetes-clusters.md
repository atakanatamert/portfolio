---
title: Moving a stateful app between Kubernetes clusters, with proof
date: 2026-10-13
summary: How piri copies volumes while the source keeps serving, and why every irreversible step has to record proof before it can run.
---

Moving a stateless app to a new cluster is mostly a deploy. Moving one with data is a different job. You have a database on an NFS-backed volume, a namespace on another cluster where you are not an admin, and a window where something has to stop writing.

[piri](https://github.com/atakanatamert/piri) is a Go CLI I wrote for that job. It moves one app, once, and keeps a record of why each step was safe to take.

## Why not a backup tool

Velero, OADP and similar tools back up and restore a whole cluster. They install CRDs and controllers and need cluster-scoped permissions. That is the right design for disaster recovery. It is the wrong one when all you have on the target is a namespace, a Role, and a deadline.

So piri has one hard rule: everything it does on the target must be possible with a namespace-scoped Role. That rule is enforced in code, not by convention. Every write to the target goes through a single function that refuses any kind not on a namespaced allow-list, and a unit test checks that the list has nothing cluster-scoped in it.

## The shape of a migration

```text
inventory -> sync -> rehearse -> plan -> finalize -> done
```

Everything before `finalize` is reversible and touches nothing on the source.

- **inventory** discovers the source and writes a report, including a review list you sign off row by row.
- **sync** creates the target volumes and one rsync puller pod per volume, then copies while the source keeps serving. You run it again and again until the diff is empty. Days, if the volume is large.
- **rehearse** boots the copy on a throwaway clone to prove it actually starts.
- **plan** shows the freeze checklist and the state of every gate. It is read-only.
- **finalize** is the one-way door. It suspends CronJobs, scales writers to zero, does one last sync, checks the data is byte-identical, and boots the database on the target.

Moving traffic is still yours. piri never touches DNS or your proxy, though it can render an nginx snippet if you have nothing in front of the app.

## Gates, proofs and boring exit codes

Three ideas carry most of the design.

**Nothing smart runs in either cluster.** All the logic is in one static binary on your machine. The only things deployed are plain rsync pods and, at the end, your own workloads.

**Every irreversible step is gated.** Before the state machine can move forward, the evidence that a check passed is written to a local SQLite file as a proof. If a gate fails, nothing moved.

**The CLI is the runbook.** Every command prints the next legal command. Every refusal names the commands that are legal from where you are. Someone with the binary and read access to the source should be able to follow the prompts.

The exit codes are part of that. `3` means a gate refused and `4` means the command is not legal from the current state. Both mean the migration is exactly where you left it, which is what you want to script against.

## The refusal that matters most

Rolling back before the target database has booted is free. After it has booted, piri refuses, until the data has been copied back.

That sounds strict, but the reason is simple. Once a database engine has started on the target volume, that volume holds writes the source does not have. Unfreezing the source at that point would quietly lose them. So the source stays frozen until a reverse sync completes and records its own proof.

## Why Go

A migration tool should be easy to carry into a locked-down environment. piri builds as a static binary with `CGO_ENABLED=0`, no plugins and no runtime downloads. That is also why it uses the pure Go SQLite driver.

## Where it stands

piri is pre-1.0, and the README says so plainly. The end-to-end suite runs the full sequence against two kind clusters on every push, but not every subcommand has run against a real cluster yet, multi-replica StatefulSets are refused, and long transfers with interruptions are not exercised. Do not point it at a production migration you have not rehearsed.

A sensible first run is a non-critical namespace, stopping at `cutover plan`:

```sh
go install github.com/atakanatamert/piri@latest
```

The name comes from Piri Reis, the Ottoman admiral whose 1513 map is still argued about. Map the territory carefully, then prove the map. That is the whole idea.
