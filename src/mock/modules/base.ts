// 性别
const gender = [
  {
    id: "1",
    name: "男",
  },
  {
    id: "2",
    name: "女",
  },
];

// 角色
const role = [
  {
    id: "admin",
    name: "管理员",
  },
  {
    id: "guest",
    name: "游客",
  },
  {
    id: "editor",
    name: "编辑",
  },
];

// 地区
const region = [
  {
    id: "1",
    name: "华南",
  },
  {
    id: "2",
    name: "华北",
  },
  {
    id: "3",
    name: "华东",
  },
  {
    id: "4",
    name: "西南",
  },
  {
    id: "5",
    name: "东北",
  },
  {
    id: "6",
    name: "西北",
  },
];

// 文章类型
const article = [
  {
    id: "1",
    name: "新闻",
  },
  {
    id: "2",
    name: "财经",
  },
  {
    id: "3",
    name: "体育",
  },
  {
    id: "4",
    name: "娱乐",
  },
  {
    id: "5",
    name: "游戏",
  },
];

const base = [
  {
    name: "gender",
    list: gender,
  },
  {
    name: "role",
    list: role,
  },
  {
    name: "region",
    list: region,
  },
  {
    name: "article",
    list: article,
  },
];

export default {
  getBase() {
    return {
      code: 200,
      data: base,
      msg: "A base mock data",
    };
  },
};