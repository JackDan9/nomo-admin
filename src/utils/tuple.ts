const tupleStr = <T extends string[]>(...args: T) => args;

const tupleNum = <T extends number[]>(...args: T) => args;

export {
  tupleStr,
  tupleNum
}