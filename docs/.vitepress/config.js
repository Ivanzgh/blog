import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'const',
  description: 'Blog',
  base: '/blog/',
  lastUpdated: true,
  head: [['link', { rel: 'icon', href: '/img/logo.png' }]],
  markdown: { theme: 'dracula' },
  themeConfig: {
    logo: '/img/logo.png',
    lastUpdatedText: '更新日期',
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2020-present ZGH'
    },
    algolia: {
      appId: '0QPOEAMUZK',
      apiKey: '3c1f70ed4dca0ad41775f35548a1b525',
      indexName: 'ivanzghio'
    },
    nav: nav(),
    sidebar: {
      '/fe/base/': [
        {
          text: 'JavaScript',
          collapsible: true,
          items: [
            { text: '基础', link: '/fe/base/js' },
            { text: '字符串', link: '/fe/base/js-string' },
            { text: '数组', link: '/fe/base/js-array' },
            { text: '对象', link: '/fe/base/js-object' },
            { text: 'ES6', link: '/fe/base/js-es6' },
            { text: 'DOM', link: '/fe/base/js-dom' },
            { text: 'JSON', link: '/fe/base/js-json' },
            { text: 'AJAX', link: '/fe/base/js-ajax' },
            { text: '模块化', link: '/fe/base/js-module' },
            { text: '工具', link: '/fe/base/js-utils' }
          ]
        },
        {
          text: 'HTML',
          collapsible: true,
          items: [
            { text: '基础', link: '/fe/base/html' },
            { text: 'Canvas', link: '/fe/base/html-canvas' },
            { text: 'SVG', link: '/fe/base/html-svg' }
          ]
        },
        {
          text: 'CSS',
          collapsible: true,
          items: [
            { text: '基础', link: '/fe/base/css' },
            { text: '布局', link: '/fe/base/css-layout' },
            { text: '业务效果', link: '/fe/base/css-business' },
            { text: '阴影', link: '/fe/base/css-box-shadow' },
            { text: '渐变', link: '/fe/base/css-gradient' },
            { text: '动画', link: '/fe/base/css-animation' },
            { text: '媒体查询', link: '/fe/base/css-media-queries' },
            { text: '裁剪', link: '/fe/base/css-clip-path' },
            { text: 'Sass', link: '/fe/base/css-sass' },
            { text: 'Less', link: '/fe/base/css-less' }
          ]
        },
        {
          text: '浏览器',
          collapsible: true,
          items: [
            { text: '基础', link: '/fe/base/browser' },
            { text: 'window', link: '/fe/base/browser-window' },
            { text: '兼容性', link: '/fe/base/browser-compatibility' }
          ]
        }
      ],
      '/fe/ts/': [
        {
          text: 'TypeScript',
          collapsible: true,
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
      '/fe/vue/': [
        {
          text: 'Vue',
          collapsible: true,
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
      '/fe/react/': [
        {
          text: 'React',
          collapsible: true,
          items: [
            { text: 'React', link: '/fe/react/' },
            { text: 'Hook', link: '/fe/react/hook' },
            { text: 'Redux', link: '/fe/react/redux' },
            { text: 'React-Router', link: '/fe/react/router' }
          ]
        }
      ],
      '/fe/node/': [
        {
          text: 'Node',
          collapsible: true,
          items: [{ text: 'Node', link: '/fe/node/' }]
        },
        { text: 'Express', collapsible: true, items: [{ text: 'Express', link: '/fe/node/express' }] },
        { text: 'Koa', collapsible: true, items: [{ text: 'Koa', link: '/fe/node/koa' }] },
        { text: 'MongoDB', collapsible: true, items: [{ text: 'MongoDB', link: '/fe/node/mongodb' }] }
      ],
      '/miniProgram/': [
        {
          text: '小程序',
          collapsible: true,
          items: [
            { text: '微信小程序', link: '/miniProgram/wx' },
            { text: 'Taro', link: '/miniProgram/taro' },
            { text: 'uniapp', link: '/miniProgram/uniapp' }
          ]
        }
      ],
      '/vis/gis/': [
        {
          text: 'GIS',
          collapsible: true,
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
      '/base/design-pattern/': [
        {
          text: '设计模式',
          collapsible: true,
          items: [
            { text: '设计模式', link: '/base/design-pattern/' },
            { text: '策略模式', link: '/base/design-pattern/strategy' },
            { text: '观察者模式', link: '/base/design-pattern/observers' },
            { text: '发布-订阅模式', link: '/base/design-pattern/publisher-subscriber' }
          ]
        }
      ]
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/Ivanzgh' }]
  }
})

function nav() {
  return [
    {
      text: '前端',
      items: [
        { text: '基础', link: '/fe/base/js' },
        { text: 'TypeScript', link: '/fe/ts/' },
        { text: 'Vue', link: '/fe/vue/' },
        { text: 'React', link: '/fe/react/' },
        { text: 'Node', link: '/fe/node/' },
        { text: '小程序', link: '/miniProgram/wx' },
        { text: '插件', link: '/plugin' }
      ]
    },
    {
      text: '工程化',
      items: [
        { text: 'NPM', link: '/npm' },
        { text: 'Git', link: '/git' },
        { text: 'Webpack', link: '/build/webpack/' },
        { text: 'Gulp', link: '/build/gulp/' },
        { text: 'rollup', link: '/build/rollup/' },
        { text: 'Others', link: '/utils' }
      ]
    },
    {
      text: '后端',
      items: [
        { text: 'Docker', link: '/be/docker/' },
        { text: 'Nginx', link: '/be/nginx/' },
        { text: 'MySQL', link: '/be/mysql/' },
        { text: 'Tomcat', link: '/be/tomcat/' },
        { text: 'ElasticSearch', link: '/be/elasticsearch/' }
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
        { text: '网络', link: '/base/network/' },
        { text: '算法', link: '/base/algorithm/' },
        { text: '数据结构', link: '/base/data-structure/' },
        { text: '操作系统', link: '/base/os/' },
        { text: '设计模式', link: '/base/design-pattern/' }
      ]
    },
    { text: '随笔', link: '/thought' }
  ]
}