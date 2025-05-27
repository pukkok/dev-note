/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
module.exports = {
  sidebar: [
    {
      type: 'category',
      label: 'Next.js',
      items: [
        'nextjs/routing',
        'nextjs/enviroment',
        'nextjs/api_proxy',
      ],
    },
    
    {
      type: 'category',
      label: 'Javascript',
      items: [
        'javascript/functions_intro',
        'javascript/functions_perspective',
        'javascript/array_object_copy',
        'javascript/object_essentials',
        'javascript/constructor_functions',
        'javascript/private_public_property',
        'javascript/prototype_extends_instanceof',
      ]
    },
    {
      type: 'category',
      label: 'Github',
      items: [
        'github/permission_error',
        'github/started',
        'github/advanced',
        'github/github_pages_404_redirect',
      ],
    },
    {
      type: 'category',
      label: 'Node.js',
      items: [
        'nodejs/file_generation',
        'nodejs/started',
      ]
    },
    {
      type: 'category',
      label: 'Python',
      items: [
        'python/install',
        'python/run_error_1',
        'python/venv',
        'python/initpy_pycache',
          {
          type: 'category',
          label: 'restful API 구현',
          items: [
            'python/restful/training_1',
            'python/restful/training_2',
            'python/restful/training_3',
        ],
      },
      ],
    },
    {
      type: 'category',
      label: 'etc',
      items: [
        'etc/computer_basic',
        'etc/IDE',
      ],
    },
  ],
};
