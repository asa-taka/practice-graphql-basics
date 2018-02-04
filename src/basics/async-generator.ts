;(Symbol as any).asyncIterator = Symbol.for('Symbol.asyncIterator')

async function* upCounter() {
  var sec = 0
  while (true) {
    await delay(1000)
    yield sec++
  }
}

class AsyncIterator {
  constructor() {
    this.sec = 0
  }
  next() {
    const value = this.sec++;
    return delay(1000).then(() => ({ value, done: false }))
  }
}

function delay(msec: number) {
  return new Promise(resolve => setTimeout(resolve, msec))
}

// const gen = upCounter()
const gen = new AsyncIterator()

// const iterate = res => {
//   if (res.done) return
//   console.log(res.value) // <- 値を利用した何かしらの処理
//   return gen.next().then(iterate)
// }

// gen.next().then(iterate)

;(async () => {
  const iterable = { [Symbol.asyncIterator]: () => gen }
  for await (const value of iterable) {
    console.log(await value)
  }
  // const iterable = { [Symbol.asyncIterator]: () => gen }
  // for await (const value of iterable) {
  //   console.log(value)
  // }
  // for (let res = await gen.next(); !res.done; res = await gen.next()) {
  //   console.log(res.value)
  // }
  // let res = await gen.next()
  // while (!res.done) {
  //   console.log(res.value)
  //   res = await gen.next()
  // }
  // for await (const x of gen) {
  //   console.log(x)
  // }
})()