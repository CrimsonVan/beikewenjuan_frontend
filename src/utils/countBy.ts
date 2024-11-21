export function countBy(array: any, cb: any) {
  const result: any = {}
  for (const u of array) {
    const key = cb(u)
    //键值是数组的时候
    if (key instanceof Array) {
      for (const k of key) {
        if (result[k]) {
          result[k]++
        } else {
          result[k] = 1
        }
      }
    } else {
      if (result[key]) {
        result[key]++
      } else {
        result[key] = 1
      }
    }
  }
  const newResult: any = []
  for (const key in result) {
    const obj: any = {}
    obj.option = key
    obj.num = result[key]
    newResult.push(obj)
  }
  return newResult
}
