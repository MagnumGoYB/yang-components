export default function tuple<T = string | number>(...args: T[]): T[] {
  return args
}
