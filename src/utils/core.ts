/**
 * 生成指定区间的随机整数
 * @param {Number} min 最小数
 * @param {Number} max 最大数
 * @return {Number}
 */
export const randomNum = (min: number, max: number): number =>
  Math.floor(min + Math.random() * (max - min + 1))

/**
 * 生成guid
 */
export const guid = (): string => {
  const S4 = () => {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  }
  return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4()
}

var _i = 1
export const getUniqueKeyNumber = (len: number = 8): number => {
  var _loadTime = new Date().getTime()
  return _loadTime + _i++
}

/**
 * 获取url中的查询字符串参数
 */
export const getURLParams = (url: string): any => {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') +
      '"}'
  )
}

/**
 * 用于需要在get请求中传递数组的情况
 */

export function paramsSerializer(params = {}) {
  const paramArr: string[] = []
  let key: string
  let value: any
  for ([key, value] of Object.entries(params)) {
    if (Array.isArray(value)) {
      value.forEach((item) =>
        paramArr.push(`${encodeURIComponent(key)}=${encodeURIComponent(item)}`)
      )
    } else {
      paramArr.push(`${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    }
  }
  return paramArr.join('&')
}

/**
 * 判断数据类型
 */
export const getType = (value: any): any => {
  return value === undefined
    ? 'undefined'
    : value === null
    ? 'null'
    : value.constructor.name.toLowerCase()
}

/**
 * 深克隆
 */
export const deepClone = (source: any) => {
  if (typeof source !== 'object' || source === null) {
    return source
  }
  const target = Array.isArray(source) ? [] : {}
  for (const [key, value] of Object.entries(source)) {
    target[key] = deepClone(value)
  }
  return target
}

/**
 * 加载第三方脚本
 */
export const loadScript = (src: string, callback: (err: any, res: any) => void) => {
  const existScript = document.getElementById(src)
  if (existScript) {
    callback(null, existScript)
  } else {
    const script = document.createElement('script')
    script.src = src
    script.id = src
    document.body.appendChild(script)
    script.onload = () => {
      callback(null, script)
    }
    script.onerror = () => {
      callback(new Error(`“${src}”加载失败`), script)
    }
  }
}

/**
 * 将数值使用逗号隔开，一般用于金额的输入
 */
export const getCommaNumber = (value: any) => {
  const list = value.toString().split('.')
  const prefix = list[0].charAt(0) === '-' ? '-' : ''
  let num = prefix ? list[0].slice(1) : list[0]
  let result = ''
  while (num.length > 3) {
    result = `,${num.slice(-3)}${result}`
    num = num.slice(0, num.length - 3)
  }
  if (num) {
    result = num + result
  }
  const listSecond = list[1] ? '.' + list[1] : ''
  return `${prefix}${result}${listSecond}`
}