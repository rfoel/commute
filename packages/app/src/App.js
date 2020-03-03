import React from 'react'
import { ThemeProvider } from '@1e3/ui'
import { ApolloProvider } from '@apollo/react-hooks'

import client from './client'
import Layout from './components/Layout'
import Router from './Router'

const App = () => {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider>
        <Layout>
          <Router />
        </Layout>
      </ThemeProvider>
    </ApolloProvider>
  )
}

export default App
