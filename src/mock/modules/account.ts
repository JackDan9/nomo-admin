import Mock from 'mockjs'
import util from '../util'

const listData = Mock.mock({
  'list|127': [
    {
      id: '@increment',
      name: '@cname',
      age: '@natural(20,60)',
      gender: '@pick([1,2])',
      role: [1],
      account: /^[a-zA-Z0-9_]{4,9}$/,
      avatar: "@image('100x100', '#02adea', 'avatar')",
      email: '@email',
      phone: /^1[345789]\d{9}$/,
      registerDate: '@datetime'
    }
  ]
})

const list = listData.list

const getList = (config: any) => {
  const { keyword = '', pageNumber = 1, pageSize = list.length } = JSON.parse(config.body)

  const filterList = list.filter((item: any) => {
    let validName = false
    validName = item.name.includes(name)
    return validName
  })

  const startIndex = (Number(pageNumber) - 1) * Number(pageSize)
  const endIndex = startIndex + Number(pageSize)
  return {
    code: 200,
    data: {
      list: filterList.slice(startIndex, endIndex),
      total: filterList.length
    }
  }
}

const getDetail = (config: any) => {
  const { id } = JSON.parse(config.body)
  return {
    code: 200,
    data: util.find(list, id)
  }
}

const update = (config) => {
  const { detail } = JSON.parse(config.body)
  if (!detail.id) {
    const initRow = {
      createDate: Date.now(),
      consume: 0
    }
    Object.assign(detail, initRow)
  }
  util.update(list, detail)
  return {
    code: 200,
    data: {}
  }
}

const remove = (config: any) => {
  const { id } = JSON.parse(config.body)
  util.remove(list, id)
  return {
    code: 200,
    data: {}
  }
}

export default {
  getList,
  getDetail,
  update,
  remove
}