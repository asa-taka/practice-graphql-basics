;(Symbol as any).asyncIterator = Symbol.for('Symbol.asyncIterator')

async function* upCounter() {
  var sec = 0;
  while (true) {
    await delay(1000)
    yield sec++
  }
}

function delay(msec: number) {
  return new Promise(resolve => setTimeout(resolve, msec))
}

const iterable = { [Symbol.asyncIterator]: upCounter }

;(async () => {
  for await (const x of iterable) {
    console.log(x)
  }
})()