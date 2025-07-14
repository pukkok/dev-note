/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
module.exports = {
  sidebar: [
    {
      type: 'category',
      label: '이미지 뚝딱기',
      items: [
        'img-ttukttakki/intro',
        'img-ttukttakki/challenges',
        'img-ttukttakki/update-010',
        'img-ttukttakki/update-100',
      ],
    },
    {
      type: 'category',
      label: '폼톡',
      items: [
        'formtok/intro',
        // 'react-merge-table/changelog',
        // 'react-merge-table/smart'
      ],
    },
    {
      type: 'category',
      label: 'React Merge Table',
      items: [
        'react-merge-table/core',
        'react-merge-table/changelog',
        // 'react-merge-table/smart'
      ],
    },
    {
      type: 'category',
      label: 'Streamo',
      items: [
        'streamo/intro',
        'streamo/route-guard',
        'streamo/api-setup',
        'streamo/state-management',
        'streamo/upload',
        'streamo/skeleton-cls',
      ],
    },
    {
      type: 'category',
      label: '유치원 모으미',
      items: [
        {
          type: 'category',
          label: '프론트(React)',
          items: [
            'kinder-moumi/frontend/intro',
            'kinder-moumi/frontend/issue',
            'kinder-moumi/frontend/merge-table',
          ]
        },
        {
          type: 'category',
          label: '백엔드(Express)',
          items: [
            'kinder-moumi/backend/auth',
            'kinder-moumi/backend/upload-customizing',
            'kinder-moumi/backend/kinder-API',
            'kinder-moumi/backend/account-model',
          ]
        }
      ]
    },
    {
      type: 'category',
      label: 'pk-icons',
      items: [
        'pk-icons/intro',
        'pk-icons/icon-type-guide',
        'pk-icons/icon-management-indexing',
      ]
    },
    {
      type: 'doc',
      id: 'cron-job'
    },
    {
      type: 'category',
      label: '영림 리뉴얼',
      items: [
        'younglim-renewal/intro',
        'younglim-renewal/design',
        'younglim-renewal/implementation',
        'younglim-renewal/retrospective',
      ],
    },
    {
      type: 'doc',
      id: 'hite'
    },
  ],
};
