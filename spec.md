# Beyond Neural

## Current State
- Navigation has a "Mission" tab linking to /about (AboutPage)
- AboutPage has: badge "Our mission", h1 "Mission", intro paragraph, "What we stand for" grid of 4 values, then a blockquote with "You are not your diagnosis..." and attribution "- The Beyond Neural community"
- No email signup or admin page exists

## Requested Changes (Diff)

### Add
- Email signup section on the Stay Connected page (replacing the blockquote): "Stay connected to Beyond Neural" heading, description copy, email input, submit button, and success message "You'll hear from us soon. Until then, you're always welcome here."
- Backend: `subscribeEmail(email: Text, name: Text)` function to store subscribers
- Backend: `getSubscribers()` admin-only query returning all subscribers
- Admin page at /admin with password protection showing all email subscribers (name, email, date)
- Route for /admin in App.tsx

### Modify
- Nav label "Mission" -> "Stay Connected" (Layout.tsx)
- AboutPage h1 "Mission" -> "Stay Connected"
- AboutPage badge text "Our mission" -> "Stay connected"
- Remove the blockquote section (the "You are not your diagnosis" quote + "The Beyond Neural community" attribution)
- Replace blockquote with the email signup section

### Remove
- The blockquote component at the bottom of AboutPage

## Implementation Plan
1. Add `subscribeEmail` and `getSubscribers` to backend Motoko
2. Update Layout.tsx: nav label Mission -> Stay Connected
3. Update AboutPage: rename headings, remove blockquote, add email signup form with success state
4. Add AdminPage at /admin with simple password gate and subscriber list table
5. Add /admin route in App.tsx
