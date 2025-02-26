# README

micro-base的ssr服务

- 通过nacos-client读取服务器的nacos配置
- 通过config npm包读取config
- 通过请求头的X-URL根据nacos识别环境后读取指定config
- 通过读取micro-base正常部署的html在ssr的html中补充入口script
