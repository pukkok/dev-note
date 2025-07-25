// @ts-check

import { themes as prismThemes } from 'prism-react-renderer'

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '푹곡좌 메모리',
  tagline: '',
  favicon: 'img/favicon.ico',

  url: 'https://pukkok.github.io',
  baseUrl: '/dev-note/',
  organizationName: 'pukkok',
  projectName: 'dev-note',
  deploymentBranch: 'gh-pages',
  trailingSlash: true,

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'ko',
    locales: ['ko'],
  },

  presets: [
    [
      'classic',
      {
        blog: {
          showReadingTime: true,
          editUrl: 'https://github.com/pukkok/dev-note/edit/main/blog/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      },
    ],
  ],

  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'project',
        path: 'project',
        routeBasePath: 'project',
        sidebarPath: require.resolve('./sidebarsProject.js'),
        editUrl: 'https://github.com/pukkok/dev-note/edit/main/',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'study',
        path: 'study',
        routeBasePath: 'study',
        sidebarPath: require.resolve('./sidebarsStudy.js'),
        editUrl: 'https://github.com/pukkok/dev-note/edit/main/',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'labs',
        path: 'labs',
        routeBasePath: 'labs',
        sidebarPath: require.resolve('./sidebarsLab.js'),
        editUrl: 'https://github.com/pukkok/dev-note/edit/main/',
      },
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: "Pukkok's",
      logo: {
        alt: 'My Site Logo',
        src: 'img/logo.svg',
      },
      items: [
        { to: '/project/scroll-space/intro', label: '프로젝트', position: 'left' },
        { to: '/study/nextjs/routing', label: '스터디', position: 'left' },
        { to: '/labs/sudoku', label: '연구소', position: 'left' },
        { href: 'https://github.com/pukkok/', label: 'GitHub', position: 'right' },
      ],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  },
}

export default config
