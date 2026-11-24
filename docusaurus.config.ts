import type { Options, ThemeConfig } from '@docusaurus/preset-classic';
import type { Config } from '@docusaurus/types';
import crypto from 'crypto';
import fs from 'fs';
import { themes } from 'prism-react-renderer';

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

  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },

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
          {
            from: '/r/base-engine',
            to: '/Base-Engine/Base-Engine-Settings/',
          },
          {
            from: '/r/firing-order',
            to: '/Base-Engine/Firing-Order/',
          },
          {
            from: '/r/trigger-sync',
            to: '/Base-Engine/Trigger/How-Trigger-Sync-Works/',
          },
          {
            from: '/r/trigger-sensors',
            to: '/Base-Engine/Trigger/Crank-And-Cam-Sensors/',
          },
          {
            from: '/r/idle',
            to: '/Idle-Control/Idle-Settings/',
          },
          {
            from: '/r/etb-tps',
            to: '/Air-Path/ETB/ETB-TPS/',
          },
          {
            from: '/r/redundant-sensors',
            to: '/Air-Path/ETB/Redundant-Sensors/',
          },
          {
            from: '/r/ac',
            to: '/Outputs/Air-Conditioning-Settings/',
          },
          {
            from: '/r/can',
            to: '/CAN/',
          },
          {
            from: '/r/fan',
            to: '/Outputs/Fan-Control/',
          },
          {
            from: '/r/gear-detection',
            to: '/Sensors-And-Gauges/General-Sensors/Gear-Detection/',
          },
          {
            from: '/r/idle-hardware',
            to: '/Idle-Control/Idle-Hardware/',
          },
          {
            from: '/r/idle-tuning',
            to: '/Idle-Control/Idle-Tuning/',
          },
          {
            from: '/r/cam-sync',
            to: '/Base-Engine/Trigger/Cam-Sync/',
          },
          {
            from: '/r/trigger-types',
            to: '/Base-Engine/Trigger/Trigger-Types/',
          },
          {
            from: '/r/trigger-troubleshooting',
            to: '/Base-Engine/Trigger/Trigger-Troubleshooting/',
          },
          // Client side redirect addresses specified in INI files (HT & TS)
          // eg. https://wiki.fome.tech/r/fuel -> https://wiki.fome.tech/category/fuel/
          {
            from: '/r/fuel',
            to: '/category/fuel/',
          },
          {
            from: '/r/vvt',
            to: '/Air-Path/VVT/',
          },
          {
            from: '/r/trigger',
            to: '/Base-Engine/Trigger/Trigger-Setup/',
          },
          {
            from: '/r/etb',
            to: '/Air-Path/ETB/ETB-Setup/',
          },
          {
            from: '/r/tpstps',
            to: '/Fuel/Acceleration/TPS-Based/',
          },
          {
            from: '/r/lua',
            to: '/Lua/Lua-Scripting/',
          },
          {
            from: '/r/vr',
            to: '/Base-Engine/Trigger/VR-Threshold/',
          },
          {
            from: '/r/clt',
            to: '/Sensors-And-Gauges/Temperature-Sensors/CLT/',
          },
          {
            from: '/r/iat',
            to: '/Sensors-And-Gauges/Temperature-Sensors/IAT/',
          },
          {
            from: '/r/aux-temp',
            to: '/Sensors-And-Gauges/Temperature-Sensors/Aux-Temp/',
          },
          {
            from: '/r/map',
            to: '/Sensors-And-Gauges/Pressure-Sensors/MAP/',
          },
          {
            from: '/r/baro',
            to: '/Sensors-And-Gauges/Pressure-Sensors/Barometric/',
          },
          {
            from: '/r/oil-pressure',
            to: '/Sensors-And-Gauges/Pressure-Sensors/Oil-pressure/',
          },
          {
            from: '/r/fuel-pressure',
            to: '/Sensors-And-Gauges/Fuel-Sensors/Fuel-Pressure/',
          },
          {
            from: '/r/fuel-level',
            to: '/Sensors-And-Gauges/Fuel-Sensors/Fuel-Level/',
          },
          {
            from: '/r/main-relay',
            to: '/Outputs/Main-Relay/',
          },
          {
            from: '/r/fuel-pump-relay',
            to: '/Outputs/Fuel-Pump-Relay/',
          },
          {
            from: '/r/tacho',
            to: '/Outputs/Tacho/',
          },
          {
            from: '/r/clt-multiplier',
            to: '/Fuel/Fuel-Settings/CLT-Multiplier/',
          },
          {
            from: '/r/iat-multiplier',
            to: '/Fuel/Fuel-Settings/IAT_Multiplier/',
          },
          {
            from: '/r/dfco',
            to: '/Fuel/Fuel-Settings/DFCO/',
          },
          {
            from: '/r/baro-comp',
            to: '/Fuel/Fuel-Settings/Barometric-Pressure-Compensation/',
          },
          {
            from: '/r/closed-loop',
            to: '/Fuel/Fuel-Settings/Closed-Loop-Fuel/',
          },
          {
            from: '/r/multispark',
            to: '/Ignition/Ignition-Settings/Multispark/',
          },
          {
            from: '/r/clutch',
            to: '/Sensors-And-Gauges/Driver-Controls-And-Feedback/Clutch/',
          },
          {
            from: '/r/brake',
            to: '/Sensors-And-Gauges/Driver-Controls-And-Feedback/Brake/',
          },
          {
            from: '/r/battery',
            to: '/Sensors-And-Gauges/Driver-Controls-And-Feedback/Battery-Settings/',
          },
          {
            from: '/r/app',
            to: '/Sensors-And-Gauges/Driver-Controls-And-Feedback/APP/',
          },
          {
            from: '/r/pedal-target',
            to: '/Air-Path/ETB/ETB-Pedal-Target/',
          },
          {
            from: '/r/aux-sensors',
            to: '/Sensors-And-Gauges/General-Sensors/Aux-Sensors/',
          },
          {
            from: '/r/cyl-offset',
            to: '/Base-Engine/Cylinder-Angle-Offset/',
          },
          {
            from: '/r/adv-cranking',
            to: '/Cranking-Control/Adv-Cranking/',
          },
          {
            from: '/r/map-sampling',
            to: '/Sensors-And-Gauges/Pressure-Sensors/MAP-Sampling-Angle/',
          },
          {
            from: '/r/turbo-speed',
            to: '/Sensors-And-Gauges/General-Sensors/Turbo-Speed/',
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
              href: 'https://discord.gg/EEg2fbhQD4',
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
