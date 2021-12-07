# nomo-admin
A project for nomo admin!

## Project Init --- 项目初始化

```shell
[root@localhost ~]# yarn init
# or 
[root@localhost ~]# npm init
```

## Project Environment --- 项目环境要求
```shell
# node 环境 版本v10.0.0以上
[root@localhost ~]# node -v
[root@localhost ~]# v12.3.1
```

## Project Install Library --- 项目安装依赖

```shell
[root@localhost ~]# cd nomo-admin
# 推荐 yarn
[root@localhost nomo-admin]# yarn 
# 或者使用 cnpm
[root@localhost nomo-admin]# cnpm install
# 使用 npm
[root@localhost nomo-admin]# npm install
```

## Project Run --- 项目运行

```shell
# 推荐 yarn
[root@localhost nomo-admin]# yarn start
# npm
[root@localhost nomo-admin]# npm run start
```

## Project Catalog --- 项目目录

```javascript
├── config
├── docs
├── mock
├── public
├── src
│   ├── components
│   │   ├── AsideNav
│   │   │   ├── __tests__
│   │   │   │   ├── index.test.tsx 组件AsideNav测试文件
│   │   │   ├── index.tsx 组件AsideNav主文件
│   │   │   ├── index.less 组件AsideNav样式文件
│   │   │   ├── getMenu.ts 
│   ├── pages
│   │   ├── index.tsx
│   │   ├── index.less
│   │   ├── page.global.less 
├── static
├── .babelrc Babel配置说明文档
├── .gitignore 
├── LICENSE
├── package.json
├── README.md 说明文档
├── tsconfig
├── tslint.json
```

