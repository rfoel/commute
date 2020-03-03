import React from 'react'
import { HashRouter, Switch, Route } from 'react-router-dom'

import useWorkdayLoader from './hooks/useWorkdayLoader'
import { Home, Workday } from './pages'
import Error from './components/Error'
import Loader from './components/Loader'

export default () => {
  const { loading, error } = useWorkdayLoader()

  if (loading) return <Loader />
  if (error) return <Error />

  return (
    <HashRouter>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/w/:date">
          <Workday />
        </Route>
        <Route path="*">
          <Error />
        </Route>
      </Switch>
    </HashRouter>
  )
}
