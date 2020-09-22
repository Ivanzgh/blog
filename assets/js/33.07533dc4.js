(window.webpackJsonp=window.webpackJsonp||[]).push([[33],{387:function(a,t,s){"use strict";s.r(t);var e=s(19),n=Object(e.a)({},(function(){var a=this,t=a.$createElement,s=a._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[s("h1",{attrs:{id:"npm"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#npm"}},[a._v("#")]),a._v(" NPM")]),a._v(" "),s("p",[a._v("npm官网："),s("a",{attrs:{href:"https://www.npmjs.com/",target:"_blank",rel:"noopener noreferrer"}},[a._v("https://www.npmjs.com/"),s("OutboundLink")],1)]),a._v(" "),s("p",[a._v("npm中文文档："),s("a",{attrs:{href:"https://www.npmjs.cn/",target:"_blank",rel:"noopener noreferrer"}},[a._v("https://www.npmjs.cn/"),s("OutboundLink")],1)]),a._v(" "),s("h2",{attrs:{id:"常用指令"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#常用指令"}},[a._v("#")]),a._v(" 常用指令")]),a._v(" "),s("table",[s("thead",{attrs:{valign:"bottom"}},[s("tr",[s("th",{staticClass:"head"},[a._v("order")]),a._v(" "),s("th",{staticClass:"head"},[a._v("Description")])])]),a._v(" "),s("tbody",{attrs:{valign:"top"}},[s("tr",[s("td",[a._v("npm init")]),a._v(" "),s("td",[a._v("初始化，生成package.json")])]),a._v(" "),s("tr",[s("td",[a._v("npm install packname (简写 npm i )")]),a._v(" "),s("td",[a._v("安装依赖包，默认将依赖安装到生产环境中")])]),a._v(" "),s("tr",[s("td",[a._v("npm uninstall packnae (简写 npm uni)")]),a._v(" "),s("td",[a._v("卸载依赖包")])]),a._v(" "),s("tr",[s("td",[a._v("npm update packname")]),a._v(" "),s("td",[a._v("更新依赖包")])]),a._v(" "),s("tr",[s("td",[a._v("npm install npm -g")]),a._v(" "),s("td",[a._v("npm升级")])]),a._v(" "),s("tr",[s("td",[a._v("npm config get registry")]),a._v(" "),s("td",[a._v("查看镜像地址")])]),a._v(" "),s("tr",[s("td",[a._v("npm list -g")]),a._v(" "),s("td",[a._v("查看所有全局安装的模块")])])])]),a._v(" "),s("h2",{attrs:{id:"安装参数区别"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#安装参数区别"}},[a._v("#")]),a._v(" 安装参数区别")]),a._v(" "),s("h3",{attrs:{id:"全局安装"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#全局安装"}},[a._v("#")]),a._v(" 全局安装")]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("npm install packname -g \n")])])]),s("h3",{attrs:{id:"生产环境安装"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#生产环境安装"}},[a._v("#")]),a._v(" 生产环境安装")]),a._v(" "),s("p",[a._v("简写：-S ， 并在package.json的dependencies属性写入依赖。")]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("npm install packname --save \n")])])]),s("h3",{attrs:{id:"开发环境安装"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#开发环境安装"}},[a._v("#")]),a._v(" 开发环境安装")]),a._v(" "),s("p",[a._v("简写：-D ， 并在package.json的devDependencies属性写入依赖。")]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("npm install packname --save-dev  \n")])])]),s("h2",{attrs:{id:"切换淘宝镜像"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#切换淘宝镜像"}},[a._v("#")]),a._v(" 切换淘宝镜像")]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("npm install -g cnpm --registry=https://registry.npm.taobao.org\n")])])]),s("p",[a._v("安装成功后即可使用：")]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("cnpm install packname\n")])])]),s("p",[a._v("切换回npm镜像：")]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("npm config set registry https://registry.npmjs.org\n")])])]),s("p",[a._v("查看镜像源：")]),a._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[a._v("npm get registry\n")])])]),s("h2",{attrs:{id:"npm发布插件"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#npm发布插件"}},[a._v("#")]),a._v(" npm发布插件")]),a._v(" "),s("p",[a._v("1、npm init 初始化项目,生成package.json文件")]),a._v(" "),s("p",[a._v("2、敲代码")]),a._v(" "),s("p",[a._v("3、创建.npmignore文件，发布时会忽略里面的文件")]),a._v(" "),s("p",[a._v("4、创建README.md文件，添加插件描述")]),a._v(" "),s("p",[a._v("5、使用邮箱注册npm账号,官网：https://www.npmjs.com/")]),a._v(" "),s("p",[a._v("6、在npm官网查看插件名是否已经注册")]),a._v(" "),s("p",[a._v("7、可以运行npm whoami 查看当前用户是不是自己")]),a._v(" "),s("p",[a._v("8、在项目下运行 npm login，输入用户名、密码、邮箱")]),a._v(" "),s("p",[a._v("9、运行 npm publish")]),a._v(" "),s("p",[a._v("10、在npm官网查看是否发布成功")]),a._v(" "),s("h3",{attrs:{id:"npm发布的插件版本号规则"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#npm发布的插件版本号规则"}},[a._v("#")]),a._v(" npm发布的插件版本号规则")]),a._v(" "),s("p",[a._v("语义版本号分为X.Y.Z三位，分别代表主版本号、次版本号和补丁版本号。")]),a._v(" "),s("ul",[s("li",[a._v("如果只是修复bug，需要更新Z位。")]),a._v(" "),s("li",[a._v("如果是新增了功能，但是向下兼容，需要更新Y位。")]),a._v(" "),s("li",[a._v("如果有大变动，向下不兼容，需要更新X位。")])]),a._v(" "),s("h2",{attrs:{id:"package-json和package-lock-json的区别"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#package-json和package-lock-json的区别"}},[a._v("#")]),a._v(" package.json和package-lock.json的区别")]),a._v(" "),s("p",[a._v("package.json文件记录项目中所需要的所有模块。当执行npm install的时候，node会先从package.json文件中读取所有dependencies信息，\n然后根据dependencies中的信息与node_modules中的模块进行对比，没有的直接下载，已有的检查更新（最新版本的nodejs不会更新，因为有package-lock.json文件）。\n另外，package.json文件只记录通过"),s("code",[a._v("npm install")]),a._v("方式安装的模块信息，而这些模块所依赖的其他子模块的信息不会记录。")]),a._v(" "),s("p",[a._v("package-lock.json文件锁定所有模块的版本号，包括主模块和所有依赖子模块。在执行"),s("code",[a._v("npm install")]),a._v("的时候，\nnode从package.json文件读取模块名称，从package-lock.json文件中获取版本号，然后进行下载或者更新。\n因此，正因为有了package-lock.json文件锁定版本号，所以在执行"),s("code",[a._v("npm install")]),a._v("的时候，node不会自动更新package.json文件中的模块，\n必须用"),s("code",[a._v("npm install packagename")]),a._v("（自动更新小版本号）或者"),s("code",[a._v("npm install packagename@x.x.x（指定版本号）")]),a._v("来进行安装才会更新，package-lock.json文件中的版本号也会随着更新。")]),a._v(" "),s("p",[a._v("当package.json与package-lock.json都不存在，执行"),s("code",[a._v("npm install")]),a._v("时，node会重新生成package-lock.json文件，然后把node_modules中的模块信息全部记入package-lock.json文件，\n但不会生成package.json文件，此时，可以通过"),s("code",[a._v("npm init")]),a._v("来初始化生成package.json文件。")]),a._v(" "),s("p",[s("strong",[a._v("总结：")])]),a._v(" "),s("p",[a._v("项目中引入的包版本号之前经常会加^号，每次在执行"),s("code",[a._v("npm install")]),a._v("之后，下载的包都会发生变化，\n为了系统的稳定性考虑，每次执行完"),s("code",[a._v("npm install")]),a._v("之后会创建或者更新package-lock文件。\n该文件记录了上一次安装的具体的版本号，相当于是提供了一个参考，在出现版本兼容性问题的时候，就可以参考这个文件来修改版本号即可。")])])}),[],!1,null,null,null);t.default=n.exports}}]);