const { PubSub } = require("graphql-subscriptions")

const pubsub = new PubSub()

const SOMETHING_CHANGED_TOPIC = "something_changed"
const NEW_TODO_DUMMY = {
  id: "1234",
  title: "NEW TODO",
  detail: "new todo to pubsub"
};

module.exports = {
  Subscription: {
    somethingChanged: {
      subscribe: () => pubsub.asyncIterator(SOMETHING_CHANGED_TOPIC)
    },
    todoCreated: {
      subscribe: () => pubsub.asyncIterator(NEW_TODO_DUMMY)
    },
  },
}