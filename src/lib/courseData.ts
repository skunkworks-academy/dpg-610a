/**
 * Canonical list of all course lessons, grouped by module.
 * Used by the progress tracker to compute completion and by the homepage to
 * render module cards. Lesson `id` values must match the doc IDs referenced in
 * `sidebars.ts` (and the `lessonId` passed to <LessonComplete />).
 */

export interface Lesson {
  id: string;
  title: string;
  /** Route path under /docs used for links. */
  path: string;
}

export interface Module {
  id: string;
  label: string;
  description: string;
  lessons: Lesson[];
}

export const modules: Module[] = [
  {
    id: 'fundamentals',
    label: 'Module 1 · Fundamentals',
    description:
      'What DataPower Gateway is, the form factors it ships in, and where it sits in a modern integration architecture.',
    lessons: [
      {id: 'fundamentals/what-is-datapower', title: 'What is DataPower Gateway?', path: '/docs/fundamentals/what-is-datapower'},
      {id: 'fundamentals/form-factors', title: 'Form Factors', path: '/docs/fundamentals/form-factors'},
      {id: 'fundamentals/where-it-fits', title: 'Where It Fits', path: '/docs/fundamentals/where-it-fits'},
      {id: 'fundamentals/use-cases', title: 'Common Use Cases', path: '/docs/fundamentals/use-cases'},
    ],
  },
  {
    id: 'architecture',
    label: 'Module 2 · Architecture & Core Concepts',
    description:
      'Domains, the object/configuration model, and the services that run on a gateway.',
    lessons: [
      {id: 'architecture/domains', title: 'Domains', path: '/docs/architecture/domains'},
      {id: 'architecture/object-model', title: 'The Object Model', path: '/docs/architecture/object-model'},
      {id: 'architecture/services-overview', title: 'Services Overview', path: '/docs/architecture/services-overview'},
      {id: 'architecture/configuration-model', title: 'Configuration Model', path: '/docs/architecture/configuration-model'},
    ],
  },
  {
    id: 'multi-protocol-gateway',
    label: 'Module 3 · Multi-Protocol Gateway',
    description:
      'The workhorse service: handlers, processing policies, rules, and match actions.',
    lessons: [
      {id: 'multi-protocol-gateway/overview', title: 'MPGW Overview', path: '/docs/multi-protocol-gateway/overview'},
      {id: 'multi-protocol-gateway/handlers', title: 'Front & Back Side Handlers', path: '/docs/multi-protocol-gateway/handlers'},
      {id: 'multi-protocol-gateway/processing-policy', title: 'Processing Policy', path: '/docs/multi-protocol-gateway/processing-policy'},
      {id: 'multi-protocol-gateway/match-actions', title: 'Matches & Actions', path: '/docs/multi-protocol-gateway/match-actions'},
    ],
  },
  {
    id: 'security',
    label: 'Module 4 · Security',
    description:
      'TLS and crypto objects, the AAA framework, message-level security, and threat protection.',
    lessons: [
      {id: 'security/overview', title: 'Security Overview', path: '/docs/security/overview'},
      {id: 'security/tls-crypto', title: 'TLS & Crypto Objects', path: '/docs/security/tls-crypto'},
      {id: 'security/aaa', title: 'The AAA Framework', path: '/docs/security/aaa'},
      {id: 'security/threat-protection', title: 'Threat Protection', path: '/docs/security/threat-protection'},
    ],
  },
  {
    id: 'message-processing',
    label: 'Module 5 · Message Processing',
    description:
      'Processing policies in depth: transforms, GatewayScript, and error handling.',
    lessons: [
      {id: 'message-processing/overview', title: 'Processing Overview', path: '/docs/message-processing/overview'},
      {id: 'message-processing/transforms', title: 'Transform Actions (XSLT)', path: '/docs/message-processing/transforms'},
      {id: 'message-processing/gatewayscript', title: 'GatewayScript', path: '/docs/message-processing/gatewayscript'},
      {id: 'message-processing/error-handling', title: 'Error Handling', path: '/docs/message-processing/error-handling'},
    ],
  },
  {
    id: 'administration-ops',
    label: 'Module 6 · Administration & Operations',
    description:
      'Day-2 operations: the CLI and WebGUI, logging, monitoring, troubleshooting, and config management.',
    lessons: [
      {id: 'administration-ops/overview', title: 'Admin Overview', path: '/docs/administration-ops/overview'},
      {id: 'administration-ops/logging-monitoring', title: 'Logging & Monitoring', path: '/docs/administration-ops/logging-monitoring'},
      {id: 'administration-ops/troubleshooting', title: 'Troubleshooting', path: '/docs/administration-ops/troubleshooting'},
      {id: 'administration-ops/config-management', title: 'Config Management', path: '/docs/administration-ops/config-management'},
    ],
  },
  {
    id: 'labs',
    label: 'Module 7 · Hands-on Labs',
    description:
      'Guided, hands-on exercises that put the concepts together end to end.',
    lessons: [
      {id: 'labs/intro', title: 'Labs Introduction', path: '/docs/labs/intro'},
      {id: 'labs/lab-build-mpgw', title: 'Lab: Build an MPGW', path: '/docs/labs/lab-build-mpgw'},
      {id: 'labs/lab-tls-profile', title: 'Lab: Add a TLS Profile', path: '/docs/labs/lab-tls-profile'},
      {id: 'labs/lab-xslt-transform', title: 'Lab: Write an XSLT Transform', path: '/docs/labs/lab-xslt-transform'},
      {id: 'labs/lab-aaa', title: 'Lab: Configure AAA', path: '/docs/labs/lab-aaa'},
    ],
  },
];

export const allLessons: Lesson[] = modules.flatMap((m) => m.lessons);
export const totalLessons = allLessons.length;
