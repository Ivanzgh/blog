import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'CONST',
  description: 'Blog',
  base: '/blog/',
  lastUpdated: true,
  cleanUrls: true,
  head: [['link', { rel: 'icon', href: '/blog/img/logo.png' }]],
  themeConfig: {
    logo: '/img/logo.png',
    // outline: 'deep',
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2020-present ZGH'
    },
    algolia: {
      appId: '0QPOEAMUZK',
      apiKey: '3c1f70ed4dca0ad41775f35548a1b525',
      indexName: 'ivanzghio'
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/Ivanzgh' }],
    nav: nav(),
    sidebar: {
      '/': [
        {
          text: 'JavaScript',
          collapsed: false,
          link: '/',
          items: [
            { text: '基础', link: '/fe/js/' },
            { text: '字符串', link: '/fe/js/string' },
            { text: '数组', link: '/fe/js/array' },
            { text: '原型/继承/构造函数/类', link: '/fe/js/class' },
            { text: '对象', link: '/fe/js/object' },
            { text: 'ES6', link: '/fe/js/es6' },
            { text: '异步编程', link: '/fe/js/promise' },
            { text: 'DOM', link: '/fe/js/dom' },
            { text: 'JSON', link: '/fe/js/json' },
            { text: 'AJAX', link: '/fe/js/ajax' },
            { text: '手写JS', link: '/fe/js/truth' },
            { text: '工具函数', link: '/fe/js/utils' }
          ]
        },
        {
          text: 'HTML',
          collapsed: false,
          items: [
            { text: '基础', link: '/fe/html/' },
            { text: '本地存储', link: '/fe/html/storage' },
            { text: 'Canvas', link: '/fe/html/canvas' },
            { text: 'SVG', link: '/fe/html/svg' }
          ]
        },
        {
          text: 'CSS',
          collapsed: false,
          items: [
            { text: '基础', link: '/fe/css/' },
            { text: '布局', link: '/fe/css/layout' },
            { text: '响应式布局', link: '/fe/css/responsive' },
            { text: '阴影', link: '/fe/css/shadow' },
            { text: '渐变', link: '/fe/css/gradient' },
            { text: '动画', link: '/fe/css/animation' },
            { text: '滤镜', link: '/fe/css/filter' },
            { text: '裁剪', link: '/fe/css/clip-path' },
            { text: '视差滚动', link: '/fe/css/parallax-scroller' },
            { text: '业务效果', link: '/fe/css/business' },
            { text: 'Sass', link: '/fe/css/sass' },
            { text: 'Less', link: '/fe/css/less' },
            { text: 'Tailwindcss', link: '/fe/css/tailwindcss' }
          ]
        },
        {
          text: '浏览器',
          collapsed: false,
          items: [
            { text: '基础', link: '/fe/browser/' },
            { text: '浏览器跨域', link: '/fe/browser/crossDomain' },
            { text: '浏览器安全', link: '/fe/browser/safety' },
            { text: 'Window对象', link: '/fe/browser/window' },
            { text: '兼容性', link: '/fe/browser/compatibility' },
            { text: '调试', link: '/fe/browser/debug' },
            { text: '性能优化', link: '/fe/browser/performance' }
          ]
        }
      ],
      '/fe/ts/': [
        {
          text: 'TypeScript',
          collapsed: false,
          items: [
            { text: '基础', link: '/fe/ts/' },
            { text: '接口类型', link: '/fe/ts/interface' },
            { text: '函数类型', link: '/fe/ts/function' },
            { text: '类型断言', link: '/fe/ts/assertion' },
            { text: '类', link: '/fe/ts/class' },
            { text: '泛型', link: '/fe/ts/generic' },
            { text: '枚举', link: '/fe/ts/enum' },
            { text: '装饰器', link: '/fe/ts/decorator' },
            { text: 'tsconfig.json', link: '/fe/ts/config' },
            { text: 'FAQ', link: '/fe/ts/faq' }
          ]
        }
      ],
      '/react/': [
        {
          text: 'React',
          collapsed: false,
          items: [
            { text: '总览', link: '/react/' },
            { text: 'JSX', link: '/react/jsx' },
            { text: '事件机制', link: '/react/event' },
            { text: '组件', link: '/react/component' },
            { text: '组件通信', link: '/react/contact' },
            { text: 'CSS 样式方案', link: '/react/style' },
            { text: 'Hook', link: '/react/hook' },
            { text: 'React-Router', link: '/react/router' },
            { text: 'Fiber 架构', link: '/react/fiber' },
            {
              text: '状态管理',
              items: [
                { text: 'Zustand', link: '/react/state/zustand' },
                { text: 'Mobx', link: '/react/state/mobx' },
                { text: 'Redux', link: '/react/state/redux' }
              ]
            },
            { text: '服务端渲染SSR', link: '/react/ssr' },
            { text: '插件', link: '/react/plugins' },
            { text: '业务', link: '/react/business' }
          ]
        },
        {
          text: 'Antd生态',
          collapsed: false,
          items: [
            { text: 'Ant Design', link: '/react/antd/' },
            { text: 'Ant Design Pro', link: '/react/antd/ant-design-pro' },
            { text: 'Umi', link: '/react/antd/umi' },
            { text: 'ProComponents', link: '/react/antd/proComponents' }
          ]
        },
        {
          text: 'Next.js',
          collapsed: false,
          items: [{ text: '总览', link: '/react/next/' }]
        }
      ],
      '/vue/': [
        {
          text: 'Vue2',
          collapsed: false,
          items: [
            { text: 'Vue2', link: '/vue/vue2' },
            { text: '组件通信', link: '/vue/contact' },
            { text: '业务', link: '/vue/business' },
            { text: 'UI库', link: '/vue/ui' },
            { text: 'vuex', link: '/vue/vuex' },
            { text: 'vue-router', link: '/vue/vue-router' },
            { text: 'vuepress', link: '/vue/vuepress' }
          ]
        },
        {
          text: 'Vue3',
          collapsed: false,
          items: [{ text: 'Vue3', link: '/vue/vue3' }]
        }
      ],
      '/node/': [
        {
          text: 'Node',
          collapsed: false,
          items: [
            { text: '简介', link: '/node/' },
            { text: 'path 路径', link: '/node/path' },
            { text: 'Buffer 缓冲区', link: '/node/buffer' },
            { text: 'fs 文件系统', link: '/node/fs' },
            { text: 'Http', link: '/node/http' },
            { text: 'Process 进程', link: '/node/process' }
          ]
        },
        {
          text: '框架',
          collapsed: false,
          items: [
            { text: 'Express', link: '/node/express' },
            { text: 'Koa', link: '/node/koa' },
            { text: 'Egg', link: '/node/egg' },
            { text: 'MongoDB', link: '/node/mongodb' }
          ]
        }
      ],
      '/automate/': [
        {
          text: '前端工程化',
          items: [
            { text: '总览', link: '/automate/' },
            { text: 'Git', link: '/automate/git' },
            { text: 'AST', link: '/automate/ast' },
            { text: 'Babel', link: '/automate/babel' },
            { text: '测试', link: '/automate/test' },
            { text: 'CI/CD', link: '/automate/cicd' },
            { text: 'Menorepo', link: '/automate/monorepo' }
          ]
        },
        {
          text: '构建工具',
          collapsed: false,
          items: [
            { text: '模块化规范', link: '/automate/module' },
            {
              text: 'Webpack',
              collapsed: true,
              items: [
                { text: '核心概念', link: '/automate/webpack/' },
                { text: '快速入门', link: '/automate/webpack/getting-started' }
              ]
            },
            { text: 'Vite', link: '/automate/vite' },
            { text: 'Rollup', link: '/automate/rollup' },
            { text: 'Gulp', link: '/automate/gulp' }
          ]
        },
        {
          text: '开发规范',
          collapsed: false,
          items: [
            { text: 'Lint规范', link: '/automate/lint' },
            { text: '代码规范', link: '/automate/code' }
          ]
        },
        {
          text: '包管理',
          collapsed: false,
          items: [
            { text: 'npm', link: '/automate/npm' },
            { text: 'pnpm', link: '/automate/pnpm' }
          ]
        }
      ],
      '/miniProgram/': [
        {
          text: '微信小程序',
          collapsed: false,
          items: [
            { text: '基础', link: '/miniProgram/wx/index' },
            { text: '踩坑记录', link: '/miniProgram/wx/fallible' },
            { text: '路由跳转', link: '/miniProgram/wx/route' },
            { text: '自定义组件', link: '/miniProgram/wx/component' },
            { text: '开放功能', link: '/miniProgram/wx/open' },
            { text: '分包加载', link: '/miniProgram/wx/subPackages' },
            { text: '嵌套网页', link: '/miniProgram/wx/webView' },
            { text: '业务', link: '/miniProgram/wx/business' }
          ]
        },
        {
          text: 'uniapp',
          collapsed: false,
          items: [{ text: 'uniapp', link: '/miniProgram/uniapp' }]
        },
        {
          text: 'Taro',
          collapsed: false,
          items: [{ text: 'Taro', link: '/miniProgram/taro' }]
        }
      ],
      '/tools/': [
        {
          text: '🧰 工具箱',
          collapsed: false,
          items: [
            { text: '插件', link: '/tools/plugin' },
            { text: 'Chrome', link: '/tools/chrome' },
            { text: 'iTerm2', link: '/tools/iTerm2' },
            { text: '部署', link: '/tools/deploy' }
          ]
        }
      ],
      '/base/network/': [
        {
          text: '计算机网络',
          collapsed: false,
          items: [
            { text: '概览', link: '/base/network/' },
            { text: 'HTTP、HTTPS协议', link: '/base/network/http' },
            { text: 'webSocket', link: '/base/network/webSocket' }
          ]
        }
      ],
      '/base/design-pattern/': [
        {
          text: '设计模式',
          collapsed: false,
          items: [
            { text: '设计模式', link: '/base/design-pattern/' },
            { text: '单例模式', link: '/base/design-pattern/singleton' },
            { text: '工厂模式', link: '/base/design-pattern/factory' },
            { text: '装饰器模式', link: '/base/design-pattern/decorator' },
            { text: '适配器模式', link: '/base/design-pattern/adapter' },
            { text: '策略模式', link: '/base/design-pattern/strategy' },
            { text: '代理模式', link: '/base/design-pattern/proxy' },
            { text: '迭代器模式', link: '/base/design-pattern/iterator' },
            { text: '观察者模式', link: '/base/design-pattern/observers' },
            { text: '发布-订阅模式', link: '/base/design-pattern/publisher-subscriber' }
          ]
        }
      ],
      '/gis/': [
        {
          text: 'GIS',
          collapsed: false,
          items: [
            { text: '介绍', link: '/gis/' },
            { text: '电子海图', link: '/gis/enc' },
            { text: 'Maptalks', link: '/gis/maptalks' },
            { text: 'OpenLayers', link: '/gis/openlayers' },
            { text: 'Leaflet', link: '/gis/leaflet' },
            { text: 'GeoServer', link: '/gis/geoServer' },
            { text: 'Cesium', link: '/gis/cesium' },
            { text: '高德地图', link: '/gis/amap' },
            { text: '百度地图', link: '/gis/bmap' }
          ]
        }
      ],
      '/webgl/': [
        {
          text: 'ThreeJS',
          collapsed: false,
          items: [{ text: '介绍', link: '/webgl/three/' }]
        },
        {
          text: '数据可视化',
          collapsed: false,
          items: [
            { text: 'BI', link: '/webgl/bi/' },
            { text: 'Echarts', link: '/webgl/echarts' }
          ]
        }
      ],
      '/media/': [
        {
          text: '流媒体',
          collapsed: false,
          items: [{ text: '音视频', link: '/media/' }]
        }
      ],
      '/server/': [
        { text: 'Nginx', link: '/server/nginx' },
        { text: 'Docker', link: '/server/docker' },
        { text: 'MySQL', link: '/server/mysql' },
        { text: 'Tomcat', link: '/server/tomcat' },
        { text: 'ElasticSearch', link: '/server/elasticsearch' },
        { text: 'OAuth2', link: '/server/OAuth2' }
      ]
    }
  }
});

function nav() {
  return [
    {
      text: '前端',
      items: [
        { text: '基础', link: '/fe/js/' },
        { text: 'TypeScript', link: '/fe/ts/' },
        { text: 'React', link: '/react/' },
        { text: 'Vue', link: '/vue/vue2' },
        { text: 'Node', link: '/node/' },
        { text: '前端工程化', link: '/automate/index' },
        { text: '小程序', link: '/miniProgram/wx/index' },
        { text: '工具', link: '/tools/plugin' }
      ]
    },
    {
      text: '可视化',
      items: [
        { text: 'GIS', link: '/gis/' },
        { text: 'WebGL', link: '/webgl/' },
        { text: '流媒体', link: '/media/' }
      ]
    },
    {
      text: '计算机基础',
      items: [
        { text: '计算机网络', link: '/base/network/' },
        { text: '设计模式', link: '/base/design-pattern/' },
        { text: '数据结构', link: '/base/data-structure/' },
        { text: '算法', link: '/base/algorithm/' },
        { text: '操作系统', link: '/base/os/' },
        { text: '计算机组成原理', link: '/base/computer-organization/' }
      ]
    },
    { text: '服务端', link: '/server/nginx' }
  ];
}
