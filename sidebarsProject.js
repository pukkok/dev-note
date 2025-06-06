/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
module.exports = {
  sidebar: [
    {
      type: 'category',
      label: '이미지 뚝딱기',
      items: [
        'img-ttukttakki/intro',
        'img-ttukttakki/challenges',
        'img-ttukttakki/update-01',
      ],
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
      type: 'category',
      label: 'React Merge Table',
      items: [
        'react-merge-table/core',
        // 'react-merge-table/smart'
      ],
    },
    {
      type: 'category',
      label: 'Streamo',
      items: [
        'streamo/intro',
        'streamo/upload'
      ],
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
