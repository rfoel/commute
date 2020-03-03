import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@apollo/react-hooks'
import gql from 'graphql-tag'
import dayjs from 'dayjs'
import styled, { css, Box, Heading, Text } from '@1e3/ui'

import secondsFormatter from '../utils/secondsFormatter'

const Day = styled.box(
  () => css`
    align-items: center;
    border: 1px solid white;
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
  `,
)

const GET_WORKDAYS = gql`
  {
    workdays @client {
      date
      morningCommuteTime
      workedTime
      lunchTime
      afternoonCommuteTime
    }
  }
`

export default () => {
  const {
    data: { workdays },
  } = useQuery(GET_WORKDAYS)

  const { date } = useParams()

  const workday = workdays.find(wd => wd.date === date)

  return (
    <Day p={4}>
      <Heading fontSize={4} mb={2}>
        {dayjs(workday.date).format('dddd, MMMM D, YYYY')}
      </Heading>
      <Box mt={2}>
        <Text fontWeight="bold" mb={2}>
          Morning commute time
        </Text>
        <Text mb={2}>{secondsFormatter(workday.morningCommuteTime)}</Text>
      </Box>
      <Box mt={2}>
        <Text fontWeight="bold" mb={2}>
          Worked time
        </Text>
        <Text mb={2}>{secondsFormatter(workday.workedTime)}</Text>
      </Box>
      <Box mt={2}>
        <Text fontWeight="bold" mb={2}>
          Lunch Time
        </Text>
        <Text mb={2}>{secondsFormatter(workday.lunchTime)}</Text>
      </Box>
      <Box mt={2}>
        <Text fontWeight="bold" mb={2}>
          Afternoon commute time
        </Text>
        <Text mb={2}>{secondsFormatter(workday.afternoonCommuteTime)}</Text>
      </Box>
    </Day>
  )
}
