# Linux

```sh
# 创建文件夹，此处创建一个叫linux的文件夹
mkdir linux

# 创建文件，此处创建一个index.js文件
touch index.js

# 进入目录
cd linux

# 创建并进入文件夹
mkdir linux && cd linux

# 返回上级目录
cd ..

# 返回根目录
cd /

# 查看当前路径
pwd

# 查看当前目录下的子目录和文件
ls

# 打开文件


# 清空窗口内容
clear

# 查看历史记录
history
```

```sh
# 创建一个README.md文件，并写入内容：# title
echo "# title" >> README.md
```

## Vmware

下载安装 Vmware 后，需要下载 Ubuntu 系统镜像

- [Ubuntu 下载](https://ubuntu.com/download)
- [Vmware 安装 Ubuntu](https://blog.csdn.net/m0_51913750/article/details/131604868)

## shell 脚本

$$

$$```sh
#!/bin/bash

echo "执行的脚本名称："$0
echo "参数个数："$#
echo "所有参数："$@
echo "第1个参数："$1

# 当前目录
localURL=$(pwd)
echo "$localURL"

# 设置默认值，如果没有传入参数，就使用默认值prod
param=${1:-prod}

# 判断参数值，并执行对应的逻辑
if [ "$param" = "prod" ]; then
    echo "执行逻辑1"
elif [ "$param" = "stage" ]; then
    echo "执行逻辑2"
else
    echo "未知参数"
    exit 1
fi

read -n1 -p "Press any key to exit"
echo
exit 0
```

- 使用非零的退出码来表示错误状态，如例子中的「未知参数」
- 退出码为 0 通常表示成功，一般放在脚本的最后一行
