import { gql } from 'apollo-server-lambda'

import * as types from '../utils/constants'

export default gql`
  enum TYPE {
    ${Object.values(types).reduce((acc, current) => `${acc}\n${current}`, '')}
  }

  input LogInput {
    date: DateTime
    type: TYPE
  }

  type Log {
    id: ID
    date: DateTime
    type: TYPE
  }
`
