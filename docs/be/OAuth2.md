# OAuth2

## 介绍

OAuth (Open Authorization)，目前版本是 2.1

1. 是一个关于授权的开放网络标准
2. 允许用户授权第三方应用访问用户存储在其他服务上的信息
3. 不需要将用户名和密码提供给第三方应用

例如，在登录百度时可以选择使用微信登录，只需要同意微信授权，百度就可以获取用户在微信上的信息，而不需要用户在百度登录页输入用户名和密码

## 角色介绍

1. **Resource Owner**，资源所有者，又称“用户”（user）
2. **User Agent**，用户代理，比如浏览器
3. **Third-party application**，第三方应用程序，又称“客户端”（client），如例子中的百度
4. **HTTP service**，服务提供商，如例子中的微信
5. **Authorization server**，授权服务器，即服务提供商专门用来处理认证授权的服务器
6. **Resource server**，资源服务器，即资源提供商存放用户资源的服务器

## 解决方案

### 授权码模式

authorization_code

申请授权接口示例：`/oauth/authorize?client_id=baidu&response_type=code&scope=all&redirect_uri=https://www.baidu.com`

- client_id：客户端 ID，需要在授权服务器中注册
- response_type：code 表示返回授权码，token 表示返回访问令牌
- scope：权限范围，在授权服务器配置
- redirect_uri：重定向 URI，用户授权成功后跳转

步骤：

1. 用户通过代理（浏览器）访问客户端
2. 客户端将用户导向授权服务器
3. 授权服务器询问用户是否给予客户端授权
4. 用户同意授权
5. 授权服务器将用户导向客户端指定的重定向 URI，并附上授权码
6. 客户端收到授权码，向授权服务器申请令牌
7. 授权服务器核对授权码，向客户端发送访问令牌（access token）和更新令牌（refresh token）
8. 通过访问令牌向资源服务器请求资源
9. 资源服务器把访问令牌交给授权服务器进行检验（存在 IO 问题，有其他更优解）

接口示例：`/oauth/token?client_id=baidu&client_secret=123456&grant_type=authorization_code&code=6rXglz&redirect_uri=https://www.baidu.com`

- client_id：客户端 ID，需要在授权服务器中注册
- client_secret：客户端密码，在授权服务器中配置
- grant_type：授权模式
  - 授权码模式（authorization_code）
  - 简单模式（implicit）
  - 密码模式（password_credentials）
  - 客户端模式（client_credentials）
- code：授权码，在授权码模式提供

### 简单模式

implicit

### 密码模式

password

### 客户端模式

client_credentials
