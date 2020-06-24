module.exports = {
    title: 'vue',
    description: 'Blog',
    base: '/blog/',
    head: [
        ['link', {rel: 'icon', href: '/img/logo.png'}]
    ],
    themeConfig: {
        nav: [
            { text: '求索', link: '/FAQ/' },
            { text: '随笔', link: '/Thought/' },
        ],
        sidebar: {
            '/FAQ/': [
                ['/FAQ/', '百科首页']
            ],
            '/Thought/': [
                ['/Thought/', '随笔首页']
            ],
        }
    }
}