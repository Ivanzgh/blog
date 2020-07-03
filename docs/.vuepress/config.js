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
        sidebarDepth: 2,
        nav: [
            {
                text: '前端',
                items: [
                    { text: 'html', link: '/web/html/' },
                    { text: 'css', link: '/web/css/' },
                    { text: 'js', link: '/web/js/' },
                    { text: 'Vue', link: '/web/vue/' },
                    { text: 'React', link: '/web/react/' },
                    { text: 'Node', link: '/web/node/' },
                    { text: '微信小程序', link: '/web/applet/' },
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
            '/web/vue/': [
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
            '/web/js/': [
                {
                    title: '基础',
                    collapsable: false,
                    children: [
                        '',
                        'array',
                        'object'
                    ]
                },
                {
                    title: '进阶',
                    collapsable: false,
                    children: [
                        'oss'
                    ]
                },
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
                    title: 'OpenLayers',
                    collapsable: false,
                    children: [
                        ''
                    ]
                }
            ],
        }
    }
}