# DATA_DELETION_REQUEST_BACKEND_REQUEST.md

## Goal
Implement backend support for a web page where an authenticated Tamkko user can request deletion of **some** or **all eligible** data **without deleting their account**.

This is a separate privacy workflow from:
- account deactivation
- account deletion request
- data export request

The account should generally remain active unless backend identifies a separate policy, security, or moderation reason to restrict it.

---

## Base
- Base URL: `/api/v1`
- Auth required: `Authorization: Bearer <access_token>` or equivalent authenticated session

Success envelope:
```json
{
  "success": true,
  "message": "Data deletion request submitted.",
  "data": {}
}
```

Error envelope:
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
`POST /api/v1/users/me/data-deletion-request`

---

## Expected Request Payload
```json
{
  "request_type": "partial",
  "delete_all_eligible_data": false,
  "categories": [
    "posts_and_media",
    "comments_and_replies",
    "profile_fields"
  ],
  "reason_details": "Optional user-provided explanation",
  "confirmation_text": "DELETE DATA",
  "acknowledge_retention_exceptions": true
}
```

### Field notes
- `request_type`
  - Required.
  - Expected values:
    - `partial`
    - `full_non_account`
- `delete_all_eligible_data`
  - Required boolean.
  - `true` when user wants all eligible data removed without deleting the account.
- `categories`
  - Required array for partial requests.
  - Empty array acceptable when `delete_all_eligible_data === true`.
  - Current frontend category values:
    - `posts_and_media`
    - `comments_and_replies`
    - `profile_fields`
    - `room_activity`
    - `support_history`
    - `non_required_analytics`
- `reason_details`
  - Optional nullable string.
- `confirmation_text`
  - Required.
  - Must equal `DELETE DATA` after trim.
- `acknowledge_retention_exceptions`
  - Required boolean.
  - Must be `true`.

---

## Expected Success Response
```json
{
  "success": true,
  "message": "Data deletion request submitted.",
  "data": {
    "request_id": "ddr_01JXYZ123ABC",
    "request_state": "submitted",
    "request_type": "partial",
    "requested_categories": [
      "posts_and_media",
      "comments_and_replies",
      "profile_fields"
    ],
    "submitted_at": "2026-06-10T14:30:00.000Z",
    "review_eta": "2026-06-13T14:30:00.000Z"
  }
}
```

### Frontend expectations
- User should see that the request was accepted even if actual deletion happens asynchronously.
- Account stays active.
- Frontend can display returned categories and state immediately.

---

## Required Backend Behavior
1. Validate auth and identify the current user.
2. Validate `confirmation_text`.
3. Validate `acknowledge_retention_exceptions === true`.
4. Validate category list for partial requests.
5. Create a reviewable deletion request record with:
   - request id
   - request type
   - requested categories
   - reason details
   - submitted timestamp
   - actor/user id
   - IP / session / device metadata where available
6. Leave account state active unless separate security or policy handling is required.
7. Route the request to backend workflows that determine:
   - what can be deleted immediately
   - what must be soft-deleted
   - what must be retained
   - what requires manual/privacy-team review
8. Return a stable request status for frontend display.

---

## Retention / Non-Deletable Categories
Backend should be able to deny or partially fulfill requests for records that must be retained for:
- legal obligations
- law enforcement preservation
- fraud detection and investigations
- payment reconciliation and settlement
- tax and accounting
- abuse and moderation evidence
- core security logs

If a request is only partially allowed, backend should preserve an auditable explanation.

---

## Optional Status Endpoint
Recommended:

`GET /api/v1/users/me/data-deletion-request/:requestId`

### Example response
```json
{
  "success": true,
  "data": {
    "request_id": "ddr_01JXYZ123ABC",
    "request_state": "partially_completed",
    "request_type": "partial",
    "requested_categories": [
      "posts_and_media",
      "comments_and_replies",
      "profile_fields"
    ],
    "completed_categories": [
      "profile_fields"
    ],
    "retained_categories": [
      "comments_and_replies"
    ],
    "retention_reason_summary": "Some records are retained for moderation and fraud review.",
    "submitted_at": "2026-06-10T14:30:00.000Z",
    "updated_at": "2026-06-11T09:10:00.000Z"
  }
}
```

---

## Error Cases

### Missing categories for partial request
```json
{
  "success": false,
  "message": "Choose at least one data category."
}
```

### Invalid confirmation text
```json
{
  "success": false,
  "message": "Type DELETE DATA to confirm this request."
}
```

### Missing acknowledgement
```json
{
  "success": false,
  "message": "You must acknowledge retention exceptions before continuing."
}
```

### Duplicate pending request
```json
{
  "success": false,
  "message": "A data deletion request is already pending review."
}
```

---

## Security Requirements
- Rate-limit this endpoint.
- Audit-log all requests and downstream actions.
- Require recent authentication / step-up verification if backend policy treats this as a high-risk privacy action.
- Make downstream deletion jobs idempotent and safe to retry.

---

## Notes For Frontend Alignment
- The new web page is already shaped around the payload and response documented here.
- If backend wants different category keys or a required privacy-review step, frontend will need a small follow-up update.
- This flow should not implicitly delete the account or log the user out unless backend explicitly decides that a separate account restriction is needed.
