import { ApolloServer, gql } from 'apollo-server-lambda'
import { GraphQLDateTime } from 'graphql-iso-date'

import { logType, workdayType } from './types'
import { logs, workdays, createLog } from './resolvers'
import connectDb from './utils/connectDb'

const typeDefs = gql`
  scalar DateTime

  ${logType}
  ${workdayType}

  enum FilterBy {
    day
    week
    month
  }

  input Filter {
    date: DateTime!
    by: FilterBy
  }

  type Query {
    logs(filter: Filter): [Log]!
    workdays(filter: Filter): [Workday]!
  }

  type Mutation {
    createLog(input: LogInput): Log!
  }
`

const resolvers = {
  DateTime: GraphQLDateTime,
  Query: {
    logs,
    workdays,
  },
  Mutation: {
    createLog,
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async () => {
    await connectDb()
    return null
  },
})

export const handler = server.createHandler()
