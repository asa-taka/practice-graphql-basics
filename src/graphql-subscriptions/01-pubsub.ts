(Symbol as any).asyncIterator = Symbol.for('Symbol.asyncIterator')

import { PubSub } from 'graphql-subscriptions'
const pubsub = new PubSub()

const iterator = pubsub.asyncIterator('something_changed')

// 500ms ごとに publish する
setInterval(() => {
  pubsub.publish('something_changed', { somethingChanged: { id: '123' } })
}, 500);

// 無限に読み取れるようになった (*˘꒳˘*) しあわせ
(async () => {
  for await (const x of iterator) {
    console.log(x)
  }
})()