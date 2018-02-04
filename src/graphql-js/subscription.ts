import { subscribe, parse, GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql'

const schema = new GraphQLSchema({

  // query は省略不可みたいなので適当に定義
  query: new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      dummy: { type: GraphQLString },
    },
  }),

  // とりあえず subscribe の呼ばれ具合を確認するだけの定義
  subscription: new GraphQLObjectType({
    name: 'RootSubscriptionType',
    fields: {
      somethingUpdated: {
        type: GraphQLString,
        args: {
          value: { type: GraphQLString },
        },
        subscribe(src, args, ctx) {
          console.log('Given args:', src, args, ctx) // 実行時に渡る引数を確認
          return [Promise.resolve()]
        },
      },
    },
  }),
})

const requestString = `
  subscription SomethingUpdated($value: String) {
    somethingUpdated(value: $value)
  }
`

const document = parse(requestString)
const rootValue = { value: 'in rootValue'}
const context = { value: 'in context' }
const variables = { value: 'in variables' }
const operationName = 'SomethingUpdated'

subscribe(schema, document, rootValue, context, variables, operationName).then(console.log, console.error)
