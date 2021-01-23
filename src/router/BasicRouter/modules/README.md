---
order: 110
title: Menu 菜单管理
---

# Menu 菜单管理

## 新增一个菜单

- 导航栏菜单的新增一般都是新增到主页面的导航栏上，所以需要修改的是`BasicRouter`的文件内容。

### 新增一级菜单

- 第一步, 首先在BasicRouter/modules新增一个菜单路由文件`路由名.ts`，例如: `business.ts`对应经营图。在文件中增加路由代码：

```typescript
/**
 * @name Business || 经营图
 * @description React.lazy 函数能让你像渲染常规组件一样处理动态引入（的组件）。React.lazy 和 Suspense 技术还不支持服务端渲染。
 * @description children为二级路由的数组
*/
import { lazy } from 'react';
import CommonRoute from '../CommonRoute';

const BusinessPlan = lazy(
  () => (/* webpackChunkName: "business-plan" */ '@/pages/business/plan')
)

const BusinessPicture = lazy(
  () => (/* webpackChunkName: "business-picture" */ '@/pages/business/picture')
)

const route: CommonRoute = {
  name: 'business',
  title: '经营图',
  icon: 'chart',
  path: '/business',
  children: [
    {
      name: 'picture',
      title: '经营图视',
      path: '/business/picture',
      exact: true,
      component: BusinessPicture
    },
    {
      name: 'plan',
      title: '方案制作',
      path: '/business/plan',
      exact: true,
      component: BusinessPlan
    }
  ]
}
```

