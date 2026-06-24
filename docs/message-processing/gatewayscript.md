---
title: GatewayScript
description: DataPower's server-side JavaScript for imperative message processing and service calls.
---

# GatewayScript

:::info Lesson status
This lesson is a focused **outline** with working snippets. Expand it with the
linked IBM docs as you experiment.
:::

**GatewayScript** is DataPower's server-side **JavaScript** environment for
message processing. It's the natural choice when logic is imperative, JSON-heavy,
or needs to call other services — places where XSLT gets awkward.

## The shape of a GatewayScript action

A GatewayScript action runs a `.js` file from `local:`. You read the input,
do work, and write the output via the `session` and `context` APIs:

```javascript
// Read the parsed input message, transform it, write the output.
var sm = require('service-metadata');
session.input.readAsJSON(function (error, json) {
  if (error) {
    session.reject('Could not parse JSON: ' + error.message);
    return;
  }

  // Imperative business logic
  var out = {
    id: json.orderId,
    customer: json.customer && json.customer.name,
    total: Number(json.amount) || 0,
    receivedAt: new Date().toISOString(),
  };

  // Set a header and the dynamic backend
  var hm = require('header-metadata');
  hm.current.set('X-Processed-By', 'datapower-gatewayscript');
  sm.setVar('var://service/routing-url', 'https://backend.internal/orders');

  session.output.write(out);
});
```

## Useful built-in modules

| Module | Purpose |
| --- | --- |
| `service-metadata` | Read/write service variables (routing URL, etc.) |
| `header-metadata` | Read/set HTTP headers |
| `urlopen` | Call another service (HTTP, etc.) asynchronously |
| `apim.*` (API Connect) | Context access in API gateway assemblies |
| `crypto` | Hashing, signing, encryption helpers |

## When to choose GatewayScript

- The message is **JSON** and you want to manipulate it as native objects.
- You need **imperative** control flow (loops, conditionals, early exit).
- You must **call out** to another service and branch on the result.
- The transformation is easier to *write and read* as code than as templates.

## Outline: topics to expand

- Reading the body as JSON / XML / buffer (`readAsJSON`, `readAsXML`,
  `readAsBuffer`).
- Rejecting and failing transactions (`session.reject`) to trigger error rules.
- Calling backends with `urlopen` and handling responses.
- Sharing state via context variables between GatewayScript and XSLT actions.

## Reference

- IBM Docs: *GatewayScript* and the *GatewayScript API* in the
  [DataPower documentation](https://www.ibm.com/docs/en/datapower-gateway).

<Quiz questions={[
  {
    prompt: 'GatewayScript is best described as…',
    options: [
      {text: 'A SQL dialect'},
      {text: 'DataPower’s server-side JavaScript for message processing', correct: true},
      {text: 'A replacement for the firmware'},
      {text: 'A front-side handler protocol'},
    ],
    explanation: 'GatewayScript is server-side JavaScript that runs in a processing action, ideal for imperative and JSON-centric logic.',
  },
]} />

<LessonComplete lessonId="message-processing/gatewayscript" />
