/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
module.exports = {
  sidebar: [
    {
      type: 'category',
      label: 'Next.js',
      items: [
        'nextjs/routing',
        'nextjs/enviroment',
        'nextjs/apiProxy',
      ],
    },
    {
      type: 'category',
      label: 'github',
      items: [
        'github/permissionError',
        'github/started',
        'github/advanced',
        'github/githubPages404redirect',
      ],
    },
    {
      type: 'category',
      label: 'javascript',
      items: [
        'javascript/functionsIntro',
        'javascript/functionsPerspective'
      ]
    },
    {
      type: 'category',
      label: 'node.js',
      items: [
        'nodejs/fileGeneration',
        'nodejs/started',
      ]
    },
    {
      type: 'category',
      label: 'python',
      items: [
        'python/install',
        'python/runError-1',
        'python/venv',
        'python/initPyAndCachePy',
          {
          type: 'category',
          label: 'restful API 구현',
          items: [
            'python/restful/training-1',
            'python/restful/training-2',
            'python/restful/training-3',
        ],
      },
      ],
    },
    {
      type: 'category',
      label: 'etc',
      items: [
        'etc/computerBasic',
        'etc/IDE',
      ],
    },
  ],
};
