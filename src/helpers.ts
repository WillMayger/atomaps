export const doesWindowExist = () => typeof window !== 'undefined'

export const createParam = (name, value) => {
  if (!value) return ''
  const param = new URLSearchParams('')
  param.set(name, value)
  return param.toString()
}
