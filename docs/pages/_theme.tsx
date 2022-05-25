import React from 'react'
import { createTheme, defaultSideNavs } from 'vite-pages-theme-doc'

import Component404 from './404'

export default createTheme({
  logo: <div style={{ fontSize: '20px' }}>🍅 Tomato Editor Design</div>,
  topNavs: [
    {
      label: '首页',
      path: '/',
      activeIfMatch: {
        // match all first-level paths
        path: '/:foo',
        exact: true,
      },
    },
    {
      label: '组件',
      path: '/components/Button',
      activeIfMatch: '/components',
    },
    {
      label: 'github',
      href: 'https://github.com/jaykou25/tomato-editor-design',
    },
  ],
  sideNavs: (ctx) => {
    return defaultSideNavs(ctx, {
      groupConfig: {
        components: {
          demos: {
            label: '所有组件 (测试用)',
            order: -1,
          },
          general: {
            label: '通用',
            order: 1,
          },
          'data-display': {
            label: 'Data Display',
            order: 2,
          },
        },
      },
    })
  },
  Component404,
})
