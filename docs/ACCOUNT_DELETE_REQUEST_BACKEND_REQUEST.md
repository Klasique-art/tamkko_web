# ACCOUNT_DELETE_REQUEST_BACKEND_REQUEST.md

## Goal
Implement backend support for a user-facing web page where authenticated users can request deletion of their Tamkko account and associated platform data.

This request should align with the mobile project direction in `ACCOUNT_DEACTIVATE_DELETE_BACKEND_REQUEST.md`, but this document is focused specifically on the **delete account request** flow needed by the web page.

---

## Base
- Base URL: `/api/v1`
- Auth required: `Authorization: Bearer <access_token>` or equivalent authenticated session
- Success response envelope:

```json
{
  "success": true,
  "message": "Account deletion scheduled.",
  "data": {}
}
```

- Error response envelope:

```json
{
  "success": false,
  "message": "Human readable message",
  "errors": [
    { "message": "Optional detailed error message" }
  ]
}
```

---

## Endpoint
`POST /api/v1/users/me/delete-request`

---

## Expected Request Payload
```json
{
  "confirmation_text": "DELETE",
  "reason_code": "privacy_request",
  "reason_details": "Optional user-provided context",
  "acknowledge_data_removal": true
}
```

### Field notes
- `confirmation_text`
  - Required.
  - Must equal `DELETE` after trim.
  - Case-insensitive acceptance is okay, but frontend currently submits uppercase.
- `reason_code`
  - Required.
  - Expected values:
    - `privacy_request`
    - `no_longer_needed`
    - `safety_concern`
    - `other`
- `reason_details`
  - Optional string.
  - Nullable.
  - Store for audit/support context.
- `acknowledge_data_removal`
  - Required boolean.
  - Must be `true`.
  - Confirms the user has acknowledged that some records may still be retained where required by law, fraud prevention, accounting, tax, payment reconciliation, or security obligations.

---

## Expected Success Response
```json
{
  "success": true,
  "message": "Account deletion scheduled.",
  "data": {
    "account_state": "deletion_pending",
    "deletion_requested_at": "2026-06-10T14:05:00.000Z",
    "scheduled_deletion_at": "2026-06-17T14:05:00.000Z",
    "grace_period_days": 7,
    "logout_required": true
  }
}
```

### Frontend expectations
- Web page should show the returned timestamps and grace period.
- Frontend should assume normal product access should end immediately or very soon after success.
- Frontend may redirect the user to login or a signed-out state if auth handling exists.

---

## Required Backend Behavior
1. Validate auth and identify the current user.
2. Validate `confirmation_text`.
3. Validate `acknowledge_data_removal === true`.
4. Reject duplicate requests if account is already in `deletion_pending`.
5. Set account state to `deletion_pending`.
6. Persist:
   - `reason_code`
   - `reason_details`
   - request timestamp
   - actor/user id
   - IP
   - device/session metadata if available
7. Revoke or invalidate all active sessions/tokens after a successful request.
8. Schedule hard-delete processing after the grace period.
9. Remove the account from normal discovery/feed/public visibility according to platform policy.
10. Retain only records that must remain for:
    - payment reconciliation
    - fraud prevention
    - tax/accounting
    - legal obligations
    - security investigations

---

## Optional Companion Endpoint
If backend supports undo during the grace period, implement:

`POST /api/v1/users/me/delete-request/cancel`

### Success response
```json
{
  "success": true,
  "message": "Deletion request cancelled.",
  "data": {
    "account_state": "active",
    "cancelled_at": "2026-06-12T10:30:00.000Z"
  }
}
```

---

## Error Cases

### Invalid confirmation text
```json
{
  "success": false,
  "message": "Type DELETE to confirm account deletion"
}
```

### Missing acknowledgement
```json
{
  "success": false,
  "message": "You must acknowledge the deletion terms before continuing."
}
```

### Deletion already pending
```json
{
  "success": false,
  "message": "Deletion already requested."
}
```

### Recent authentication required
```json
{
  "success": false,
  "message": "Recent authentication is required before account deletion.",
  "data": {
    "reauth_required": true
  }
}
```

---

## Security Requirements
- Rate-limit this endpoint.
- Audit-log every deletion request.
- Require recent authentication / step-up verification if your auth model supports it.
- Make sure deletion jobs are idempotent and safe to retry.
- Never expose precise internal deletion-job details to the client.

---

## Notes For Backend + Frontend Alignment
- The web page is already structured around the fields and response shape documented here.
- If the backend uses a different envelope or payload shape, the page will need a follow-up adjustment.
- If backend wants a stronger confirmation flow such as password, OTP, or 2FA confirmation, add those fields before enabling this in production.
