import { PubSub } from 'graphql-subscriptions'
const pubsub = new PubSub()

const iterator = pubsub.asyncIterator('something_changed')

// 500ms ごとに publish する
setInterval(() => {
  pubsub.publish('something_changed', { somethingChanged: { id: '123' } })
}, 500)

// とりあえず 10 回読み取る (*˘꒳˘*) のこりは知らない
for (let i = 0; i < 10; i++) {
  iterator.next().then(console.log)
}
