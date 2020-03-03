import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'

import { GRAPHQL_URI } from './config'

const cache = new InMemoryCache()

const client = new ApolloClient({
  cache,
  link: new HttpLink({ uri: GRAPHQL_URI }),
  resolvers: {},
})

cache.writeData({
  data: {
    workdays: [],
    filter: {
      __typename: 'filter',
      date: new Date().toISOString(),
      by: 'week',
    },
  },
})

export default client
