import type { Options, ThemeConfig } from '@docusaurus/preset-classic';
import type { Config } from '@docusaurus/types';
import { themes } from 'prism-react-renderer';

import crypto from 'crypto';
import fs from 'fs';

const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;

const url = 'https://wiki.fome.tech';
const isBuild = process.env.NODE_ENV === 'production';
const pdfName = 'wiki.fome.pdf';

const pdfChecksum = () => {
  const data = fs.readFileSync(`static/pdf/${pdfName}`, 'utf8');

  return crypto.createHash('md5').update(data, 'utf8').digest('hex');
};

const pdfUrl = `${isBuild ? url : 'http://localhost:3000'}/pdf/${pdfName}?v=${pdfChecksum()}`;

const config: Config = {
  title: 'FOME Wiki',
  tagline: 'Free Open Motorsports ECU',
  url,
  baseUrl: '/',

  // strict URL validation
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'throw',
  onDuplicateRoutes: 'throw',

  noIndex: false, // adds <meta name="robots" content="noindex, nofollow"> to every page
  favicon: 'img/icons/favicon.ico',
  trailingSlash: true, // adds trailing slash to all links since we are using Cloudflare Pages
  // staticDirectories: ['public', 'static'],

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'FOME-Tech', // Usually your GitHub org/user name.
  projectName: '', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/', // Serve the docs at the site's root
          sidebarPath: require.resolve('./sidebars.ts'),
          // Remove this to remove the "edit this page" links.
          editUrl: 'https://github.com/FOME-Tech/wiki/tree/master',
          remarkPlugins: [require('remark-math')],
          rehypePlugins: [[require('rehype-katex'), { output: 'mathml' }]],
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      } satisfies Options,
    ],
  ],

  stylesheets: [
    {
      href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
      type: 'text/css',
      integrity: 'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
      crossorigin: 'anonymous',
    },
  ],

  themes: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true, // `hashed` is recommended as long-term-cache of index file is possible.
        indexBlog: false,
        docsRouteBasePath: '/',
      },
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects: [
          // Client side redirect addresses specified in INI files (HT & TS)
          // eg. https://wiki.fome.tech/r/fuel -> https://wiki.fome.tech/category/fuel/
          {
            from: '/r/fuel',
            to: '/category/fuel/',
          },
          {
            from: '/r/vvt',
            to: '/category/vvt/',
          },
          {
            from: '/r/debugmode',
            to: '/Advanced-Features/Debug-Mode/',
          },
          {
            from: '/r/trigger',
            to: '/category/general-sensors/',
          },
          {
            from: '/r/etb',
            to: '/category/etb/',
          },
          {
            from: '/r/tpstps',
            to: '/Fuel/Acceleration/TPS-Based/',
          },
          {
            from: '/r/lua',
            to: '/Advanced-Features/Lua-Scripting/',
          },
          {
            from: '/r/vr',
            to: '/Hardware/Hardware-Circuits/Discrete-VR/',
          },
        ],
      },
    ],
  ],

  themeConfig: {
    image: 'img/icons/android-chrome-512x512.png',
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: '',
      logo: {
        alt: 'FOME Logo',
        src: 'img/logo-transparent.png',
        style: {
          height: 30,
          marginTop: -2,
        },
      },
      hideOnScroll: true,
      items: [
        {
          href: pdfUrl,
          label: 'PDF',
          position: 'right',
          target: '_blank',
        },
        {
          href: 'https://github.com/FOME-Tech/wiki',
          label: 'GitHub',
          position: 'right',
        },
        {
          type: 'search',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Community',
          items: [
            {
              label: 'Discord',
              href: 'https://discord.gg/5FQj4DMz',
            },
            {
              label: 'Facebook',
              href: 'https://www.facebook.com/profile.php?id=100088049271157',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              to: pdfUrl,
              label: 'PDF version',
              target: '_blank',
            },
            {
              label: 'FOME.tech',
              href: 'https://www.fome.tech',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/FOME-Tech',
            },
          ],
        },
      ],
      // copyright: `Copyright © ${new Date().getFullYear()} FOME`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
      additionalLanguages: ['lua'],
    },
  } satisfies ThemeConfig,
};

module.exports = config;
