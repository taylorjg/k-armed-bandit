import * as U from './utils'

console.log('Hello from worker.js')

export const addNumbers = async (a, b) => {
  const result = a + b
  for (const n of U.range(10)) {
    await new Promise(resolve => setTimeout(resolve, 1000))
    postMessage({ type: 'addNumbersResult', n, result })
  }
}
