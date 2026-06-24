---
title: "Lab: Build an MPGW"
description: Create your first Multi-Protocol Gateway with an HTTP front-side handler and a static backend.
---

# Lab: Build a Multi-Protocol Gateway

**Goal:** create a working MPGW that accepts HTTP requests on port `8080` and
forwards them to a public test backend. By the end you'll have proven the
front-side → policy → backend lifecycle from Module 3 end to end.

**Prerequisites:** the [labs setup](/docs/labs/intro) complete; you're working
inside the **`lab`** domain.

**Estimated time:** 20–30 minutes.

## Step 1 — Start a new Multi-Protocol Gateway

1. In the WebGUI (in the `lab` domain), search for or navigate to
   **Multi-Protocol Gateway** and click **Add**.
2. **Name:** `echo-gateway`.
3. Leave **Type** as `dynamic-backend` for now — we'll set a static backend in
   step 3, but dynamic gives us flexibility to route later.
4. Set **Request Type** and **Response Type** to `Non-XML` (pass-through) so the
   gateway forwards bodies untouched for this first test.

## Step 2 — Add a Front Side Handler

1. Next to **Front Side Handler**, click the **+** to create a new one.
2. Choose **HTTP Front Side Handler**.
3. **Name:** `http-8080`.
4. **Local IP Address:** `0.0.0.0` (all interfaces).
5. **Port:** `8080`.
6. **Allowed methods:** ensure `GET` and `POST` are enabled.
7. Apply, and confirm the handler is added to the gateway.

```mermaid
flowchart LR
  C[curl client] --> H[http-8080 FSH :8080] --> MP[echo-gateway] --> B[backend]
```

## Step 3 — Point at a backend

For a first test, send traffic to a public echo service.

- If you used `static-backend`, set the **Backend URL** to
  `http://httpbin.org` (or any reachable test endpoint).
- If you kept `dynamic-backend`, add a minimal **processing policy** (next step)
  with a rule that sets the routing URL — or temporarily switch the **Type** to
  `static-backend` and set the **Backend URL** to `http://httpbin.org`.

:::tip Keep it simple first
For your very first gateway, `static-backend` → `http://httpbin.org` is the
quickest way to see traffic flow. Switch to dynamic routing once it works.
:::

## Step 4 — Add a minimal processing policy

1. Next to **Multi-Protocol Gateway Policy**, click **+** to create a policy
   named `echo-policy`.
2. Create a new **rule**, direction **Client to Server** (request).
3. Drop a **Match action** on the rule; create a matching rule of type **URL**
   with value `*` (match everything). Name it `match-all`.
4. Add a **Results action** at the end of the rule wired from `INPUT` to
   `OUTPUT` (for pass-through this simply forwards the message).
5. Apply the policy and assign it to `echo-gateway`.

## Step 5 — Apply and check op-state

1. **Apply** the gateway.
2. Confirm the gateway and the `http-8080` handler show operational state **up**
   (green). If the handler is **down**, the port may be in use — pick another
   port and re-test (recall enabled ≠ up from the
   [object model](/docs/architecture/object-model)).

## Step 6 — Test it

From your host (the container maps `8080` if you published it; add `-p 8080:8080`
to your `docker run` if you didn't):

```bash
curl -i http://localhost:8080/get
```

You should get a response proxied from the backend (e.g. httpbin's JSON echo).
Congratulations — you've built a working MPGW.

## Step 7 — Save

**Save Configuration** so your gateway survives a container restart.

## Troubleshooting

- **Connection refused** → handler op-state down or the container port isn't
  published (`-p 8080:8080`).
- **Bad gateway / timeout** → backend URL unreachable from the container; try a
  different test endpoint or check egress.
- **404 from your gateway** → the match rule didn't match; confirm the URL match
  is `*` and the rule direction is request.

## Stretch goals

- Switch to a **dynamic backend** and set `var://service/routing-url` in a
  GatewayScript or XSLT action to route by path.
- Add a **Log action** to emit the request URI for each call.

<Quiz questions={[
  {
    prompt: 'Your new HTTP handler shows operational state "down". What is the most likely cause?',
    options: [
      {text: 'The firmware is corrupt'},
      {text: 'The chosen port is already in use (enabled ≠ up)', correct: true},
      {text: 'HTTP is not supported by DataPower'},
      {text: 'You saved the configuration'},
    ],
    explanation: 'A handler can be admin-enabled but operationally down if its port is taken. Pick a free port (and publish it from the container).',
  },
]} />

<LessonComplete lessonId="labs/lab-build-mpgw" />
