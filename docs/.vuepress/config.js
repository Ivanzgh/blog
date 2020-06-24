module.exports = {
    title: 'vue',
    description: 'Blog',
    base: '/blog/',
    head: [
        ['link', {rel: 'icon', href: '/img/logo.png'}]
    ],
    themeConfig: {
        lastUpdated: 'Last Updated',
        nav: [
            { text: '求索', link: '/FAQ/' },
            { text: '随笔', link: '/Thought/' },
            {
                text: 'Contact',
                items: [
                    { text: 'Segmentfault', link: 'https://segmentfault.com/u/mulander' },
                ]
            },
            {
                text: 'GitHub',
                items: [
                    { text: 'github', link: 'https://github.com/Ivanzgh' },
                ]
            }
        ],
        sidebar: {
            '/FAQ/': [
                ['/FAQ/','百科首页'],
                {
                    // 菜单名
                    title: 'Vue',
                    // 子菜单
                    children: [
                        // ['','']=>[路径,标题]
                        // 或者写成 '路径',标题自动识别为该地址的文件中的h1标题
                        // 不以 '/' 结尾的就是指向.md文件
                        ['/FAQ/Vue/','vue首页'],
                        ['/FAQ/Vue/Index2','子菜单2']
                    ]
                },
                {
                    title: 'React',
                    children: [
                        ['/FAQ/React/','react首页'],
                        ['/FAQ/React/Index2','子菜单4']
                    ]
                },
            ],
            // '/Thought/': [
            //     ['/Thought/', '随笔首页'],
            //     {
            //         title: '游记',
            //         children: [
            //             ['/Thought/Travels/beiPing','北平游记'],
            //         ]
            //     },
            //     {
            //         title: '年终回顾',
            //         children: [
            //             ['/Thought/YearReview/2018','2018年'],
            //             ['/Thought/YearReview/2019','2019年']
            //         ]
            //     },
            // ],
        }
    }
}