module.exports = {
    title: 'zghIvan',
    description: 'Blog',
    base: '/blog/',
    head: [
        ['link', {rel: 'icon', href: '/img/logo.png'}]
    ],
    themeConfig: {
        lastUpdated: 'Last Updated',
        nav: [
            {
                text: '前端',
                items: [
                    { text: '基础', link: '/web/js/' },
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
                    { text: 'ElasticSearch', link: '/be/elastic/' },
                    { text: 'OpenStack', link: '/be/openstack/' },
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
            '/web/vue/': [
                ['/web/vue/','vue首页'],
                {
                    title: 'vue',
                    children: [
                        // ['',''] => [路径,标题]
                        // 或者写成 '路径',标题自动识别为该地址的文件中的h1标题
                        // 不以 '/' 结尾的就是指向.md文件
                        ['/web/vue/vuex/','vuex'],
                        ['/web/vue/vue-router/','vue-router']
                    ]
                },
                {
                    title: 'vuex',
                    children: [
                        ['/web/vue/vuex/','vuex']
                    ]
                },
                {
                    title: 'vue-router',
                    children: [
                        ['/web/vue/vue-router/','vue-router']
                    ]
                },
            ],
            '/thought/': [
                ['/thought/', '随笔首页']
            ],
            '/web/js/': [
                {
                    title: 'js',
                    children: [
                        ['/web/js/object/','面向对象'],
                        ['/web/js/array/','数组']
                    ]
                },
                {
                    title: 'css',
                    children: [
                        ['/web/css/','css']
                    ]
                },
            ],
        }
    }
}