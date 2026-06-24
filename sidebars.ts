import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/**
 * Explicit course structure. Module ordering and lesson ordering are controlled
 * here rather than via filename prefixes, so document IDs stay clean
 * (e.g. `fundamentals/what-is-datapower`).
 */
const sidebars: SidebarsConfig = {
  courseSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Module 1 · Fundamentals',
      collapsed: false,
      items: [
        'fundamentals/what-is-datapower',
        'fundamentals/form-factors',
        'fundamentals/where-it-fits',
        'fundamentals/use-cases',
      ],
    },
    {
      type: 'category',
      label: 'Module 2 · Architecture & Core Concepts',
      collapsed: true,
      items: [
        'architecture/domains',
        'architecture/object-model',
        'architecture/services-overview',
        'architecture/configuration-model',
      ],
    },
    {
      type: 'category',
      label: 'Module 3 · Multi-Protocol Gateway',
      collapsed: true,
      items: [
        'multi-protocol-gateway/overview',
        'multi-protocol-gateway/handlers',
        'multi-protocol-gateway/processing-policy',
        'multi-protocol-gateway/match-actions',
      ],
    },
    {
      type: 'category',
      label: 'Module 4 · Security',
      collapsed: true,
      items: [
        'security/overview',
        'security/tls-crypto',
        'security/aaa',
        'security/threat-protection',
      ],
    },
    {
      type: 'category',
      label: 'Module 5 · Message Processing',
      collapsed: true,
      items: [
        'message-processing/overview',
        'message-processing/transforms',
        'message-processing/gatewayscript',
        'message-processing/error-handling',
      ],
    },
    {
      type: 'category',
      label: 'Module 6 · Administration & Operations',
      collapsed: true,
      items: [
        'administration-ops/overview',
        'administration-ops/logging-monitoring',
        'administration-ops/troubleshooting',
        'administration-ops/config-management',
      ],
    },
    {
      type: 'category',
      label: 'Module 7 · Hands-on Labs',
      collapsed: true,
      items: [
        'labs/intro',
        'labs/lab-build-mpgw',
        'labs/lab-tls-profile',
        'labs/lab-xslt-transform',
        'labs/lab-aaa',
      ],
    },
  ],
};

export default sidebars;
