(window.webpackJsonp=window.webpackJsonp||[]).push([[40],{403:function(t,s,a){"use strict";a.r(s);var e=a(19),r=Object(e.a)({},(function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("h1",{attrs:{id:"git"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#git"}},[t._v("#")]),t._v(" git")]),t._v(" "),a("h2",{attrs:{id:"介绍"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#介绍"}},[t._v("#")]),t._v(" 介绍")]),t._v(" "),a("p",[t._v("git 是分布式版本控制系统")]),t._v(" "),a("ul",[a("li",[t._v("Workspace：工作区")]),t._v(" "),a("li",[t._v("Index / Stage：暂存区")]),t._v(" "),a("li",[t._v("Repository：本地仓库")]),t._v(" "),a("li",[t._v("Remote：远程仓库")])]),t._v(" "),a("h2",{attrs:{id:"配置"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#配置"}},[t._v("#")]),t._v(" 配置")]),t._v(" "),a("h3",{attrs:{id:"全局配置用户信息"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#全局配置用户信息"}},[t._v("#")]),t._v(" 全局配置用户信息")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" config --global user.name "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"your_name"')]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" config --global user.email "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"your_email"')]),t._v("\n")])])]),a("h3",{attrs:{id:"生成-ssh-密钥"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#生成-ssh-密钥"}},[t._v("#")]),t._v(" 生成 SSH 密钥")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[t._v(" ssh-keygen -t rsa -C "),a("span",{pre:!0,attrs:{class:"token number"}},[t._v("1972571253")]),t._v("@qq.com\n")])])]),a("p",[t._v("在 Mac 终端里查看密钥：")]),t._v(" "),a("p",[t._v("cd ~/.ssh 切换目录到这个路径")]),t._v(" "),a("p",[t._v("vim id_rsa.pub 将这个文件的内容显示到终端上")]),t._v(" "),a("p",[t._v("然后将公共密钥添加进 github 或者 gitlab 里")]),t._v(" "),a("p",[t._v("测试连接是否成功:")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("ssh")]),t._v(" -T git@github.com\n")])])]),a("p",[t._v("如果提示："),a("code",[t._v("Hi Ivanzgh! You've successfully authenticated, but GitHub does not provide shell access.")]),t._v(" 说明你连接成功了")]),t._v(" "),a("h2",{attrs:{id:"常用命令"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#常用命令"}},[t._v("#")]),t._v(" 常用命令")]),t._v(" "),a("h3",{attrs:{id:"克隆远程仓库"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#克隆远程仓库"}},[t._v("#")]),t._v(" 克隆远程仓库")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" clone "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v(" remote-address "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n")])])]),a("h3",{attrs:{id:"新建分支"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#新建分支"}},[t._v("#")]),t._v(" 新建分支")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" branch "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v(" branch-name "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n")])])]),a("h3",{attrs:{id:"切换分支-并更新工作区"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#切换分支-并更新工作区"}},[t._v("#")]),t._v(" 切换分支，并更新工作区")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" checkout "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v(" branch-name "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n")])])]),a("h3",{attrs:{id:"新建分支-并切换到该分支"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#新建分支-并切换到该分支"}},[t._v("#")]),t._v(" 新建分支，并切换到该分支")]),t._v(" "),a("p",[t._v("等同于以上两条命令")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" checkout -b "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v(" branch-name "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n")])])]),a("h3",{attrs:{id:"删除分支"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#删除分支"}},[t._v("#")]),t._v(" 删除分支")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" branch -d "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v(" branch-name "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n")])])]),a("h3",{attrs:{id:"合并分支"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#合并分支"}},[t._v("#")]),t._v(" 合并分支")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" merge\n")])])]),a("h3",{attrs:{id:"查看仓库当前状态"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#查看仓库当前状态"}},[t._v("#")]),t._v(" 查看仓库当前状态")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" status\n")])])]),a("h3",{attrs:{id:"将所有文件都添加到暂存区"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#将所有文件都添加到暂存区"}},[t._v("#")]),t._v(" 将所有文件都添加到暂存区")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("add")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(".")]),t._v("\n")])])]),a("h3",{attrs:{id:"提交到本地仓库-m-后表示提交信息"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#提交到本地仓库-m-后表示提交信息"}},[t._v("#")]),t._v(" 提交到本地仓库，-m 后表示提交信息")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" commit -m "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v("'xx'")]),t._v("\n")])])]),a("h3",{attrs:{id:"拉取远程仓库"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#拉取远程仓库"}},[t._v("#")]),t._v(" 拉取远程仓库")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" pull\n")])])]),a("h3",{attrs:{id:"提交到远程仓库"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#提交到远程仓库"}},[t._v("#")]),t._v(" 提交到远程仓库")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" push\n")])])]),a("h3",{attrs:{id:"查看本地远程所有分支"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#查看本地远程所有分支"}},[t._v("#")]),t._v(" 查看本地远程所有分支")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" remote show origin\n")])])]),a("h3",{attrs:{id:"查看本地关联的仓库地址"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#查看本地关联的仓库地址"}},[t._v("#")]),t._v(" 查看本地关联的仓库地址")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" remote -v\n")])])]),a("h3",{attrs:{id:"删除远程已经不存在但本地还存在的分支"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#删除远程已经不存在但本地还存在的分支"}},[t._v("#")]),t._v(" 删除远程已经不存在但本地还存在的分支")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" remote prune origin\n")])])]),a("h3",{attrs:{id:"关联远程仓库"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#关联远程仓库"}},[t._v("#")]),t._v(" 关联远程仓库")]),t._v(" "),a("p",[t._v("如果存在本地项目，想将其推送到 github 上，要先和远程仓库关联，然后推送")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" remote "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("add")]),t._v(" origin git@github.com:Ivanzgh/elasticsearch.git      "),a("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# 地址换成自己的")]),t._v("\n\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" branch -M main\n\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" push -u origin main\n")])])]),a("p",[t._v("创建一个新的仓库")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" clone ssh://git@192.168.8.8:30001/gkhyy/report_web.git\n"),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("cd")]),t._v(" report_web\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("touch")]),t._v(" README.md\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("add")]),t._v(" README.md\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" commit -m "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"add README"')]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" push -u origin master\n")])])]),a("p",[t._v("推送一个已经存在的文件夹")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("cd")]),t._v(" existing_folder\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" init\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" remote "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("add")]),t._v(" origin ssh://git@192.168.8.8:30001/gkhyy/report_web.git\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("add")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v(".")]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" commit -m "),a("span",{pre:!0,attrs:{class:"token string"}},[t._v('"Initial commit"')]),t._v("\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" push -u origin master\n")])])]),a("p",[t._v("推送一个已经存在的 git 仓库")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("cd")]),t._v(" existing_repo\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" remote "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("rename")]),t._v(" origin old-origin\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" remote "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("add")]),t._v(" origin ssh://git@192.168.8.8:30001/gkhyy/report_web.git\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" push -u origin --all\n"),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" push -u origin --tags\n")])])]),a("h2",{attrs:{id:"集成到编辑器"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#集成到编辑器"}},[t._v("#")]),t._v(" 集成到编辑器")]),t._v(" "),a("h3",{attrs:{id:"webstorm-集成-git"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#webstorm-集成-git"}},[t._v("#")]),t._v(" webstorm 集成 git")]),t._v(" "),a("h4",{attrs:{id:"_1、克隆项目"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_1、克隆项目"}},[t._v("#")]),t._v(" 1、克隆项目")]),t._v(" "),a("p",[t._v("VCS --\x3e Git --\x3e Clone，在弹出窗口 URL 输入项目地址，第二栏选择安装地址")]),t._v(" "),a("h4",{attrs:{id:"_2、新建分支"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_2、新建分支"}},[t._v("#")]),t._v(" 2、新建分支")]),t._v(" "),a("p",[t._v("在右下角点击 git 选择 New Branch,输入分支名字")]),t._v(" "),a("h4",{attrs:{id:"_3、切换-dev-分支"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_3、切换-dev-分支"}},[t._v("#")]),t._v(" 3、切换 dev 分支")]),t._v(" "),a("p",[t._v("选择本地 dev 分支，点击 checkout 切换到 dev 分支，pull 拉取远程仓库")]),t._v(" "),a("h4",{attrs:{id:"_4、返回开发分支"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_4、返回开发分支"}},[t._v("#")]),t._v(" 4、返回开发分支")]),t._v(" "),a("p",[t._v("选择开发分支，点击 checkout 切换到开发分支，接着选择 dev 分支，点击 merge into current 将 dev 最新版本合并到开发分支")]),t._v(" "),a("h4",{attrs:{id:"_5、推送远程仓库"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#_5、推送远程仓库"}},[t._v("#")]),t._v(" 5、推送远程仓库")]),t._v(" "),a("p",[t._v("本地开发完成后，提交远程仓库即可，待合并请求通过后，拉取最新版本继续开发。")]),t._v(" "),a("p",[t._v("提交步骤：选中项目右键，选择 Git，先 Add，再 commit，接着 push")]),t._v(" "),a("h3",{attrs:{id:"vscode-集成-git"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#vscode-集成-git"}},[t._v("#")]),t._v(" vscode 集成 git")]),t._v(" "),a("p",[t._v("在 Mac 终端输入 git clone 拉取项目，注意存放位置，然后用 vscode 打开，编辑完成后点击左侧菜单栏第三个按钮，先点击 CHANGES 目录右侧的 + 号（鼠标移入显示），表示将内容添加到暂存区，接着点击最上方右侧的对勾，表示提交到本地仓库，点击后会弹出一个输入框，输入提交信息，最后在编辑器左下角出现一个向上的箭头，点击即可提交到远程仓库，向下的箭头表示从远程仓库拉取代码，旁边还有分支信息，可新建和切换。当然，如果使用命令行请忽视以上内容。")]),t._v(" "),a("h2",{attrs:{id:"提交规范"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#提交规范"}},[t._v("#")]),t._v(" 提交规范")]),t._v(" "),a("h3",{attrs:{id:"格式"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#格式"}},[t._v("#")]),t._v(" 格式")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("type"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("scope"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(": "),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("subject"),a("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n")])])]),a("h3",{attrs:{id:"常用的-type-值"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#常用的-type-值"}},[t._v("#")]),t._v(" 常用的 type 值")]),t._v(" "),a("ul",[a("li",[t._v("feat:新功能")]),t._v(" "),a("li",[t._v("fix:修复 bug")]),t._v(" "),a("li",[t._v("docs:仅仅修改了文档，比如 README 等等")]),t._v(" "),a("li",[t._v("style:仅仅修改了空格、格式缩进、不改变代码逻辑")]),t._v(" "),a("li",[t._v("refactor:代码重构，没有加新功能或者修复 bug")]),t._v(" "),a("li",[t._v("perf:性能优化，比如提升性能、体验")]),t._v(" "),a("li",[t._v("test:测试用例，包括单元测试、集成测试等")]),t._v(" "),a("li",[t._v("build :改变了 build 工具 如 grunt 换成了 npm")]),t._v(" "),a("li",[t._v("chore: 改变构建流程、或者增加依赖库、工具等")]),t._v(" "),a("li",[t._v("revert: 撤销上一次的 commit")])]),t._v(" "),a("h3",{attrs:{id:"scope-用来说明此次修改的影响范围"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#scope-用来说明此次修改的影响范围"}},[t._v("#")]),t._v(" scope 用来说明此次修改的影响范围")]),t._v(" "),a("ul",[a("li",[t._v("all ：表示影响面大 ，如修改了网络框架 会对整个程序产生影响")]),t._v(" "),a("li",[t._v("location： 表示影响小，某个小小的功能")]),t._v(" "),a("li",[t._v("module：表示会影响某个模块 如登录模块、首页模块 、用户管理模块等等")])]),t._v(" "),a("h3",{attrs:{id:"subject-用来简要描述本次改动-概述即可"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#subject-用来简要描述本次改动-概述即可"}},[t._v("#")]),t._v(" subject 用来简要描述本次改动，概述即可")]),t._v(" "),a("p",[t._v("示例:")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[t._v("feat"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("all"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(": project init\n")])])]),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[t._v("docs"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("location"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(": edit README\n")])])]),a("h2",{attrs:{id:"常见问题"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#常见问题"}},[t._v("#")]),t._v(" 常见问题")]),t._v(" "),a("h3",{attrs:{id:"mac-下误将-ds-store-文件上传到-github"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#mac-下误将-ds-store-文件上传到-github"}},[t._v("#")]),t._v(" mac 下误将.DS_Store 文件上传到 GitHub")]),t._v(" "),a("p",[t._v("在 Mac 下，每个目录都有一个.DS_Store 文件，用于存储当前文件夹的一些 meta 信息。没上传前可以将其添加到.gitignore 文件中，若已经上传，则删除远端的即可")]),t._v(" "),a("div",{staticClass:"language-sh extra-class"},[a("pre",{pre:!0,attrs:{class:"language-sh"}},[a("code",[a("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[t._v("rm")]),t._v(" --cached .DS_Store\n")])])]),a("p",[t._v("以上命令将.DS_Store 文件从 git 索引库中删除，并没有操作本地文件。")]),t._v(" "),a("h3",{attrs:{id:"gitkeep-的作用"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#gitkeep-的作用"}},[t._v("#")]),t._v(" .gitkeep 的作用")]),t._v(" "),a("p",[t._v("为了可以提交空的文件夹")]),t._v(" "),a("h3",{attrs:{id:"无法访问-github"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#无法访问-github"}},[t._v("#")]),t._v(" 无法访问 github")]),t._v(" "),a("p",[t._v("Windows 下修改 hosts 文件，打开"),a("code",[t._v("C:\\Windows\\System32\\drivers\\etc")]),t._v("下的 hosts 文件，添加如下内容：")]),t._v(" "),a("div",{staticClass:"language-yml extra-class"},[a("pre",{pre:!0,attrs:{class:"language-yml"}},[a("code",[t._v("140.82.113.4 github.com\n199.232.69.194 github.global.ssl.fastly.net\n185.199.108.153 assets"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("cdn.github.com\n185.199.109.153 assets"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("cdn.github.com\n185.199.110.153 assets"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("cdn.github.com\n185.199.111.153 assets"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("-")]),t._v("cdn.github.com\n140.82.112.3 gist.github.com\n199.232.68.133 raw.githubusercontent.com\n199.232.68.133 gist.githubusercontent.com\n199.232.68.133 cloud.githubusercontent.com\n199.232.68.133 camo.githubusercontent.com\n199.232.68.133 avatars0.githubusercontent.com\n199.232.68.133 avatars1.githubusercontent.com\n199.232.68.133 avatars2.githubusercontent.com\n199.232.68.133 avatars3.githubusercontent.com\n199.232.68.133 avatars4.githubusercontent.com\n199.232.68.133 avatars5.githubusercontent.com\n199.232.68.133 avatars6.githubusercontent.com\n199.232.68.133 avatars7.githubusercontent.com\n199.232.68.133 avatars8.githubusercontent.com\n")])])]),a("p",[t._v("添加以后可以解决 github 无法访问、图片和头像加载失败等问题。")]),t._v(" "),a("p",[t._v("注意以上地址并不是固定的，通过"),a("a",{attrs:{href:"https://www.ipaddress.com/",target:"_blank",rel:"noopener noreferrer"}},[t._v("https://www.ipaddress.com/"),a("OutboundLink")],1),t._v("输入以上各个域名即可查询到最新的 IP 地址。\n如果有必要可以刷新一下 DNS 解析缓存，打开 cmd 窗口输入"),a("code",[t._v("ipconfig /flushdns")]),t._v("即可。")]),t._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[t._v("TIP")]),t._v(" "),a("p",[t._v("如果无法保存 hosts 文件，可以在开始栏找到 Windows 附件，找到记事本，以管理员身份运行，然后找到 hosts 文件位置，选择所有文件，即可保存更改。")])])])}),[],!1,null,null,null);s.default=r.exports}}]);