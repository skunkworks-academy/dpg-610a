---
title: Threat Protection
description: Defending against XML/JSON attacks, oversized payloads, and malformed input at the edge.
---

# Threat Protection

:::info Lesson status
This lesson is a focused **outline**. The threat categories and controls below
are complete enough to design from; expand with the linked IBM docs.
:::

Because DataPower is the edge, it's the right place to **reject malicious input
before it reaches the backend**. Threat protection is a mix of built-in
parser limits and explicit checks you enable per service.

## Common threats and controls

| Threat | Example | DataPower control |
| --- | --- | --- |
| **XML bomb / entity expansion** | "Billion laughs" recursive entities | Parser limits: max nodes, depth, entity expansion |
| **Oversized payload** | Multi-GB body to exhaust memory | Message/attachment size limits |
| **Deeply nested / wide documents** | Extreme nesting or element width | Max nesting depth, max width limits |
| **Schema violation** | Unexpected/extra fields | **Validate** action against XSD/WSDL |
| **Injection (SQL/XPath/JSON)** | Malicious content in fields | Filtering, validation, content checks |
| **Single-message DoS** | One pathological message | Parser limits + timeouts |
| **Dictionary / replay attacks** | Token reuse | AAA + nonce/timestamp checks |

## Where the limits live

- **XML/JSON parser limits** are configured on the service (or via an XML Manager
  / parser-settings object) — maximum document size, nesting depth, node count,
  attribute count, and entity expansion.
- **JSON-specific limits** include maximum array/object nesting, label/string
  length, and document size.
- **Validate actions** enforce that the message conforms to a known schema,
  rejecting anything unexpected.

## Design guidance

- Set parser limits to the **tightest values your real traffic needs** — defaults
  are generous.
- **Validate early** in the request rule so malformed messages are rejected
  before expensive processing.
- Combine with **AAA** (reject unauthenticated callers first) and **TLS** for
  defence in depth.
- Pair edge threat protection with **rate limiting / quotas** (often in API
  Connect) to blunt volumetric abuse.

## Outline: topics to expand

- Configuring parser limits via the **XML Manager** and parser settings objects.
- The **Filter** action and content-based rejection.
- JSON document threat settings.
- Combining threat protection with monitors and SLM (service-level monitoring).

## Reference

- IBM Docs: *XML threat protection* and *Parser limits* in the
  [DataPower documentation](https://www.ibm.com/docs/en/datapower-gateway).

<Quiz questions={[
  {
    prompt: 'Which control best defends against an "XML bomb" (recursive entity expansion)?',
    options: [
      {text: 'A larger backend database'},
      {text: 'Parser limits: max entity expansion, nesting depth, and node count', correct: true},
      {text: 'Disabling TLS'},
      {text: 'Adding more front-side handlers'},
    ],
    explanation: 'XML bombs exploit unbounded entity expansion/nesting. Parser limits cap expansion, depth, and node counts to reject such documents.',
  },
  {
    prompt: 'Why validate messages early in the request rule?',
    options: [
      {text: 'To reject malformed/unexpected input before doing expensive downstream processing', correct: true},
      {text: 'Because validation must always run last'},
      {text: 'It improves the appliance’s firmware version'},
      {text: 'Validation is only for responses'},
    ],
    explanation: 'Validating early rejects bad input cheaply and keeps malformed/malicious messages away from later actions and the backend.',
  },
]} />

<LessonComplete lessonId="security/threat-protection" />
