import fetch from 'axios'

import * as types from './utils/constants'

const GRAPHQL_URL =
  process.env.NODE_ENV === 'production' ? process.env.GRAPHQL_URL : 'http://localhost:9000/graphql'

const CREATE_LOG_QUERY = `
  mutation($input: LogInput) {
    createLog(input: $input) {
      id
    }
  }
`

export const handler = async event => {
  try {
    if (event.httpMethod !== 'POST') throw Error('Webhook only receive POST requests')

    const body = JSON.parse(event.body)
    const { type } = body

    if (!Object.values(types).includes(type)) throw Error(`Type '${type}' is invalid`)

    const date = new Date().toISOString()
    const data = {
      query: CREATE_LOG_QUERY,
      variables: {
        input: {
          date,
          type,
        },
      },
    }

    await fetch(GRAPHQL_URL, {
      method: 'POST',
      data,
    })

    return {
      statusCode: 200,
      body: JSON.stringify({ message: `Created log for date ${date} with type ${type}` }),
    }
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: error.message }),
    }
  }
}
