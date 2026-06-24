---
title: Transform Actions (XSLT)
description: Using the Transform action and XSLT to reshape messages, including reading/writing context variables.
---

# Transform Actions (XSLT)

The **Transform action** runs a stylesheet — most commonly **XSLT** — against
the action's input context and writes the result to its output context. It's the
classic way to reshape XML and to convert between XML and JSON.

## A minimal transform

Suppose the backend wants `<order>` elements but the client sends a different
shape. A stylesheet maps one tree to the other:

```xml
<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="xml" indent="yes"/>

  <xsl:template match="/request">
    <order>
      <id><xsl:value-of select="orderId"/></id>
      <customer><xsl:value-of select="customer/name"/></customer>
      <total currency="{customer/@currency}">
        <xsl:value-of select="amount"/>
      </total>
    </order>
  </xsl:template>
</xsl:stylesheet>
```

You upload this to `local:` and point a **Transform action** at it. On the
request side, wire the action so its input is the previous action's output and
its output feeds the next action (or `OUTPUT`).

## DataPower XSLT extensions

DataPower adds extension functions and elements (in the
`http://www.datapower.com/extensions` namespace, conventionally `dp:`) that make
XSLT useful *as a gateway language*, not just a document transformer:

```xml
<xsl:stylesheet version="1.0"
    xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:dp="http://www.datapower.com/extensions"
    extension-element-prefixes="dp">

  <xsl:template match="/">
    <!-- Read a service variable (e.g. the request URI) -->
    <xsl:variable name="uri"
      select="dp:variable('var://service/URI')"/>

    <!-- Set the dynamic backend destination -->
    <dp:set-variable name="'var://service/routing-url'"
      value="concat('https://backend.internal', $uri)"/>

    <!-- Emit a log message -->
    <xsl:message dp:priority="info">
      Routing request for <xsl:value-of select="$uri"/>
    </xsl:message>
  </xsl:template>
</xsl:stylesheet>
```

Useful extensions include:

- `dp:variable('name')` / `dp:set-variable(...)` — read/write service & context
  variables (routing URL, headers, custom context values).
- `dp:request-header(...)` / `dp:set-response-header(...)` — manipulate HTTP
  headers.
- `dp:url-open(...)` — call out to another service mid-transform.
- `dp:reject(...)` — fail the transaction with a message (drives error handling).

## JSON in / JSON out

Because JSON is parsed to a node tree, you can transform JSON with XSLT too —
or use the dedicated **JSON→XML / XML→JSON** conversions and let XSLT handle the
structure in between. For heavily JSON-shaped logic, prefer
[GatewayScript](/docs/message-processing/gatewayscript).

## Common pitfalls

- **Wiring**: the Transform action transforms its *input context*. If you point
  it at `INPUT` when you meant the previous action's output, you transform the
  wrong thing.
- **Namespaces**: XML namespace mismatches are the #1 reason a template "doesn't
  match". Declare and use the right namespace prefixes.
- **Output method**: set `xsl:output` `method` (`xml`/`text`/`json`) to match
  what the next stage expects.

You'll write and wire a real stylesheet in
[Lab: Write an XSLT Transform](/docs/labs/lab-xslt-transform).

<Quiz questions={[
  {
    prompt: 'Which DataPower XSLT extension would you use to set the dynamic backend destination from within a stylesheet?',
    options: [
      {text: 'xsl:value-of'},
      {text: 'dp:set-variable on var://service/routing-url', correct: true},
      {text: 'xsl:output method="json"'},
      {text: 'dp:url-open'},
    ],
    explanation: 'Setting `var://service/routing-url` via `dp:set-variable` chooses the dynamic backend. `dp:url-open` calls a service; it doesn’t set routing.',
  },
  {
    prompt: 'A template "doesn’t match" the incoming XML. What’s the most common cause on DataPower?',
    options: [
      {text: 'The appliance is too slow'},
      {text: 'XML namespace mismatch between the document and the stylesheet’s match patterns', correct: true},
      {text: 'XSLT cannot match root elements'},
      {text: 'The config was saved'},
    ],
    explanation: 'Namespace mismatches are the classic cause — the match pattern must use the same namespace (prefix bound correctly) as the document.',
  },
]} />

<LessonComplete lessonId="message-processing/transforms" />
