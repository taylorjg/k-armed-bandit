export const range = n => Array.from(Array(n).keys())

export const randomChoice = xs => xs[Math.floor(Math.random() * xs.length)]

export const argmax = xs => {
  let topValue = Number.NEGATIVE_INFINITY
  let ties = []
  xs.forEach((value, index) => {
    if (value > topValue) {
      topValue = value
      ties = [index]
    } else {
      if (value === topValue) {
        ties.push(index)
      }
    }
  })
  return ties.length === 1 ? ties[0] : randomChoice(ties)
}

export const average = xs => {
  const sum = xs.reduce((acc, x) => acc + x, 0)
  const count = xs.length
  return sum / count
}
