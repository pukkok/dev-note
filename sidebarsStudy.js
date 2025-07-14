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
        {
          type: 'category',
          label: 'window 객체',
          items: [
            'javascript/window_object/basic',
            'javascript/window_object/training',
          ],
        },
        'javascript/constructor_functions',
        'javascript/private_public_property',
        'javascript/prototype_extends_instanceof',
        {
          type: 'category',
          label: '함수 리턴과 jsdocs',
          items: [
            'javascript/function_return_jsdocs/basic',
            'javascript/function_return_jsdocs/training',
            'javascript/function_return_jsdocs/extension',
          ],
        },
        {
          type: 'category',
          label: 'for 문',
          items: [
            'javascript/for_loop/basic',
            'javascript/for_loop/training',
          ],
        },
        'javascript/callback_functions',
      ]
    },
    {
      type: 'category',
      label: 'Github',
      items: [
        'github/permission_error',
        'github/started',
        'github/advanced',
        'github/case_conflict',
        'github/github_pages_404_redirect',
        'github/github-action'
      ],
    },
    {
      type: 'category',
      label: 'Node.js',
      items: [
        'nodejs/file_generation',
        'nodejs/started',
        'nodejs/sync_async_fs',
        'nodejs/html_template_basic',
        {
          type: 'category',
          label: 'SSR 서버 이해(with. handlebars)',
          items: [
            'nodejs/handlebars/first',
            'nodejs/handlebars/second',
            'nodejs/handlebars/third',
          ]
        },
        'nodejs/static_server_exec',
        {
          type: 'category',
          label: '바닐라 http 서버 구현',
          items: [
            'nodejs/vanilla-http-server/vanilla-http-server',
            'nodejs/vanilla-http-server/html-template-generator',
            'nodejs/vanilla-http-server/dom-rendering-with-json',
          ]
        }
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
        'etc/my-template',
        'etc/computer_basic',
        'etc/IDE',
        'etc/react_without_cra_setting',
        'etc/react_ts_setting',
        'etc/git_and_github_basics_for_developers',
        'etc/mongoDB_powershell'
      ],
    },
  ],
};
