import { gql } from 'apollo-server-lambda'

export default gql`
  type Workday {
    date: String
    morningCommuteTime: Int
    workedTime: Int
    lunchTime: Int
    afternoonCommuteTime: Int
  }
`
