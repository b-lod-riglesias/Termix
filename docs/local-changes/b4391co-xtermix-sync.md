# b4391co xtermix local changes

This branch contains the local Termix customizations currently deployed in BONECA/CPD.

## Main areas

- Host sharing compatibility for hosts using credentials or legacy inline auth data.
- RBAC and permission handling hardening around host/credential access.
- Host manager UI updates for sharing and credential handling.
- SSH terminal and Guacamole route compatibility changes.
- Service worker and Vite/runtime configuration adjustments for the local deployment.
- Locale key updates for the related UI changes.

## Verification

- `npm run type-check` passes with `tsc --noEmit`.

## Git metadata

Committed locally as `b4391co-boneca <boneca@b4391co.com>` for publication to `b4391co/xtermix`.
