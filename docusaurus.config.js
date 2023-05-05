// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');
const pdfUrl = '/pdf/wiki.fome.pdf';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'FOME Wiki',
  tagline: 'Free Open Motorsports ECU',
  url: 'https://wiki.fome.tech',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  noIndex: false, // adds <meta name="robots" content="noindex, nofollow"> to every page
  favicon: 'img/icons/favicon.ico',
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
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/', // Serve the docs at the site's root
          sidebarPath: require.resolve('./sidebars.js'),
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/FOME-Tech/wiki/tree/master',
        },
        blog: false,
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
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
          }
        },
        items: [
          {
            to: pdfUrl,
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
      },
    }),
};

module.exports = config;
