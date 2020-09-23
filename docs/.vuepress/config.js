module.exports = {
    title: 'zghIvan',
    description: 'Blog',
    base: '/blog/',
    head: [
        ['link', {rel: 'icon', href: '/img/logo.png'}]
    ],
    plugins: [
        'reading-progress',
        '@vuepress/back-to-top',
        'img-lazy',
        'vuepress-plugin-baidu-autopush',
        [
            {
                name: 'page-plugin',
                globalUIComponents: [
                    'global-Cat'
                ]
            }
        ]
    ],
    themeConfig: {
        logo: '/img/logo.png',
        lastUpdated: 'Last Updated',
        // sidebarDepth: 2,  // 默认是1，表示侧边栏只显示h1、h2；设置为2则h3也显示在侧边栏
        nav: [
            {
                text: '前端',
                items: [
                    {text: 'HTML', link: '/fe/html/'},
                    {text: 'CSS', link: '/fe/css/'},
                    {text: 'JavaScript', link: '/fe/js/'},
                    {text: 'TypeScript', link: '/fe/ts/'},
                    {text: 'Sass、Less', link: '/fe/sass/'},
                    {text: '浏览器', link: '/fe/browser/'},
                    {text: '性能优化', link: '/fe/performance/'},
                    {text: '正则表达式', link: '/fe/regular/'},
                    {text: '移动端开发', link: '/fe/mobile/'},
                    {text: '前端插件', link: '/fe/plugin/'}
                ]
            },
            {
                text: '框架和库',
                items: [
                    {text: 'Vue', link: '/fe/vue/'},
                    {text: 'React', link: '/fe/react/'},
                    {text: 'Node', link: '/fe/node/'},
                    {text: 'Express', link: '/fe/express/'},
                    {text: 'Koa', link: '/fe/koa/'},
                    {text: 'MongoDB', link: '/fe/mongodb/'},
                    {text: '微信小程序', link: '/fe/wx/'},
                ]
            },
            {
                text: '工具',
                items: [
                    {text: 'NPM', link: '/fe/npm/'},
                    {text: 'Git', link: '/fe/git/'},
                    {text: 'Webpack', link: '/fe/webpack/'},
                    {text: 'Gulp', link: '/fe/gulp/'},
                    {text: 'Others', link: '/utils/'}
                ]
            },
            {
                text: '后端',
                items: [
                    {text: 'Docker', link: '/be/docker/'},
                    {text: 'Nginx', link: '/be/nginx/'},
                    {text: 'MySQL', link: '/be/mysql/'},
                    {text: 'Tomcat', link: '/be/tomcat/'},
                    {text: 'ElasticSearch', link: '/be/elasticsearch/'},
                    {text: 'OpenStack', link: '/be/openstack/'},
                ]
            },
            {
                text: '可视化',
                items: [
                    {text: 'OpenLayers', link: '/vis/openlayers/'},
                    {text: 'Leaflet', link: '/vis/leaflet/'},
                    {text: 'GeoServer', link: '/vis/geoserver/'},
                    {text: 'Cesium', link: '/vis/cesium/'},
                    {text: 'Three', link: '/vis/three/'}
                ]
            },
            {
                text: '计算机基础',
                items: [
                    {text: '网络', link: '/base/network/'},
                    {text: '数据结构', link: '/base/data/'},
                    {text: '算法', link: '/base/algorithm/'},
                    {text: '操作系统', link: '/base/os/'}
                ]
            },
            {text: '随笔', link: '/thought/'},
            {text: 'GitHub', link: 'https://github.com/Ivanzgh'}
        ],
        sidebar: {
            '/thought/': [''],
            '/fe/vue/': [
                {
                    title: 'vue',
                    collapsable: false,
                    children: [
                        '',
                        'contact',
                        'deploy'
                    ]
                },
                {
                    title: 'vuex',
                    collapsable: false,
                    children: [
                        'vuex'
                    ]
                },
                {
                    title: 'vue-router',
                    collapsable: false,
                    sidebarDepth: 2,
                    children: [
                        'vue-router'
                    ]
                },
                {
                    title: 'vuePress',
                    collapsable: false,
                    sidebarDepth: 2,
                    children: [
                        'vuepress'
                    ]
                }
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
                    sidebarDepth: 2,
                    children: [
                        'advanced',
                        'oop',
                        'es6'
                    ]
                },
                {
                    title: '工具函数',
                    collapsable: false,
                    sidebarDepth: 2,
                    children: ['utils']
                },
            ],
            '/fe/ts/': [
                {
                    title: 'TypeScript',
                    collapsable: false,
                    sidebarDepth: 2,
                    children: [
                        ['', '概览'],
                        'interface',
                        'assertion',
                        'index-signatures'
                    ]
                }
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
            '/fe/node/': [
                {
                    title: 'Node',
                    collapsable: false,
                    sidebarDepth: 2,
                    children: ['']
                }
            ],
            '/fe/express/': [
                {
                    title: 'Express',
                    collapsable: false,
                    sidebarDepth: 2,
                    children: ['']
                }
            ],
            '/fe/mongodb/': [
                {
                    title: 'MongoDB',
                    collapsable: false,
                    sidebarDepth: 2,
                    children: ['']
                }
            ],
            '/fe/plugin/': [
                {
                    collapsable: false,
                    sidebarDepth: 2,
                    children: ['']
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
            '/be/mysql/': [
                {
                    title: 'MySQL',
                    collapsable: false,
                    children: [
                        ''
                    ]
                }
            ],
            '/be/tomcat/': [
                {
                    title: 'Tomcat',
                    collapsable: false,
                    children: [
                        ''
                    ]
                }
            ],
            '/be/elasticsearch/': [
                {
                    title: 'ElasticSearch',
                    collapsable: false,
                    sidebarDepth: 2,
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
            '/vis/three/': [
                {
                    collapsable: false,
                    sidebarDepth: 2,
                    children: ['']
                }
            ],
            '/utils/': [''],
        }
    }
}