module.exports = {
    title: 'zghIvan',
    description: 'Blog',
    base: '/blog/',
    head: [
        ['link', {rel: 'icon', href: '/img/logo.png'}]
    ],
    themeConfig: {
        logo: '/img/logo.png',
        lastUpdated: 'Last Updated',
        //sidebarDepth: 2,  // 默认是1，表示侧边栏只显示h1、h2；设置为2则h3也显示在侧边栏
        nav: [
            {
                text: '前端',
                items: [
                    { text: 'html', link: '/fe/html/' },
                    { text: 'css', link: '/fe/css/' },
                    { text: 'js', link: '/fe/js/' },
                    { text: 'ts', link: '/fe/ts/' },
                    { text: 'es6', link: '/fe/es6/' },
                    { text: 'sass、less', link: '/fe/sass/' },
                    { text: '浏览器', link: '/fe/browser/' },
                    { text: '性能优化', link: '/fe/performance/' },
                    { text: '正则表达式', link: '/fe/regular/' },
                    { text: '移动端开发', link: '/fe/mobile/' },
                ]
            },
            {
                text: '框架和库',
                items: [
                    { text: 'Vue', link: '/fe/vue/' },
                    { text: 'React', link: '/fe/react/' },
                    { text: 'Node', link: '/fe/node/' },
                    { text: 'express', link: '/fe/express/' },
                    { text: 'koa', link: '/fe/koa/' },
                    { text: 'mongodb', link: '/fe/mongodb/' },
                    { text: '微信小程序', link: '/fe/wx/' },
                ]
            },
            {
                text: '工具',
                items: [
                    { text: 'npm', link: '/fe/npm/' },
                    { text: 'git', link: '/fe/git/' },
                    { text: 'webpack', link: '/fe/webpack/' },
                    { text: 'gulp', link: '/fe/gulp/' }
                ]
            },
            {
                text: '后端',
                items: [
                    { text: 'Docker', link: '/be/docker/' },
                    { text: 'Nginx', link: '/be/nginx/' },
                    { text: 'ElasticSearch', link: '/be/elastic/' },
                    { text: 'OpenStack', link: '/be/openstack/' },
                ]
            },
            {
                text: '可视化',
                items: [
                    { text: 'OpenLayers', link: '/vis/openlayers/' },
                    { text: 'Leaflet', link: '/vis/leaflet/' },
                    { text: 'GeoServer', link: '/vis/geoserver/' },
                    { text: 'Cesium', link: '/vis/cesium/' },
                ]
            },
            {
                text: '计算机基础',
                items: [
                    { text: '网络', link: '/base/network/' },
                    { text: '数据结构', link: '/base/data/' },
                    { text: '算法', link: '/base/algorithm/' },
                    { text: '操作系统', link: '/base/os/' }
                ]
            },
            { text: '随笔', link: '/thought/' },
            { text: 'GitHub', link: 'https://github.com/Ivanzgh' }
        ],
        sidebar: {
            '/thought/': [
                ''
            ],
            '/fe/vue/': [
                {
                    title: 'vue',
                    collapsable: false,
                    children: [
                        '',
                        'contact',
                        'deploy',
                    ]
                },
                {
                    title: 'vuex',
                    collapsable: false,
                    children: [
                        'vuex1',
                        'vuex2'
                    ]
                },
                {
                    title: 'vue-router',
                    collapsable: false,
                    children: [
                        'vue-router'
                    ]
                },
            ],
            '/fe/js/': [
                {
                    title: '基础',
                    collapsable: false,
                    sidebarDepth: 2,
                    children: [
                        '',
                        'array',
                        'string',
                        'object'
                    ]
                },
                {
                    title: '进阶',
                    collapsable: false,
                    sidebarDepth: 1,
                    children: [
                        'advanced',
                        'oop',
                        'es6'
                    ]
                },
            ],
            '/fe/html/': [
                {
                    title: '基础',
                    collapsable: false,
                    sidebarDepth: 2,
                    children: [
                        '',
                    ]
                },
                {
                    title: '进阶',
                    collapsable: false,
                    sidebarDepth: 2,
                    children: [
                        'canvas',
                        'svg'
                    ]
                }
            ],
            '/fe/css/': [
                {
                    title: '基础',
                    collapsable: false,
                    sidebarDepth: 2,
                    children: [
                        ''
                    ]
                },
                {
                    title: '进阶',
                    collapsable: false,
                    sidebarDepth: 2,
                    children: [
                        'box-shadow',
                        'gradient',
                        'animation'
                    ]
                }
            ],
            '/fe/npm/': [
                {
                    collapsable: false,
                    children: ['']
                }
            ],
            '/fe/gulp/': [
                {
                    collapsable: false,
                    sidebarDepth: 2,
                    children: ['']
                }
            ],
            '/fe/git/': [
                {
                    collapsable: false,
                    sidebarDepth: 2,
                    children: ['']
                }
            ],
            '/be/nginx/': [
                {
                    title: 'Nginx',
                    collapsable: false,
                    children: [
                        ''
                    ]
                }
            ],
            '/be/elastic/': [
                {
                    title: 'ElasticSearch',
                    collapsable: false,
                    children: [
                        ''
                    ]
                }
            ],
            '/vis/openlayers/': [
                {
                    collapsable: false,
                    sidebarDepth: 2,
                    children: ['']
                }
            ],
            '/vis/leaflet/': [
                {
                    collapsable: false,
                    sidebarDepth: 2,
                    children: ['']
                }
            ],
        }
    }
}