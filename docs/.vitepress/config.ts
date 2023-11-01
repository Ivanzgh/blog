import { defineConfig } from 'vitepress';

export default defineConfig({
  title: 'CONST',
  description: 'Blog',
  base: '/blog/',
  lastUpdated: true,
  cleanUrls: true,
  head: [['link', { rel: 'icon', href: '/blog/img/logo.png' }]],
  markdown: { theme: 'dracula' },
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
            { text: '对象', link: '/fe/js/object' },
            { text: 'ES6', link: '/fe/js/es6' },
            { text: 'DOM', link: '/fe/js/dom' },
            { text: 'JSON', link: '/fe/js/json' },
            { text: 'AJAX', link: '/fe/js/ajax' },
            { text: '模块化规范', link: '/fe/js/module' },
            { text: '手写JS', link: '/fe/js/truth' },
            { text: '工具', link: '/fe/js/utils' }
          ]
        },
        {
          text: 'HTML',
          collapsed: false,
          items: [
            { text: '基础', link: '/fe/html/' },
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
            { text: 'Less', link: '/fe/css/less' }
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
            { text: '调试', link: '/fe/browser/debug' }
          ]
        }
      ],
      '/fe/ts/': [
        {
          text: 'TypeScript',
          collapsed: false,
          items: [
            { text: '介绍', link: '/fe/ts/' },
            { text: '接口', link: '/fe/ts/interface' },
            { text: '断言', link: '/fe/ts/assertion' },
            { text: '索引签名', link: '/fe/ts/index-signatures' },
            { text: '枚举', link: '/fe/ts/enum' },
            { text: '函数', link: '/fe/ts/function' },
            { text: '类', link: '/fe/ts/class' },
            { text: 'tsconfig.json', link: '/fe/ts/config' },
            { text: '泛型', link: '/fe/ts/generic' }
          ]
        }
      ],
      '/fe/react/': [
        {
          text: 'React',
          collapsed: false,
          items: [
            { text: 'React', link: '/fe/react/' },
            { text: 'Hook', link: '/fe/react/hook' },
            { text: '状态管理', link: '/fe/react/state' },
            { text: 'React-Router', link: '/fe/react/router' },
            { text: 'NextJS', link: '/fe/react/next' },
            {
              text: '业务',
              link: '/fe/react/business',
              items: [
                { text: 'Ant Design', link: '/fe/react/antd/' },
                { text: 'Ant Design Pro', link: '/fe/react/antd/ant-design-pro' },
                { text: 'Umi', link: '/fe/react/antd/umi' },
                { text: 'ProComponents', link: '/fe/react/antd/proComponents' }
              ]
            }
          ]
        }
      ],
      '/fe/vue/': [
        {
          text: 'Vue',
          collapsed: false,
          items: [
            { text: 'Vue', link: '/fe/vue/' },
            { text: '组件通信', link: '/fe/vue/contact' },
            { text: '业务', link: '/fe/vue/business' },
            { text: 'vue3', link: '/fe/vue/vue3' },
            { text: 'UI库', link: '/fe/vue/ui' },
            { text: 'vuex', link: '/fe/vue/vuex' },
            { text: 'vue-router', link: '/fe/vue/vue-router' },
            { text: 'vuepress', link: '/fe/vue/vuepress' }
          ]
        }
      ],
      '/fe/node/': [
        {
          text: 'Node',
          collapsed: false,
          items: [
            { text: '简介', link: '/fe/node/' },
            { text: 'Buffer 缓冲区', link: '/fe/node/buffer' },
            { text: 'fs 文件系统', link: '/fe/node/fs' },
            { text: 'Http', link: '/fe/node/http' }
          ]
        },
        {
          text: '框架',
          collapsed: false,
          items: [
            { text: 'Express', link: '/fe/node/express' },
            { text: 'Koa', link: '/fe/node/koa' },
            { text: 'Egg', link: '/fe/node/egg' },
            { text: 'MongoDB', link: '/fe/node/mongodb' }
          ]
        }
      ],
      '/automate/': [
        {
          text: '前端工程化',
          items: [
            { text: 'NPM', link: '/automate/npm' },
            { text: 'Git', link: '/automate/git' },
            { text: 'Babel', link: '/automate/babel' },
            { text: 'Vite', link: '/automate/vite' },
            { text: 'Webpack', link: '/automate/webpack' },
            { text: 'Gulp', link: '/automate/gulp' },
            { text: 'Rollup', link: '/automate/rollup' },
            { text: 'CI/CD', link: '/automate/cicd' },
            { text: 'Eslint', link: '/automate/eslint' },
            { text: 'Prettier', link: '/automate/prettier' }
          ]
        }
      ],
      '/miniProgram/': [
        {
          text: '小程序',
          collapsed: false,
          items: [
            { text: '微信小程序', link: '/miniProgram/wx' },
            { text: 'Taro', link: '/miniProgram/taro' },
            { text: 'uniapp', link: '/miniProgram/uniapp' }
          ]
        }
      ],
      '/tools/': [
        {
          text: '🧰 工具箱',
          collapsed: false,
          items: [
            { text: 'plugin', link: '/tools/plugin' },
            { text: 'vscode', link: '/tools/vscode' },
            { text: 'iTerm2', link: '/tools/iTerm2' },
            { text: '部署', link: '/tools/deploy' }
          ]
        }
      ],
      '/vis/gis/': [
        {
          text: 'GIS',
          collapsed: false,
          items: [
            { text: '介绍', link: '/vis/gis/' },
            { text: '电子海图', link: '/vis/gis/enc' },
            { text: 'Maptalks', link: '/vis/gis/maptalks' },
            { text: 'OpenLayers', link: '/vis/gis/openlayers' },
            { text: 'Leaflet', link: '/vis/gis/leaflet' },
            { text: 'GeoServer', link: '/vis/gis/geoServer' },
            { text: 'Cesium', link: '/vis/gis/cesium' }
          ]
        }
      ],
      '/base/network/': [
        {
          text: '计算机网络',
          collapsed: false,
          items: [
            { text: '概览', link: '/base/network/' },
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
            { text: '策略模式', link: '/base/design-pattern/strategy' },
            { text: '观察者模式', link: '/base/design-pattern/observers' },
            { text: '发布-订阅模式', link: '/base/design-pattern/publisher-subscriber' }
          ]
        }
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
        { text: 'React', link: '/fe/react/' },
        { text: 'Vue', link: '/fe/vue/' },
        { text: 'Node', link: '/fe/node/' },
        { text: '前端工程化', link: '/automate/npm' },
        { text: '小程序', link: '/miniProgram/wx' },
        { text: '工具', link: '/tools/plugin' }
      ]
    },
    {
      text: '后端',
      items: [
        { text: 'Docker', link: '/be/docker' },
        { text: 'Nginx', link: '/be/nginx' },
        { text: 'MySQL', link: '/be/mysql' },
        { text: 'Tomcat', link: '/be/tomcat' },
        { text: 'ElasticSearch', link: '/be/elasticsearch' }
      ]
    },
    {
      text: '可视化',
      items: [
        { text: 'GIS', link: '/vis/gis/' },
        { text: 'Three', link: '/vis/three/' },
        { text: '流媒体', link: '/media/' }
      ]
    },
    {
      text: '计算机基础',
      items: [
        { text: '计算机网络', link: '/base/network/' },
        { text: '数据结构', link: '/base/data-structure/' },
        { text: '设计模式', link: '/base/design-pattern/' },
        { text: '算法', link: '/base/algorithm/' },
        { text: '操作系统', link: '/base/os/' },
        { text: '计算机组成原理', link: '/base/computer-organization/' }
      ]
    }
  ];
}
