import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'zghIvan',
  description: 'Blog',
  base: '/blog/',
  lastUpdated: true,
  head: [['link', { rel: 'icon', href: '/img/logo.png' }]],
  // plugins: [
  //   'reading-progress',
  //   '@vuepress/back-to-top',
  //   'img-lazy',
  //   'vuepress-plugin-baidu-autopush',
  //   [{ name: 'page-plugin', globalUIComponents: ['global-Cat'] }]
  // ],
  markdown: { theme: 'dracula' },
  themeConfig: {
    logo: '/img/logo.png',
    lastUpdatedText: '更新日期',
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2020-present ZGH'
    },
    algolia: {
      appId: 'L87Y8ET2MP',
      apiKey: '6be3321f6faf70967ed208d822aaccc8',
      indexName: 'ZGHBLOG'
    },
    nav: nav(),
    sidebar: {
      '/fe/html/': [
        {
          text: 'HTML',
          collapsible: true,
          items: [
            { text: 'HTML', link: '/fe/html/' },
            { text: 'Canvas', link: '/fe/html/canvas' },
            { text: 'SVG', link: '/fe/html/svg' }
          ]
        }
      ],
      '/fe/css/': [
        {
          text: 'CSS',
          collapsible: true,
          items: [
            { text: 'CSS', link: '/fe/css/' },
            { text: '常用布局', link: '/fe/css/layout' },
            { text: '业务效果', link: '/fe/css/business' },
            { text: '阴影', link: '/fe/css/box-shadow' },
            { text: '渐变', link: '/fe/css/gradient' },
            { text: '动画', link: '/fe/css/animation' },
            { text: '媒体查询', link: '/fe/css/media-queries' },
            { text: '裁剪', link: '/fe/css/clip-path' },
            { text: 'Sass', link: '/fe/css/sass' },
            { text: 'Less', link: '/fe/css/less' }
          ]
        }
      ],
      '/fe/js/': [
        {
          text: 'JavaScript',
          collapsible: true,
          items: [
            { text: 'JS', link: '/fe/js/' },
            { text: 'DOM', link: '/fe/js/dom' },
            { text: 'JSON', link: '/fe/js/json' },
            { text: '数组', link: '/fe/js/array' },
            { text: '字符串', link: '/fe/js/string' },
            { text: '对象', link: '/fe/js/object' },
            { text: 'AJAX', link: '/fe/js/ajax' },
            { text: 'advanced', link: '/fe/js/advanced' },
            { text: 'oop', link: '/fe/js/oop' },
            { text: 'ES6', link: '/fe/js/es6' },
            { text: '模块化', link: '/fe/js/module' },
            { text: '工具', link: '/fe/js/utils' },
            { text: 'utilsArray', link: '/fe/js/utilsArray' }
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
            { text: 'vue-router', link: '/fe/vue/vue-router' }
          ]
        }
      ],
      '/fe/react/': [
        {
          text: 'React',
          collapsible: true,
          items: [
            { text: 'React', link: '/fe/react/' },
            { text: 'Redux', link: '/fe/react/redux' }
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
      '/fe/browser/': [
        {
          text: '浏览器',
          collapsible: true,
          items: [
            { text: '浏览器', link: '/fe/browser/' },
            { text: 'window', link: '/fe/browser/window' },
            { text: '兼容性', link: '/fe/browser/compatibility' }
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
        { text: 'HTML', link: '/fe/html/' },
        { text: 'CSS', link: '/fe/css/' },
        { text: 'JavaScript', link: '/fe/js/' },
        { text: 'TypeScript', link: '/fe/ts/' },
        { text: 'Vue', link: '/fe/vue/' },
        { text: 'React', link: '/fe/react/' },
        { text: 'Node', link: '/fe/node/' },
        { text: '微信小程序', link: '/fe/wx/' },
        { text: '浏览器', link: '/fe/browser/' },
        { text: '前端插件', link: '/fe/plugin/' }
      ]
    },
    {
      text: '工具',
      items: [
        { text: 'NPM', link: '/fe/npm/' },
        { text: 'Git', link: '/fe/git/' },
        { text: 'Webpack', link: '/build/webpack/' },
        { text: 'Gulp', link: '/build/gulp/' },
        { text: 'rollup', link: '/build/rollup/' },
        { text: 'Others', link: '/utils/' }
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
        { text: 'OpenLayers', link: '/vis/openlayers/' },
        { text: 'Leaflet', link: '/vis/leaflet/' },
        { text: 'GeoServer', link: '/vis/geoserver/' },
        { text: 'Cesium', link: '/vis/cesium/' },
        { text: 'Three', link: '/vis/three/' },
        { text: 'Maptalks', link: '/vis/maptalks/' }
      ]
    },
    { text: '流媒体', link: '/media/' },
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
    { text: '随笔', link: '/thought/' }
  ]
}
