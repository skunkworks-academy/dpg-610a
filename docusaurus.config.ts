import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  title: 'IBM DataPower Gateway',
  tagline: 'A self-paced, hands-on course by Skunkworks Academy',
  // Classic .ico for the broadest browser/tab support; richer formats
  // (SVG, PNG, apple-touch, web manifest) are declared in `headTags` below.
  favicon: 'img/favicon.ico',

  // Production url of your site.
  url: 'https://skunkworks-academy.github.io',
  // Pathname under which the site is served. For GitHub project pages this is
  // '/<projectName>/'.
  baseUrl: '/ibm-datapower-gateway/',

  // GitHub pages deployment config.
  organizationName: 'skunkworks-academy',
  projectName: 'ibm-datapower-gateway',
  trailingSlash: false,

  onBrokenLinks: 'throw',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },
  themes: ['@docusaurus/theme-mermaid'],

  // Full favicon / app-icon set. Paths include the baseUrl because headTags
  // are emitted verbatim (unlike the `favicon` field, which prepends it).
  headTags: [
    {
      tagName: 'link',
      attributes: {
        rel: 'icon',
        type: 'image/svg+xml',
        href: '/ibm-datapower-gateway/img/favicon.svg',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/ibm-datapower-gateway/img/favicon-32.png',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/ibm-datapower-gateway/img/favicon-16.png',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/ibm-datapower-gateway/img/apple-touch-icon.png',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'manifest',
        href: '/ibm-datapower-gateway/site.webmanifest',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        name: 'theme-color',
        content: '#1f5fd6',
      },
    },
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          editUrl:
            'https://github.com/skunkworks-academy/ibm-datapower-gateway/tree/main/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        indexBlog: false,
        docsRouteBasePath: '/docs',
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
      },
    ],
  ],

  themeConfig: {
    image: 'img/social-card.svg',
    colorMode: {
      defaultMode: 'light',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'DataPower Gateway',
      logo: {
        alt: 'Skunkworks Academy',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'courseSidebar',
          position: 'left',
          label: 'Course',
        },
        {
          to: '/docs/labs/intro',
          label: 'Labs',
          position: 'left',
        },
        {
          href: 'https://github.com/skunkworks-academy/ibm-datapower-gateway',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Course',
          items: [
            {label: 'Get Started', to: '/docs/intro'},
            {label: 'Fundamentals', to: '/docs/fundamentals/what-is-datapower'},
            {label: 'Hands-on Labs', to: '/docs/labs/intro'},
          ],
        },
        {
          title: 'Reference',
          items: [
            {
              label: 'IBM DataPower Docs',
              href: 'https://www.ibm.com/docs/en/datapower-gateway',
            },
            {
              label: 'IBM DataPower Product',
              href: 'https://www.ibm.com/products/datapower-gateway',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/skunkworks-academy/ibm-datapower-gateway',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Skunkworks Academy. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['bash', 'json', 'xml-doc', 'yaml'],
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
