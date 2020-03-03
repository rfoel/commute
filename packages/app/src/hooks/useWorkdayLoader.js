import { useQuery, useApolloClient } from '@apollo/react-hooks'
import gql from 'graphql-tag'

const FILTER_QUERY = gql`
  {
    filter @client {
      date
      by
    }
  }
`

const WORKDAYS_QUERY = gql`
  query($filter: Filter) {
    workdays(filter: $filter) {
      date
      morningCommuteTime
      workedTime
      lunchTime
      afternoonCommuteTime
    }
  }
`

export default () => {
  const { cache } = useApolloClient()

  const {
    data: {
      filter: { date, by },
    },
  } = useQuery(FILTER_QUERY)

  const { loading, error, data } = useQuery(WORKDAYS_QUERY, {
    variables: { filter: { date, by } },
  })

  if (data) cache.writeData({ data })

  return { loading, error }
}
