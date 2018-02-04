import { PubSub } from 'graphql-subscriptions'
const pubsub = new PubSub();

const TRIGGER_NAME = "something_changed"

const resolvers = {
  Subscription: {
    somethingChanged: {
      subscribe: () => pubsub.asyncIterator(TRIGGER_NAME)
    },
  },
}

setInterval(() => {
  pubsub.publish(TRIGGER_NAME, { somethingChanged: { id: "123" } })
}, 500)

const iterator = pubsub.asyncIterator(TRIGGER_NAME)
Array(10).fill(0).forEach(() => {
  iterator.next().then(console.log)
})

// !(async () => {
//   for await (const x of iterator) {
//     console.log(x)
//   }
// })()